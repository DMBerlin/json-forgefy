import { $toFixed } from "../operators/to-fixed.operator";

describe("ToFixed operator", () => {
  it("should return a function that returns a string with the number fixed to 1 decimal", () => {
    const value = 123.456;
    const expected = 123.4;
    expect($toFixed()({ value, precision: 1 })).toEqual(expected);
  });
  it("should return a function that returns a string with the number fixed to 2 decimals", () => {
    const value = 123.456;
    const expected = 123.45;
    expect($toFixed()({ value, precision: 2 })).toEqual(expected);
  });
  it("should return a function that returns a string with the number fixed to 3 decimals", () => {
    const value = 123.45678;
    const expected = 123.456;
    expect($toFixed()({ value, precision: 3 })).toEqual(expected);
  });
  it("should return the original value if its type is different from number", () => {
    const value = "123.456";
    const expected = "123.456";
    // @ts-expect-error-next-line
    expect($toFixed()({ value, precision: null })).toEqual(expected);
  });
  it("should use default precision when missing", () => {
    const value = 123.456;
    const expected = 123;
    // @ts-expect-error-next-line
    expect($toFixed()({ value })).toEqual(expected);
  });
});
