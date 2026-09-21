import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { IsLeapYearOperatorInput } from "@lib-types/operator-input.types";
import {
  parseDate,
  isDirectDateInput,
  isLeapYear,
} from "@helpers/date-time.helper";
import { resolveFallback, hasFallback } from "@helpers/fallback.helper";
import { isObjectWithProperty } from "@helpers/is-object.helper";
import { OperatorInputError } from "@lib-types/error.types";

/**
 * $isLeapYear operator - Determines whether the year of a given date is a leap year.
 *
 * A year is a leap year when it is divisible by 4, except for years that are
 * divisible by 100 but not by 400 (e.g. 2000 is a leap year, 1900 is not).
 *
 * @returns A function that returns a boolean or uses fallback on error
 *
 * @example
 * ```typescript
 * // Direct date value
 * { $isLeapYear: "2024-01-15T10:30:00Z" } // Returns true
 * { $isLeapYear: "2023-01-15T10:30:00Z" } // Returns false
 *
 * // Object form with fallback
 * { $isLeapYear: { value: "invalid", fallback: false } }
 * ```
 */
export const $isLeapYear: ExecutableExpression<
  IsLeapYearOperatorInput,
  boolean
> = () => {
  return (input: IsLeapYearOperatorInput): boolean => {
    try {
      // Handle object with value and/or fallback
      if (isObjectWithProperty(input, "value")) {
        try {
          const date = parseDate(input.value);
          return isLeapYear(date.getUTCFullYear());
        } catch (error) {
          if (hasFallback(input)) {
            return resolveFallback(
              input.fallback,
              {},
              /* istanbul ignore next */
              error instanceof Error ? error : new Error("Invalid date"),
            );
          }
          throw error;
        }
      }

      // Handle direct date value (when input is string | number | Date)
      if (isDirectDateInput(input)) {
        const date = parseDate(input);
        return isLeapYear(date.getUTCFullYear());
      }

      // If we reach here, input is not a valid format
      throw new OperatorInputError(
        `Invalid input format. Expected date string/number/Date or object with 'value' property`,
        "$isLeapYear",
        input,
      );
    } catch (error) {
      // Preserve OperatorInputError for better error handling
      if (error instanceof OperatorInputError) {
        throw error;
      }
      throw new Error(
        /* istanbul ignore next - defensive: non-Error exceptions are extremely rare */
        `$isLeapYear: Invalid date value - ${/* istanbul ignore next */ error instanceof Error ? error.message : /* istanbul ignore next */ "Unknown error"}`,
      );
    }
  };
};
