import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { parseDate } from "@helpers/date-time.helper";
import { resolveFallback, hasFallback } from "@helpers/fallback.helper";
import { isObjectWithProperty } from "@helpers/is-object.helper";
import { isHoliday, validateHolidays } from "@helpers/business-day.helper";
import { IsHolidayOperatorInput } from "@lib-types/operator-input.types";

/**
 * $isHoliday operator - Checks if a date is in a list of holidays
 * Supports timezone-aware date comparison
 *
 * @returns A function that returns true if the date is a holiday, false otherwise
 *
 * @example
 * ```typescript
 * // Check if date is a holiday
 * { $isHoliday: { date: "2025-01-01T12:00:00Z", holidays: ["2025-01-01", "2025-12-25"] } } // Returns true
 *
 * // With timezone
 * { $isHoliday: { date: "2025-01-02T04:00:00Z", holidays: ["2025-01-01"], timezone: "America/New_York" } }
 *
 * // With fallback
 * { $isHoliday: { date: "invalid", holidays: ["2025-01-01"], fallback: false } }
 * ```
 */
export const $isHoliday: ExecutableExpression<
  IsHolidayOperatorInput,
  boolean
> = () => {
  return (input: IsHolidayOperatorInput): boolean => {
    try {
      if (!isObjectWithProperty(input, "date")) {
        throw new Error("$isHoliday requires an object with date and holidays");
      }

      validateHolidays(input.holidays);

      const date = parseDate(input.date);
      const timezone = input.timezone || "UTC";

      // Use shared business day helper
      return isHoliday(date, input.holidays, timezone);
    } catch (error) {
      if (hasFallback(input)) {
        return resolveFallback(
          input.fallback,
          {},
          /* istanbul ignore next */
          error instanceof Error
            ? error
            : new Error("Invalid date or holidays"),
        );
      }
      throw new Error(
        /* istanbul ignore next - defensive: non-Error exceptions are extremely rare */
        `$isHoliday: ${/* istanbul ignore next */ error instanceof Error ? error.message : /* istanbul ignore next */ "Unknown error"}`,
      );
    }
  };
};
