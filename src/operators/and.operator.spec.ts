import { $and } from "./and.operator";

describe("$and operator", () => {
  const mockContext = {
    context: {
      age: 25,
      status: "active",
      balance: 150,
      price: 100,
      accountStatus: "verified",
      isActive: true,
      isVerified: false,
    },
  };

  it("should return true when all expressions are true", () => {
    const result = $and(mockContext)([
      { $gte: ["$age", 18] },
      { $eq: ["$status", "active"] },
      { $gt: ["$balance", 0] },
    ]);
    expect(result).toBe(true);
  });

  it("should return false when any expression is false", () => {
    const result = $and(mockContext)([
      { $gte: ["$age", 18] },
      { $eq: ["$status", "inactive"] }, // This will be false
      { $gt: ["$balance", 0] },
    ]);
    expect(result).toBe(false);
  });

  it("should return false when first expression is false (short-circuit)", () => {
    const result = $and(mockContext)([
      { $lt: ["$age", 18] }, // This will be false
      { $eq: ["$status", "active"] },
      { $gt: ["$balance", 0] },
    ]);
    expect(result).toBe(false);
  });

  it("should return true for empty array", () => {
    const result = $and(mockContext)([]);
    expect(result).toBe(true);
  });

  it("should work with simple boolean values", () => {
    const result = $and(mockContext)(["$isActive", "$isActive"]);
    expect(result).toBe(true);
  });

  it("should return false when one boolean is false", () => {
    const result = $and(mockContext)(["$isActive", "$isVerified"]);
    expect(result).toBe(false);
  });

  it("should work with mixed expressions and literals", () => {
    const result = $and(mockContext)([
      true,
      { $gt: ["$balance", "$price"] },
      { $eq: ["$accountStatus", "verified"] },
    ]);
    expect(result).toBe(true);
  });

  it("should return false with mixed expressions when one is false", () => {
    const result = $and(mockContext)([
      true,
      { $lt: ["$balance", "$price"] }, // This will be false
      { $eq: ["$accountStatus", "verified"] },
    ]);
    expect(result).toBe(false);
  });

  it("should work without context", () => {
    const result = $and()([true, true, true]);
    expect(result).toBe(true);
  });

  it("should return false without context when any value is falsy", () => {
    const result = $and()([true, false, true]);
    expect(result).toBe(false);
  });

  it("should work with nested expressions comparing path values to expression results", () => {
    const result = $and(mockContext)([
      true,
      { $gte: ["$age", { $add: [5, 6, 7] }] }, // age (25) >= add(5+6+7=18) = true
    ]);
    expect(result).toBe(true);
  });

  it("should return false with nested expressions when comparison fails", () => {
    const result = $and(mockContext)([
      true,
      { $lt: ["$balance", { $add: [10, 20, 30] }] }, // balance (150) < add(10+20+30=60) = false
    ]);
    expect(result).toBe(false);
  });

  it("should work with complex nested expressions", () => {
    const result = $and(mockContext)([
      { $eq: ["$status", "active"] }, // status is "active" = true
      { $gte: ["$balance", 150] }, // balance (150) >= 150 = true
      { $gt: [30, 25] }, // 30 > 25 = true
    ]);
    expect(result).toBe(true);
  });

  it("should work with nested expressions in comparisons", () => {
    // Test the individual parts first
    const addResult = { $add: [100, 50] }; // Should be 150
    const result = $and(mockContext)([
      { $eq: ["$status", "active"] },
      { $gte: [addResult, 150] }, // 150 >= 150 = true
    ]);
    expect(result).toBe(true);
  });
});
