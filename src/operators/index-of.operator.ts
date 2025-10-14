import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ExecutionContext } from "@interfaces/execution-context.interface";
import { IndexOfOperatorInput } from "@lib-types/operator-input.types";
import { resolveFallback } from "@helpers/fallback.helper";

/**
 * The $indexOf operator returns the index of the first occurrence of a substring within a string.
 * Returns -1 if the substring is not found.
 * Supports an optional start position to begin the search.
 *
 * @returns A function that finds the index of a substring
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   position: { $indexOf: { input: "Hello World", substring: "World" } }, // 6
 *   notFound: { $indexOf: { input: "Hello", substring: "xyz" } }, // -1
 *   fromStart: {
 *     $indexOf: {
 *       input: "Hello Hello",
 *       substring: "Hello",
 *       start: 1
 *     }
 *   }, // 6 (finds second occurrence)
 *   emailAt: { $indexOf: { input: "$email", substring: "@" } } // Find @ position
 * }
 * ```
 */
export const $indexOf: ExecutableExpression<IndexOfOperatorInput, number> = (
  ctx?: ExecutionContext,
) => {
  const payload = ctx?.context || {};
  return function (params: IndexOfOperatorInput): number {
    try {
      const { input, substring, start = 0 } = params;

      if (typeof input !== "string") {
        throw new Error(
          `$indexOf expects a string input, received ${typeof input}`,
        );
      }

      if (typeof substring !== "string") {
        throw new Error(
          `$indexOf expects a string substring, received ${typeof substring}`,
        );
      }

      return input.indexOf(substring, start);
    } catch (error) {
      return resolveFallback(
        params.fallback,
        payload,
        error instanceof Error ? error : new Error(String(error)),
      );
    }
  };
};
