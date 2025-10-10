import { $isNull } from "./is-null.operator";

describe("IsNull operator", () => {
  it("should return true for null values", () => {
    expect($isNull()(null)).toBe(true);
  });

  it("should return true for undefined values", () => {
    expect($isNull()(undefined)).toBe(true);
  });

  it("should return false for non-null values", () => {
    expect($isNull()("hello")).toBe(false);
    expect($isNull()(0)).toBe(false);
    expect($isNull()(false)).toBe(false);
    expect($isNull()([])).toBe(false);
    expect($isNull()({})).toBe(false);
  });

  it("should return false for falsy but non-null values", () => {
    expect($isNull()(0)).toBe(false);
    expect($isNull()(false)).toBe(false);
    expect($isNull()("")).toBe(false);
    expect($isNull()(NaN)).toBe(false);
  });

  it("should return false for truthy values", () => {
    expect($isNull()(1)).toBe(false);
    expect($isNull()(true)).toBe(false);
    expect($isNull()("text")).toBe(false);
    expect($isNull()([1, 2, 3])).toBe(false);
    expect($isNull()({ key: "value" })).toBe(false);
  });

  it("should handle already resolved expression values", () => {
    // These values would come already resolved from resolveArgs
    expect($isNull()(null)).toBe(true); // Simulating resolved path that doesn't exist
    expect($isNull()(undefined)).toBe(true); // Simulating resolved missing field
    expect($isNull()("value")).toBe(false); // Simulating resolved existing field
  });
});
