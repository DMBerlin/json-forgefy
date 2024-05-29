import { isOperator } from "../helpers/is-operator.helper";
import { resolveExpression } from "../common/resolve-expression.common";
import { ExecutionContext } from "../interfaces/execution-context.interface";
import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { DivideOperatorInput } from "../types/operator-input.types";

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
