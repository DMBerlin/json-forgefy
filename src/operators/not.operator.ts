import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { ExecutionContext } from "../interfaces/execution-context.interface";
import { resolvePathOrExpression } from "../common/resolve-path-or-expression.common";
import { NotOperatorInput } from "../types/operator-input.types";

/**
 * The $not operator performs a logical NOT operation on a single expression.
 * It returns the opposite boolean value of the expression result.
 * If the expression is truthy, it returns false; if falsy, it returns true.
 *
 * @param ctx - Optional execution context containing the source object for path/expression resolution
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
export const $not: ExecutableExpression<NotOperatorInput, boolean> = (
  ctx?: ExecutionContext,
) => {
  return function (expression: NotOperatorInput): boolean {
    const result = resolvePathOrExpression(expression, ctx);
    return !result;
  };
};
