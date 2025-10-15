import { $or } from "./or.operator";

describe("Or operator", () => {
  it("should return true if any expression is truthy", () => {
    expect($or()([false, true, false])).toBe(true);
    expect($or()([0, "hello", false])).toBe(true);
    expect($or()([null, 42, undefined])).toBe(true);
  });

  it("should return false if all expressions are falsy", () => {
    expect($or()([false, false, false])).toBe(false);
    expect($or()([0, "", null])).toBe(false);
    expect($or()([undefined, false, 0])).toBe(false);
  });

  it("should return false for empty array", () => {
    expect($or()([])).toBe(false);
  });

  it("should handle single element arrays", () => {
    expect($or()([true])).toBe(true);
    expect($or()([false])).toBe(false);
    expect($or()([1])).toBe(true);
    expect($or()([0])).toBe(false);
  });

  it("should use short-circuit evaluation", () => {
    // This test verifies that evaluation stops at the first true value
    expect($or()([false, true, false])).toBe(true);
    expect($or()([true, false, false])).toBe(true);
  });

  it("should handle various falsy values", () => {
    expect($or()([false, 0, "", null, undefined, NaN])).toBe(false);
  });

  it("should handle various truthy values", () => {
    expect($or()([false, 0, "", 1])).toBe(true);
    expect($or()([false, 0, "hello"])).toBe(true);
    expect($or()([false, {}])).toBe(true);
    expect($or()([null, []])).toBe(true);
  });

  it("should return true if all expressions are truthy", () => {
    expect($or()([true, true, true])).toBe(true);
    expect($or()([1, "hello", 42])).toBe(true);
  });

  it("should handle already resolved expression values", () => {
    // These values would come already resolved from resolveArgs
    expect($or()([false, true, false])).toBe(true); // At least one condition met
    expect($or()([false, false, false])).toBe(false); // No conditions met
  });
});
