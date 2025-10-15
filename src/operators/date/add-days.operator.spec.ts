import { $addDays } from "./add-days.operator";

describe("$addDays", () => {
  const operator = $addDays();

  describe("basic functionality", () => {
    it("should add positive days", () => {
      const result = operator({
        date: "2025-01-01T12:00:00.000Z",
        days: 5,
      });
      expect(result).toBe("2025-01-06T12:00:00.000Z");
    });

    it("should subtract days with negative number", () => {
      const result = operator({
        date: "2025-01-10T12:00:00.000Z",
        days: -5,
      });
      expect(result).toBe("2025-01-05T12:00:00.000Z");
    });

    it("should return same date when adding 0 days", () => {
      const result = operator({
        date: "2025-01-01T12:00:00.000Z",
        days: 0,
      });
      expect(result).toBe("2025-01-01T12:00:00.000Z");
    });

    it("should add 1 day", () => {
      const result = operator({
        date: "2025-01-01T12:00:00.000Z",
        days: 1,
      });
      expect(result).toBe("2025-01-02T12:00:00.000Z");
    });

    it("should subtract 1 day", () => {
      const result = operator({
        date: "2025-01-02T12:00:00.000Z",
        days: -1,
      });
      expect(result).toBe("2025-01-01T12:00:00.000Z");
    });
  });

  describe("month transitions", () => {
    it("should handle transition from January to February", () => {
      const result = operator({
        date: "2025-01-30T12:00:00.000Z",
        days: 5,
      });
      expect(result).toBe("2025-02-04T12:00:00.000Z");
    });

    it("should handle transition from February to March (non-leap year)", () => {
      const result = operator({
        date: "2025-02-26T12:00:00.000Z",
        days: 5,
      });
      expect(result).toBe("2025-03-03T12:00:00.000Z");
    });

    it("should handle transition from February to March (leap year)", () => {
      const result = operator({
        date: "2024-02-26T12:00:00.000Z",
        days: 5,
      });
      expect(result).toBe("2024-03-02T12:00:00.000Z");
    });

    it("should handle transition from December to January", () => {
      const result = operator({
        date: "2024-12-30T12:00:00.000Z",
        days: 5,
      });
      expect(result).toBe("2025-01-04T12:00:00.000Z");
    });

    it("should handle backward transition from March to February", () => {
      const result = operator({
        date: "2025-03-03T12:00:00.000Z",
        days: -5,
      });
      expect(result).toBe("2025-02-26T12:00:00.000Z");
    });
  });

  describe("year transitions", () => {
    it("should handle transition to next year", () => {
      const result = operator({
        date: "2024-12-31T12:00:00.000Z",
        days: 1,
      });
      expect(result).toBe("2025-01-01T12:00:00.000Z");
    });

    it("should handle transition to previous year", () => {
      const result = operator({
        date: "2025-01-01T12:00:00.000Z",
        days: -1,
      });
      expect(result).toBe("2024-12-31T12:00:00.000Z");
    });

    it("should handle adding full year (365 days)", () => {
      const result = operator({
        date: "2025-01-01T12:00:00.000Z",
        days: 365,
      });
      expect(result).toBe("2026-01-01T12:00:00.000Z");
    });

    it("should handle adding full leap year (366 days)", () => {
      const result = operator({
        date: "2024-01-01T12:00:00.000Z",
        days: 366,
      });
      expect(result).toBe("2025-01-01T12:00:00.000Z");
    });
  });

  describe("leap year handling", () => {
    it("should handle leap day (Feb 29)", () => {
      const result = operator({
        date: "2024-02-29T12:00:00.000Z",
        days: 1,
      });
      expect(result).toBe("2024-03-01T12:00:00.000Z");
    });

    it("should handle adding days to reach leap day", () => {
      const result = operator({
        date: "2024-02-28T12:00:00.000Z",
        days: 1,
      });
      expect(result).toBe("2024-02-29T12:00:00.000Z");
    });

    it("should handle subtracting from leap day", () => {
      const result = operator({
        date: "2024-02-29T12:00:00.000Z",
        days: -1,
      });
      expect(result).toBe("2024-02-28T12:00:00.000Z");
    });
  });

  describe("input formats", () => {
    it("should accept ISO-8601 string", () => {
      const result = operator({
        date: "2025-01-01T12:00:00Z",
        days: 1,
      });
      expect(result).toBe("2025-01-02T12:00:00.000Z");
    });

    it("should accept Unix timestamp (seconds)", () => {
      const result = operator({
        date: 1735732800, // 2025-01-01T12:00:00Z
        days: 1,
      });
      expect(result).toBe("2025-01-02T12:00:00.000Z");
    });

    it("should accept JavaScript timestamp (milliseconds)", () => {
      const result = operator({
        date: 1735732800000, // 2025-01-01T12:00:00Z
        days: 1,
      });
      expect(result).toBe("2025-01-02T12:00:00.000Z");
    });

    it("should accept Date object", () => {
      const result = operator({
        date: new Date("2025-01-01T12:00:00Z"),
        days: 1,
      });
      expect(result).toBe("2025-01-02T12:00:00.000Z");
    });
  });

  describe("payload resolution", () => {
    it("should work with resolved date value", () => {
      // In real usage, resolveExpression would resolve "$transaction_date" before passing to operator
      const result = operator({
        date: "2025-01-01T12:00:00Z",
        days: 1,
      });
      expect(result).toBe("2025-01-02T12:00:00.000Z");
    });

    it("should work with resolved days value", () => {
      // In real usage, resolveExpression would resolve "$offset_days" before passing to operator
      const result = operator({
        date: "2025-01-01T12:00:00Z",
        days: 5,
      });
      expect(result).toBe("2025-01-06T12:00:00.000Z");
    });

    it("should work with resolved date and days values", () => {
      // In real usage, resolveExpression would resolve both paths before passing to operator
      const result = operator({
        date: "2025-01-01T12:00:00Z",
        days: 10,
      });
      expect(result).toBe("2025-01-11T12:00:00.000Z");
    });
  });

  describe("fallback handling", () => {
    it("should use fallback value on invalid date", () => {
      const result = operator({
        date: "invalid-date",
        days: 1,
        fallback: "2025-01-01T00:00:00.000Z",
      });
      expect(result).toBe("2025-01-01T00:00:00.000Z");
    });

    it("should use fallback with static value", () => {
      // In real usage, resolveExpression would resolve "$default_date" before passing to operator
      const result = operator({
        date: "invalid-date",
        days: 1,
        fallback: "2025-01-01T00:00:00.000Z",
      });
      expect(result).toBe("2025-01-01T00:00:00.000Z");
    });

    it("should use fallback with resolved expression", () => {
      // In real usage, resolveExpression would resolve the expression before passing to operator
      const result = operator({
        date: "invalid-date",
        days: 1,
        fallback: "2025-01-01T00:00:00.000Z", // Result of { $concat: [...] }
      });
      expect(result).toBe("2025-01-01T00:00:00.000Z");
    });

    it("should throw error when no fallback is provided", () => {
      expect(() =>
        operator({
          date: "invalid-date",
          days: 1,
        }),
      ).toThrow();
    });

    it("should use fallback when days is not a number", () => {
      const result = operator({
        date: "2025-01-01T12:00:00Z",
        days: "not-a-number" as any,
        fallback: "2025-01-01T00:00:00.000Z",
      });
      expect(result).toBe("2025-01-01T00:00:00.000Z");
    });

    it("should use fallback when days is NaN", () => {
      const result = operator({
        date: "2025-01-01T12:00:00Z",
        days: NaN,
        fallback: "2025-01-01T00:00:00.000Z",
      });
      expect(result).toBe("2025-01-01T00:00:00.000Z");
    });

    it("should throw error when days is not a number and no fallback", () => {
      expect(() =>
        operator({
          date: "2025-01-01T12:00:00Z",
          days: "not-a-number" as any,
        }),
      ).toThrow("days must be a finite number");
    });
  });

  describe("edge cases", () => {
    it("should handle large positive day values", () => {
      const result = operator({
        date: "2025-01-01T12:00:00.000Z",
        days: 1000,
      });
      expect(result).toBe("2027-09-28T12:00:00.000Z");
    });

    it("should handle large negative day values", () => {
      const result = operator({
        date: "2025-01-01T12:00:00.000Z",
        days: -1000,
      });
      expect(result).toBe("2022-04-07T12:00:00.000Z");
    });

    it("should preserve time component", () => {
      const result = operator({
        date: "2025-01-01T15:30:45.123Z",
        days: 1,
      });
      expect(result).toBe("2025-01-02T15:30:45.123Z");
    });

    it("should handle fractional days (rounds down)", () => {
      const result = operator({
        date: "2025-01-01T00:00:00.000Z",
        days: 1.5,
      });
      // 1.5 days = 36 hours
      expect(result).toBe("2025-01-02T12:00:00.000Z");
    });

    it("should handle decimal days correctly", () => {
      const result = operator({
        date: "2025-01-01T00:00:00.000Z",
        days: 0.5,
      });
      // 0.5 days = 12 hours
      expect(result).toBe("2025-01-01T12:00:00.000Z");
    });
  });
});
