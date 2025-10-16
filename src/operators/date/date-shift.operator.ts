import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import {
  parseDate,
  formatDateISO,
  MS_PER_DAY,
} from "@helpers/date-time.helper";
import { isValidTimezone } from "@helpers/timezone.helper";
import { resolveFallback } from "@helpers/fallback.helper";
import {
  TimezoneValidationError,
  MaxIterationsError,
  InvalidStrategyError,
  InvalidHolidayError,
  InvalidWeekendError,
} from "@lib-types/error.types";
import { DateShiftOperatorInput } from "@lib-types/operator-input.types";
import {
  isBusinessDay,
  normalizeHolidays,
  validateHolidays,
  validateWeekends,
} from "@helpers/business-day.helper";

/**
 * $dateShift operator - Adjusts dates to business days by rolling forward/backward
 * Supports custom holidays, weekends, and timezone-aware calculations
 *
 * @returns A function that returns the adjusted date as ISO-8601 string
 *
 * @example
 * ```typescript
 * // === STRATEGY: rollForward (move to next business day) ===
 *
 * // Roll Saturday to next Monday
 * { $dateShift: { date: "2025-03-01T10:00:00Z", strategy: "rollForward" } }
 * // Returns "2025-03-03T10:00:00.000Z" (skips weekend)
 *
 * // Skip holiday on Monday, move to Tuesday
 * { $dateShift: {
 *   date: "2025-03-01T10:00:00Z",
 *   strategy: "rollForward",
 *   holidays: ["2025-03-03"]
 * } }
 * // Returns "2025-03-04T10:00:00.000Z" (skips weekend + holiday)
 *
 * // === STRATEGY: rollBackward (move to previous business day) ===
 *
 * // Roll Saturday back to Friday
 * { $dateShift: { date: "2025-03-01T10:00:00Z", strategy: "rollBackward" } }
 * // Returns "2025-02-28T10:00:00.000Z" (previous Friday)
 *
 * // Roll Sunday back to Friday (skips Saturday too)
 * { $dateShift: { date: "2025-03-02T10:00:00Z", strategy: "rollBackward" } }
 * // Returns "2025-02-28T10:00:00.000Z"
 *
 * // Roll back from holiday to previous business day
 * { $dateShift: {
 *   date: "2025-01-01T10:00:00Z",
 *   strategy: "rollBackward",
 *   holidays: ["2025-01-01"]
 * } }
 * // Returns "2024-12-31T10:00:00.000Z"
 *
 * // === STRATEGY: keep (no adjustment) ===
 *
 * // Keep date unchanged regardless of weekends/holidays
 * { $dateShift: { date: "2025-03-01T10:00:00Z", strategy: "keep" } }
 * // Returns "2025-03-01T10:00:00.000Z" (Saturday, but unchanged)
 *
 * { $dateShift: {
 *   date: "2025-01-01T10:00:00Z",
 *   strategy: "keep",
 *   holidays: ["2025-01-01"]
 * } }
 * // Returns "2025-01-01T10:00:00.000Z" (holiday, but unchanged)
 *
 * // === ADVANCED: Custom weekends ===
 *
 * // Middle East weekend (Friday and Saturday)
 * { $dateShift: {
 *   date: "2025-01-03T10:00:00Z",
 *   strategy: "rollForward",
 *   weekends: [5, 6]
 * } }
 * // Returns "2025-01-05T10:00:00.000Z" (Sunday is working day)
 *
 * // === ADVANCED: Timezone handling ===
 *
 * // Same UTC time, different local date due to timezone
 * { $dateShift: {
 *   date: "2025-03-01T03:00:00Z",
 *   strategy: "rollForward",
 *   timezone: "America/Sao_Paulo"
 * } }
 * // Friday in São Paulo (UTC-3), no adjustment needed
 *
 * // === ERROR HANDLING: Fallback ===
 *
 * // Invalid date with static fallback
 * { $dateShift: {
 *   date: "invalid-date",
 *   strategy: "rollForward",
 *   fallback: "2025-01-02T00:00:00.000Z"
 * } }
 * // Returns fallback value
 *
 * // Max iterations exceeded with fallback
 * { $dateShift: {
 *   date: "2025-01-01T10:00:00Z",
 *   strategy: "rollForward",
 *   holidays: ["2025-01-01", "2025-01-02", "2025-01-03", ...], // many holidays
 *   maxIterations: 10,
 *   fallback: "2025-02-01T00:00:00.000Z"
 * } }
 * // Returns fallback if can't find business day within 10 iterations
 * ```
 */
export const $dateShift: ExecutableExpression<
  DateShiftOperatorInput,
  string
> = () => {
  return (input: DateShiftOperatorInput): string => {
    try {
      if (!input || typeof input !== "object" || !("date" in input)) {
        throw new Error("$dateShift requires an object with date property");
      }

      // Parse and validate input parameters
      const date = parseDate(input.date);
      const timezone = input.timezone || "UTC";
      const strategy = input.strategy || "rollForward";
      const holidays = input.holidays || [];
      const weekends = input.weekends || [0, 6]; // Default: Sunday and Saturday
      const maxIterations = input.maxIterations || 365;

      // Validate timezone
      if (!isValidTimezone(timezone)) {
        throw new TimezoneValidationError(
          `Invalid timezone: ${timezone}`,
          timezone,
        );
      }

      // Validate strategy
      const validStrategies = ["rollForward", "rollBackward", "keep"];
      if (!validStrategies.includes(strategy)) {
        throw new InvalidStrategyError(
          `Invalid strategy: ${strategy}`,
          strategy,
          validStrategies,
        );
      }

      // Validate holidays and weekends arrays
      validateHolidays(holidays);
      validateWeekends(weekends);

      // Strategy "keep" - return immediately
      if (strategy === "keep") {
        return formatDateISO(date);
      }

      // Normalize holidays for efficient lookup
      const holidaySet = normalizeHolidays(holidays, timezone);

      // Apply adjustment strategy
      let currentDate = new Date(date.getTime()); // Create a copy
      let iterations = 0;

      while (
        !isBusinessDay(currentDate, {
          holidays: holidaySet,
          weekends,
          timezone,
        }) &&
        iterations < maxIterations
      ) {
        if (strategy === "rollForward") {
          // Add 1 day using reliable constant
          currentDate = new Date(currentDate.getTime() + MS_PER_DAY);
        } else if (strategy === "rollBackward") {
          // Subtract 1 day using reliable constant
          currentDate = new Date(currentDate.getTime() - MS_PER_DAY);
        }

        iterations++;
      }

      // Check if we hit the iteration limit
      if (iterations >= maxIterations) {
        throw new MaxIterationsError(
          `Maximum iterations (${maxIterations}) reached while trying to find a business day`,
          iterations,
        );
      }

      // Return the adjusted date
      return formatDateISO(currentDate);
    } catch (error) {
      if (input && typeof input === "object" && input.fallback !== undefined) {
        return resolveFallback(
          input.fallback,
          {},
          error instanceof Error
            ? error
            : new Error("Unknown error in $dateShift"),
        );
      }

      // Preserve specific error types for better error handling
      if (
        error instanceof TimezoneValidationError ||
        error instanceof MaxIterationsError ||
        error instanceof InvalidStrategyError ||
        error instanceof InvalidHolidayError ||
        error instanceof InvalidWeekendError
      ) {
        throw error;
      }

      throw new Error(
        `$dateShift: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  };
};
