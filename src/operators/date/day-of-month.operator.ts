import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { DayOfMonthOperatorInput } from "@lib-types/operator-input.types";
import { parseDate, isDirectDateInput } from "@helpers/date-time.helper";
import { getDateInTimezone } from "@helpers/timezone.helper";
import { resolveFallback } from "@helpers/fallback.helper";
import { OperatorInputError } from "@lib-types/error.types";

/**
 * $dayOfMonth operator - Extracts the day of the month from a date (1-31)
 * Supports timezone-aware calculations
 *
 * @returns A function that returns the day of month (1-31) or uses fallback on error
 *
 * @example
 * ```typescript
 * // Get day of month (UTC)
 * { $dayOfMonth: "2024-01-15T10:30:00Z" } // Returns 15
 *
 * // Get day of month in specific timezone
 * { $dayOfMonth: { date: "2024-01-15T23:30:00Z", timezone: "America/New_York" } }
 *
 * // With fallback
 * { $dayOfMonth: { date: "invalid", fallback: 1 } }
 * ```
 */
export const $dayOfMonth: ExecutableExpression<
  DayOfMonthOperatorInput,
  number
> = () => {
  return (input: DayOfMonthOperatorInput): number => {
    try {
      // Handle object with timezone and/or fallback
      if (typeof input === "object" && input !== null && "date" in input) {
        try {
          const date = parseDate(input.date);
          const timezone = input.timezone || "UTC";

          // Get the date in the specified timezone
          const dateInTz = getDateInTimezone(date, timezone);
          return dateInTz.day;
        } catch (error) {
          if (input.fallback !== undefined) {
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
        return date.getUTCDate();
      }

      // If we reach here, input is not a valid format
      throw new OperatorInputError(
        `Invalid input format. Expected date string/number/Date or object with 'date' property`,
        "$dayOfMonth",
        input,
      );
    } catch (error) {
      // Preserve OperatorInputError for better error handling
      if (error instanceof OperatorInputError) {
        throw error;
      }
      throw new Error(
        /* istanbul ignore next - defensive: non-Error exceptions are extremely rare */
        `$dayOfMonth: Invalid date value - ${/* istanbul ignore next */ error instanceof Error ? error.message : /* istanbul ignore next */ "Unknown error"}`,
      );
    }
  };
};
