import { $month } from "./month.operator";
import { OperatorInputError } from "@lib-types/error.types";

describe("$month operator", () => {
  describe("basic functionality", () => {
    it("should return 1 for January", () => {
      expect($month()("2024-01-15T10:00:00Z")).toBe(1);
    });

    it("should return 6 for June", () => {
      expect($month()("2024-06-15T10:00:00Z")).toBe(6);
    });

    it("should return 12 for December", () => {
      expect($month()("2024-12-15T10:00:00Z")).toBe(12);
    });

    it("should return the month (1-12) for every month of the year", () => {
      for (let m = 1; m <= 12; m++) {
        const dateStr = `2024-${String(m).padStart(2, "0")}-15T10:00:00Z`;
        expect($month()(dateStr)).toBe(m);
      }
    });
  });

  describe("timezone handling", () => {
    it("should return the month in UTC by default (object form)", () => {
      expect($month()({ date: "2024-06-15T10:00:00Z" })).toBe(6);
    });

    it("should respect an explicit UTC timezone", () => {
      expect($month()({ date: "2024-06-15T10:00:00Z", timezone: "UTC" })).toBe(
        6,
      );
    });

    it("should roll back across the month boundary for negative offsets", () => {
      // 2024-02-01T02:00:00Z is still Jan 31 in Sao Paulo (UTC-3)
      expect(
        $month()({
          date: "2024-02-01T02:00:00Z",
          timezone: "America/Sao_Paulo",
        }),
      ).toBe(1);
    });

    it("should roll forward across the month boundary for positive offsets", () => {
      // 2024-01-31T16:00:00Z is Feb 1 in Tokyo (UTC+9)
      expect(
        $month()({ date: "2024-01-31T16:00:00Z", timezone: "Asia/Tokyo" }),
      ).toBe(2);
    });
  });

  describe("different input formats", () => {
    it("should accept a Unix timestamp in seconds", () => {
      expect($month()(1718445000)).toBe(6); // 2024-06-15T10:30:00Z
    });

    it("should accept a JavaScript timestamp in milliseconds", () => {
      expect($month()(1718445000000)).toBe(6);
    });

    it("should accept a Date object", () => {
      expect($month()(new Date("2024-06-15T10:00:00Z"))).toBe(6);
    });
  });

  describe("fallback handling", () => {
    it("should use the fallback for an invalid date string", () => {
      expect($month()({ date: "invalid-date", fallback: 1 })).toBe(1);
    });

    it("should use the fallback for an invalid Date object", () => {
      expect($month()({ date: new Date("invalid"), fallback: 12 })).toBe(12);
    });

    it("should throw when no fallback is provided for an invalid object date", () => {
      expect(() => $month()({ date: "invalid-date" })).toThrow();
    });

    it("should throw for an invalid direct date input", () => {
      expect(() => $month()("invalid-date-string")).toThrow(
        "$month: Invalid date value",
      );
    });
  });

  describe("input validation", () => {
    it("should throw OperatorInputError for an array", () => {
      expect(() => $month()([] as any)).toThrow(OperatorInputError);
      expect(() => $month()([] as any)).toThrow("Invalid input format");
    });

    it("should throw OperatorInputError for null", () => {
      expect(() => $month()(null as any)).toThrow(OperatorInputError);
    });

    it("should throw OperatorInputError for a plain object", () => {
      expect(() => $month()({ invalid: "prop" } as any)).toThrow(
        OperatorInputError,
      );
    });

    it("should throw OperatorInputError for a boolean", () => {
      expect(() => $month()(true as any)).toThrow(OperatorInputError);
    });
  });
});
