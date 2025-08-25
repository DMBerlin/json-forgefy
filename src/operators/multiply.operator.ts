import { isOperator } from "../helpers/is-operator.helper";
import { resolveExpression } from "../common/resolve-expression.common";
import { ExecutionContext } from "../interfaces/execution-context.interface";
import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { MultiplyOperatorInput } from "../types/operator-input.types";

/**
 * The $multiply operator performs multiplication on an array of numbers.
 * It multiplies all the provided values together and returns the product.
 * Supports nested operator expressions that resolve to numbers.
 * 
 * @param ctx - Optional execution context containing the source object for expression resolution
 * @returns A function that multiplies all numbers in the array and returns the product
 * 
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   total: { $multiply: [10, 2, 3] }, // Returns 60
 *   withPaths: { $multiply: ["$price", "$quantity"] }, // Multiplies values from paths
 *   percentage: { $multiply: ["$amount", 0.1] }, // Calculate 10% of amount
 *   nested: { $multiply: [{ $add: [5, 5] }, 3] } // Multiplies result of addition by 3
 * }
 * ```
 */
export const $multiply: ExecutableExpression<MultiplyOperatorInput, number> = (
  ctx?: ExecutionContext,
) => {
  return function (values: MultiplyOperatorInput): number {
    const prepare: number[] = values.map(
      (value: number | Record<string, any>) =>
        (typeof value === "object" && isOperator(value)
          ? resolveExpression<number>(ctx.context, value)
          : value) as number,
    );
    return prepare.reduce(
      (accumulator: number, base: number) => accumulator * base,
    );
  };
};
