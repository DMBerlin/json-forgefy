import { $concat } from "@operators/concat.operator";

describe("Concat operator", () => {
  it("should concatenate all strings", () => {
    const strings = ["Hello", " ", "world", "!"];
    const result = $concat()(strings);
    expect(result).toBe("Hello world!");
  });
  it("should return an empty string if no strings are provided", () => {
    const strings = [];
    const result = $concat()(strings);
    expect(result).toBe("");
  });
  it("should return the same string if only one string is provided", () => {
    const strings = ["Hello"];
    const result = $concat()(strings);
    expect(result).toBe("Hello");
  });
});
