import { $or } from "./or.operator";

describe("$or operator", () => {
  const mockContext = {
    context: {
      role: "user",
      adminRole: "admin",
      isOwner: false,
      userId: 123,
      ownerId: 456,
      permissions: { edit: false },
      status: "inactive",
      balance: 0,
      isActive: true,
      isVerified: false,
    },
  };

  it("should return true when any expression is true", () => {
    const result = $or(mockContext)([
      { $eq: ["$role", "admin"] }, // false
      { $eq: ["$role", "user"] }, // true - should short-circuit here
      { $eq: ["$isOwner", true] }, // false
    ]);
    expect(result).toBe(true);
  });

  it("should return false when all expressions are false", () => {
    const result = $or(mockContext)([
      { $eq: ["$role", "admin"] },
      { $eq: ["$role", "moderator"] },
      { $eq: ["$isOwner", true] },
    ]);
    expect(result).toBe(false);
  });

  it("should return true when first expression is true (short-circuit)", () => {
    const result = $or(mockContext)([
      { $eq: ["$role", "user"] }, // true - should short-circuit here
      { $eq: ["$status", "active"] }, // false
      { $gt: ["$balance", 0] }, // false
    ]);
    expect(result).toBe(true);
  });

  it("should return false for empty array", () => {
    const result = $or(mockContext)([]);
    expect(result).toBe(false);
  });

  it("should work with simple boolean values", () => {
    const result = $or(mockContext)(["$isActive", "$isVerified"]);
    expect(result).toBe(true);
  });

  it("should return false when all booleans are false", () => {
    const result = $or(mockContext)(["$isVerified", "$isOwner"]);
    expect(result).toBe(false);
  });

  it("should work with mixed expressions and literals", () => {
    const result = $or(mockContext)([
      false,
      { $eq: ["$userId", "$ownerId"] }, // false
      { $eq: ["$permissions.edit", true] }, // false
      true, // true - should make result true
    ]);
    expect(result).toBe(true);
  });

  it("should return false with mixed expressions when all are false", () => {
    const result = $or(mockContext)([
      false,
      { $eq: ["$userId", "$ownerId"] }, // false
      { $eq: ["$permissions.edit", true] }, // false
    ]);
    expect(result).toBe(false);
  });

  it("should work without context", () => {
    const result = $or()([false, false, true]);
    expect(result).toBe(true);
  });

  it("should return false without context when all values are falsy", () => {
    const result = $or()([false, false, false]);
    expect(result).toBe(false);
  });

  it("should handle single expression", () => {
    const result = $or(mockContext)([{ $eq: ["$role", "user"] }]);
    expect(result).toBe(true);
  });
});
