import { resolveArgs } from "./resolve-args.common";
import { resolveExpression } from "./resolve-expression.common";
import { ExecutionContext } from "@interfaces/execution-context.interface";

describe("resolveArgs", () => {
  // Helper wrapper that always passes resolveExpression as the resolver
  const resolve = (
    args: any,
    source: Record<string, any>,
    executionContext?: ExecutionContext,
  ) => resolveArgs(args, source, executionContext, resolveExpression);

  const source = {
    amount: 100,
    tax: 0.1,
    user: {
      name: "John",
      age: 30,
    },
    items: [
      { id: 1, price: 10 },
      { id: 2, price: 20 },
    ],
  };

  describe("Primitives", () => {
    it("should return null as-is", () => {
      expect(resolve(null, source)).toBe(null);
    });

    it("should return undefined as-is", () => {
      expect(resolve(undefined, source)).toBe(undefined);
    });

    it("should return numbers as-is", () => {
      expect(resolve(42, source)).toBe(42);
      expect(resolve(0, source)).toBe(0);
      expect(resolve(-10, source)).toBe(-10);
      expect(resolve(3.14, source)).toBe(3.14);
    });

    it("should return booleans as-is", () => {
      expect(resolve(true, source)).toBe(true);
      expect(resolve(false, source)).toBe(false);
    });

    it("should return non-path strings as-is", () => {
      expect(resolve("hello", source)).toBe("hello");
      expect(resolve("", source)).toBe("");
      expect(resolve("user.name", source)).toBe("user.name");
    });
  });

  describe("Path Resolution", () => {
    it("should resolve simple paths", () => {
      expect(resolve("$amount", source)).toBe(100);
      expect(resolve("$tax", source)).toBe(0.1);
    });

    it("should resolve nested paths", () => {
      expect(resolve("$user.name", source)).toBe("John");
      expect(resolve("$user.age", source)).toBe(30);
    });

    it("should resolve array index paths", () => {
      expect(resolve("$items.0.price", source)).toBe(10);
      expect(resolve("$items.1.id", source)).toBe(2);
    });

    it("should return undefined for non-existent paths", () => {
      expect(resolve("$nonexistent", source)).toBeUndefined();
      expect(resolve("$user.nonexistent", source)).toBeUndefined();
    });
  });

  describe("Arrays", () => {
    it("should resolve arrays with primitives", () => {
      expect(resolve([1, 2, 3], source)).toEqual([1, 2, 3]);
      expect(resolve(["a", "b", "c"], source)).toEqual(["a", "b", "c"]);
    });

    it("should resolve arrays with paths", () => {
      expect(resolve(["$amount", "$tax"], source)).toEqual([100, 0.1]);
      expect(resolve(["$user.name", "$user.age"], source)).toEqual([
        "John",
        30,
      ]);
    });

    it("should resolve arrays with mixed values", () => {
      expect(resolve([1, "$amount", "hello", "$tax"], source)).toEqual([
        1,
        100,
        "hello",
        0.1,
      ]);
    });

    it("should resolve nested arrays", () => {
      expect(
        resolve(
          [
            [1, 2],
            ["$amount", "$tax"],
          ],
          source,
        ),
      ).toEqual([
        [1, 2],
        [100, 0.1],
      ]);
    });

    it("should resolve arrays with operator expressions", () => {
      expect(
        resolve([{ $add: [1, 2] }, { $multiply: [3, 4] }], source),
      ).toEqual([3, 12]);
    });

    it("should resolve arrays with nested expressions and paths", () => {
      expect(
        resolve(
          [
            "$amount",
            { $multiply: ["$amount", 2] },
            { $add: ["$amount", "$tax"] },
          ],
          source,
        ),
      ).toEqual([100, 200, 100.1]);
    });

    it("should handle empty arrays", () => {
      expect(resolve([], source)).toEqual([]);
    });
  });

  describe("Plain Objects", () => {
    it("should resolve objects with primitive values", () => {
      expect(resolve({ a: 1, b: "hello", c: true }, source)).toEqual({
        a: 1,
        b: "hello",
        c: true,
      });
    });

    it("should resolve objects with paths", () => {
      expect(
        resolve({ userName: "$user.name", userAge: "$user.age" }, source),
      ).toEqual({ userName: "John", userAge: 30 });
    });

    it("should resolve objects with mixed values", () => {
      expect(
        resolve(
          {
            literal: "hello",
            path: "$amount",
            number: 42,
          },
          source,
        ),
      ).toEqual({
        literal: "hello",
        path: 100,
        number: 42,
      });
    });

    it("should resolve nested objects", () => {
      expect(
        resolve(
          {
            user: {
              name: "$user.name",
              age: "$user.age",
            },
            amount: "$amount",
          },
          source,
        ),
      ).toEqual({
        user: {
          name: "John",
          age: 30,
        },
        amount: 100,
      });
    });

    it("should handle empty objects", () => {
      expect(resolve({}, source)).toEqual({});
    });
  });

  describe("Operator Expressions", () => {
    it("should resolve simple operator expressions", () => {
      expect(resolve({ $add: [1, 2, 3] }, source)).toBe(6);
      expect(resolve({ $multiply: [2, 3, 4] }, source)).toBe(24);
    });

    it("should resolve operator expressions with paths", () => {
      expect(resolve({ $multiply: ["$amount", 2] }, source)).toBe(200);
      expect(resolve({ $add: ["$amount", "$tax"] }, source)).toBe(100.1);
    });

    it("should resolve nested operator expressions", () => {
      expect(
        resolve(
          {
            $add: ["$amount", { $multiply: ["$amount", "$tax"] }],
          },
          source,
        ),
      ).toBe(110);
    });

    it("should resolve deeply nested operator expressions", () => {
      expect(
        resolve(
          {
            $add: [
              { $multiply: [2, 3] },
              { $subtract: [10, { $divide: [20, 4] }] },
            ],
          },
          source,
        ),
      ).toBe(11);
    });

    it("should resolve conditional expressions", () => {
      expect(
        resolve(
          {
            $cond: {
              if: { $gt: ["$amount", 50] },
              then: "high",
              else: "low",
            },
          },
          source,
        ),
      ).toBe("high");
    });

    it("should treat unknown operators as plain objects", () => {
      // Unknown operators are not recognized by isOperator, so they're treated as plain objects
      expect(resolve({ $unknownOp: [1, 2] }, source)).toEqual({
        $unknownOp: [1, 2],
      });
    });

    it("should return expression as-is when no resolver provided", () => {
      // When no resolver is provided, operator expressions are returned as-is
      expect(resolveArgs({ $add: [1, 2] }, source)).toEqual({ $add: [1, 2] });
    });
  });

  describe("Execution Context", () => {
    const ctx: ExecutionContext = {
      context: source,
      $current: { name: "Alice", age: 25 },
      $index: 2,
      $accumulated: 150,
    };

    it("should resolve $current paths", () => {
      expect(resolve("$current.name", source, ctx)).toBe("Alice");
      expect(resolve("$current.age", source, ctx)).toBe(25);
    });

    it("should resolve $index", () => {
      expect(resolve("$index", source, ctx)).toBe(2);
    });

    it("should resolve $accumulated", () => {
      expect(resolve("$accumulated", source, ctx)).toBe(150);
    });

    it("should resolve arrays with context variables", () => {
      expect(
        resolve(["$current.name", "$index", "$accumulated"], source, ctx),
      ).toEqual(["Alice", 2, 150]);
    });

    it("should resolve objects with context variables", () => {
      expect(
        resolve(
          {
            name: "$current.name",
            position: "$index",
            total: "$accumulated",
          },
          source,
          ctx,
        ),
      ).toEqual({
        name: "Alice",
        position: 2,
        total: 150,
      });
    });

    it("should resolve expressions with context variables", () => {
      expect(
        resolve(
          {
            $add: ["$accumulated", "$current.age"],
          },
          source,
          ctx,
        ),
      ).toBe(175);
    });

    it("should mix context variables with regular paths", () => {
      expect(
        resolve(
          {
            regularAmount: "$amount",
            contextName: "$current.name",
            sum: { $add: ["$amount", "$accumulated"] },
          },
          source,
          ctx,
        ),
      ).toEqual({
        regularAmount: 100,
        contextName: "Alice",
        sum: 250,
      });
    });

    it("should handle undefined context variables", () => {
      const partialCtx: ExecutionContext = {
        context: source,
        $current: { name: "Bob" },
      };

      expect(resolve("$current.name", source, partialCtx)).toBe("Bob");
      expect(resolve("$index", source, partialCtx)).toBeUndefined();
      expect(resolve("$accumulated", source, partialCtx)).toBeUndefined();
    });

    it("should handle falsy but defined context variables", () => {
      const falsyCtx: ExecutionContext = {
        context: source,
        $current: { value: 0 },
        $index: 0,
        $accumulated: 0,
      };

      expect(resolve("$current.value", source, falsyCtx)).toBe(0);
      expect(resolve("$index", source, falsyCtx)).toBe(0);
      expect(resolve("$accumulated", source, falsyCtx)).toBe(0);
    });
  });

  describe("Complex Scenarios", () => {
    it("should handle deeply nested mixed structures", () => {
      const complex = {
        users: [
          {
            name: "$user.name",
            total: { $multiply: ["$amount", 2] },
            nested: {
              value: { $add: ["$amount", 50] },
            },
          },
        ],
        summary: {
          count: 1,
          total: "$amount",
        },
      };

      expect(resolve(complex, source)).toEqual({
        users: [
          {
            name: "John",
            total: 200,
            nested: {
              value: 150,
            },
          },
        ],
        summary: {
          count: 1,
          total: 100,
        },
      });
    });

    it("should handle arrays of objects with expressions", () => {
      const arrayOfObjects = [
        { value: "$amount", doubled: { $multiply: ["$amount", 2] } },
        { value: "$tax", doubled: { $multiply: ["$tax", 2] } },
      ];

      expect(resolve(arrayOfObjects, source)).toEqual([
        { value: 100, doubled: 200 },
        { value: 0.1, doubled: 0.2 },
      ]);
    });

    it("should handle conditional expressions with nested objects", () => {
      const conditional = {
        $cond: {
          if: { $gt: ["$amount", 50] },
          then: {
            status: "high",
            value: { $multiply: ["$amount", 2] },
          },
          else: {
            status: "low",
            value: "$amount",
          },
        },
      };

      expect(resolve(conditional, source)).toEqual({
        status: "high",
        value: 200,
      });
    });

    it("should handle mixed arrays with expressions and paths", () => {
      expect(
        resolve(
          [
            1,
            "$amount",
            { $add: [2, 3] },
            ["$user.name", { $multiply: [4, 5] }],
          ],
          source,
        ),
      ).toEqual([1, 100, 5, ["John", 20]]);
    });

    it("should handle objects with array values containing expressions", () => {
      expect(
        resolve(
          {
            values: ["$amount", { $multiply: ["$amount", 2] }],
            user: "$user.name",
          },
          source,
        ),
      ).toEqual({
        values: [100, 200],
        user: "John",
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle special characters in object keys", () => {
      expect(
        resolve(
          {
            "key-with-dash": "$amount",
            "key.with.dot": "$user.name",
          },
          source,
        ),
      ).toEqual({
        "key-with-dash": 100,
        "key.with.dot": "John",
      });
    });

    it("should handle numeric object keys", () => {
      expect(
        resolve(
          {
            0: "$amount",
            1: "$tax",
          },
          source,
        ),
      ).toEqual({
        0: 100,
        1: 0.1,
      });
    });

    it("should handle very long paths", () => {
      const deepSource = {
        a: { b: { c: { d: { e: { f: "deep" } } } } },
      };
      expect(resolve("$a.b.c.d.e.f", deepSource)).toBe("deep");
    });

    it("should handle paths with null in the middle", () => {
      const nullSource = { a: { b: null } };
      expect(resolve("$a.b.c", nullSource)).toBeUndefined();
    });

    it("should handle paths with undefined in the middle", () => {
      const undefinedSource = { a: { b: undefined } };
      expect(resolve("$a.b.c", undefinedSource)).toBeUndefined();
    });

    it("should handle expressions that return null", () => {
      expect(
        resolve(
          {
            $cond: {
              if: false,
              then: "yes",
              else: null,
            },
          },
          source,
        ),
      ).toBeNull();
    });

    it("should handle expressions that return undefined", () => {
      expect(resolve("$nonexistent", source)).toBeUndefined();
    });
  });
});
