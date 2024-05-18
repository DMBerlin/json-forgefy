import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { SplitOperatorInput } from "@/types/operator-input.types";

export const $split: ExecutableExpression<
  SplitOperatorInput,
  string[]
> = () => {
  return function (params: SplitOperatorInput): string[] {
    return params.input.split(params.delimiter);
  };
};
