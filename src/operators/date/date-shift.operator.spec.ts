import { $dateShift } from "./date-shift.operator";
import { DateShiftOperatorInput } from "@lib-types/operator-input.types";
import {
  TimezoneValidationError,
  MaxIterationsError,
  InvalidStrategyError,
  InvalidHolidayError,
  InvalidWeekendError,
} from "@lib-types/error.types";
import { MS_PER_DAY } from "@helpers/date-time.heper";

describe("$dateShift", () => {
  describe("basic functionality", () => {
    it("should return the same date if it's already a business day", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-02-28T10:00:00Z", // Friday
        strategy: "rollForward",
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-02-28T10:00:00.000Z");
    });

    it("should move Saturday to next Monday with rollForward", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-01T10:00:00Z", // Saturday
        strategy: "rollForward",
        weekends: [0, 6], // Sunday, Saturday
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-03T10:00:00.000Z"); // Monday
    });

    it("should move Sunday to next Monday with rollForward", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-02T10:00:00Z", // Sunday
        strategy: "rollForward",
        weekends: [0, 6], // Sunday, Saturday
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-03T10:00:00.000Z"); // Monday
    });

    it("should move Saturday to previous Friday with rollBackward", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-01T10:00:00Z", // Saturday
        strategy: "rollBackward",
        weekends: [0, 6], // Sunday, Saturday
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-02-28T10:00:00.000Z"); // Friday
    });

    it("should move Sunday to previous Friday with rollBackward", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-02T10:00:00Z", // Sunday
        strategy: "rollBackward",
        weekends: [0, 6], // Sunday, Saturday
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-02-28T10:00:00.000Z"); // Friday
    });

    it("should keep the original date with keep strategy", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-01T10:00:00Z", // Saturday
        strategy: "keep",
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-01T10:00:00.000Z"); // Same Saturday
    });
  });

  describe("holiday handling", () => {
    it("should skip holiday on Monday and move to Tuesday", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-01T10:00:00Z", // Saturday
        strategy: "rollForward",
        holidays: ["2025-03-03"], // Monday is holiday
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-04T10:00:00.000Z"); // Tuesday
    });

    it("should handle multiple consecutive holidays", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-01T10:00:00Z", // Saturday
        strategy: "rollForward",
        holidays: ["2025-03-03", "2025-03-04"], // Monday and Tuesday are holidays
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-05T10:00:00.000Z"); // Wednesday
    });

    it("should handle Friday holiday rolling forward through weekend", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-02-28T10:00:00Z", // Friday
        strategy: "rollForward",
        holidays: ["2025-02-28"], // Friday is holiday
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-03T10:00:00.000Z"); // Next Monday (skips weekend)
    });

    it("should handle holiday observed on different day", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-02T10:00:00Z", // Sunday
        strategy: "rollForward",
        holidays: ["2025-03-03"], // Monday is observed holiday
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-04T10:00:00.000Z"); // Tuesday
    });
  });

  describe("custom weekends", () => {
    it("should handle custom weekends (Friday and Saturday)", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-01-03T10:00:00Z", // Friday
        strategy: "rollForward",
        weekends: [5, 6], // Friday and Saturday
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-01-05T10:00:00.000Z"); // Sunday
    });

    it("should handle single weekend day", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-01-04T10:00:00Z", // Saturday
        strategy: "rollForward",
        weekends: [6], // Only Saturday
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-01-05T10:00:00.000Z"); // Sunday
    });

    it("should handle no weekends (empty array)", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-01-04T10:00:00Z", // Saturday
        strategy: "rollForward",
        weekends: [], // No weekends
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-01-04T10:00:00.000Z"); // Same day (no weekends defined)
    });
  });

  describe("timezone handling", () => {
    it("should respect timezone for day of week calculation", () => {
      // 2025-02-28T21:00:00Z is Friday in both UTC and Sao Paulo, so no adjustment needed
      const input: DateShiftOperatorInput = {
        date: "2025-02-28T21:00:00Z",
        strategy: "rollForward",
        weekends: [0, 6],
        timezone: "America/Sao_Paulo",
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-02-28T21:00:00.000Z"); // Friday in both timezones, no adjustment
    });

    it("should handle timezone transitions correctly", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-10-19T02:00:00Z", // Sunday in UTC, Saturday in New York
        strategy: "rollForward",
        weekends: [0, 6],
        timezone: "America/New_York",
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-10-21T02:00:00.000Z"); // Monday in New York (Oct 20 NY = Oct 21 UTC)
    });

    it("should handle holidays in specific timezone", () => {
      // First, let's test a simpler case - a holiday on a weekday in UTC
      const input: DateShiftOperatorInput = {
        date: "2025-01-01T12:00:00Z", // Wednesday, Jan 1, 2025 at noon UTC
        strategy: "rollForward",
        holidays: ["2025-01-01"], // New Year's Day
        weekends: [0, 6], // Sunday and Saturday
        timezone: "UTC", // Use UTC to avoid timezone complexity
      };

      const result = $dateShift()(input);
      // Should move from Wednesday (holiday) to Thursday
      expect(result).toBe("2025-01-02T12:00:00.000Z"); // Next business day (Thursday)
    });
  });

  describe("edge cases", () => {
    it("should handle leap year correctly", () => {
      const input: DateShiftOperatorInput = {
        date: "2024-02-29T10:00:00Z", // Thursday (leap year)
        strategy: "rollForward",
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2024-02-29T10:00:00.000Z"); // Same day (valid business day)
    });

    it("should handle year boundary transitions", () => {
      const input: DateShiftOperatorInput = {
        date: "2024-12-29T10:00:00Z", // Sunday
        strategy: "rollForward",
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2024-12-30T10:00:00.000Z"); // Monday
    });

    it("should handle month boundary transitions", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-01-31T10:00:00Z", // Friday
        strategy: "rollForward",
        holidays: ["2025-01-31"], // Friday is holiday
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-02-03T10:00:00.000Z"); // Next Monday (Feb 3)
    });
  });

  describe("max iterations and fallback", () => {
    it("should throw MaxIterationsError when limit is reached", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-01-01T10:00:00Z",
        strategy: "rollForward",
        holidays: Array.from({ length: 365 }, (_, i) => {
          // Use immutable date arithmetic instead of setDate
          const baseDate = new Date("2025-01-01T00:00:00Z");
          const newDate = new Date(baseDate.getTime() + i * MS_PER_DAY);
          return newDate.toISOString().split("T")[0];
        }),
        weekends: [0, 1, 2, 3, 4, 5, 6], // All days are weekends
        maxIterations: 10,
      };

      expect(() => $dateShift()(input)).toThrow(MaxIterationsError);
      expect(() => $dateShift()(input)).toThrow(
        "Maximum iterations (10) reached",
      );
    });

    it("should use fallback when max iterations reached", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-01-01T10:00:00Z",
        strategy: "rollForward",
        holidays: Array.from({ length: 365 }, (_, i) => {
          // Use immutable date arithmetic instead of setDate
          const baseDate = new Date("2025-01-01T00:00:00Z");
          const newDate = new Date(baseDate.getTime() + i * MS_PER_DAY);
          return newDate.toISOString().split("T")[0];
        }),
        weekends: [0, 1, 2, 3, 4, 5, 6], // All days are weekends
        maxIterations: 10,
        fallback: "2025-12-31T10:00:00.000Z",
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-12-31T10:00:00.000Z");
    });

    it("should use fallback for invalid date input", () => {
      const input: DateShiftOperatorInput = {
        date: "invalid-date",
        strategy: "rollForward",
        fallback: "2025-01-02T00:00:00.000Z",
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-01-02T00:00:00.000Z");
    });
  });

  describe("input validation", () => {
    it("should throw error for missing date property", () => {
      expect(() => $dateShift()({} as any)).toThrow(
        "$dateShift requires an object with date property",
      );
    });

    it("should throw error for invalid strategy", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-01-01T10:00:00Z",
        strategy: "invalid" as any,
      };

      expect(() => $dateShift()(input)).toThrow(InvalidStrategyError);
      expect(() => $dateShift()(input)).toThrow("Invalid strategy: invalid");
    });

    it("should throw error for invalid timezone", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-01-01T10:00:00Z",
        strategy: "rollForward",
        timezone: "Invalid/Timezone",
      };

      expect(() => $dateShift()(input)).toThrow(TimezoneValidationError);
      expect(() => $dateShift()(input)).toThrow(
        "Invalid timezone: Invalid/Timezone",
      );
    });

    it("should throw error for non-array holidays", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-01-01T10:00:00Z",
        strategy: "rollForward",
        holidays: "not-an-array" as any,
      };

      expect(() => $dateShift()(input)).toThrow(InvalidHolidayError);
      expect(() => $dateShift()(input)).toThrow("holidays must be an array");
    });

    it("should throw error for non-array weekends", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-01-01T10:00:00Z",
        strategy: "rollForward",
        weekends: "not-an-array" as any,
      };

      expect(() => $dateShift()(input)).toThrow(InvalidWeekendError);
      expect(() => $dateShift()(input)).toThrow("weekends must be an array");
    });

    it("should throw error for invalid weekend values", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-01-01T10:00:00Z",
        strategy: "rollForward",
        weekends: [0, 7], // 7 is invalid (should be 0-6)
      };

      expect(() => $dateShift()(input)).toThrow(InvalidWeekendError);
      expect(() => $dateShift()(input)).toThrow(
        "weekends must contain numbers between 0-6",
      );
    });

    it("should throw error for invalid holiday date", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-01-01T10:00:00Z",
        strategy: "rollForward",
        holidays: ["invalid-date"],
      };

      expect(() => $dateShift()(input)).toThrow(InvalidHolidayError);
      expect(() => $dateShift()(input)).toThrow(
        "Invalid holiday date: invalid-date",
      );
    });
  });

  describe("different input formats", () => {
    it("should handle string date input", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-01T10:00:00Z",
        strategy: "rollForward",
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-03T10:00:00.000Z"); // Saturday -> Monday
    });

    it("should handle Date object input", () => {
      const input: DateShiftOperatorInput = {
        date: new Date("2025-03-01T10:00:00Z"),
        strategy: "rollForward",
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-03T10:00:00.000Z"); // Saturday -> Monday
    });

    it("should handle Unix timestamp input (seconds)", () => {
      const input: DateShiftOperatorInput = {
        date: 1740823200, // 2025-03-01T10:00:00Z in seconds
        strategy: "rollForward",
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-03T10:00:00.000Z"); // Saturday -> Monday
    });

    it("should handle JavaScript timestamp input (milliseconds)", () => {
      const input: DateShiftOperatorInput = {
        date: 1740823200000, // 2025-03-01T10:00:00Z in milliseconds
        strategy: "rollForward",
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-03T10:00:00.000Z"); // Saturday -> Monday
    });
  });

  describe("comprehensive test matrix", () => {
    // Test matrix from design document
    const testCases = [
      {
        description: "Friday normal",
        date: "2025-02-28T10:00:00Z",
        holidays: [],
        weekends: [0, 6],
        strategy: "rollForward" as const,
        expected: "2025-02-28T10:00:00.000Z", // Same day
      },
      {
        description: "Saturday",
        date: "2025-03-01T10:00:00Z",
        holidays: [],
        weekends: [0, 6],
        strategy: "rollForward" as const,
        expected: "2025-03-03T10:00:00.000Z", // Monday
      },
      {
        description: "Sunday",
        date: "2025-03-02T10:00:00Z",
        holidays: [],
        weekends: [0, 6],
        strategy: "rollForward" as const,
        expected: "2025-03-03T10:00:00.000Z", // Monday
      },
      {
        description: "Holiday on Monday",
        date: "2025-03-03T10:00:00Z",
        holidays: ["2025-03-03"],
        weekends: [0, 6],
        strategy: "rollForward" as const,
        expected: "2025-03-04T10:00:00.000Z", // Tuesday
      },
      {
        description: "Friday holiday",
        date: "2025-02-28T10:00:00Z",
        holidays: ["2025-02-28"],
        weekends: [0, 6],
        strategy: "rollForward" as const,
        expected: "2025-03-03T10:00:00.000Z", // Monday (skips weekend)
      },
      {
        description: "Rollback Saturday",
        date: "2025-03-01T10:00:00Z",
        holidays: [],
        weekends: [0, 6],
        strategy: "rollBackward" as const,
        expected: "2025-02-28T10:00:00.000Z", // Friday
      },
      {
        description: "Rollback Sunday",
        date: "2025-03-02T10:00:00Z",
        holidays: [],
        weekends: [0, 6],
        strategy: "rollBackward" as const,
        expected: "2025-02-28T10:00:00.000Z", // Friday
      },
      {
        description: "Keep strategy",
        date: "2025-03-01T10:00:00Z",
        holidays: [],
        weekends: [0, 6],
        strategy: "keep" as const,
        expected: "2025-03-01T10:00:00.000Z", // Same day
      },
    ];

    testCases.forEach(
      ({ description, date, holidays, weekends, strategy, expected }) => {
        it(`should handle ${description}`, () => {
          const input: DateShiftOperatorInput = {
            date,
            holidays,
            weekends,
            strategy,
          };

          const result = $dateShift()(input);
          expect(result).toBe(expected);
        });
      },
    );
  });

  describe("specific task requirements", () => {
    it("should test rollForward from Saturday to Monday (case 2 from design)", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-01T10:00:00Z", // Saturday
        strategy: "rollForward",
        weekends: [0, 6], // Sunday, Saturday
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-03T10:00:00.000Z"); // Monday
    });

    it("should test rollForward from Sunday to Monday", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-02T10:00:00Z", // Sunday
        strategy: "rollForward",
        weekends: [0, 6], // Sunday, Saturday
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-03T10:00:00.000Z"); // Monday
    });

    it("should test rollForward skipping holiday on Monday (case 3 from design)", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-01T10:00:00Z", // Saturday
        strategy: "rollForward",
        holidays: ["2025-03-03"], // Monday is holiday
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-04T10:00:00.000Z"); // Tuesday
    });

    it("should test rollForward with multiple consecutive adjustments", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-01T10:00:00Z", // Saturday
        strategy: "rollForward",
        holidays: ["2025-03-03", "2025-03-04", "2025-03-05"], // Monday, Tuesday, Wednesday are holidays
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-06T10:00:00.000Z"); // Thursday
    });

    it("should test rollBackward from Saturday to Friday", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-01T10:00:00Z", // Saturday
        strategy: "rollBackward",
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-02-28T10:00:00.000Z"); // Friday
    });

    it("should test keep strategy", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-01T10:00:00Z", // Saturday
        strategy: "keep",
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-01T10:00:00.000Z"); // Same Saturday
    });

    it("should test with leap year (February 29)", () => {
      const input: DateShiftOperatorInput = {
        date: "2024-02-29T10:00:00Z", // Thursday (leap year)
        strategy: "rollForward",
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2024-02-29T10:00:00.000Z"); // Same day (valid business day)
    });

    it("should test leap year weekend adjustment", () => {
      const input: DateShiftOperatorInput = {
        date: "2024-02-25T10:00:00Z", // Sunday in leap year
        strategy: "rollForward",
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2024-02-26T10:00:00.000Z"); // Monday
    });

    it("should test DST transition (case 5 from design) - Spring forward", () => {
      // March 9, 2025 is when DST starts in US (2 AM becomes 3 AM)
      const input: DateShiftOperatorInput = {
        date: "2025-03-08T10:00:00Z", // Saturday before DST
        strategy: "rollForward",
        weekends: [0, 6],
        timezone: "America/New_York",
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-10T10:00:00.000Z"); // Monday after DST transition
    });

    it("should test DST transition - Fall back", () => {
      // November 2, 2025 is when DST ends in US (2 AM becomes 1 AM)
      const input: DateShiftOperatorInput = {
        date: "2025-11-01T10:00:00Z", // Saturday before DST ends
        strategy: "rollForward",
        weekends: [0, 6],
        timezone: "America/New_York",
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-11-03T10:00:00.000Z"); // Monday after DST transition
    });

    it("should test with multiple timezones - UTC", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-01T10:00:00Z", // Saturday
        strategy: "rollForward",
        weekends: [0, 6],
        timezone: "UTC",
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-03T10:00:00.000Z"); // Monday
    });

    it("should test with multiple timezones - America/Sao_Paulo", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-01T10:00:00Z", // Saturday in UTC
        strategy: "rollForward",
        weekends: [0, 6],
        timezone: "America/Sao_Paulo",
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-03T10:00:00.000Z"); // Monday (same result as UTC for this date)
    });

    it("should test with multiple timezones - Asia/Tokyo", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-01T15:00:00Z", // Saturday 15:00 UTC = Sunday 00:00 JST (March 2)
        strategy: "rollForward",
        weekends: [0, 6],
        timezone: "Asia/Tokyo",
      };

      const result = $dateShift()(input);
      // March 1, 2025 15:00 UTC = March 2, 2025 00:00 JST (Sunday)
      // Sunday should roll forward to Monday, which is March 3 in JST
      // But we return the original UTC time adjusted by days, so March 2 15:00 UTC
      expect(result).toBe("2025-03-02T15:00:00.000Z"); // Adjusted to next business day
    });

    it("should test maxIterations with fallback (case 6 from design)", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-01-01T10:00:00Z",
        strategy: "rollForward",
        holidays: Array.from({ length: 365 }, (_, i) => {
          // Use immutable date arithmetic instead of setDate
          const baseDate = new Date("2025-01-01T00:00:00Z");
          const newDate = new Date(baseDate.getTime() + i * MS_PER_DAY);
          return newDate.toISOString().split("T")[0];
        }),
        weekends: [0, 1, 2, 3, 4, 5, 6], // All days are weekends
        maxIterations: 10,
        fallback: "2025-12-31T10:00:00.000Z",
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-12-31T10:00:00.000Z");
    });

    it("should test complete matrix - Friday normal (no adjustment needed)", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-02-28T10:00:00Z", // Friday
        strategy: "rollForward",
        holidays: [],
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-02-28T10:00:00.000Z"); // Same day
    });

    it("should test complete matrix - Holiday observed scenario", () => {
      // Sunday holiday observed on Monday
      const input: DateShiftOperatorInput = {
        date: "2025-03-02T10:00:00Z", // Sunday
        strategy: "rollForward",
        holidays: ["2025-03-03"], // Monday is observed holiday
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-04T10:00:00.000Z"); // Tuesday
    });

    it("should test rollBackward with holiday", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-03T10:00:00Z", // Monday
        strategy: "rollBackward",
        holidays: ["2025-02-28"], // Previous Friday is holiday
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-03T10:00:00.000Z"); // Same day (Monday is business day)
    });

    it("should test rollBackward skipping weekend and holiday", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-03T10:00:00Z", // Monday
        strategy: "rollBackward",
        holidays: ["2025-03-03", "2025-02-28"], // Monday and Friday are holidays
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-02-27T10:00:00.000Z"); // Thursday (skips Friday holiday and weekend)
    });

    it("should test keep strategy with holiday (from documentation examples)", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-01-01T10:00:00Z", // Holiday (New Year's Day)
        strategy: "keep",
        holidays: ["2025-01-01"],
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-01-01T10:00:00.000Z"); // Keeps holiday unchanged
    });

    it("should test rollBackward across year boundary", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-01-01T10:00:00Z", // Wednesday (New Year)
        strategy: "rollBackward",
        holidays: ["2025-01-01"],
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2024-12-31T10:00:00.000Z"); // Previous year Tuesday
    });

    it("should test default strategy (should default to rollForward)", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-01T10:00:00Z", // Saturday
        // No strategy specified - should default to rollForward
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-03T10:00:00.000Z"); // Monday (default rollForward)
    });

    it("should test default timezone (should default to UTC)", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-01T10:00:00Z", // Saturday
        strategy: "rollForward",
        // No timezone specified - should default to UTC
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-03T10:00:00.000Z"); // Monday (calculated in UTC)
    });

    it("should test default weekends (should default to Sunday and Saturday)", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-01T10:00:00Z", // Saturday
        strategy: "rollForward",
        // No weekends specified - should default to [0, 6]
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-03T10:00:00.000Z"); // Monday (skips default weekend)
    });

    it("should test default maxIterations (should default to 365)", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-01-04T10:00:00Z", // Saturday
        strategy: "rollForward",
        holidays: [], // Empty holidays
        weekends: [0, 6],
        // No maxIterations specified - should default to 365
      };

      const result = $dateShift()(input);
      // Should not throw error since we have less than 365 non-business days
      // Saturday Jan 4 should roll forward to Monday Jan 6
      expect(result).toBe("2025-01-06T10:00:00.000Z"); // Monday
    });

    it("should test empty holidays array explicitly", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-01T10:00:00Z", // Saturday
        strategy: "rollForward",
        holidays: [], // Explicitly empty
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-03T10:00:00.000Z"); // Monday (no holidays to skip)
    });

    it("should test business day remains unchanged", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-03T10:00:00Z", // Monday (business day)
        strategy: "rollForward",
        holidays: [],
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-03T10:00:00.000Z"); // Same day (already business day)
    });

    it("should test rollForward from end of month through weekend", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-05-30T10:00:00Z", // Friday, May 30
        strategy: "rollForward",
        holidays: ["2025-05-30"], // Friday is holiday
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-06-02T10:00:00.000Z"); // Monday, June 2 (next month)
    });

    it("should test rollBackward from start of month through weekend", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-06-02T10:00:00Z", // Monday, June 2
        strategy: "rollBackward",
        holidays: ["2025-06-02"], // Monday is holiday
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-05-30T10:00:00.000Z"); // Friday, May 30 (previous month)
    });

    it("should test week with all weekdays as holidays (uses maxIterations)", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-03T10:00:00Z", // Monday
        strategy: "rollForward",
        holidays: [
          "2025-03-03", // Monday
          "2025-03-04", // Tuesday
          "2025-03-05", // Wednesday
          "2025-03-06", // Thursday
          "2025-03-07", // Friday
        ],
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-10T10:00:00.000Z"); // Monday of next week
    });

    it("should test timezone edge case - date changes due to timezone", () => {
      // March 1, 2025 23:00 UTC = March 2, 2025 08:00 JST (next day)
      const input: DateShiftOperatorInput = {
        date: "2025-03-01T23:00:00Z", // Saturday 23:00 UTC
        strategy: "rollForward",
        weekends: [0, 6],
        timezone: "Asia/Tokyo", // JST (UTC+9)
      };

      const result = $dateShift()(input);
      // In Tokyo, this is Sunday March 2, so should roll forward to Monday
      expect(result).toBe("2025-03-02T23:00:00.000Z"); // Adjusted by 1 day
    });

    it("should preserve time component during adjustment", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-01T14:30:45.123Z", // Saturday with specific time
        strategy: "rollForward",
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-03-03T14:30:45.123Z"); // Monday with same time preserved
    });

    it("should test consecutive rollBackward adjustments", () => {
      const input: DateShiftOperatorInput = {
        date: "2025-03-02T10:00:00Z", // Sunday
        strategy: "rollBackward",
        holidays: ["2025-02-28", "2025-02-27"], // Friday and Thursday are holidays
        weekends: [0, 6],
      };

      const result = $dateShift()(input);
      expect(result).toBe("2025-02-26T10:00:00.000Z"); // Wednesday (skips back through holidays)
    });
  });
});
