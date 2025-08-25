import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { MaxOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $max operator returns the largest number from an array of numbers.
 * It compares all provided values and returns the maximum value.
 *
 * @returns A function that returns the maximum value from the input array
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   highest: { $max: [10, 25, 5, 30] }, // Returns 30
 *   maxPrice: { $max: ["$price1", "$price2", "$price3"] }, // Find highest price
 *   upperLimit: { $max: ["$userLimit", "$systemLimit"] }, // Use the higher limit
 *   maxScore: { $max: [0, "$calculatedScore"] } // Ensure non-negative score
 * }
 * ```
 */
export const $max: ExecutableExpression<MaxOperatorInput, number> = () => {
  return function (values: MaxOperatorInput): number {
    return Math.max(...values);
  };
};
