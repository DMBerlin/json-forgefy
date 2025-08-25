import { isOperator } from "../helpers/is-operator.helper";
import { resolveExpression } from "../common/resolve-expression.common";
import { ExecutionContext } from "../interfaces/execution-context.interface";
import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { DivideOperatorInput } from "../types/operator-input.types";

/**
 * The $divide operator performs division on an array of numbers.
 * It divides the first number by each subsequent number in sequence.
 * Supports nested operator expressions that resolve to numbers.
 *
 * @param ctx - Optional execution context containing the source object for expression resolution
 * @returns A function that divides the first number by all subsequent numbers
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   average: { $divide: ["$total", "$count"] }, // Calculate average
 *   percentage: { $divide: ["$part", "$whole"] }, // Calculate percentage (multiply by 100 if needed)
 *   nested: { $divide: [{ $add: [10, 20] }, 2] }, // Divides sum by 2, returns 15
 *   chain: { $divide: [100, 2, 5] } // Returns 10 (100 / 2 / 5)
 * }
 * ```
 */
export const $divide: ExecutableExpression<DivideOperatorInput, number> = (
  ctx?: ExecutionContext,
) => {
  return function (values: DivideOperatorInput): number {
    const prepare: number[] = values.map(
      (value: number | Record<string, any>) =>
        (typeof value === "object" && isOperator(value)
          ? resolveExpression<number>(ctx.context, value)
          : value) as number,
    );

    return prepare.reduce(
      (accumulator: number, base: number) => accumulator / base,
    );
  };
};
