import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { AddOperatorInput } from "../types/operator-input.types";

/**
 * The $add operator performs addition on an array of numbers.
 * It sums all the provided values and returns the total.
 *
 * @param value - An array of numbers to add together
 * @returns The sum of all numbers in the array
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   total: { $add: [10, 20, 30] }, // Returns 60
 *   withPaths: { $add: ["$price", "$tax", "$shipping"] }, // Adds values from paths
 *   mixed: { $add: [100, "$discount", 25] } // Mixes literals and paths
 * }
 * ```
 */
export const $add: ExecutableExpression<AddOperatorInput, number> = () => {
  return function (value: AddOperatorInput): number {
    return value.reduce(
      (accumulator: number, base: number) => accumulator + base,
      0,
    );
  };
};
