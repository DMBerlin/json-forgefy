import { $lte } from "./lte.operator";

describe("LteOperator", () => {
  it("should return false when first value is greater than second", () => {
    expect($lte()([5, 4])).toBe(false);
    expect($lte()([10, 1])).toBe(false);
  });

  it("should return true when values are equal", () => {
    expect($lte()([4, 4])).toBe(true);
    expect($lte()([10, 10])).toBe(true);
  });

  it("should return true when first value is less than second", () => {
    expect($lte()([3, 4])).toBe(true);
    expect($lte()([1, 10])).toBe(true);
  });

  it("should work with negative numbers", () => {
    expect($lte()([-2, -1])).toBe(true);
    expect($lte()([-1, -1])).toBe(true);
    expect($lte()([-1, -2])).toBe(false);
  });

  it("should work with decimal numbers", () => {
    expect($lte()([5.4, 5.5])).toBe(true);
    expect($lte()([5.5, 5.5])).toBe(true);
    expect($lte()([5.5, 5.4])).toBe(false);
  });

  it("should work with string comparison", () => {
    expect($lte()(["a", "b"])).toBe(true);
    expect($lte()(["a", "a"])).toBe(true);
    expect($lte()(["b", "a"])).toBe(false);
  });
});
