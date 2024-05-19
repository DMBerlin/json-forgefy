import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { DateDiffOperatorInput } from "@/types/operator-input.types";
import {
  diffInDays,
  diffInMonths,
  diffInYears,
  isValidDateString,
} from "@helpers/date-time.heper";

export const $dateDiff: ExecutableExpression<
  DateDiffOperatorInput,
  number
> = () => {
  return function (input: DateDiffOperatorInput): number {
    const startDate: Date = isValidDateString(input.startDate)
      ? new Date(input.startDate)
      : new Date();
    const endDate: Date = isValidDateString(input.endDate)
      ? new Date(input.endDate)
      : new Date();
    switch (input.unit) {
      case "days":
        return diffInDays(startDate, endDate);
      case "months":
        return diffInMonths(startDate, endDate);
      case "years":
        return diffInYears(startDate, endDate);
      default:
        throw new Error(`Invalid unit: ${input.unit}`);
    }
  };
};
