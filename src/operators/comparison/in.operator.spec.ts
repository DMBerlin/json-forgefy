import { $in } from "./in.operator";

describe("$in operator", () => {
  it("should return true when value exists in array", () => {
    expect($in()(["active", ["active", "pending", "approved"]])).toBe(true);
    expect($in()(["admin", ["admin", "moderator", "editor"]])).toBe(true);
  });

  it("should return false when value does not exist in array", () => {
    expect($in()(["active", ["inactive", "deleted"]])).toBe(false);
    expect($in()(["user", ["admin", "moderator"]])).toBe(false);
  });

  it("should work with string values", () => {
    expect($in()(["electronics", ["electronics", "books", "clothing"]])).toBe(
      true,
    );
    expect($in()(["sports", ["electronics", "books", "clothing"]])).toBe(false);
  });

  it("should work with number values", () => {
    expect($in()([3, [1, 2, 3, 4, 5]])).toBe(true);
    expect($in()([10, [1, 2, 3, 4, 5]])).toBe(false);
  });

  it("should work with mixed type arrays", () => {
    expect($in()([42, ["text", 42, true, null]])).toBe(true);
    expect($in()(["text", ["text", 42, true, null]])).toBe(true);
    expect($in()([false, ["text", 42, true, null]])).toBe(false);
  });

  it("should return false for empty arrays", () => {
    expect($in()(["anything", []])).toBe(false);
    expect($in()([123, []])).toBe(false);
  });

  it("should return false when second argument is not an array", () => {
    expect($in()(["test", "not an array"])).toBe(false);
    expect($in()(["test", null])).toBe(false);
    expect($in()(["test", undefined])).toBe(false);
    expect($in()(["test", {}])).toBe(false);
  });

  it("should work with boolean values", () => {
    expect($in()([true, [true, false]])).toBe(true);
    expect($in()([false, [true, false]])).toBe(true);
    expect($in()([true, [false]])).toBe(false);
  });

  it("should work with null values", () => {
    expect($in()([null, ["text", 42, true, null]])).toBe(true);
    expect($in()([null, ["text", 42, true]])).toBe(false);
  });

  it("should work with undefined values", () => {
    expect($in()([undefined, ["text", undefined, true]])).toBe(true);
    expect($in()([undefined, ["text", 42, true]])).toBe(false);
  });

  it("should distinguish between similar values", () => {
    expect($in()([0, [false, null, undefined]])).toBe(false);
    expect($in()([false, [0, null, undefined]])).toBe(false);
    expect($in()([null, [false, 0, undefined]])).toBe(false);
  });

  it("should handle already resolved expression values", () => {
    // These values would come already resolved from resolveArgs
    expect($in()(["123", ["123", "456", "789"]])).toBe(true); // Simulating resolved { $toString: 123 }
    expect($in()(["admin", ["admin", "moderator"]])).toBe(true); // Simulating resolved array
  });

  it("should work with single element arrays", () => {
    expect($in()(["only", ["only"]])).toBe(true);
    expect($in()(["missing", ["only"]])).toBe(false);
  });
});
