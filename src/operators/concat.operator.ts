import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ConcatOperatorInput } from "../types/inputs.types";

export const $concat: ExecutableExpression<
  ConcatOperatorInput,
  string
> = () => {
  return function (value: ConcatOperatorInput): string {
    return value.reduce(
      (accumulator: string, base: string) => accumulator + base,
      "",
    );
  };
};
