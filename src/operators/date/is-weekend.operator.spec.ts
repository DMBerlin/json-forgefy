import { $isWeekend } from "./is-weekend.operator";
import { OperatorInputError } from "@lib-types/error.types";

describe("$isWeekend", () => {
  const operator = $isWeekend();

  describe("basic functionality", () => {
    it("should return true for Saturday (default weekends)", () => {
      const result = operator({ date: "2025-01-04T12:00:00Z" }); // Saturday
      expect(result).toBe(true);
    });

    it("should return true for Sunday (default weekends)", () => {
      const result = operator({ date: "2025-01-05T12:00:00Z" }); // Sunday
      expect(result).toBe(true);
    });

    it("should return false for Monday (default weekends)", () => {
      const result = operator({ date: "2025-01-06T12:00:00Z" }); // Monday
      expect(result).toBe(false);
    });

    it("should return false for Friday (default weekends)", () => {
      const result = operator({ date: "2025-01-03T12:00:00Z" }); // Friday
      expect(result).toBe(false);
    });
  });

  describe("custom weekends", () => {
    it("should support custom weekends (Friday and Saturday)", () => {
      const result = operator({
        date: "2025-01-03T12:00:00Z", // Friday
        weekends: [5, 6], // Friday and Saturday
      });
      expect(result).toBe(true);
    });

    it("should return false for Sunday with custom weekends (Friday and Saturday)", () => {
      const result = operator({
        date: "2025-01-05T12:00:00Z", // Sunday
        weekends: [5, 6], // Friday and Saturday
      });
      expect(result).toBe(false);
    });

    it("should support single day weekend", () => {
      const result = operator({
        date: "2025-01-05T12:00:00Z", // Sunday
        weekends: [0], // Only Sunday
      });
      expect(result).toBe(true);
    });

    it("should return false when weekends is empty array", () => {
      const result = operator({
        date: "2025-01-04T12:00:00Z", // Saturday
        weekends: [],
      });
      expect(result).toBe(false);
    });
  });

  describe("timezone handling", () => {
    it("should handle timezone correctly (UTC)", () => {
      const result = operator({
        date: "2025-01-04T23:00:00Z", // Saturday 23:00 UTC
        timezone: "UTC",
      });
      expect(result).toBe(true);
    });

    it("should handle timezone correctly (America/New_York)", () => {
      // 2025-01-05T04:00:00Z is Sunday 04:00 UTC, but Saturday 23:00 in New York
      const result = operator({
        date: "2025-01-05T04:00:00Z",
        timezone: "America/New_York",
      });
      expect(result).toBe(true); // Saturday in New York
    });

    it("should handle timezone correctly (Asia/Tokyo)", () => {
      // 2025-01-03T15:00:00Z is Friday 15:00 UTC, but Saturday 00:00 in Tokyo
      const result = operator({
        date: "2025-01-03T15:00:00Z",
        timezone: "Asia/Tokyo",
      });
      expect(result).toBe(true); // Saturday in Tokyo
    });
  });

  describe("input formats", () => {
    it("should accept ISO-8601 string", () => {
      const result = operator({ date: "2025-01-04T12:00:00Z" });
      expect(result).toBe(true);
    });

    it("should accept Unix timestamp (seconds)", () => {
      const result = operator({ date: 1735992000 }); // 2025-01-04T12:00:00Z
      expect(result).toBe(true);
    });

    it("should accept JavaScript timestamp (milliseconds)", () => {
      const result = operator({ date: 1735992000000 }); // 2025-01-04T12:00:00Z
      expect(result).toBe(true);
    });

    it("should accept Date object", () => {
      const result = operator({ date: new Date("2025-01-04T12:00:00Z") });
      expect(result).toBe(true);
    });
  });

  describe("payload resolution", () => {
    it("should work with resolved date value", () => {
      // In real usage, resolveExpression would resolve "$transaction_date" before passing to operator
      const result = operator({ date: "2025-01-04T12:00:00Z" }); // Saturday
      expect(result).toBe(true);
    });

    it("should work with resolved weekends value", () => {
      // In real usage, resolveExpression would resolve "$custom_weekends" before passing to operator
      const result = operator({
        date: "2025-01-03T12:00:00Z", // Friday
        weekends: [5, 6], // Friday and Saturday
      });
      expect(result).toBe(true);
    });

    it("should work with resolved timezone value", () => {
      // In real usage, resolveExpression would resolve "$user_timezone" before passing to operator
      const result = operator({
        date: "2025-01-05T04:00:00Z",
        timezone: "America/New_York",
      });
      expect(result).toBe(true);
    });
  });

  describe("fallback handling", () => {
    it("should use fallback value on invalid date", () => {
      const result = operator({
        date: "invalid-date",
        fallback: false,
      });
      expect(result).toBe(false);
    });

    it("should use fallback with static value", () => {
      // In real usage, resolveExpression would resolve "$default_weekend" before passing to operator
      const result = operator({
        date: "invalid-date",
        fallback: true,
      });
      expect(result).toBe(true);
    });

    it("should use fallback with resolved expression", () => {
      // In real usage, resolveExpression would resolve the expression before passing to operator
      const result = operator({
        date: "invalid-date",
        fallback: true, // Result of { $eq: [1, 1] }
      });
      expect(result).toBe(true);
    });

    it("should throw error when no fallback is provided", () => {
      expect(() => operator({ date: "invalid-date" })).toThrow();
    });

    it("should throw error for invalid direct date input", () => {
      expect(() => operator("invalid-date-string")).toThrow(
        "$isWeekend: Invalid date value",
      );
    });
  });

  describe("edge cases", () => {
    it("should handle year transitions", () => {
      const result = operator({ date: "2024-12-31T23:59:59Z" }); // Tuesday
      expect(result).toBe(false);
    });

    it("should handle leap year dates", () => {
      const result = operator({ date: "2024-02-29T12:00:00Z" }); // Thursday (leap year)
      expect(result).toBe(false);
    });

    it("should handle all days of the week", () => {
      const dates = [
        { date: "2025-01-05T12:00:00Z", day: "Sunday", expected: true },
        { date: "2025-01-06T12:00:00Z", day: "Monday", expected: false },
        { date: "2025-01-07T12:00:00Z", day: "Tuesday", expected: false },
        { date: "2025-01-08T12:00:00Z", day: "Wednesday", expected: false },
        { date: "2025-01-09T12:00:00Z", day: "Thursday", expected: false },
        { date: "2025-01-10T12:00:00Z", day: "Friday", expected: false },
        { date: "2025-01-11T12:00:00Z", day: "Saturday", expected: true },
      ];

      dates.forEach(({ date, expected }) => {
        const result = operator({ date });
        expect(result).toBe(expected);
      });
    });
  });

  describe("input validation", () => {
    it("should throw OperatorInputError for invalid input format (array)", () => {
      expect(() => operator([] as any)).toThrow(OperatorInputError);
    });

    it("should throw OperatorInputError for null", () => {
      expect(() => operator(null as any)).toThrow(OperatorInputError);
    });

    it("should throw OperatorInputError for plain object without date property", () => {
      expect(() => operator({ invalid: "prop" } as any)).toThrow(
        OperatorInputError,
      );
    });
  });
});
