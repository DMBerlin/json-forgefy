import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { ToLowerOperatorInput } from "../types/operator-inputs.types";

export const $toLower: ExecutableExpression<
  ToLowerOperatorInput,
  string
> = () => {
  return function (value: ToLowerOperatorInput): string {
    return value.toLowerCase();
  };
};
