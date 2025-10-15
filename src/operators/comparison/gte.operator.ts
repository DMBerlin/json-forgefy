import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { GteOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $gte operator performs a "greater than or equal" comparison between two values.
 * It supports comparing literals, object paths, and nested operator expressions.
 *
 * Note: By the time this operator receives the values, all nested expressions
 * (including paths and nested operators) have already been resolved by resolveArgs
 * in resolveExpression. The operator simply performs the comparison.
 *
 * @returns A function that returns true if the first value is greater than or equal to the second, false otherwise
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   canPurchase: { $gte: ["$balance", "$price"] }, // Check if balance >= price
 *   isAdult: { $gte: ["$user.age", 18] }, // Check if age >= 18
 *   meetsMinimum: { $gte: [{ $size: "$items" }, 1] }, // Check if has at least 1 item
 *   qualifies: { $gte: ["$score", "$passingGrade"] } // Check if score meets passing grade
 * }
 * ```
 */
export const $gte: ExecutableExpression<GteOperatorInput, boolean> = () => {
  return function (value: GteOperatorInput): boolean {
    // All values are already resolved by resolveArgs
    const [firstValue, secondValue] = value;
    return firstValue >= secondValue;
  };
};
