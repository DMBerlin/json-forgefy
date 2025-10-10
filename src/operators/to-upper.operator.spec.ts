import { $toUpper } from "@operators/to-upper.operator";

describe("toUpper", () => {
  it("should convert a string to uppercase", () => {
    const value = "hello";
    const result = $toUpper()(value);
    expect(result).toBe("HELLO");
  });

  it("should handle already uppercase strings", () => {
    expect($toUpper()("HELLO")).toBe("HELLO");
  });

  it("should handle mixed case", () => {
    expect($toUpper()("HeLLo WoRLd")).toBe("HELLO WORLD");
  });

  it("should handle empty string", () => {
    expect($toUpper()("")).toBe("");
  });

  it("should handle strings with numbers", () => {
    expect($toUpper()("hello123")).toBe("HELLO123");
  });
});
