import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ExecutionContext } from "@interfaces/execution-context.interface";
import { TruncOperatorInput } from "@lib-types/operator-input.types";
import { resolveFallback } from "@helpers/fallback.helper";

/**
 * The $trunc operator truncates a number to an integer by removing the decimal part.
 * Unlike $floor and $ceil, it simply removes decimals without rounding.
 *
 * @returns A function that returns the integer part of the input value
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   truncated: { $trunc: { value: 4.9 } }, // Returns 4
 *   negative: { $trunc: { value: -4.9 } }, // Returns -4 (not -5 like floor)
 *   wholeUnits: { $trunc: { value: "$calculatedAmount" } }, // Get integer part
 *   withFallback: { $trunc: { value: "$maybeNumber", fallback: 0 } } // Returns 0 if not a number
 * }
 * ```
 */
export const $trunc: ExecutableExpression<TruncOperatorInput, number> = (
  ctx?: ExecutionContext,
) => {
  const payload = ctx?.context || {};
  return function (input: TruncOperatorInput): number {
    try {
      const { value } = input;

      // Validate input
      if (typeof value !== "number") {
        throw new Error(`$trunc requires a numeric value, got ${typeof value}`);
      }

      return Math.trunc(value);
    } catch (error) {
      return resolveFallback(
        input.fallback,
        payload,
        error instanceof Error ? error : new Error(String(error)),
      );
    }
  };
};
