import { $pow } from "@operators/pow.operator";

describe("$pow operator", () => {
  const payload = { context: { fallbackValue: 1 } };

  describe("basic functionality", () => {
    it("should calculate power with positive exponent", () => {
      const result = $pow(payload)({ base: 2, exponent: 3 });
      expect(result).toBe(8);
    });

    it("should handle exponent of 0", () => {
      const result = $pow(payload)({ base: 5, exponent: 0 });
      expect(result).toBe(1);
    });

    it("should handle exponent of 1", () => {
      const result = $pow(payload)({ base: 7, exponent: 1 });
      expect(result).toBe(7);
    });

    it("should handle negative exponent", () => {
      const result = $pow(payload)({ base: 2, exponent: -1 });
      expect(result).toBe(0.5);
    });

    it("should handle fractional exponent (square root)", () => {
      const result = $pow(payload)({ base: 16, exponent: 0.5 });
      expect(result).toBe(4);
    });

    it("should handle base of 0", () => {
      const result = $pow(payload)({ base: 0, exponent: 5 });
      expect(result).toBe(0);
    });

    it("should handle negative base with integer exponent", () => {
      const result = $pow(payload)({ base: -2, exponent: 3 });
      expect(result).toBe(-8);
    });
  });

  describe("error handling", () => {
    it("should throw error for negative base with fractional exponent without fallback", () => {
      expect(() => $pow(payload)({ base: -1, exponent: 0.5 })).toThrow(
        "$pow resulted in NaN",
      );
    });

    it("should use fallback for NaN result", () => {
      const result = $pow(payload)({
        base: -1,
        exponent: 0.5,
        fallback: 0,
      });
      expect(result).toBe(0);
    });

    it("should throw error for non-numeric base without fallback", () => {
      expect(() => $pow(payload)({ base: "2" as any, exponent: 3 })).toThrow(
        "$pow requires numeric base and exponent",
      );
    });

    it("should use fallback for non-numeric inputs", () => {
      const result = $pow(payload)({
        base: 2,
        exponent: "3" as any,
        fallback: -1,
      });
      expect(result).toBe(-1);
    });

    it("should resolve fallback from payload path", () => {
      const result = $pow(payload)({
        base: -1,
        exponent: 0.5,
        fallback: "$fallbackValue",
      });
      expect(result).toBe(1);
    });

    it("should handle non-Error thrown values", () => {
      // Create an object that will cause a non-Error exception when accessed
      const problematicInput = {
        get base() {
          throw "string error"; // Throw a non-Error value
        },
        exponent: 2,
        fallback: 99,
      };

      const result = $pow(payload)(problematicInput as any);
      expect(result).toBe(99);
    });
  });
});
