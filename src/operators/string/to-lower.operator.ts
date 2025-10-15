import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ToLowerOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $toLower operator converts a string to lowercase.
 * All uppercase letters in the string are converted to their lowercase equivalents.
 *
 * @returns A function that converts the input string to lowercase
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   lowerName: { $toLower: "$user.name" }, // Converts "JOHN DOE" to "john doe"
 *   email: { $toLower: "$userEmail" }, // Ensure email is lowercase
 *   slug: { $toLower: "$title" }, // Create lowercase slug
 *   normalized: { $toLower: { $concat: ["$brand", "-", "$model"] } } // Lowercase combined string
 * }
 * ```
 */
export const $toLower: ExecutableExpression<
  ToLowerOperatorInput,
  string
> = () => {
  return function (value: ToLowerOperatorInput): string {
    return value.toLowerCase();
  };
};
