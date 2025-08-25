import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { CeilOperatorInput } from "../types/operator-input.types";

/**
 * The $ceil operator rounds a number up to the nearest integer.
 * It always rounds towards positive infinity, regardless of the number's sign.
 * 
 * @returns A function that returns the ceiling (rounded up) value of the input number
 * 
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   roundedUp: { $ceil: 4.2 }, // Returns 5
 *   pages: { $ceil: { $divide: ["$totalItems", "$itemsPerPage"] } }, // Calculate pages needed
 *   negativeRound: { $ceil: -4.8 }, // Returns -4 (rounds towards positive infinity)
 *   priceRoundUp: { $ceil: "$calculatedPrice" } // Round price up
 * }
 * ```
 */
export const $ceil: ExecutableExpression<CeilOperatorInput, number> = () => {
  return function (value: CeilOperatorInput): number {
    return Math.ceil(value);
  };
};
