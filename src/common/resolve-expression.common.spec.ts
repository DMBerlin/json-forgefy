import { resolveExpression } from "./resolve-expression.common";

describe("ResolveExpression", () => {
  const source = { amount: 100, tax: 0.1, user: { name: "John" } };

  it("should resolve a simple operator expression", () => {
    const result = resolveExpression<number>(source, {
      $multiply: ["$amount", 2],
    });
    expect(result).toBe(200);
  });

  it("should handle primitive values", () => {
    expect(resolveExpression(source, "hello")).toBe("hello");
    expect(resolveExpression(source, 123)).toBe(123);
    expect(resolveExpression(source, true)).toBe(true);
    expect(resolveExpression(source, false)).toBe(false);
  });

  it("should handle null and undefined", () => {
    expect(resolveExpression(source, null)).toBe(null);
    expect(resolveExpression(source, undefined)).toBe(undefined);
  });

  it("should handle arrays", () => {
    const result = resolveExpression(source, [1, 2, "$amount"]);
    expect(result).toEqual([1, 2, "$amount"]); // Arrays are mapped through resolveExpression but paths aren't resolved in arrays
  });

  it("should handle arrays with nested expressions", () => {
    const result = resolveExpression(source, [1, { $add: [2, 3] }, "$amount"]);
    expect(result).toEqual([1, 5, "$amount"]); // Expressions are resolved but paths aren't
  });

  it("should return null for expressions with multiple keys", () => {
    const invalidExpression = { $add: [1, 2], $multiply: [3, 4] };
    expect(resolveExpression(source, invalidExpression)).toBe(null);
  });

  it("should return null for unknown operators", () => {
    const invalidExpression = { $unknownOperator: [1, 2] };
    expect(resolveExpression(source, invalidExpression)).toBe(null);
  });

  it("should return null for empty objects", () => {
    expect(resolveExpression(source, {})).toBe(null);
  });

  it("should handle nested expressions", () => {
    const result = resolveExpression<number>(source, {
      $add: ["$amount", { $multiply: ["$amount", "$tax"] }],
    });
    expect(result).toBe(110);
  });

  it("should handle operator errors gracefully", () => {
    // This should trigger an error in the operator execution
    const result = resolveExpression(source, {
      $divide: ["$amount", 0],
    });
    // Division by zero returns Infinity, not null
    expect(result).toBe(Infinity);
  });

  it("should resolve paths in arguments", () => {
    const result = resolveExpression<string>(source, {
      $toString: "$amount",
    });
    expect(result).toBe("100");
  });

  it("should resolve nested paths", () => {
    const result = resolveExpression<string>(source, {
      $toString: "$user.name",
    });
    expect(result).toBe("John");
  });

  it("should handle objects with nested expressions", () => {
    const result = resolveExpression(source, {
      $cond: {
        if: { $gt: ["$amount", 50] },
        then: "high",
        else: "low",
      },
    });
    expect(result).toBe("high");
  });

  it("should handle null arguments in resolveArgs", () => {
    const result = resolveExpression(source, {
      $ifNull: [null, "default"],
    });
    expect(result).toBe("default");
  });

  it("should handle undefined arguments in resolveArgs", () => {
    const result = resolveExpression(source, {
      $ifNull: [undefined, "default"],
    });
    expect(result).toBe("default");
  });

  it("should handle non-path strings", () => {
    const result = resolveExpression(source, {
      $concat: ["hello", " ", "world"],
    });
    expect(result).toBe("hello world");
  });

  it("should handle nested objects without operators", () => {
    const result = resolveExpression(source, {
      $cond: {
        if: true,
        then: { value: "$amount" },
        else: { value: 0 },
      },
    });
    expect(result).toEqual({ value: 100 });
  });

  it("should handle primitive number arguments", () => {
    const result = resolveExpression(source, {
      $add: [1, 2, 3],
    });
    expect(result).toBe(6);
  });

  it("should handle boolean arguments", () => {
    const result = resolveExpression(source, {
      $and: [true, false],
    });
    expect(result).toBe(false);
  });
});
