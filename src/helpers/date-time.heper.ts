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
