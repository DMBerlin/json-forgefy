import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { DateDiffOperatorInput } from "../types/operator-inputs.types";

export const $dateDiff: ExecutableExpression<
  DateDiffOperatorInput,
  number
> = () => {
  return function (input: DateDiffOperatorInput): number {
    const startDate = new Date(input.startDate);
    const endDate = new Date(input.endDate);
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    const diffMonths = diffDays / 30;
    const diffYears = diffDays / 365;
    switch (input.unit) {
      case "days":
        return diffDays;
      case "months":
        return diffMonths;
      case "years":
        return diffYears;
      default:
        throw new Error(`Invalid unit: ${input.unit}`);
    }
  };
};
