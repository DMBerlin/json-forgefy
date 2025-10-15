import { $eq } from "@operators/comparison/eq.operator";

describe("eq operator", () => {
  it("should return true if two values are equal", () => {
    expect($eq()([1, 1])).toBe(true);
  });

  it("should return false if two values are not equal", () => {
    expect($eq()([1, 2])).toBe(false);
  });

  it("should return true if two already resolved values are equal", () => {
    // These values would come already resolved from resolveArgs
    expect($eq()([1, 1])).toBe(true); // Simulating resolved path "$a.b.c" = 1
  });

  it("should return false if two already resolved values are not equal", () => {
    // These values would come already resolved from resolveArgs
    expect($eq()([1, 2])).toBe(false); // Simulating resolved path "$a.b.c" = 2
  });

  it("should handle already resolved expression values", () => {
    // These values would come already resolved from resolveArgs
    expect($eq()([1, 1])).toBe(true); // Simulating resolved { $toNumber: "1" } = 1 and "$a.b.c" = 1
  });
});
