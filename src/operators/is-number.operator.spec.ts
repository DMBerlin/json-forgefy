import { $isNumber } from "@operators/is-number.operator";

describe("IsNumber operator", () => {
  it("should return true for valid numbers", () => {
    expect($isNumber()(123)).toBe(true);
    expect($isNumber()(0)).toBe(true);
    expect($isNumber()(-123.45)).toBe(true);
    expect($isNumber()(Infinity)).toBe(true);
  });

  it("should return false for non-numbers", () => {
    expect($isNumber()("123")).toBe(false);
    expect($isNumber()(null)).toBe(false);
    expect($isNumber()(undefined)).toBe(false);
    expect($isNumber()(true)).toBe(false);
    expect($isNumber()({})).toBe(false);
    expect($isNumber()([])).toBe(false);
  });

  it("should return false for NaN", () => {
    expect($isNumber()(NaN)).toBe(false);
  });
});
