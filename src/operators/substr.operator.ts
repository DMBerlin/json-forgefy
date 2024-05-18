import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { SubstrOperatorInput } from "../types/inputs.types";

export const $substr: ExecutableExpression<
  SubstrOperatorInput,
  string
> = () => {
  return function (params: SubstrOperatorInput): string {
    return params.value.substring(params.start, params.start + params.length);
  };
};
