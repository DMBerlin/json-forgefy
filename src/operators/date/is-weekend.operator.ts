import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { parseDate, isDirectDateInput } from "@helpers/date-time.helper";
import { resolveFallback, hasFallback } from "@helpers/fallback.helper";
import { isWeekend, validateWeekends } from "@helpers/business-day.helper";
import { OperatorInputError } from "@lib-types/error.types";
import { IsWeekendOperatorInput } from "@lib-types/operator-input.types";

/**
 * $isWeekend operator - Checks if a date falls on a weekend
 * Supports custom weekend days and timezone-aware calculations
 *
 * @returns A function that returns true if the date is a weekend, false otherwise
 *
 * @example
 * ```typescript
 * // Check if Saturday (default weekends: [0, 6])
 * { $isWeekend: "2025-01-04T12:00:00Z" } // Returns true
 *
 * // Custom weekends (Friday and Saturday)
 * { $isWeekend: { date: "2025-01-03T12:00:00Z", weekends: [5, 6] } } // Returns true
 *
 * // With timezone
 * { $isWeekend: { date: "2025-01-05T04:00:00Z", timezone: "America/New_York" } }
 *
 * // With fallback
 * { $isWeekend: { date: "invalid", fallback: false } }
 * ```
 */
export const $isWeekend: ExecutableExpression<
  IsWeekendOperatorInput | string | number | Date,
  boolean
> = () => {
  return (input: IsWeekendOperatorInput | string | number | Date): boolean => {
    try {
      // Handle object with timezone, weekends, and/or fallback
      if (typeof input === "object" && input !== null && "date" in input) {
        try {
          const date = parseDate(input.date);
          const timezone = input.timezone || "UTC";
          const weekends = input.weekends || [0, 6];

          validateWeekends(weekends);

          // Use shared business day helper
          return isWeekend(date, weekends, timezone);
        } catch (error) {
          if (hasFallback(input)) {
            return resolveFallback(
              input.fallback,
              {},
              /* istanbul ignore next - defensive: non-Error exceptions are extremely rare */
              error instanceof Error
                ? error
                : /* istanbul ignore next */ new Error("Invalid date"),
            );
          }
          throw error;
        }
      }

      // Handle direct date value (when input is string | number | Date)
      if (isDirectDateInput(input)) {
        const date = parseDate(input);
        // Use shared business day helper with default weekends
        return isWeekend(date, [0, 6], "UTC");
      }

      // If we reach here, input is not a valid format
      throw new OperatorInputError(
        `Invalid input format. Expected date string/number/Date or object with 'date' property`,
        "$isWeekend",
        input,
      );
    } catch (error) {
      // Preserve OperatorInputError for better error handling
      if (error instanceof OperatorInputError) {
        throw error;
      }
      throw new Error(
        /* istanbul ignore next - defensive: non-Error exceptions are extremely rare */
        `$isWeekend: Invalid date value - ${/* istanbul ignore next */ error instanceof Error ? error.message : /* istanbul ignore next */ "Unknown error"}`,
      );
    }
  };
};
