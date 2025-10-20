import { $round } from "@operators/math/round.operator";

describe("Round operator", () => {
  it("should round to specified decimal places", () => {
    expect($round()({ value: 3.14159, precision: 2 })).toBe(3.14);
    expect($round()({ value: 3.14159, precision: 0 })).toBe(3);
    expect($round()({ value: 3.7, precision: 0 })).toBe(4);
  });

  it("should use default precision of 0", () => {
    expect($round()({ value: 3.7 })).toBe(4);
    expect($round()({ value: 3.2 })).toBe(3);
  });

  it("should handle negative precision", () => {
    expect($round()({ value: 12345, precision: -3 })).toBe(12000);
    expect($round()({ value: 12345, precision: -2 })).toBe(12300);
  });

  it("should handle zero precision", () => {
    expect($round()({ value: 3.5, precision: 0 })).toBe(4);
    expect($round()({ value: 3.4, precision: 0 })).toBe(3);
  });

  it("should handle negative numbers", () => {
    expect($round()({ value: -3.7, precision: 0 })).toBe(-4);
    expect($round()({ value: -3.2, precision: 0 })).toBe(-3);
  });
});
