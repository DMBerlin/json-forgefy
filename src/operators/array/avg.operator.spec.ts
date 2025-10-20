import { $avg } from "./avg.operator";
import {
  ArrayOperatorInputError,
  MissingOperatorParameterError,
} from "@lib-types/error.types";

describe("$avg operator", () => {
  describe("basic functionality", () => {
    it("should calculate average of positive numbers", () => {
      const result = $avg()({
        values: [10, 20, 30, 40],
      });
      expect(result).toBe(25);
    });

    it("should calculate average of negative numbers", () => {
      const result = $avg()({
        values: [-10, -20, -30],
      });
      expect(result).toBe(-20);
    });

    it("should calculate average of mixed positive and negative", () => {
      const result = $avg()({
        values: [10, -5, 20, -10, 15],
      });
      expect(result).toBe(6);
    });

    it("should calculate average of decimals", () => {
      const result = $avg()({
        values: [1.5, 2.5, 3.5],
      });
      expect(result).toBe(2.5);
    });

    it("should handle single element array", () => {
      const result = $avg()({
        values: [42],
      });
      expect(result).toBe(42);
    });

    it("should handle array with zeros", () => {
      const result = $avg()({
        values: [0, 0, 0],
      });
      expect(result).toBe(0);
    });

    it("should calculate average including zero", () => {
      const result = $avg()({
        values: [10, 0, 20, 0, 30],
      });
      expect(result).toBe(12);
    });
  });

  describe("non-numeric value handling", () => {
    it("should filter out non-numeric values", () => {
      const result = $avg()({
        values: [10, "text" as any, 20, null as any, 30],
      });
      expect(result).toBe(20); // Only averages 10, 20, 30
    });

    it("should filter out NaN values", () => {
      const result = $avg()({
        values: [10, NaN, 20, 30],
      });
      expect(result).toBe(20); // Only averages 10, 20, 30
    });

    it("should filter out undefined values", () => {
      const result = $avg()({
        values: [10, undefined as any, 20, 30],
      });
      expect(result).toBe(20);
    });

    it("should return 0 when all values are non-numeric", () => {
      const result = $avg()({
        values: ["a" as any, "b" as any, "c" as any],
      });
      expect(result).toBe(0);
    });

    it("should use fallback when all values are non-numeric", () => {
      const result = $avg()({
        values: ["a" as any, "b" as any],
        fallback: null,
      });
      expect(result).toBeNull();
    });
  });

  describe("empty array handling", () => {
    it("should return 0 for empty array without fallback", () => {
      const result = $avg()({
        values: [],
      });
      expect(result).toBe(0);
    });

    it("should return fallback for empty array", () => {
      const result = $avg()({
        values: [],
        fallback: null,
      });
      expect(result).toBeNull();
    });

    it("should return fallback value for empty array", () => {
      const result = $avg()({
        values: [],
        fallback: -1,
      });
      expect(result).toBe(-1);
    });
  });

  describe("fallback support", () => {
    it("should use fallback when input is not an array", () => {
      const result = $avg()({
        values: "not an array" as any,
        fallback: 100,
      });
      expect(result).toBe(100);
    });

    it("should use fallback when input is null", () => {
      const result = $avg()({
        values: null as any,
        fallback: 0,
      });
      expect(result).toBe(0);
    });

    it("should use fallback when input is undefined", () => {
      const result = $avg()({
        values: undefined as any,
        fallback: 42,
      });
      expect(result).toBe(42);
    });

    it("should allow falsy fallback values", () => {
      const result = $avg()({
        values: "not array" as any,
        fallback: 0,
      });
      expect(result).toBe(0);
    });
  });

  describe("input validation", () => {
    it("should throw error when values is not an array and no fallback", () => {
      expect(() => {
        $avg()({
          values: "not an array" as any,
        });
      }).toThrow(ArrayOperatorInputError);
    });

    it("should throw error when values is a number and no fallback", () => {
      expect(() => {
        $avg()({
          values: 123 as any,
        });
      }).toThrow(ArrayOperatorInputError);
    });

    it("should throw error when values is an object and no fallback", () => {
      expect(() => {
        $avg()({
          values: { a: 1 } as any,
        });
      }).toThrow(ArrayOperatorInputError);
    });

    it("should throw error when values is missing", () => {
      expect(() => {
        $avg()({} as any);
      }).toThrow(MissingOperatorParameterError);
    });

    it("should throw error when params is malformed", () => {
      expect(() => {
        $avg()(null as any);
      }).toThrow(MissingOperatorParameterError);
    });

    it("should use fallback when params has no values but has fallback", () => {
      const result = $avg()({
        fallback: 999,
      } as any);
      expect(result).toBe(999);
    });
  });

  describe("precision and edge cases", () => {
    it("should handle very small numbers", () => {
      const result = $avg()({
        values: [0.1, 0.2, 0.3],
      });
      expect(result).toBeCloseTo(0.2, 10);
    });

    it("should handle very large numbers", () => {
      const result = $avg()({
        values: [1e10, 2e10, 3e10],
      });
      expect(result).toBe(2e10);
    });

    it("should handle negative zero", () => {
      const result = $avg()({
        values: [-0, 0],
      });
      expect(result).toBe(0);
    });
  });
});
