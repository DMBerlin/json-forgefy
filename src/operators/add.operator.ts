import { AddOperatorInput } from "../types/operator-inputs.types";
import { ExecutableExpression } from "../interfaces/executable-expression.interface";

export const $add: ExecutableExpression<AddOperatorInput, number> = () => {
  return function (value: AddOperatorInput): number {
    return value.reduce(
      (accumulator: number, base: number) => accumulator + base,
      0,
    );
  };
};
