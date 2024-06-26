import { isValidObjectPath } from "./is-valid-object-path.helper";

describe("isValidObjectPath", () => {
  it('should return true if the value is a string and starts with "$" and is not an operator', () => {
    expect(isValidObjectPath("$foo")).toBe(true);
  });

  it("should return false if the value is not a string", () => {
    expect(isValidObjectPath(1 as unknown as string)).toBe(false);
  });

  it('should return false if the value does not start with "$"', () => {
    expect(isValidObjectPath("foo")).toBe(false);
  });

  it("should return false if the value is an operator", () => {
    expect(isValidObjectPath("$eq")).toBe(false);
  });
});
