import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { ToStringOperatorInput } from "../types/operator-inputs.types";

export const $toString: ExecutableExpression<
  ToStringOperatorInput,
  string
> = () => {
  return function (value: unknown): string {
    return String(value);
  };
};
