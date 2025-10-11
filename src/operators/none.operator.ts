import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { NoneOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $none operator performs a logical check on an array of expressions.
 * It returns true only if ALL expressions evaluate to false (are falsy), false otherwise.
 * This is the inverse of the $or operator - it checks that no conditions are met.
 *
 * Note: By the time this operator receives the expressions, all nested expressions
 * (including paths and nested operators) have already been resolved by resolveArgs
 * in resolveExpression. The operator simply checks that all values are falsy.
 *
 * @returns A function that returns true if all expressions are falsy, false if any is truthy
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   noErrors: {
 *     $none: [
 *       { $exists: "errors.critical" },
 *       { $exists: "errors.warning" },
 *       { $gt: ["$errorCount", 0] }
 *     ]
 *   },
 *   isInactive: {
 *     $none: [
 *       { $eq: ["$status", "active"] },
 *       { $eq: ["$status", "pending"] },
 *       { $gt: ["$lastActivity", "$threshold"] }
 *     ]
 *   }
 * }
 * ```
 */
export const $none: ExecutableExpression<NoneOperatorInput, boolean> = () => {
  return function (expressions: NoneOperatorInput): boolean {
    // Return true for empty array (no conditions to fail)
    if (expressions.length === 0) {
      return true;
    }

    // All expressions are already resolved by resolveArgs
    // Return false if any expression is truthy
    for (const expression of expressions) {
      if (expression) {
        return false;
      }
    }

    return true;
  };
};
