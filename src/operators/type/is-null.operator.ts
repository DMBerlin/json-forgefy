import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { IsNullOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $isNull operator checks if a value is null or undefined.
 * It returns true if the value is null or undefined, false otherwise.
 * This is different from $ifNull which provides a fallback value.
 *
 * Note: By the time this operator receives the value, all nested expressions
 * (including paths and nested operators) have already been resolved by resolveArgs
 * in resolveExpression. The operator simply performs the null check.
 *
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
export const $isNull: ExecutableExpression<
  IsNullOperatorInput,
  boolean
> = () => {
  return function (expression: IsNullOperatorInput): boolean {
    // Expression is already resolved by resolveArgs
    return expression === null || expression === undefined;
  };
};
