import { SizeOperatorInput } from "../types/operator-inputs.types";
import { ExecutableExpression } from "@src/interfaces/executable-expression.interface";

export const $size: ExecutableExpression<SizeOperatorInput, number> = () => {
  return function (values: SizeOperatorInput): number {
    return values.length;
  };
};
