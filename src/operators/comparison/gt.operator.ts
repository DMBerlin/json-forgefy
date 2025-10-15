import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { GtOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $gt operator performs a "greater than" comparison between two values.
 * It supports comparing literals, object paths, and nested operator expressions.
 *
 * Note: By the time this operator receives the values, all nested expressions
 * (including paths and nested operators) have already been resolved by resolveArgs
 * in resolveExpression. The operator simply performs the comparison.
 *
 * @returns A function that returns true if the first value is greater than the second, false otherwise
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   isExpensive: { $gt: ["$price", 100] }, // Check if price > 100
 *   isOlder: { $gt: ["$user.age", "$minAge"] }, // Compare two path values
 *   exceedsLimit: { $gt: [{ $add: ["$base", "$extra"] }, "$limit"] }, // Compare expression result
 *   isPositive: { $gt: ["$balance", 0] } // Check if balance is positive
 * }
 * ```
 */
export const $gt: ExecutableExpression<GtOperatorInput, boolean> = () => {
  return function (value: GtOperatorInput): boolean {
    // All values are already resolved by resolveArgs
    const [firstValue, secondValue] = value;
    return firstValue > secondValue;
  };
};
