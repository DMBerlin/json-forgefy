import { ExecutionContext } from "@interfaces/execution-context.interface";
import { resolveExpression } from "@common/resolve-expression.common";

/**
 * Resolves an expression with execution context by temporarily adding context variables
 * to the source object, then delegating to the standard resolveExpression function.
 * This avoids code duplication and reuses the existing path resolution logic.
 *
 * The context variables ($current, $accumulated, $index) are added to the source object
 * temporarily so that the existing path resolution in resolveExpression can handle them.
 *
 * @param source - The source object used as context for path resolution
 * @param expression - The expression to resolve
 * @param executionContext - The execution context containing array variables
 * @returns The resolved expression result
 *
 * @example
 * ```typescript
 * const source = { users: [{ name: "John" }, { name: "Jane" }] };
 * const context: ExecutionContext = {
 *   context: source,
 *   $current: { name: "John" },
 *   $index: 0
 * };
 *
 * // Resolve expression that uses $current
 * const expr = { $concat: ["User: ", "$current.name"] };
 * const result = resolveExpressionWithContext(source, expr, context);
 * // Returns: "User: John"
 * ```
 */
export function resolveExpressionWithContext<T>(
  source: Record<string, any>,
  expression: any,
  executionContext: ExecutionContext,
): T {
  // Create an augmented source object with context variables
  // This allows the existing path resolution logic to handle context variables
  // Note: We add them WITHOUT the $ prefix because getValueByPath strips the $ before lookup
  const augmentedSource: Record<string, any> = { ...source };

  // Add context variables to the source if they exist (without $ prefix)
  if (executionContext.$current !== undefined) {
    augmentedSource.current = executionContext.$current;
  }
  if (executionContext.$accumulated !== undefined) {
    augmentedSource.accumulated = executionContext.$accumulated;
  }
  if (executionContext.$index !== undefined) {
    augmentedSource.index = executionContext.$index;
  }

  // Delegate to the standard resolveExpression function
  // The existing path resolution will handle $current, $accumulated, $index
  return resolveExpression(augmentedSource, expression);
}
