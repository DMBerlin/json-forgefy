import { ExecutableExpression } from "@src/interfaces/executable-expression.interface";
import { CeilOperatorInput } from "../types/operator-inputs.types";

export const $ceil: ExecutableExpression<CeilOperatorInput, number> = () => {
  return function (value: CeilOperatorInput): number {
    return Math.ceil(value);
  };
};
