import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { ToUpperOperatorInput } from "../types/operator-input.types";

export const $toUpper: ExecutableExpression<
  ToUpperOperatorInput,
  string
> = () => {
  return function (value: ToUpperOperatorInput): string {
    return value.toUpperCase();
  };
};
