import { $dayOfMonth } from "./day-of-month.operator";
import { OperatorInputError } from "@lib-types/error.types";

describe("$dayOfMonth operator", () => {
  describe("basic functionality", () => {
    it("should return day of month for mid-month date", () => {
      const result = $dayOfMonth()("2024-01-15T10:00:00Z");
      expect(result).toBe(15);
    });

    it("should return 1 for first day of month", () => {
      const result = $dayOfMonth()("2024-01-01T10:00:00Z");
      expect(result).toBe(1);
    });

    it("should return 31 for last day of January", () => {
      const result = $dayOfMonth()("2024-01-31T10:00:00Z");
      expect(result).toBe(31);
    });

    it("should return 28 for last day of February (non-leap year)", () => {
      const result = $dayOfMonth()("2023-02-28T10:00:00Z");
      expect(result).toBe(28);
    });

    it("should return 29 for last day of February (leap year)", () => {
      const result = $dayOfMonth()("2024-02-29T10:00:00Z");
      expect(result).toBe(29);
    });

    it("should return 30 for last day of April", () => {
      const result = $dayOfMonth()("2024-04-30T10:00:00Z");
      expect(result).toBe(30);
    });
  });

  describe("timezone handling", () => {
    it("should calculate day of month in UTC", () => {
      const result = $dayOfMonth()({
        date: "2024-01-15T10:00:00Z",
        timezone: "UTC",
      });
      expect(result).toBe(15);
    });

    it("should calculate day of month in America/Sao_Paulo", () => {
      // 2024-01-15T02:00:00Z is still Jan 14 in Sao Paulo (UTC-3)
      const result = $dayOfMonth()({
        date: "2024-01-15T02:00:00Z",
        timezone: "America/Sao_Paulo",
      });
      expect(result).toBe(14);
    });

    it("should calculate day of month in America/New_York", () => {
      // 2024-01-15T04:00:00Z is still Jan 14 in New York (UTC-5)
      const result = $dayOfMonth()({
        date: "2024-01-15T04:00:00Z",
        timezone: "America/New_York",
      });
      expect(result).toBe(14);
    });

    it("should calculate day of month in Asia/Tokyo", () => {
      // 2024-01-14T15:00:00Z is Jan 15 in Tokyo (UTC+9)
      const result = $dayOfMonth()({
        date: "2024-01-14T15:00:00Z",
        timezone: "Asia/Tokyo",
      });
      expect(result).toBe(15);
    });

    it("should handle timezone at month boundary", () => {
      // 2024-02-01T00:00:00Z is still Jan 31 in LA (UTC-8)
      const result = $dayOfMonth()({
        date: "2024-02-01T07:00:00Z",
        timezone: "America/Los_Angeles",
      });
      expect(result).toBe(31);
    });

    it("should handle timezone crossing into next month", () => {
      // 2024-01-31T23:00:00Z is Feb 1 in Tokyo (UTC+9)
      const result = $dayOfMonth()({
        date: "2024-01-31T16:00:00Z",
        timezone: "Asia/Tokyo",
      });
      expect(result).toBe(1);
    });
  });

  describe("different input formats", () => {
    it("should accept ISO-8601 string", () => {
      const result = $dayOfMonth()("2024-01-15T10:00:00Z");
      expect(result).toBe(15);
    });

    it("should accept Unix timestamp in seconds", () => {
      const result = $dayOfMonth()(1705318200); // 2024-01-15T10:30:00Z
      expect(result).toBe(15);
    });

    it("should accept JavaScript timestamp in milliseconds", () => {
      const result = $dayOfMonth()(1705318200000); // 2024-01-15T10:30:00Z
      expect(result).toBe(15);
    });

    it("should accept Date object", () => {
      const date = new Date("2024-01-15T10:00:00Z");
      const result = $dayOfMonth()(date);
      expect(result).toBe(15);
    });
  });

  describe("fallback handling", () => {
    it("should use fallback for invalid date string", () => {
      const result = $dayOfMonth()({
        date: "invalid-date",
        fallback: 1,
      });
      expect(result).toBe(1);
    });

    it("should use fallback for invalid Date object", () => {
      const result = $dayOfMonth()({
        date: new Date("invalid"),
        fallback: 15,
      });
      expect(result).toBe(15);
    });

    it("should throw error when no fallback provided for invalid input", () => {
      expect(() =>
        $dayOfMonth()({
          date: "invalid-date",
        }),
      ).toThrow();
    });

    it("should throw error for invalid direct date input", () => {
      expect(() => $dayOfMonth()("invalid-date-string")).toThrow(
        "$dayOfMonth: Invalid date value",
      );
    });
  });

  describe("edge cases", () => {
    it("should handle all days in January", () => {
      for (let day = 1; day <= 31; day++) {
        const dateStr = `2024-01-${String(day).padStart(2, "0")}T10:00:00Z`;
        const result = $dayOfMonth()(dateStr);
        expect(result).toBe(day);
      }
    });

    it("should handle leap year February", () => {
      for (let day = 1; day <= 29; day++) {
        const dateStr = `2024-02-${String(day).padStart(2, "0")}T10:00:00Z`;
        const result = $dayOfMonth()(dateStr);
        expect(result).toBe(day);
      }
    });

    it("should handle non-leap year February", () => {
      for (let day = 1; day <= 28; day++) {
        const dateStr = `2023-02-${String(day).padStart(2, "0")}T10:00:00Z`;
        const result = $dayOfMonth()(dateStr);
        expect(result).toBe(day);
      }
    });

    it("should handle end of year", () => {
      const result = $dayOfMonth()("2024-12-31T23:59:59Z");
      expect(result).toBe(31);
    });

    it("should handle beginning of year", () => {
      const result = $dayOfMonth()("2024-01-01T00:00:00Z");
      expect(result).toBe(1);
    });
  });

  describe("input validation", () => {
    it("should throw OperatorInputError for invalid input format (array)", () => {
      expect(() => $dayOfMonth()([] as any)).toThrow(OperatorInputError);
      expect(() => $dayOfMonth()([] as any)).toThrow("Invalid input format");
    });

    it("should throw OperatorInputError for invalid input format (null)", () => {
      expect(() => $dayOfMonth()(null as any)).toThrow(OperatorInputError);
    });

    it("should throw OperatorInputError for invalid input format (plain object)", () => {
      expect(() => $dayOfMonth()({ invalid: "prop" } as any)).toThrow(
        OperatorInputError,
      );
    });

    it("should throw OperatorInputError for boolean input", () => {
      expect(() => $dayOfMonth()(true as any)).toThrow(OperatorInputError);
    });
  });
});
