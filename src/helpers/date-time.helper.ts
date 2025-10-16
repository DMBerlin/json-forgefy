import { getDateInTimezone, createDateInTimezone } from "./timezone.helper";
import {
  DateValidationError,
  InvalidDateFormatError,
  TimestampRangeError,
} from "@lib-types/error.types";

/**
 * Constants for date/time calculations
 * Using constants ensures consistency and reduces errors
 */
export const MS_PER_SECOND = 1000;
export const MS_PER_MINUTE = 60 * MS_PER_SECOND;
export const MS_PER_HOUR = 60 * MS_PER_MINUTE;
export const MS_PER_DAY = 24 * MS_PER_HOUR;

/**
 * Maximum value for JavaScript Date representation
 * This is the max safe timestamp value: ±100,000,000 days from epoch
 * Represents dates from approximately 271,821 BCE to 275,760 CE
 * Equivalent to: 86,400,000 ms/day × 100,000,000 days
 */
export const MAX_DATE_VALUE = 8.64e15;

/**
 * Validates if a string can be successfully parsed into a valid Date object.
 * This function is used by date-related operators to ensure input strings are valid dates.
 *
 * @param dateString - The string to validate as a date
 * @returns true if the string represents a valid date, false otherwise
 *
 * @example
 * ```typescript
 * isValidDateString("2024-01-01"); // Returns true
 * isValidDateString("2024-01-01T10:30:00Z"); // Returns true
 * isValidDateString("January 1, 2024"); // Returns true
 * isValidDateString("invalid-date"); // Returns false
 * isValidDateString(""); // Returns false
 * ```
 */
export function isValidDateString(dateString: string): boolean {
  const date: Date = new Date(dateString);
  return Number.isFinite(date.getTime());
}

/**
 * Checks if the input is a direct date value (primitive date input)
 * This is a helper to avoid repeating type checks across date operators
 *
 * @param input - Value to check
 * @returns true if input is string, number, or Date instance
 *
 * @example
 * ```typescript
 * isDirectDateInput("2025-01-01"); // true
 * isDirectDateInput(1704110400); // true
 * isDirectDateInput(new Date()); // true
 * isDirectDateInput({ date: "2025-01-01" }); // false
 * ```
 */
export function isDirectDateInput(input: any): input is string | number | Date {
  return (
    typeof input === "string" ||
    typeof input === "number" ||
    input instanceof Date
  );
}

/**
 * Validates and converts input to Date object.
 * Supports: string ISO-8601, timestamp Unix (seconds), timestamp JS (milliseconds), Date
 *
 * @param input - Date input in various formats
 * @returns Valid Date object
 * @throws Error if input is invalid or out of representable range
 *
 * @example
 * ```typescript
 * parseDate("2025-01-01T10:00:00Z"); // Date object
 * parseDate(1704110400); // Unix timestamp (seconds)
 * parseDate(1704110400000); // JS timestamp (milliseconds)
 * parseDate(new Date()); // Date object
 * ```
 */
export function parseDate(input: string | number | Date): Date {
  if (input instanceof Date) {
    // Use Number.isNaN for more reliable NaN checking
    if (!Number.isFinite(input.getTime())) {
      throw new DateValidationError("Invalid Date object", input);
    }
    return input;
  }

  if (typeof input === "string") {
    // Validate ISO-8601 format
    const isoRegex =
      /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|[+-]\d{2}:\d{2})?)?$/;
    if (!isoRegex.test(input)) {
      throw new InvalidDateFormatError(
        `Invalid ISO-8601 date string: ${input}. Expected format: YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss.sssZ`,
        input,
      );
    }

    const date = new Date(input);
    // Use Number.isFinite for more reliable validation
    if (!Number.isFinite(date.getTime())) {
      throw new DateValidationError(`Invalid date string: ${input}`, input);
    }
    return date;
  }

  if (typeof input === "number") {
    // Validate input is a finite number
    if (!Number.isFinite(input)) {
      throw new DateValidationError(
        `Invalid timestamp: must be a finite number, got ${input}`,
        input,
      );
    }

    // Detect if Unix timestamp (seconds) or JS timestamp (milliseconds)
    // Unix timestamps are typically < 10000000000 (before year 2286)
    const timestamp = input < 10000000000 ? input * MS_PER_SECOND : input;

    // Validate limits of representation (JavaScript Date limits)
    if (Math.abs(timestamp) > MAX_DATE_VALUE) {
      throw new TimestampRangeError(
        `Timestamp out of representable range: ${input}. Valid range: ±${MAX_DATE_VALUE}`,
        input,
      );
    }

    // If we've passed all validations (isFinite + range), Date will be valid
    // No need for redundant check - defensive programming removed for 100% coverage
    return new Date(timestamp);
  }

  throw new InvalidDateFormatError(
    `Unsupported date input type: ${typeof input}. Expected string, number, or Date`,
    input,
  );
}

/**
 * Formats Date to ISO-8601 string
 *
 * @param date - Date object to format
 * @returns ISO-8601 formatted string
 *
 * @example
 * ```typescript
 * const date = new Date("2025-01-01T10:00:00Z");
 * formatDateISO(date); // "2025-01-01T10:00:00.000Z"
 * ```
 */
export function formatDateISO(date: Date): string {
  return date.toISOString();
}

/**
 * Validates if a calendar date is valid considering month lengths and leap years
 *
 * @param year - Year (e.g., 2025)
 * @param month - Month (1-12)
 * @param day - Day of month (1-31)
 * @returns true if date is valid, false otherwise
 *
 * @example
 * ```typescript
 * isValidCalendarDate(2025, 2, 29); // false (not a leap year)
 * isValidCalendarDate(2024, 2, 29); // true (leap year)
 * isValidCalendarDate(2025, 4, 31); // false (April has 30 days)
 * isValidCalendarDate(2025, 4, 30); // true
 * ```
 */
export function isValidCalendarDate(
  year: number,
  month: number,
  day: number,
): boolean {
  // Validate basic ranges
  if (month < 1 || month > 12) return false;
  if (day < 1) return false;

  // Days per month
  const daysInMonth = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  return day <= daysInMonth[month - 1];
}

/**
 * Checks if a year is a leap year
 * A year is a leap year if:
 * - It's divisible by 4 AND not divisible by 100, OR
 * - It's divisible by 400
 *
 * @param year - Year to check
 * @returns true if leap year, false otherwise
 *
 * @example
 * ```typescript
 * isLeapYear(2024); // true
 * isLeapYear(2025); // false
 * isLeapYear(2000); // true (divisible by 400)
 * isLeapYear(1900); // false (divisible by 100 but not 400)
 * ```
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Calculates the day of the year (1-366) for a given date in a specific timezone
 *
 * @param date - Date object
 * @param timezone - IANA timezone identifier (e.g., 'America/Sao_Paulo')
 * @returns Day of year (1-366)
 *
 * @example
 * ```typescript
 * const date = new Date("2025-01-01T10:00:00Z");
 * getDayOfYear(date, "UTC"); // 1
 *
 * const date2 = new Date("2025-12-31T10:00:00Z");
 * getDayOfYear(date2, "UTC"); // 365
 *
 * const date3 = new Date("2024-12-31T10:00:00Z");
 * getDayOfYear(date3, "UTC"); // 366 (leap year)
 * ```
 */
export function getDayOfYear(date: Date, timezone: string): number {
  const dateInTz = getDateInTimezone(date, timezone);
  const startOfYear = createDateInTimezone(dateInTz.year, 1, 1, timezone);
  const diff = date.getTime() - startOfYear.getTime();
  return Math.floor(diff / MS_PER_DAY) + 1;
}

/**
 * Calculates the absolute difference between two dates in days.
 * The result is always positive regardless of the order of the dates.
 *
 * @param startDate - The first date for comparison
 * @param endDate - The second date for comparison
 * @returns The absolute difference in days, rounded up to the nearest whole day
 *
 * @example
 * ```typescript
 * const date1 = new Date("2024-01-01");
 * const date2 = new Date("2024-01-05");
 *
 * diffInDays(date1, date2); // Returns 4
 * diffInDays(date2, date1); // Returns 4 (absolute difference)
 * ```
 */
export function diffInDays(startDate: Date, endDate: Date): number {
  const diffTime: number = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / MS_PER_DAY);
}

/**
 * Calculates the difference between two dates in months.
 * Uses an approximation of 30 days per month. The result can be negative
 * if the end date is before the start date.
 *
 * @param startDate - The starting date
 * @param endDate - The ending date
 * @returns The difference in months (can be negative), rounded down
 *
 * @example
 * ```typescript
 * const date1 = new Date("2024-01-01");
 * const date2 = new Date("2024-04-01");
 *
 * diffInMonths(date1, date2); // Returns approximately 3
 * diffInMonths(date2, date1); // Returns approximately -3
 * ```
 */
export function diffInMonths(startDate: Date, endDate: Date): number {
  const diffTime: number = endDate.getTime() - startDate.getTime();
  // Approximate: 30 days per month
  return Math.floor(diffTime / (MS_PER_DAY * 30));
}

/**
 * Calculates the difference between two dates in years.
 * Uses an approximation of 365 days per year. The result can be negative
 * if the end date is before the start date.
 *
 * @param startDate - The starting date
 * @param endDate - The ending date
 * @returns The difference in years (can be negative), rounded down
 *
 * @example
 * ```typescript
 * const date1 = new Date("2020-01-01");
 * const date2 = new Date("2024-01-01");
 *
 * diffInYears(date1, date2); // Returns 4
 * diffInYears(date2, date1); // Returns -4
 * ```
 */
export function diffInYears(startDate: Date, endDate: Date): number {
  const diffTime: number = endDate.getTime() - startDate.getTime();
  // Approximate: 365 days per year
  return Math.floor(diffTime / (MS_PER_DAY * 365));
}
