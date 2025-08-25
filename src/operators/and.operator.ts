import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { ExecutionContext } from "../interfaces/execution-context.interface";
import { resolvePathOrExpression } from "../common/resolve-path-or-expression.common";
import { AndOperatorInput } from "../types/operator-input.types";

/**
 * The $and operator performs a logical AND operation on an array of expressions.
 * It returns true only if ALL expressions evaluate to true, false otherwise.
 * Uses short-circuit evaluation - stops at the first false expression.
 *
 * @param ctx - Optional execution context containing the source object for path/expression resolution
 * @returns A function that returns true if all expressions are truthy, false otherwise
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   isEligible: {
 *     $and: [
 *       { $gte: ["$age", 18] },
 *       { $eq: ["$status", "active"] },
 *       { $gt: ["$balance", 0] }
 *     ]
 *   },
 *   canPurchase: {
 *     $and: [
 *       { $gte: ["$balance", "$price"] },
 *       { $eq: ["$accountStatus", "verified"] }
 *     ]
 *   }
 * }
 * ```
 */
export const $and: ExecutableExpression<AndOperatorInput, boolean> = (
  ctx?: ExecutionContext,
) => {
  return function (expressions: AndOperatorInput): boolean {
    // Return true for empty array (vacuous truth)
    if (expressions.length === 0) {
      return true;
    }

    // Short-circuit evaluation: return false on first falsy expression
    for (const expression of expressions) {
      const result = resolvePathOrExpression(expression, ctx);
      if (!result) {
        return false;
      }
    }

    return true;
  };
};
