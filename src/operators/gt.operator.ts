import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { ExecutionContext } from "../interfaces/execution-context.interface";
import { resolvePathOrExpression } from "../common/resolve-path-or-expression.common";
import { GtOperatorInput } from "../types/operator-input.types";

/**
 * The $gt operator performs a "greater than" comparison between two values.
 * It supports comparing literals, object paths, and nested operator expressions.
 * 
 * @param ctx - Optional execution context containing the source object for path/expression resolution
 * @returns A function that returns true if the first value is greater than the second, false otherwise
 * 
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   isExpensive: { $gt: ["$price", 100] }, // Check if price > 100
 *   isOlder: { $gt: ["$user.age", "$minAge"] }, // Compare two path values
 *   exceedsLimit: { $gt: [{ $add: ["$base", "$extra"] }, "$limit"] }, // Compare expression result
 *   isPositive: { $gt: ["$balance", 0] } // Check if balance is positive
 * }
 * ```
 */
export const $gt: ExecutableExpression<GtOperatorInput, boolean> = (
  ctx?: ExecutionContext,
) => {
  return function (value: GtOperatorInput): boolean {
    const [firstExpression, secondExpression] = value;
    const firstValue = resolvePathOrExpression(firstExpression, ctx);
    const secondValue = resolvePathOrExpression(secondExpression, ctx);
    return firstValue > secondValue;
  };
};
