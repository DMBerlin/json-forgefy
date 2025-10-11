import { $none } from "./none.operator";

describe("None operator", () => {
  it("should return true if all expressions are falsy", () => {
    expect($none()([false, false, false])).toBe(true);
    expect($none()([0, "", null])).toBe(true);
    expect($none()([undefined, false, 0])).toBe(true);
    expect($none()([null, undefined, NaN])).toBe(true);
  });

  it("should return false if any expression is truthy", () => {
    expect($none()([false, true, false])).toBe(false);
    expect($none()([0, "hello", false])).toBe(false);
    expect($none()([null, 42, undefined])).toBe(false);
    expect($none()([false, false, 1])).toBe(false);
  });

  it("should return true for empty array (no conditions to fail)", () => {
    expect($none()([])).toBe(true);
  });

  it("should handle single element arrays", () => {
    expect($none()([false])).toBe(true);
    expect($none()([true])).toBe(false);
    expect($none()([0])).toBe(true);
    expect($none()([1])).toBe(false);
  });

  it("should return false on first truthy value (short-circuit)", () => {
    expect($none()([false, true, false])).toBe(false);
    expect($none()([true, false, false])).toBe(false);
    expect($none()([false, false, true])).toBe(false);
  });

  it("should handle various falsy values", () => {
    expect($none()([false, 0, "", null, undefined, NaN])).toBe(true);
    expect($none()([false])).toBe(true);
    expect($none()([0])).toBe(true);
    expect($none()([""])).toBe(true);
    expect($none()([null])).toBe(true);
    expect($none()([undefined])).toBe(true);
    expect($none()([NaN])).toBe(true);
  });

  it("should handle various truthy values", () => {
    expect($none()([false, 0, "", 1])).toBe(false);
    expect($none()([false, 0, "hello"])).toBe(false);
    expect($none()([false, {}])).toBe(false);
    expect($none()([null, []])).toBe(false);
    expect($none()([true])).toBe(false);
    expect($none()([1])).toBe(false);
    expect($none()(["hello"])).toBe(false);
    expect($none()([{}])).toBe(false);
    expect($none()([[]])).toBe(false);
    expect($none()([42])).toBe(false);
  });

  it("should return true only when all expressions are falsy", () => {
    expect($none()([false, false, false])).toBe(true);
    expect($none()([0, 0, 0])).toBe(true);
    expect($none()([null, null, null])).toBe(true);
  });

  it("should handle already resolved expression values", () => {
    // These values would come already resolved from resolveArgs
    expect($none()([false, false, false])).toBe(true); // No conditions met
    expect($none()([false, true, false])).toBe(false); // At least one condition met
  });

  it("should be the inverse of $or operator", () => {
    // When $or returns true, $none should return false
    expect($none()([false, true, false])).toBe(false);
    expect($none()([true, false, false])).toBe(false);

    // When $or returns false, $none should return true
    expect($none()([false, false, false])).toBe(true);
    expect($none()([0, "", null])).toBe(true);
  });

  it("should handle mixed falsy values", () => {
    expect($none()([false, 0, ""])).toBe(true);
    expect($none()([null, undefined, false])).toBe(true);
    expect($none()([0, "", NaN])).toBe(true);
    expect($none()([false, null, 0, undefined, ""])).toBe(true);
  });

  it("should handle edge cases with boolean coercion", () => {
    expect($none()([false, false])).toBe(true);
    expect($none()([0, false])).toBe(true);
    expect($none()(["", 0])).toBe(true);
    expect($none()([null, false])).toBe(true);
    expect($none()([undefined, 0])).toBe(true);
  });
});
