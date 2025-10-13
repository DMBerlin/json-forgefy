import { $type } from "./type.operator";

describe("$type operator", () => {
  describe("string type", () => {
    it("should return 'string' for string value", () => {
      const result = $type()("hello");
      expect(result).toBe("string");
    });

    it("should return 'string' for empty string", () => {
      const result = $type()("");
      expect(result).toBe("string");
    });

    it("should return 'string' for string with special characters", () => {
      const result = $type()("hello\nworld\t!");
      expect(result).toBe("string");
    });
  });

  describe("number type", () => {
    it("should return 'number' for positive integer", () => {
      const result = $type()(42);
      expect(result).toBe("number");
    });

    it("should return 'number' for negative integer", () => {
      const result = $type()(-42);
      expect(result).toBe("number");
    });

    it("should return 'number' for zero", () => {
      const result = $type()(0);
      expect(result).toBe("number");
    });

    it("should return 'number' for decimal", () => {
      const result = $type()(3.14);
      expect(result).toBe("number");
    });

    it("should return 'number' for Infinity", () => {
      const result = $type()(Infinity);
      expect(result).toBe("number");
    });

    it("should return 'number' for -Infinity", () => {
      const result = $type()(-Infinity);
      expect(result).toBe("number");
    });

    it("should return 'number' for NaN", () => {
      const result = $type()(NaN);
      expect(result).toBe("number");
    });
  });

  describe("boolean type", () => {
    it("should return 'boolean' for true", () => {
      const result = $type()(true);
      expect(result).toBe("boolean");
    });

    it("should return 'boolean' for false", () => {
      const result = $type()(false);
      expect(result).toBe("boolean");
    });
  });

  describe("array type", () => {
    it("should return 'array' for array with elements", () => {
      const result = $type()([1, 2, 3]);
      expect(result).toBe("array");
    });

    it("should return 'array' for empty array", () => {
      const result = $type()([]);
      expect(result).toBe("array");
    });

    it("should return 'array' for array with mixed types", () => {
      const result = $type()([1, "hello", true, null]);
      expect(result).toBe("array");
    });

    it("should return 'array' for nested arrays", () => {
      const result = $type()([
        [1, 2],
        [3, 4],
      ]);
      expect(result).toBe("array");
    });
  });

  describe("object type", () => {
    it("should return 'object' for object with properties", () => {
      const result = $type()({ key: "value" });
      expect(result).toBe("object");
    });

    it("should return 'object' for empty object", () => {
      const result = $type()({});
      expect(result).toBe("object");
    });

    it("should return 'object' for nested objects", () => {
      const result = $type()({ user: { name: "John" } });
      expect(result).toBe("object");
    });
  });

  describe("null type", () => {
    it("should return 'null' for null value", () => {
      const result = $type()(null);
      expect(result).toBe("null");
    });
  });

  describe("undefined type", () => {
    it("should return 'undefined' for undefined value", () => {
      const result = $type()(undefined);
      expect(result).toBe("undefined");
    });
  });

  describe("date type", () => {
    it("should return 'date' for Date object", () => {
      const result = $type()(new Date());
      expect(result).toBe("date");
    });

    it("should return 'date' for Date with specific timestamp", () => {
      const result = $type()(new Date("2025-01-15T10:30:00Z"));
      expect(result).toBe("date");
    });

    it("should return 'date' for invalid Date object", () => {
      const result = $type()(new Date("invalid"));
      expect(result).toBe("date");
    });
  });

  describe("edge cases", () => {
    it("should distinguish between array and object", () => {
      expect($type()([])).toBe("array");
      expect($type()({})).toBe("object");
    });

    it("should distinguish between Date and object", () => {
      expect($type()(new Date())).toBe("date");
      expect($type()({})).toBe("object");
    });

    it("should distinguish between null and undefined", () => {
      expect($type()(null)).toBe("null");
      expect($type()(undefined)).toBe("undefined");
    });

    it("should handle function type", () => {
      const result = $type()(() => {});
      expect(result).toBe("function");
    });

    it("should handle symbol type", () => {
      const result = $type()(Symbol("test"));
      expect(result).toBe("symbol");
    });
  });
});
