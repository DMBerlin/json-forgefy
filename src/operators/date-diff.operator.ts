import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { DateDiffOperatorInput } from "../types/operator-input.types";
import {
  diffInDays,
  diffInMonths,
  diffInYears,
  isValidDateString,
} from "../helpers/date-time.heper";

/**
 * The $dateDiff operator calculates the difference between two dates in the specified unit.
 * It supports calculating differences in days, months, or years.
 * If invalid date strings are provided, it defaults to the current date.
 *
 * @returns A function that calculates the date difference in the specified unit
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   ageInYears: {
 *     $dateDiff: {
 *       startDate: "$user.birthDate",
 *       endDate: "$currentDate",
 *       unit: "years"
 *     }
 *   },
 *   daysSinceOrder: {
 *     $dateDiff: {
 *       startDate: "$order.createdAt",
 *       endDate: "2024-01-15T00:00:00Z",
 *       unit: "days"
 *     }
 *   },
 *   monthsEmployed: {
 *     $dateDiff: {
 *       startDate: "$employee.startDate",
 *       endDate: "$employee.endDate",
 *       unit: "months"
 *     }
 *   }
 * }
 * ```
 */
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
