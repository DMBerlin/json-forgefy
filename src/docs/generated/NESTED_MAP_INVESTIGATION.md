# Investigation: Nested $map Limitation

**Date:** October 16, 2025  
**Issue:** $map operators nested within object properties return `null`

---

## The Problem

### What Doesn't Work

```typescript
$map()({
  input: [{ items: [1, 2, 3] }, { items: [4, 5, 6] }],
  expression: {
    doubled: {  // ← Nested in object property
      $map: {
        input: "$current.items",
        expression: { $multiply: ["$current", 2] }
      }
    }
  }
})
// Expected: [{ doubled: [2, 4, 6] }, { doubled: [8, 10, 12] }]
// Actual:   [{ doubled: null }, { doubled: null }]
```

### What Does Work

```typescript
// 1. Simple transformations (no nested operators in objects)
$map()({
  input: [1, 2, 3],
  expression: { $multiply: ["$current", 2] }
})
// ✅ Works: [2, 4, 6]

// 2. $map at expression root (not in object property)
$map()({
  input: [{ items: [1, 2, 3] }],
  expression: {
    $map: {  // ← At root level
      input: "$current.items",
      expression: { $multiply: ["$current", 2] }
    }
  }
})
// ✅ Works: [[2, 4, 6]]
```

---

## Root Cause Analysis

### The Call Stack

When processing a nested $map:

```
1. Outer $map.operator.ts (line 121-126)
   └─> resolveArgs(expression, payload, elementContext, resolveExpression)
   
2. resolve-args.common.ts (line 69-79)
   └─> For plain object { doubled: { $map: {...} } }
       └─> recursively call resolveArgs for each property
       
3. resolve-args.common.ts (line 60-67)
   └─> Detect { $map: {...} } is an operator
       └─> Call expressionResolver (= resolveExpression)
       
4. resolve-expression.common.ts (line 43-96)
   └─> Try to execute $map operator
       └─> CATCH ALL ERRORS at line 91-95
           └─> return null ❌
```

### The Culprit

```typescript
// src/common/resolve-expression.common.ts lines 91-95
} catch {
  // Return null on errors for backward compatibility
  // This allows operators to handle errors gracefully
  return null;  // ← This is the problem!
}
```

**Why it fails:**
- The inner `$map` operator is being called with `{ context: source }` from line 90
- But it needs `{ context: source, $current: element, $index: index }` from the outer $map
- When the inner $map tries to resolve `"$current.items"`, there's no `$current` in the context
- This causes an error, which gets caught and returns `null`

---

## Why This Happens

### Context Passing Issue

```typescript
// In resolveExpression (line 90):
return operator({ context: source })(resolvedArgs);
//              ^^^^^^^^^^^^^^^^^^^^
// Only passes the original source, NOT the executionContext!
```

The `executionContext` parameter is used for resolving arguments (line 85-87), but when actually **executing** the operator, only `{ context: source }` is passed, losing `$current` and `$index`.

---

## Proposed Solutions

### Solution 1: Pass Execution Context to Operators ⭐ RECOMMENDED

**Change:**
```typescript
// resolve-expression.common.ts line 90
// Before:
return operator({ context: source })(resolvedArgs);

// After:
return operator(executionContext || { context: source })(resolvedArgs);
```

**Impact:**
- ✅ Fixes nested $map
- ✅ Allows all array operators to nest properly
- ✅ Minimal code change
- ⚠️ Requires testing all 70 operators still work

**Testing Required:**
- Verify all existing operators still work with execution context
- Most operators ignore the context, so should be safe
- Array operators specifically use it

---

### Solution 2: Remove the Try-Catch

**Change:**
```typescript
// resolve-expression.common.ts lines 91-95
// Remove entirely:
} catch {
  return null;
}
```

**Impact:**
- ✅ Errors surface properly for debugging
- ✅ Forces proper error handling
- ❌ **BREAKING CHANGE** - errors will now throw instead of returning null
- ❌ May break existing user code that relies on null returns

**Not Recommended:** Too risky for existing users

---

### Solution 3: Add Strict Mode Flag

**Change:**
```typescript
export function resolveExpression<T>(
  source: Record<string, any>,
  expression: ExpressionValues,
  executionContext?: ExecutionContext,
  options?: { strict?: boolean }  // ← New parameter
): T {
  try {
    // ... existing code ...
    return operator(executionContext || { context: source })(resolvedArgs);
  } catch (error) {
    if (options?.strict) {
      throw error;  // Throw in strict mode
    }
    return null;  // Backward compatible
  }
}
```

**Impact:**
- ✅ Backward compatible
- ✅ Opt-in to strict behavior
- ⚠️ Requires updating all callsites
- ⚠️ More complex API

---

### Solution 4: Special Handling for Array Operators

**Change:**
```typescript
// In resolveArgs when detecting an operator in object property
if (isOperator(args)) {
  if (expressionResolver && executionContext) {
    // Pass execution context through for array operators
    return expressionResolver(source, args, executionContext);
  }
  return expressionResolver(source, args);
}
```

**Wait, this is already how it works!** (line 62-63)

The issue is that `executionContext` IS being passed to `resolveExpression`, but then `resolveExpression` doesn't pass it to the operator at line 90.

---

## The Real Issue

Looking at the code flow more carefully:

```typescript
// map.operator.ts line 111-126
return input.map((element, index) => {
  const elementContext: ExecutionContext = {
    context: payload,
    $current: element,
    $index: index,
  };

  return resolveArgs(
    expression,
    payload,  // ← The source
    elementContext,  // ← Contains $current and $index
    resolveExpression,
  );
});
```

Then in `resolveArgs` → `resolveExpression`:

```typescript
// resolve-expression.common.ts line 90
return operator({ context: source })(resolvedArgs);
//              ^^^^^^^^^^^^^^^^^^^^
// Creates NEW context with only source, losing $current and $index!
```

**The Fix:** Simply pass the executionContext instead:

```typescript
return operator(executionContext || { context: source })(resolvedArgs);
```

---

## Let's Test Solution 1

This is a minimal, surgical fix that should work. Let me check what could break.

