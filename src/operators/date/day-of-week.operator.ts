import { DayOfWeekOperatorInput } from "@lib-types/operator-input.types";
import { getDateInTimezone } from "@helpers/timezone.helper";
import { createDateFieldOperator } from "@helpers/date-field-operator.helper";

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
export const $dayOfWeek = createDateFieldOperator<DayOfWeekOperatorInput>({
  operatorName: "$dayOfWeek",
  extractInTimezone: (date, timezone) =>
    getDateInTimezone(date, timezone).dayOfWeek,
  extractDirect: (date) => date.getUTCDay(),
});
