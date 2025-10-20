import { $replaceAll } from "@operators/string/replace-all.operator";

describe("$replaceAll operator", () => {
  const payload = { context: { fallbackValue: "fallback" } };

  describe("basic functionality", () => {
    it("should replace all occurrences", () => {
      const result = $replaceAll(payload)({
        input: "Hello Hello World",
        search: "Hello",
        replacement: "Hi",
      });
      expect(result).toBe("Hi Hi World");
    });

    it("should replace all single characters", () => {
      const result = $replaceAll(payload)({
        input: "test test test",
        search: "t",
        replacement: "T",
      });
      expect(result).toBe("TesT TesT TesT");
    });

    it("should replace with empty string", () => {
      const result = $replaceAll(payload)({
        input: "123-456-789",
        search: "-",
        replacement: "",
      });
      expect(result).toBe("123456789");
    });

    it("should replace with longer string", () => {
      const result = $replaceAll(payload)({
        input: "Hi Hi World",
        search: "Hi",
        replacement: "Hello",
      });
      expect(result).toBe("Hello Hello World");
    });

    it("should return original string if search not found", () => {
      const result = $replaceAll(payload)({
        input: "Hello World",
        search: "xyz",
        replacement: "abc",
      });
      expect(result).toBe("Hello World");
    });

    it("should handle empty input string", () => {
      const result = $replaceAll(payload)({
        input: "",
        search: "test",
        replacement: "abc",
      });
      expect(result).toBe("");
    });

    it("should be case-sensitive", () => {
      const result = $replaceAll(payload)({
        input: "Hello World",
        search: "hello",
        replacement: "Hi",
      });
      expect(result).toBe("Hello World");
    });
  });

  describe("multiple occurrences", () => {
    it("should replace all of many occurrences", () => {
      const result = $replaceAll(payload)({
        input: "aaa bbb aaa ccc aaa",
        search: "aaa",
        replacement: "XXX",
      });
      expect(result).toBe("XXX bbb XXX ccc XXX");
    });

    it("should replace all characters in repeated string", () => {
      const result = $replaceAll(payload)({
        input: "aaaa",
        search: "a",
        replacement: "b",
      });
      expect(result).toBe("bbbb");
    });

    it("should handle overlapping patterns correctly", () => {
      const result = $replaceAll(payload)({
        input: "aaaa",
        search: "aa",
        replacement: "b",
      });
      expect(result).toBe("bb");
    });

    it("should replace consecutive occurrences", () => {
      const result = $replaceAll(payload)({
        input: "test  test  test",
        search: "  ",
        replacement: " ",
      });
      expect(result).toBe("test test test");
    });
  });

  describe("special characters", () => {
    it("should replace all special characters", () => {
      const result = $replaceAll(payload)({
        input: "test@example@com",
        search: "@",
        replacement: ".",
      });
      expect(result).toBe("test.example.com");
    });

    it("should replace all punctuation", () => {
      const result = $replaceAll(payload)({
        input: "Hello, World, Test",
        search: ",",
        replacement: ";",
      });
      expect(result).toBe("Hello; World; Test");
    });

    it("should replace all whitespace", () => {
      const result = $replaceAll(payload)({
        input: "Hello World Test",
        search: " ",
        replacement: "_",
      });
      expect(result).toBe("Hello_World_Test");
    });

    it("should replace all newline characters", () => {
      const result = $replaceAll(payload)({
        input: "Hello\nWorld\nTest",
        search: "\n",
        replacement: " ",
      });
      expect(result).toBe("Hello World Test");
    });

    it("should handle regex special characters literally", () => {
      const result = $replaceAll(payload)({
        input: "test.example.com",
        search: ".",
        replacement: "_",
      });
      expect(result).toBe("test_example_com");
    });

    it("should handle parentheses", () => {
      const result = $replaceAll(payload)({
        input: "(test) (example) (com)",
        search: "(",
        replacement: "[",
      });
      expect(result).toBe("[test) [example) [com)");
    });
  });

  describe("Unicode support", () => {
    it("should replace all Unicode characters", () => {
      const result = $replaceAll(payload)({
        input: "Hello こんにちは World こんにちは",
        search: "こんにちは",
        replacement: "Hi",
      });
      expect(result).toBe("Hello Hi World Hi");
    });

    it("should replace all emoji", () => {
      const result = $replaceAll(payload)({
        input: "Hello 🔥 World 🔥 Test 🔥",
        search: "🔥",
        replacement: "fire",
      });
      expect(result).toBe("Hello fire World fire Test fire");
    });

    it("should replace all accented characters", () => {
      const result = $replaceAll(payload)({
        input: "café café café",
        search: "café",
        replacement: "coffee",
      });
      expect(result).toBe("coffee coffee coffee");
    });

    it("should handle complex Unicode", () => {
      const result = $replaceAll(payload)({
        input: "👨‍👩‍👧‍👦 family 👨‍👩‍👧‍👦 group 👨‍👩‍👧‍👦",
        search: "👨‍👩‍👧‍👦",
        replacement: "people",
      });
      expect(result).toBe("people family people group people");
    });
  });

  describe("practical use cases", () => {
    it("should clean phone numbers", () => {
      const result = $replaceAll(payload)({
        input: "(555) 123-4567",
        search: "-",
        replacement: "",
      });
      const result2 = $replaceAll(payload)({
        input: result,
        search: "(",
        replacement: "",
      });
      const result3 = $replaceAll(payload)({
        input: result2,
        search: ")",
        replacement: "",
      });
      const result4 = $replaceAll(payload)({
        input: result3,
        search: " ",
        replacement: "",
      });
      expect(result4).toBe("5551234567");
    });

    it("should normalize whitespace", () => {
      const result = $replaceAll(payload)({
        input: "Hello    World    Test",
        search: "    ",
        replacement: " ",
      });
      expect(result).toBe("Hello World Test");
    });

    it("should clean URLs", () => {
      const result = $replaceAll(payload)({
        input: "http://example.com http://test.com",
        search: "http://",
        replacement: "https://",
      });
      expect(result).toBe("https://example.com https://test.com");
    });
  });

  describe("error handling", () => {
    it("should throw error for non-string input without fallback", () => {
      expect(() =>
        $replaceAll(payload)({
          input: 123 as any,
          search: "test",
          replacement: "abc",
        }),
      ).toThrow("Expects a string input, received number");
    });

    it("should throw error for non-string search without fallback", () => {
      expect(() =>
        $replaceAll(payload)({
          input: "test",
          search: 123 as any,
          replacement: "abc",
        }),
      ).toThrow("Expects a string search, received number");
    });

    it("should throw error for non-string replacement without fallback", () => {
      expect(() =>
        $replaceAll(payload)({
          input: "test",
          search: "test",
          replacement: 123 as any,
        }),
      ).toThrow("Expects a string replacement, received number");
    });

    it("should use fallback for non-string input", () => {
      const result = $replaceAll(payload)({
        input: 123 as any,
        search: "test",
        replacement: "abc",
        fallback: "fallback",
      });
      expect(result).toBe("fallback");
    });

    it("should resolve fallback from payload path", () => {
      const result = $replaceAll(payload)({
        input: null as any,
        search: "test",
        replacement: "abc",
        fallback: "$fallbackValue",
      });
      expect(result).toBe("fallback");
    });

    it("should throw error when fallback is undefined", () => {
      expect(() =>
        $replaceAll(payload)({
          input: 123 as any,
          search: "test",
          replacement: "abc",
          fallback: undefined,
        }),
      ).toThrow("Expects a string input, received number");
    });

    it("should handle non-Error thrown values", () => {
      const problematicInput = {
        get input() {
          throw "string error";
        },
        search: "test",
        replacement: "abc",
        fallback: "recovered",
      };
      const result = $replaceAll(payload)(problematicInput as any);
      expect(result).toBe("recovered");
    });

    it("should work with context provided", () => {
      const ctx = { context: { value: "test" } };
      const result = $replaceAll(ctx)({
        input: "hello world world",
        search: "world",
        replacement: "there",
      });
      expect(result).toBe("hello there there");
    });

    it("should handle null context gracefully", () => {
      const ctx = { context: null as any };
      const result = $replaceAll(ctx)({
        input: "hello world world",
        search: "world",
        replacement: "there",
      });
      expect(result).toBe("hello there there");
    });

    it("should use split/join fallback when replaceAll is not available", () => {
      const originalReplaceAll = String.prototype.replaceAll;
      try {
        // Temporarily remove replaceAll to test fallback
        (String.prototype as any).replaceAll = undefined;
        const result = $replaceAll(payload)({
          input: "test test test",
          search: "test",
          replacement: "pass",
        });
        expect(result).toBe("pass pass pass");
      } finally {
        // Restore original method
        String.prototype.replaceAll = originalReplaceAll;
      }
    });
  });

  describe("edge cases", () => {
    it("should handle very long strings", () => {
      const longString =
        "needle " + "a".repeat(10000) + " needle " + "a".repeat(10000);
      const result = $replaceAll(payload)({
        input: longString,
        search: "needle",
        replacement: "FOUND",
      });
      expect(result).toBe(
        "FOUND " + "a".repeat(10000) + " FOUND " + "a".repeat(10000),
      );
    });

    it("should handle replacement longer than search", () => {
      const result = $replaceAll(payload)({
        input: "Hi Hi Hi",
        search: "Hi",
        replacement: "Hello World",
      });
      expect(result).toBe("Hello World Hello World Hello World");
    });

    it("should handle identical input and search", () => {
      const result = $replaceAll(payload)({
        input: "test",
        search: "test",
        replacement: "replaced",
      });
      expect(result).toBe("replaced");
    });

    it("should handle many replacements", () => {
      const input = "a".repeat(1000);
      const result = $replaceAll(payload)({
        input,
        search: "a",
        replacement: "b",
      });
      expect(result).toBe("b".repeat(1000));
    });
  });
});
