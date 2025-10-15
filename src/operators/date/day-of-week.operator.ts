import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { DayOfWeekOperatorInput } from "@lib-types/operator-input.types";
import { parseDate, isDirectDateInput } from "@helpers/date-time.heper";
import { getDateInTimezone } from "@helpers/timezone.helper";
import { resolveFallback } from "@helpers/fallback.helper";
import { OperatorInputError } from "@lib-types/error.types";

/**
 * $dayOfWeek operator - Extracts the day of the week from a date (0-6, where 0 is Sunday)
 * Supports timezone-aware calculations
 *
 * @returns A function that returns the day of week (0-6) or uses fallback on error
 *
 * @example
 * ```typescript
 * // Get day of week (UTC)
 * { $dayOfWeek: "2024-01-15T10:30:00Z" } // Returns 1 (Monday)
 *
 * // Get day of week in specific timezone
 * { $dayOfWeek: { date: "2024-01-15T23:30:00Z", timezone: "America/New_York" } }
 *
 * // With fallback
 * { $dayOfWeek: { date: "invalid", fallback: 0 } }
 * ```
 */
export const $dayOfWeek: ExecutableExpression<
  DayOfWeekOperatorInput,
  number
> = () => {
  return (input: DayOfWeekOperatorInput): number => {
    try {
      // Handle object with timezone and/or fallback
      if (typeof input === "object" && input !== null && "date" in input) {
        try {
          const date = parseDate(input.date);
          const timezone = input.timezone || "UTC";

          // Get the date in the specified timezone
          const dateInTz = getDateInTimezone(date, timezone);
          return dateInTz.dayOfWeek;
        } catch (error) {
          if (input.fallback !== undefined) {
            return resolveFallback(
              input.fallback,
              {},
              error instanceof Error ? error : new Error("Invalid date"),
            );
          }
          throw error;
        }
      }

      // Handle direct date value (when input is string | number | Date)
      if (isDirectDateInput(input)) {
        const date = parseDate(input);
        return date.getUTCDay();
      }

      // If we reach here, input is not a valid format
      throw new OperatorInputError(
        `Invalid input format. Expected date string/number/Date or object with 'date' property`,
        "$dayOfWeek",
        input,
      );
    } catch (error) {
      // Preserve OperatorInputError for better error handling
      if (error instanceof OperatorInputError) {
        throw error;
      }
      throw new Error(
        `$dayOfWeek: Invalid date value - ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  };
};
