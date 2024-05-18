import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { SizeOperatorInput } from "../types/inputs.types";

export const $size: ExecutableExpression<SizeOperatorInput, number> = () => {
  return function (values: SizeOperatorInput): number {
    return values.length;
  };
};
