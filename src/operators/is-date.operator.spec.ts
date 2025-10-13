import { $isDate } from "./is-date.operator";

describe("$isDate operator", () => {
  describe("valid Date objects", () => {
    it("should return true for current Date", () => {
      const result = $isDate()(new Date());
      expect(result).toBe(true);
    });

    it("should return true for Date with specific timestamp", () => {
      const result = $isDate()(new Date("2025-01-15T10:30:00Z"));
      expect(result).toBe(true);
    });

    it("should return true for Date with milliseconds timestamp", () => {
      const result = $isDate()(new Date(1705318200000));
      expect(result).toBe(true);
    });

    it("should return true for Date with year, month, day", () => {
      const result = $isDate()(new Date(2025, 0, 15));
      expect(result).toBe(true);
    });

    it("should return true for Date with full parameters", () => {
      const result = $isDate()(new Date(2025, 0, 15, 10, 30, 0, 0));
      expect(result).toBe(true);
    });

    it("should return true for Date at epoch (1970-01-01)", () => {
      const result = $isDate()(new Date(0));
      expect(result).toBe(true);
    });

    it("should return true for Date in the past", () => {
      const result = $isDate()(new Date("2000-01-01T00:00:00Z"));
      expect(result).toBe(true);
    });

    it("should return true for Date in the future", () => {
      const result = $isDate()(new Date("2100-12-31T23:59:59Z"));
      expect(result).toBe(true);
    });
  });

  describe("invalid Date objects", () => {
    it("should return false for invalid Date object", () => {
      const result = $isDate()(new Date("invalid"));
      expect(result).toBe(false);
    });

    it("should return false for Date with NaN timestamp", () => {
      const result = $isDate()(new Date(NaN));
      expect(result).toBe(false);
    });

    it("should return false for Date created from undefined", () => {
      const result = $isDate()(new Date(undefined as any));
      expect(result).toBe(false);
    });
  });

  describe("valid date strings", () => {
    it("should return true for ISO-8601 date string", () => {
      const result = $isDate()("2025-01-15T10:30:00Z");
      expect(result).toBe(true);
    });

    it("should return true for ISO-8601 date without time", () => {
      const result = $isDate()("2025-01-15");
      expect(result).toBe(true);
    });

    it("should return true for ISO-8601 with timezone offset", () => {
      const result = $isDate()("2025-01-15T10:30:00-03:00");
      expect(result).toBe(true);
    });

    it("should return true for ISO-8601 with milliseconds", () => {
      const result = $isDate()("2025-01-15T10:30:00.123Z");
      expect(result).toBe(true);
    });

    it("should return true for short date format", () => {
      const result = $isDate()("01/15/2025");
      expect(result).toBe(true);
    });

    it("should return true for long date format", () => {
      const result = $isDate()("January 15, 2025");
      expect(result).toBe(true);
    });

    it("should return true for date with time", () => {
      const result = $isDate()("2025-01-15 10:30:00");
      expect(result).toBe(true);
    });
  });

  describe("invalid date strings", () => {
    it("should return false for invalid date string", () => {
      const result = $isDate()("invalid-date");
      expect(result).toBe(false);
    });

    it("should return false for empty string", () => {
      const result = $isDate()("");
      expect(result).toBe(false);
    });

    it("should return false for random text", () => {
      const result = $isDate()("hello world");
      expect(result).toBe(false);
    });

    it("should return false for malformed ISO date", () => {
      const result = $isDate()("2025-13-45");
      expect(result).toBe(false);
    });

    it("should return false for date with invalid month", () => {
      const result = $isDate()("2025-13-01");
      expect(result).toBe(false);
    });

    it("should return false for date with invalid day", () => {
      const result = $isDate()("2025-01-32");
      expect(result).toBe(false);
    });
  });

  describe("non-date types", () => {
    it("should return false for number", () => {
      const result = $isDate()(42);
      expect(result).toBe(false);
    });

    it("should return false for timestamp number", () => {
      const result = $isDate()(1705318200000);
      expect(result).toBe(false);
    });

    it("should return false for zero", () => {
      const result = $isDate()(0);
      expect(result).toBe(false);
    });

    it("should return false for boolean true", () => {
      const result = $isDate()(true);
      expect(result).toBe(false);
    });

    it("should return false for boolean false", () => {
      const result = $isDate()(false);
      expect(result).toBe(false);
    });

    it("should return false for null", () => {
      const result = $isDate()(null);
      expect(result).toBe(false);
    });

    it("should return false for undefined", () => {
      const result = $isDate()(undefined);
      expect(result).toBe(false);
    });

    it("should return false for array", () => {
      const result = $isDate()([]);
      expect(result).toBe(false);
    });

    it("should return false for array with date", () => {
      const result = $isDate()([new Date()]);
      expect(result).toBe(false);
    });

    it("should return false for object", () => {
      const result = $isDate()({});
      expect(result).toBe(false);
    });

    it("should return false for object with date property", () => {
      const result = $isDate()({ date: new Date() });
      expect(result).toBe(false);
    });

    it("should return false for function", () => {
      const result = $isDate()(() => new Date());
      expect(result).toBe(false);
    });

    it("should return false for RegExp", () => {
      const result = $isDate()(/\d{4}-\d{2}-\d{2}/);
      expect(result).toBe(false);
    });
  });

  describe("edge cases", () => {
    it("should return false for NaN", () => {
      const result = $isDate()(NaN);
      expect(result).toBe(false);
    });

    it("should return false for Infinity", () => {
      const result = $isDate()(Infinity);
      expect(result).toBe(false);
    });

    it("should return false for -Infinity", () => {
      const result = $isDate()(-Infinity);
      expect(result).toBe(false);
    });

    it("should return true for leap year date", () => {
      const result = $isDate()("2024-02-29");
      expect(result).toBe(true);
    });

    it("should return true for invalid leap year date (JS Date auto-corrects)", () => {
      // Note: JavaScript Date auto-corrects invalid dates like 2023-02-29 to 2023-03-01
      const result = $isDate()("2023-02-29");
      expect(result).toBe(true);
    });

    it("should return true for date at start of Unix epoch", () => {
      const result = $isDate()("1970-01-01T00:00:00Z");
      expect(result).toBe(true);
    });

    it("should return true for very old date", () => {
      const result = $isDate()("1900-01-01");
      expect(result).toBe(true);
    });

    it("should return true for far future date", () => {
      const result = $isDate()("2100-12-31");
      expect(result).toBe(true);
    });

    it("should return false for date-like object", () => {
      const dateLike = {
        getTime: () => Date.now(),
        toISOString: () => new Date().toISOString(),
      };
      const result = $isDate()(dateLike);
      expect(result).toBe(false);
    });

    it("should return false for string with only time", () => {
      const result = $isDate()("10:30:00");
      expect(result).toBe(false);
    });

    it("should return true for string with only year (JS Date accepts it)", () => {
      // Note: JavaScript Date accepts year-only strings
      const result = $isDate()("2025");
      expect(result).toBe(true);
    });

    it("should return false for Symbol", () => {
      const result = $isDate()(Symbol("date"));
      expect(result).toBe(false);
    });

    it("should return false for BigInt", () => {
      const result = $isDate()(BigInt(1705318200000));
      expect(result).toBe(false);
    });
  });

  describe("timezone handling", () => {
    it("should return true for date with UTC timezone", () => {
      const result = $isDate()("2025-01-15T10:30:00Z");
      expect(result).toBe(true);
    });

    it("should return true for date with positive timezone offset", () => {
      const result = $isDate()("2025-01-15T10:30:00+05:30");
      expect(result).toBe(true);
    });

    it("should return true for date with negative timezone offset", () => {
      const result = $isDate()("2025-01-15T10:30:00-08:00");
      expect(result).toBe(true);
    });

    it("should return true for date with timezone name (if supported)", () => {
      // Note: This might not work in all environments
      const result = $isDate()("2025-01-15T10:30:00");
      expect(result).toBe(true);
    });
  });
});
