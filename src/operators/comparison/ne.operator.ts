import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { NeOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $ne operator performs a "not equal" comparison between two values.
 * It returns true if the values are not equal, false if they are equal.
 * It supports comparing literals, object paths, and nested operator expressions.
 *
 * Note: By the time this operator receives the values, all nested expressions
 * (including paths and nested operators) have already been resolved by resolveArgs
 * in resolveExpression. The operator simply performs the comparison.
 *
 * @returns A function that returns true if the values are not equal, false if they are equal
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   isNotDeleted: { $ne: ["$status", "deleted"] },
 *   isDifferentUser: { $ne: ["$userId", "$currentUserId"] },
 *   hasChanged: { $ne: ["$originalValue", "$currentValue"] },
 *   isNotZero: { $ne: ["$balance", 0] }
 * }
 * ```
 */
export const $ne: ExecutableExpression<NeOperatorInput, boolean> = () => {
  return function (value: NeOperatorInput): boolean {
    // All values are already resolved by resolveArgs
    const [firstValue, secondValue] = value;
    return firstValue !== secondValue;
  };
};
