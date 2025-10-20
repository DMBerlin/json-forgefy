import { $arrayFirst } from "./array-first.operator";
import { ArrayOperatorInputError } from "@lib-types/error.types";

describe("$arrayFirst operator", () => {
  describe("basic functionality", () => {
    it("should return first element of array", () => {
      const result = $arrayFirst()({
        input: [10, 20, 30],
      });
      expect(result).toBe(10);
    });

    it("should return first element of string array", () => {
      const result = $arrayFirst()({
        input: ["apple", "banana", "cherry"],
      });
      expect(result).toBe("apple");
    });

    it("should return first element of object array", () => {
      const result = $arrayFirst()({
        input: [{ id: 1 }, { id: 2 }, { id: 3 }],
      });
      expect(result).toEqual({ id: 1 });
    });

    it("should return first element of single-element array", () => {
      const result = $arrayFirst()({
        input: [42],
      });
      expect(result).toBe(42);
    });

    it("should handle arrays with falsy first elements", () => {
      const result = $arrayFirst()({
        input: [0, 1, 2],
      });
      expect(result).toBe(0);
    });

    it("should handle arrays with null as first element", () => {
      const result = $arrayFirst()({
        input: [null, "a", "b"],
      });
      expect(result).toBeNull();
    });

    it("should handle arrays with undefined as first element", () => {
      const result = $arrayFirst()({
        input: [undefined, "a", "b"],
      });
      expect(result).toBeUndefined();
    });
  });

  describe("empty array handling", () => {
    it("should return undefined for empty array without fallback", () => {
      const result = $arrayFirst()({
        input: [],
      });
      expect(result).toBeUndefined();
    });

    it("should return fallback for empty array", () => {
      const result = $arrayFirst()({
        input: [],
        fallback: null,
      });
      expect(result).toBeNull();
    });

    it("should return fallback value for empty array", () => {
      const result = $arrayFirst()({
        input: [],
        fallback: "default",
      });
      expect(result).toBe("default");
    });

    it("should return fallback object for empty array", () => {
      const result = $arrayFirst()({
        input: [],
        fallback: { default: true },
      });
      expect(result).toEqual({ default: true });
    });
  });

  describe("fallback support", () => {
    it("should use fallback when input is not an array", () => {
      const result = $arrayFirst()({
        input: "not an array" as any,
        fallback: "fallback value",
      });
      expect(result).toBe("fallback value");
    });

    it("should use fallback when input is null", () => {
      const result = $arrayFirst()({
        input: null as any,
        fallback: 42,
      });
      expect(result).toBe(42);
    });

    it("should use fallback when input is undefined", () => {
      const result = $arrayFirst()({
        input: undefined as any,
        fallback: [],
      });
      expect(result).toEqual([]);
    });

    it("should use fallback when input is a number", () => {
      const result = $arrayFirst()({
        input: 123 as any,
        fallback: null,
      });
      expect(result).toBeNull();
    });

    it("should allow falsy fallback values", () => {
      const result = $arrayFirst()({
        input: [] as any,
        fallback: 0,
      });
      expect(result).toBe(0);
    });
  });

  describe("input validation", () => {
    it("should throw error when input is not an array and no fallback", () => {
      expect(() => {
        $arrayFirst()({
          input: "not an array" as any,
        });
      }).toThrow(ArrayOperatorInputError);
    });

    it("should throw error when input is a number and no fallback", () => {
      expect(() => {
        $arrayFirst()({
          input: 123 as any,
        });
      }).toThrow(ArrayOperatorInputError);
    });

    it("should throw error when input is an object and no fallback", () => {
      expect(() => {
        $arrayFirst()({
          input: { a: 1 } as any,
        });
      }).toThrow(ArrayOperatorInputError);
    });

    it("should throw error when params is malformed", () => {
      expect(() => {
        $arrayFirst()(null as any);
      }).toThrow(); // More accurate: throws MissingOperatorParameterError
    });

    it("should use fallback when params has no input but has fallback", () => {
      const result = $arrayFirst()({
        fallback: "default",
      } as any);
      expect(result).toBe("default");
    });
  });
});
