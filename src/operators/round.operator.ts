import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { RoundOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $round operator rounds a number to a specified number of decimal places.
 * It's more flexible than $toFixed as it returns a number instead of a string.
 * Supports both positive and negative precision values.
 *
 * @returns A function that rounds the input number to the specified precision
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   roundedAmount: { $round: { value: "$transaction.amount", precision: 2 } }, // Round to 2 decimals
 *   wholeNumber: { $round: { value: 3.7, precision: 0 } }, // Returns 4
 *   cents: { $round: { value: { $multiply: ["$amount", 100] }, precision: 0 } }, // Round to cents
 *   thousands: { $round: { value: 12345, precision: -3 } } // Round to nearest thousand (12000)
 * }
 * ```
 */
export const $round: ExecutableExpression<RoundOperatorInput, number> = () => {
  return function (params: RoundOperatorInput): number {
    const { value, precision = 0 } = params;
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  };
};
