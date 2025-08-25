import { isOperator } from "../helpers/is-operator.helper";
import { resolveExpression } from "../common/resolve-expression.common";
import { isValidObjectPath } from "../helpers/is-valid-object-path.helper";
import { getValueByPath } from "../common/get-value-by-path.common";
import { ExecutionContext } from "../interfaces/execution-context.interface";
import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { EqOperatorInput } from "../types/operator-input.types";

/**
 * The $eq operator performs equality comparison between two values.
 * It supports comparing literals, object paths, and nested operator expressions.
 * The comparison uses strict equality (===).
 * 
 * @param ctx - Optional execution context containing the source object for path resolution
 * @returns A function that takes two values and returns true if they are equal, false otherwise
 * 
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   isActive: { $eq: ["$status", "active"] }, // Compare path value with literal
 *   sameAmount: { $eq: ["$price", "$originalPrice"] }, // Compare two path values
 *   isZero: { $eq: [{ $subtract: ["$total", "$paid"] }, 0] }, // Compare expression result with literal
 *   literalComparison: { $eq: ["hello", "hello"] } // Returns true
 * }
 * ```
 */
export const $eq: ExecutableExpression<EqOperatorInput, boolean> = (
  ctx?: ExecutionContext,
) => {
  return function (values: EqOperatorInput): boolean {
    const prepare: Array<unknown> = values.map((value) => {
      if (typeof value === "object" && isOperator(value)) {
        return resolveExpression(ctx?.context, value);
      }
      if (typeof value === "string" && isValidObjectPath(value)) {
        return getValueByPath(ctx?.context, value);
      }
      return value;
    });
    return prepare[0] === prepare[1];
  };
};
