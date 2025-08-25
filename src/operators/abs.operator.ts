import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { AbsOperatorInput } from "../types/operator-input.types";

/**
 * The $abs operator returns the absolute value of a number.
 * It converts negative numbers to positive while keeping positive numbers unchanged.
 * 
 * @returns A function that returns the absolute value of the input number
 * 
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   distance: { $abs: -5 }, // Returns 5
 *   difference: { $abs: { $subtract: ["$value1", "$value2"] } }, // Absolute difference
 *   positiveAmount: { $abs: "$balance" }, // Ensure positive value
 *   magnitude: { $abs: -123.45 } // Returns 123.45
 * }
 * ```
 */
export const $abs: ExecutableExpression<AbsOperatorInput, number> = () => {
  return function (value: AbsOperatorInput): number {
    return Math.abs(value);
  };
};
