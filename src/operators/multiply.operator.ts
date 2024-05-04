import { isOperator } from "../helpers/is-operator.common";
import { resolveOperation } from "../common/resolve-operation.common";

export function multiply(source?: Record<string, any>) {
  return function (values: number[]) {
    const prepare: number[] = values.map(
      (value: number | Record<string, any>) =>
        (typeof value === "object" && isOperator(value)
          ? resolveOperation<number>(source, value)
          : value) as number,
    );
    return prepare.reduce(
      (accumulator: number, base: number) => accumulator * base,
      1,
    );
  };
}
