import { $mod } from "@operators/mod.operator";

describe("$mod operator", () => {
  const payload = { fallbackValue: 5 };

  describe("basic functionality", () => {
    it("should return the remainder of division", () => {
      const result = $mod(payload)({ dividend: 10, divisor: 3 });
      expect(result).toBe(1);
    });

    it("should handle zero remainder", () => {
      const result = $mod(payload)({ dividend: 10, divisor: 5 });
      expect(result).toBe(0);
    });

    it("should handle negative dividend", () => {
      const result = $mod(payload)({ dividend: -10, divisor: 3 });
      expect(result).toBe(-1);
    });

    it("should handle negative divisor", () => {
      const result = $mod(payload)({ dividend: 10, divisor: -3 });
      expect(result).toBe(1);
    });

    it("should handle both negative", () => {
      const result = $mod(payload)({ dividend: -10, divisor: -3 });
      expect(result).toBe(-1);
    });
  });

  describe("error handling", () => {
    it("should throw error for division by zero without fallback", () => {
      expect(() => $mod(payload)({ dividend: 10, divisor: 0 })).toThrow(
        "$mod: division by zero",
      );
    });

    it("should use fallback for division by zero", () => {
      const result = $mod(payload)({
        dividend: 10,
        divisor: 0,
        fallback: 0,
      });
      expect(result).toBe(0);
    });

    it("should throw error for non-numeric dividend without fallback", () => {
      expect(() =>
        $mod(payload)({ dividend: "10" as any, divisor: 3 }),
      ).toThrow("$mod requires numeric dividend and divisor");
    });

    it("should use fallback for non-numeric inputs", () => {
      const result = $mod(payload)({
        dividend: "10" as any,
        divisor: 3,
        fallback: -1,
      });
      expect(result).toBe(-1);
    });

    it("should resolve fallback from payload path", () => {
      const result = $mod(payload)({
        dividend: 10,
        divisor: 0,
        fallback: "$fallbackValue",
      });
      expect(result).toBe(5);
    });

    it("should handle non-Error thrown values", () => {
      // Create an object that will cause a non-Error exception when accessed
      const problematicInput = {
        get dividend() {
          throw "string error"; // Throw a non-Error value
        },
        divisor: 3,
        fallback: 99,
      };

      const result = $mod(payload)(problematicInput as any);
      expect(result).toBe(99);
    });
  });
});
