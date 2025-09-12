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
});
