import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { IfNullOperatorInput } from "../types/operator-input.types";
import { isOperator } from "../helpers/is-operator.helper";
import { resolveExpression } from "../common/resolve-expression.common";
import { isValidObjectPath } from "../helpers/is-valid-object-path.helper";
import { getValueByPath } from "../common/get-value-by-path.common";
import { ExecutionContext } from "../interfaces/execution-context.interface";

/**
 * The $ifNull operator provides null coalescing functionality.
 * It returns the first value if it's not null/undefined, otherwise returns the second value.
 * This is useful for providing default values when a field might be missing or null.
 * 
 * @param ctx - Optional execution context containing the source object for path/expression resolution
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
> = (ctx?: ExecutionContext) => {
  return function (values: IfNullOperatorInput): unknown {
    if (typeof values[0] === "object" && isOperator(values[0])) {
      values[0] = resolveExpression(ctx?.context, values[0]);
    } else if (typeof values[0] === "string" && isValidObjectPath(values[0])) {
      values[0] = getValueByPath(ctx?.context, values[0]);
    }
    return values[0] ?? values[1];
  };
};
