import { isOperator } from "@helpers/is-operator.helper";

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

  it("should return false for null", () => {
    expect(isOperator(null)).toBe(false);
  });

  it("should return false for undefined", () => {
    expect(isOperator(undefined)).toBe(false);
  });

  it("should return false for non-object values", () => {
    expect(isOperator("string" as any)).toBe(false);
    expect(isOperator(123 as any)).toBe(false);
    expect(isOperator(true as any)).toBe(false);
  });

  it("should return false for empty object", () => {
    expect(isOperator({})).toBe(false);
  });

  it("should return false for object with multiple keys", () => {
    const obj = { $add: [1, 2], $multiply: [3, 4] };
    expect(isOperator(obj)).toBe(false);
  });

  it("should return true for various operators", () => {
    expect(isOperator({ $add: [1, 2] })).toBe(true);
    expect(isOperator({ $eq: [1, 2] })).toBe(true);
    expect(isOperator({ $gt: [1, 2] })).toBe(true);
    expect(isOperator({ $and: [true, false] })).toBe(true);
  });
});
