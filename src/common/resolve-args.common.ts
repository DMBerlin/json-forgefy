import { ExecutionContext } from "@interfaces/execution-context.interface";
import { ExpressionResolver } from "@lib-types/resolver.types";
import { resolveValue } from "./resolve-value.common";
import { isOperator } from "@helpers/is-operator.helper";

/**
 * Recursively resolves arguments for operator expressions.
 * This function handles all types of values that can appear as operator arguments:
 * - Primitives: returned as-is
 * - Paths (strings starting with $): resolved via resolveValue
 * - Nested operator expressions: resolved via the provided expressionResolver
 * - Arrays: each element is recursively resolved
 * - Plain objects: each property is recursively resolved
 *
 * @param args - The arguments to resolve (can be any type)
 * @param source - The source object for path resolution
 * @param executionContext - Optional execution context for array operators ($current, $index, $accumulated)
 * @param expressionResolver - Function to resolve nested operator expressions (to avoid circular deps)
 * @returns The resolved arguments
 *
 * @example
 * ```typescript
 * const source = { amount: 100, tax: 0.1 };
 *
 * // Resolve array with mixed values
 * resolveArgs(["$amount", 2, { $multiply: [3, 4] }], source, undefined, resolveExpression);
 * // Returns [100, 2, 12]
 *
 * // Resolve object with nested expressions
 * resolveArgs({ value: "$amount", doubled: { $multiply: ["$amount", 2] } }, source, undefined, resolveExpression);
 * // Returns { value: 100, doubled: 200 }
 *
 * // Resolve with execution context
 * const ctx: ExecutionContext = { context: source, $current: { price: 50 }, $index: 0 };
 * resolveArgs(["$current.price", "$index"], source, ctx, resolveExpression);
 * // Returns [50, 0]
 * ```
 */
export function resolveArgs(
  args: any,
  source: Record<string, any>,
  executionContext?: ExecutionContext,
  expressionResolver?: ExpressionResolver,
): any {
  // Handle null/undefined
  if (args === null || args === undefined) {
    return args;
  }

  // Handle arrays - recursively resolve each element
  if (Array.isArray(args)) {
    return args.map((item) =>
      resolveArgs(item, source, executionContext, expressionResolver),
    );
  }

  // Handle objects
  if (typeof args === "object") {
    // Check if it's an operator expression
    if (isOperator(args)) {
      // Use the provided expression resolver if available
      if (expressionResolver) {
        return expressionResolver(source, args, executionContext);
      }
      // Fallback: return the expression as-is if no resolver provided
      return args;
    }

    // Handle plain objects - recursively resolve each property
    const resolved: Record<string, any> = {};
    for (const [key, val] of Object.entries(args)) {
      resolved[key] = resolveArgs(
        val,
        source,
        executionContext,
        expressionResolver,
      );
    }
    return resolved;
  }

  // For primitives and strings (including paths), use resolveValue
  return resolveValue(args, source, executionContext);
}
