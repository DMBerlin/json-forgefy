import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { LtOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $lt operator performs a "less than" comparison between two values.
 * It supports comparing literals, object paths, and nested operator expressions.
 *
 * Note: By the time this operator receives the values, all nested expressions
 * (including paths and nested operators) have already been resolved by resolveArgs
 * in resolveExpression. The operator simply performs the comparison.
 *
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
export const $lt: ExecutableExpression<LtOperatorInput, boolean> = () => {
  return function (value: LtOperatorInput): boolean {
    // All values are already resolved by resolveArgs
    const [firstValue, secondValue] = value;
    return firstValue < secondValue;
  };
};
