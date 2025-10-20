import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { AndOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $and operator performs a logical AND operation on an array of expressions.
 * It returns true only if ALL expressions evaluate to true, false otherwise.
 * Uses short-circuit evaluation - stops at the first false expression.
 *
 * Note: By the time this operator receives the expressions, all nested expressions
 * (including paths and nested operators) have already been resolved by resolveArgs
 * in resolveExpression. The operator simply performs the logical AND.
 *
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
export const $and: ExecutableExpression<AndOperatorInput, boolean> = () => {
  return function (expressions: AndOperatorInput): boolean {
    // Return true for empty array (vacuous truth)
    if (expressions.length === 0) {
      return true;
    }

    // All expressions are already resolved by resolveArgs
    // Short-circuit evaluation: return false on first falsy expression
    for (const expression of expressions) {
      if (!expression) {
        return false;
      }
    }

    return true;
  };
};
