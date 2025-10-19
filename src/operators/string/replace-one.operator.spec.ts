import { $replaceOne } from "@operators/string/replace-one.operator";

describe("$replaceOne operator", () => {
  const payload = { context: { fallbackValue: "fallback" } };

  describe("basic functionality", () => {
    it("should replace first occurrence only", () => {
      const result = $replaceOne(payload)({
        input: "Hello Hello World",
        search: "Hello",
        replacement: "Hi",
      });
      expect(result).toBe("Hi Hello World");
    });

    it("should replace single character", () => {
      const result = $replaceOne(payload)({
        input: "test test test",
        search: "t",
        replacement: "T",
      });
      expect(result).toBe("Test test test");
    });

    it("should replace with empty string", () => {
      const result = $replaceOne(payload)({
        input: "Hello World",
        search: "Hello ",
        replacement: "",
      });
      expect(result).toBe("World");
    });

    it("should replace with longer string", () => {
      const result = $replaceOne(payload)({
        input: "Hi World",
        search: "Hi",
        replacement: "Hello",
      });
      expect(result).toBe("Hello World");
    });

    it("should return original string if search not found", () => {
      const result = $replaceOne(payload)({
        input: "Hello World",
        search: "xyz",
        replacement: "abc",
      });
      expect(result).toBe("Hello World");
    });

    it("should handle empty search string", () => {
      const result = $replaceOne(payload)({
        input: "Hello",
        search: "",
        replacement: "X",
      });
      expect(result).toBe("XHello");
    });

    it("should handle empty input string", () => {
      const result = $replaceOne(payload)({
        input: "",
        search: "test",
        replacement: "abc",
      });
      expect(result).toBe("");
    });

    it("should be case-sensitive", () => {
      const result = $replaceOne(payload)({
        input: "Hello World",
        search: "hello",
        replacement: "Hi",
      });
      expect(result).toBe("Hello World");
    });
  });

  describe("multiple occurrences", () => {
    it("should only replace first of many occurrences", () => {
      const result = $replaceOne(payload)({
        input: "aaa bbb aaa ccc aaa",
        search: "aaa",
        replacement: "XXX",
      });
      expect(result).toBe("XXX bbb aaa ccc aaa");
    });

    it("should only replace first character in repeated string", () => {
      const result = $replaceOne(payload)({
        input: "aaaa",
        search: "a",
        replacement: "b",
      });
      expect(result).toBe("baaa");
    });

    it("should handle overlapping patterns", () => {
      const result = $replaceOne(payload)({
        input: "aaaa",
        search: "aa",
        replacement: "b",
      });
      expect(result).toBe("baa");
    });
  });

  describe("special characters", () => {
    it("should replace special characters", () => {
      const result = $replaceOne(payload)({
        input: "test@example.com",
        search: "@",
        replacement: " at ",
      });
      expect(result).toBe("test at example.com");
    });

    it("should replace punctuation", () => {
      const result = $replaceOne(payload)({
        input: "Hello, World, Test",
        search: ",",
        replacement: ";",
      });
      expect(result).toBe("Hello; World, Test");
    });

    it("should replace whitespace", () => {
      const result = $replaceOne(payload)({
        input: "Hello World Test",
        search: " ",
        replacement: "_",
      });
      expect(result).toBe("Hello_World Test");
    });

    it("should replace newline characters", () => {
      const result = $replaceOne(payload)({
        input: "Hello\nWorld\nTest",
        search: "\n",
        replacement: " ",
      });
      expect(result).toBe("Hello World\nTest");
    });

    it("should handle regex special characters literally", () => {
      const result = $replaceOne(payload)({
        input: "test.com",
        search: ".",
        replacement: "_",
      });
      expect(result).toBe("test_com");
    });
  });

  describe("Unicode support", () => {
    it("should replace Unicode characters", () => {
      const result = $replaceOne(payload)({
        input: "Hello こんにちは World こんにちは",
        search: "こんにちは",
        replacement: "Hi",
      });
      expect(result).toBe("Hello Hi World こんにちは");
    });

    it("should replace emoji", () => {
      const result = $replaceOne(payload)({
        input: "Hello 🔥 World 🔥",
        search: "🔥",
        replacement: "fire",
      });
      expect(result).toBe("Hello fire World 🔥");
    });

    it("should replace accented characters", () => {
      const result = $replaceOne(payload)({
        input: "café café",
        search: "café",
        replacement: "coffee",
      });
      expect(result).toBe("coffee café");
    });

    it("should handle complex Unicode", () => {
      const result = $replaceOne(payload)({
        input: "👨‍👩‍👧‍👦 family 👨‍👩‍👧‍👦",
        search: "👨‍👩‍👧‍👦",
        replacement: "group",
      });
      expect(result).toBe("group family 👨‍👩‍👧‍👦");
    });
  });

  describe("error handling", () => {
    it("should throw error for non-string input without fallback", () => {
      expect(() =>
        $replaceOne(payload)({
          input: 123 as any,
          search: "test",
          replacement: "abc",
        }),
      ).toThrow("Expects a string input, received number");
    });

    it("should throw error for non-string search without fallback", () => {
      expect(() =>
        $replaceOne(payload)({
          input: "test",
          search: 123 as any,
          replacement: "abc",
        }),
      ).toThrow("Expects a string search, received number");
    });

    it("should throw error for non-string replacement without fallback", () => {
      expect(() =>
        $replaceOne(payload)({
          input: "test",
          search: "test",
          replacement: 123 as any,
        }),
      ).toThrow("Expects a string replacement, received number");
    });

    it("should use fallback for non-string input", () => {
      const result = $replaceOne(payload)({
        input: 123 as any,
        search: "test",
        replacement: "abc",
        fallback: "fallback",
      });
      expect(result).toBe("fallback");
    });

    it("should resolve fallback from payload path", () => {
      const result = $replaceOne(payload)({
        input: null as any,
        search: "test",
        replacement: "abc",
        fallback: "$fallbackValue",
      });
      expect(result).toBe("fallback");
    });

    it("should throw error when fallback is undefined", () => {
      expect(() =>
        $replaceOne(payload)({
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
      const result = $replaceOne(payload)(problematicInput as any);
      expect(result).toBe("recovered");
    });

    it("should work with context provided", () => {
      const ctx = { context: { value: "test" } };
      const result = $replaceOne(ctx)({
        input: "hello world",
        search: "world",
        replacement: "there",
      });
      expect(result).toBe("hello there");
    });

    it("should handle null context gracefully", () => {
      const ctx = { context: null as any };
      const result = $replaceOne(ctx)({
        input: "hello world",
        search: "world",
        replacement: "there",
      });
      expect(result).toBe("hello there");
    });
  });

  describe("edge cases", () => {
    it("should handle very long strings", () => {
      const longString = "a".repeat(10000) + "needle" + "a".repeat(10000);
      const result = $replaceOne(payload)({
        input: longString,
        search: "needle",
        replacement: "FOUND",
      });
      expect(result).toBe("a".repeat(10000) + "FOUND" + "a".repeat(10000));
    });

    it("should handle replacement longer than search", () => {
      const result = $replaceOne(payload)({
        input: "Hi",
        search: "Hi",
        replacement: "Hello World",
      });
      expect(result).toBe("Hello World");
    });

    it("should handle identical input and search", () => {
      const result = $replaceOne(payload)({
        input: "test",
        search: "test",
        replacement: "replaced",
      });
      expect(result).toBe("replaced");
    });
  });
});
