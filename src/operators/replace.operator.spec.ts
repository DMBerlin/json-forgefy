import { $replace } from "@operators/replace.operator";

describe("Replace operator", () => {
  it("should replace multiple search values with replacement", () => {
    const params = {
      input: "123.456.789-10",
      searchValues: [".", "-"],
      replacement: "",
    };
    const result = $replace()(params);
    expect(result).toBe("12345678910");
  });

  it("should replace multiple characters in phone number", () => {
    const params = {
      input: "(555) 123-4567",
      searchValues: ["(", ")", " ", "-"],
      replacement: "",
    };
    const result = $replace()(params);
    expect(result).toBe("5551234567");
  });

  it("should replace with a different replacement value", () => {
    const params = {
      input: "Hello World",
      searchValues: ["o", "l"],
      replacement: "X",
    };
    const result = $replace()(params);
    expect(result).toBe("HeXXX WXrXd");
  });

  it("should handle empty search values array", () => {
    const params = {
      input: "Hello World",
      searchValues: [],
      replacement: "X",
    };
    const result = $replace()(params);
    expect(result).toBe("Hello World");
  });

  it("should handle empty input string", () => {
    const params = {
      input: "",
      searchValues: ["a", "b"],
      replacement: "X",
    };
    const result = $replace()(params);
    expect(result).toBe("");
  });

  it("should handle special regex characters", () => {
    const params = {
      input: "test.()[]{}^$*+?|\\",
      searchValues: [
        ".",
        "(",
        ")",
        "[",
        "]",
        "{",
        "}",
        "^",
        "$",
        "*",
        "+",
        "?",
        "|",
        "\\",
      ],
      replacement: "",
    };
    const result = $replace()(params);
    expect(result).toBe("test");
  });

  it("should handle multiple occurrences of the same character", () => {
    const params = {
      input: "aaa bbb ccc",
      searchValues: ["a", "b", "c"],
      replacement: "X",
    };
    const result = $replace()(params);
    expect(result).toBe("XXX XXX XXX");
  });

  it("should handle whitespace normalization", () => {
    const params = {
      input: "Hello\t\n  World",
      searchValues: ["\t", "\n", "  "],
      replacement: " ",
    };
    const result = $replace()(params);
    expect(result).toBe("Hello  World");
  });

  it("should handle case-sensitive replacement", () => {
    const params = {
      input: "Hello World",
      searchValues: ["H", "W"],
      replacement: "X",
    };
    const result = $replace()(params);
    expect(result).toBe("Xello Xorld");
  });
});
