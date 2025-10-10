import { $ifNull } from "@operators/if-null.operator";

describe("ifNull operator", () => {
  it("should return the first value if it is not null", () => {
    // Values are already resolved by resolveArgs
    expect($ifNull()([3, 5])).toBe(3); // Simulating resolved { $floor: 3.9 } = 3
  });

  it("should return the first value if it is not null or undefined", () => {
    // Values are already resolved by resolveArgs
    expect($ifNull()([3, 1])).toBe(3); // Simulating resolved "$a.b.c" = 3
  });

  it("should return the second value if the first value is null", () => {
    // Values are already resolved by resolveArgs
    expect($ifNull()([null, 1])).toBe(1); // Simulating resolved "$a.b.c" = null
  });

  it("should return the second value if the first value is undefined", () => {
    // Values are already resolved by resolveArgs
    expect($ifNull()([undefined, 1])).toBe(1);
  });

  it("should handle falsy values that are not null/undefined", () => {
    expect($ifNull()([0, 1])).toBe(0); // 0 is falsy but not null/undefined
    expect($ifNull()(["", 1])).toBe(""); // Empty string is falsy but not null/undefined
    expect($ifNull()([false, 1])).toBe(false); // false is falsy but not null/undefined
  });
});
