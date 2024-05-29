import { $toString } from "../operators/to-string.operator";

describe("toString", () => {
  it("should convert a number to string", () => {
    const value = 42;
    const result = $toString()(value);
    expect(result).toBe("42");
  });
  it("should convert a number to string", () => {
    const value = 42.9;
    const result = $toString()(value);
    expect(result).toBe("42.9");
  });
  it("should convert null to its name as string", () => {
    const value = null;
    const result = $toString()(value);
    expect(result).toBe("null");
  });
  it("should convert undefined to its name as string", () => {
    const value = undefined;
    const result = $toString()(value);
    expect(result).toBe("undefined");
  });
});
