import { operators } from "@/forgefy.operators";
import { OperatorKey, OperatorValue } from "@lib-types/operator.types";
import { ExpressionValues } from "@lib-types/expression.types";
import { ExecutionContext } from "@interfaces/execution-context.interface";
import { resolveArgs } from "./resolve-args.common";

/**
 * Resolves an operator expression by executing the appropriate operator function.
 * This function:
 * 1. Validates the expression has exactly one operator key
 * 2. Retrieves the operator function from the registry
 * 3. Resolves all arguments (paths, nested expressions, etc.) via resolveArgs
 * 4. Executes the operator with the resolved arguments
 *
 * @template T - The expected return type of the resolved expression
 * @param source - The source object used as context for path resolution and operator execution
 * @param expression - The expression object containing an operator key and its arguments
 * @param executionContext - Optional execution context for array operators with special variables
 * @returns The result of executing the operator, or null if an error occurs
 *
 * @example
 * ```typescript
 * const source = { amount: 100, tax: 0.1 };
 *
 * // Resolve a multiply operation
 * const multiplyExpr = { $multiply: ["$amount", 2] };
 * const result1 = resolveExpression<number>(source, multiplyExpr); // Returns 200
 *
 * // Resolve an add operation with nested expression
 * const addExpr = { $add: ["$amount", { $multiply: ["$amount", "$tax"] }] };
 * const result2 = resolveExpression<number>(source, addExpr); // Returns 110
 *
 * // Resolve a string operation
 * const stringExpr = { $toString: "$amount" };
 * const result3 = resolveExpression<string>(source, stringExpr); // Returns "100"
 *
 * // Resolve with execution context (for array operators)
 * const context: ExecutionContext = { $current: { name: "John" }, $index: 0 };
 * const contextExpr = { $concat: ["User: ", "$current.name"] };
 * const result4 = resolveExpression<string>(source, contextExpr, context); // Returns "User: John"
 * ```
 */
export function resolveExpression<T>(
  source: Record<string, any>,
  expression: ExpressionValues,
  executionContext?: ExecutionContext,
): T {
  try {
    // Handle non-object values (defensive programming)
    if (typeof expression !== "object" || expression === null) {
      return expression as T;
    }

    // Handle arrays (defensive programming)
    if (Array.isArray(expression)) {
      return expression.map((item) =>
        resolveExpression(source, item, executionContext),
      ) as T;
    }

    // Get operator key
    const keys = Object.keys(expression);

    // Validate single operator key
    if (keys.length !== 1) {
      throw new Error(
        `Expression must have exactly one operator key, found ${keys.length}`,
      );
    }

    const key = keys[0] as OperatorKey;

    // Validate operator exists
    const operator: OperatorValue = operators.get(key);
    if (!operator) {
      throw new Error(`Unknown operator: ${key}`);
    }

    // Recursively resolve arguments using the dedicated resolveArgs function
    // Pass resolveExpression as the resolver to handle nested operator expressions
    // This handles paths, nested expressions, arrays, objects, and primitives
    const resolvedArgs = resolveArgs(
      expression[key],
      source,
      executionContext,
      resolveExpression,
    );

    // Execute the operator with resolved arguments
    return operator({ context: source })(resolvedArgs);
  } catch {
    // Return null on errors for backward compatibility
    // This allows operators to handle errors gracefully
    return null;
  }
}
