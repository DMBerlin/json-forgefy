import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { OrOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $or operator performs a logical OR operation on an array of expressions.
 * It returns true if ANY expression evaluates to true, false if all are false.
 * Uses short-circuit evaluation - stops at the first true expression.
 *
 * Note: By the time this operator receives the expressions, all nested expressions
 * (including paths and nested operators) have already been resolved by resolveArgs
 * in resolveExpression. The operator simply performs the logical OR.
 *
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
export const $or: ExecutableExpression<OrOperatorInput, boolean> = () => {
  return function (expressions: OrOperatorInput): boolean {
    // Return false for empty array
    if (expressions.length === 0) {
      return false;
    }

    // All expressions are already resolved by resolveArgs
    // Short-circuit evaluation: return true on first truthy expression
    for (const expression of expressions) {
      if (expression) {
        return true;
      }
    }

    return false;
  };
};
