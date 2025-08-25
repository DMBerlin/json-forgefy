import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { ExecutionContext } from "../interfaces/execution-context.interface";
import { resolvePathOrExpression } from "../common/resolve-path-or-expression.common";
import { NinOperatorInput } from "../types/operator-input.types";

/**
 * The $nin operator checks if a value does NOT exist within an array of values.
 * It returns true if the value is NOT found in the array, false if it is found.
 * It supports comparing literals, object paths, and nested operator expressions.
 *
 * @param ctx - Optional execution context containing the source object for path/expression resolution
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
export const $nin: ExecutableExpression<NinOperatorInput, boolean> = (
  ctx?: ExecutionContext,
) => {
  return function (value: NinOperatorInput): boolean {
    const [valueExpression, arrayExpression] = value;
    const targetValue = resolvePathOrExpression(valueExpression, ctx);
    const arrayValues = resolvePathOrExpression(arrayExpression, ctx);

    // If not an array, consider the value as "not in" the array
    if (!Array.isArray(arrayValues)) {
      return true;
    }

    // Resolve each element in the array and check if the target value matches any of them
    for (const arrayElement of arrayValues) {
      const resolvedElement = resolvePathOrExpression(arrayElement, ctx);
      if (resolvedElement === targetValue) {
        return false; // Found a match, so value IS in array
      }
    }

    return true; // No match found, so value is NOT in array
  };
};
