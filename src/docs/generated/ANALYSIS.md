# JSON Forgefy - Code Analysis & Recommendations

## 1. `$cond` Operator Analysis

### Current Implementation Issues

#### Issue #1: Inconsistent Behavior with/without Context
```typescript
if (!source) {
  // If no context, return the raw values (fallback behavior)
  return resolveExpression(source, value.if) ? value.then : value.else;
}
```
**Problem**: When `source` is undefined, it still calls `resolveExpression(source, value.if)` which will pass `undefined` as the source. This is inconsistent and could lead to unexpected behavior.

#### Issue #2: Redundant Resolution Logic
The operator manually checks if `then` and `else` are operators and resolves them:
```typescript
if (conditionResult) {
  return typeof value.then === "object" &&
    value.then !== null &&
    isOperator(value.then)
    ? resolveExpression(source, value.then)
    : value.then;
}
```
**Problem**: This logic is redundant because `resolveArgs` in `resolveExpression` already handles this. The `value.if`, `value.then`, and `value.else` should already be resolved by the time they reach the operator function.

#### Issue #3: Double Resolution
The condition `value.if` is being resolved twice:
1. First by `resolveArgs` in `resolveExpression` 
2. Then potentially again in the fallback case

### Edge Cases Not Handled
1. **Falsy values**: `0`, `false`, `""` are valid but falsy - they should be distinguished from `null`/`undefined`
2. **Nested operators in branches**: Already resolved by `resolveArgs`, so the manual check is unnecessary
3. **Arrays as conditions**: What if `value.if` resolves to an array?

### Recommended Simplified Implementation

```typescript
export const $cond: ExecutableExpression<CondOperatorInput, unknown> = (
  ctx?: ExecutionContext,
) => {
  return function (value: CondOperatorInput): unknown {
    // value.if, value.then, and value.else are already resolved by resolveArgs
    // We just need to evaluate the condition and return the appropriate branch
    return value.if ? value.then : value.else;
  };
};
```

**Why this works:**
- `resolveExpression` already handles all path resolution and nested operator execution via `resolveArgs`
- By the time the operator function receives `value`, all nested expressions are resolved
- The operator just needs to evaluate the boolean condition and return the appropriate branch
- Much simpler, clearer, and eliminates redundant code

---

## 2. `resolveExpression` Function Analysis

### Current Implementation Issues

#### Issue #1: Silent Error Handling
```typescript
try {
  // ... all logic
} catch {
  return null;
}
```
**Problem**: All errors are silently caught and return `null`. This makes debugging difficult and hides real issues.

#### Issue #2: Assumes Single Key
```typescript
const key: OperatorKey = Object.keys(expression)[0] as OperatorKey;
```
**Problem**: No validation that the expression has exactly one key. If it has multiple keys or no keys, this will fail silently.

#### Issue #3: Type Safety Issues
The function accepts `ExpressionValues` which can be primitives, but then immediately tries to get keys:
```typescript
export function resolveExpression<T>(
  source: Record<string, any>,
  expression: ExpressionValues,  // Can be string, number, boolean, etc.
): T {
  const key: OperatorKey = Object.keys(expression)[0] as OperatorKey;
  // ^ This will fail if expression is a primitive
}
```

### Edge Cases Not Handled
1. **Primitive expressions**: If `expression` is a string, number, or boolean
2. **Empty objects**: `{}`
3. **Multiple operator keys**: `{ $add: [1,2], $multiply: [3,4] }`
4. **Circular references**: Could cause infinite recursion
5. **Null/undefined source**: Could cause issues in nested resolution

### Recommended Improved Implementation

```typescript
export function resolveExpression<T>(
  source: Record<string, any>,
  expression: ExpressionValues,
): T {
  // Handle primitive values
  if (typeof expression !== 'object' || expression === null) {
    return expression as T;
  }

  // Handle arrays
  if (Array.isArray(expression)) {
    return expression.map(item => resolveExpression(source, item)) as T;
  }

  // Get operator key
  const keys = Object.keys(expression);
  
  // Validate single operator key
  if (keys.length !== 1) {
    throw new Error(
      `Expression must have exactly one operator key, found ${keys.length}: ${keys.join(', ')}`
    );
  }

  const key = keys[0] as OperatorKey;

  // Validate operator exists
  const operator = operators.get(key);
  if (!operator) {
    throw new Error(`Unknown operator: ${key}`);
  }

  // Recursively resolve nested expressions in arguments
  const resolveArgs = (args: any): any => {
    if (args === null || args === undefined) {
      return args;
    }

    if (Array.isArray(args)) {
      return args.map(resolveArgs);
    }
    
    if (typeof args === "string") {
      if (isValidObjectPath(args)) {
        return getValueByPath(source, args);
      }
      return args;
    }
    
    if (typeof args === "object") {
      if (isOperator(args)) {
        return resolveExpression(source, args);
      }
      
      // Handle nested objects that might contain expressions
      const resolved: any = {};
      for (const [k, v] of Object.entries(args)) {
        resolved[k] = resolveArgs(v);
      }
      return resolved;
    }
    
    return args;
  };

  try {
    const args = resolveArgs(expression[key]);
    return operator({ context: source })(args);
  } catch (error) {
    // Provide better error context
    throw new Error(
      `Failed to resolve expression ${key}: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
```

**Improvements:**
1. **Better error handling**: Throws descriptive errors instead of silent failures
2. **Type validation**: Handles primitives and validates operator structure
3. **Null safety**: Explicitly handles null/undefined
4. **Better debugging**: Clear error messages with context
5. **Validation**: Checks for single operator key and operator existence

---

## 3. `$default` Operator Naming

### Current Name: `$default`

**Issues with current name:**
1. **Conflicts with JavaScript keyword**: `default` is a reserved word in switch statements
2. **Not descriptive**: Doesn't clearly indicate it returns first non-null value
3. **Inconsistent with MongoDB**: MongoDB uses `$ifNull` for similar functionality

### Better Name Options

#### Option 1: `$coalesce` ⭐ **RECOMMENDED**
```typescript
{ amount: { $coalesce: ["$transaction.amount", "$fallbackAmount", 0] } }
```
**Pros:**
- Standard SQL term (COALESCE function)
- Widely understood in database contexts
- Clearly indicates "return first non-null value"
- Used in other systems (PostgreSQL, MySQL, etc.)
- No keyword conflicts

#### Option 2: `$firstNonNull`
```typescript
{ amount: { $firstNonNull: ["$transaction.amount", "$fallbackAmount", 0] } }
```
**Pros:**
- Extremely descriptive
- Self-documenting
- No ambiguity

**Cons:**
- Verbose
- Not a standard database term

#### Option 3: `$fallback`
```typescript
{ amount: { $fallback: ["$transaction.amount", "$fallbackAmount", 0] } }
```
**Pros:**
- Clear intent
- Short and memorable

**Cons:**
- Less standard than coalesce
- Could be confused with error handling

### Recommendation: Rename to `$coalesce`

**Rationale:**
1. Industry standard term from SQL
2. MongoDB doesn't have this operator, so no conflict
3. Clear, concise, and widely understood
4. Matches the operator's behavior perfectly
5. No JavaScript keyword conflicts

**Implementation:**
```typescript
// In forgefy.operators.ts
.set("$coalesce", $coalesce)

// Optionally keep $default as alias for backward compatibility
.set("$default", $coalesce)
```

---

## Summary of Recommendations

### Priority 1: Simplify `$cond`
- Remove redundant resolution logic
- Trust that `resolveArgs` handles everything
- Reduce from ~30 lines to ~5 lines

### Priority 2: Improve `resolveExpression` Error Handling
- Add validation for operator structure
- Provide descriptive error messages
- Handle edge cases explicitly

### Priority 3: Rename `$default` to `$coalesce`
- More standard and descriptive
- Keep `$default` as deprecated alias for backward compatibility
- Update documentation

These changes will make the codebase more maintainable, easier to debug, and more aligned with industry standards.
