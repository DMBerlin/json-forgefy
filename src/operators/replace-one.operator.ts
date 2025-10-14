import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ExecutionContext } from "@interfaces/execution-context.interface";
import { ReplaceOneOperatorInput } from "@lib-types/operator-input.types";
import { resolveFallback } from "@helpers/fallback.helper";

/**
 * The $replaceOne operator replaces the first occurrence of a search string with a replacement string.
 * Unlike $replaceAll, this only replaces the first match found.
 *
 * @returns A function that replaces the first occurrence of the search string
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   fixedText: {
 *     $replaceOne: {
 *       input: "Hello Hello World",
 *       search: "Hello",
 *       replacement: "Hi"
 *     }
 *   }, // "Hi Hello World"
 *   cleanPath: {
 *     $replaceOne: {
 *       input: "/api/v1/users",
 *       search: "/api",
 *       replacement: ""
 *     }
 *   }, // "/v1/users"
 *   updateDomain: {
 *     $replaceOne: {
 *       input: "$url",
 *       search: "http://",
 *       replacement: "https://"
 *     }
 *   }
 * }
 * ```
 */
export const $replaceOne: ExecutableExpression<
  ReplaceOneOperatorInput,
  string
> = (ctx?: ExecutionContext) => {
  const payload = ctx?.context || {};
  return function (params: ReplaceOneOperatorInput): string {
    try {
      const { input, search, replacement } = params;

      if (typeof input !== "string") {
        throw new Error(
          `$replaceOne expects a string input, received ${typeof input}`,
        );
      }

      if (typeof search !== "string") {
        throw new Error(
          `$replaceOne expects a string search, received ${typeof search}`,
        );
      }

      if (typeof replacement !== "string") {
        throw new Error(
          `$replaceOne expects a string replacement, received ${typeof replacement}`,
        );
      }

      // Use replace without global flag to replace only first occurrence
      return input.replace(search, replacement);
    } catch (error) {
      return resolveFallback(
        params.fallback,
        payload,
        error instanceof Error ? error : new Error(String(error)),
      );
    }
  };
};
