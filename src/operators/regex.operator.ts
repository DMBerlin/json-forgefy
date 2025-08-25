import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { RegexOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $regex operator tests if a string matches a regular expression pattern.
 * It creates a RegExp object from the provided pattern and tests it against the input value.
 *
 * @returns A function that returns true if the string matches the regex pattern, false otherwise
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   isEmail: {
 *     $regex: {
 *       value: "$user.email",
 *       pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"
 *     }
 *   },
 *   isPhoneNumber: {
 *     $regex: {
 *       value: "$contact.phone",
 *       pattern: "^\\+?[1-9]\\d{1,14}$"
 *     }
 *   },
 *   hasNumbers: {
 *     $regex: {
 *       value: "$inputText",
 *       pattern: "\\d+"
 *     }
 *   },
 *   isValidCode: {
 *     $regex: {
 *       value: "$productCode",
 *       pattern: "^[A-Z]{2}\\d{4}$"
 *     }
 *   }
 * }
 * ```
 */
export const $regex: ExecutableExpression<RegexOperatorInput, boolean> = () => {
  return function (value: RegexOperatorInput): boolean {
    const regexPattern: RegExp = new RegExp(value.pattern);
    return regexPattern.test(value.value);
  };
};
