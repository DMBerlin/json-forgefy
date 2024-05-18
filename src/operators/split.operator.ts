import { SplitOperatorInput } from "../types/operator-inputs.types";
import { ExecutableExpression } from "../interfaces/executable-expression.interface";

export const $split: ExecutableExpression<
  SplitOperatorInput,
  string[]
> = () => {
  return function (params: SplitOperatorInput): string[] {
    return params.input.split(params.delimiter);
  };
};
