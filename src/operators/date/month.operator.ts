import { MonthOperatorInput } from "@lib-types/operator-input.types";
import { getDateInTimezone } from "@helpers/timezone.helper";
import { createDateFieldOperator } from "@helpers/date-field-operator.helper";

/**
 * $month operator - Extracts the month from a date (1-12, where 1 is January)
 * Supports timezone-aware calculations
 *
 * @returns A function that returns the month (1-12) or uses fallback on error
 *
 * @example
 * ```typescript
 * // Get month (UTC)
 * { $month: "2024-01-15T10:30:00Z" } // Returns 1 (January)
 *
 * // Get month in specific timezone
 * { $month: { date: "2024-02-01T02:00:00Z", timezone: "America/Sao_Paulo" } } // Returns 1 (still January)
 *
 * // With fallback
 * { $month: { date: "invalid", fallback: 1 } }
 * ```
 */
export const $month = createDateFieldOperator<MonthOperatorInput>({
  operatorName: "$month",
  extractInTimezone: (date, timezone) =>
    getDateInTimezone(date, timezone).month,
  extractDirect: (date) => date.getUTCMonth() + 1,
});
