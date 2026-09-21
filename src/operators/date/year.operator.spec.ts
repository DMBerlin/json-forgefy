import { $year } from "./year.operator";
import { OperatorInputError } from "@lib-types/error.types";

describe("$year operator", () => {
  describe("basic functionality", () => {
    it("should return the year for a mid-year date", () => {
      expect($year()("2024-06-15T10:00:00Z")).toBe(2024);
    });

    it("should return the year for the first day of the year", () => {
      expect($year()("2023-01-01T00:00:00Z")).toBe(2023);
    });

    it("should return the year for the last day of the year", () => {
      expect($year()("2020-12-31T23:59:59Z")).toBe(2020);
    });
  });

  describe("timezone handling", () => {
    it("should return the year in UTC by default (object form)", () => {
      expect($year()({ date: "2024-06-15T10:00:00Z" })).toBe(2024);
    });

    it("should respect an explicit UTC timezone", () => {
      expect($year()({ date: "2024-06-15T10:00:00Z", timezone: "UTC" })).toBe(
        2024,
      );
    });

    it("should roll back across the year boundary for negative offsets", () => {
      // 2025-01-01T02:00:00Z is still Dec 31 2024 in Sao Paulo (UTC-3)
      expect(
        $year()({
          date: "2025-01-01T02:00:00Z",
          timezone: "America/Sao_Paulo",
        }),
      ).toBe(2024);
    });

    it("should roll forward across the year boundary for positive offsets", () => {
      // 2024-12-31T16:00:00Z is Jan 1 2025 in Tokyo (UTC+9)
      expect(
        $year()({ date: "2024-12-31T16:00:00Z", timezone: "Asia/Tokyo" }),
      ).toBe(2025);
    });
  });

  describe("different input formats", () => {
    it("should accept a Unix timestamp in seconds", () => {
      expect($year()(1718445000)).toBe(2024); // 2024-06-15T10:30:00Z
    });

    it("should accept a JavaScript timestamp in milliseconds", () => {
      expect($year()(1718445000000)).toBe(2024);
    });

    it("should accept a Date object", () => {
      expect($year()(new Date("2024-06-15T10:00:00Z"))).toBe(2024);
    });
  });

  describe("fallback handling", () => {
    it("should use the fallback for an invalid date string", () => {
      expect($year()({ date: "invalid-date", fallback: 2000 })).toBe(2000);
    });

    it("should use the fallback for an invalid Date object", () => {
      expect($year()({ date: new Date("invalid"), fallback: 1999 })).toBe(1999);
    });

    it("should throw when no fallback is provided for an invalid object date", () => {
      expect(() => $year()({ date: "invalid-date" })).toThrow();
    });

    it("should throw for an invalid direct date input", () => {
      expect(() => $year()("invalid-date-string")).toThrow(
        "$year: Invalid date value",
      );
    });
  });

  describe("input validation", () => {
    it("should throw OperatorInputError for an array", () => {
      expect(() => $year()([] as any)).toThrow(OperatorInputError);
      expect(() => $year()([] as any)).toThrow("Invalid input format");
    });

    it("should throw OperatorInputError for null", () => {
      expect(() => $year()(null as any)).toThrow(OperatorInputError);
    });

    it("should throw OperatorInputError for a plain object", () => {
      expect(() => $year()({ invalid: "prop" } as any)).toThrow(
        OperatorInputError,
      );
    });

    it("should throw OperatorInputError for a boolean", () => {
      expect(() => $year()(true as any)).toThrow(OperatorInputError);
    });
  });
});
