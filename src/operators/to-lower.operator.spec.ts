import { $toLower } from "@operators/to-lower.operator";

describe("toLowerCase", () => {
  it("should convert a string to lower case", () => {
    const value = "HELLO";
    const result = $toLower()(value);
    expect(result).toBe("hello");
  });
  it("should convert a string to lower case", () => {
    const value = "HeLLo";
    const result = $toLower()(value);
    expect(result).toBe("hello");
  });
  it("should convert a string to lower case", () => {
    const value = "hello";
    const result = $toLower()(value);
    expect(result).toBe("hello");
  });

  it("should handle empty string", () => {
    expect($toLower()("")).toBe("");
  });

  it("should handle strings with numbers", () => {
    expect($toLower()("HELLO123")).toBe("hello123");
  });
});
