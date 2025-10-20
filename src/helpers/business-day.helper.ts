import { parseDate } from "@helpers/date-time.helper";
import { getDateInTimezone } from "@helpers/timezone.helper";
import {
  InvalidHolidayError,
  InvalidWeekendError,
} from "@lib-types/error.types";

/**
 * Formats a date as YYYY-MM-DD string in the specified timezone
 */
export function formatDateKey(date: Date, timezone: string = "UTC"): string {
  const dateInTz = getDateInTimezone(date, timezone);
  return `${dateInTz.year}-${String(dateInTz.month).padStart(2, "0")}-${String(dateInTz.day).padStart(2, "0")}`;
}

/**
 * Normalizes an array of holiday dates to a Set of YYYY-MM-DD strings in the specified timezone
 */
export function normalizeHolidays(
  holidays: string[],
  timezone: string = "UTC",
): Set<string> {
  const holidaySet = new Set<string>();

  for (const holiday of holidays) {
    try {
      const holidayDate = parseDate(holiday);
      const holidayKey = formatDateKey(holidayDate, timezone);
      holidaySet.add(holidayKey);
    } catch {
      throw new InvalidHolidayError(
        `Invalid holiday date: ${holiday}. Expected ISO-8601 format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss.sssZ)`,
        holiday,
      );
    }
  }

  return holidaySet;
}

/**
 * Checks if a date is a holiday based on normalized holiday set
 */
export function isHoliday(
  date: Date,
  holidays: string[] | Set<string>,
  timezone: string = "UTC",
): boolean {
  const holidaySet =
    holidays instanceof Set ? holidays : normalizeHolidays(holidays, timezone);

  const dateKey = formatDateKey(date, timezone);
  return holidaySet.has(dateKey);
}

/**
 * Checks if a date is a weekend day
 */
export function isWeekend(
  date: Date,
  weekends: number[] = [0, 6],
  timezone: string = "UTC",
): boolean {
  const dateInTz = getDateInTimezone(date, timezone);
  return weekends.includes(dateInTz.dayOfWeek);
}

/**
 * Checks if a date is a business day (not weekend and not holiday)
 */
export function isBusinessDay(
  date: Date,
  options: {
    holidays?: string[] | Set<string>;
    weekends?: number[];
    timezone?: string;
  } = {},
): boolean {
  const { holidays = [], weekends = [0, 6], timezone = "UTC" } = options;

  // Check if it's a weekend
  if (isWeekend(date, weekends, timezone)) {
    return false;
  }

  // Check if it's a holiday
  const hasHolidays = Array.isArray(holidays)
    ? holidays.length > 0
    : holidays.size > 0;
  if (hasHolidays && isHoliday(date, holidays, timezone)) {
    return false;
  }

  return true;
}

/**
 * Validates weekend array values
 */
export function validateWeekends(weekends: number[]): void {
  if (!Array.isArray(weekends)) {
    throw new InvalidWeekendError(
      "weekends must be an array of numbers (0-6)",
      weekends,
    );
  }

  for (const weekend of weekends) {
    if (typeof weekend !== "number" || weekend < 0 || weekend > 6) {
      throw new InvalidWeekendError(
        "weekends must contain numbers between 0-6 (0=Sunday, 6=Saturday)",
        weekends,
      );
    }
  }
}

/**
 * Validates holidays array
 */
export function validateHolidays(holidays: string[]): void {
  if (!Array.isArray(holidays)) {
    throw new InvalidHolidayError(
      "holidays must be an array of ISO-8601 date strings",
      String(holidays),
    );
  }
}
