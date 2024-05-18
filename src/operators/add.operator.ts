import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { AddOperatorInput } from "../types/inputs.types";

export const $add: ExecutableExpression<AddOperatorInput, number> = () => {
  return function (value: AddOperatorInput): number {
    return value.reduce(
      (accumulator: number, base: number) => accumulator + base,
      0,
    );
  };
};
