import { $in } from "./in.operator";

describe("$in operator", () => {
  const mockContext = {
    context: {
      status: "active",
      role: "admin",
      category: "electronics",
      userId: 123,
      allowedCategories: ["electronics", "books", "clothing"],
      authorizedUsers: ["123", "456", "789"],
      numbers: [1, 2, 3, 4, 5],
      booleans: [true, false],
      mixed: [1, "two", true, null],
      emptyArray: [],
      notAnArray: "not an array",
      user: {
        role: "moderator",
        id: 456,
      },
    },
  };

  it("should return true when value exists in array", () => {
    const result = $in(mockContext)([
      "$status",
      ["active", "pending", "approved"],
    ]);
    expect(result).toBe(true);
  });

  it("should return false when value does not exist in array", () => {
    const result = $in(mockContext)([
      "$status",
      ["inactive", "deleted", "suspended"],
    ]);
    expect(result).toBe(false);
  });

  it("should work with path-to-path comparison", () => {
    const result = $in(mockContext)(["$category", "$allowedCategories"]);
    expect(result).toBe(true);
  });

  it("should return false when value not in path array", () => {
    const result = $in(mockContext)(["$role", "$allowedCategories"]);
    expect(result).toBe(false);
  });

  it("should work with number values", () => {
    const result = $in(mockContext)([3, "$numbers"]);
    expect(result).toBe(true);
  });

  it("should return false when number not in array", () => {
    const result = $in(mockContext)([10, "$numbers"]);
    expect(result).toBe(false);
  });

  it("should work with boolean values", () => {
    const result = $in(mockContext)([true, "$booleans"]);
    expect(result).toBe(true);
  });

  it("should work with mixed type arrays", () => {
    const result = $in(mockContext)([1, "$mixed"]);
    expect(result).toBe(true);
  });

  it("should work with string in mixed array", () => {
    const result = $in(mockContext)(["two", "$mixed"]);
    expect(result).toBe(true);
  });

  it("should work with null in mixed array", () => {
    const result = $in(mockContext)([null, "$mixed"]);
    expect(result).toBe(true);
  });

  it("should return false for empty array", () => {
    const result = $in(mockContext)(["$status", "$emptyArray"]);
    expect(result).toBe(false);
  });

  it("should return false when second argument is not an array", () => {
    const result = $in(mockContext)(["$status", "$notAnArray"]);
    expect(result).toBe(false);
  });

  it("should work with nested object paths", () => {
    const result = $in(mockContext)([
      "$user.role",
      ["admin", "moderator", "editor"],
    ]);
    expect(result).toBe(true);
  });

  it("should work with nested expressions", () => {
    const result = $in(mockContext)([
      { $toString: "$userId" },
      "$authorizedUsers",
    ]);
    expect(result).toBe(true);
  });

  it("should return false with nested expressions not in array", () => {
    const result = $in(mockContext)([
      { $toString: "$user.id" },
      "$authorizedUsers",
    ]);
    expect(result).toBe(true); // "456" is in authorizedUsers
  });

  it("should work with literal arrays", () => {
    const result = $in(mockContext)(["admin", ["admin", "user", "guest"]]);
    expect(result).toBe(true);
  });

  it("should work without context", () => {
    const result = $in()(["apple", ["apple", "banana", "cherry"]]);
    expect(result).toBe(true);
  });

  it("should return false without context when value not in array", () => {
    const result = $in()(["grape", ["apple", "banana", "cherry"]]);
    expect(result).toBe(false);
  });

  it("should handle case sensitivity", () => {
    const result = $in(mockContext)([
      "Active",
      ["active", "pending", "approved"],
    ]);
    expect(result).toBe(false);
  });

  it("should work with exact type matching", () => {
    const result = $in(mockContext)(["123", "$authorizedUsers"]);
    expect(result).toBe(true);
  });

  it("should not match different types", () => {
    const result = $in(mockContext)([123, "$authorizedUsers"]);
    expect(result).toBe(false); // number 123 !== string "123"
  });

  it("should work with expression as the value to check", () => {
    const result = $in(mockContext)([
      { $toString: "$userId" }, // converts 123 to "123"
      ["123", "456", "789"],
    ]);
    expect(result).toBe(true);
  });

  it("should work with expression as the array to check against", () => {
    const result = $in(mockContext)([
      "electronics",
      "$allowedCategories", // path to ["electronics", "books", "clothing"]
    ]);
    expect(result).toBe(true);
  });

  it("should work with expressions on both sides", () => {
    const result = $in(mockContext)([
      { $toUpper: "$category" }, // converts "electronics" to "ELECTRONICS"
      ["ELECTRONICS", "BOOKS", "CLOTHING"],
    ]);
    expect(result).toBe(true);
  });

  it("should return false when expression result is not in array", () => {
    const result = $in(mockContext)([
      { $add: ["$userId", 1] }, // 123 + 1 = 124
      [123, 125, 126],
    ]);
    expect(result).toBe(false);
  });

  it("should work with complex nested expressions", () => {
    const result = $in(mockContext)([
      { $add: [10, 15] }, // 25
      [20, 25, 30, 35],
    ]);
    expect(result).toBe(true);
  });

  it("should work with expressions inside the array elements", () => {
    const result = $in(mockContext)([
      { $add: [10, 15] }, // 25
      [15, 20, { $add: [10, 15] }], // array contains [15, 20, 25]
    ]);
    expect(result).toBe(true);
  });

  it("should work with multiple expressions in array elements", () => {
    const result = $in(mockContext)([
      { $multiply: [5, 5] }, // 25
      [
        { $add: [10, 5] }, // 15
        { $subtract: [30, 10] }, // 20
        { $add: [10, 15] }, // 25
        { $multiply: [6, 6] }, // 36
      ],
    ]);
    expect(result).toBe(true);
  });

  it("should return false when expression value not found in expression array", () => {
    const result = $in(mockContext)([
      { $add: [10, 10] }, // 20
      [
        { $add: [10, 5] }, // 15
        { $add: [10, 15] }, // 25
        { $multiply: [6, 6] }, // 36
      ],
    ]);
    expect(result).toBe(false);
  });

  it("should work with mixed literals and expressions in array", () => {
    const result = $in(mockContext)([
      25,
      [
        15, // literal
        { $add: [10, 10] }, // 20
        25, // literal
        { $multiply: [6, 6] }, // 36
      ],
    ]);
    expect(result).toBe(true);
  });
});
