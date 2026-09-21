import { YearOperatorInput } from "@lib-types/operator-input.types";
import { getDateInTimezone } from "@helpers/timezone.helper";
import { createDateFieldOperator } from "@helpers/date-field-operator.helper";

/**
 * $year operator - Extracts the four-digit year from a date
 * Supports timezone-aware calculations
 *
 * @returns A function that returns the year or uses fallback on error
 *
 * @example
 * ```typescript
 * // Get year (UTC)
 * { $year: "2024-01-15T10:30:00Z" } // Returns 2024
 *
 * // Get year in specific timezone
 * { $year: { date: "2025-01-01T02:00:00Z", timezone: "America/Sao_Paulo" } } // Returns 2024
 *
 * // With fallback
 * { $year: { date: "invalid", fallback: 2000 } }
 * ```
 */
export const $year = createDateFieldOperator<YearOperatorInput>({
  operatorName: "$year",
  extractInTimezone: (date, timezone) => getDateInTimezone(date, timezone).year,
  extractDirect: (date) => date.getUTCFullYear(),
});
