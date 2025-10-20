import { $isArray } from "./is-array.operator";

describe("$isArray operator", () => {
  describe("arrays", () => {
    it("should return true for array with elements", () => {
      const result = $isArray()([1, 2, 3]);
      expect(result).toBe(true);
    });

    it("should return true for empty array", () => {
      const result = $isArray()([]);
      expect(result).toBe(true);
    });

    it("should return true for array with mixed types", () => {
      const result = $isArray()([1, "hello", true, null, undefined]);
      expect(result).toBe(true);
    });

    it("should return true for nested arrays", () => {
      const result = $isArray()([
        [1, 2],
        [3, 4],
      ]);
      expect(result).toBe(true);
    });

    it("should return true for array with objects", () => {
      const result = $isArray()([{ id: 1 }, { id: 2 }]);
      expect(result).toBe(true);
    });

    it("should return true for sparse array", () => {
      const sparseArray = new Array(5);
      sparseArray[2] = "value";
      const result = $isArray()(sparseArray);
      expect(result).toBe(true);
    });
  });

  describe("non-arrays", () => {
    it("should return false for string", () => {
      const result = $isArray()("hello");
      expect(result).toBe(false);
    });

    it("should return false for number", () => {
      const result = $isArray()(42);
      expect(result).toBe(false);
    });

    it("should return false for boolean true", () => {
      const result = $isArray()(true);
      expect(result).toBe(false);
    });

    it("should return false for boolean false", () => {
      const result = $isArray()(false);
      expect(result).toBe(false);
    });

    it("should return false for object", () => {
      const result = $isArray()({ key: "value" });
      expect(result).toBe(false);
    });

    it("should return false for empty object", () => {
      const result = $isArray()({});
      expect(result).toBe(false);
    });

    it("should return false for null", () => {
      const result = $isArray()(null);
      expect(result).toBe(false);
    });

    it("should return false for undefined", () => {
      const result = $isArray()(undefined);
      expect(result).toBe(false);
    });

    it("should return false for Date object", () => {
      const result = $isArray()(new Date());
      expect(result).toBe(false);
    });

    it("should return false for function", () => {
      const result = $isArray()(() => {});
      expect(result).toBe(false);
    });

    it("should return false for RegExp", () => {
      const result = $isArray()(/test/);
      expect(result).toBe(false);
    });
  });

  describe("array-like objects", () => {
    it("should return false for array-like object with length property", () => {
      const arrayLike = { 0: "a", 1: "b", length: 2 };
      const result = $isArray()(arrayLike);
      expect(result).toBe(false);
    });

    it("should return false for arguments object", () => {
      // Using rest params to satisfy TypeScript but testing arguments object
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-rest-params
      function testFunc(..._args: any[]) {
        // eslint-disable-next-line prefer-rest-params
        return $isArray()(arguments);
      }
      const result = testFunc(1, 2, 3);
      expect(result).toBe(false);
    });

    it("should return false for NodeList-like object", () => {
      const nodeLike = { 0: "node1", 1: "node2", length: 2 };
      const result = $isArray()(nodeLike);
      expect(result).toBe(false);
    });
  });

  describe("edge cases", () => {
    it("should return true for Array.from result", () => {
      const result = $isArray()(Array.from("hello"));
      expect(result).toBe(true);
    });

    it("should return true for spread array", () => {
      const result = $isArray()([...["a", "b", "c"]]);
      expect(result).toBe(true);
    });

    it("should return true for Array.of result", () => {
      const result = $isArray()(Array.of(1, 2, 3));
      expect(result).toBe(true);
    });

    it("should return false for Set", () => {
      const result = $isArray()(new Set([1, 2, 3]));
      expect(result).toBe(false);
    });

    it("should return false for Map", () => {
      const result = $isArray()(new Map([["key", "value"]]));
      expect(result).toBe(false);
    });
  });
});
