import { $regexReplace } from "@operators/string/regex-replace.operator";

describe("RegexReplace operator", () => {
  describe("Basic pattern replacement", () => {
    it("should replace all occurrences matching the pattern", () => {
      const params = {
        input: "hello123world456",
        pattern: "\\d+",
        replacement: "",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("helloworld");
    });

    it("should replace single character patterns", () => {
      const params = {
        input: "a-b-c-d",
        pattern: "-",
        replacement: " ",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("a b c d");
    });

    it("should handle empty replacement string", () => {
      const params = {
        input: "remove123these456numbers",
        pattern: "\\d+",
        replacement: "",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("removethesenumbers");
    });
  });

  describe("Whitespace normalization", () => {
    it("should replace multiple spaces with single space", () => {
      const params = {
        input: "hello      world",
        pattern: "\\s+",
        replacement: " ",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("hello world");
    });

    it("should handle different numbers of spaces", () => {
      const params = {
        input: "hello         world",
        pattern: "\\s+",
        replacement: " ",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("hello world");
    });

    it("should normalize tabs and newlines", () => {
      const params = {
        input: "hello\t\t\nworld",
        pattern: "\\s+",
        replacement: " ",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("hello world");
    });

    it("should handle leading and trailing whitespace", () => {
      const params = {
        input: "  hello   world  ",
        pattern: "\\s+",
        replacement: " ",
      };
      const result = $regexReplace()(params);
      expect(result).toBe(" hello world ");
    });

    it("should trim and normalize combined", () => {
      const params = {
        input: "  hello   world  ",
        pattern: "^\\s+|\\s+$|\\s+(?=\\s)",
        replacement: "",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("hello world");
    });
  });

  describe("Complex patterns", () => {
    it("should handle word boundaries", () => {
      const params = {
        input: "Hello World! Hello there!",
        pattern: "\\bHello\\b",
        replacement: "Hi",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("Hi World! Hi there!");
    });

    it("should handle alternation patterns", () => {
      const params = {
        input: "Company Corporation Corp",
        pattern: "(Company|Corporation|Corp)",
        replacement: "Co.",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("Co. Co. Co.");
    });

    it("should handle character classes", () => {
      const params = {
        input: "abc123DEF456",
        pattern: "[a-z]+",
        replacement: "X",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("X123DEF456");
    });

    it("should handle negated character classes", () => {
      const params = {
        input: "keep123remove456keep",
        pattern: "[^0-9]+",
        replacement: "-",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("-123-456-");
    });

    it("should handle quantifiers", () => {
      const params = {
        input: "aaabbbccc",
        pattern: "a{2,}",
        replacement: "A",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("Abbbccc");
    });
  });

  describe("Flags support", () => {
    it("should use global flag by default", () => {
      const params = {
        input: "test test test",
        pattern: "test",
        replacement: "demo",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("demo demo demo");
    });

    it("should support case-insensitive flag", () => {
      const params = {
        input: "TeSt test TEST",
        pattern: "test",
        replacement: "demo",
        flags: "gi",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("demo demo demo");
    });

    it("should respect custom flags", () => {
      const params = {
        input: "Test test TEST",
        pattern: "test",
        replacement: "demo",
        flags: "g",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("Test demo TEST");
    });

    it("should handle multiline flag", () => {
      const params = {
        input: "line1\nline2\nline3",
        pattern: "^line",
        replacement: "row",
        flags: "gm",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("row1\nrow2\nrow3");
    });
  });

  describe("Edge cases", () => {
    it("should handle empty input string", () => {
      const params = {
        input: "",
        pattern: "\\d+",
        replacement: "X",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("");
    });

    it("should handle pattern with no matches", () => {
      const params = {
        input: "hello world",
        pattern: "\\d+",
        replacement: "X",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("hello world");
    });

    it("should handle special regex characters in replacement", () => {
      const params = {
        input: "test test",
        pattern: "test",
        replacement: "$&-replaced",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("test-replaced test-replaced");
    });

    it("should handle empty pattern", () => {
      const params = {
        input: "hello",
        pattern: "",
        replacement: "-",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("-h-e-l-l-o-");
    });

    it("should handle complex replacement scenarios", () => {
      const params = {
        input: "123.456.789-10",
        pattern: "[.\\-]",
        replacement: "",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("12345678910");
    });
  });

  describe("Real-world use cases", () => {
    it("should clean phone numbers", () => {
      const params = {
        input: "(555) 123-4567",
        pattern: "[\\s\\(\\)\\-]",
        replacement: "",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("5551234567");
    });

    it("should clean CPF/document numbers", () => {
      const params = {
        input: "123.456.789-10",
        pattern: "[.\\-]",
        replacement: "",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("12345678910");
    });

    it("should normalize user input", () => {
      const params = {
        input: "  John   Doe  ",
        pattern: "\\s+",
        replacement: " ",
      };
      const result = $regexReplace()(params);
      expect(result).toBe(" John Doe ");
    });

    it("should sanitize URLs", () => {
      const params = {
        input: "https://example.com/path?query=value",
        pattern: "https?://",
        replacement: "",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("example.com/path?query=value");
    });

    it("should remove HTML tags", () => {
      const params = {
        input: "<p>Hello <strong>World</strong></p>",
        pattern: "<[^>]+>",
        replacement: "",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("Hello World");
    });

    it("should normalize multiple punctuation", () => {
      const params = {
        input: "Hello!!!  World???",
        pattern: "[!?]{2,}",
        replacement: "!",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("Hello!  World!");
    });
  });

  describe("Performance and stress tests", () => {
    it("should handle large strings efficiently", () => {
      const largeString = "test ".repeat(1000);
      const params = {
        input: largeString,
        pattern: "\\s+",
        replacement: "-",
      };
      const result = $regexReplace()(params);
      expect(result).toContain("test-test");
      expect(result.length).toBeGreaterThan(0);
    });

    it("should handle many replacements", () => {
      const params = {
        input: "a".repeat(100),
        pattern: "a",
        replacement: "b",
      };
      const result = $regexReplace()(params);
      expect(result).toBe("b".repeat(100));
    });
  });
});
