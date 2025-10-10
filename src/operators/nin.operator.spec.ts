import { $nin } from "./nin.operator";

describe("$nin operator", () => {
  it("should return true when value does not exist in array", () => {
    expect($nin()(["active", ["deleted", "archived", "suspended"]])).toBe(true);
    expect($nin()(["user", ["banned", "restricted"]])).toBe(true);
  });

  it("should return false when value exists in array", () => {
    expect($nin()(["active", ["active", "pending"]])).toBe(false);
    expect($nin()(["user", ["user", "admin"]])).toBe(false);
  });

  it("should work with string values", () => {
    expect($nin()(["sports", ["weapons", "drugs"]])).toBe(true);
    expect($nin()(["weapons", ["weapons", "drugs"]])).toBe(false);
  });

  it("should work with number values", () => {
    expect($nin()([10, [1, 2, 3, 4, 5]])).toBe(true);
    expect($nin()([3, [1, 2, 3, 4, 5]])).toBe(false);
  });

  it("should work with mixed type arrays", () => {
    expect($nin()(["missing", ["text", 42, true, null]])).toBe(true);
    expect($nin()([42, ["text", 42, true, null]])).toBe(false);
  });

  it("should return true for empty arrays", () => {
    expect($nin()(["anything", []])).toBe(true);
    expect($nin()([123, []])).toBe(true);
  });

  it("should return true when second argument is not an array", () => {
    expect($nin()(["test", "not an array"])).toBe(true);
    expect($nin()(["test", null])).toBe(true);
    expect($nin()(["test", undefined])).toBe(true);
    expect($nin()(["test", {}])).toBe(true);
  });

  it("should work with boolean values", () => {
    expect($nin()([false, ["text", 42, true, null]])).toBe(true);
    expect($nin()([true, ["text", 42, true, null]])).toBe(false);
  });

  it("should work with null values", () => {
    expect($nin()([undefined, ["text", 42, true, null]])).toBe(true);
    expect($nin()([null, ["text", 42, true, null]])).toBe(false);
  });

  it("should work with undefined values", () => {
    expect($nin()([null, ["text", undefined, true]])).toBe(true);
    expect($nin()([undefined, ["text", undefined, true]])).toBe(false);
  });

  it("should distinguish between similar values", () => {
    expect($nin()([0, [false, null, undefined]])).toBe(true);
    expect($nin()([false, [0, null, undefined]])).toBe(true);
    expect($nin()([null, [false, 0, undefined]])).toBe(true);
  });

  it("should handle already resolved expression values", () => {
    // These values would come already resolved from resolveArgs
    expect($nin()(["999", ["123", "456", "789"]])).toBe(true); // Simulating resolved { $toString: 999 }
    expect($nin()(["guest", ["admin", "moderator"]])).toBe(true); // Simulating resolved array
  });

  it("should work with single element arrays", () => {
    expect($nin()(["different", ["only"]])).toBe(true);
    expect($nin()(["only", ["only"]])).toBe(false);
  });

  it("should handle case sensitivity for strings", () => {
    expect($nin()(["Active", ["active", "pending"]])).toBe(true);
    expect($nin()(["active", ["Active", "Pending"]])).toBe(true);
  });
});
