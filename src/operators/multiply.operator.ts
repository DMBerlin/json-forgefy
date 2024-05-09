import { isOperator } from "../helpers/is-operator.common";
import { resolveExpression } from "../common/resolve-expression.common";

type MultiplyOperatorInput = number[];

export function $multiply(source?: Record<string, any>) {
  return function (values: MultiplyOperatorInput): number {
    const prepare: number[] = values.map(
      (value: number | Record<string, any>) =>
        (typeof value === "object" && isOperator(value)
          ? resolveExpression<number>(source, value)
          : value) as number,
    );
    return prepare.reduce(
      (accumulator: number, base: number) => accumulator * base,
      1,
    );
  };
}
