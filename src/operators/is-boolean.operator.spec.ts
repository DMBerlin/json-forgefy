import { $isBoolean } from "./is-boolean.operator";

describe("$isBoolean operator", () => {
  describe("booleans", () => {
    it("should return true for boolean true", () => {
      const result = $isBoolean()(true);
      expect(result).toBe(true);
    });

    it("should return true for boolean false", () => {
      const result = $isBoolean()(false);
      expect(result).toBe(true);
    });

    it("should return true for Boolean(true)", () => {
      const result = $isBoolean()(Boolean(true));
      expect(result).toBe(true);
    });

    it("should return true for Boolean(false)", () => {
      const result = $isBoolean()(Boolean(false));
      expect(result).toBe(true);
    });

    it("should return true for !!value (double negation)", () => {
      const result = $isBoolean()(!!1);
      expect(result).toBe(true);
    });
  });

  describe("non-booleans", () => {
    it("should return false for string 'true'", () => {
      const result = $isBoolean()("true");
      expect(result).toBe(false);
    });

    it("should return false for string 'false'", () => {
      const result = $isBoolean()("false");
      expect(result).toBe(false);
    });

    it("should return false for number 1", () => {
      const result = $isBoolean()(1);
      expect(result).toBe(false);
    });

    it("should return false for number 0", () => {
      const result = $isBoolean()(0);
      expect(result).toBe(false);
    });

    it("should return false for empty string", () => {
      const result = $isBoolean()("");
      expect(result).toBe(false);
    });

    it("should return false for non-empty string", () => {
      const result = $isBoolean()("hello");
      expect(result).toBe(false);
    });

    it("should return false for null", () => {
      const result = $isBoolean()(null);
      expect(result).toBe(false);
    });

    it("should return false for undefined", () => {
      const result = $isBoolean()(undefined);
      expect(result).toBe(false);
    });

    it("should return false for array", () => {
      const result = $isBoolean()([]);
      expect(result).toBe(false);
    });

    it("should return false for array with boolean", () => {
      const result = $isBoolean()([true]);
      expect(result).toBe(false);
    });

    it("should return false for object", () => {
      const result = $isBoolean()({});
      expect(result).toBe(false);
    });

    it("should return false for object with boolean property", () => {
      const result = $isBoolean()({ value: true });
      expect(result).toBe(false);
    });

    it("should return false for Date object", () => {
      const result = $isBoolean()(new Date());
      expect(result).toBe(false);
    });

    it("should return false for function", () => {
      const result = $isBoolean()(() => true);
      expect(result).toBe(false);
    });

    it("should return false for RegExp", () => {
      const result = $isBoolean()(/test/);
      expect(result).toBe(false);
    });
  });

  describe("boolean-like objects", () => {
    it("should return false for Boolean object", () => {
      const result = $isBoolean()(new Boolean(true));
      expect(result).toBe(false);
    });

    it("should return false for Boolean object with false", () => {
      const result = $isBoolean()(new Boolean(false));
      expect(result).toBe(false);
    });
  });

  describe("truthy and falsy values", () => {
    it("should return false for truthy string", () => {
      const result = $isBoolean()("truthy");
      expect(result).toBe(false);
    });

    it("should return false for truthy number", () => {
      const result = $isBoolean()(42);
      expect(result).toBe(false);
    });

    it("should return false for truthy array", () => {
      const result = $isBoolean()([1, 2, 3]);
      expect(result).toBe(false);
    });

    it("should return false for truthy object", () => {
      const result = $isBoolean()({ key: "value" });
      expect(result).toBe(false);
    });

    it("should return false for falsy empty string", () => {
      const result = $isBoolean()("");
      expect(result).toBe(false);
    });

    it("should return false for falsy zero", () => {
      const result = $isBoolean()(0);
      expect(result).toBe(false);
    });

    it("should return false for falsy null", () => {
      const result = $isBoolean()(null);
      expect(result).toBe(false);
    });

    it("should return false for falsy undefined", () => {
      const result = $isBoolean()(undefined);
      expect(result).toBe(false);
    });

    it("should return false for falsy NaN", () => {
      const result = $isBoolean()(NaN);
      expect(result).toBe(false);
    });
  });

  describe("edge cases", () => {
    it("should return false for Infinity", () => {
      const result = $isBoolean()(Infinity);
      expect(result).toBe(false);
    });

    it("should return false for -Infinity", () => {
      const result = $isBoolean()(-Infinity);
      expect(result).toBe(false);
    });

    it("should return false for Symbol", () => {
      const result = $isBoolean()(Symbol("test"));
      expect(result).toBe(false);
    });

    it("should return false for BigInt", () => {
      const result = $isBoolean()(BigInt(1));
      expect(result).toBe(false);
    });

    it("should return true for result of comparison", () => {
      const result = $isBoolean()(5 > 3);
      expect(result).toBe(true);
    });

    it("should return true for result of equality check", () => {
      const result = $isBoolean()(5 === 5);
      expect(result).toBe(true);
    });

    it("should return true for result of logical AND", () => {
      const result = $isBoolean()(true && false);
      expect(result).toBe(true);
    });

    it("should return true for result of logical OR", () => {
      const result = $isBoolean()(true || false);
      expect(result).toBe(true);
    });

    it("should return true for result of NOT operator", () => {
      const result = $isBoolean()(!true);
      expect(result).toBe(true);
    });
  });
});
