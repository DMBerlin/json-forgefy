import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ExecutionContext } from "@interfaces/execution-context.interface";
import { LtrimOperatorInput } from "@lib-types/operator-input.types";
import { resolveFallback } from "@helpers/fallback.helper";

/**
 * The $ltrim operator removes whitespace (or specified characters) from the start of a string.
 * It supports custom character arrays for more specific trimming needs.
 *
 * @returns A function that trims the input string from the left according to the specified options
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   cleanEmail: { $ltrim: { input: "  user@example.com" } }, // "user@example.com"
 *   cleanCode: {
 *     $ltrim: {
 *       input: "---ABC123",
 *       chars: ["-"]
 *     }
 *   }, // "ABC123"
 *   normalizeText: {
 *     $ltrim: {
 *       input: "\n\t  Hello",
 *       chars: ["\n", "\t", " "]
 *     }
 *   } // "Hello"
 * }
 * ```
 */
export const $ltrim: ExecutableExpression<LtrimOperatorInput, string> = (
  ctx?: ExecutionContext,
) => {
  const payload = ctx?.context || {};
  return function (params: LtrimOperatorInput): string {
    try {
      const { input, chars = [" ", "\t", "\n", "\r"] } = params;

      if (typeof input !== "string") {
        throw new Error(
          `$ltrim expects a string input, received ${typeof input}`,
        );
      }

      let result = input;

      // Build regex pattern to match any of the chars at the start
      const charsPattern = chars.map(escapeRegExp).join("");
      const regex = new RegExp(`^[${charsPattern}]+`);
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
