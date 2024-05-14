import { SubtractOperatorInput } from "../types/operator-inputs.types";
import { ExecutableExpression } from "../interfaces/executable-expression.interface";

export const $subtract: ExecutableExpression<
  SubtractOperatorInput,
  number
> = () => {
  return function (values: SubtractOperatorInput): number {
    return values.reduce(
      (accumulator: number, base: number) => accumulator - base,
      0,
    );
  };
};
