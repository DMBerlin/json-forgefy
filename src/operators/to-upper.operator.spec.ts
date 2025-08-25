import { $toUpper } from "@operators/to-upper.operator";

describe("toUpper", () => {
  it("should convert a string to uppercase", () => {
    const value = "hello";
    const result = $toUpper()(value);
    expect(result).toBe("HELLO");
  });
});
