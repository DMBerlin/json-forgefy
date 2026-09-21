# JSON Forgefy — Known Issues, Edge Cases & Improvements

> Audit of the current implementation. Each entry lists severity, location, a
> reproduction (where applicable, verified against the built library), impact,
> and a suggested fix. Ordered by severity within each section.

**Legend:** 🔴 Critical · 🟠 High · 🟡 Medium · 🟢 Low

---

## 🐞 Bugs

### BUG-1 🔴 ✅ RESOLVED — `forgefy()` mutated the blueprint, breaking reuse

- **Status:** Fixed. `forgefy()` now deep-clones the projection (via
  `cloneProjection`) before resolving, so the original blueprint is never
  mutated and can be safely reused across payloads.
- **Location:** `src/core/forgefy.core.ts`, `src/common/clone-projection.common.ts`
- **Description:** `forgefy()` wrote resolved values back into the `projection`
  object and returns it. Reusing a blueprint across multiple payloads (an
  explicitly promoted use case in the README — "reusable transformation
  blueprints") silently produces wrong results, because after the first call the
  operator expression has been overwritten with a resolved primitive.
- **Reproduction:**
  ```js
  const bp = { total: { $add: ["$a", 1] } };
  Forgefy.this({ a: 1 }, bp); // { total: 2 }  ✅
  Forgefy.this({ a: 5 }, bp); // { total: 2 }  ❌ (expected 6)
  // bp is now { total: 2 } — the operator is gone
  ```
- **Root cause:** On the second call, `node[key]` is a plain number, so
  `isValidObjectPath` / `isObject` are both false and `keyHandler` leaves it
  untouched.
- **Impact:** Wrong output on any reused blueprint; unexpected side effects on
  caller-owned objects.
- **Suggested fix:** Deep-clone the projection at the start of `forgefy()`, or
  build a fresh output object instead of mutating in place. (Aligns with EPIC 2:
  Immutable Transformations.)
- **Resolution notes:** A dedicated realm-safe `cloneProjection` helper is used
  instead of the global `structuredClone`, because `structuredClone` produces
  objects bound to the Node realm and breaks `instanceof`-based checks (e.g.
  `isObject`) inside sandboxed realms such as Jest's VM context.

### BUG-2 🟠 ✅ RESOLVED — Unknown / misspelled operators silently pass through

- **Location:** `src/core/forgefy.core.ts` (`keyHandler`),
  `src/common/resolve-args.common.ts`, `src/helpers/is-operator.helper.ts`
- **Description:** A misspelled operator was emitted verbatim instead of raising
  an error.
- **Reproduction (previous behavior):**
  ```js
  Forgefy.this({ a: 1 }, { x: { $addd: ["$a", 1] } });
  // → { x: { $addd: ["$a", 1] } }   ❌ (no error, raw expression leaked out)
  ```
- **Root cause:** `isOperator` returns `false` for unregistered keys, so both
  `keyHandler` and `resolveArgs` treated operator-shaped objects with unknown
  keys as plain nested objects and left the raw expression in place.
- **Resolution:** Added `looksLikeOperator` (any lone `$`-prefixed key,
  registered or not). `keyHandler` and `resolveArgs` now route operator-shaped
  values through `resolveExpression`, which raises `UnknownOperatorError` for
  unregistered keys. In the default (lenient) mode the error resolves to `null`
  (consistent with all other failures); in `{ strict: true }` mode it is thrown
  (see BUG-3).
  ```js
  Forgefy.this({ a: 1 }, { x: { $addd: ["$a", 1] } });                 // → { x: null }
  Forgefy.this({ a: 1 }, { x: { $addd: ["$a", 1] } }, { strict: true }); // throws UnknownOperatorError
  ```
- **Tests:** `src/__e2e__/strict-mode.spec.ts`,
  `src/helpers/is-operator.helper.spec.ts` (looksLikeOperator),
  `src/common/resolve-args.common.spec.ts`.

### BUG-3 🟠 ✅ RESOLVED — `resolveExpression` swallowed all errors → `null`

- **Location:** `src/common/resolve-expression.common.ts`,
  `src/interfaces/execution-context.interface.ts`,
  `src/interfaces/forgefy-options.interface.ts`, `src/core/forgefy.core.ts`,
  array operators (strict propagation into per-element contexts)
- **Description:** A blanket `catch { return null }` converted every failure —
  unknown-operator errors, malformed expressions (multiple keys), and genuine
  operator bugs — into `null`.
- **Impact:** Severely hurt debuggability; made the per-operator `fallback`
  feature inconsistent (some error paths never surfaced); blocked EPICs 3, 5, 8.
- **Resolution:** Added an opt-in `strict` mode via a new optional third
  argument: `Forgefy.this(payload, blueprint, { strict: true })`. The flag is
  threaded through the `ExecutionContext` (including into `$map`/`$filter`/
  `$reduce` per-element contexts). In strict mode `resolveExpression` rethrows
  the caught error; the graceful `null` behavior remains the default for
  backward compatibility. ~1800 existing tests pass unchanged.
- **Tests:** `src/__e2e__/strict-mode.spec.ts`,
  `src/common/resolve-expression.common.spec.ts` ("Strict Mode" suite).

### BUG-4 🟡 Numeric operators do not coerce or validate inputs

- **Location:** `src/operators/math/*` (`add`, `divide`, etc.),
  `src/operators/type/to-number.operator.ts`
- **Sub-issues:**
  - `$add: ["10", "20"]` → `"01020"` — string concatenation, because
    `reduce(..., 0)` seeds with a number then hits string operands.
    ```js
    Forgefy.this({ a: "10", b: "20" }, { s: { $add: ["$a", "$b"] } });
    // → { s: "01020" }   ❌ (expected 30)
    ```
  - `$toNumber("abc")` → `NaN`; `$toNumber("")` → `0`. Silent NaN, no fallback.
  - `$divide: [1, 0]` → `Infinity`, which serializes to `null` in JSON — a
    hidden data-corruption path. Empty array → `reduce` throws → swallowed to
    `null` (see BUG-3).
- **Impact:** Numeric-string API payloads (very common) yield wrong types/values.
- **Suggested fix:** Introduce a shared `toNumericInput()` helper used by all
  math operators for consistent coercion and NaN/Infinity handling.

### BUG-5 🟡 Array-context variables shadow real payload fields

- **Location:** `src/common/resolve-execution-context.common.ts`
  (`augmentSourceWithContext`)
- **Description:** `$current` / `$index` / `$accumulated` are merged into the
  source as `current` / `index` / `accumulated`. A payload field literally named
  `current` (etc.) is overwritten inside `$map` / `$filter` / `$reduce`.
- **Reproduction:**
  ```js
  Forgefy.this(
    { current: "REAL", items: [1, 2] },
    { m: { $map: { input: "$items", expression: "$current" } } },
  );
  // → { m: ["REAL", "REAL"] }   ❌
  ```
- **Suggested fix:** Use a reserved namespace (e.g. `$$current`) or a separate
  lookup scope rather than merging context vars into the source object.

### BUG-6 🟢 `$cond` / `$switch` evaluate all branches eagerly

- **Location:** `src/common/resolve-args.common.ts` (eager arg resolution),
  `src/operators/conditional/{cond,switch}.operator.ts`
- **Description:** `resolveArgs` resolves every argument before the operator
  runs, so both `then` and `else` (and every `$switch` `case`/`then`) are
  computed regardless of the condition. This diverges from MongoDB's lazy
  semantics.
- **Reproduction:**
  ```js
  Forgefy.this(
    { x: 2 },
    { v: { $cond: { if: { $gt: ["$x", 0] }, then: "positive", else: { $divide: ["$x", 0] } } } },
  );
  // → { v: "positive" }, but the else branch (divide-by-zero) was still computed
  ```
- **Impact:** Wasted computation; surprising interaction with error-swallowing (a
  throwing untaken branch becomes `null`, harmless only because it is discarded).
- **Suggested fix:** Document the behaviour, or make conditional operators lazily
  resolve the chosen branch.

### BUG-7 🔴 ✅ RESOLVED — Array transformation operators (`$map` / `$filter` / `$reduce`) were broken through the public API

- **Status:** Fixed. `resolveExpression` now recognizes the per-element
  sub-expression fields of array operators (`expression` for `$map`/`$reduce`,
  `condition` for `$filter`) as *deferred*: they are passed through raw while the
  surrounding arguments (`input`, `initialValue`, `fallback`) are still resolved.
  The operator then resolves the sub-expression per element with the correct
  `$current` / `$index` / `$accumulated` context.
- **Location:** `src/common/resolve-expression.common.ts`
  (`DEFERRED_ARG_FIELDS`, `resolveOperatorArgs`),
  `src/operators/array/{map,filter,reduce}.operator.ts`
- **Description:** When `$map` / `$filter` / `$reduce` were used via
  `Forgefy.this` (or `resolveExpression`), their per-element sub-expression
  argument (`expression` for `$map`/`$reduce`, `cond` for `$filter`) is **eagerly
  resolved to `null` before the operator ever runs**. `resolveArgs` walks the
  operator's params object, sees that `expression`/`cond` is itself an operator,
  and resolves it immediately — but `$current` / `$accumulated` / `$index` are
  not yet in scope, so it evaluates to `null` (error swallowed per BUG-3). The
  operator then maps/filters/reduces using a `null` sub-expression.
- **Reproduction (verified):**
  ```js
  Forgefy.this({ items: [1, 2, 3] }, {
    doubled: { $map: { input: "$items", expression: { $multiply: ["$current", 2] } } },
  });
  // → { doubled: [null, null, null] }   ❌ (expected [2, 4, 6])

  Forgefy.this({ items: [1, 2, 3, 4] }, {
    kept: { $filter: { input: "$items", cond: { $gt: ["$current", 2] } } },
  });
  // → { kept: null }   ❌

  Forgefy.this({ items: [1, 2, 3] }, {
    total: { $reduce: { input: "$items", initialValue: 0, expression: { $add: ["$accumulated", "$current"] } } },
  });
  // → { total: null }   ❌
  ```
- **Why the unit tests miss it:** The operator specs call `$map()({ ... })`
  directly with a raw (unresolved) `expression`, bypassing `resolveArgs`
  entirely. This yields 100% line coverage while the integration path through the
  public API is completely broken. Aggregation operators that take plain data
  (`$sum`, `$avg` with `{ values }`) are unaffected and work end-to-end.
- **Impact:** A headline feature ("powerful array transformations") does not work
  through the documented public API. High severity.
- **Suggested fix:** Make `resolveArgs` skip eager resolution of the deferred
  sub-expression fields of array operators (pass `expression`/`cond` through
  raw), so the operator can resolve them per element with the correct execution
  context. Likely the same underlying change needed to lift the documented
  "cannot nest array operators" limitation (see IMP-2).
- **Resolution notes:** Implemented via `DEFERRED_ARG_FIELDS` +
  `resolveOperatorArgs` in `resolveExpression`. Top-level usage through
  `Forgefy.this` now works (including `$index`/`$accumulated`, path
  sub-expressions, fallbacks, and nested aggregation such as `$sum` inside a
  `$map` expression). The separate limitation of nesting array operators inside
  an object *property* of another array operator's expression still applies (see
  IMP-2) and is tracked independently.

---

## 🧩 Edge cases not covered

- **EC-1** `get-value-by-path` splits on `.`, so object keys containing dots are
  unaddressable, and there is no array-bracket syntax (`items[0]`).
  (`src/common/get-value-by-path.common.ts`)
- **EC-2** `$divide` / `$subtract` with a single-element or empty array
  (`reduce` with no initial value).
- **EC-3** `$switch` case resolving to falsy `0` / `""` is treated as "no match".
- **EC-4** `$toNumber` on `null` / `[]` / `{}` follows JS `Number()` quirks
  (`0`, `0`, `NaN`) with no guard.
- **EC-5** `$trim` char-trimming has two quirks, now pinned by
  `src/operators/string/trim.operator.spec.ts`: (a) it runs a **single pass per
  character in array order** (does not repeat until stable), so layered
  different characters like `{ input: "__--hello--__", chars: ["-","_"] }` yield
  `"--hello--"` instead of `"hello"`; and (b) **multi-code-unit characters**
  (e.g. emoji surrogate pairs) are only partially trimmed because the generated
  `char+` regex applies `+` to the trailing code unit — `"🔥🔥hello🔥🔥"` with
  `chars:["🔥"]` yields `"🔥hello🔥"`. Also note `$trim` has **no fallback path**
  (unlike `$ltrim`/`$rtrim`): a non-string input throws a raw `TypeError`.
  (`src/operators/string/trim.operator.ts`)

---

## 🏗️ Scaling / maintainability improvements

- **IMP-1 — Public operator-registration API (EPIC 1).** The registry is
  internal and `OperatorKey` is a hardcoded union; adding an operator requires
  editing `operator.types.ts`, `operator-input.types.ts`, and
  `forgefy.operators.ts`. Expose `Forgefy.registerOperator(name, impl)` and relax
  the key type to `` `$${string}` ``.
- **IMP-2 — Resolve the array-operator circular dependency properly.** The
  singleton registry is a workaround that leaks into a documented limitation
  (cannot nest `$map`/`$filter`/`$reduce` inside object properties). A single
  injected resolver interface would remove both the limitation and the
  special-casing.
- **IMP-3 — Consolidate duplicate registry imports.** `is-operator` and
  `is-valid-object-path` import the registry from `@operators/forgefy.operators`,
  while `resolve-expression` imports it from `@/singletons/operators.singleton`.
  Same instance, two paths — standardize on the singleton to reduce coupling.
- **IMP-4 — Type the registry access.** `resolveExpression` casts
  `registry.get(key)` (`OperatorValue | undefined`) to `OperatorValue`, relying
  on a runtime null check the types don't express.
- **IMP-5 — Finish declared-but-unimplemented operators (EPIC 9).** `$year`,
  `$month`, and `$isLeapYear` appear in the `OperatorKey` union with input types
  but have no implementation and are not registered — dead surface area.
- **IMP-6 — Version drift.** `src/index.ts` (`@version 4.0.0`) and the singleton
  doc comment (`v4.0.0`) disagree with `package.json` (`4.0.1`).
- **IMP-7 — Integration coverage gap.** 100% line coverage is achieved largely by
  unit tests that call operators directly, which hid BUG-7 (array operators
  broken through the public API). Coverage metrics should be complemented by
  end-to-end tests that exercise every operator via `Forgefy.this`. Partially
  addressed by the new regression suites (see below).

---

## 🧪 Regression tests added

- **`src/operators/registry-integrity.spec.ts`** — data-driven guards that scale
  automatically with new operators: every operator source file's exported
  `$`-key must be registered; no key may be exported by two files (this caught a
  dead duplicate `none.operator.ts`); every registered operator must expose the
  curried callable shape; every key must be `$`-prefixed.
- **`src/__e2e__/immutability.spec.ts`** — locks in the BUG-1 fix across operator
  families (math, string, conditional, array aggregation, nested projections):
  blueprints are never mutated, reuse across payloads yields payload-specific
  results, and results are fresh objects. Guards new features against
  reintroducing blueprint mutation / shared-state leakage.
- **`src/__e2e__/array-operators-pipeline.spec.ts`** — end-to-end coverage of
  `$map` / `$filter` / `$reduce` through `Forgefy.this` (operator and path
  sub-expressions, `$index`/`$accumulated`, fallbacks, nested aggregation, and
  the malformed-args path). Guards the BUG-7 fix and the deferred-argument
  handling in `resolveExpression`.
- **`src/__e2e__/strict-mode.spec.ts`** — end-to-end coverage of the BUG-2/BUG-3
  strict mode through `Forgefy.this(payload, blueprint, { strict: true })`:
  unknown/misspelled operators (top-level, nested, and inside `$map`), operator
  failures, and the guarantee that the default (lenient) mode still resolves
  every failure to `null`. Also asserts valid blueprints behave identically in
  both modes.
- **Cleanup:** removed the dead, byte-identical duplicate
  `src/operators/none.operator.ts` (+ spec); the registered implementation lives
  at `src/operators/logical/none.operator.ts`.

---

## 🧼 Code-smell / clean-code review (2026-07)

> SOLID / clean-code audit complementing the scaling improvements above. Each
> entry has a **Status**. Items that overlap an earlier `IMP-*` note are
> cross-referenced (they remain OPEN — the cross-reference only avoids
> duplicating the description). None of these are behavioral bugs; they are
> maintainability / readability / type-safety improvements.

### CS-1 ✅ RESOLVED — Duplicated date-extraction operators (DRY / Template Method)

- **Status:** ✅ RESOLVED — extracted `createDateFieldOperator` factory
  (`src/helpers/date-field-operator.helper.ts`) owning the shared
  parse/timezone/fallback/error control flow. The three operators are now ~28
  declarative lines each, supplying only their name and two extractor callbacks.
  Centralized the `istanbul ignore` pragmas in the factory. 100% coverage
  retained (factory + all three operators at 100%).
- **Location:** `src/operators/date/day-of-week.operator.ts`,
  `day-of-month.operator.ts`, `day-of-year.operator.ts`
- **Description:** These three operators were near-byte-identical (~78 lines
  each), repeating the same skeleton; only the final field access differed.
- **Impact:** ~230 lines of duplicated control flow; scattered defensive
  pragmas; every future date-field operator copied the boilerplate.
- **Fix applied:** Extracted a `createDateFieldOperator` factory that owns the
  shared flow and takes `extractInTimezone` / `extractDirect` callbacks.

### CS-2 ✅ RESOLVED — `resolveValue` / `resolveArgs` structural duplication

- **Status:** ✅ RESOLVED — both resolvers now delegate to a single
  `resolveRecursive` traversal engine (in `resolve-value.common.ts`)
  parameterized by an `OperatorMode` (`"recurse"` vs `"resolve"`). `resolveValue`
  and `resolveArgs` are thin wrappers preserving their exact prior behavior and
  public signatures. 100% coverage retained.
- **Location:** `src/common/resolve-value.common.ts`,
  `src/common/resolve-args.common.ts`
- **Description:** Both functions recursively branch on the same shape
  (null/undefined → array → object → primitive) with almost identical bodies.
  The only real difference is that `resolveArgs` routes operator-shaped objects
  through the injected `expressionResolver` while `resolveValue` deliberately
  does not. Parallel-hierarchy duplication increases the "which resolver do I
  call here?" cognitive load.
- **Impact:** Two functions must be kept in sync; easy to fix a bug in one and
  forget the other.
- **Fix applied:** Unified into a single recursive resolver parameterized by an
  operator strategy. Kept thin named wrappers for readability.

### CS-3 ✅ RESOLVED — `extractNumericValues` tri-state return type

- **Status:** ✅ RESOLVED — replaced `extractNumericValues` with a pure
  `filterNumeric(array: unknown[]): number[]`; `sum`/`avg` now handle the
  empty-result fallback/default explicitly at the call site. Dead
  `getEmptyArrayFallback` deleted. Spec rewritten; 100% coverage retained.
- **Location:** `src/helpers/array-validation.helper.ts`
- **Description:** Returns `number[] | T | number` — "an array of numbers, OR
  the fallback, OR the default (0)". Callers cannot tell the three cases apart
  without re-inspecting the result, violating command/query clarity.
- **Impact:** Ambiguous contract; couples numeric aggregation operators to a
  fragile union. Related to BUG-4 (numeric coercion).
- **Fix applied:** Split responsibilities: a pure `filterNumeric(): number[]`
  plus explicit fallback/default handling at each call site.

### CS-4 ✅ RESOLVED — Central operator abstraction is effectively untyped

- **Status:** ✅ RESOLVED — completed in two phases. Phase 1 tightened the
  registry's stored operator shape: `OperatorValue` now returns `unknown`
  instead of `any`, forcing `resolveExpression` to assert the caller-provided
  `T` explicitly, and the registry lookup is honestly modeled as
  `OperatorValue | undefined` (narrowed by the existing guard). Phase 2 enabled
  full strict null safety: **`strictNullChecks` and `strictBindCallApply` are
  now `true`** in `tsconfig.json` (so `strict: true` is fully honored with no
  overrides). Surfacing null/undefined revealed and fixed several genuine type
  inaccuracies:
  - `ExpressionValues` now includes `null | undefined` (values legitimately
    resolve to these in a transformation pipeline).
  - `FallbackValue` now includes `null` (null is a valid fallback).
  - 25 operator inputs standardized from `fallback?: unknown` to
    `fallback?: FallbackValue`.
  - Added a dedicated `ComparableValue = number | string` for the ordered
    comparison operators (`$gt`/`$gte`/`$lt`/`$lte`).
  - `$toNumber` input widened to `ExpressionValues` (it converts booleans, null,
    etc.); `$slice`'s `end` made optional; `isOperator` param widened to
    `unknown` (it is a guard).
  All 106 suites pass at 100% coverage; `tsc --noEmit` is clean under the
  stricter config.
- **Location:** `tsconfig.json`, `src/types/operator.types.ts`
  (`OperatorValue`), `src/types/expression.types.ts`, `src/types/fallback.types.ts`,
  `src/types/operator-input.types.ts`, `src/common/resolve-expression.common.ts`,
  `src/helpers/is-operator.helper.ts`, and the comparison operators.
- **Description:** `OperatorValue = (ctx?) => (...args: any[]) => any` erased all
  type information, and `strictNullChecks: false` masked null/undefined flows.
- **Fix applied:** `unknown` result boundary + honest optional lookup + full
  `strictNullChecks`/`strictBindCallApply` with the type-accuracy fixes above.

### CS-5 ✅ RESOLVED — `isObject` is not a type guard and is realm-fragile

- **Status:** ✅ RESOLVED — `isObject` rewritten as a realm-safe type guard:
  `typeof value === "object" && value !== null && !Array.isArray(value)`,
  returning `value is Record<string, unknown>`. Deliberate semantic changes
  (functions → `false`; null-prototype objects → `true`; Date/RegExp stay
  `true`) are documented and pinned by tests in `is-object.helper.spec.ts`.
  These types never appear in JSON blueprints, so runtime behavior is unchanged.
- **Location:** `src/helpers/is-object.helper.ts`
- **Description:** `isObject(value: any): boolean` used `value instanceof
  Object` — no narrowing for callers and a cross-realm hazard.
- **Fix applied:** Realm-safe `typeof`-based type guard with narrowing.

### CS-6 ✅ RESOLVED — `strict` threaded as a bare boolean parameter

- **Status:** ✅ RESOLVED — the core now threads a single normalized
  `ForgefyOptions` object end-to-end (`forgefy` builds `{ strict }` once, then
  passes it through `forgefyNode` → `keyHandler` → `assignValueByOperator`).
  Future options (`debug`, `immutable`) can be added without new positional
  parameters. 100% coverage retained.
- **Location:** `src/core/forgefy.core.ts`
  (`forgefy` → `forgefyNode` → `keyHandler` → `assignValueByOperator`)
- **Description:** `strict` was passed as a standalone boolean argument down the
  core call chain (long-parameter-list smell).
- **Fix applied:** Carry a single normalized options object through the core.

### CS-7 ✅ RESOLVED — Split registry import paths

- **Status:** ✅ RESOLVED — `is-operator.helper` and
  `is-valid-object-path.helper` now import the registry from
  `@/singletons/operators.singleton` (the single instance). Because the registry
  is populated as a side effect of importing `@operators/forgefy.operators`, an
  explicit side-effect bootstrap import was added to `forgefy.core.ts`
  (production) and to Jest `setupFiles` (tests) so registration no longer relies
  on an incidental helper import. 100% coverage retained.

### CS-8 ✅ RESOLVED — Version drift in doc comments

- **Status:** ✅ RESOLVED — removed the hardcoded `@version 4.0.0` JSDoc line
  from `src/index.ts` and reworded the singleton doc comment
  (`...single source of truth for v4.0.0` → `...for the operator registry`) so
  no doc comment claims a version that can drift from `package.json`.

### CS-9 ✅ RESOLVED — Dead type surface for unimplemented operators

- **Status:** ✅ RESOLVED (EPIC 9) — implemented `$year`, `$month`, and
  `$isLeapYear` and registered them. `$year`/`$month` reuse the new
  `createDateFieldOperator` factory (timezone-aware, fallback-on-error);
  `$isLeapYear` is a small standalone operator reusing `parseDate` +
  `isLeapYear`. All three have dedicated specs (54 tests) and are verified
  end-to-end through the public `Forgefy.this` API. 100% coverage retained; the
  type surface now matches the implementation.

### CS-10 ✅ RESOLVED — JSDoc bloat and obsolete limitation notes

- **Status:** ✅ RESOLVED — trimmed the oversized JSDoc on `$map` / `$filter` /
  `$reduce` and removed the **false** "LIMITATION: Due to circular module
  dependencies, you cannot nest array operators in object properties" notes.
  Empirically verified (post-BUG-7) that nesting array operators inside object
  properties and inside other operators' expressions works correctly. Also
  corrected the same stale claims in `README.md` and `CLAUDE.md` (including the
  obsolete "projection is mutated in place" note — `forgefy` now clones via
  `cloneProjection`). The real, narrower caveat (operators must be assigned to a
  field, not placed at the projection root) is now documented instead.
- **Location:** array operators, e.g. `src/operators/array/map.operator.ts`
- **Description:** Some operators carried more comment than code, and several
  notes described pre-BUG-7 behavior that no longer matches reality.
- **Fix applied:** Trimmed to essential examples and reconciled all limitation
  notes with current behavior.

### CS-11 ✅ RESOLVED — Redundant restating comments

- **Status:** ✅ RESOLVED — stated the resolution contract once in the
  `ExecutableExpression` interface JSDoc and removed the 22 verbatim
  `// All values are already resolved by resolveArgs` inline comments from the
  comparison / conditional / logical / math / type operator sources. All tests
  pass at 100% coverage.
- **Location:** comparison & math operators (e.g. `eq`, `divide`, `add`)
- **Description:** The comment `// All values are already resolved by resolveArgs`
  is repeated verbatim across many operators and restates the obvious. Low
  value, high duplication.
- **Fix applied:** Documented the resolution contract in
  `ExecutableExpression` and dropped the per-file repetition.

---

## 🧪 Test-coverage edge-case audit (2026-07)

> Judgment-based audit of whether each operator's spec would **catch a
> behavioral regression during a smell-removal refactor** (not raw line
> coverage). Verdicts filter out "gaps" that are merely native JS behavior a
> structure-preserving refactor cannot change. Each entry has a **Status**.

### Refactor-safety of the CS-* targets (the key question)

| Refactor | Guarded by tests? | Notes |
|----------|-------------------|-------|
| **CS-1** date-op factory (`dayOfWeek`/`dayOfMonth`/`dayOfYear`) | ⚠️ MOSTLY | All three specs cover object-with-`date`, direct string/number/Date, timezone, fallback, and `OperatorInputError`. Residual risk: timezone-default (`"UTC"`) handling and the field-access mapping (`.dayOfWeek` vs `.day` vs `getUTCDate()`). Add 1–2 timezone-boundary asserts per op before refactoring. |
| **CS-2** unify `resolveValue`/`resolveArgs` | ✅ YES | 981 lines of combined specs verify the operator-resolved vs passed-through difference; a merge regression would be caught. |
| **CS-3** simplify `extractNumericValues` | ✅ YES | All tri-state returns (numbers / fallback / default-0), NaN/null filtering, and falsy-fallback cases are tested. |
| **CS-4** tighten `any` typing | ✅ YES | Type-only change; guarded by `tsc` + the full suite. |
| **CS-5** `isObject` → type guard | ✅ YES | Now pinned: plain object / array / null / primitive **plus** Date, RegExp, functions (currently `true`) and null-prototype objects (currently `false`). A `typeof`-based rewrite that changes any of these will fail the spec, forcing a deliberate decision. See `is-object.helper.spec.ts`. |

### TC-1 🟠 ✅ RESOLVED — `$trim` had no dedicated unit spec

- **Status:** RESOLVED. Added `src/operators/string/trim.operator.spec.ts` with
  dedicated unit coverage: whitespace both-ends, tabs/newlines/CR, grouped mixed
  default whitespace, middle-preservation, empty / only-whitespace strings,
  custom characters, special-regex-char escaping, empty `chars` array, unicode,
  the no-fallback `TypeError` contract, and the curried shape. Two real quirks
  were discovered and pinned (single-pass order dependence; multi-code-unit
  chars) — see **EC-5**.
- **Location:** `src/operators/string/trim.operator.ts`,
  `src/operators/string/trim.operator.spec.ts`
- **Original description:** Unlike its siblings `$ltrim`/`$rtrim` (which have
  thorough specs), `$trim` was only exercised incidentally by one end-to-end
  test (`src/__e2e__/complex-operation.spec.ts`). In isolation the file was 20%
  statement / 0% branch covered; it only reached the 100% global threshold
  because that single e2e path touched it — precisely the IMP-7 "coverage metric
  hides weak testing" pattern.

### TC-2 🟠 OPEN — `$regex` comparison operator is under-tested

- **Status:** OPEN — not started.
- **Location:** `src/operators/comparison/regex.operator.spec.ts`
- **Description:** Only a single happy-path assertion (an email match). No
  negative match, invalid pattern, non-string input (null/undefined/number),
  empty pattern, special-char escaping, or flag handling.
- **Impact:** Nearly any behavioral change to `$regex` would pass unnoticed.
- **Suggested fix:** Add non-match, invalid-pattern, non-string-input, and
  flag-handling cases.

### TC-3 🟡 OPEN — Conditional operators miss falsy branch values

- **Status:** OPEN — not started. (Extends **EC-3**, which covers `$switch`
  falsy *match*; this covers falsy *branch outputs*.)
- **Location:** `src/operators/conditional/{cond,switch,every,some}.operator.spec.ts`
- **Description:** Branch outputs of `0`, `""`, and `false` are not tested. An
  `ifNull`/`coalesce`-style bug that treats a legitimate falsy result as
  "absent" would slip through.
- **Suggested fix:** Add falsy `then`/`else`/default assertions.

### TC-4 🟡 OPEN — `$isNumber` doc/impl mismatch is unasserted

- **Status:** OPEN — not started.
- **Location:** `src/operators/type/is-number.operator.ts`
- **Description:** The JSDoc states it returns `true` for "0, NaN, Infinity",
  but the implementation is `typeof value === "number" && !isNaN(value)`, which
  returns **`false` for `NaN`** (and `true` for `Infinity`). No test pins the
  `NaN` behavior, so the contract is ambiguous.
- **Suggested fix:** Decide the intended semantics, fix the JSDoc, and add an
  explicit `$isNumber(NaN)` assertion.

### TC-5 🟡 OPEN — Operators are tested via direct calls, not `Forgefy.this`

- **Status:** OPEN — partially mitigated. (Same root cause as **IMP-7 / BUG-7**.)
- **Description:** Most operator specs invoke `$op()(args)` with already-resolved
  arguments, bypassing `resolveArgs`/`resolveExpression`. This is what hid BUG-7.
  The `__e2e__` suites now cover array operators, strict mode, and immutability
  end-to-end, but per-operator path/expression resolution through the public API
  is still not systematically exercised.
- **Suggested fix:** Add a data-driven e2e that runs a representative expression
  for every registered operator through `Forgefy.this`.

### TC-6 🟢 OPEN — Low-value "GAPS" explicitly judged acceptable

- **Status:** OPEN — informational, no action needed.
- **Description:** The audit flagged many math/comparison operators (`$add`,
  `$divide`, `$gt`, etc.) for "missing" NaN/Infinity/string-coercion cases.
  These reflect **native JS semantics** (`reduce`, `Math.*`, `===`, `<`) that a
  structure-preserving refactor cannot alter, so they do not threaten
  refactor-safety. The genuine *behavioral* concern behind them (string
  coercion, divide-by-zero) is already tracked as **BUG-4**. Listed here so the
  distinction is explicit and not re-triaged repeatedly.

---

## Suggested priority

1. ~~**BUG-1** (blueprint mutation)~~ — ✅ **RESOLVED**.
2. ~~**BUG-7** (array operators broken via public API)~~ — ✅ **RESOLVED**.
3. ~~**BUG-3 / BUG-2** (error visibility)~~ — ✅ **RESOLVED** (opt-in `strict` mode).
4. **BUG-4** (numeric coercion) — high real-world impact for API payloads.
5. **BUG-5** (context shadowing), then the remaining edge cases and improvements.
