import { MinOperatorInput } from "../types/operator-inputs.types";
import { ExecutableExpression } from "@src/interfaces/executable-expression.interface";

export const $min: ExecutableExpression<MinOperatorInput, number> = () => {
  return function (values: MinOperatorInput): number {
    return Math.min(...values);
  };
};
