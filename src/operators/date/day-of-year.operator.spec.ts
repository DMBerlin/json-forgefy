import { $dayOfYear } from "./day-of-year.operator";
import { OperatorInputError } from "@lib-types/error.types";

describe("$dayOfYear operator", () => {
  describe("basic functionality", () => {
    it("should return 1 for January 1st", () => {
      const result = $dayOfYear()("2024-01-01T10:00:00Z");
      expect(result).toBe(1);
    });

    it("should return 15 for January 15th", () => {
      const result = $dayOfYear()("2024-01-15T10:00:00Z");
      expect(result).toBe(15);
    });

    it("should return 32 for February 1st", () => {
      const result = $dayOfYear()("2024-02-01T10:00:00Z");
      expect(result).toBe(32);
    });

    it("should return 365 for December 31st (non-leap year)", () => {
      const result = $dayOfYear()("2023-12-31T10:00:00Z");
      expect(result).toBe(365);
    });

    it("should return 366 for December 31st (leap year)", () => {
      const result = $dayOfYear()("2024-12-31T10:00:00Z");
      expect(result).toBe(366);
    });
  });

  describe("leap year handling", () => {
    it("should return 60 for February 29th in leap year", () => {
      const result = $dayOfYear()("2024-02-29T10:00:00Z");
      expect(result).toBe(60);
    });

    it("should return 61 for March 1st in leap year", () => {
      const result = $dayOfYear()("2024-03-01T10:00:00Z");
      expect(result).toBe(61);
    });

    it("should return 60 for March 1st in non-leap year", () => {
      const result = $dayOfYear()("2023-03-01T10:00:00Z");
      expect(result).toBe(60);
    });

    it("should calculate correctly for dates after February in leap year", () => {
      // June 15, 2024 (leap year)
      const result = $dayOfYear()("2024-06-15T10:00:00Z");
      // Jan(31) + Feb(29) + Mar(31) + Apr(30) + May(31) + 15 = 167
      expect(result).toBe(167);
    });

    it("should calculate correctly for dates after February in non-leap year", () => {
      // June 15, 2023 (non-leap year)
      const result = $dayOfYear()("2023-06-15T10:00:00Z");
      // Jan(31) + Feb(28) + Mar(31) + Apr(30) + May(31) + 15 = 166
      expect(result).toBe(166);
    });

    it("should handle century leap year (2000)", () => {
      const result = $dayOfYear()("2000-02-29T10:00:00Z");
      expect(result).toBe(60);
    });

    it("should handle non-century leap year (2024)", () => {
      const result = $dayOfYear()("2024-02-29T10:00:00Z");
      expect(result).toBe(60);
    });
  });

  describe("timezone handling", () => {
    it("should calculate day of year in UTC", () => {
      const result = $dayOfYear()({
        date: "2024-01-15T10:00:00Z",
        timezone: "UTC",
      });
      expect(result).toBe(15);
    });

    it("should calculate day of year in America/Sao_Paulo", () => {
      // 2024-01-15T02:00:00Z is still Jan 14 in Sao Paulo (UTC-3)
      const result = $dayOfYear()({
        date: "2024-01-15T02:00:00Z",
        timezone: "America/Sao_Paulo",
      });
      expect(result).toBe(14);
    });

    it("should calculate day of year in Asia/Tokyo", () => {
      // 2024-01-14T15:00:00Z is Jan 15 in Tokyo (UTC+9)
      const result = $dayOfYear()({
        date: "2024-01-14T15:00:00Z",
        timezone: "Asia/Tokyo",
      });
      expect(result).toBe(15);
    });

    it("should handle timezone at year boundary", () => {
      // 2024-01-01T00:00:00Z is still Dec 31, 2023 in LA (UTC-8)
      const result = $dayOfYear()({
        date: "2024-01-01T07:00:00Z",
        timezone: "America/Los_Angeles",
      });
      expect(result).toBe(365); // Last day of 2023
    });

    it("should handle timezone crossing into next year", () => {
      // 2023-12-31T23:00:00Z is Jan 1, 2024 in Tokyo (UTC+9)
      const result = $dayOfYear()({
        date: "2023-12-31T16:00:00Z",
        timezone: "Asia/Tokyo",
      });
      expect(result).toBe(1);
    });
  });

  describe("different input formats", () => {
    it("should accept ISO-8601 string", () => {
      const result = $dayOfYear()("2024-01-15T10:00:00Z");
      expect(result).toBe(15);
    });

    it("should accept Unix timestamp in seconds", () => {
      const result = $dayOfYear()(1705318200); // 2024-01-15T10:30:00Z
      expect(result).toBe(15);
    });

    it("should accept JavaScript timestamp in milliseconds", () => {
      const result = $dayOfYear()(1705318200000); // 2024-01-15T10:30:00Z
      expect(result).toBe(15);
    });

    it("should accept Date object", () => {
      const date = new Date("2024-01-15T10:00:00Z");
      const result = $dayOfYear()(date);
      expect(result).toBe(15);
    });
  });

  describe("fallback handling", () => {
    it("should use fallback for invalid date string", () => {
      const result = $dayOfYear()({
        date: "invalid-date",
        fallback: 1,
      });
      expect(result).toBe(1);
    });

    it("should use fallback for invalid Date object", () => {
      const result = $dayOfYear()({
        date: new Date("invalid"),
        fallback: 100,
      });
      expect(result).toBe(100);
    });

    it("should throw error when no fallback provided for invalid input", () => {
      expect(() =>
        $dayOfYear()({
          date: "invalid-date",
        }),
      ).toThrow();
    });

    it("should throw error for invalid direct date input", () => {
      expect(() => $dayOfYear()("invalid-date-string")).toThrow(
        "$dayOfYear: Invalid date value",
      );
    });
  });

  describe("edge cases", () => {
    it("should handle all months in leap year", () => {
      const expectedDays = [
        { date: "2024-01-31", day: 31 }, // End of Jan
        { date: "2024-02-29", day: 60 }, // End of Feb (leap)
        { date: "2024-03-31", day: 91 }, // End of Mar
        { date: "2024-04-30", day: 121 }, // End of Apr
        { date: "2024-05-31", day: 152 }, // End of May
        { date: "2024-06-30", day: 182 }, // End of Jun
        { date: "2024-07-31", day: 213 }, // End of Jul
        { date: "2024-08-31", day: 244 }, // End of Aug
        { date: "2024-09-30", day: 274 }, // End of Sep
        { date: "2024-10-31", day: 305 }, // End of Oct
        { date: "2024-11-30", day: 335 }, // End of Nov
        { date: "2024-12-31", day: 366 }, // End of Dec
      ];

      expectedDays.forEach(({ date, day }) => {
        const result = $dayOfYear()(`${date}T10:00:00Z`);
        expect(result).toBe(day);
      });
    });

    it("should handle all months in non-leap year", () => {
      const expectedDays = [
        { date: "2023-01-31", day: 31 }, // End of Jan
        { date: "2023-02-28", day: 59 }, // End of Feb (non-leap)
        { date: "2023-03-31", day: 90 }, // End of Mar
        { date: "2023-04-30", day: 120 }, // End of Apr
        { date: "2023-05-31", day: 151 }, // End of May
        { date: "2023-06-30", day: 181 }, // End of Jun
        { date: "2023-07-31", day: 212 }, // End of Jul
        { date: "2023-08-31", day: 243 }, // End of Aug
        { date: "2023-09-30", day: 273 }, // End of Sep
        { date: "2023-10-31", day: 304 }, // End of Oct
        { date: "2023-11-30", day: 334 }, // End of Nov
        { date: "2023-12-31", day: 365 }, // End of Dec
      ];

      expectedDays.forEach(({ date, day }) => {
        const result = $dayOfYear()(`${date}T10:00:00Z`);
        expect(result).toBe(day);
      });
    });

    it("should handle date near epoch", () => {
      const result = $dayOfYear()("1970-01-01T00:00:00Z");
      expect(result).toBe(1);
    });

    it("should handle date with time at end of day", () => {
      const result = $dayOfYear()("2024-01-15T23:59:59Z");
      expect(result).toBe(15);
    });
  });

  describe("input validation", () => {
    it("should throw OperatorInputError for invalid input format (array)", () => {
      expect(() => $dayOfYear()([] as any)).toThrow(OperatorInputError);
    });

    it("should throw OperatorInputError for null", () => {
      expect(() => $dayOfYear()(null as any)).toThrow(OperatorInputError);
    });

    it("should throw OperatorInputError for plain object without date property", () => {
      expect(() => $dayOfYear()({ invalid: "prop" } as any)).toThrow(
        OperatorInputError,
      );
    });
  });
});
