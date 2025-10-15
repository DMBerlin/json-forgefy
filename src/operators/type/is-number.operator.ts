import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { IsNumberOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $isNumber operator checks if a value is a valid number.
 * It returns true if the value is a number (including 0, NaN, Infinity), false otherwise.
 * This is more reliable than regex patterns for number validation.
 *
 * @returns A function that returns true if the value is a number, false otherwise
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   isValidAmount: { $isNumber: "$transaction.amount" }, // true if amount is a number
 *   hasValidPrice: { $isNumber: "$product.price" }, // false if price is null/undefined/string
 *   isNumeric: { $isNumber: { $toNumber: "$stringValue" } }, // check if conversion succeeded
 *   validateInput: { $isNumber: 123.45 } // Returns true
 * }
 * ```
 */
export const $isNumber: ExecutableExpression<
  IsNumberOperatorInput,
  boolean
> = () => {
  return function (value: IsNumberOperatorInput): boolean {
    return typeof value === "number" && !isNaN(value);
  };
};
