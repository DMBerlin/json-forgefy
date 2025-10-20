import { $ceil } from "@operators/math/ceil.operator";

describe("Ceil operator", () => {
  it("should return the smallest integer greater than or equal to a given number", () => {
    const number = 1.5;
    const result = $ceil()(number);
    expect(result).toBe(2);
  });
  it("should return the same number if it is already an integer", () => {
    const number = 1;
    const result = $ceil()(number);
    expect(result).toBe(1);
  });
  it("should return the same number if it is already a negative integer", () => {
    const number = -1;
    const result = $ceil()(number);
    expect(result).toBe(-1);
  });
});
