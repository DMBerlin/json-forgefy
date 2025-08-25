import { ExecutionContext } from "../interfaces/execution-context.interface";
import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { LtOperatorInput } from "../types/operator-input.types";
import { resolvePathOrExpression } from "../common/resolve-path-or-expression.common";

/**
 * The $lt operator performs a "less than" comparison between two values.
 * It supports comparing literals, object paths, and nested operator expressions.
 *
 * @param ctx - Optional execution context containing the source object for path/expression resolution
 * @returns A function that returns true if the first value is less than the second, false otherwise
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   isAffordable: { $lt: ["$price", "$budget"] }, // Check if price < budget
 *   isYoung: { $lt: ["$user.age", 25] }, // Check if age < 25
 *   underLimit: { $lt: [{ $size: "$items" }, "$maxItems"] }, // Check if item count is under limit
 *   isDiscount: { $lt: ["$salePrice", "$originalPrice"] } // Check if sale price is lower
 * }
 * ```
 */
export const $lt: ExecutableExpression<LtOperatorInput, boolean> = (
  ctx?: ExecutionContext,
) => {
  return function (value: LtOperatorInput): boolean {
    const [firstExpression, secondExpression] = value;
    const firstValue = resolvePathOrExpression(firstExpression, ctx);
    const secondValue = resolvePathOrExpression(secondExpression, ctx);
    return firstValue < secondValue;
  };
};
