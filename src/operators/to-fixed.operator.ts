import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ToFixedOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $toFixed operator formats a number to a specified number of decimal places.
 * It truncates (not rounds) the number to the specified precision and returns it as a number.
 *
 * @returns A function that formats a number to the specified decimal places
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   price: { $toFixed: { value: 123.456789, precision: 2 } }, // Returns 123.45
 *   percentage: { $toFixed: { value: "$calculatedRate", precision: 3 } }, // 3 decimal places
 *   currency: { $toFixed: { value: "$amount", precision: 2 } }, // Standard currency format
 *   rounded: { $toFixed: { value: 3.14159, precision: 0 } } // Returns 3 (no decimals)
 * }
 * ```
 */
export const $toFixed: ExecutableExpression<
  ToFixedOperatorInput,
  number
> = () => {
  return function (input: ToFixedOperatorInput): number {
    if (typeof input.value !== "number") return input.value;
    const rule: RegExp = new RegExp(
      "^-?\\d+(?:.\\d{0," + (input.precision || -1) + "})?",
    );
    return Number(input.value.toString().match(rule)[0]);
  };
};
