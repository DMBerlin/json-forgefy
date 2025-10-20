import { $arrayAt } from "./array-at.operator";
import {
  ArrayOperatorInputError,
  MissingOperatorParameterError,
} from "@lib-types/error.types";

describe("$arrayAt operator", () => {
  describe("basic functionality", () => {
    it("should return element at index 0", () => {
      const result = $arrayAt()({
        input: [10, 20, 30],
        index: 0,
      });
      expect(result).toBe(10);
    });

    it("should return element at index 1", () => {
      const result = $arrayAt()({
        input: [10, 20, 30],
        index: 1,
      });
      expect(result).toBe(20);
    });

    it("should return element at index 2", () => {
      const result = $arrayAt()({
        input: [10, 20, 30],
        index: 2,
      });
      expect(result).toBe(30);
    });

    it("should return element from string array", () => {
      const result = $arrayAt()({
        input: ["apple", "banana", "cherry"],
        index: 1,
      });
      expect(result).toBe("banana");
    });

    it("should return element from object array", () => {
      const result = $arrayAt()({
        input: [{ id: 1 }, { id: 2 }, { id: 3 }],
        index: 2,
      });
      expect(result).toEqual({ id: 3 });
    });

    it("should handle arrays with falsy elements", () => {
      const result = $arrayAt()({
        input: [0, false, "", null],
        index: 1,
      });
      expect(result).toBe(false);
    });
  });

  describe("negative indices", () => {
    it("should return last element with index -1", () => {
      const result = $arrayAt()({
        input: [10, 20, 30],
        index: -1,
      });
      expect(result).toBe(30);
    });

    it("should return second-to-last element with index -2", () => {
      const result = $arrayAt()({
        input: [10, 20, 30, 40],
        index: -2,
      });
      expect(result).toBe(30);
    });

    it("should return first element with index -length", () => {
      const result = $arrayAt()({
        input: [10, 20, 30],
        index: -3,
      });
      expect(result).toBe(10);
    });

    it("should handle negative index on single-element array", () => {
      const result = $arrayAt()({
        input: [42],
        index: -1,
      });
      expect(result).toBe(42);
    });
  });

  describe("out of bounds handling", () => {
    it("should return undefined for index beyond array length", () => {
      const result = $arrayAt()({
        input: [10, 20, 30],
        index: 5,
      });
      expect(result).toBeUndefined();
    });

    it("should return undefined for negative index beyond array start", () => {
      const result = $arrayAt()({
        input: [10, 20, 30],
        index: -5,
      });
      expect(result).toBeUndefined();
    });

    it("should use fallback for index beyond array length", () => {
      const result = $arrayAt()({
        input: [10, 20, 30],
        index: 10,
        fallback: null,
      });
      expect(result).toBeNull();
    });

    it("should use fallback for negative index out of bounds", () => {
      const result = $arrayAt()({
        input: [10, 20],
        index: -5,
        fallback: "default",
      });
      expect(result).toBe("default");
    });
  });

  describe("fallback support", () => {
    it("should use fallback when input is not an array", () => {
      const result = $arrayAt()({
        input: "not an array" as any,
        index: 0,
        fallback: "fallback value",
      });
      expect(result).toBe("fallback value");
    });

    it("should use fallback when input is null", () => {
      const result = $arrayAt()({
        input: null as any,
        index: 0,
        fallback: 42,
      });
      expect(result).toBe(42);
    });

    it("should use fallback when input is undefined", () => {
      const result = $arrayAt()({
        input: undefined as any,
        index: 0,
        fallback: [],
      });
      expect(result).toEqual([]);
    });

    it("should use fallback for empty array", () => {
      const result = $arrayAt()({
        input: [],
        index: 0,
        fallback: "no elements",
      });
      expect(result).toBe("no elements");
    });

    it("should allow falsy fallback values", () => {
      const result = $arrayAt()({
        input: "not array" as any,
        index: 0,
        fallback: 0,
      });
      expect(result).toBe(0);
    });

    it("should allow null as fallback", () => {
      const result = $arrayAt()({
        input: [],
        index: 0,
        fallback: null,
      });
      expect(result).toBeNull();
    });

    it("should allow false as fallback", () => {
      const result = $arrayAt()({
        input: [],
        index: 0,
        fallback: false,
      });
      expect(result).toBe(false);
    });
  });

  describe("input validation", () => {
    it("should throw error when input is not an array and no fallback", () => {
      expect(() => {
        $arrayAt()({
          input: "not an array" as any,
          index: 0,
        });
      }).toThrow(ArrayOperatorInputError);
    });

    it("should throw error when index is missing and no fallback", () => {
      expect(() => {
        $arrayAt()({
          input: [1, 2, 3],
        } as any);
      }).toThrow(MissingOperatorParameterError);
    });

    it("should throw error when index is not a number and no fallback", () => {
      expect(() => {
        $arrayAt()({
          input: [1, 2, 3],
          index: "0" as any,
        });
      }).toThrow(Error);
    });

    it("should throw error when index is NaN and no fallback", () => {
      expect(() => {
        $arrayAt()({
          input: [1, 2, 3],
          index: NaN,
        });
      }).toThrow(Error);
    });

    it("should throw error when index is Infinity and no fallback", () => {
      expect(() => {
        $arrayAt()({
          input: [1, 2, 3],
          index: Infinity,
        });
      }).toThrow(Error);
    });

    it("should use fallback when index is invalid", () => {
      const result = $arrayAt()({
        input: [1, 2, 3],
        index: NaN,
        fallback: null,
      });
      expect(result).toBeNull();
    });

    it("should throw error when params is malformed", () => {
      expect(() => {
        $arrayAt()(null as any);
      }).toThrow(); // More accurate: throws MissingOperatorParameterError
    });

    it("should use fallback when params has no input but has fallback", () => {
      const result = $arrayAt()({
        fallback: "default",
      } as any);
      expect(result).toBe("default");
    });

    it("should use fallback when index is missing but fallback provided", () => {
      const result = $arrayAt()({
        input: [1, 2, 3],
        fallback: null,
      } as any);
      expect(result).toBeNull();
    });
  });
});
