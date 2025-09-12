import { $nin } from "./nin.operator";

describe("$nin operator", () => {
  const mockContext = {
    context: {
      status: "active",
      role: "user",
      category: "electronics",
      userId: 123,
      blacklistedCategories: ["weapons", "drugs", "adult"],
      blockedUsers: ["999", "888", "777"],
      numbers: [1, 2, 3, 4, 5],
      booleans: [true, false],
      mixed: [1, "two", true, null],
      emptyArray: [],
      notAnArray: "not an array",
      user: {
        role: "guest",
        id: 456,
      },
    },
  };

  it("should return true when value does not exist in array", () => {
    const result = $nin(mockContext)([
      "$status",
      ["deleted", "archived", "suspended"],
    ]);
    expect(result).toBe(true);
  });

  it("should return false when value exists in array", () => {
    const result = $nin(mockContext)([
      "$status",
      ["active", "pending", "approved"],
    ]);
    expect(result).toBe(false);
  });

  it("should work with path-to-path comparison", () => {
    const result = $nin(mockContext)(["$category", "$blacklistedCategories"]);
    expect(result).toBe(true);
  });

  it("should return false when value is in path array", () => {
    const result = $nin(mockContext)(["weapons", "$blacklistedCategories"]);
    expect(result).toBe(false);
  });

  it("should work with number values", () => {
    const result = $nin(mockContext)([10, "$numbers"]);
    expect(result).toBe(true);
  });

  it("should return false when number is in array", () => {
    const result = $nin(mockContext)([3, "$numbers"]);
    expect(result).toBe(false);
  });

  it("should work with boolean values", () => {
    const result = $nin(mockContext)([false, "$booleans"]);
    expect(result).toBe(false);
  });

  it("should work with mixed type arrays", () => {
    const result = $nin(mockContext)([5, "$mixed"]);
    expect(result).toBe(true);
  });

  it("should return false with string in mixed array", () => {
    const result = $nin(mockContext)(["two", "$mixed"]);
    expect(result).toBe(false);
  });

  it("should return false with null in mixed array", () => {
    const result = $nin(mockContext)([null, "$mixed"]);
    expect(result).toBe(false);
  });

  it("should return true for empty array", () => {
    const result = $nin(mockContext)(["$status", "$emptyArray"]);
    expect(result).toBe(true);
  });

  it("should return true when second argument is not an array", () => {
    const result = $nin(mockContext)(["$status", "$notAnArray"]);
    expect(result).toBe(true);
  });

  it("should work with nested object paths", () => {
    const result = $nin(mockContext)([
      "$user.role",
      ["admin", "moderator", "editor"],
    ]);
    expect(result).toBe(true);
  });

  it("should return false with nested object paths in array", () => {
    const result = $nin(mockContext)([
      "$user.role",
      ["admin", "guest", "editor"],
    ]);
    expect(result).toBe(false);
  });

  it("should work with nested expressions", () => {
    const result = $nin(mockContext)([
      { $toString: "$userId" },
      "$blockedUsers",
    ]);
    expect(result).toBe(true);
  });

  it("should return false with nested expressions in array", () => {
    const result = $nin(mockContext)([
      { $toString: "$user.id" },
      ["123", "456", "789"],
    ]);
    expect(result).toBe(false); // "456" is in the array
  });

  it("should work with literal arrays", () => {
    const result = $nin(mockContext)(["superuser", ["admin", "user", "guest"]]);
    expect(result).toBe(true);
  });

  it("should return false with literal arrays when value exists", () => {
    const result = $nin(mockContext)(["admin", ["admin", "user", "guest"]]);
    expect(result).toBe(false);
  });

  it("should work without context", () => {
    const result = $nin()(["grape", ["apple", "banana", "cherry"]]);
    expect(result).toBe(true);
  });

  it("should return false without context when value is in array", () => {
    const result = $nin()(["apple", ["apple", "banana", "cherry"]]);
    expect(result).toBe(false);
  });

  it("should handle case sensitivity", () => {
    const result = $nin(mockContext)([
      "Active",
      ["active", "pending", "approved"],
    ]);
    expect(result).toBe(true);
  });

  it("should work with exact type matching", () => {
    const result = $nin(mockContext)(["123", "$blockedUsers"]);
    expect(result).toBe(true);
  });

  it("should not match different types", () => {
    const result = $nin(mockContext)([123, ["123", "456", "789"]]);
    expect(result).toBe(true); // number 123 !== string "123"
  });

  it("should work with expressions inside the array elements", () => {
    const result = $nin(mockContext)([
      { $add: [10, 10] }, // 20
      [15, 25, { $add: [10, 15] }], // array contains [15, 25, 25] - 20 is not in it
    ]);
    expect(result).toBe(true);
  });

  it("should return false when expression value found in expression array", () => {
    const result = $nin(mockContext)([
      { $add: [10, 15] }, // 25
      [15, 20, { $add: [10, 15] }], // array contains [15, 20, 25] - 25 is in it
    ]);
    expect(result).toBe(false);
  });

  it("should work with multiple expressions in array elements", () => {
    const result = $nin(mockContext)([
      { $multiply: [7, 7] }, // 49
      [
        { $add: [10, 5] }, // 15
        { $subtract: [30, 10] }, // 20
        { $add: [10, 15] }, // 25
        { $multiply: [6, 6] }, // 36
      ],
    ]);
    expect(result).toBe(true); // 49 is not in [15, 20, 25, 36]
  });

  it("should return false with multiple expressions when value is found", () => {
    const result = $nin(mockContext)([
      { $multiply: [5, 5] }, // 25
      [
        { $add: [10, 5] }, // 15
        { $subtract: [30, 10] }, // 20
        { $add: [10, 15] }, // 25
        { $multiply: [6, 6] }, // 36
      ],
    ]);
    expect(result).toBe(false); // 25 is in [15, 20, 25, 36]
  });

  it("should work with mixed literals and expressions in array", () => {
    const result = $nin(mockContext)([
      30,
      [
        15, // literal
        { $add: [10, 10] }, // 20
        25, // literal
        { $multiply: [6, 6] }, // 36
      ],
    ]);
    expect(result).toBe(true); // 30 is not in [15, 20, 25, 36]
  });

  it("should return false with mixed literals and expressions when value found", () => {
    const result = $nin(mockContext)([
      25,
      [
        15, // literal
        { $add: [10, 10] }, // 20
        25, // literal
        { $multiply: [6, 6] }, // 36
      ],
    ]);
    expect(result).toBe(false); // 25 is in [15, 20, 25, 36]
  });
});
