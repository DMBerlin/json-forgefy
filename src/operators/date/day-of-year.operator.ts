import { DayOfYearOperatorInput } from "@lib-types/operator-input.types";
import { getDayOfYear, MS_PER_DAY } from "@helpers/date-time.helper";
import { createDateFieldOperator } from "@helpers/date-field-operator.helper";

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
export const $dayOfYear = createDateFieldOperator<DayOfYearOperatorInput>({
  operatorName: "$dayOfYear",
  extractInTimezone: (date, timezone) => getDayOfYear(date, timezone),
  extractDirect: (date) => {
    // Use UTC methods for direct date values.
    // Date.UTC creates a more reliable UTC date.
    const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 0));
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / MS_PER_DAY);
  },
});
