import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { SqrtOperatorInput } from "@lib-types/operator-input.types";
import { resolveFallback } from "@helpers/fallback.helper";

/**
 * The $sqrt operator calculates the square root of a number.
 * It returns NaN for negative numbers unless a fallback is provided.
 *
 * @returns A function that returns the square root of the input value
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   root: { $sqrt: { value: 16 } }, // Returns 4
 *   distance: { $sqrt: { value: { $add: [{ $pow: { base: "$x", exponent: 2 } }, { $pow: { base: "$y", exponent: 2 } }] } } },
 *   withFallback: { $sqrt: { value: -1, fallback: 0 } }, // Returns 0 (negative number fallback)
 *   fromPath: { $sqrt: { value: "$area" } } // Square root of area field
 * }
 * ```
 */
export const $sqrt: ExecutableExpression<SqrtOperatorInput, number> = (
  payload: Record<string, any>,
) => {
  return function (input: SqrtOperatorInput): number {
    try {
      const { value } = input;

      // Validate input
      if (typeof value !== "number") {
        throw new Error(`$sqrt requires a numeric value, got ${typeof value}`);
      }

      // Check for negative numbers
      if (value < 0) {
        throw new Error(
          `$sqrt cannot calculate square root of negative number: ${value}`,
        );
      }

      return Math.sqrt(value);
    } catch (error) {
      return resolveFallback(
        input.fallback,
        payload,
        error instanceof Error ? error : new Error(String(error)),
      );
    }
  };
};
