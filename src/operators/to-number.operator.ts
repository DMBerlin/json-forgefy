import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ToNumberOperatorInput } from "@/types/operator-input.types";

export const $toNumber: ExecutableExpression<
  ToNumberOperatorInput,
  number
> = () => {
  return function (value: string): number {
    return Number(value);
  };
};
