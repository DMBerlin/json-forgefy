import { ExecutionContext } from "@interfaces/execution-context.interface";
import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { LteOperatorInput } from "@lib-types/operator-input.types";
import { resolvePathOrExpression } from "@common/resolve-path-or-expression.common";

/**
 * The $lte operator performs a "less than or equal" comparison between two values.
 * It supports comparing literals, object paths, and nested operator expressions.
 *
 * @param ctx - Optional execution context containing the source object for path/expression resolution
 * @returns A function that returns true if the first value is less than or equal to the second, false otherwise
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   withinBudget: { $lte: ["$totalCost", "$budget"] }, // Check if cost <= budget
 *   isEligible: { $lte: ["$user.age", 65] }, // Check if age <= 65
 *   hasCapacity: { $lte: [{ $size: "$attendees" }, "$maxCapacity"] }, // Check capacity
 *   isOnSale: { $lte: ["$currentPrice", "$originalPrice"] } // Check if price is same or lower
 * }
 * ```
 */
export const $lte: ExecutableExpression<LteOperatorInput, boolean> = (
  ctx?: ExecutionContext,
) => {
  return function (value: LteOperatorInput): boolean {
    const [firstExpression, secondExpression] = value;
    const firstValue = resolvePathOrExpression(firstExpression, ctx);
    const secondValue = resolvePathOrExpression(secondExpression, ctx);
    return firstValue <= secondValue;
  };
};
