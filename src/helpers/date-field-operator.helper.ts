import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { parseDate, isDirectDateInput } from "@helpers/date-time.helper";
import { resolveFallback, hasFallback } from "@helpers/fallback.helper";
import { isObjectWithProperty } from "@helpers/is-object.helper";
import { OperatorInputError } from "@lib-types/error.types";

/**
 * The common input shape shared by the date-field operators ($dayOfWeek,
 * $dayOfMonth, $dayOfYear): either a direct date value or an object carrying a
 * `date` plus optional `timezone` / `fallback`.
 */
export type DateFieldOperatorInput =
  | string
  | number
  | Date
  | {
      date: string | number | Date;
      timezone?: string;
      fallback?: unknown;
    };

/**
 * Configuration for {@link createDateFieldOperator}. The only things that differ
 * between the date-field operators are their name and how the target field is
 * extracted from a date.
 */
export interface DateFieldOperatorConfig {
  /** Operator name (e.g. "$dayOfWeek"), used in error messages. */
  operatorName: string;
  /**
   * Extracts the numeric field from a date interpreted in the given timezone.
   * Used for the `{ date, timezone }` object input form.
   */
  extractInTimezone: (date: Date, timezone: string) => number;
  /**
   * Extracts the numeric field from a date using UTC semantics. Used for the
   * direct (string | number | Date) input form.
   */
  extractDirect: (date: Date) => number;
}

/**
 * Factory that builds a timezone-aware date-field operator. It centralizes the
 * shared control flow (object-with-`date` handling, timezone defaulting,
 * fallback resolution, direct-input handling, and error wrapping) so each
 * concrete operator only has to declare how its specific field is extracted.
 *
 * @param config - The operator name and field-extraction strategies
 * @returns An {@link ExecutableExpression} producing the extracted number
 *
 * @example
 * ```typescript
 * export const $dayOfMonth = createDateFieldOperator<DayOfMonthOperatorInput>({
 *   operatorName: "$dayOfMonth",
 *   extractInTimezone: (date, tz) => getDateInTimezone(date, tz).day,
 *   extractDirect: (date) => date.getUTCDate(),
 * });
 * ```
 */
export function createDateFieldOperator<T extends DateFieldOperatorInput>(
  config: DateFieldOperatorConfig,
): ExecutableExpression<T, number> {
  const { operatorName, extractInTimezone, extractDirect } = config;

  return () => {
    return (input: T): number => {
      try {
        // Handle object with timezone and/or fallback
        if (isObjectWithProperty(input, "date")) {
          try {
            const date = parseDate(input.date);
            const timezone = input.timezone || "UTC";
            return extractInTimezone(date, timezone);
          } catch (error) {
            if (hasFallback(input)) {
              return resolveFallback(
                input.fallback,
                {},
                /* istanbul ignore next */
                error instanceof Error ? error : new Error("Invalid date"),
              );
            }
            throw error;
          }
        }

        // Handle direct date value (when input is string | number | Date)
        if (isDirectDateInput(input)) {
          const date = parseDate(input);
          return extractDirect(date);
        }

        // If we reach here, input is not a valid format
        throw new OperatorInputError(
          `Invalid input format. Expected date string/number/Date or object with 'date' property`,
          operatorName,
          input,
        );
      } catch (error) {
        // Preserve OperatorInputError for better error handling
        if (error instanceof OperatorInputError) {
          throw error;
        }
        throw new Error(
          /* istanbul ignore next - defensive: non-Error exceptions are extremely rare */
          `${operatorName}: Invalid date value - ${/* istanbul ignore next */ error instanceof Error ? error.message : /* istanbul ignore next */ "Unknown error"}`,
        );
      }
    };
  };
}
