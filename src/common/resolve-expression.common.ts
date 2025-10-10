import { isValidObjectPath } from "@helpers/is-valid-object-path.helper";
import { getValueByPath } from "./get-value-by-path.common";
import { isOperator } from "@helpers/is-operator.helper";
import { operators } from "@/forgefy.operators";
import { OperatorKey, OperatorValue } from "@lib-types/operator.types";
import { ExpressionValues } from "@lib-types/expression.types";

/**
 * Resolves an operator expression by executing the appropriate operator function with the given arguments.
 * This function extracts the operator key from the expression object, prepares the arguments
 * (resolving paths if necessary), and executes the operator with the source context.
 *
 * @template T - The expected return type of the resolved expression
 * @param source - The source object used as context for path resolution and operator execution
 * @param expression - The expression object containing an operator key and its arguments
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
 * // Resolve an add operation with path resolution
 * const addExpr = { $add: ["$amount", { $multiply: ["$amount", "$tax"] }] };
 * const result2 = resolveExpression<number>(source, addExpr); // Returns 110
 *
 * // Resolve a string operation
 * const stringExpr = { $toString: "$amount" };
 * const result3 = resolveExpression<string>(source, stringExpr); // Returns "100"
 * ```
 */
export function resolveExpression<T>(
  source: Record<string, any>,
  expression: ExpressionValues,
): T {
  try {
    // Handle primitive values (shouldn't normally happen, but be defensive)
    if (typeof expression !== "object" || expression === null) {
      return expression as T;
    }

    // Handle arrays (shouldn't normally happen, but be defensive)
    if (Array.isArray(expression)) {
      return expression.map((item) => resolveExpression(source, item)) as T;
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

    // Recursively resolve nested expressions in arguments
    const resolveArgs = (args: any): any => {
      // Handle null/undefined
      if (args === null || args === undefined) {
        return args;
      }

      // Handle arrays
      if (Array.isArray(args)) {
        return args.map(resolveArgs);
      }

      // Handle strings (check for paths)
      if (typeof args === "string") {
        if (isValidObjectPath(args)) {
          return getValueByPath(source, args);
        }
        return args;
      }

      // Handle objects
      if (typeof args === "object") {
        // Check if it's an operator expression
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

      // Return primitives as-is
      return args;
    };

    const args = resolveArgs(expression[key]);
    return operator({ context: source })(args);
  } catch (error) {
    // For backward compatibility, return null on errors
    // In a future version, consider throwing errors for better debugging
    return null;
  }
}
