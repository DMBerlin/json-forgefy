import { ExecutionContext } from "@interfaces/execution-context.interface";
import { resolveExpressionWithContext } from "./execution-context.helper";

describe("Execution Context Helper", () => {
  describe("resolveExpressionWithContext", () => {
    const source = {
      users: [
        { name: "John", age: 30 },
        { name: "Jane", age: 25 },
        { name: "Bob", age: 35 },
      ],
      multiplier: 2,
      prefix: "User: ",
    };

    it("should resolve simple expressions with $current", () => {
      const executionContext: ExecutionContext = {
        context: source,
        $current: { name: "John", age: 30 },
        $index: 0,
      };

      const expression = { $concat: ["$prefix", "$current.name"] };
      const result = resolveExpressionWithContext<string>(
        source,
        expression,
        executionContext,
      );
      expect(result).toBe("User: John");
    });

    it("should resolve expressions with $index", () => {
      const executionContext: ExecutionContext = {
        context: source,
        $current: { name: "Jane", age: 25 },
        $index: 1,
      };

      const expression = { $add: ["$index", 10] };
      const result = resolveExpressionWithContext<number>(
        source,
        expression,
        executionContext,
      );
      expect(result).toBe(11);
    });

    it("should resolve expressions with $accumulated", () => {
      const executionContext: ExecutionContext = {
        context: source,
        $current: { name: "Bob", age: 35 },
        $accumulated: 55,
        $index: 2,
      };

      const expression = { $add: ["$accumulated", "$current.age"] };
      const result = resolveExpressionWithContext<number>(
        source,
        expression,
        executionContext,
      );
      expect(result).toBe(90);
    });

    it("should resolve complex conditional expressions", () => {
      const executionContext: ExecutionContext = {
        context: source,
        $current: { name: "John", age: 30 },
        $index: 0,
      };

      const expression = {
        $cond: {
          if: { $gt: ["$current.age", 25] },
          then: { $concat: ["Senior: ", "$current.name"] },
          else: { $concat: ["Junior: ", "$current.name"] },
        },
      };
      const result = resolveExpressionWithContext<string>(
        source,
        expression,
        executionContext,
      );
      expect(result).toBe("Senior: John");
    });

    it("should resolve switch expressions with context variables", () => {
      const executionContext: ExecutionContext = {
        context: source,
        $current: { name: "Jane", age: 25 },
        $index: 1,
      };

      const expression = {
        $switch: {
          branches: [
            { case: { $eq: ["$index", 0] }, then: "First" },
            { case: { $eq: ["$index", 1] }, then: "Second" },
            { case: { $eq: ["$index", 2] }, then: "Third" },
          ],
          default: "Other",
        },
      };
      const result = resolveExpressionWithContext<string>(
        source,
        expression,
        executionContext,
      );
      expect(result).toBe("Second");
    });

    it("should handle nested expressions with multiple context variables", () => {
      const executionContext: ExecutionContext = {
        context: source,
        $current: { name: "Bob", age: 35 },
        $accumulated: { total: 100, count: 2 },
        $index: 2,
      };

      const expression = {
        $cond: {
          if: { $gt: ["$current.age", "$accumulated.total"] },
          then: {
            $multiply: ["$current.age", "$multiplier"],
          },
          else: {
            $add: ["$accumulated.total", "$index"],
          },
        },
      };
      const result = resolveExpressionWithContext<number>(
        source,
        expression,
        executionContext,
      );
      expect(result).toBe(102); // 100 + 2, since 35 is not > 100
    });

    it("should handle arrays in expressions", () => {
      const executionContext: ExecutionContext = {
        context: source,
        $current: { name: "John", age: 30 },
        $index: 0,
      };

      const expression = {
        $concat: ["$current.name", " is ", { $toString: "$current.age" }],
      };
      const result = resolveExpressionWithContext<string>(
        source,
        expression,
        executionContext,
      );
      expect(result).toBe("John is 30");
    });

    it("should handle expressions without context variables", () => {
      const executionContext: ExecutionContext = {
        context: source,
        $current: { name: "John", age: 30 },
        $index: 0,
      };

      const expression = { $multiply: ["$multiplier", 5] };
      const result = resolveExpressionWithContext<number>(
        source,
        expression,
        executionContext,
      );
      expect(result).toBe(10);
    });

    it("should return null on expression errors", () => {
      const executionContext: ExecutionContext = {
        context: source,
        $current: { name: "John", age: 30 },
        $index: 0,
      };

      const expression = { $unknownOperator: ["$current.name"] };
      const result = resolveExpressionWithContext(
        source,
        expression,
        executionContext,
      );
      expect(result).toBeNull();
    });

    it("should handle primitive expressions", () => {
      const executionContext: ExecutionContext = {
        context: source,
        $current: { name: "John", age: 30 },
        $index: 0,
      };

      expect(
        resolveExpressionWithContext(source, "hello", executionContext),
      ).toBe("hello");
      expect(resolveExpressionWithContext(source, 42, executionContext)).toBe(
        42,
      );
      expect(resolveExpressionWithContext(source, true, executionContext)).toBe(
        true,
      );
      expect(
        resolveExpressionWithContext(source, null, executionContext),
      ).toBeNull();
    });

    it("should handle array expressions (arrays are returned as-is, not resolved)", () => {
      const executionContext: ExecutionContext = {
        context: source,
        $current: { name: "John", age: 30 },
        $index: 0,
      };

      // Note: resolveExpression doesn't resolve paths in top-level arrays
      // This is consistent with the existing behavior
      const expression = ["$current.name", "$current.age", "$index"];
      const result = resolveExpressionWithContext(
        source,
        expression,
        executionContext,
      );
      // Arrays are returned as-is without path resolution
      expect(result).toEqual(["$current.name", "$current.age", "$index"]);
    });

    it("should handle expressions that mix context variables with regular paths", () => {
      const executionContext: ExecutionContext = {
        context: source,
        $current: { name: "Jane", age: 25 },
        $index: 1,
      };

      const expression = {
        $concat: [
          "$prefix", // Regular path from source
          "$current.name", // Context variable
          " (",
          { $toString: "$multiplier" }, // Regular path from source
          "x age: ",
          { $toString: { $multiply: ["$current.age", "$multiplier"] } }, // Context + regular
          ")",
        ],
      };

      const result = resolveExpressionWithContext<string>(
        source,
        expression,
        executionContext,
      );
      expect(result).toBe("User: Jane (2x age: 50)");
    });

    it("should not pollute the original source object", () => {
      const executionContext: ExecutionContext = {
        context: source,
        $current: { name: "John", age: 30 },
        $index: 0,
      };

      const expression = { $concat: ["$prefix", "$current.name"] };
      resolveExpressionWithContext<string>(
        source,
        expression,
        executionContext,
      );

      // Verify original source is not modified
      expect(source).not.toHaveProperty("current");
      expect(source).not.toHaveProperty("index");
      expect(source).not.toHaveProperty("accumulated");
    });

    it("should handle deeply nested context variable paths", () => {
      const executionContext: ExecutionContext = {
        context: source,
        $current: {
          user: {
            profile: {
              name: "John",
              settings: { theme: "dark" },
            },
          },
        },
        $index: 5,
      };

      const expression = {
        $concat: [
          "$current.user.profile.name",
          " uses ",
          "$current.user.profile.settings.theme",
          " theme",
        ],
      };

      const result = resolveExpressionWithContext<string>(
        source,
        expression,
        executionContext,
      );
      expect(result).toBe("John uses dark theme");
    });

    it("should handle context variables with object values in $accumulated", () => {
      const executionContext: ExecutionContext = {
        context: source,
        $current: { name: "Bob", age: 35 },
        $accumulated: { total: 500, count: 5, average: 100 },
        $index: 2,
      };

      const expression = {
        $add: ["$accumulated.total", "$current.age"],
      };

      const result = resolveExpressionWithContext<number>(
        source,
        expression,
        executionContext,
      );
      expect(result).toBe(535);
    });
  });
});
