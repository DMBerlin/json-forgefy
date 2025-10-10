import { resolveExpression } from "@common/resolve-expression.common";
import { ExecutionContext } from "@interfaces/execution-context.interface";
import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { CondOperatorInput } from "@lib-types/operator-input.types";
import { isOperator } from "@helpers/is-operator.helper";

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
    const source = ctx?.context;

    if (!source) {
      // If no context, return the raw values (fallback behavior)
      return resolveExpression(source, value.if) ? value.then : value.else;
    }

    // Check the condition - value.if is already resolved by resolveArgs
    const conditionResult = value.if;

    // Return the appropriate branch, resolving expressions if needed
    if (conditionResult) {
      return typeof value.then === "object" &&
        value.then !== null &&
        isOperator(value.then)
        ? resolveExpression(source, value.then)
        : value.then;
    } else {
      return typeof value.else === "object" &&
        value.else !== null &&
        isOperator(value.else)
        ? resolveExpression(source, value.else)
        : value.else;
    }
  };
};
