import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { ExecutionContext } from "../interfaces/execution-context.interface";
import { resolvePathOrExpression } from "../common/resolve-path-or-expression.common";
import { InOperatorInput } from "../types/operator-input.types";

/**
 * The $in operator checks if a value exists within an array of values.
 * It returns true if the value is found in the array, false otherwise.
 * It supports comparing literals, object paths, and nested operator expressions.
 *
 * @param ctx - Optional execution context containing the source object for path/expression resolution
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
export const $in: ExecutableExpression<InOperatorInput, boolean> = (
  ctx?: ExecutionContext,
) => {
  return function (value: InOperatorInput): boolean {
    const [valueExpression, arrayExpression] = value;
    const targetValue = resolvePathOrExpression(valueExpression, ctx);
    const arrayValues = resolvePathOrExpression(arrayExpression, ctx);

    // Ensure we have an array to check against
    if (!Array.isArray(arrayValues)) {
      return false;
    }

    // Resolve each element in the array and check if the target value matches any of them
    for (const arrayElement of arrayValues) {
      const resolvedElement = resolvePathOrExpression(arrayElement, ctx);
      if (resolvedElement === targetValue) {
        return true;
      }
    }

    return false;
  };
};
