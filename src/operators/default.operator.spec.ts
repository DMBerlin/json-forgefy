import { $default } from "@operators/default.operator";

describe("Default operator", () => {
  it("should return first non-null, non-undefined value", () => {
    expect($default()([null, undefined, "hello", "world"])).toBe("hello");
    expect($default()([0, null, "fallback"])).toBe(0);
    expect($default()([false, null, "fallback"])).toBe(false);
  });

  it("should return null if all values are null/undefined", () => {
    expect($default()([null, undefined, null])).toBe(null);
    expect($default()([undefined, null])).toBe(null);
  });

  it("should handle empty array", () => {
    expect($default()([])).toBe(null);
  });

  it("should return first value if it's not null/undefined", () => {
    expect($default()(["first", "second"])).toBe("first");
    expect($default()([123, 456])).toBe(123);
  });
});
