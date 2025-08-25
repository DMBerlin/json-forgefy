import { $toNumber } from "@operators/to-number.operator";

describe("toNumber", () => {
  it("should convert a string to number", () => {
    const value = "42";
    const result = $toNumber()(value);
    expect(result).toBe(42);
  });
  it("should convert a string to number", () => {
    const value = "42.9";
    const result = $toNumber()(value);
    expect(result).toBe(42.9);
  });
  it("should convert null to 0", () => {
    const value = null;
    const result = $toNumber()(value);
    expect(result).toBe(0);
  });
  it("should convert undefined to NaN", () => {
    const value = undefined;
    const result = $toNumber()(value);
    expect(result).toBeNaN();
  });
  it("should convert a boolean to number", () => {
    const value = true;
    // @ts-expect-error-next-line
    const result = $toNumber()(value);
    expect(result).toBe(1);
  });
  it("should convert a boolean to number", () => {
    const value = false;
    // @ts-expect-error-next-line
    const result = $toNumber()(value);
    expect(result).toBe(0);
  });
  it("should convert an object to NaN", () => {
    const value = {};
    // @ts-expect-error-next-line
    const result = $toNumber()(value);
    expect(result).toBeNaN();
  });
  it("should convert an array to NaN", () => {
    const value = [];
    // @ts-expect-error-next-line
    const result = $toNumber()(value);
    expect(result).toBe(0);
  });
});
