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

## Suggested priority

1. ~~**BUG-1** (blueprint mutation)~~ — ✅ **RESOLVED**.
2. ~~**BUG-7** (array operators broken via public API)~~ — ✅ **RESOLVED**.
3. ~~**BUG-3 / BUG-2** (error visibility)~~ — ✅ **RESOLVED** (opt-in `strict` mode).
4. **BUG-4** (numeric coercion) — high real-world impact for API payloads.
5. **BUG-5** (context shadowing), then the remaining edge cases and improvements.
