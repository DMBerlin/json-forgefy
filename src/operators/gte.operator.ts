import { ExecutionContext } from "../interfaces/execution-context.interface";
import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { resolvePathOrExpression } from "../common/resolve-path-or-expression.common";
import { GteOperatorInput } from "../types/operator-input.types";

/**
 * The $gte operator performs a "greater than or equal" comparison between two values.
 * It supports comparing literals, object paths, and nested operator expressions.
 * 
 * @param ctx - Optional execution context containing the source object for path/expression resolution
 * @returns A function that returns true if the first value is greater than or equal to the second, false otherwise
 * 
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   canPurchase: { $gte: ["$balance", "$price"] }, // Check if balance >= price
 *   isAdult: { $gte: ["$user.age", 18] }, // Check if age >= 18
 *   meetsMinimum: { $gte: [{ $size: "$items" }, 1] }, // Check if has at least 1 item
 *   qualifies: { $gte: ["$score", "$passingGrade"] } // Check if score meets passing grade
 * }
 * ```
 */
export const $gte: ExecutableExpression<GteOperatorInput, boolean> = (
  ctx?: ExecutionContext,
) => {
  return function (value: GteOperatorInput): boolean {
    const [firstExpression, secondExpression] = value;
    const firstValue = resolvePathOrExpression(firstExpression, ctx);
    const secondValue = resolvePathOrExpression(secondExpression, ctx);
    return firstValue >= secondValue;
  };
};
