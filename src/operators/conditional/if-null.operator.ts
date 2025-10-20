import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { IfNullOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $ifNull operator provides null coalescing functionality.
 * It returns the first value if it's not null/undefined, otherwise returns the second value.
 * This is useful for providing default values when a field might be missing or null.
 *
 * Note: By the time this operator receives the values, all nested expressions
 * (including paths and nested operators) have already been resolved by resolveArgs
 * in resolveExpression. The operator simply performs the null check.
 *
 * @returns A function that returns the first non-null value or the fallback value
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   displayName: { $ifNull: ["$user.nickname", "$user.name"] }, // Use nickname or fallback to name
 *   price: { $ifNull: ["$salePrice", "$regularPrice"] }, // Use sale price or regular price
 *   status: { $ifNull: ["$customStatus", "active"] }, // Use custom status or default to "active"
 *   count: { $ifNull: [{ $size: "$items" }, 0] } // Use item count or default to 0
 * }
 * ```
 */
export const $ifNull: ExecutableExpression<
  IfNullOperatorInput,
  unknown | null
> = () => {
  return function (values: IfNullOperatorInput): unknown {
    // All values are already resolved by resolveArgs
    return values[0] ?? values[1];
  };
};
