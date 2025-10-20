import { ExecutionContext } from "@interfaces/execution-context.interface";
import { getValueByPath } from "./get-value-by-path.common";
import { augmentSourceWithContext } from "./resolve-execution-context.common";
import { isValidObjectPath } from "@helpers/is-valid-object-path.helper";

/**
 * Resolves any value type by determining its nature and processing accordingly.
 * This function handles:
 * - Primitives: returned as-is
 * - Paths (strings starting with $): resolved via getValueByPath
 * - Arrays: each element is recursively resolved
 * - Plain objects: each property is recursively resolved
 *
 * Note: This function does NOT handle operator expressions. Use resolveExpression for that.
 * This separation avoids circular dependencies.
 *
 * @param value - The value to resolve (can be any type except operator expressions)
 * @param source - The source object for path resolution
 * @param executionContext - Optional execution context for array operators ($current, $index, $accumulated)
 * @returns The resolved value
 *
 * @example
 * ```typescript
 * const source = { user: { name: "John" }, amount: 100 };
 *
 * // Resolve a path
 * resolveValue("$user.name", source); // Returns "John"
 *
 * // Return primitives as-is
 * resolveValue("hello", source); // Returns "hello"
 * resolveValue(42, source); // Returns 42
 *
 * // Resolve arrays
 * resolveValue([1, "$amount", "hello"], source); // Returns [1, 100, "hello"]
 *
 * // Resolve objects
 * resolveValue({ name: "$user.name", count: 5 }, source);
 * // Returns { name: "John", count: 5 }
 * ```
 */
export function resolveValue(
  value: unknown,
  source: Record<string, any>,
  executionContext?: ExecutionContext,
): any {
  // Handle null/undefined
  if (value === null || value === undefined) {
    return value;
  }

  // Handle strings - check if it's a path
  if (typeof value === "string") {
    if (isValidObjectPath(value)) {
      // Augment source with execution context variables if provided
      const augmentedSource = augmentSourceWithContext(
        source,
        executionContext,
      );
      return getValueByPath(augmentedSource, value);
    }
    return value;
  }

  // Handle arrays - recursively resolve each element
  if (Array.isArray(value)) {
    return value.map((item) => resolveValue(item, source, executionContext));
  }

  // Handle plain objects - recursively resolve each property
  // Note: Operator expressions are NOT handled here to avoid circular dependencies
  // They should be handled by resolveExpression before calling this function
  if (typeof value === "object") {
    const resolved: Record<string, any> = {};
    for (const [key, val] of Object.entries(value)) {
      resolved[key] = resolveValue(val, source, executionContext);
    }
    return resolved;
  }

  // Return primitives (numbers, booleans, etc.) as-is
  return value;
}
