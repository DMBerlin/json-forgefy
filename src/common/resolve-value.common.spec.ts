import { resolveValue } from "./resolve-value.common";
import { ExecutionContext } from "@interfaces/execution-context.interface";

describe("resolveValue", () => {
  const source = {
    name: "John",
    amount: 100,
    tax: 0.1,
    user: {
      profile: {
        name: "Jane",
        age: 25,
      },
    },
    items: [
      { id: 1, price: 10 },
      { id: 2, price: 20 },
    ],
  };

  describe("Primitives", () => {
    it("should return string primitives as-is", () => {
      expect(resolveValue("hello", source)).toBe("hello");
      expect(resolveValue("", source)).toBe("");
    });

    it("should return number primitives as-is", () => {
      expect(resolveValue(42, source)).toBe(42);
      expect(resolveValue(0, source)).toBe(0);
      expect(resolveValue(-10, source)).toBe(-10);
      expect(resolveValue(3.14, source)).toBe(3.14);
    });

    it("should return boolean primitives as-is", () => {
      expect(resolveValue(true, source)).toBe(true);
      expect(resolveValue(false, source)).toBe(false);
    });

    it("should return null as-is", () => {
      expect(resolveValue(null, source)).toBe(null);
    });

    it("should return undefined as-is", () => {
      expect(resolveValue(undefined, source)).toBe(undefined);
    });
  });

  describe("Path Resolution", () => {
    it("should resolve simple paths", () => {
      expect(resolveValue("$name", source)).toBe("John");
      expect(resolveValue("$amount", source)).toBe(100);
    });

    it("should resolve nested paths", () => {
      expect(resolveValue("$user.profile.name", source)).toBe("Jane");
      expect(resolveValue("$user.profile.age", source)).toBe(25);
    });

    it("should resolve array index paths", () => {
      expect(resolveValue("$items.0.price", source)).toBe(10);
      expect(resolveValue("$items.1.id", source)).toBe(2);
    });

    it("should return undefined for non-existent paths", () => {
      expect(resolveValue("$nonexistent", source)).toBeUndefined();
      expect(resolveValue("$user.nonexistent", source)).toBeUndefined();
    });

    it("should not resolve strings without $ prefix", () => {
      expect(resolveValue("name", source)).toBe("name");
      expect(resolveValue("user.profile.name", source)).toBe(
        "user.profile.name",
      );
    });
  });

  describe("Objects with Operator-like Keys (Not Resolved)", () => {
    // resolveValue does NOT resolve operator expressions
    // It treats them as plain objects and only resolves paths within them
    it("should treat operator-like objects as plain objects", () => {
      expect(resolveValue({ $add: [1, 2, 3] }, source)).toEqual({
        $add: [1, 2, 3],
      });
    });

    it("should resolve paths within operator-like objects", () => {
      expect(resolveValue({ $multiply: ["$amount", 2] }, source)).toEqual({
        $multiply: [100, 2],
      });
    });

    it("should handle nested structures with operator keys", () => {
      expect(
        resolveValue(
          {
            $cond: {
              if: "$amount",
              then: "high",
              else: "low",
            },
          },
          source,
        ),
      ).toEqual({
        $cond: {
          if: 100,
          then: "high",
          else: "low",
        },
      });
    });
  });

  describe("Arrays", () => {
    it("should resolve arrays with primitives", () => {
      expect(resolveValue([1, 2, 3], source)).toEqual([1, 2, 3]);
      expect(resolveValue(["a", "b", "c"], source)).toEqual(["a", "b", "c"]);
    });

    it("should resolve arrays with paths", () => {
      expect(resolveValue(["$name", "$amount"], source)).toEqual(["John", 100]);
    });

    it("should treat operator-like objects in arrays as plain objects", () => {
      expect(
        resolveValue([{ $add: [1, 2] }, { $multiply: [3, 4] }], source),
      ).toEqual([{ $add: [1, 2] }, { $multiply: [3, 4] }]);
    });

    it("should resolve arrays with mixed values", () => {
      expect(
        resolveValue([1, "$amount", { $add: [2, 3] }, "hello"], source),
      ).toEqual([1, 100, { $add: [2, 3] }, "hello"]);
    });

    it("should resolve nested arrays", () => {
      expect(
        resolveValue(
          [
            [1, 2],
            ["$name", "$amount"],
          ],
          source,
        ),
      ).toEqual([
        [1, 2],
        ["John", 100],
      ]);
    });

    it("should handle empty arrays", () => {
      expect(resolveValue([], source)).toEqual([]);
    });
  });

  describe("Plain Objects", () => {
    it("should resolve objects with primitive values", () => {
      expect(resolveValue({ a: 1, b: "hello" }, source)).toEqual({
        a: 1,
        b: "hello",
      });
    });

    it("should resolve objects with paths", () => {
      expect(
        resolveValue({ userName: "$name", userAmount: "$amount" }, source),
      ).toEqual({ userName: "John", userAmount: 100 });
    });

    it("should treat operator-like objects as plain objects", () => {
      expect(
        resolveValue(
          {
            sum: { $add: [1, 2] },
            product: { $multiply: [3, 4] },
          },
          source,
        ),
      ).toEqual({ sum: { $add: [1, 2] }, product: { $multiply: [3, 4] } });
    });

    it("should resolve nested objects", () => {
      expect(
        resolveValue(
          {
            user: {
              name: "$name",
              total: { $multiply: ["$amount", 2] },
            },
          },
          source,
        ),
      ).toEqual({
        user: {
          name: "John",
          total: { $multiply: [100, 2] },
        },
      });
    });

    it("should resolve objects with mixed values", () => {
      expect(
        resolveValue(
          {
            literal: "hello",
            path: "$name",
            expression: { $add: [1, 2] },
            nested: { value: "$amount" },
          },
          source,
        ),
      ).toEqual({
        literal: "hello",
        path: "John",
        expression: { $add: [1, 2] },
        nested: { value: 100 },
      });
    });

    it("should handle empty objects", () => {
      expect(resolveValue({}, source)).toEqual({});
    });
  });

  describe("Execution Context", () => {
    const ctx: ExecutionContext = {
      context: source,
      $current: { name: "Alice", age: 30 },
      $index: 2,
      $accumulated: 150,
    };

    it("should resolve $current paths", () => {
      expect(resolveValue("$current.name", source, ctx)).toBe("Alice");
      expect(resolveValue("$current.age", source, ctx)).toBe(30);
    });

    it("should resolve $index", () => {
      expect(resolveValue("$index", source, ctx)).toBe(2);
    });

    it("should resolve $accumulated", () => {
      expect(resolveValue("$accumulated", source, ctx)).toBe(150);
    });

    it("should resolve paths in operator-like objects with context variables", () => {
      expect(
        resolveValue({ $add: ["$accumulated", "$current.age"] }, source, ctx),
      ).toEqual({ $add: [150, 30] });
    });

    it("should resolve arrays with context variables", () => {
      expect(
        resolveValue(["$current.name", "$index", "$accumulated"], source, ctx),
      ).toEqual(["Alice", 2, 150]);
    });

    it("should resolve objects with context variables", () => {
      expect(
        resolveValue(
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

    it("should handle undefined context variables", () => {
      const partialCtx: ExecutionContext = {
        context: source,
        $current: { name: "Bob" },
      };

      expect(resolveValue("$current.name", source, partialCtx)).toBe("Bob");
      expect(resolveValue("$index", source, partialCtx)).toBeUndefined();
      expect(resolveValue("$accumulated", source, partialCtx)).toBeUndefined();
    });

    it("should handle falsy but defined context variables", () => {
      const falsyCtx: ExecutionContext = {
        context: source,
        $current: { value: 0 },
        $index: 0,
        $accumulated: 0,
      };

      expect(resolveValue("$current.value", source, falsyCtx)).toBe(0);
      expect(resolveValue("$index", source, falsyCtx)).toBe(0);
      expect(resolveValue("$accumulated", source, falsyCtx)).toBe(0);
    });

    it("should mix context variables with regular paths", () => {
      expect(
        resolveValue(
          {
            regularName: "$name",
            contextName: "$current.name",
            sum: { $add: ["$amount", "$accumulated"] },
          },
          source,
          ctx,
        ),
      ).toEqual({
        regularName: "John",
        contextName: "Alice",
        sum: { $add: [100, 150] },
      });
    });

    it("should handle deeply nested context variable paths", () => {
      const deepCtx: ExecutionContext = {
        context: source,
        $current: {
          user: {
            profile: {
              settings: { theme: "dark" },
            },
          },
        },
      };

      expect(
        resolveValue("$current.user.profile.settings.theme", source, deepCtx),
      ).toBe("dark");
    });
  });

  describe("Complex Scenarios", () => {
    it("should handle deeply nested mixed structures", () => {
      const complex = {
        users: [
          {
            name: "$name",
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

      expect(resolveValue(complex, source)).toEqual({
        users: [
          {
            name: "John",
            total: { $multiply: [100, 2] },
            nested: {
              value: { $add: [100, 50] },
            },
          },
        ],
        summary: {
          count: 1,
          total: 100,
        },
      });
    });

    it("should handle arrays of objects with operator-like structures", () => {
      const arrayOfObjects = [
        { value: "$amount", doubled: { $multiply: ["$amount", 2] } },
        { value: "$tax", doubled: { $multiply: ["$tax", 2] } },
      ];

      expect(resolveValue(arrayOfObjects, source)).toEqual([
        { value: 100, doubled: { $multiply: [100, 2] } },
        { value: 0.1, doubled: { $multiply: [0.1, 2] } },
      ]);
    });

    it("should handle operator-like structures with nested objects", () => {
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

      expect(resolveValue(conditional, source)).toEqual({
        $cond: {
          if: { $gt: [100, 50] },
          then: {
            status: "high",
            value: { $multiply: [100, 2] },
          },
          else: {
            status: "low",
            value: 100,
          },
        },
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle circular reference prevention (objects don't reference themselves)", () => {
      // This test ensures we don't have infinite loops
      const obj = { a: 1, b: { c: 2 } };
      expect(resolveValue(obj, source)).toEqual({ a: 1, b: { c: 2 } });
    });

    it("should handle special characters in object keys", () => {
      expect(
        resolveValue(
          { "key-with-dash": "$name", "key.with.dot": "$amount" },
          source,
        ),
      ).toEqual({ "key-with-dash": "John", "key.with.dot": 100 });
    });

    it("should handle numeric object keys", () => {
      expect(resolveValue({ 0: "$name", 1: "$amount" }, source)).toEqual({
        0: "John",
        1: 100,
      });
    });

    it("should handle very long paths", () => {
      const deepSource = {
        a: {
          b: { c: { d: { e: { f: { g: { h: { i: { j: "deep" } } } } } } } },
        },
      };
      expect(resolveValue("$a.b.c.d.e.f.g.h.i.j", deepSource)).toBe("deep");
    });

    it("should handle paths with null in the middle", () => {
      const nullSource = { a: { b: null } };
      expect(resolveValue("$a.b.c", nullSource)).toBeUndefined();
    });

    it("should handle paths with undefined in the middle", () => {
      const undefinedSource = { a: { b: undefined } };
      expect(resolveValue("$a.b.c", undefinedSource)).toBeUndefined();
    });
  });
});
