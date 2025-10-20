import { $max } from "@operators/math/max.operator";

describe("max operator", () => {
  it("should return the maximum value from the input array", () => {
    const input = [1, 2, 3, 4, 5];
    const result = $max()(input);
    expect(result).toEqual(5);
  });

  it("should handle negative numbers", () => {
    expect($max()([-5, -2, -10, -1])).toBe(-1);
  });

  it("should handle mixed positive and negative numbers", () => {
    expect($max()([-5, 10, -2, 3])).toBe(10);
  });

  it("should handle single value", () => {
    expect($max()([42])).toBe(42);
  });

  it("should handle decimal numbers", () => {
    expect($max()([1.5, 2.7, 1.9])).toBe(2.7);
  });

  it("should handle zero", () => {
    expect($max()([0, -1, -5])).toBe(0);
  });
});
