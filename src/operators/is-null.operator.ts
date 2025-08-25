import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ExecutionContext } from "@interfaces/execution-context.interface";
import { resolvePathOrExpression } from "@common/resolve-path-or-expression.common";
import { IsNullOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $isNull operator checks if a value is null or undefined.
 * It returns true if the value is null or undefined, false otherwise.
 * This is different from $ifNull which provides a fallback value.
 *
 * @param ctx - Optional execution context containing the source object for path/expression resolution
 * @returns A function that returns true if the value is null or undefined, false otherwise
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   emailMissing: { $isNull: "$user.email" },
 *   profileIncomplete: { $isNull: "$user.profile.bio" },
 *   hasNoValue: { $isNull: { $ifNull: ["$optionalField", null] } },
 *   isUndefined: { $isNull: "$nonExistentField" }
 * }
 * ```
 */
export const $isNull: ExecutableExpression<IsNullOperatorInput, boolean> = (
  ctx?: ExecutionContext,
) => {
  return function (expression: IsNullOperatorInput): boolean {
    const value = resolvePathOrExpression(expression, ctx);
    return value === null || value === undefined;
  };
};
