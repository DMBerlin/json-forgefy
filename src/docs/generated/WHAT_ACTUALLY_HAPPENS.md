# What Actually Happens with Nested $map

**Question:** Are we just parsing one level and not backtracking?

**Answer:** No, we parse and evaluate **recursively to any depth**. The limitation is different.

---

## The Execution Flow (What Actually Happens)

### Scenario: Nested $map in Object Property

```typescript
$map()({
  input: [{ items: [1, 2, 3] }],
  expression: {
    doubled: {  // ← nested in object property
      $map: {
        input: "$current.items",
        expression: { $multiply: ["$current", 2] }
      }
    }
  }
})
```

### Step-by-Step Execution

```
1. Outer $map starts
   └─> Iterates over [{ items: [1, 2, 3] }]
       └─> For element { items: [1, 2, 3] }, create context:
           {
             context: {},
             $current: { items: [1, 2, 3] },
             $index: 0
           }

2. Call resolveArgs on expression object
   └─> resolveArgs(
         { doubled: { $map: {...} } },  // ← The expression
         payload,
         elementContext
       )

3. resolveArgs processes the object (line 69-79 in resolve-args.common.ts)
   └─> For each property "doubled":
       value = { $map: { input: "$current.items", ... } }
       
4. resolveArgs detects this is an operator (line 60: isOperator(args))
   └─> YES, it has a single key "$map"
   
5. resolveArgs calls resolveExpression (line 63)
   └─> resolveExpression(
         source,
         { $map: {...} },  // ← Trying to resolve inner $map
         elementContext
       )

6. resolveExpression tries to find operator (line 74)
   └─> const operator = operators.get("$map");
   
7. ❌ FAILS HERE!
   operators.get("$map") returns undefined
   
   Why? The operators Map was imported at module-load time
   and didn't have $map yet due to circular dependency.

8. Error thrown at line 76
   └─> throw new Error(`Unknown operator: $map`);

9. Error caught at line 92
   └─> return null;  // ← This is what gets returned

10. Result
   └─> { doubled: null }
```

---

## What We DO Parse/Evaluate

We parse and evaluate **everything** recursively, including:

✅ **Multiple levels of nesting:**
```typescript
{
  level1: {
    level2: {
      level3: {
        level4: { $multiply: ["$current", 2] }
      }
    }
  }
}
// Works perfectly! Goes 4 levels deep
```

✅ **Complex expressions at any depth:**
```typescript
{
  complex: {
    nested: {
      deep: {
        $cond: {
          if: { $and: [
            { $gt: ["$current.value", 100] },
            { $lt: ["$current.value", 200] }
          ]},
          then: { $multiply: ["$current.value", 0.9] },
          else: "$current.value"
        }
      }
    }
  }
}
// Works! Evaluates the entire nested structure
```

✅ **Operators nested in conditionals:**
```typescript
{
  result: {
    $cond: {
      if: { $isArray: "$current.items" },
      then: { $size: "$current.items" },  // ← Nested operator in conditional
      else: 0
    }
  }
}
// Works! $size is found in the registry
```

---

## What We DON'T Evaluate

We fail ONLY on:

❌ **Array operators ($map, $filter, $reduce) nested in object properties**

```typescript
{
  doubled: {  // ← Object property
    $map: {   // ← Array operator
      input: "$current.items",
      expression: { $multiply: ["$current", 2] }
    }
  }
}
// Fails! $map not in registry at module-load time
```

---

## Why Only Array Operators?

**Key Insight:** Only array operators create the circular dependency!

```
Why $multiply works nested:
  multiply.operator.ts
    → Does NOT import resolve-expression  ✅
    → No circular dependency
    → Always in registry

Why $map fails nested:
  map.operator.ts  
    → Imports resolve-expression  ❌
    → Creates circular dependency
    → Not in registry at import time
```

Let's verify:

```bash
$ grep "resolveExpression" src/operators/**/*.ts | grep import | grep -v spec
src/operators/array/map.operator.ts:import { resolveExpression } ...
# Only array operators import resolveExpression!
```

**Other operators don't import resolveExpression** - they just receive already-resolved arguments from `resolveArgs`.

Only array operators need to call `resolveExpression` themselves because they create new execution contexts mid-evaluation.

---

## The Architectural Difference

### Regular Operators (No Circular Dependency)

```typescript
// multiply.operator.ts - Simple operator
export const $multiply = () => {
  return function (values: number[]): number {
    return values.reduce((a, b) => a * b);
  };
};
// ✅ No imports of resolveExpression
// ✅ Values already resolved by resolveArgs
// ✅ No circular dependency
```

### Array Operators (Circular Dependency)

```typescript
// map.operator.ts - Needs to resolve expressions per element
import { resolveExpression } from "@common/resolve-expression.common";  // ← Creates circle!

export const $map = (ctx) => {
  return function (params) {
    return input.map((element) => {
      // Need to resolve expression for EACH element with NEW context
      return resolveArgs(expr, payload, elementCtx, resolveExpression);  // ← Needs resolveExpression!
    });
  };
};
```

---

## Are We "Not Backtracking"?

**No - we backtrack/recurse fully!** The issue isn't depth or backtracking.

The issue is **timing**: When do modules load vs when is the registry populated?

```
Timeline:
─────────────────────────────────────────────────────────
Module Load Time (happens first):
  1. map.operator.ts loads
  2. Imports resolve-expression.common.ts
  3. resolve-expression imports operators.singleton.ts
  4. Gets reference to operators Map (EMPTY at this moment!)
  5. map.operator.ts finishes loading

Registry Population Time (happens second):
  6. forgefy.operators.ts loads
  7. Imports map.operator.ts (already loaded, gets cached version)
  8. Tries to add $map to registry
  9. Registry.set("$map", $map)
  
Runtime (when test runs):
  10. Test calls $map
  11. Works fine - $map is in registry NOW
  12. Inner $map tries to execute
  13. Calls resolve-expression's CACHED operators reference from step 4
  14. That reference was captured when registry was EMPTY!
  15. ❌ $map not found
```

---

## Proof: Other Operators Work Nested

```typescript
// This works perfectly:
$map()({
  input: [1, 2, 3],
  expression: {
    nested: {
      deep: {
        veryDeep: {
          $multiply: ["$current", 2]  // ← $multiply works at any depth!
        }
      }
    }
  }
})
// Returns: [{ nested: { deep: { veryDeep: 2 }}}, {...}, {...}]
```

We evaluate to ANY depth. The ONLY problem is array operators can't find themselves in the registry.

---

## The Fix That Would Work (But Is Risky)

Instead of importing operators at module-load time:

```typescript
// resolve-expression.common.ts
import { operators } from "@operators/operators-registry";  // ← Module-load time (EARLY)
```

Import it at **function-call time** (lazy):

```typescript
// resolve-expression.common.ts
export function resolveExpression(...) {
  const { operators } = require("@operators/operators-registry");  // ← Runtime (LATE)
  const operator = operators.get(key);
  // ...
}
```

**But:** ESLint blocks `require()` in TypeScript projects, and this pattern is generally discouraged.

---

## MongoDB's Advantage

MongoDB is implemented in **C++** with a completely different architecture:
- No JavaScript module system
- No circular dependency issues
- Operators registered in a global registry at startup
- Expression evaluator is separate from operator implementations

We're constrained by JavaScript/TypeScript module loading semantics.

---

## Conclusion

We **DO** parse and evaluate to any depth. We **DO** backtrack/recurse properly.

The limitation is:
- **Timing issue**: Registry incomplete at module-load time
- **Scope**: Only affects array operators calling themselves
- **Workaround**: Use at expression root instead of nested in objects

We're not limited in **evaluation depth** - we're limited by **JavaScript module circular dependencies**.

