import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { CondOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $cond operator provides conditional logic (if-then-else) functionality.
 * It evaluates a condition and returns one of two values based on the result.
 * This is similar to a ternary operator in programming languages.
 *
 * Note: By the time this operator receives the value, all nested expressions
 * (including value.if, value.then, and value.else) have already been resolved
 * by resolveArgs in resolveExpression. The operator simply evaluates the
 * boolean condition and returns the appropriate branch.
 *
 * @returns A function that evaluates the condition and returns the appropriate value
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   status: {
 *     $cond: {
 *       if: { $eq: ["$amount", 0] },
 *       then: "Free",
 *       else: "Paid"
 *     }
 *   },
 *   discount: {
 *     $cond: {
 *       if: { $gt: ["$orderTotal", 100] },
 *       then: { $multiply: ["$orderTotal", 0.1] }, // 10% discount
 *       else: 0
 *     }
 *   }
 * }
 * ```
 */
export const $cond: ExecutableExpression<CondOperatorInput, unknown> = () => {
  return function (value: CondOperatorInput): unknown {
    // All expressions are already resolved by resolveArgs
    // Simply evaluate the condition and return the appropriate branch
    return value.if ? value.then : value.else;
  };
};
