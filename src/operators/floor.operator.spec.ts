import { $floor } from "../operators/floor.operator";

describe("floor operator", () => {
  it("should round down the input value", () => {
    const value = 2.9;
    const expected = 2;
    const result = $floor()(value);
    expect(result).toBe(expected);
  });
  it("should not change floating numbers", () => {
    const value = 2;
    const expected = 2;
    const result = $floor()(value);
    expect(result).toBe(expected);
  });
});
