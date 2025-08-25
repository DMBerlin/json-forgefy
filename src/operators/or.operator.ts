import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ExecutionContext } from "@interfaces/execution-context.interface";
import { resolvePathOrExpression } from "@common/resolve-path-or-expression.common";
import { OrOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $or operator performs a logical OR operation on an array of expressions.
 * It returns true if ANY expression evaluates to true, false if all are false.
 * Uses short-circuit evaluation - stops at the first true expression.
 *
 * @param ctx - Optional execution context containing the source object for path/expression resolution
 * @returns A function that returns true if any expression is truthy, false if all are falsy
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   hasAccess: {
 *     $or: [
 *       { $eq: ["$role", "admin"] },
 *       { $eq: ["$role", "moderator"] },
 *       { $eq: ["$isOwner", true] }
 *     ]
 *   },
 *   canEdit: {
 *     $or: [
 *       { $eq: ["$userId", "$ownerId"] },
 *       { $eq: ["$permissions.edit", true] }
 *     ]
 *   }
 * }
 * ```
 */
export const $or: ExecutableExpression<OrOperatorInput, boolean> = (
  ctx?: ExecutionContext,
) => {
  return function (expressions: OrOperatorInput): boolean {
    // Return false for empty array
    if (expressions.length === 0) {
      return false;
    }

    // Short-circuit evaluation: return true on first truthy expression
    for (const expression of expressions) {
      const result = resolvePathOrExpression(expression, ctx);
      if (result) {
        return true;
      }
    }

    return false;
  };
};
