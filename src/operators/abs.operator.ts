import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { AbsOperatorInput } from "../types/operator-inputs.types";

export const $abs: ExecutableExpression<AbsOperatorInput, number> = () => {
  return function (value: AbsOperatorInput): number {
    return Math.abs(value);
  };
};
