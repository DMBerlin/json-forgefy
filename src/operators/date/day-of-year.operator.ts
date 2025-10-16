import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { DayOfYearOperatorInput } from "@lib-types/operator-input.types";
import {
  parseDate,
  getDayOfYear,
  isDirectDateInput,
  MS_PER_DAY,
} from "@helpers/date-time.helper";
import { resolveFallback } from "@helpers/fallback.helper";
import { OperatorInputError } from "@lib-types/error.types";

/**
 * $dayOfYear operator - Extracts the day of the year from a date (1-366)
 * Supports timezone-aware calculations and leap years
 *
 * @returns A function that returns the day of year (1-366) or uses fallback on error
 *
 * @example
 * ```typescript
 * // Get day of year (UTC)
 * { $dayOfYear: "2024-01-15T10:30:00Z" } // Returns 15
 *
 * // Get day of year in specific timezone
 * { $dayOfYear: { date: "2024-02-29T10:00:00Z", timezone: "UTC" } } // Returns 60 (leap year)
 *
 * // With fallback
 * { $dayOfYear: { date: "invalid", fallback: 1 } }
 * ```
 */
export const $dayOfYear: ExecutableExpression<
  DayOfYearOperatorInput,
  number
> = () => {
  return (input: DayOfYearOperatorInput): number => {
    try {
      // Handle object with timezone and/or fallback
      if (typeof input === "object" && input !== null && "date" in input) {
        try {
          const date = parseDate(input.date);
          const timezone = input.timezone || "UTC";

          // Calculate day of year in the specified timezone
          return getDayOfYear(date, timezone);
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
        // Use UTC methods for direct date values
        // Date.UTC creates a more reliable UTC date
        const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 0));
        const diff = date.getTime() - start.getTime();
        return Math.floor(diff / MS_PER_DAY);
      }

      // If we reach here, input is not a valid format
      throw new OperatorInputError(
        `Invalid input format. Expected date string/number/Date or object with 'date' property`,
        "$dayOfYear",
        input,
      );
    } catch (error) {
      // Preserve OperatorInputError for better error handling
      if (error instanceof OperatorInputError) {
        throw error;
      }
      throw new Error(
        `$dayOfYear: Invalid date value - ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  };
};
