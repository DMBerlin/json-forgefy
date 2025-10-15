import { $not } from "./not.operator";

describe("Not operator", () => {
  it("should return false for truthy values", () => {
    expect($not()(true)).toBe(false);
    expect($not()(1)).toBe(false);
    expect($not()("hello")).toBe(false);
    expect($not()({})).toBe(false);
    expect($not()([])).toBe(false);
    expect($not()(42)).toBe(false);
  });

  it("should return true for falsy values", () => {
    expect($not()(false)).toBe(true);
    expect($not()(0)).toBe(true);
    expect($not()("")).toBe(true);
    expect($not()(null)).toBe(true);
    expect($not()(undefined)).toBe(true);
    expect($not()(NaN)).toBe(true);
  });

  it("should handle boolean values correctly", () => {
    expect($not()(true)).toBe(false);
    expect($not()(false)).toBe(true);
  });

  it("should handle numeric values correctly", () => {
    expect($not()(0)).toBe(true);
    expect($not()(1)).toBe(false);
    expect($not()(-1)).toBe(false);
    expect($not()(3.14)).toBe(false);
  });

  it("should handle string values correctly", () => {
    expect($not()("")).toBe(true);
    expect($not()("hello")).toBe(false);
    expect($not()(" ")).toBe(false); // Non-empty string
  });

  it("should handle null and undefined correctly", () => {
    expect($not()(null)).toBe(true);
    expect($not()(undefined)).toBe(true);
  });

  it("should handle objects and arrays correctly", () => {
    expect($not()({})).toBe(false); // Empty object is truthy
    expect($not()([])).toBe(false); // Empty array is truthy
    expect($not()({ key: "value" })).toBe(false);
    expect($not()([1, 2, 3])).toBe(false);
  });

  it("should handle already resolved expression values", () => {
    // These values would come already resolved from resolveArgs
    expect($not()(true)).toBe(false); // Resolved condition
    expect($not()(false)).toBe(true); // Resolved condition
  });
});
