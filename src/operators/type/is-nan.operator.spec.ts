import { $isNaN } from "@operators/type/is-nan.operator";

describe("IsNaN operator", () => {
  it("should return true for NaN", () => {
    expect($isNaN()(NaN)).toBe(true);
  });

  it("should return false for valid numbers", () => {
    expect($isNaN()(0)).toBe(false);
    expect($isNaN()(1)).toBe(false);
    expect($isNaN()(-1)).toBe(false);
    expect($isNaN()(3.14)).toBe(false);
    expect($isNaN()(Infinity)).toBe(false);
    expect($isNaN()(-Infinity)).toBe(false);
  });

  it("should return false for numeric strings", () => {
    expect($isNaN()("123")).toBe(false);
    expect($isNaN()("0")).toBe(false);
    expect($isNaN()("-456")).toBe(false);
    expect($isNaN()("3.14")).toBe(false);
  });

  it("should return true for non-numeric strings", () => {
    expect($isNaN()("hello")).toBe(true);
    expect($isNaN()("abc123")).toBe(true);
    expect($isNaN()("")).toBe(false); // Empty string converts to 0
    expect($isNaN()("   ")).toBe(false); // Whitespace converts to 0
  });

  it("should return true for undefined", () => {
    expect($isNaN()(undefined)).toBe(true);
  });

  it("should return false for null", () => {
    expect($isNaN()(null)).toBe(false); // null converts to 0
  });

  it("should return false for boolean values", () => {
    expect($isNaN()(true)).toBe(false); // true converts to 1
    expect($isNaN()(false)).toBe(false); // false converts to 0
  });

  it("should return true for objects", () => {
    expect($isNaN()({})).toBe(true);
    expect($isNaN()({ value: 123 })).toBe(true);
  });

  it("should return true for arrays with non-numeric content", () => {
    expect($isNaN()(["hello"])).toBe(true);
    expect($isNaN()([1, 2, 3])).toBe(true); // Multiple elements
  });

  it("should return false for arrays with single numeric element", () => {
    expect($isNaN()([123])).toBe(false);
    expect($isNaN()(["456"])).toBe(false);
  });

  it("should return false for empty array", () => {
    expect($isNaN()([])).toBe(false); // Empty array converts to 0
  });
});
