import { getValueByPath } from "./get-value-by-path.common";

describe("getValueByPath", () => {
  it("should return the value of the path", () => {
    // Arrange
    const source = { a: { b: { c: 1 } } };
    const path = "$a.b.c";
    // Act
    const result = getValueByPath(source, path);
    // Assert
    expect(result).toBe(1);
  });

  it("should return undefined if path does not exist", () => {
    // Arrange
    const source = { a: { b: { c: 1 } } };
    const path = "$a.b.d";
    // Act
    const result = getValueByPath(source, path);
    // Assert
    expect(result).toBeUndefined();
  });

  it("should return undefined if path doest starts with $", () => {
    // Arrange
    const source = { a: { b: { c: 1 } } };
    const path = "a.b.c";
    // Act
    const result = getValueByPath(source, path);
    // Assert
    expect(result).toBeUndefined();
  });

  it("should handle null values in path", () => {
    const source = { a: { b: null } };
    const result = getValueByPath(source, "$a.b.c");
    expect(result).toBeUndefined();
  });

  it("should handle undefined values in path", () => {
    const source = { a: { b: undefined } };
    const result = getValueByPath(source, "$a.b.c");
    expect(result).toBeUndefined();
  });

  it("should return top-level values", () => {
    const source = { value: 42 };
    const result = getValueByPath(source, "$value");
    expect(result).toBe(42);
  });

  it("should handle deeply nested paths", () => {
    const source = { a: { b: { c: { d: { e: "deep" } } } } };
    const result = getValueByPath(source, "$a.b.c.d.e");
    expect(result).toBe("deep");
  });

  it("should handle array indices in path", () => {
    const source = { items: [{ name: "first" }, { name: "second" }] };
    const result = getValueByPath(source, "$items.0.name");
    expect(result).toBe("first");
  });

  it("should return null values correctly", () => {
    const source = { value: null };
    const result = getValueByPath(source, "$value");
    expect(result).toBe(null);
  });

  it("should return undefined for missing top-level key", () => {
    const source = { a: 1 };
    const result = getValueByPath(source, "$b");
    expect(result).toBeUndefined();
  });
});
