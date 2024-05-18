import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ToUpperOperatorInput } from "../types/inputs.types";

export const $toUpper: ExecutableExpression<
  ToUpperOperatorInput,
  string
> = () => {
  return function (value: string): string {
    return value.toUpperCase();
  };
};
