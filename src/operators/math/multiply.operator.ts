import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { MultiplyOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $multiply operator performs multiplication on an array of numbers.
 * It multiplies all the provided values together and returns the product.
 *
 * Note: By the time this operator receives the values, all nested expressions
 * (including paths and nested operators) have already been resolved by resolveArgs
 * in resolveExpression. The operator simply performs the multiplication.
 *
 * @returns A function that multiplies all numbers in the array and returns the product
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   total: { $multiply: [10, 2, 3] }, // Returns 60
 *   withPaths: { $multiply: ["$price", "$quantity"] }, // Multiplies values from paths
 *   percentage: { $multiply: ["$amount", 0.1] }, // Calculate 10% of amount
 *   nested: { $multiply: [{ $add: [5, 5] }, 3] } // Multiplies result of addition by 3
 * }
 * ```
 */
export const $multiply: ExecutableExpression<
  MultiplyOperatorInput,
  number
> = () => {
  return function (values: MultiplyOperatorInput): number {
    // All values are already resolved by resolveArgs
    return values.reduce(
      (accumulator: number, base: number) => accumulator * base,
    );
  };
};
