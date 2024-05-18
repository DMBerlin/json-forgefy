import { MaxOperatorInput } from "../types/operator-inputs.types";
import { ExecutableExpression } from "../interfaces/executable-expression.interface";

export const $max: ExecutableExpression<MaxOperatorInput, number> = () => {
  return function (values: MaxOperatorInput): number {
    return Math.max(...values);
  };
};
