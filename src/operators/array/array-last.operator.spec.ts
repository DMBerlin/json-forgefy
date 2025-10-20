import { $arrayLast } from "./array-last.operator";
import { ArrayOperatorInputError } from "@lib-types/error.types";

describe("$arrayLast operator", () => {
  describe("basic functionality", () => {
    it("should return last element of array", () => {
      const result = $arrayLast()({
        input: [10, 20, 30],
      });
      expect(result).toBe(30);
    });

    it("should return last element of string array", () => {
      const result = $arrayLast()({
        input: ["apple", "banana", "cherry"],
      });
      expect(result).toBe("cherry");
    });

    it("should return last element of object array", () => {
      const result = $arrayLast()({
        input: [{ id: 1 }, { id: 2 }, { id: 3 }],
      });
      expect(result).toEqual({ id: 3 });
    });

    it("should return last element of single-element array", () => {
      const result = $arrayLast()({
        input: [42],
      });
      expect(result).toBe(42);
    });

    it("should handle arrays with falsy last elements", () => {
      const result = $arrayLast()({
        input: [1, 2, 0],
      });
      expect(result).toBe(0);
    });

    it("should handle arrays with null as last element", () => {
      const result = $arrayLast()({
        input: ["a", "b", null],
      });
      expect(result).toBeNull();
    });

    it("should handle arrays with undefined as last element", () => {
      const result = $arrayLast()({
        input: ["a", "b", undefined],
      });
      expect(result).toBeUndefined();
    });
  });

  describe("empty array handling", () => {
    it("should return undefined for empty array without fallback", () => {
      const result = $arrayLast()({
        input: [],
      });
      expect(result).toBeUndefined();
    });

    it("should return fallback for empty array", () => {
      const result = $arrayLast()({
        input: [],
        fallback: null,
      });
      expect(result).toBeNull();
    });

    it("should return fallback value for empty array", () => {
      const result = $arrayLast()({
        input: [],
        fallback: "default",
      });
      expect(result).toBe("default");
    });

    it("should return fallback object for empty array", () => {
      const result = $arrayLast()({
        input: [],
        fallback: { default: true },
      });
      expect(result).toEqual({ default: true });
    });
  });

  describe("fallback support", () => {
    it("should use fallback when input is not an array", () => {
      const result = $arrayLast()({
        input: "not an array" as any,
        fallback: "fallback value",
      });
      expect(result).toBe("fallback value");
    });

    it("should use fallback when input is null", () => {
      const result = $arrayLast()({
        input: null as any,
        fallback: 42,
      });
      expect(result).toBe(42);
    });

    it("should use fallback when input is undefined", () => {
      const result = $arrayLast()({
        input: undefined as any,
        fallback: [],
      });
      expect(result).toEqual([]);
    });

    it("should use fallback when input is a number", () => {
      const result = $arrayLast()({
        input: 123 as any,
        fallback: null,
      });
      expect(result).toBeNull();
    });

    it("should allow falsy fallback values", () => {
      const result = $arrayLast()({
        input: [] as any,
        fallback: 0,
      });
      expect(result).toBe(0);
    });
  });

  describe("input validation", () => {
    it("should throw error when input is not an array and no fallback", () => {
      expect(() => {
        $arrayLast()({
          input: "not an array" as any,
        });
      }).toThrow(ArrayOperatorInputError);
    });

    it("should throw error when input is a number and no fallback", () => {
      expect(() => {
        $arrayLast()({
          input: 123 as any,
        });
      }).toThrow(ArrayOperatorInputError);
    });

    it("should throw error when input is an object and no fallback", () => {
      expect(() => {
        $arrayLast()({
          input: { a: 1 } as any,
        });
      }).toThrow(ArrayOperatorInputError);
    });

    it("should throw error when params is malformed", () => {
      expect(() => {
        $arrayLast()(null as any);
      }).toThrow(); // More accurate: throws MissingOperatorParameterError
    });

    it("should use fallback when params has no input but has fallback", () => {
      const result = $arrayLast()({
        fallback: "default",
      } as any);
      expect(result).toBe("default");
    });
  });
});
