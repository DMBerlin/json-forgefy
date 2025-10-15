import { $lt } from "./lt.operator";

describe("LtOperator", () => {
  it("should return false when first value is greater than second", () => {
    expect($lt()([5, 4])).toBe(false);
    expect($lt()([10, 1])).toBe(false);
  });

  it("should return false when values are equal", () => {
    expect($lt()([4, 4])).toBe(false);
    expect($lt()([10, 10])).toBe(false);
  });

  it("should return true when first value is less than second", () => {
    expect($lt()([3, 4])).toBe(true);
    expect($lt()([1, 10])).toBe(true);
  });

  it("should work with negative numbers", () => {
    expect($lt()([-2, -1])).toBe(true);
    expect($lt()([-1, -2])).toBe(false);
    expect($lt()([-1, 0])).toBe(true);
  });

  it("should work with decimal numbers", () => {
    expect($lt()([5.4, 5.5])).toBe(true);
    expect($lt()([5.5, 5.4])).toBe(false);
  });

  it("should work with string comparison", () => {
    expect($lt()(["a", "b"])).toBe(true);
    expect($lt()(["b", "a"])).toBe(false);
  });
});
