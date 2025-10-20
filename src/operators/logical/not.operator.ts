import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { NotOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $not operator performs a logical NOT operation on a single expression.
 * It returns the opposite boolean value of the expression result.
 * If the expression is truthy, it returns false; if falsy, it returns true.
 *
 * Note: By the time this operator receives the expression, all nested expressions
 * (including paths and nested operators) have already been resolved by resolveArgs
 * in resolveExpression. The operator simply performs the logical NOT.
 *
 * @returns A function that returns the logical negation of the expression result
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   isNotActive: { $not: { $eq: ["$status", "active"] } },
 *   isNotAdmin: { $not: { $eq: ["$role", "admin"] } },
 *   hasNoBalance: { $not: { $gt: ["$balance", 0] } },
 *   isNotVerified: { $not: "$isVerified" }
 * }
 * ```
 */
export const $not: ExecutableExpression<NotOperatorInput, boolean> = () => {
  return function (expression: NotOperatorInput): boolean {
    // Expression is already resolved by resolveArgs
    return !expression;
  };
};
