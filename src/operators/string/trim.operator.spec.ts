import { $trim } from "@operators/string/trim.operator";

describe("$trim operator", () => {
  const ctx = { context: {} };

  describe("basic functionality", () => {
    it("should remove whitespace from both ends", () => {
      expect($trim(ctx)({ input: "   hello   " })).toBe("hello");
    });

    it("should remove tabs from both ends", () => {
      expect($trim(ctx)({ input: "\t\thello\t\t" })).toBe("hello");
    });

    it("should remove newlines from both ends", () => {
      expect($trim(ctx)({ input: "\n\nhello\n\n" })).toBe("hello");
    });

    it("should remove carriage returns from both ends", () => {
      expect($trim(ctx)({ input: "\r\rhello\r\r" })).toBe("hello");
    });

    it("should remove grouped mixed default whitespace from both ends", () => {
      // Ordered space -> tab -> newline outward so each default char strips its run.
      const input = "   \t\t\n\nhello\n\n\t\t   ";
      expect($trim(ctx)({ input })).toBe("hello");
    });

    it("should not remove whitespace from the middle", () => {
      expect($trim(ctx)({ input: "  he  llo  " })).toBe("he  llo");
    });

    it("should handle a string with no surrounding whitespace", () => {
      expect($trim(ctx)({ input: "hello" })).toBe("hello");
    });

    it("should handle an empty string", () => {
      expect($trim(ctx)({ input: "" })).toBe("");
    });

    it("should handle a string of only whitespace", () => {
      expect($trim(ctx)({ input: "   \t\n\r" })).toBe("");
    });
  });

  describe("custom characters", () => {
    it("should remove custom characters from both ends", () => {
      expect($trim(ctx)({ input: "--hello--", chars: ["-"] })).toBe("hello");
    });

    it("should remove multiple custom characters from both ends", () => {
      // chars processed in array order; "-" is the outermost run, "_" the inner.
      expect($trim(ctx)({ input: "--__hello__--", chars: ["-", "_"] })).toBe(
        "hello",
      );
    });

    it("should trim each character in a single, order-dependent pass", () => {
      // Known limitation: $trim runs one pass per char in array order and does
      // not repeat until stable. Here "-" is processed first but is not at the
      // edge yet, so only "_" gets stripped. Pinned so a refactor is deliberate.
      expect($trim(ctx)({ input: "__--hello--__", chars: ["-", "_"] })).toBe(
        "--hello--",
      );
    });

    it("should only trim the specified characters, not whitespace", () => {
      // With custom chars, surrounding spaces are preserved.
      expect($trim(ctx)({ input: " -hello- ", chars: ["-"] })).toBe(
        " -hello- ",
      );
    });

    it("should escape special regex characters", () => {
      expect($trim(ctx)({ input: "...hello...", chars: ["."] })).toBe("hello");
    });

    it("should handle parentheses and brackets", () => {
      expect(
        $trim(ctx)({ input: "(([[hello]]))", chars: ["(", ")", "[", "]"] }),
      ).toBe("hello");
    });

    it("should return the input unchanged when chars is an empty array", () => {
      expect($trim(ctx)({ input: "  hello  ", chars: [] })).toBe("  hello  ");
    });
  });

  describe("Unicode support", () => {
    it("should trim single-code-unit custom characters fully", () => {
      // "•" (U+2022) is a single UTF-16 code unit, so the `+` quantifier works.
      expect($trim(ctx)({ input: "••hello••", chars: ["•"] })).toBe("hello");
    });

    it("should only strip one emoji per end for multi-code-unit chars (known limitation)", () => {
      // "🔥" is a surrogate pair; `🔥+` applies `+` to the trailing code unit,
      // so only one full emoji is removed at each end. Pinned; see ISSUES EC-5.
      expect($trim(ctx)({ input: "🔥🔥hello🔥🔥", chars: ["🔥"] })).toBe(
        "🔥hello🔥",
      );
    });

    it("should preserve unicode content while trimming whitespace", () => {
      expect($trim(ctx)({ input: "   こんにちは   " })).toBe("こんにちは");
    });
  });

  describe("input contract", () => {
    // Unlike $ltrim / $rtrim, $trim has no fallback/validation path: a
    // non-string input reaches String.prototype.replace and throws. This test
    // pins that behavior so a future refactor (e.g. unifying the trim family)
    // must consciously preserve or change it. See docs/ISSUES.md TC-1 / CS-1.
    it("should throw for non-string input (no fallback support)", () => {
      expect(() => $trim(ctx)({ input: 123 as unknown as string })).toThrow(
        /replace is not a function/,
      );
    });

    it("should expose the curried (ctx) => (params) => result shape", () => {
      expect(typeof $trim).toBe("function");
      expect(typeof $trim(ctx)).toBe("function");
    });

    it("should work without an execution context", () => {
      expect($trim()({ input: "  hello  " })).toBe("hello");
    });
  });
});
