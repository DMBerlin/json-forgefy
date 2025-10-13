import { $isString } from "./is-string.operator";

describe("$isString operator", () => {
  describe("strings", () => {
    it("should return true for non-empty string", () => {
      const result = $isString()("hello");
      expect(result).toBe(true);
    });

    it("should return true for empty string", () => {
      const result = $isString()("");
      expect(result).toBe(true);
    });

    it("should return true for string with spaces", () => {
      const result = $isString()("   ");
      expect(result).toBe(true);
    });

    it("should return true for string with special characters", () => {
      const result = $isString()("hello\nworld\t!");
      expect(result).toBe(true);
    });

    it("should return true for string with numbers", () => {
      const result = $isString()("12345");
      expect(result).toBe(true);
    });

    it("should return true for string with unicode characters", () => {
      const result = $isString()("Hello 世界 🌍");
      expect(result).toBe(true);
    });

    it("should return true for multiline string", () => {
      const result = $isString()(`line1
line2
line3`);
      expect(result).toBe(true);
    });

    it("should return true for template literal", () => {
      const name = "World";
      const result = $isString()(`Hello ${name}`);
      expect(result).toBe(true);
    });
  });

  describe("non-strings", () => {
    it("should return false for number", () => {
      const result = $isString()(42);
      expect(result).toBe(false);
    });

    it("should return false for zero", () => {
      const result = $isString()(0);
      expect(result).toBe(false);
    });

    it("should return false for negative number", () => {
      const result = $isString()(-42);
      expect(result).toBe(false);
    });

    it("should return false for decimal number", () => {
      const result = $isString()(3.14);
      expect(result).toBe(false);
    });

    it("should return false for boolean true", () => {
      const result = $isString()(true);
      expect(result).toBe(false);
    });

    it("should return false for boolean false", () => {
      const result = $isString()(false);
      expect(result).toBe(false);
    });

    it("should return false for array", () => {
      const result = $isString()([1, 2, 3]);
      expect(result).toBe(false);
    });

    it("should return false for empty array", () => {
      const result = $isString()([]);
      expect(result).toBe(false);
    });

    it("should return false for object", () => {
      const result = $isString()({ key: "value" });
      expect(result).toBe(false);
    });

    it("should return false for empty object", () => {
      const result = $isString()({});
      expect(result).toBe(false);
    });

    it("should return false for null", () => {
      const result = $isString()(null);
      expect(result).toBe(false);
    });

    it("should return false for undefined", () => {
      const result = $isString()(undefined);
      expect(result).toBe(false);
    });

    it("should return false for Date object", () => {
      const result = $isString()(new Date());
      expect(result).toBe(false);
    });

    it("should return false for function", () => {
      const result = $isString()(() => {});
      expect(result).toBe(false);
    });

    it("should return false for RegExp", () => {
      const result = $isString()(/test/);
      expect(result).toBe(false);
    });
  });

  describe("string-like objects", () => {
    it("should return false for String object", () => {
      const result = $isString()(new String("hello"));
      expect(result).toBe(false);
    });

    it("should return false for object with toString method", () => {
      const obj = {
        toString() {
          return "hello";
        },
      };
      const result = $isString()(obj);
      expect(result).toBe(false);
    });
  });

  describe("edge cases", () => {
    it("should return false for NaN", () => {
      const result = $isString()(NaN);
      expect(result).toBe(false);
    });

    it("should return false for Infinity", () => {
      const result = $isString()(Infinity);
      expect(result).toBe(false);
    });

    it("should return false for -Infinity", () => {
      const result = $isString()(-Infinity);
      expect(result).toBe(false);
    });

    it("should return false for Symbol", () => {
      const result = $isString()(Symbol("test"));
      expect(result).toBe(false);
    });

    it("should return false for BigInt", () => {
      const result = $isString()(BigInt(123));
      expect(result).toBe(false);
    });

    it("should return true for string '0'", () => {
      const result = $isString()("0");
      expect(result).toBe(true);
    });

    it("should return true for string 'false'", () => {
      const result = $isString()("false");
      expect(result).toBe(true);
    });

    it("should return true for string 'null'", () => {
      const result = $isString()("null");
      expect(result).toBe(true);
    });

    it("should return true for string 'undefined'", () => {
      const result = $isString()("undefined");
      expect(result).toBe(true);
    });
  });
});
