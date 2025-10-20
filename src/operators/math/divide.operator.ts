import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { DivideOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $divide operator performs division on an array of numbers.
 * It divides the first number by each subsequent number in sequence.
 *
 * Note: By the time this operator receives the values, all nested expressions
 * (including paths and nested operators) have already been resolved by resolveArgs
 * in resolveExpression. The operator simply performs the division.
 *
 * @returns A function that divides the first number by all subsequent numbers
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   average: { $divide: ["$total", "$count"] }, // Calculate average
 *   percentage: { $divide: ["$part", "$whole"] }, // Calculate percentage (multiply by 100 if needed)
 *   nested: { $divide: [{ $add: [10, 20] }, 2] }, // Divides sum by 2, returns 15
 *   chain: { $divide: [100, 2, 5] } // Returns 10 (100 / 2 / 5)
 * }
 * ```
 */
export const $divide: ExecutableExpression<
  DivideOperatorInput,
  number
> = () => {
  return function (values: DivideOperatorInput): number {
    // All values are already resolved by resolveArgs
    return values.reduce(
      (accumulator: number, base: number) => accumulator / base,
    );
  };
};
