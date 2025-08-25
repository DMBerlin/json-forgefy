import { resolveExpression } from "../common/resolve-expression.common";
import { ExecutionContext } from "../interfaces/execution-context.interface";
import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { CondOperatorInput } from "../types/operator-input.types";

/**
 * The $cond operator provides conditional logic (if-then-else) functionality.
 * It evaluates a condition and returns one of two values based on the result.
 * This is similar to a ternary operator in programming languages.
 *
 * @param ctx - Optional execution context containing the source object for expression resolution
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
export const $cond: ExecutableExpression<CondOperatorInput, unknown> = (
  ctx?: ExecutionContext,
) => {
  return function (value: CondOperatorInput): unknown {
    return resolveExpression(ctx?.context, value.if) ? value.then : value.else;
  };
};
