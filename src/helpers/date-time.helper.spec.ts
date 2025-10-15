import {
  diffInDays,
  diffInMonths,
  diffInYears,
  isValidDateString,
  isDirectDateInput,
  parseDate,
  formatDateISO,
  isValidCalendarDate,
  isLeapYear,
  getDayOfYear,
  MS_PER_SECOND,
  MS_PER_MINUTE,
  MS_PER_HOUR,
  MS_PER_DAY,
  MAX_DATE_VALUE,
} from "@helpers/date-time.heper";
import {
  DateValidationError,
  InvalidDateFormatError,
  TimestampRangeError,
} from "@lib-types/error.types";

describe("DateTimeHelper", () => {
  let startDate: Date;
  let endDate: Date;

  describe("Time constants", () => {
    it("should define MS_PER_SECOND correctly", () => {
      expect(MS_PER_SECOND).toBe(1000);
    });

    it("should define MS_PER_MINUTE correctly", () => {
      expect(MS_PER_MINUTE).toBe(60 * 1000);
      expect(MS_PER_MINUTE).toBe(60000);
    });

    it("should define MS_PER_HOUR correctly", () => {
      expect(MS_PER_HOUR).toBe(60 * 60 * 1000);
      expect(MS_PER_HOUR).toBe(3600000);
    });

    it("should define MS_PER_DAY correctly", () => {
      expect(MS_PER_DAY).toBe(24 * 60 * 60 * 1000);
      expect(MS_PER_DAY).toBe(86400000);
    });

    it("should use constants for reliable date arithmetic", () => {
      const date = new Date("2025-01-01T00:00:00Z");
      const nextDay = new Date(date.getTime() + MS_PER_DAY);
      expect(nextDay.toISOString()).toBe("2025-01-02T00:00:00.000Z");
    });

    it("should define MAX_DATE_VALUE correctly", () => {
      expect(MAX_DATE_VALUE).toBe(8.64e15);
      expect(MAX_DATE_VALUE).toBe(8640000000000000);
    });

    it("should validate dates within MAX_DATE_VALUE range", () => {
      // Create dates at the boundaries
      const maxDate = new Date(MAX_DATE_VALUE);
      const minDate = new Date(-MAX_DATE_VALUE);

      expect(Number.isFinite(maxDate.getTime())).toBe(true);
      expect(Number.isFinite(minDate.getTime())).toBe(true);
    });

    it("should represent meaningful date range", () => {
      // MAX_DATE_VALUE should represent approximately ±100 million days from epoch
      const daysRepresented = MAX_DATE_VALUE / MS_PER_DAY;
      expect(daysRepresented).toBe(100000000); // 100 million days
    });
  });

  describe("isValidDateString", () => {
    it("should return true for valid date strings", () => {
      expect(isValidDateString("2024-01-01")).toBe(true);
      expect(isValidDateString("2024-01-01T10:30:00Z")).toBe(true);
      expect(isValidDateString("January 1, 2024")).toBe(true);
      expect(isValidDateString("01/01/2024")).toBe(true);
    });

    it("should return false for invalid date strings", () => {
      expect(isValidDateString("invalid-date")).toBe(false);
      expect(isValidDateString("")).toBe(false);
      expect(isValidDateString("not a date")).toBe(false);
    });
  });

  describe("isDirectDateInput", () => {
    it("should return true for string inputs", () => {
      expect(isDirectDateInput("2024-01-01")).toBe(true);
      expect(isDirectDateInput("2024-01-01T10:30:00Z")).toBe(true);
      expect(isDirectDateInput("")).toBe(true); // String type check, not validation
    });

    it("should return true for number inputs", () => {
      expect(isDirectDateInput(1704110400)).toBe(true); // Unix timestamp
      expect(isDirectDateInput(1704110400000)).toBe(true); // JS timestamp
      expect(isDirectDateInput(0)).toBe(true);
    });

    it("should return true for Date object inputs", () => {
      expect(isDirectDateInput(new Date())).toBe(true);
      expect(isDirectDateInput(new Date("2024-01-01"))).toBe(true);
    });

    it("should return false for object inputs (not Date)", () => {
      expect(isDirectDateInput({ date: "2024-01-01" })).toBe(false);
      expect(isDirectDateInput({ value: 123 })).toBe(false);
      expect(isDirectDateInput({})).toBe(false);
    });

    it("should return false for other types", () => {
      expect(isDirectDateInput(null)).toBe(false);
      expect(isDirectDateInput(undefined)).toBe(false);
      expect(isDirectDateInput([])).toBe(false);
      expect(isDirectDateInput(true)).toBe(false);
      expect(isDirectDateInput(false)).toBe(false);
    });
  });

  describe("diffInDays", () => {
    it("should return 0 when the dates are the same", () => {
      startDate = new Date("2020-01-01");
      endDate = new Date("2020-01-01");
      expect(diffInDays(startDate, startDate)).toBe(0);
    });
    it("should return 1 when the dates are one day apart", () => {
      startDate = new Date("2020-01-01");
      endDate = new Date("2020-01-02");
      expect(diffInDays(startDate, endDate)).toBe(1);
    });
    it("should return 2 when the dates are two days apart", () => {
      startDate = new Date("2020-01-01");
      endDate = new Date("2020-01-03");
      expect(diffInDays(startDate, endDate)).toBe(2);
    });
    it("should return absolute difference regardless of order", () => {
      startDate = new Date("2020-01-05");
      endDate = new Date("2020-01-01");
      expect(diffInDays(startDate, endDate)).toBe(4);
      expect(diffInDays(endDate, startDate)).toBe(4);
    });
  });
  describe("diffInMonths", () => {
    it("should return 0 when the months are the same", () => {
      startDate = new Date("2020-01-01");
      endDate = new Date("2020-01-01");
      expect(diffInMonths(startDate, endDate)).toBe(0);
    });
    it("should return 1 when the dates are one month apart", () => {
      startDate = new Date("2020-01-01");
      endDate = new Date("2020-02-01");
      expect(diffInMonths(startDate, endDate)).toBe(1);
    });
    it("should return 2 when the dates are two months apart", () => {
      startDate = new Date("2020-01-01");
      endDate = new Date("2020-03-01");
      expect(diffInMonths(startDate, endDate)).toBe(2);
    });
    it("should return negative when end date is before start date", () => {
      startDate = new Date("2020-03-01");
      endDate = new Date("2020-01-01");
      expect(diffInMonths(startDate, endDate)).toBeLessThan(0);
    });
  });
  describe("diffInYears", () => {
    it("should return 0 when the dates are the same", () => {
      startDate = new Date("2020-01-01");
      endDate = new Date("2020-01-01");
      expect(diffInYears(startDate, endDate)).toBe(0);
    });
    it("should return 1 when the dates are one year apart", () => {
      startDate = new Date("2020-01-01");
      endDate = new Date("2021-02-01");
      expect(diffInYears(startDate, endDate)).toBe(1);
    });
    it("should return 2 when the dates are two years apart", () => {
      startDate = new Date("2020-01-01");
      endDate = new Date("2022-03-01");
      expect(diffInYears(startDate, endDate)).toBe(2);
    });
    it("should return negative when end date is before start date", () => {
      startDate = new Date("2022-01-01");
      endDate = new Date("2020-01-01");
      expect(diffInYears(startDate, endDate)).toBeLessThan(0);
    });
  });

  describe("parseDate", () => {
    it("should parse valid ISO-8601 strings", () => {
      const date1 = parseDate("2025-01-01T10:00:00Z");
      expect(date1).toBeInstanceOf(Date);
      expect(date1.toISOString()).toBe("2025-01-01T10:00:00.000Z");

      const date2 = parseDate("2025-01-01");
      expect(date2).toBeInstanceOf(Date);
    });

    it("should parse Unix timestamps (seconds)", () => {
      const date = parseDate(1704110400); // 2024-01-01T12:00:00Z
      expect(date).toBeInstanceOf(Date);
      expect(date.getTime()).toBe(1704110400000);
    });

    it("should parse JS timestamps (milliseconds)", () => {
      const date = parseDate(1704110400000);
      expect(date).toBeInstanceOf(Date);
      expect(date.getTime()).toBe(1704110400000);
    });

    it("should accept Date objects", () => {
      const inputDate = new Date("2025-01-01T10:00:00Z");
      const date = parseDate(inputDate);
      expect(date).toBe(inputDate);
    });

    it("should throw error for invalid Date object", () => {
      const invalidDate = new Date("invalid");
      expect(() => parseDate(invalidDate)).toThrow(DateValidationError);
      expect(() => parseDate(invalidDate)).toThrow("Invalid Date object");
    });

    it("should throw error for invalid ISO-8601 string", () => {
      expect(() => parseDate("invalid-date")).toThrow(InvalidDateFormatError);
      expect(() => parseDate("invalid-date")).toThrow(
        "Invalid ISO-8601 date string",
      );
      expect(() => parseDate("01/01/2025")).toThrow(InvalidDateFormatError);
      expect(() => parseDate("01/01/2025")).toThrow(
        "Invalid ISO-8601 date string",
      );
    });

    it("should throw error for ISO-8601 format with invalid date values", () => {
      // This passes the regex but creates an invalid date (month 13 doesn't exist)
      expect(() => parseDate("2025-13-01")).toThrow(DateValidationError);
      expect(() => parseDate("2025-13-01")).toThrow("Invalid date string");
      // Note: JavaScript Date auto-corrects some invalid dates like 2025-02-30 to 2025-03-02
      // so we test with a clearly invalid month instead
    });

    it("should throw error for timestamp out of range", () => {
      expect(() => parseDate(9999999999999999)).toThrow(TimestampRangeError);
      expect(() => parseDate(9999999999999999)).toThrow(
        "Timestamp out of representable range",
      );
      expect(() => parseDate(-9999999999999999)).toThrow(TimestampRangeError);
      expect(() => parseDate(-9999999999999999)).toThrow(
        "Timestamp out of representable range",
      );
    });

    it("should throw error for NaN timestamp (modern validation)", () => {
      expect(() => parseDate(NaN)).toThrow(DateValidationError);
      expect(() => parseDate(NaN)).toThrow(
        "Invalid timestamp: must be a finite number",
      );
    });

    it("should throw error for Infinity timestamp (modern validation)", () => {
      expect(() => parseDate(Infinity)).toThrow(DateValidationError);
      expect(() => parseDate(Infinity)).toThrow(
        "Invalid timestamp: must be a finite number",
      );
      expect(() => parseDate(-Infinity)).toThrow(DateValidationError);
      expect(() => parseDate(-Infinity)).toThrow(
        "Invalid timestamp: must be a finite number",
      );
    });

    it("should throw error for unsupported input type", () => {
      expect(() => parseDate(true as any)).toThrow(InvalidDateFormatError);
      expect(() => parseDate(true as any)).toThrow(
        "Unsupported date input type",
      );
    });
  });

  describe("formatDateISO", () => {
    it("should format Date to ISO-8601 string", () => {
      const date = new Date("2025-01-01T10:00:00.000Z");
      expect(formatDateISO(date)).toBe("2025-01-01T10:00:00.000Z");
    });

    it("should preserve milliseconds", () => {
      const date = new Date("2025-01-01T10:00:00.123Z");
      expect(formatDateISO(date)).toBe("2025-01-01T10:00:00.123Z");
    });
  });

  describe("isValidCalendarDate", () => {
    it("should return true for valid dates", () => {
      expect(isValidCalendarDate(2025, 1, 1)).toBe(true);
      expect(isValidCalendarDate(2025, 12, 31)).toBe(true);
      expect(isValidCalendarDate(2025, 4, 30)).toBe(true);
    });

    it("should return false for invalid months", () => {
      expect(isValidCalendarDate(2025, 0, 1)).toBe(false);
      expect(isValidCalendarDate(2025, 13, 1)).toBe(false);
    });

    it("should return false for invalid days", () => {
      expect(isValidCalendarDate(2025, 1, 0)).toBe(false);
      expect(isValidCalendarDate(2025, 1, 32)).toBe(false);
      expect(isValidCalendarDate(2025, 4, 31)).toBe(false); // April has 30 days
    });

    it("should handle February in non-leap years", () => {
      expect(isValidCalendarDate(2025, 2, 28)).toBe(true);
      expect(isValidCalendarDate(2025, 2, 29)).toBe(false);
    });

    it("should handle February in leap years", () => {
      expect(isValidCalendarDate(2024, 2, 29)).toBe(true);
      expect(isValidCalendarDate(2024, 2, 30)).toBe(false);
    });
  });

  describe("isLeapYear", () => {
    it("should return true for leap years divisible by 4", () => {
      expect(isLeapYear(2024)).toBe(true);
      expect(isLeapYear(2020)).toBe(true);
    });

    it("should return false for non-leap years", () => {
      expect(isLeapYear(2025)).toBe(false);
      expect(isLeapYear(2023)).toBe(false);
    });

    it("should return false for years divisible by 100 but not 400", () => {
      expect(isLeapYear(1900)).toBe(false);
      expect(isLeapYear(2100)).toBe(false);
    });

    it("should return true for years divisible by 400", () => {
      expect(isLeapYear(2000)).toBe(true);
      expect(isLeapYear(2400)).toBe(true);
    });
  });

  describe("getDayOfYear", () => {
    it("should return 1 for January 1st", () => {
      const date = new Date("2025-01-01T10:00:00Z");
      expect(getDayOfYear(date, "UTC")).toBe(1);
    });

    it("should return 365 for December 31st in non-leap year", () => {
      const date = new Date("2025-12-31T10:00:00Z");
      expect(getDayOfYear(date, "UTC")).toBe(365);
    });

    it("should return 366 for December 31st in leap year", () => {
      const date = new Date("2024-12-31T10:00:00Z");
      expect(getDayOfYear(date, "UTC")).toBe(366);
    });

    it("should handle leap year February 29th", () => {
      const date = new Date("2024-02-29T10:00:00Z");
      expect(getDayOfYear(date, "UTC")).toBe(60);
    });

    it("should calculate correctly for mid-year dates", () => {
      const date = new Date("2025-07-01T10:00:00Z");
      const dayOfYear = getDayOfYear(date, "UTC");
      expect(dayOfYear).toBe(182); // 31+28+31+30+31+30+1
    });

    it("should respect timezone", () => {
      // This date is Dec 31 in UTC but Jan 1 in some eastern timezones
      const date = new Date("2025-01-01T02:00:00Z");
      const dayInUTC = getDayOfYear(date, "UTC");
      const dayInSaoPaulo = getDayOfYear(date, "America/Sao_Paulo");

      expect(dayInUTC).toBe(1);
      // In Sao Paulo (UTC-3), this is still Dec 31, 2024
      expect(dayInSaoPaulo).toBe(366); // 2024 is a leap year
    });
  });
});
