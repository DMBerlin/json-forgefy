import { $abs } from "@operators/abs.operator";

describe("Abs Operator", () => {
  it("should return the absolute value of a positive number", () => {
    expect($abs()(5)).toBe(5);
  });
  it("should return the absolute value of a negative number", () => {
    expect($abs()(-5)).toBe(5);
  });
  it("should return 0 as it is", () => {
    expect($abs()(0)).toBe(0);
  });
});
