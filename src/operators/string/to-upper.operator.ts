import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ToUpperOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $toUpper operator converts a string to uppercase.
 * All lowercase letters in the string are converted to their uppercase equivalents.
 *
 * @returns A function that converts the input string to uppercase
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   upperName: { $toUpper: "$user.name" }, // Converts "john doe" to "JOHN DOE"
 *   status: { $toUpper: "active" }, // Returns "ACTIVE"
 *   code: { $toUpper: "$productCode" }, // Ensure product code is uppercase
 *   title: { $toUpper: { $concat: ["$firstName", " ", "$lastName"] } } // Uppercase full name
 * }
 * ```
 */
export const $toUpper: ExecutableExpression<
  ToUpperOperatorInput,
  string
> = () => {
  return function (value: ToUpperOperatorInput): string {
    return value.toUpperCase();
  };
};
