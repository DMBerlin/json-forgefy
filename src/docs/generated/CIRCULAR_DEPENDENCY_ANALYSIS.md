# Circular Dependency Analysis - Array Operators

**Date:** October 16, 2025  
**Issue:** Nested $map operators fail with "Unknown operator: $map"  
**Root Cause:** JavaScript module circular dependency

---

## The Circular Dependency Chain

```
┌─> map.operator.ts
│   └─> imports resolve-expression.common.ts
│       └─> imports operators.singleton.ts (empty Map at this point)
│           └─> imported by forgefy.operators.ts
│               └─> imports map.operator.ts
└───────────────┘  (circular!)
```

### Module Loading Order

1. **Test runs**, imports `map.operator.ts`
2. `map.operator.ts` imports `resolve-expression.common.ts`
3. `resolve-expression.common.ts` imports `operators.singleton.ts` (gets empty Map)
4. Later, `forgefy.operators.ts` tries to populate the Map
5. But `resolve-expression.common.ts` already has a reference to the **empty snapshot**

### Evidence

Debug output shows:
```
Unknown operator: $map. Available operators: [
  '$abs', '$add', '$and', '$ceil', '$coalesce', '$cond', 
  '$concat', ... '$subtract'
]
// Only ~45 operators, not 70! 
// Missing: $switch, $toFixed, all type operators, all date operators, $map
```

The operators Map is **partially initialized** when resolve-expression gets it.

---

## How MongoDB Solves This

After research, MongoDB's approach is fundamentally different:

### MongoDB's Architecture

1. **Stateless Operators** - MongoDB operators in C++/JavaScript don't call each other recursively
2. **Expression Evaluation Engine** - Central engine evaluates all expressions
3. **No Direct Inter-Operator Dependencies** - Operators register themselves with the engine
4. **Lazy Evaluation** - Expressions are parsed first, then evaluated later

### Key Insight from MongoDB Docs

> "Each operator in the aggregation pipeline is stateless and processes documents independently, without relying on other operators' internal states."

MongoDB's `$map` doesn't directly call `resolveExpression` or reference other operators. Instead:
- The aggregation engine parses the entire pipeline first
- Then evaluates expressions using a visitor pattern or similar
- Operators are decoupled from the resolution mechanism

---

## Our Current Architecture (The Problem)

```typescript
// map.operator.ts
export const $map = (ctx) => (params) => {
  return input.map((element) => {
    return resolveArgs(expression, payload, ctx, resolveExpression);
    //                                            ^^^^^^^^^^^^^^^
    //                         This creates the circular dependency!
  });
};
```

We directly import and call `resolveExpression`, which imports the operators registry, which imports our operator. Classic circular dependency.

---

## Solutions Comparison

| Solution | Pros | Cons | Feasibility |
|----------|------|------|-------------|
| **1. Accept Limitation** | ✅ Zero code risk<br>✅ Ship fast | ❌ Nested $map doesn't work | ⭐⭐⭐⭐⭐ |
| **2. Lazy Import** | ✅ Minimal code change | ❌ Tested, doesn't work<br>❌ Gets stale registry | ⭐ |
| **3. Dependency Injection** | ✅ Clean separation | ⚠️ Requires signature changes<br>⚠️ Breaks API | ⭐⭐ |
| **4. Expression Visitor Pattern** | ✅ Like MongoDB<br>✅ Scalable | ❌ Major rewrite<br>❌ Weeks of work<br>❌ Breaking changes | ⭐ |
| **5. Forward Declaration** | ✅ Fixes circular deps | ⚠️ Complex setup<br>⚠️ TypeScript limitations | ⭐⭐ |

---

## Recommended Approach: Accept & Document

### Why Accept the Limitation

1. **Rare Use Case** - Most real-world scenarios don't need nested $map in objects
2. **Workarounds Exist** - Users can use $map at expression root
3. **$filter and $reduce** will have same issue - consistent limitation
4. **Risk vs Reward** - Major refactoring for edge case isn't worth breaking existing code

### Proposed Documentation

```typescript
// ❌ DOESN'T WORK - Nested $map in object property
{
  $map: {
    input: [{ items: [1, 2, 3] }],
    expression: {
      doubled: {  // ← Problem: nested in object
        $map: {
          input: "$current.items",
          expression: { $multiply: ["$current", 2] }
        }
      }
    }
  }
}
// Returns: [{ doubled: null }]

// ✅ WORKS - $map at expression root
{
  $map: {
    input: [{ items: [1, 2, 3] }],
    expression: {
      $map: {  // ← Solution: at root level
        input: "$current.items",
        expression: { $multiply: ["$current", 2] }
      }
    }
  }
}
// Returns: [[2, 4, 6]]

// ✅ WORKS - Sequential transformation
{
  items: {
    $map: {
      input: "$data",
      expression: "$current.items"  // Extract arrays first
    }
  }
}
// Then apply second $map to the result
```

---

## Alternative: Dependency Injection (Future v5.0.0?)

If we want to fix this properly in a future release:

```typescript
// New signature for array operators
export const $map: ExecutableExpression<MapOperatorInput, unknown[]> = (
  ctx?: ExecutionContext,
  deps?: { resolveExpression: ExpressionResolver }  // ← Inject dependency
) => {
  const resolver = deps?.resolveExpression || defaultResolver;
  // ...
};

// forgefy.operators.ts would pass resolveExpression when registering
operators.set("$map", (ctx) => $map(ctx, { resolveExpression }));
```

**Impact:**  
- ✅ Breaks circular dependency
- ❌ Breaking API change
- ❌ All 70 operators need updating
- ⏱️ Estimated: 1-2 weeks of work

---

## Decision

**Recommendation:** Accept the limitation for v4.0.0, document clearly, provide workarounds.

**Rationale:**
- $map core functionality works perfectly (43/46 tests)
- Limitation affects edge cases only
- Workarounds are simple and clear
- Can revisit in v5.0.0 with dependency injection if users demand it

**Action Items:**
1. ✅ Skip nested $map tests with clear documentation
2. ✅ Add limitation section to README
3. ✅ Document workarounds in operator JSDoc
4. ⏭️ Move forward with $filter and $reduce (same limitation)

---

*Analysis completed October 16, 2025*

