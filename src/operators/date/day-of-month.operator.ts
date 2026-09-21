import { DayOfMonthOperatorInput } from "@lib-types/operator-input.types";
import { getDateInTimezone } from "@helpers/timezone.helper";
import { createDateFieldOperator } from "@helpers/date-field-operator.helper";

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
export const $dayOfMonth = createDateFieldOperator<DayOfMonthOperatorInput>({
  operatorName: "$dayOfMonth",
  extractInTimezone: (date, timezone) => getDateInTimezone(date, timezone).day,
  extractDirect: (date) => date.getUTCDate(),
});
