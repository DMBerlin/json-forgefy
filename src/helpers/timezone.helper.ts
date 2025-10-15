/**
 * Timezone Helper
 *
 * Provides utilities for working with timezones using native JavaScript APIs.
 * Implements caching for Intl.DateTimeFormat instances to improve performance.
 */

import {
  MS_PER_HOUR,
  MS_PER_MINUTE,
  MS_PER_SECOND,
  MS_PER_DAY,
} from "./date-time.heper";

// Cache for Intl.DateTimeFormat instances by timezone
const formatterCache = new Map<string, Intl.DateTimeFormat>();

/**
 * Gets a cached Intl.DateTimeFormat instance for the given timezone
 * @param timezone - IANA timezone identifier (e.g., 'America/Sao_Paulo')
 * @returns Cached or new Intl.DateTimeFormat instance
 */
function getFormatter(timezone: string): Intl.DateTimeFormat {
  if (!formatterCache.has(timezone)) {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      weekday: "short",
    });
    formatterCache.set(timezone, formatter);
  }
  return formatterCache.get(timezone)!;
}

/**
 * Validates if a timezone is valid using Intl.DateTimeFormat
 * @param timezone - IANA timezone identifier to validate
 * @returns true if timezone is valid, false otherwise
 *
 * @example
 * isValidTimezone('America/Sao_Paulo') // true
 * isValidTimezone('Invalid/Timezone') // false
 */
export function isValidTimezone(timezone: string): boolean {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
    return true;
  } catch {
    return false;
  }
}

/**
 * Obtém a data em um timezone específico usando Intl.DateTimeFormat
 * Retorna componentes da data (year, month, day, hour, minute, second, dayOfWeek)
 *
 * @param date - Date object to convert
 * @param timezone - IANA timezone identifier
 * @returns Object with date components in the specified timezone
 *
 * @example
 * const date = new Date('2025-03-01T10:00:00Z');
 * getDateInTimezone(date, 'America/Sao_Paulo')
 * // { year: 2025, month: 3, day: 1, hour: 7, minute: 0, second: 0, dayOfWeek: 6 }
 */
export function getDateInTimezone(
  date: Date,
  timezone: string,
): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  dayOfWeek: number;
} {
  const formatter = getFormatter(timezone);
  const parts = formatter.formatToParts(date);
  const values: Record<string, string> = {};

  for (const part of parts) {
    if (part.type !== "literal") {
      values[part.type] = part.value;
    }
  }

  const dayOfWeekMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return {
    year: parseInt(values.year, 10),
    month: parseInt(values.month, 10),
    day: parseInt(values.day, 10),
    hour: parseInt(values.hour, 10),
    minute: parseInt(values.minute, 10),
    second: parseInt(values.second, 10),
    dayOfWeek: dayOfWeekMap[values.weekday],
  };
}

/**
 * Cria uma data em um timezone específico
 * Creates a Date object representing midnight (00:00:00) on the specified date in the given timezone
 *
 * @param year - Year (e.g., 2025)
 * @param month - Month (1-12)
 * @param day - Day of month (1-31)
 * @param timezone - IANA timezone identifier
 * @returns Date object adjusted for the timezone
 *
 * @example
 * createDateInTimezone(2025, 3, 1, 'America/Sao_Paulo')
 * // Returns Date representing 2025-03-01T00:00:00 in Sao Paulo timezone
 */
export function createDateInTimezone(
  year: number,
  month: number,
  day: number,
  timezone: string,
): Date {
  // Start with a UTC date at noon on the target date
  // Using noon reduces edge cases with DST transitions
  const utcDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));

  // Get the components in the target timezone
  const components = getDateInTimezone(utcDate, timezone);

  // Calculate how many hours we need to go back to reach midnight in the target timezone
  const hourDiff = components.hour;
  const minuteDiff = components.minute;
  const secondDiff = components.second;

  // Adjust the UTC date to get midnight in the target timezone
  // Using constants for reliability and consistency
  const adjustedDate = new Date(
    utcDate.getTime() -
      hourDiff * MS_PER_HOUR -
      minuteDiff * MS_PER_MINUTE -
      secondDiff * MS_PER_SECOND,
  );

  // Verify the result is correct
  const verifyComponents = getDateInTimezone(adjustedDate, timezone);

  // If the date components don't match, we need to adjust
  if (
    verifyComponents.year !== year ||
    verifyComponents.month !== month ||
    verifyComponents.day !== day
  ) {
    // Calculate the day difference using reliable constants
    const targetDate = new Date(year, month - 1, day);
    const actualDate = new Date(
      verifyComponents.year,
      verifyComponents.month - 1,
      verifyComponents.day,
    );
    const daysDiff = Math.round(
      (targetDate.getTime() - actualDate.getTime()) / MS_PER_DAY,
    );

    return new Date(adjustedDate.getTime() + daysDiff * MS_PER_DAY);
  }

  return adjustedDate;
}

/**
 * Obtém o offset de um timezone em milliseconds
 * Calculates the difference between UTC and the specified timezone for a given date
 *
 * @param date - Date object to calculate offset for
 * @param timezone - IANA timezone identifier
 * @returns Offset in milliseconds (positive if timezone is ahead of UTC)
 *
 * @example
 * const date = new Date('2025-03-01T12:00:00Z');
 * getTimezoneOffset(date, 'America/Sao_Paulo') // -10800000 (-3 hours in ms)
 */
export function getTimezoneOffset(date: Date, timezone: string): number {
  const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
  const tzDate = new Date(date.toLocaleString("en-US", { timeZone: timezone }));
  return tzDate.getTime() - utcDate.getTime();
}

/**
 * Clears the formatter cache
 * Useful for testing or memory management in long-running processes
 */
export function clearFormatterCache(): void {
  formatterCache.clear();
}
