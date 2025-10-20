import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { NinOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $nin operator checks if a value does NOT exist within an array of values.
 * It returns true if the value is NOT found in the array, false if it is found.
 * It supports comparing literals, object paths, and nested operator expressions.
 *
 * Note: By the time this operator receives the values, all nested expressions
 * (including paths and nested operators) have already been resolved by resolveArgs
 * in resolveExpression. The operator simply performs the array membership check.
 *
 * @returns A function that returns true if the value does NOT exist in the array, false if it does
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   isNotDeleted: { $nin: ["$status", ["deleted", "archived", "suspended"]] },
 *   isNotRestrictedRole: { $nin: ["$user.role", ["banned", "restricted"]] },
 *   isNotInBlacklist: { $nin: ["$product.category", "$blacklistedCategories"] },
 *   isNotBlocked: { $nin: [{ $toString: "$userId" }, "$blockedUsers"] }
 * }
 * ```
 */
export const $nin: ExecutableExpression<NinOperatorInput, boolean> = () => {
  return function (value: NinOperatorInput): boolean {
    // All values are already resolved by resolveArgs
    const [targetValue, arrayValues] = value;

    // If not an array, consider the value as "not in" the array
    if (!Array.isArray(arrayValues)) {
      return true;
    }

    // Check if the target value does NOT exist in the array
    return !arrayValues.includes(targetValue);
  };
};
