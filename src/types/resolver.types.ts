import { ExecutionContext } from "@interfaces/execution-context.interface";

/**
 * Type definition for the expression resolver function.
 * This is used to avoid circular dependencies between resolveArgs and resolveExpression.
 *
 * @param source - The source object used as context for path resolution and operator execution
 * @param expression - The expression to resolve
 * @param executionContext - Optional execution context for array operators with special variables
 * @returns The resolved expression result
 */
export type ExpressionResolver = (
  source: Record<string, any>,
  expression: any,
  executionContext?: ExecutionContext,
) => any;
