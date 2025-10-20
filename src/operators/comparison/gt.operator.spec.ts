import { $gt } from "./gt.operator";

describe("GtOperator", () => {
  describe("asserting with resolved values", () => {
    it("should return true when first value is greater than second", () => {
      expect($gt()([5, 4])).toBe(true);
      expect($gt()([10, 1])).toBe(true);
      expect($gt()([100, 99])).toBe(true);
    });

    it("should return false when first value equals second", () => {
      expect($gt()([4, 4])).toBe(false);
      expect($gt()([10, 10])).toBe(false);
      expect($gt()([0, 0])).toBe(false);
    });

    it("should return false when first value is less than second", () => {
      expect($gt()([3, 4])).toBe(false);
      expect($gt()([1, 10])).toBe(false);
      expect($gt()([99, 100])).toBe(false);
    });

    it("should work with negative numbers", () => {
      expect($gt()([-1, -2])).toBe(true);
      expect($gt()([-2, -1])).toBe(false);
      expect($gt()([0, -1])).toBe(true);
      expect($gt()([-1, 0])).toBe(false);
    });

    it("should work with decimal numbers", () => {
      expect($gt()([5.5, 5.4])).toBe(true);
      expect($gt()([5.4, 5.5])).toBe(false);
      expect($gt()([5.5, 5.5])).toBe(false);
    });

    it("should work with string comparison", () => {
      expect($gt()(["b", "a"])).toBe(true);
      expect($gt()(["a", "b"])).toBe(false);
      expect($gt()(["a", "a"])).toBe(false);
    });
  });

  describe("asserting with already resolved path values", () => {
    it("should compare resolved values correctly", () => {
      // These values would come already resolved from resolveArgs
      expect($gt()([10, 1])).toBe(true); // Simulating resolved "$value" = 10
      expect($gt()([10, 10])).toBe(false);
      expect($gt()([10, 11])).toBe(false);
      expect($gt()([1, 10])).toBe(false);
      expect($gt()([11, 10])).toBe(true);
    });
  });

  describe("asserting with already resolved expression values", () => {
    it("should compare resolved expression results correctly", () => {
      // These values would come already resolved from resolveArgs
      expect($gt()([11, 10])).toBe(true); // Simulating resolved { $add: [5, 6] } = 11
      expect($gt()([10, 10])).toBe(false); // Simulating resolved { $add: [5, 5] } = 10
      expect($gt()([9, 10])).toBe(false); // Simulating resolved { $add: [5, 4] } = 9
      expect($gt()([10, 11])).toBe(false);
      expect($gt()([10, 10])).toBe(false);
      expect($gt()([10, 9])).toBe(true); // Simulating resolved "$value" = 10, { $add: [4, 5] } = 9
    });
  });
});
