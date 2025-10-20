import { $coalesce } from "@operators/conditional/coalesce.operator";

describe("Coalesce operator", () => {
  it("should return first non-null, non-undefined value", () => {
    expect($coalesce()([null, undefined, "hello", "world"])).toBe("hello");
    expect($coalesce()([0, null, "fallback"])).toBe(0);
    expect($coalesce()([false, null, "fallback"])).toBe(false);
  });

  it("should return null if all values are null/undefined", () => {
    expect($coalesce()([null, undefined, null])).toBe(null);
    expect($coalesce()([undefined, null])).toBe(null);
  });

  it("should handle empty array", () => {
    expect($coalesce()([])).toBe(null);
  });

  it("should return first value if it's not null/undefined", () => {
    expect($coalesce()(["first", "second"])).toBe("first");
    expect($coalesce()([123, 456])).toBe(123);
  });
});
