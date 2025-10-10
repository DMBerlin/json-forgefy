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
    const key: OperatorKey = Object.keys(expression)[0] as OperatorKey;

    // Recursively resolve nested expressions in arguments
    const resolveArgs = (args: any): any => {
      if (Array.isArray(args)) {
        return args.map(resolveArgs);
      } else if (typeof args === "string" && isValidObjectPath(args)) {
        return getValueByPath(source, args);
      } else if (typeof args === "object" && args !== null) {
        if (isOperator(args)) {
          return resolveExpression(source, args);
        } else {
          // Handle nested objects that might contain expressions
          const resolved: any = {};
          for (const [k, v] of Object.entries(args)) {
            resolved[k] = resolveArgs(v);
          }
          return resolved;
        }
      } else {
        return args;
      }
    };

    const args = resolveArgs(expression[key]);
    const operator: OperatorValue = operators.get(key);
    return operator({ context: source })(args);
  } catch {
    return null;
  }
}
