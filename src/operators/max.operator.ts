import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { MaxOperatorInput } from "../types/inputs.types";

export const $max: ExecutableExpression<MaxOperatorInput, number> = () => {
  return function (values: MaxOperatorInput): number {
    return Math.max(...values);
  };
};
