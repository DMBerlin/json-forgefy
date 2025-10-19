import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ExecutionContext } from "@interfaces/execution-context.interface";
import { PowOperatorInput } from "@lib-types/operator-input.types";
import { resolveFallback } from "@helpers/fallback.helper";
import { OperatorInputError } from "@lib-types/error.types";

/**
 * The $pow operator raises a base number to the power of an exponent.
 * It performs exponentiation (base ** exponent).
 *
 * @returns A function that returns the base raised to the exponent power
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   squared: { $pow: { base: 5, exponent: 2 } }, // Returns 25
 *   cubed: { $pow: { base: "$value", exponent: 3 } }, // Cube a value
 *   squareRoot: { $pow: { base: 16, exponent: 0.5 } }, // Returns 4 (alternative to $sqrt)
 *   withFallback: { $pow: { base: -1, exponent: 0.5, fallback: 0 } }, // Returns 0 (NaN fallback)
 *   inverse: { $pow: { base: 2, exponent: -1 } } // Returns 0.5
 * }
 * ```
 */
export const $pow: ExecutableExpression<PowOperatorInput, number> = (
  ctx?: ExecutionContext,
) => {
  const payload = ctx?.context || {};
  return function (input: PowOperatorInput): number {
    try {
      const { base, exponent } = input;

      // Validate inputs
      if (typeof base !== "number" || typeof exponent !== "number") {
        throw new OperatorInputError(
          `Requires numeric base and exponent, got base: ${typeof base}, exponent: ${typeof exponent}`,
          "$pow",
          input,
        );
      }

      const result = Math.pow(base, exponent);

      // Check for NaN result (e.g., negative base with fractional exponent)
      if (isNaN(result)) {
        throw new OperatorInputError(
          `Resulted in NaN (base: ${base}, exponent: ${exponent})`,
          "$pow",
          input,
        );
      }

      return result;
    } catch (error) {
      return resolveFallback(
        input.fallback,
        payload,
        error instanceof Error ? error : new Error(String(error)),
      );
    }
  };
};
