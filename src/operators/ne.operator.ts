import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { ExecutionContext } from "../interfaces/execution-context.interface";
import { resolvePathOrExpression } from "../common/resolve-path-or-expression.common";
import { NeOperatorInput } from "../types/operator-input.types";

/**
 * The $ne operator performs a "not equal" comparison between two values.
 * It returns true if the values are not equal, false if they are equal.
 * It supports comparing literals, object paths, and nested operator expressions.
 *
 * @param ctx - Optional execution context containing the source object for path/expression resolution
 * @returns A function that returns true if the values are not equal, false if they are equal
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   isNotDeleted: { $ne: ["$status", "deleted"] },
 *   isDifferentUser: { $ne: ["$userId", "$currentUserId"] },
 *   hasChanged: { $ne: ["$originalValue", "$currentValue"] },
 *   isNotZero: { $ne: ["$balance", 0] }
 * }
 * ```
 */
export const $ne: ExecutableExpression<NeOperatorInput, boolean> = (
  ctx?: ExecutionContext,
) => {
  return function (value: NeOperatorInput): boolean {
    const [firstExpression, secondExpression] = value;
    const firstValue = resolvePathOrExpression(firstExpression, ctx);
    const secondValue = resolvePathOrExpression(secondExpression, ctx);
    return firstValue !== secondValue;
  };
};
