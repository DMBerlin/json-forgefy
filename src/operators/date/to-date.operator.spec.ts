import { $toDate } from "./to-date.operator";
import { MS_PER_DAY, MAX_DATE_VALUE } from "@helpers/date-time.helper";
import { OperatorInputError } from "@lib-types/error.types";

describe("$toDate operator", () => {
  describe("ISO-8601 string inputs", () => {
    it("should convert valid ISO-8601 string with timezone", () => {
      const result = $toDate()("2024-01-15T10:30:00Z");
      expect(result).toBeInstanceOf(Date);
      expect(result.toISOString()).toBe("2024-01-15T10:30:00.000Z");
    });

    it("should convert ISO-8601 string without timezone", () => {
      const result = $toDate()("2024-01-15T10:30:00");
      expect(result).toBeInstanceOf(Date);
    });

    it("should convert ISO-8601 date-only string", () => {
      const result = $toDate()("2024-01-15");
      expect(result).toBeInstanceOf(Date);
    });

    it("should convert ISO-8601 string with milliseconds", () => {
      const result = $toDate()("2024-01-15T10:30:00.123Z");
      expect(result).toBeInstanceOf(Date);
      expect(result.toISOString()).toBe("2024-01-15T10:30:00.123Z");
    });

    it("should convert ISO-8601 string with timezone offset", () => {
      const result = $toDate()("2024-01-15T10:30:00-03:00");
      expect(result).toBeInstanceOf(Date);
    });

    it("should throw error for invalid ISO-8601 string", () => {
      expect(() => $toDate()("invalid-date")).toThrow(
        "Invalid ISO-8601 date string",
      );
    });

    it("should throw error for malformed date string", () => {
      expect(() => $toDate()("2024-13-45")).toThrow();
    });
  });

  describe("timestamp inputs", () => {
    it("should convert Unix timestamp in seconds", () => {
      const timestamp = 1704067200; // 2024-01-01T00:00:00Z in seconds
      const result = $toDate()(timestamp);
      expect(result).toBeInstanceOf(Date);
      expect(result.toISOString()).toBe("2024-01-01T00:00:00.000Z");
    });

    it("should convert JavaScript timestamp in milliseconds", () => {
      const timestamp = 1704067200000; // 2024-01-01T00:00:00Z in milliseconds
      const result = $toDate()(timestamp);
      expect(result).toBeInstanceOf(Date);
      expect(result.toISOString()).toBe("2024-01-01T00:00:00.000Z");
    });

    it("should convert zero timestamp", () => {
      const result = $toDate()(0);
      expect(result).toBeInstanceOf(Date);
      expect(result.toISOString()).toBe("1970-01-01T00:00:00.000Z");
    });

    it("should convert negative timestamp", () => {
      const timestamp = -MS_PER_DAY; // One day before epoch
      const result = $toDate()(timestamp);
      expect(result).toBeInstanceOf(Date);
    });

    it("should throw error for timestamp out of range", () => {
      const outOfRange = MAX_DATE_VALUE + 1; // Beyond max representable date (8.64e15 + 1)
      expect(() => $toDate()(outOfRange)).toThrow(
        "Timestamp out of representable range",
      );
    });
  });

  describe("Date object inputs", () => {
    it("should accept valid Date object", () => {
      const date = new Date("2024-01-15T10:30:00Z");
      const result = $toDate()(date);
      expect(result).toBeInstanceOf(Date);
      expect(result.toISOString()).toBe("2024-01-15T10:30:00.000Z");
    });

    it("should throw error for invalid Date object", () => {
      const invalidDate = new Date("invalid");
      expect(() => $toDate()(invalidDate)).toThrow("Invalid Date object");
    });
  });

  describe("fallback handling", () => {
    it("should use fallback for invalid string", () => {
      const result = $toDate()({
        value: "invalid-date",
        fallback: "2024-01-01T00:00:00Z",
      });
      // Fallback returns the raw value, not parsed
      expect(result).toBe("2024-01-01T00:00:00Z");
    });

    it("should use fallback for invalid Date object", () => {
      const result = $toDate()({
        value: new Date("invalid"),
        fallback: "2024-01-01T00:00:00Z",
      });
      // Fallback returns the raw value, not parsed
      expect(result).toBe("2024-01-01T00:00:00Z");
    });

    it("should use fallback timestamp", () => {
      const result = $toDate()({
        value: "invalid",
        fallback: 1704067200000, // 2024-01-01T00:00:00Z
      });
      // Fallback returns the raw value, not parsed
      expect(result).toBe(1704067200000);
    });

    it("should throw error when no fallback provided for invalid input", () => {
      expect(() => $toDate()("invalid-date")).toThrow();
    });

    it("should throw error for invalid direct date input with specific message", () => {
      expect(() => $toDate()("completely-invalid")).toThrow(
        "$toDate: Invalid date value",
      );
    });
  });

  describe("edge cases", () => {
    it("should handle leap year date", () => {
      const result = $toDate()("2024-02-29T00:00:00Z");
      expect(result).toBeInstanceOf(Date);
      expect(result.toISOString()).toBe("2024-02-29T00:00:00.000Z");
    });

    it("should handle invalid leap year date by adjusting to March 1st", () => {
      // JavaScript Date automatically adjusts Feb 29 in non-leap years to March 1
      const result = $toDate()("2023-02-29T00:00:00Z");
      expect(result).toBeInstanceOf(Date);
      expect(result.toISOString()).toBe("2023-03-01T00:00:00.000Z");
    });

    it("should handle end of year date", () => {
      const result = $toDate()("2024-12-31T23:59:59Z");
      expect(result).toBeInstanceOf(Date);
    });

    it("should handle beginning of year date", () => {
      const result = $toDate()("2024-01-01T00:00:00Z");
      expect(result).toBeInstanceOf(Date);
    });
  });

  describe("input validation", () => {
    it("should throw OperatorInputError for invalid input format (array)", () => {
      expect(() => $toDate()([] as any)).toThrow(OperatorInputError);
    });

    it("should throw OperatorInputError for null", () => {
      expect(() => $toDate()(null as any)).toThrow(OperatorInputError);
    });

    it("should throw OperatorInputError for plain object without value property", () => {
      expect(() => $toDate()({ invalid: "prop" } as any)).toThrow(
        OperatorInputError,
      );
    });
  });
});
