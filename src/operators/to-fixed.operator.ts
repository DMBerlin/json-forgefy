import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { ToFixedOperatorInput } from "../types/operator-input.types";

export const $toFixed: ExecutableExpression<
  ToFixedOperatorInput,
  number
> = () => {
  return function (input: ToFixedOperatorInput): number {
    if (typeof input.value !== "number") return input.value;
    const rule: RegExp = new RegExp(
      "^-?\\d+(?:.\\d{0," + (input.precision || -1) + "})?",
    );
    return Number(input.value.toString().match(rule)[0]);
  };
};
