import { $multiply } from "@operators/math/multiply.operator";

describe("multiply operator", () => {
  it("should multiply two numbers", () => {
    expect($multiply()([2, 3])).toBe(6);
  });

  it("should multiply three numbers", () => {
    expect($multiply()([2, 3, 4])).toBe(24);
  });

  it("should multiply two negative numbers", () => {
    expect($multiply()([-2, -3])).toBe(6);
  });

  it("should multiply three negative numbers", () => {
    expect($multiply()([-2, -3, -4])).toBe(-24);
  });

  it("should handle already resolved values from nested expressions", () => {
    // These values would come already resolved from resolveArgs
    const result = $multiply()([5, 4]); // Simulating resolved { $add: [2, 3] } = 5
    expect(result).toBe(20);
  });

  it("should handle multiple already resolved values", () => {
    // These values would come already resolved from resolveArgs
    const result = $multiply()([2, 3, 2]); // Simulating resolved expressions
    expect(result).toBe(12);
  });

  it("should multiply with zero", () => {
    expect($multiply()([5, 0, 10])).toBe(0);
  });

  it("should multiply with one", () => {
    expect($multiply()([5, 1, 10])).toBe(50);
  });

  it("should handle decimal numbers", () => {
    expect($multiply()([2.5, 4])).toBe(10);
    expect($multiply()([0.1, 10])).toBe(1);
  });
});
