import { $trunc } from "@operators/trunc.operator";

describe("$trunc operator", () => {
  const payload = { fallbackValue: 0 };

  describe("basic functionality", () => {
    it("should truncate positive decimal to integer", () => {
      const result = $trunc(payload)({ value: 4.9 });
      expect(result).toBe(4);
    });

    it("should truncate negative decimal to integer", () => {
      const result = $trunc(payload)({ value: -4.9 });
      expect(result).toBe(-4);
    });

    it("should handle integer input", () => {
      const result = $trunc(payload)({ value: 5 });
      expect(result).toBe(5);
    });

    it("should handle zero", () => {
      const result = $trunc(payload)({ value: 0 });
      expect(result).toBe(0);
    });

    it("should handle small decimals", () => {
      const result = $trunc(payload)({ value: 0.9 });
      expect(result).toBe(0);
    });

    it("should handle negative small decimals", () => {
      const result = $trunc(payload)({ value: -0.9 });
      expect(result).toBe(-0);
    });

    it("should differ from floor for negative numbers", () => {
      const truncResult = $trunc(payload)({ value: -4.9 });
      const floorResult = Math.floor(-4.9);
      expect(truncResult).toBe(-4);
      expect(floorResult).toBe(-5);
      expect(truncResult).not.toBe(floorResult);
    });
  });

  describe("error handling", () => {
    it("should throw error for non-numeric value without fallback", () => {
      expect(() => $trunc(payload)({ value: "4.9" as any })).toThrow(
        "$trunc requires a numeric value",
      );
    });

    it("should use fallback for non-numeric value", () => {
      const result = $trunc(payload)({ value: "4.9" as any, fallback: -1 });
      expect(result).toBe(-1);
    });

    it("should resolve fallback from payload path", () => {
      const result = $trunc(payload)({
        value: "invalid" as any,
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

      const result = $trunc(payload)(problematicInput as any);
      expect(result).toBe(99);
    });
  });
});
