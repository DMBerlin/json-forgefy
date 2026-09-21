import { $isLeapYear } from "./is-leap-year.operator";
import { OperatorInputError } from "@lib-types/error.types";

describe("$isLeapYear operator", () => {
  describe("basic functionality", () => {
    it("should return true for a year divisible by 4", () => {
      expect($isLeapYear()("2024-06-15T10:00:00Z")).toBe(true);
    });

    it("should return false for a common year", () => {
      expect($isLeapYear()("2023-06-15T10:00:00Z")).toBe(false);
    });

    it("should return true for a year divisible by 400", () => {
      expect($isLeapYear()("2000-01-01T00:00:00Z")).toBe(true);
    });

    it("should return false for a year divisible by 100 but not 400", () => {
      expect($isLeapYear()("1900-01-01T00:00:00Z")).toBe(false);
    });
  });

  describe("object form", () => {
    it("should accept an object with a value property", () => {
      expect($isLeapYear()({ value: "2024-06-15T10:00:00Z" })).toBe(true);
    });

    it("should return false for a non-leap year in object form", () => {
      expect($isLeapYear()({ value: "2025-06-15T10:00:00Z" })).toBe(false);
    });
  });

  describe("different input formats", () => {
    it("should accept a Unix timestamp in seconds", () => {
      expect($isLeapYear()(1718445000)).toBe(true); // 2024-06-15T10:30:00Z
    });

    it("should accept a JavaScript timestamp in milliseconds", () => {
      expect($isLeapYear()(1718445000000)).toBe(true);
    });

    it("should accept a Date object", () => {
      expect($isLeapYear()(new Date("2023-06-15T10:00:00Z"))).toBe(false);
    });
  });

  describe("fallback handling", () => {
    it("should use the fallback for an invalid date string", () => {
      expect($isLeapYear()({ value: "invalid-date", fallback: false })).toBe(
        false,
      );
    });

    it("should use the fallback for an invalid Date object", () => {
      expect(
        $isLeapYear()({ value: new Date("invalid"), fallback: true }),
      ).toBe(true);
    });

    it("should throw when no fallback is provided for an invalid object value", () => {
      expect(() => $isLeapYear()({ value: "invalid-date" })).toThrow();
    });

    it("should throw for an invalid direct date input", () => {
      expect(() => $isLeapYear()("invalid-date-string")).toThrow(
        "$isLeapYear: Invalid date value",
      );
    });
  });

  describe("input validation", () => {
    it("should throw OperatorInputError for an array", () => {
      expect(() => $isLeapYear()([] as any)).toThrow(OperatorInputError);
      expect(() => $isLeapYear()([] as any)).toThrow("Invalid input format");
    });

    it("should throw OperatorInputError for null", () => {
      expect(() => $isLeapYear()(null as any)).toThrow(OperatorInputError);
    });

    it("should throw OperatorInputError for a plain object without value", () => {
      expect(() => $isLeapYear()({ invalid: "prop" } as any)).toThrow(
        OperatorInputError,
      );
    });

    it("should throw OperatorInputError for a boolean", () => {
      expect(() => $isLeapYear()(true as any)).toThrow(OperatorInputError);
    });
  });
});
