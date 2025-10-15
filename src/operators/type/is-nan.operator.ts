import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { IsNaNOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $isNaN operator checks if a value is NaN (Not a Number).
 * It returns true if the value is NaN, false otherwise.
 * This is more specific than $isNumber for handling edge cases with numeric validation.
 *
 * @returns A function that returns true if the value is NaN, false otherwise
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   isInvalidNumber: { $isNaN: "$transaction.amount" }, // true if amount is NaN
 *   hasValidPrice: { $isNaN: "$product.price" }, // false if price is a valid number
 *   checkConversion: { $isNaN: { $toNumber: "$stringValue" } }, // check if conversion failed
 *   validateInput: { $isNaN: NaN } // Returns true
 * }
 * ```
 */
export const $isNaN: ExecutableExpression<IsNaNOperatorInput, boolean> = () => {
  return function (value: IsNaNOperatorInput): boolean {
    return isNaN(Number(value));
  };
};
