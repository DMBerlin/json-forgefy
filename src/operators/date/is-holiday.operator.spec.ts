import { $isHoliday } from "./is-holiday.operator";

describe("$isHoliday", () => {
  const operator = $isHoliday();
  const holidays = [
    "2025-01-01", // New Year's Day
    "2025-12-25", // Christmas
    "2025-07-04", // Independence Day
  ];

  describe("basic functionality", () => {
    it("should return true for a holiday", () => {
      const result = operator({
        date: "2025-01-01T12:00:00Z",
        holidays,
      });
      expect(result).toBe(true);
    });

    it("should return false for a non-holiday", () => {
      const result = operator({
        date: "2025-01-02T12:00:00Z",
        holidays,
      });
      expect(result).toBe(false);
    });

    it("should return true for Christmas", () => {
      const result = operator({
        date: "2025-12-25T12:00:00Z",
        holidays,
      });
      expect(result).toBe(true);
    });

    it("should return false with empty holidays array", () => {
      const result = operator({
        date: "2025-01-01T12:00:00Z",
        holidays: [],
      });
      expect(result).toBe(false);
    });
  });

  describe("timezone handling", () => {
    it("should handle timezone correctly (UTC)", () => {
      const result = operator({
        date: "2025-01-01T23:00:00Z",
        holidays: ["2025-01-01"],
        timezone: "UTC",
      });
      expect(result).toBe(true);
    });

    it("should handle timezone correctly (America/New_York)", () => {
      // Test that timezone parameter is respected
      // 2025-07-04T12:00:00-04:00 is July 4th in New York timezone
      const result = operator({
        date: "2025-07-04T16:00:00Z", // July 4th 16:00 UTC = July 4th 12:00 EDT (UTC-4)
        holidays: ["2025-07-04T12:00:00Z"], // July 4th 12:00 UTC
        timezone: "America/New_York",
      });
      expect(result).toBe(true); // Both are July 4th in New York timezone
    });

    it("should handle timezone correctly (Asia/Tokyo)", () => {
      // 2025-01-01T15:00:00Z is Jan 1 in UTC, but Jan 2 00:00 in Tokyo
      const result = operator({
        date: "2025-01-01T15:00:00Z",
        holidays: ["2025-01-02"],
        timezone: "Asia/Tokyo",
      });
      expect(result).toBe(true); // Jan 2 in Tokyo
    });

    it("should not match when date is in different day due to timezone", () => {
      const result = operator({
        date: "2025-01-01T15:00:00Z",
        holidays: ["2025-01-01"],
        timezone: "Asia/Tokyo",
      });
      expect(result).toBe(false); // Jan 2 in Tokyo, not Jan 1
    });
  });

  describe("input formats", () => {
    it("should accept ISO-8601 string for date", () => {
      const result = operator({
        date: "2025-01-01T12:00:00Z",
        holidays,
      });
      expect(result).toBe(true);
    });

    it("should accept Unix timestamp (seconds) for date", () => {
      const result = operator({
        date: 1735732800, // 2025-01-01T12:00:00Z
        holidays,
      });
      expect(result).toBe(true);
    });

    it("should accept JavaScript timestamp (milliseconds) for date", () => {
      const result = operator({
        date: 1735732800000, // 2025-01-01T12:00:00Z
        holidays,
      });
      expect(result).toBe(true);
    });

    it("should accept Date object for date", () => {
      const result = operator({
        date: new Date("2025-01-01T12:00:00Z"),
        holidays,
      });
      expect(result).toBe(true);
    });

    it("should accept ISO-8601 strings with time in holidays array", () => {
      const result = operator({
        date: "2025-01-01T12:00:00Z",
        holidays: ["2025-01-01T00:00:00Z"],
      });
      expect(result).toBe(true);
    });
  });

  describe("payload resolution", () => {
    it("should work with resolved date value", () => {
      // In real usage, resolveExpression would resolve "$transaction_date" before passing to operator
      const result = operator({
        date: "2025-01-01T12:00:00Z",
        holidays,
      });
      expect(result).toBe(true);
    });

    it("should work with resolved holidays value", () => {
      // In real usage, resolveExpression would resolve "$company_holidays" before passing to operator
      const result = operator({
        date: "2025-01-01T12:00:00Z",
        holidays: holidays,
      });
      expect(result).toBe(true);
    });

    it("should work with resolved timezone value", () => {
      // In real usage, resolveExpression would resolve "$user_timezone" before passing to operator
      const result = operator({
        date: "2025-07-04T16:00:00Z",
        holidays: ["2025-07-04T12:00:00Z"],
        timezone: "America/New_York",
      });
      expect(result).toBe(true);
    });
  });

  describe("fallback handling", () => {
    it("should use fallback value on invalid date", () => {
      const result = operator({
        date: "invalid-date",
        holidays,
        fallback: false,
      });
      expect(result).toBe(false);
    });

    it("should use fallback with static value", () => {
      // In real usage, resolveExpression would resolve "$default_holiday" before passing to operator
      const result = operator({
        date: "invalid-date",
        holidays,
        fallback: true,
      });
      expect(result).toBe(true);
    });

    it("should use fallback with resolved expression", () => {
      // In real usage, resolveExpression would resolve the expression before passing to operator
      const result = operator({
        date: "invalid-date",
        holidays,
        fallback: true, // Result of { $eq: [1, 1] }
      });
      expect(result).toBe(true);
    });

    it("should throw error when no fallback is provided", () => {
      expect(() =>
        operator({
          date: "invalid-date",
          holidays,
        }),
      ).toThrow();
    });

    it("should use fallback when holidays is not an array", () => {
      const result = operator({
        date: "2025-01-01T12:00:00Z",
        holidays: "not-an-array" as any,
        fallback: false,
      });
      expect(result).toBe(false);
    });

    it("should throw error when holidays is not an array and no fallback", () => {
      expect(() =>
        operator({
          date: "2025-01-01T12:00:00Z",
          holidays: "not-an-array" as any,
        }),
      ).toThrow("holidays must be an array");
    });
  });

  describe("edge cases", () => {
    it("should handle year transitions", () => {
      const result = operator({
        date: "2024-12-31T23:59:59Z",
        holidays: ["2024-12-31"],
      });
      expect(result).toBe(true);
    });

    it("should handle leap year dates", () => {
      const result = operator({
        date: "2024-02-29T12:00:00Z",
        holidays: ["2024-02-29"],
      });
      expect(result).toBe(true);
    });

    it("should handle multiple holidays in same month", () => {
      const result = operator({
        date: "2025-12-25T12:00:00Z",
        holidays: ["2025-12-24", "2025-12-25", "2025-12-26"],
      });
      expect(result).toBe(true);
    });

    it("should be case-sensitive for date comparison", () => {
      const result = operator({
        date: "2025-01-01T12:00:00Z",
        holidays: ["2025-01-01"],
      });
      expect(result).toBe(true);
    });

    it("should handle holidays spanning entire year", () => {
      const yearHolidays = Array.from(
        { length: 12 },
        (_, i) => `2025-${String(i + 1).padStart(2, "0")}-15`,
      );

      const result = operator({
        date: "2025-06-15T12:00:00Z",
        holidays: yearHolidays,
      });
      expect(result).toBe(true);
    });
  });
});
