import { resolvePathOrExpression } from "./resolve-path-or-expression.common";
import { Expression } from "../types/expression.types";

describe("resolvePathOrExpression", () => {
  it("should return value by path", () => {
    const value = "$name";
    const ctx = {
      context: {
        name: "John",
      },
    };
    const result = resolvePathOrExpression(value, ctx);
    expect(result).toBe("John");
  });
  it("should return value by expression", () => {
    const value: Expression = { $toUpper: "$name" };
    const ctx = {
      context: {
        name: "John",
      },
    };
    const result = resolvePathOrExpression(value, ctx);
    expect(result).toBe("JOHN");
  });
  it("should return value", () => {
    const value = "John";
    const result = resolvePathOrExpression(value);
    expect(result).toBe("John");
  });
});
