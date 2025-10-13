import { getDateInTimezone, createDateInTimezone } from "./timezone.helper";

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
  return !isNaN(date.getTime());
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
    if (isNaN(input.getTime())) {
      throw new Error("Invalid Date object");
    }
    return input;
  }

  if (typeof input === "string") {
    // Validate ISO-8601 format
    const isoRegex =
      /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|[+-]\d{2}:\d{2})?)?$/;
    if (!isoRegex.test(input)) {
      throw new Error(`Invalid ISO-8601 date string: ${input}`);
    }

    const date = new Date(input);
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date string: ${input}`);
    }
    return date;
  }

  if (typeof input === "number") {
    // Detect if Unix timestamp (seconds) or JS timestamp (milliseconds)
    // Unix timestamps are typically < 10000000000 (before year 2286)
    const timestamp = input < 10000000000 ? input * 1000 : input;

    // Validate limits of representation first
    if (timestamp < -8640000000000000 || timestamp > 8640000000000000) {
      throw new Error(`Timestamp out of representable range: ${input}`);
    }

    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid timestamp: ${input}`);
    }

    return date;
  }

  throw new Error(`Unsupported date input type: ${typeof input}`);
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
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
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
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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
  return Math.floor(diffTime / (1000 * 3600 * 24 * 30));
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
  return Math.floor(diffTime / (1000 * 3600 * 24 * 365));
}
