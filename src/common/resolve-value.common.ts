import { ExecutionContext } from "@interfaces/execution-context.interface";
import { ExpressionResolver } from "@lib-types/resolver.types";
import { getValueByPath } from "./get-value-by-path.common";
import { augmentSourceWithContext } from "./resolve-execution-context.common";
import { isValidObjectPath } from "@helpers/is-valid-object-path.helper";
import { looksLikeOperator } from "@helpers/is-operator.helper";

/**
 * How the recursive resolver should treat objects shaped like operator
 * expressions (a single `$`-prefixed key).
 *
 * - `"recurse"`: treat them as plain objects and resolve each property. Used by
 *   {@link resolveValue}, which intentionally does NOT evaluate operators so it
 *   can stay free of the operator/expression dependency cycle.
 * - `"resolve"`: delegate to the provided expression resolver (or, when none is
 *   supplied, return the expression untouched). Used by `resolveArgs`.
 */
type OperatorMode = "recurse" | "resolve";

/**
 * Shared recursive resolution engine backing both {@link resolveValue} and
 * `resolveArgs`. It walks any value and resolves:
 * - Primitives → returned as-is
 * - Paths (strings starting with `$`) → resolved via `getValueByPath`
 * - Arrays → each element resolved recursively
 * - Plain objects → each property resolved recursively
 * - Operator-shaped objects → handled per {@link OperatorMode}
 *
 * Keeping the traversal in one place removes the near-duplicate logic that
 * previously lived in the two public resolvers.
 */
export function resolveRecursive(
  value: unknown,
  source: Record<string, any>,
  executionContext: ExecutionContext | undefined,
  operatorMode: OperatorMode,
  expressionResolver?: ExpressionResolver,
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
    return value.map((item) =>
      resolveRecursive(
        item,
        source,
        executionContext,
        operatorMode,
        expressionResolver,
      ),
    );
  }

  // Handle objects
  if (typeof value === "object") {
    // Operator-shaped objects (single "$"-prefixed key) are only evaluated in
    // "resolve" mode. Unknown / misspelled operators are routed to the resolver
    // too so they are surfaced (thrown in strict mode, resolved to null
    // otherwise) instead of being silently treated as plain objects.
    if (operatorMode === "resolve" && looksLikeOperator(value)) {
      // Use the provided expression resolver if available; otherwise return the
      // expression as-is (no resolver to evaluate it with).
      return expressionResolver
        ? expressionResolver(source, value, executionContext)
        : value;
    }

    // Handle plain objects - recursively resolve each property
    const resolved: Record<string, any> = {};
    for (const [key, val] of Object.entries(value)) {
      resolved[key] = resolveRecursive(
        val,
        source,
        executionContext,
        operatorMode,
        expressionResolver,
      );
    }
    return resolved;
  }

  // Return primitives (numbers, booleans, etc.) as-is
  return value;
}

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
  return resolveRecursive(value, source, executionContext, "recurse");
}
