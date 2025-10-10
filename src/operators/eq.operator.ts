import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { EqOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $eq operator performs equality comparison between two values.
 * It supports comparing literals, object paths, and nested operator expressions.
 * The comparison uses strict equality (===).
 *
 * Note: By the time this operator receives the values, all nested expressions
 * (including paths and nested operators) have already been resolved by resolveArgs
 * in resolveExpression. The operator simply performs the comparison.
 *
 * @returns A function that takes two values and returns true if they are equal, false otherwise
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   isActive: { $eq: ["$status", "active"] }, // Compare path value with literal
 *   sameAmount: { $eq: ["$price", "$originalPrice"] }, // Compare two path values
 *   isZero: { $eq: [{ $subtract: ["$total", "$paid"] }, 0] }, // Compare expression result with literal
 *   literalComparison: { $eq: ["hello", "hello"] } // Returns true
 * }
 * ```
 */
export const $eq: ExecutableExpression<EqOperatorInput, boolean> = () => {
  return function (values: EqOperatorInput): boolean {
    // All values are already resolved by resolveArgs
    return values[0] === values[1];
  };
};
