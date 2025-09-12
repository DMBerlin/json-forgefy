import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ToNumberOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $toNumber operator converts a value to its numeric representation.
 * This is useful for converting string numbers to actual numbers for mathematical operations.
 *
 * @returns A function that converts any input value to a number
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   price: { $toNumber: "$priceString" }, // Converts "123.45" to 123.45
 *   count: { $toNumber: "42" }, // Returns 42
 *   fromBoolean: { $toNumber: true }, // Returns 1
 *   calculated: { $toNumber: { $toString: { $add: [10, 20] } } } // Converts "30" to 30
 * }
 * ```
 */
export const $toNumber: ExecutableExpression<
  ToNumberOperatorInput,
  number
> = () => {
  return function (value: ToNumberOperatorInput): number {
    return Number(value);
  };
};
