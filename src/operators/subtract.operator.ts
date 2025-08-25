import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { SubtractOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $subtract operator performs subtraction on an array of numbers.
 * It subtracts each subsequent number from the first number in sequence.
 *
 * @returns A function that subtracts all numbers in the array from the first number
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   difference: { $subtract: [100, 20, 5] }, // Returns 75 (100 - 20 - 5)
 *   withPaths: { $subtract: ["$total", "$discount"] }, // Subtracts discount from total
 *   remaining: { $subtract: ["$balance", "$payment", "$fee"] } // Multiple subtractions
 * }
 * ```
 */
export const $subtract: ExecutableExpression<
  SubtractOperatorInput,
  number
> = () => {
  return function (values: SubtractOperatorInput): number {
    return values.reduce(
      (accumulator: number, base: number) => accumulator - base,
    );
  };
};
