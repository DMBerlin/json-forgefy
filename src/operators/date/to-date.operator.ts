import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ToDateOperatorInput } from "@lib-types/operator-input.types";
import { parseDate, isDirectDateInput } from "@helpers/date-time.helper";
import { resolveFallback } from "@helpers/fallback.helper";
import { OperatorInputError } from "@lib-types/error.types";

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
            /* istanbul ignore next */
            error instanceof Error ? error : new Error("Invalid date"),
          );
        }
      }

      // Handle direct value (when input is string | number | Date)
      if (isDirectDateInput(input)) {
        return parseDate(input);
      }

      // If we reach here, input is not a valid format
      throw new OperatorInputError(
        `Invalid input format. Expected date string/number/Date or object with 'value' property`,
        "$toDate",
        input,
      );
    } catch (error) {
      // Preserve OperatorInputError for better error handling
      if (error instanceof OperatorInputError) {
        throw error;
      }
      throw new Error(
        /* istanbul ignore next - defensive: non-Error exceptions are extremely rare */
        `$toDate: Invalid date value - ${/* istanbul ignore next */ error instanceof Error ? error.message : /* istanbul ignore next */ "Unknown error"}`,
      );
    }
  };
};
