import { isObject } from "../helpers/is-object.helper";

describe("isObject Testing Suit", () => {
  it("should return true if the value is an object", () => {
    expect(isObject({})).toBe(true);
  });

  it("should return false if the value is not an object", () => {
    expect(isObject([])).toBe(false);
    expect(isObject("")).toBe(false);
    expect(isObject(0)).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
  });
});
