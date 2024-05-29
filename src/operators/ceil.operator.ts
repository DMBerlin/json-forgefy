import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { CeilOperatorInput } from "../types/operator-input.types";

export const $ceil: ExecutableExpression<CeilOperatorInput, number> = () => {
  return function (value: CeilOperatorInput): number {
    return Math.ceil(value);
  };
};
