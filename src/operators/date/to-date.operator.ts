import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ToDateOperatorInput } from "@lib-types/operator-input.types";
import { parseDate } from "@helpers/date-time.heper";
import { resolveFallback } from "@helpers/fallback.helper";

/**
 * $toDate operator - Converts and validates dates
 * Supports ISO-8601 strings, Unix timestamps (seconds or milliseconds), and Date objects
 *
 * @returns A function that converts the input to a Date object or uses fallback on error
 *
 * @example
 * ```typescript
 * // Convert ISO string
 * { $toDate: "2024-01-15T10:30:00Z" } // Returns Date object
 *
 * // Convert Unix timestamp (milliseconds)
 * { $toDate: 1705318200000 } // Returns Date object
 *
 * // Convert Unix timestamp (seconds)
 * { $toDate: 1705318200 } // Returns Date object
 *
 * // With fallback
 * { $toDate: { value: "invalid", fallback: "2024-01-01T00:00:00Z" } }
 * ```
 */
export const $toDate: ExecutableExpression<ToDateOperatorInput, Date> = () => {
  return (input: ToDateOperatorInput): Date => {
    try {
      // Handle object with fallback
      if (typeof input === "object" && input !== null && "value" in input) {
        try {
          return parseDate(input.value);
        } catch (error) {
          return resolveFallback(
            input.fallback,
            {},
            error instanceof Error ? error : new Error("Invalid date"),
          );
        }
      }

      // Handle direct value (when input is string | number | Date)
      if (
        typeof input === "string" ||
        typeof input === "number" ||
        input instanceof Date
      ) {
        return parseDate(input);
      }

      // If we reach here, input is not a valid format
      throw new Error("Invalid input format");
    } catch (error) {
      throw new Error(
        `$toDate: Invalid date value - ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  };
};
