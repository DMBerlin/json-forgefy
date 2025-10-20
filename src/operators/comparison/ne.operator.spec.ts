import { $ne } from "./ne.operator";

describe("$ne operator", () => {
  it("should return true when string values are not equal", () => {
    expect($ne()(["active", "deleted"])).toBe(true);
    expect($ne()(["hello", "world"])).toBe(true);
  });

  it("should return false when string values are equal", () => {
    expect($ne()(["active", "active"])).toBe(false);
    expect($ne()(["test", "test"])).toBe(false);
  });

  it("should return true when number values are not equal", () => {
    expect($ne()([123, 456])).toBe(true);
    expect($ne()([10, 20])).toBe(true);
  });

  it("should return false when number values are equal", () => {
    expect($ne()([25, 25])).toBe(false);
    expect($ne()([0, 0])).toBe(false);
  });

  it("should return true when comparing different types", () => {
    expect($ne()([150, "150"])).toBe(true); // 150 !== "150"
    expect($ne()([true, 1])).toBe(true);
    expect($ne()([false, 0])).toBe(true);
  });

  it("should work with boolean values", () => {
    expect($ne()([true, false])).toBe(true);
    expect($ne()([false, true])).toBe(true);
    expect($ne()([true, true])).toBe(false);
    expect($ne()([false, false])).toBe(false);
  });

  it("should work with zero comparison", () => {
    expect($ne()([0, 0])).toBe(false);
    expect($ne()([0, 1])).toBe(true);
    expect($ne()([1, 0])).toBe(true);
  });

  it("should work with null values", () => {
    expect($ne()([null, null])).toBe(false);
    expect($ne()([null, "not null"])).toBe(true);
    expect($ne()(["not null", null])).toBe(true);
  });

  it("should work with undefined values", () => {
    expect($ne()([undefined, undefined])).toBe(false);
    expect($ne()([undefined, "defined"])).toBe(true);
    expect($ne()(["defined", undefined])).toBe(true);
  });

  it("should distinguish between null and undefined", () => {
    expect($ne()([null, undefined])).toBe(true);
    expect($ne()([undefined, null])).toBe(true);
  });

  it("should work with already resolved expression values", () => {
    // These values would come already resolved from resolveArgs
    expect($ne()([30, 30])).toBe(false); // Simulating { $add: [10, 20] } = 30 and { $multiply: [5, 6] } = 30
    expect($ne()([30, 35])).toBe(true); // Simulating { $add: [10, 20] } = 30 and { $multiply: [5, 7] } = 35
  });

  it("should work with negative numbers", () => {
    expect($ne()([-5, -5])).toBe(false);
    expect($ne()([-5, 5])).toBe(true);
  });
});
