import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { MinOperatorInput } from "../types/operator-input.types";

export const $min: ExecutableExpression<MinOperatorInput, number> = () => {
  return function (values: MinOperatorInput): number {
    return Math.min(...values);
  };
};
