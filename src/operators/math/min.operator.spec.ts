import { $min } from "@operators/math/min.operator";

describe("min operator", () => {
  it("should return the minimum value from the input array", () => {
    const input = [1, 2, 3, 4, 5];
    const result = $min()(input);
    expect(result).toEqual(1);
  });

  it("should handle negative numbers", () => {
    expect($min()([-5, -2, -10, -1])).toBe(-10);
  });

  it("should handle mixed positive and negative numbers", () => {
    expect($min()([-5, 10, -2, 3])).toBe(-5);
  });

  it("should handle single value", () => {
    expect($min()([42])).toBe(42);
  });

  it("should handle decimal numbers", () => {
    expect($min()([1.5, 2.7, 1.9])).toBe(1.5);
  });

  it("should handle zero", () => {
    expect($min()([0, 1, 5])).toBe(0);
  });
});
