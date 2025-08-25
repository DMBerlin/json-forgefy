import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { MinOperatorInput } from "../types/operator-input.types";

/**
 * The $min operator returns the smallest number from an array of numbers.
 * It compares all provided values and returns the minimum value.
 *
 * @returns A function that returns the minimum value from the input array
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   lowest: { $min: [10, 25, 5, 30] }, // Returns 5
 *   minPrice: { $min: ["$price1", "$price2", "$price3"] }, // Find lowest price
 *   lowerLimit: { $min: ["$userLimit", "$systemLimit"] }, // Use the lower limit
 *   cappedValue: { $min: ["$calculatedValue", 100] } // Cap value at maximum of 100
 * }
 * ```
 */
export const $min: ExecutableExpression<MinOperatorInput, number> = () => {
  return function (values: MinOperatorInput): number {
    return Math.min(...values);
  };
};
