import { $sqrt } from "@operators/sqrt.operator";

describe("$sqrt operator", () => {
  const payload = { context: { fallbackValue: 0 } };

  describe("basic functionality", () => {
    it("should calculate square root of positive number", () => {
      const result = $sqrt(payload)({ value: 16 });
      expect(result).toBe(4);
    });

    it("should handle square root of 0", () => {
      const result = $sqrt(payload)({ value: 0 });
      expect(result).toBe(0);
    });

    it("should handle square root of 1", () => {
      const result = $sqrt(payload)({ value: 1 });
      expect(result).toBe(1);
    });

    it("should handle square root of decimal", () => {
      const result = $sqrt(payload)({ value: 2.25 });
      expect(result).toBe(1.5);
    });

    it("should handle large numbers", () => {
      const result = $sqrt(payload)({ value: 10000 });
      expect(result).toBe(100);
    });
  });

  describe("error handling", () => {
    it("should throw error for negative number without fallback", () => {
      expect(() => $sqrt(payload)({ value: -1 })).toThrow(
        "$sqrt cannot calculate square root of negative number",
      );
    });

    it("should use fallback for negative number", () => {
      const result = $sqrt(payload)({ value: -1, fallback: 0 });
      expect(result).toBe(0);
    });

    it("should throw error for non-numeric value without fallback", () => {
      expect(() => $sqrt(payload)({ value: "16" as any })).toThrow(
        "$sqrt requires a numeric value",
      );
    });

    it("should use fallback for non-numeric value", () => {
      const result = $sqrt(payload)({ value: "16" as any, fallback: -1 });
      expect(result).toBe(-1);
    });

    it("should resolve fallback from payload path", () => {
      const result = $sqrt(payload)({
        value: -1,
        fallback: "$fallbackValue",
      });
      expect(result).toBe(0);
    });

    it("should handle non-Error thrown values", () => {
      // Create an object that will cause a non-Error exception when accessed
      const problematicInput = {
        get value() {
          throw "string error"; // Throw a non-Error value
        },
        fallback: 99,
      };

      const result = $sqrt(payload)(problematicInput as any);
      expect(result).toBe(99);
    });
  });
});
