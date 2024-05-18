import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { SliceOperatorInput } from "../types/operator-inputs.types";

export const $slice: ExecutableExpression<SliceOperatorInput, string> = () => {
  return function (params: SliceOperatorInput): string {
    return params.input.slice(params.start, params.end);
  };
};
