import { $rtrim } from "@operators/string/rtrim.operator";

describe("$rtrim operator", () => {
  const payload = { context: { fallbackValue: "fallback" } };

  describe("basic functionality", () => {
    it("should remove whitespace from the end of a string", () => {
      const result = $rtrim(payload)({ input: "hello   " });
      expect(result).toBe("hello");
    });

    it("should remove tabs from the end", () => {
      const result = $rtrim(payload)({ input: "hello\t\t" });
      expect(result).toBe("hello");
    });

    it("should remove newlines from the end", () => {
      const result = $rtrim(payload)({ input: "hello\n\n" });
      expect(result).toBe("hello");
    });

    it("should remove mixed whitespace from the end", () => {
      const result = $rtrim(payload)({ input: "hello \t\n\r" });
      expect(result).toBe("hello");
    });

    it("should not remove whitespace from the start", () => {
      const result = $rtrim(payload)({ input: "   hello   " });
      expect(result).toBe("   hello");
    });

    it("should handle string with no trailing whitespace", () => {
      const result = $rtrim(payload)({ input: "hello" });
      expect(result).toBe("hello");
    });

    it("should handle empty string", () => {
      const result = $rtrim(payload)({ input: "" });
      expect(result).toBe("");
    });

    it("should handle string with only whitespace", () => {
      const result = $rtrim(payload)({ input: "   " });
      expect(result).toBe("");
    });
  });

  describe("custom characters", () => {
    it("should remove custom characters from the end", () => {
      const result = $rtrim(payload)({ input: "hello---", chars: ["-"] });
      expect(result).toBe("hello");
    });

    it("should remove multiple custom characters", () => {
      const result = $rtrim(payload)({
        input: "hello___---",
        chars: ["_", "-"],
      });
      expect(result).toBe("hello");
    });

    it("should remove custom characters but not whitespace", () => {
      const result = $rtrim(payload)({
        input: "hello ---",
        chars: ["-"],
      });
      expect(result).toBe("hello ");
    });

    it("should handle special regex characters", () => {
      const result = $rtrim(payload)({
        input: "hello...***",
        chars: [".", "*"],
      });
      expect(result).toBe("hello");
    });

    it("should handle parentheses and brackets", () => {
      const result = $rtrim(payload)({
        input: "hello((([[[",
        chars: ["(", "["],
      });
      expect(result).toBe("hello");
    });
  });

  describe("Unicode support", () => {
    it("should handle Unicode characters", () => {
      const result = $rtrim(payload)({ input: "こんにちは   " });
      expect(result).toBe("こんにちは");
    });

    it("should remove Unicode characters when specified", () => {
      const result = $rtrim(payload)({
        input: "hello🔥🔥",
        chars: ["🔥"],
      });
      expect(result).toBe("hello");
    });

    it("should handle emoji and special characters", () => {
      const result = $rtrim(payload)({
        input: "test😀😀",
        chars: ["😀"],
      });
      expect(result).toBe("test");
    });

    it("should handle accented characters", () => {
      const result = $rtrim(payload)({ input: "café   " });
      expect(result).toBe("café");
    });
  });

  describe("error handling", () => {
    it("should throw error for non-string input without fallback", () => {
      expect(() => $rtrim(payload)({ input: 123 as any })).toThrow(
        "Expects a string input, received number",
      );
    });

    it("should use fallback for non-string input", () => {
      const result = $rtrim(payload)({
        input: 123 as any,
        fallback: "fallback",
      });
      expect(result).toBe("fallback");
    });

    it("should resolve fallback from payload path", () => {
      const result = $rtrim(payload)({
        input: null as any,
        fallback: "$fallbackValue",
      });
      expect(result).toBe("fallback");
    });

    it("should use fallback for undefined input", () => {
      const result = $rtrim(payload)({
        input: undefined as any,
        fallback: "default",
      });
      expect(result).toBe("default");
    });

    it("should throw error when fallback is undefined", () => {
      expect(() =>
        $rtrim(payload)({
          input: 123 as any,
          fallback: undefined,
        }),
      ).toThrow("Expects a string input, received number");
    });

    it("should handle non-Error thrown values", () => {
      const problematicInput = {
        get input() {
          throw "string error";
        },
        fallback: "recovered",
      };
      const result = $rtrim(payload)(problematicInput as any);
      expect(result).toBe("recovered");
    });

    it("should work with context provided", () => {
      const ctx = { context: { value: "test" } };
      const result = $rtrim(ctx)({ input: "hello  " });
      expect(result).toBe("hello");
    });

    it("should handle null context gracefully", () => {
      const ctx = { context: null as any };
      const result = $rtrim(ctx)({ input: "hello  " });
      expect(result).toBe("hello");
    });
  });

  describe("edge cases", () => {
    it("should handle very long strings", () => {
      const longString = "hello" + " ".repeat(1000);
      const result = $rtrim(payload)({ input: longString });
      expect(result).toBe("hello");
    });

    it("should handle strings with only the characters to trim", () => {
      const result = $rtrim(payload)({ input: "-----", chars: ["-"] });
      expect(result).toBe("");
    });

    it("should handle mixed content", () => {
      const result = $rtrim(payload)({
        input: "---hello---world---",
        chars: ["-"],
      });
      expect(result).toBe("---hello---world");
    });
  });
});
