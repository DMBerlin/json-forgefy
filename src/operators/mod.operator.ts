import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ModOperatorInput } from "@lib-types/operator-input.types";
import { resolveFallback } from "@helpers/fallback.helper";

/**
 * The $mod operator calculates the remainder of dividing the dividend by the divisor.
 * It performs the modulo operation (dividend % divisor).
 *
 * @returns A function that returns the remainder of the division
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   remainder: { $mod: { dividend: 10, divisor: 3 } }, // Returns 1
 *   isEven: { $eq: [{ $mod: { dividend: "$number", divisor: 2 } }, 0] }, // Check if even
 *   withFallback: { $mod: { dividend: 10, divisor: 0, fallback: 0 } }, // Returns 0 (fallback)
 *   cycleIndex: { $mod: { dividend: "$index", divisor: 5 } } // Cycle through 0-4
 * }
 * ```
 */
export const $mod: ExecutableExpression<ModOperatorInput, number> = (
  payload: Record<string, any>,
) => {
  return function (input: ModOperatorInput): number {
    try {
      const { dividend, divisor } = input;

      // Validate inputs
      if (typeof dividend !== "number" || typeof divisor !== "number") {
        throw new Error(
          `$mod requires numeric dividend and divisor, got dividend: ${typeof dividend}, divisor: ${typeof divisor}`,
        );
      }

      if (divisor === 0) {
        throw new Error("$mod: division by zero");
      }

      return dividend % divisor;
    } catch (error) {
      return resolveFallback(
        input.fallback,
        payload,
        error instanceof Error ? error : new Error(String(error)),
      );
    }
  };
};
