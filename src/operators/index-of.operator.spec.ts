import { $indexOf } from "@operators/index-of.operator";

describe("$indexOf operator", () => {
  const payload = { context: { fallbackValue: -1 } };

  describe("basic functionality", () => {
    it("should find substring at the beginning", () => {
      const result = $indexOf(payload)({
        input: "Hello World",
        substring: "Hello",
      });
      expect(result).toBe(0);
    });

    it("should find substring in the middle", () => {
      const result = $indexOf(payload)({
        input: "Hello World",
        substring: "World",
      });
      expect(result).toBe(6);
    });

    it("should find substring at the end", () => {
      const result = $indexOf(payload)({
        input: "Hello World",
        substring: "ld",
      });
      expect(result).toBe(9);
    });

    it("should return -1 when substring not found", () => {
      const result = $indexOf(payload)({
        input: "Hello World",
        substring: "xyz",
      });
      expect(result).toBe(-1);
    });

    it("should find single character", () => {
      const result = $indexOf(payload)({
        input: "Hello World",
        substring: "o",
      });
      expect(result).toBe(4);
    });

    it("should handle empty substring", () => {
      const result = $indexOf(payload)({
        input: "Hello World",
        substring: "",
      });
      expect(result).toBe(0);
    });

    it("should handle empty input string", () => {
      const result = $indexOf(payload)({
        input: "",
        substring: "test",
      });
      expect(result).toBe(-1);
    });

    it("should be case-sensitive", () => {
      const result = $indexOf(payload)({
        input: "Hello World",
        substring: "hello",
      });
      expect(result).toBe(-1);
    });
  });

  describe("with start position", () => {
    it("should find substring from start position", () => {
      const result = $indexOf(payload)({
        input: "Hello Hello World",
        substring: "Hello",
        start: 1,
      });
      expect(result).toBe(6);
    });

    it("should return -1 if substring is before start position", () => {
      const result = $indexOf(payload)({
        input: "Hello World",
        substring: "Hello",
        start: 5,
      });
      expect(result).toBe(-1);
    });

    it("should handle start position at end of string", () => {
      const result = $indexOf(payload)({
        input: "Hello",
        substring: "o",
        start: 10,
      });
      expect(result).toBe(-1);
    });

    it("should handle start position of 0", () => {
      const result = $indexOf(payload)({
        input: "Hello World",
        substring: "Hello",
        start: 0,
      });
      expect(result).toBe(0);
    });

    it("should find multiple occurrences with different start positions", () => {
      const input = "test test test";
      const result1 = $indexOf(payload)({ input, substring: "test" });
      const result2 = $indexOf(payload)({
        input,
        substring: "test",
        start: 5,
      });
      const result3 = $indexOf(payload)({
        input,
        substring: "test",
        start: 10,
      });
      expect(result1).toBe(0);
      expect(result2).toBe(5);
      expect(result3).toBe(10);
    });
  });

  describe("Unicode support", () => {
    it("should find Unicode substring", () => {
      const result = $indexOf(payload)({
        input: "Hello こんにちは World",
        substring: "こんにちは",
      });
      expect(result).toBe(6);
    });

    it("should find emoji", () => {
      const result = $indexOf(payload)({
        input: "Hello 🔥 World",
        substring: "🔥",
      });
      expect(result).toBe(6);
    });

    it("should handle multiple emojis", () => {
      const result = $indexOf(payload)({
        input: "😀😁😂😃",
        substring: "😂",
      });
      // Emojis are multi-byte, so indexOf returns the byte position, not character position
      expect(result).toBe(4);
    });

    it("should find accented characters", () => {
      const result = $indexOf(payload)({
        input: "café résumé",
        substring: "résumé",
      });
      expect(result).toBe(5);
    });
  });

  describe("special characters", () => {
    it("should find special characters", () => {
      const result = $indexOf(payload)({
        input: "test@example.com",
        substring: "@",
      });
      expect(result).toBe(4);
    });

    it("should find punctuation", () => {
      const result = $indexOf(payload)({
        input: "Hello, World!",
        substring: ",",
      });
      expect(result).toBe(5);
    });

    it("should find whitespace", () => {
      const result = $indexOf(payload)({
        input: "Hello World",
        substring: " ",
      });
      expect(result).toBe(5);
    });

    it("should find newline characters", () => {
      const result = $indexOf(payload)({
        input: "Hello\nWorld",
        substring: "\n",
      });
      expect(result).toBe(5);
    });
  });

  describe("error handling", () => {
    it("should throw error for non-string input without fallback", () => {
      expect(() =>
        $indexOf(payload)({ input: 123 as any, substring: "test" }),
      ).toThrow("$indexOf expects a string input, received number");
    });

    it("should throw error for non-string substring without fallback", () => {
      expect(() =>
        $indexOf(payload)({ input: "test", substring: 123 as any }),
      ).toThrow("$indexOf expects a string substring, received number");
    });

    it("should use fallback for non-string input", () => {
      const result = $indexOf(payload)({
        input: 123 as any,
        substring: "test",
        fallback: -1,
      });
      expect(result).toBe(-1);
    });

    it("should resolve fallback from payload path", () => {
      const result = $indexOf(payload)({
        input: null as any,
        substring: "test",
        fallback: "$fallbackValue",
      });
      expect(result).toBe(-1);
    });

    it("should throw error when fallback is undefined", () => {
      expect(() =>
        $indexOf(payload)({
          input: 123 as any,
          substring: "test",
          fallback: undefined,
        }),
      ).toThrow("$indexOf expects a string input, received number");
    });

    it("should handle non-Error thrown values", () => {
      const problematicInput = {
        get input() {
          throw "string error";
        },
        substring: "test",
        fallback: -99,
      };
      const result = $indexOf(payload)(problematicInput as any);
      expect(result).toBe(-99);
    });

    it("should work with context provided", () => {
      const ctx = { context: { value: "test" } };
      const result = $indexOf(ctx)({
        input: "hello world",
        substring: "world",
      });
      expect(result).toBe(6);
    });

    it("should handle null context gracefully", () => {
      const ctx = { context: null as any };
      const result = $indexOf(ctx)({
        input: "hello world",
        substring: "world",
      });
      expect(result).toBe(6);
    });
  });

  describe("edge cases", () => {
    it("should handle very long strings", () => {
      const longString = "a".repeat(10000) + "needle" + "a".repeat(10000);
      const result = $indexOf(payload)({
        input: longString,
        substring: "needle",
      });
      expect(result).toBe(10000);
    });

    it("should handle substring longer than input", () => {
      const result = $indexOf(payload)({
        input: "short",
        substring: "very long substring",
      });
      expect(result).toBe(-1);
    });

    it("should handle identical input and substring", () => {
      const result = $indexOf(payload)({
        input: "test",
        substring: "test",
      });
      expect(result).toBe(0);
    });
  });
});
