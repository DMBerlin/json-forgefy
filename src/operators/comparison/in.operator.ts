import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { InOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $in operator checks if a value exists within an array of values.
 * It returns true if the value is found in the array, false otherwise.
 * It supports comparing literals, object paths, and nested operator expressions.
 *
 * Note: By the time this operator receives the values, all nested expressions
 * (including paths and nested operators) have already been resolved by resolveArgs
 * in resolveExpression. The operator simply performs the array membership check.
 *
 * @returns A function that returns true if the value exists in the array, false otherwise
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   isValidStatus: { $in: ["$status", ["active", "pending", "approved"]] },
 *   isAllowedRole: { $in: ["$user.role", ["admin", "moderator", "editor"]] },
 *   isInCategory: { $in: ["$product.category", "$allowedCategories"] },
 *   hasPermission: { $in: [{ $toString: "$userId" }, "$authorizedUsers"] }
 * }
 * ```
 */
export const $in: ExecutableExpression<InOperatorInput, boolean> = () => {
  return function (value: InOperatorInput): boolean {
    // All values are already resolved by resolveArgs
    const [targetValue, arrayValues] = value;

    // Ensure we have an array to check against
    if (!Array.isArray(arrayValues)) {
      return false;
    }

    // Check if the target value exists in the array
    return arrayValues.includes(targetValue);
  };
};
