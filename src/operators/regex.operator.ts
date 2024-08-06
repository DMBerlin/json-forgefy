import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { RegexOperatorInput } from "../types/operator-input.types";

export const $regex: ExecutableExpression<RegexOperatorInput, boolean> = () => {
  return function (value: RegexOperatorInput): boolean {
    const regexPattern: RegExp = new RegExp(value.pattern);
    return regexPattern.test(value.value);
  };
};
