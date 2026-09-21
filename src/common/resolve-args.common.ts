import { ExecutionContext } from "@interfaces/execution-context.interface";
import { ExpressionResolver } from "@lib-types/resolver.types";
import { resolveRecursive } from "./resolve-value.common";

/**
 * Recursively resolves arguments for operator expressions. Behaves like
 * `resolveValue` but additionally evaluates nested operator expressions via the
 * provided `expressionResolver` (kept as a parameter to avoid circular
 * dependencies). Both resolvers share a single traversal engine
 * (`resolveRecursive`); this wrapper simply selects the operator-evaluating
 * mode.
 *
 * This function handles all types of values that can appear as operator arguments:
 * - Primitives: returned as-is
 * - Paths (strings starting with $): resolved via path lookup
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
 * resolveArgs(["\$amount", 2, { \$multiply: [3, 4] }], source, undefined, resolveExpression);
 * // Returns [100, 2, 12]
 *
 * // Resolve object with nested expressions
 * resolveArgs({ value: "\$amount", doubled: { \$multiply: ["\$amount", 2] } }, source, undefined, resolveExpression);
 * // Returns { value: 100, doubled: 200 }
 *
 * // Resolve with execution context
 * const ctx: ExecutionContext = { context: source, \$current: { price: 50 }, \$index: 0 };
 * resolveArgs(["\$current.price", "\$index"], source, ctx, resolveExpression);
 * // Returns [50, 0]
 * ```
 */
export function resolveArgs(
  args: unknown,
  source: Record<string, any>,
  executionContext?: ExecutionContext,
  expressionResolver?: ExpressionResolver,
): any {
  return resolveRecursive(
    args,
    source,
    executionContext,
    "resolve",
    expressionResolver,
  );
}
