import { $and } from "./and.operator";

describe("And operator", () => {
  it("should return true if all expressions are truthy", () => {
    expect($and()([true, true, true])).toBe(true);
    expect($and()([1, "hello", true])).toBe(true);
    expect($and()([" non-empty", 42, {}])).toBe(true);
  });

  it("should return false if any expression is falsy", () => {
    expect($and()([true, false, true])).toBe(false);
    expect($and()([1, 0, true])).toBe(false);
    expect($and()([" hello", "", true])).toBe(false);
    expect($and()([true, null, true])).toBe(false);
    expect($and()([true, undefined, true])).toBe(false);
  });

  it("should return true for empty array (vacuous truth)", () => {
    expect($and()([])).toBe(true);
  });

  it("should handle single element arrays", () => {
    expect($and()([true])).toBe(true);
    expect($and()([false])).toBe(false);
    expect($and()([1])).toBe(true);
    expect($and()([0])).toBe(false);
  });

  it("should use short-circuit evaluation", () => {
    // This test verifies that evaluation stops at the first false value
    expect($and()([true, false, true])).toBe(false);
    expect($and()([false, true, true])).toBe(false);
  });

  it("should handle various falsy values", () => {
    expect($and()([false])).toBe(false);
    expect($and()([0])).toBe(false);
    expect($and()([""])).toBe(false);
    expect($and()([null])).toBe(false);
    expect($and()([undefined])).toBe(false);
    expect($and()([NaN])).toBe(false);
  });

  it("should handle various truthy values", () => {
    expect($and()([true])).toBe(true);
    expect($and()([1])).toBe(true);
    expect($and()([" hello"])).toBe(true);
    expect($and()([{}])).toBe(true);
    expect($and()([[]])).toBe(true);
    expect($and()([42])).toBe(true);
  });

  it("should handle already resolved expression values", () => {
    // These values would come already resolved from resolveArgs
    expect($and()([true, true, true])).toBe(true); // All conditions met
    expect($and()([true, false, true])).toBe(false); // One condition failed
  });
});
