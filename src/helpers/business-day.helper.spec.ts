import {
  formatDateKey,
  normalizeHolidays,
  isHoliday,
  isWeekend,
  isBusinessDay,
  validateWeekends,
  validateHolidays,
} from "./business-day.helper";
import {
  InvalidHolidayError,
  InvalidWeekendError,
} from "@lib-types/error.types";

describe("Business Day Helper", () => {
  describe("formatDateKey", () => {
    it("should format date as YYYY-MM-DD in UTC", () => {
      const date = new Date("2025-01-15T12:00:00Z");
      expect(formatDateKey(date)).toBe("2025-01-15");
    });

    it("should format date in specific timezone", () => {
      const date = new Date("2025-01-15T03:00:00Z");
      expect(formatDateKey(date, "America/Sao_Paulo")).toBe("2025-01-15");
    });
  });

  describe("normalizeHolidays", () => {
    it("should normalize holiday array to Set", () => {
      const holidays = ["2025-01-01", "2025-12-25"];
      const result = normalizeHolidays(holidays);

      expect(result).toBeInstanceOf(Set);
      expect(result.has("2025-01-01")).toBe(true);
      expect(result.has("2025-12-25")).toBe(true);
    });

    it("should throw error for invalid holiday date", () => {
      const holidays = ["invalid-date"];
      expect(() => normalizeHolidays(holidays)).toThrow(InvalidHolidayError);
      expect(() => normalizeHolidays(holidays)).toThrow(
        "Invalid holiday date: invalid-date",
      );
    });
  });

  describe("isHoliday", () => {
    it("should return true for holiday date", () => {
      const date = new Date("2025-01-01T12:00:00Z");
      const holidays = ["2025-01-01", "2025-12-25"];

      expect(isHoliday(date, holidays)).toBe(true);
    });

    it("should return false for non-holiday date", () => {
      const date = new Date("2025-01-02T12:00:00Z");
      const holidays = ["2025-01-01", "2025-12-25"];

      expect(isHoliday(date, holidays)).toBe(false);
    });

    it("should work with normalized holiday Set", () => {
      const date = new Date("2025-01-01T12:00:00Z");
      const holidaySet = new Set(["2025-01-01", "2025-12-25"]);

      expect(isHoliday(date, holidaySet)).toBe(true);
    });
  });

  describe("isWeekend", () => {
    it("should return true for Saturday (default weekends)", () => {
      const saturday = new Date("2025-01-04T12:00:00Z"); // Saturday
      expect(isWeekend(saturday)).toBe(true);
    });

    it("should return true for Sunday (default weekends)", () => {
      const sunday = new Date("2025-01-05T12:00:00Z"); // Sunday
      expect(isWeekend(sunday)).toBe(true);
    });

    it("should return false for Monday (default weekends)", () => {
      const monday = new Date("2025-01-06T12:00:00Z"); // Monday
      expect(isWeekend(monday)).toBe(false);
    });

    it("should work with custom weekends", () => {
      const friday = new Date("2025-01-03T12:00:00Z"); // Friday
      expect(isWeekend(friday, [5, 6])).toBe(true); // Friday and Saturday
    });
  });

  describe("isBusinessDay", () => {
    it("should return true for regular weekday", () => {
      const monday = new Date("2025-01-06T12:00:00Z"); // Monday
      expect(isBusinessDay(monday)).toBe(true);
    });

    it("should return false for weekend", () => {
      const saturday = new Date("2025-01-04T12:00:00Z"); // Saturday
      expect(isBusinessDay(saturday)).toBe(false);
    });

    it("should return false for holiday", () => {
      const newYear = new Date("2025-01-01T12:00:00Z");
      expect(isBusinessDay(newYear, { holidays: ["2025-01-01"] })).toBe(false);
    });

    it("should return false for weekend holiday", () => {
      const saturday = new Date("2025-01-04T12:00:00Z"); // Saturday
      expect(isBusinessDay(saturday, { holidays: ["2025-01-04"] })).toBe(false);
    });

    it("should work with custom weekends", () => {
      const friday = new Date("2025-01-03T12:00:00Z"); // Friday
      expect(isBusinessDay(friday, { weekends: [5, 6] })).toBe(false);
    });
  });

  describe("validateWeekends", () => {
    it("should not throw for valid weekends array", () => {
      expect(() => validateWeekends([0, 6])).not.toThrow();
      expect(() => validateWeekends([5, 6])).not.toThrow();
    });

    it("should throw InvalidWeekendError for non-array", () => {
      expect(() => validateWeekends("invalid" as any)).toThrow(
        InvalidWeekendError,
      );
      expect(() => validateWeekends("invalid" as any)).toThrow(
        "weekends must be an array",
      );
    });

    it("should throw InvalidWeekendError for invalid weekend values", () => {
      expect(() => validateWeekends([7])).toThrow(InvalidWeekendError);
      expect(() => validateWeekends([7])).toThrow(
        "weekends must contain numbers between 0-6",
      );
      expect(() => validateWeekends([-1])).toThrow(InvalidWeekendError);
      expect(() => validateWeekends([-1])).toThrow(
        "weekends must contain numbers between 0-6",
      );
      expect(() => validateWeekends(["0"] as any)).toThrow(InvalidWeekendError);
      expect(() => validateWeekends(["0"] as any)).toThrow(
        "weekends must contain numbers between 0-6",
      );
    });
  });

  describe("validateHolidays", () => {
    it("should not throw for valid holidays array", () => {
      expect(() =>
        validateHolidays(["2025-01-01", "2025-12-25"]),
      ).not.toThrow();
      expect(() => validateHolidays([])).not.toThrow();
    });

    it("should throw InvalidHolidayError for non-array", () => {
      expect(() => validateHolidays("invalid" as any)).toThrow(
        InvalidHolidayError,
      );
      expect(() => validateHolidays("invalid" as any)).toThrow(
        "holidays must be an array",
      );
    });
  });
});
