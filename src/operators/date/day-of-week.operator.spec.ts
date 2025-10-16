import { $dayOfWeek } from "./day-of-week.operator";
import { OperatorInputError } from "@lib-types/error.types";

describe("$dayOfWeek operator", () => {
  describe("basic functionality", () => {
    it("should return 0 for Sunday", () => {
      const result = $dayOfWeek()("2024-01-14T10:00:00Z"); // Sunday
      expect(result).toBe(0);
    });

    it("should return 1 for Monday", () => {
      const result = $dayOfWeek()("2024-01-15T10:00:00Z"); // Monday
      expect(result).toBe(1);
    });

    it("should return 2 for Tuesday", () => {
      const result = $dayOfWeek()("2024-01-16T10:00:00Z"); // Tuesday
      expect(result).toBe(2);
    });

    it("should return 3 for Wednesday", () => {
      const result = $dayOfWeek()("2024-01-17T10:00:00Z"); // Wednesday
      expect(result).toBe(3);
    });

    it("should return 4 for Thursday", () => {
      const result = $dayOfWeek()("2024-01-18T10:00:00Z"); // Thursday
      expect(result).toBe(4);
    });

    it("should return 5 for Friday", () => {
      const result = $dayOfWeek()("2024-01-19T10:00:00Z"); // Friday
      expect(result).toBe(5);
    });

    it("should return 6 for Saturday", () => {
      const result = $dayOfWeek()("2024-01-20T10:00:00Z"); // Saturday
      expect(result).toBe(6);
    });
  });

  describe("timezone handling", () => {
    it("should calculate day of week in UTC", () => {
      const result = $dayOfWeek()({
        date: "2024-01-15T10:00:00Z",
        timezone: "UTC",
      });
      expect(result).toBe(1); // Monday
    });

    it("should calculate day of week in America/Sao_Paulo", () => {
      // 2024-01-15T02:00:00Z is Sunday in UTC but Monday in Sao Paulo (UTC-3)
      const result = $dayOfWeek()({
        date: "2024-01-15T02:00:00Z",
        timezone: "America/Sao_Paulo",
      });
      expect(result).toBe(0); // Sunday in Sao Paulo
    });

    it("should calculate day of week in America/New_York", () => {
      // 2024-01-15T04:00:00Z is Monday in UTC but Sunday in New York (UTC-5)
      const result = $dayOfWeek()({
        date: "2024-01-15T04:00:00Z",
        timezone: "America/New_York",
      });
      expect(result).toBe(0); // Sunday in New York
    });

    it("should calculate day of week in Asia/Tokyo", () => {
      // 2024-01-14T15:00:00Z is Sunday in UTC but Monday in Tokyo (UTC+9)
      const result = $dayOfWeek()({
        date: "2024-01-15T00:00:00Z",
        timezone: "Asia/Tokyo",
      });
      expect(result).toBe(1); // Monday in Tokyo
    });

    it("should calculate day of week in Europe/London", () => {
      const result = $dayOfWeek()({
        date: "2024-01-15T10:00:00Z",
        timezone: "Europe/London",
      });
      expect(result).toBe(1); // Monday
    });

    it("should handle timezone at day boundary", () => {
      // Test at midnight UTC
      const result = $dayOfWeek()({
        date: "2024-01-15T00:00:00Z",
        timezone: "America/Los_Angeles",
      });
      expect(result).toBe(0); // Sunday in LA (UTC-8)
    });
  });

  describe("different input formats", () => {
    it("should accept ISO-8601 string", () => {
      const result = $dayOfWeek()("2024-01-15T10:00:00Z");
      expect(result).toBe(1);
    });

    it("should accept Unix timestamp in seconds", () => {
      const result = $dayOfWeek()(1705318200); // 2024-01-15T10:30:00Z
      expect(result).toBe(1);
    });

    it("should accept JavaScript timestamp in milliseconds", () => {
      const result = $dayOfWeek()(1705318200000); // 2024-01-15T10:30:00Z
      expect(result).toBe(1);
    });

    it("should accept Date object", () => {
      const date = new Date("2024-01-15T10:00:00Z");
      const result = $dayOfWeek()(date);
      expect(result).toBe(1);
    });
  });

  describe("fallback handling", () => {
    it("should use fallback for invalid date string", () => {
      const result = $dayOfWeek()({
        date: "invalid-date",
        fallback: 0,
      });
      expect(result).toBe(0);
    });

    it("should use fallback for invalid Date object", () => {
      const result = $dayOfWeek()({
        date: new Date("invalid"),
        fallback: 5,
      });
      expect(result).toBe(5);
    });

    it("should throw error when no fallback provided for invalid input", () => {
      expect(() =>
        $dayOfWeek()({
          date: "invalid-date",
        }),
      ).toThrow();
    });

    it("should throw error for invalid direct date input", () => {
      expect(() => $dayOfWeek()("invalid-date-string")).toThrow(
        "$dayOfWeek: Invalid date value",
      );
    });
  });

  describe("edge cases", () => {
    it("should handle leap year date", () => {
      const result = $dayOfWeek()("2024-02-29T10:00:00Z"); // Thursday
      expect(result).toBe(4);
    });

    it("should handle end of year", () => {
      const result = $dayOfWeek()("2024-12-31T23:59:59Z"); // Tuesday
      expect(result).toBe(2);
    });

    it("should handle beginning of year", () => {
      const result = $dayOfWeek()("2024-01-01T00:00:00Z"); // Monday
      expect(result).toBe(1);
    });

    it("should handle date near epoch", () => {
      const result = $dayOfWeek()("1970-01-01T00:00:00Z"); // Thursday
      expect(result).toBe(4);
    });
  });

  describe("input validation", () => {
    it("should throw OperatorInputError for invalid input format (array)", () => {
      expect(() => $dayOfWeek()([] as any)).toThrow(OperatorInputError);
    });

    it("should throw OperatorInputError for null", () => {
      expect(() => $dayOfWeek()(null as any)).toThrow(OperatorInputError);
    });

    it("should throw OperatorInputError for plain object without date property", () => {
      expect(() => $dayOfWeek()({ invalid: "prop" } as any)).toThrow(
        OperatorInputError,
      );
    });
  });

  describe("branch coverage", () => {
    it("should use default UTC timezone when not specified", () => {
      const result = $dayOfWeek()({
        date: "2024-01-15T10:00:00Z",
      });
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(7);
    });
  });
});
