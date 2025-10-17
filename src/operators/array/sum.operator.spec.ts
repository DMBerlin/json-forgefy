import { $sum } from "./sum.operator";
import {
  ArrayOperatorInputError,
  MissingOperatorParameterError,
} from "@lib-types/error.types";

describe("$sum operator", () => {
  describe("basic functionality", () => {
    it("should sum positive numbers", () => {
      const result = $sum()({
        values: [10, 20, 30, 40],
      });
      expect(result).toBe(100);
    });

    it("should sum negative numbers", () => {
      const result = $sum()({
        values: [-10, -20, -30],
      });
      expect(result).toBe(-60);
    });

    it("should sum mixed positive and negative", () => {
      const result = $sum()({
        values: [10, -5, 20, -10, 15],
      });
      expect(result).toBe(30);
    });

    it("should sum decimals", () => {
      const result = $sum()({
        values: [1.5, 2.5, 3.5],
      });
      expect(result).toBe(7.5);
    });

    it("should handle single element array", () => {
      const result = $sum()({
        values: [42],
      });
      expect(result).toBe(42);
    });

    it("should handle array with zeros", () => {
      const result = $sum()({
        values: [0, 0, 0],
      });
      expect(result).toBe(0);
    });

    it("should sum including zeros", () => {
      const result = $sum()({
        values: [10, 0, 20, 0, 30],
      });
      expect(result).toBe(60);
    });

    it("should handle negative zero", () => {
      const result = $sum()({
        values: [-0, 10],
      });
      expect(result).toBe(10);
    });
  });

  describe("non-numeric value handling", () => {
    it("should filter out non-numeric values", () => {
      const result = $sum()({
        values: [10, "text" as any, 20, null as any, 30],
      });
      expect(result).toBe(60); // Only sums 10, 20, 30
    });

    it("should filter out NaN values", () => {
      const result = $sum()({
        values: [10, NaN, 20, 30],
      });
      expect(result).toBe(60); // Only sums 10, 20, 30
    });

    it("should filter out undefined values", () => {
      const result = $sum()({
        values: [10, undefined as any, 20, 30],
      });
      expect(result).toBe(60);
    });

    it("should return 0 when all values are non-numeric", () => {
      const result = $sum()({
        values: ["a" as any, "b" as any, "c" as any],
      });
      expect(result).toBe(0);
    });

    it("should use fallback when all values are non-numeric", () => {
      const result = $sum()({
        values: ["a" as any, "b" as any],
        fallback: null,
      });
      expect(result).toBeNull();
    });

    it("should filter out boolean values", () => {
      const result = $sum()({
        values: [10, true as any, 20, false as any, 30],
      });
      expect(result).toBe(60);
    });

    it("should filter out object values", () => {
      const result = $sum()({
        values: [10, { value: 5 } as any, 20],
      });
      expect(result).toBe(30);
    });
  });

  describe("empty array handling", () => {
    it("should return 0 for empty array without fallback", () => {
      const result = $sum()({
        values: [],
      });
      expect(result).toBe(0);
    });

    it("should return fallback for empty array", () => {
      const result = $sum()({
        values: [],
        fallback: null,
      });
      expect(result).toBeNull();
    });

    it("should return fallback value for empty array", () => {
      const result = $sum()({
        values: [],
        fallback: -1,
      });
      expect(result).toBe(-1);
    });
  });

  describe("fallback support", () => {
    it("should use fallback when input is not an array", () => {
      const result = $sum()({
        values: "not an array" as any,
        fallback: 100,
      });
      expect(result).toBe(100);
    });

    it("should use fallback when input is null", () => {
      const result = $sum()({
        values: null as any,
        fallback: 0,
      });
      expect(result).toBe(0);
    });

    it("should use fallback when input is undefined", () => {
      const result = $sum()({
        values: undefined as any,
        fallback: 42,
      });
      expect(result).toBe(42);
    });

    it("should allow falsy fallback values", () => {
      const result = $sum()({
        values: "not array" as any,
        fallback: 0,
      });
      expect(result).toBe(0);
    });

    it("should allow negative fallback", () => {
      const result = $sum()({
        values: [] as any,
        fallback: -100,
      });
      expect(result).toBe(-100);
    });
  });

  describe("input validation", () => {
    it("should throw error when values is not an array and no fallback", () => {
      expect(() => {
        $sum()({
          values: "not an array" as any,
        });
      }).toThrow(ArrayOperatorInputError);
    });

    it("should throw error when values is a number and no fallback", () => {
      expect(() => {
        $sum()({
          values: 123 as any,
        });
      }).toThrow(ArrayOperatorInputError);
    });

    it("should throw error when values is an object and no fallback", () => {
      expect(() => {
        $sum()({
          values: { a: 1 } as any,
        });
      }).toThrow(ArrayOperatorInputError);
    });

    it("should throw error when values is missing", () => {
      expect(() => {
        $sum()({} as any);
      }).toThrow(MissingOperatorParameterError);
    });

    it("should throw error when params is malformed", () => {
      expect(() => {
        $sum()(null as any);
      }).toThrow(MissingOperatorParameterError);
    });

    it("should use fallback when params has no values but has fallback", () => {
      const result = $sum()({
        fallback: 999,
      } as any);
      expect(result).toBe(999);
    });
  });

  describe("precision and edge cases", () => {
    it("should handle very small numbers", () => {
      const result = $sum()({
        values: [0.1, 0.2, 0.3],
      });
      expect(result).toBeCloseTo(0.6, 10);
    });

    it("should handle very large numbers", () => {
      const result = $sum()({
        values: [1e10, 2e10, 3e10],
      });
      expect(result).toBe(6e10);
    });

    it("should handle large arrays efficiently", () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i + 1);
      const result = $sum()({
        values: largeArray,
      });
      expect(result).toBe(500500); // Sum of 1 to 1000
    });
  });

  describe("real-world use cases", () => {
    it("should calculate total from transaction amounts", () => {
      const result = $sum()({
        values: [100.5, 250.75, 75.25, 150.0],
      });
      expect(result).toBeCloseTo(576.5, 2);
    });

    it("should handle negative transactions (refunds)", () => {
      const result = $sum()({
        values: [100, -25, 50, -10, 75],
      });
      expect(result).toBe(190);
    });
  });
});
