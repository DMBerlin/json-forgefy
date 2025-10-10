import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { LteOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $lte operator performs a "less than or equal" comparison between two values.
 * It supports comparing literals, object paths, and nested operator expressions.
 *
 * Note: By the time this operator receives the values, all nested expressions
 * (including paths and nested operators) have already been resolved by resolveArgs
 * in resolveExpression. The operator simply performs the comparison.
 *
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
export const $lte: ExecutableExpression<LteOperatorInput, boolean> = () => {
  return function (value: LteOperatorInput): boolean {
    // All values are already resolved by resolveArgs
    const [firstValue, secondValue] = value;
    return firstValue <= secondValue;
  };
};
