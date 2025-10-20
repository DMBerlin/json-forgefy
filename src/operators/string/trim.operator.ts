import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { TrimOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $trim operator removes whitespace (or specified characters) from the start and end of a string.
 * It supports custom character arrays for more specific trimming needs.
 * This is essential for cleaning user input and normalizing string data.
 *
 * @returns A function that trims the input string according to the specified options
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   cleanEmail: { $trim: { $toLower: "$user.email" } }, // Remove whitespace and lowercase
 *   cleanName: { $trim: "$user.name" }, // Remove whitespace from name
 *   cleanCode: {
 *     $trim: {
 *       input: "$product.code",
 *       chars: ["-", "_", " "]
 *     }
 *   }, // Remove dashes, underscores, and spaces
 *   normalizeText: {
 *     $trim: {
 *       input: "$description",
 *       chars: ["\n", "\t", " "]
 *     }
 *   } // Remove newlines, tabs, and spaces
 * }
 * ```
 */
export const $trim: ExecutableExpression<TrimOperatorInput, string> = () => {
  return function (params: TrimOperatorInput): string {
    const { input, chars = [" ", "\t", "\n", "\r"] } = params;

    let result = input;

    // Trim each character from both ends
    for (const char of chars) {
      const regex = new RegExp(
        `^${escapeRegExp(char)}+|${escapeRegExp(char)}+$`,
        "g",
      );
      result = result.replace(regex, "");
    }

    return result;
  };
};

/**
 * Escapes special regex characters in a string to be used as a literal string in RegExp
 * @param string - The string to escape
 * @returns The escaped string safe for use in RegExp
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
