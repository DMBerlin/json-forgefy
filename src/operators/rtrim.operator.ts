import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ExecutionContext } from "@interfaces/execution-context.interface";
import { RtrimOperatorInput } from "@lib-types/operator-input.types";
import { resolveFallback } from "@helpers/fallback.helper";

/**
 * The $rtrim operator removes whitespace (or specified characters) from the end of a string.
 * It supports custom character arrays for more specific trimming needs.
 *
 * @returns A function that trims the input string from the right according to the specified options
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   cleanEmail: { $rtrim: { input: "user@example.com  " } }, // "user@example.com"
 *   cleanCode: {
 *     $rtrim: {
 *       input: "ABC123---",
 *       chars: ["-"]
 *     }
 *   }, // "ABC123"
 *   normalizeText: {
 *     $rtrim: {
 *       input: "Hello  \n\t",
 *       chars: ["\n", "\t", " "]
 *     }
 *   } // "Hello"
 * }
 * ```
 */
export const $rtrim: ExecutableExpression<RtrimOperatorInput, string> = (
  ctx?: ExecutionContext,
) => {
  const payload = ctx?.context || {};
  return function (params: RtrimOperatorInput): string {
    try {
      const { input, chars = [" ", "\t", "\n", "\r"] } = params;

      if (typeof input !== "string") {
        throw new Error(
          `$rtrim expects a string input, received ${typeof input}`,
        );
      }

      let result = input;

      // Build regex pattern to match any of the chars at the end
      const charsPattern = chars.map(escapeRegExp).join("");
      const regex = new RegExp(`[${charsPattern}]+$`);
      result = result.replace(regex, "");

      return result;
    } catch (error) {
      return resolveFallback(
        params.fallback,
        payload,
        error instanceof Error ? error : new Error(String(error)),
      );
    }
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
