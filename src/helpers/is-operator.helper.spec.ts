import { isOperator } from "../helpers/is-operator.helper";

describe("isOperator Testing Suit", () => {
  it("should return true when object is an operator", () => {
    const obj = { $toString: 1 };
    expect(isOperator(obj)).toBe(true);
  });

  it("should return false when object has no operator key", () => {
    const obj = { toString: 1 };
    expect(isOperator(obj)).toBe(false);
  });

  it("should return false when operator does not exist", () => {
    const obj = { $nonExistingOperator: "some random value" };
    expect(isOperator(obj)).toBe(false);
  });
});
