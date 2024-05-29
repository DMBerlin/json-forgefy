import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { SubtractOperatorInput } from "../types/operator-input.types";

export const $subtract: ExecutableExpression<
  SubtractOperatorInput,
  number
> = () => {
  return function (values: SubtractOperatorInput): number {
    return values.reduce(
      (accumulator: number, base: number) => accumulator - base,
    );
  };
};
