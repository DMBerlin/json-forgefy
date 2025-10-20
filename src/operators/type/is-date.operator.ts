import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { IsDateOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $isDate operator checks if a value is a valid Date object or a valid date string.
 * It returns true if the value is a Date object with a valid time value, or a string
 * that can be parsed into a valid date, false otherwise.
 *
 * @returns A function that returns true if the value is a valid date, false otherwise
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   isDateObject: { $isDate: new Date() }, // Returns true
 *   isDateString: { $isDate: "2025-01-15" }, // Returns true
 *   isDateISOString: { $isDate: "2025-01-15T10:30:00Z" }, // Returns true
 *   isDateInvalid: { $isDate: "invalid-date" }, // Returns false
 *   isDateNumber: { $isDate: 42 }, // Returns false
 *   isDateNull: { $isDate: null }, // Returns false
 *   checkField: { $isDate: "$transaction.date" } // Returns true if date is valid
 * }
 * ```
 */
export const $isDate: ExecutableExpression<
  IsDateOperatorInput,
  boolean
> = () => {
  return function (value: IsDateOperatorInput): boolean {
    // Check if it's a Date object
    if (value instanceof Date) {
      return !isNaN(value.getTime());
    }

    // Check if it's a valid date string
    if (typeof value === "string") {
      const date = new Date(value);
      return !isNaN(date.getTime());
    }

    return false;
  };
};
