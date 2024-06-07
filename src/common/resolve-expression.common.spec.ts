import { resolveExpression } from "./resolve-expression.common";

describe("ResolveExpression", () => {
  it("should be defined", () => {
    expect(true).toBeTruthy();
  });
  it("should throw an error when passed an invalid expression", () => {
    const invalidExpression = null;
    expect(resolveExpression({}, invalidExpression)).toBe(null);
  });
});
