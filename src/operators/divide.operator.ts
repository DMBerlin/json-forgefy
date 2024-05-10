import { isOperator } from "../helpers/is-operator.helper";
import { resolveExpression } from "../common/resolve-expression.common";

type DivideOperatorInput = number[];

export function $divide(source?: Record<string, any>) {
  return function (values: DivideOperatorInput): number {
    const prepare: number[] = values.map(
      (value: number | Record<string, any>) =>
        (typeof value === "object" && isOperator(value)
          ? resolveExpression<number>(source, value)
          : value) as number,
    );
    return prepare.reduce(
      (accumulator: number, base: number) => accumulator / base,
      1,
    );
  };
}
