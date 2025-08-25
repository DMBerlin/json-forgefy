import { $ne } from "./ne.operator";

describe("$ne operator", () => {
  const mockContext = {
    context: {
      status: "active",
      userId: 123,
      currentUserId: 456,
      originalValue: "old",
      currentValue: "new",
      balance: 150,
      name: "John",
      age: 25,
      isActive: true,
      count: 0,
      nullValue: null,
      undefinedValue: undefined,
    },
  };

  it("should return true when string values are not equal", () => {
    const result = $ne(mockContext)(["$status", "deleted"]);
    expect(result).toBe(true);
  });

  it("should return false when string values are equal", () => {
    const result = $ne(mockContext)(["$status", "active"]);
    expect(result).toBe(false);
  });

  it("should return true when number values are not equal", () => {
    const result = $ne(mockContext)(["$userId", "$currentUserId"]);
    expect(result).toBe(true);
  });

  it("should return false when number values are equal", () => {
    const result = $ne(mockContext)(["$age", 25]);
    expect(result).toBe(false);
  });

  it("should work with path-to-path comparison", () => {
    const result = $ne(mockContext)(["$originalValue", "$currentValue"]);
    expect(result).toBe(true);
  });

  it("should return true when comparing different types", () => {
    const result = $ne(mockContext)(["$balance", "150"]);
    expect(result).toBe(true); // 150 !== "150"
  });

  it("should work with boolean values", () => {
    const result = $ne(mockContext)(["$isActive", false]);
    expect(result).toBe(true);
  });

  it("should return false when boolean values are equal", () => {
    const result = $ne(mockContext)(["$isActive", true]);
    expect(result).toBe(false);
  });

  it("should work with zero comparison", () => {
    const result = $ne(mockContext)(["$count", 0]);
    expect(result).toBe(false);
  });

  it("should return true when comparing zero with non-zero", () => {
    const result = $ne(mockContext)(["$count", 1]);
    expect(result).toBe(true);
  });

  it("should work with null values", () => {
    const result = $ne(mockContext)(["$nullValue", null]);
    expect(result).toBe(false);
  });

  it("should return true when comparing null with non-null", () => {
    const result = $ne(mockContext)(["$nullValue", "not null"]);
    expect(result).toBe(true);
  });

  it("should work with undefined values", () => {
    const result = $ne(mockContext)(["$undefinedValue", undefined]);
    expect(result).toBe(false);
  });

  it("should return true when comparing undefined with defined", () => {
    const result = $ne(mockContext)(["$undefinedValue", "defined"]);
    expect(result).toBe(true);
  });

  it("should work with nested expressions", () => {
    const result = $ne(mockContext)([
      { $add: [10, 20] },
      { $multiply: [5, 6] },
    ]);
    expect(result).toBe(false); // 30 === 30
  });

  it("should return true with different nested expressions", () => {
    const result = $ne(mockContext)([
      { $add: [10, 20] },
      { $multiply: [5, 7] },
    ]);
    expect(result).toBe(true); // 30 !== 35
  });

  it("should work without context", () => {
    const result = $ne()([42, 24]);
    expect(result).toBe(true);
  });

  it("should return false without context when values are equal", () => {
    const result = $ne()([42, 42]);
    expect(result).toBe(false);
  });
});
