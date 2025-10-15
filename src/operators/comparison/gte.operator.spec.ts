import { $gte } from "./gte.operator";

describe("GteOperator", () => {
  describe("asserting with resolved values", () => {
    it("should return true when first value is greater than second", () => {
      expect($gte()([5, 4])).toBe(true);
      expect($gte()([10, 1])).toBe(true);
    });

    it("should return true when first value equals second", () => {
      expect($gte()([4, 4])).toBe(true);
      expect($gte()([10, 10])).toBe(true);
      expect($gte()([0, 0])).toBe(true);
    });

    it("should return false when first value is less than second", () => {
      expect($gte()([3, 4])).toBe(false);
      expect($gte()([1, 10])).toBe(false);
    });

    it("should work with negative numbers", () => {
      expect($gte()([-1, -2])).toBe(true);
      expect($gte()([-2, -1])).toBe(false);
      expect($gte()([-1, -1])).toBe(true);
    });

    it("should work with decimal numbers", () => {
      expect($gte()([5.5, 5.4])).toBe(true);
      expect($gte()([5.5, 5.5])).toBe(true);
      expect($gte()([5.4, 5.5])).toBe(false);
    });
  });

  describe("asserting with already resolved path values", () => {
    it("should compare resolved values correctly", () => {
      // These values would come already resolved from resolveArgs
      expect($gte()([10, 1])).toBe(true); // Simulating resolved "$value" = 10
      expect($gte()([10, 10])).toBe(true);
      expect($gte()([10, 11])).toBe(false);
      expect($gte()([1, 10])).toBe(false);
      expect($gte()([11, 10])).toBe(true);
    });
  });

  describe("asserting with already resolved expression values", () => {
    it("should compare resolved expression results correctly", () => {
      // These values would come already resolved from resolveArgs
      expect($gte()([11, 10])).toBe(true); // Simulating resolved { $add: [5, 6] } = 11
      expect($gte()([10, 10])).toBe(true); // Simulating resolved { $add: [5, 5] } = 10
      expect($gte()([9, 10])).toBe(false); // Simulating resolved { $add: [5, 4] } = 9
      expect($gte()([10, 11])).toBe(false);
      expect($gte()([10, 9])).toBe(true);
    });
  });
});
