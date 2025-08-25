import { $not } from "./not.operator";

describe("$not operator", () => {
  const mockContext = {
    context: {
      status: "active",
      role: "user",
      balance: 150,
      isVerified: true,
      isActive: false,
      count: 0,
      name: "John",
      emptyString: "",
      nullValue: null,
      undefinedValue: undefined,
    },
  };

  it("should return false when expression is true", () => {
    const result = $not(mockContext)({ $eq: ["$status", "active"] });
    expect(result).toBe(false);
  });

  it("should return true when expression is false", () => {
    const result = $not(mockContext)({ $eq: ["$status", "inactive"] });
    expect(result).toBe(true);
  });

  it("should work with comparison operators", () => {
    const result = $not(mockContext)({ $gt: ["$balance", 200] });
    expect(result).toBe(true);
  });

  it("should work with boolean path values", () => {
    const result = $not(mockContext)("$isVerified");
    expect(result).toBe(false);
  });

  it("should work with false boolean path values", () => {
    const result = $not(mockContext)("$isActive");
    expect(result).toBe(true);
  });

  it("should work with truthy values", () => {
    const result = $not(mockContext)("$name");
    expect(result).toBe(false);
  });

  it("should work with falsy values - zero", () => {
    const result = $not(mockContext)("$count");
    expect(result).toBe(true);
  });

  it("should work with falsy values - empty string", () => {
    const result = $not(mockContext)("$emptyString");
    expect(result).toBe(true);
  });

  it("should work with falsy values - null", () => {
    const result = $not(mockContext)("$nullValue");
    expect(result).toBe(true);
  });

  it("should work with falsy values - undefined", () => {
    const result = $not(mockContext)("$undefinedValue");
    expect(result).toBe(true);
  });

  it("should work with literal true", () => {
    const result = $not(mockContext)(true);
    expect(result).toBe(false);
  });

  it("should work with literal false", () => {
    const result = $not(mockContext)(false);
    expect(result).toBe(true);
  });

  it("should work with nested expressions", () => {
    const result = $not(mockContext)({
      $and: [{ $eq: ["$status", "active"] }, { $gt: ["$balance", 100] }],
    });
    expect(result).toBe(false);
  });

  it("should work without context", () => {
    const result = $not()(true);
    expect(result).toBe(false);
  });

  it("should work without context with false", () => {
    const result = $not()(false);
    expect(result).toBe(true);
  });
});
