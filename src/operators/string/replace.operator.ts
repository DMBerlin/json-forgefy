import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ReplaceOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $replace operator replaces multiple search values in a string with a single replacement value.
 * It follows the pattern of String.prototype.replace() but accepts an array of search values
 * to replace all matches in one operation.
 *
 * @returns A function that replaces all occurrences of search values with the replacement value
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   cleanCpf: {
 *     $replace: {
 *       input: "$cpf",
 *       searchValues: [".", "-"],
 *       replacement: ""
 *     }
 *   }, // "123.456.789-10" -> "12345678910"
 *   cleanPhone: {
 *     $replace: {
 *       input: "$phone",
 *       searchValues: ["(", ")", " ", "-"],
 *       replacement: ""
 *     }
 *   }, // "(555) 123-4567" -> "5551234567"
 *   normalizeText: {
 *     $replace: {
 *       input: "$text",
 *       searchValues: ["\n", "\t", "  "],
 *       replacement: " "
 *     }
 *   } // Replace newlines, tabs, and double spaces with single space
 * }
 * ```
 */
export const $replace: ExecutableExpression<
  ReplaceOperatorInput,
  string
> = () => {
  return function (params: ReplaceOperatorInput): string {
    let result = params.input;

    // Replace each search value with the replacement
    for (const searchValue of params.searchValues) {
      // Use global flag to replace all occurrences
      const regex = new RegExp(escapeRegExp(searchValue), "g");
      result = result.replace(regex, params.replacement);
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
