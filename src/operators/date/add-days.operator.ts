import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import {
  parseDate,
  formatDateISO,
  MS_PER_DAY,
} from "@helpers/date-time.helper";
import { resolveFallback, hasFallback } from "@helpers/fallback.helper";
import { isObjectWithProperties } from "@helpers/is-object.helper";
import { AddDaysOperatorInput } from "@lib-types/operator-input.types";

/**
 * $addDays operator - Adds or subtracts days from a date
 * Returns ISO-8601 formatted string
 *
 * @returns A function that returns the new date as ISO-8601 string
 *
 * @example
 * ```typescript
 * // Add 5 days
 * { $addDays: { date: "2025-01-01T12:00:00Z", days: 5 } } // Returns "2025-01-06T12:00:00.000Z"
 *
 * // Subtract 3 days
 * { $addDays: { date: "2025-01-10T12:00:00Z", days: -3 } } // Returns "2025-01-07T12:00:00.000Z"
 *
 * // With fallback
 * { $addDays: { date: "invalid", days: 1, fallback: "2025-01-01T00:00:00.000Z" } }
 * ```
 */
export const $addDays: ExecutableExpression<
  AddDaysOperatorInput,
  string
> = () => {
  return (input: AddDaysOperatorInput): string => {
    try {
      if (!isObjectWithProperties(input, ["date", "days"])) {
        throw new Error("$addDays requires an object with date and days");
      }

      // Validate days is a number (use Number.isFinite for modern validation)
      if (typeof input.days !== "number" || !Number.isFinite(input.days)) {
        throw new Error(
          `days must be a finite number, got: ${typeof input.days}`,
        );
      }

      // Parse and validate date
      const parsedDate = parseDate(input.date);

      // Add days using reliable millisecond arithmetic
      // Using constants ensures consistency and reduces errors
      const newDate = new Date(parsedDate.getTime() + input.days * MS_PER_DAY);

      // Return as ISO-8601 string
      return formatDateISO(newDate);
    } catch (error) {
      if (hasFallback(input)) {
        return resolveFallback(
          input.fallback,
          {},
          error instanceof Error ? error : new Error("Invalid date or days"),
        );
      }
      throw new Error(
        `$addDays: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  };
};
