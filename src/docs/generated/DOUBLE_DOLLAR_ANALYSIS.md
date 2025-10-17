# Analysis: Using `$$` for Array Iteration Variables

**Question:** Would using `$$current`, `$$index`, `$$accumulated` instead of `$current`, `$index`, `$accumulated` help?

---

## MongoDB's Actual Pattern

MongoDB uses:
- `$` for **field paths**: `$user.name`, `$items.0.price`
- `$$` for **variables**: `$$this`, `$$value`, `$$ROOT`

```javascript
// MongoDB $map syntax
{
  $map: {
    input: "$items",
    as: "item",          // Declares $$item variable
    in: { $multiply: ["$$item.price", 2] }  // Use $$item
  }
}
```

Our current syntax:
```typescript
{
  $map: {
    input: "$items",
    expression: { $multiply: ["$current.price", 2] }  // We use $current
  }
}
```

---

## Would `$$` Fix the Circular Dependency?

### Answer: NO

The circular dependency is about **module loading order**, not syntax:

```
map.operator.ts  →  (imports at module-load time)  →  resolve-expression
                                                           ↓
                                                    operators registry
                                                    (incomplete/empty)
```

Using `$$current` vs `$current` doesn't change when modules load.

---

## What `$$` WOULD Provide

### Benefits

1. **Clear Semantic Distinction**
   ```typescript
   $field      // = path to data (e.g., $user.name)
   $$current   // = iteration variable (special context)
   ```
   Less mental overhead, clearer intent.

2. **MongoDB Alignment**
   - Familiar to MongoDB users
   - Easier migration of MongoDB queries
   - Industry standard pattern

3. **Reduced Collision Risk**
   ```typescript
   // Current risk:
   const source = { current: "some value" };
   $map expression using "$current"  // Which one? Field or variable?
   
   // With $$:
   const source = { current: "some value" };
   "$current"    // = field path (source.current)
   "$$current"   // = iteration variable (from $map)
   // No ambiguity!
   ```

4. **Future-Proof**
   - If we later add `as:` parameter like MongoDB
   - Could support `$$customName` variables
   - More extensible design

### Drawbacks

1. **Breaking Change**
   - Anyone using current `$current` would need to update
   - But we're still in development (v4.0.0 not released)
   - Good time to make the change!

2. **Implementation Effort**
   - Need to update path resolution logic
   - Need to change ExecutionContext handling
   - Update all tests (364 occurrences across 25 files)
   - Update documentation

---

## Implementation Complexity

### Files Requiring Changes

**Core Logic (5 files):**
1. `get-value-by-path.common.ts` - Handle `$$` prefix differently
2. `resolve-value.common.ts` - Distinguish `$` vs `$$`
3. `resolve-execution-context.common.ts` - Update variable mapping
4. `is-valid-object-path.helper.ts` - Recognize `$$` as valid
5. `ExecutionContext` interface - Could keep internal names as-is

**Tests (25 files, 364 occurrences):**
- Replace `"$current"` → `"$$current"`
- Replace `"$index"` → `"$$index"`
- Replace `"$accumulated"` → `"$$accumulated"`
- Bulk find-and-replace with careful review

**Documentation:**
- All JSDoc examples
- README examples
- Design documents

### Estimated Effort

- **Code Changes:** 2-3 hours
- **Test Updates:** 1-2 hours (mostly find-replace)
- **Testing/Verification:** 1-2 hours
- **Documentation:** 1 hour

**Total:** ~6-8 hours of work

---

## Proposed Implementation

### Option 1: Simple `$$` Prefix Check

```typescript
// get-value-by-path.common.ts
export function getValueByPath(source: Record<string, unknown>, path: string): unknown {
  // Handle $$ prefix (iteration variables - already in source via augment)
  if (path.startsWith("$$")) {
    const varName = path.slice(2).split(".")[0];  // e.g., "$$current.price" → "current"
    const remaining = path.slice(2).split(".").slice(1).join(".");
    
    if (source[varName] !== undefined) {
      return remaining 
        ? getValueByPath({ [varName]: source[varName] }, `$${varName}.${remaining}`)
        : source[varName];
    }
    return undefined;
  }
  
  // Handle $ prefix (field paths)
  if (path.startsWith("$")) {
    return path.slice(1).split(".").reduce(...);  // existing logic
  }
  
  return undefined;
}
```

### Option 2: Separate Handler

```typescript
// New: get-variable-by-path.common.ts
export function getVariableByPath(source: Record<string, unknown>, path: string): unknown {
  if (!path.startsWith("$$")) return undefined;
  
  const cleanPath = path.slice(2);  // Remove $$
  return cleanPath.split(".").reduce(...);
}

// resolve-value.common.ts
if (typeof value === "string") {
  if (value.startsWith("$$")) {
    return getVariableByPath(augmentedSource, value);
  }
  if (value.startsWith("$")) {
    return getValueByPath(augmentedSource, value);
  }
  return value;
}
```

---

## My Recommendation

### For v4.0.0: Keep `$` (Single Dollar)

**Reasons:**
1. ✅ **We're already done** - 100% coverage, fully tested
2. ✅ **Works perfectly** - Only circular dependency issue remains
3. ✅ **Not a breaking change** - v4.0.0 is already different from v3
4. ⏱️ **Time to market** - Ship fast, iterate later

### For v4.1.0 or v5.0.0: Consider `$$` Migration

**Benefits outweigh costs for a point release:**
- Better MongoDB alignment
- Clearer semantics
- Not a breaking change if we support both temporarily

**Migration Path:**
```typescript
// v4.1.0: Support both $ and $$ (deprecated $)
if (value.startsWith("$$") || value.startsWith("$")) {
  if (value.startsWith("$") && !value.startsWith("$$")) {
    console.warn("DEPRECATED: Use $$current instead of $current");
  }
  // ... resolve
}

// v5.0.0: Only support $$
if (value.startsWith("$$")) {
  // ... resolve
}
```

---

## Direct Answer to Your Question

### "Would that break?"

**For new code:** No breaks, just cleaner syntax  
**For existing code:** Yes, would need migration  
**For v4.0.0:** No code exists yet, so no breaks!

### "Would there be need to change lots of things?"

**Yes, but manageable:**
- 5 core files (logic changes)
- 25 test files (find-and-replace)
- Documentation updates
- **~6-8 hours total**

### "Would it help with circular dependency?"

**No** - That's a module loading issue, not a syntax issue.

But it WOULD provide:
- ✅ Clearer distinction between paths and variables
- ✅ MongoDB compatibility
- ✅ Better developer experience
- ✅ Future extensibility

---

## My Suggested Approach

### Now (v4.0.0):
Ship with `$current`, `$index` - it works great!

### Later (v4.1.0):
Add `$$` support alongside `$` with deprecation warning

### Future (v5.0.0):
Migrate fully to `$$` for iteration variables

This gives users time to migrate without breaking anyone.

---

**What do you think?** Should we:
1. ✅ **Keep `$` for now** - Ship v4.0.0 fast
2. 🔄 **Switch to `$$` now** - 6-8 hours of work, better long-term
3. 📅 **Plan `$$` for v4.1.0** - Ship now, migrate later

Your call!

