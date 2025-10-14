import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ExecutionContext } from "@interfaces/execution-context.interface";
import { ReplaceAllOperatorInput } from "@lib-types/operator-input.types";
import { resolveFallback } from "@helpers/fallback.helper";

/**
 * The $replaceAll operator replaces all occurrences of a search string with a replacement string.
 * Unlike $replaceOne, this replaces every match found in the string.
 *
 * @returns A function that replaces all occurrences of the search string
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   fixedText: {
 *     $replaceAll: {
 *       input: "Hello Hello World",
 *       search: "Hello",
 *       replacement: "Hi"
 *     }
 *   }, // "Hi Hi World"
 *   removeDashes: {
 *     $replaceAll: {
 *       input: "123-456-789",
 *       search: "-",
 *       replacement: ""
 *     }
 *   }, // "123456789"
 *   normalizeSpaces: {
 *     $replaceAll: {
 *       input: "$text",
 *       search: "  ",
 *       replacement: " "
 *     }
 *   }
 * }
 * ```
 */
export const $replaceAll: ExecutableExpression<
  ReplaceAllOperatorInput,
  string
> = (ctx?: ExecutionContext) => {
  const payload = ctx?.context || {};
  return function (params: ReplaceAllOperatorInput): string {
    try {
      const { input, search, replacement } = params;

      if (typeof input !== "string") {
        throw new Error(
          `$replaceAll expects a string input, received ${typeof input}`,
        );
      }

      if (typeof search !== "string") {
        throw new Error(
          `$replaceAll expects a string search, received ${typeof search}`,
        );
      }

      if (typeof replacement !== "string") {
        throw new Error(
          `$replaceAll expects a string replacement, received ${typeof replacement}`,
        );
      }

      // Use replaceAll or split/join for compatibility
      if (typeof String.prototype.replaceAll === "function") {
        return input.replaceAll(search, replacement);
      } else {
        // Fallback for older environments
        return input.split(search).join(replacement);
      }
    } catch (error) {
      return resolveFallback(
        params.fallback,
        payload,
        error instanceof Error ? error : new Error(String(error)),
      );
    }
  };
};
