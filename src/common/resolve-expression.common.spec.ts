import { resolveExpression } from "./resolve-expression.common";
import { ExecutionContext } from "@interfaces/execution-context.interface";

describe("resolveExpression", () => {
  const source = {
    amount: 100,
    tax: 0.1,
    user: { name: "John", age: 30 },
    multiplier: 2,
    prefix: "User: ",
  };

  describe("Basic Operator Resolution", () => {
    it("should resolve simple arithmetic operators", () => {
      expect(resolveExpression<number>(source, { $add: [1, 2, 3] })).toBe(6);
      expect(resolveExpression<number>(source, { $multiply: [2, 3, 4] })).toBe(
        24,
      );
      expect(resolveExpression<number>(source, { $subtract: [10, 3] })).toBe(7);
      expect(resolveExpression<number>(source, { $divide: [20, 4] })).toBe(5);
    });

    it("should resolve operators with path arguments", () => {
      expect(
        resolveExpression<number>(source, { $multiply: ["$amount", 2] }),
      ).toBe(200);
      expect(
        resolveExpression<number>(source, { $add: ["$amount", "$amount"] }),
      ).toBe(200);
    });

    it("should resolve operators with nested paths", () => {
      expect(
        resolveExpression<string>(source, { $toString: "$user.name" }),
      ).toBe("John");
      expect(
        resolveExpression<number>(source, { $add: ["$user.age", 10] }),
      ).toBe(40);
    });

    it("should resolve string operators", () => {
      expect(
        resolveExpression<string>(source, { $concat: ["Hello", " ", "World"] }),
      ).toBe("Hello World");
      expect(resolveExpression<string>(source, { $toUpper: "hello" })).toBe(
        "HELLO",
      );
      expect(resolveExpression<string>(source, { $toLower: "WORLD" })).toBe(
        "world",
      );
    });

    it("should resolve comparison operators", () => {
      expect(resolveExpression<boolean>(source, { $gt: ["$amount", 50] })).toBe(
        true,
      );
      expect(resolveExpression<boolean>(source, { $lt: ["$amount", 50] })).toBe(
        false,
      );
      expect(
        resolveExpression<boolean>(source, { $eq: ["$amount", 100] }),
      ).toBe(true);
      expect(resolveExpression<boolean>(source, { $ne: ["$amount", 50] })).toBe(
        true,
      );
    });

    it("should resolve logical operators", () => {
      expect(resolveExpression<boolean>(source, { $and: [true, true] })).toBe(
        true,
      );
      expect(resolveExpression<boolean>(source, { $and: [true, false] })).toBe(
        false,
      );
      expect(resolveExpression<boolean>(source, { $or: [false, true] })).toBe(
        true,
      );
      expect(resolveExpression<boolean>(source, { $not: false })).toBe(true);
    });
  });

  describe("Nested Expressions", () => {
    it("should resolve nested operator expressions", () => {
      expect(
        resolveExpression<number>(source, {
          $add: ["$amount", { $multiply: ["$amount", "$tax"] }],
        }),
      ).toBe(110);
    });

    it("should resolve deeply nested expressions", () => {
      expect(
        resolveExpression<number>(source, {
          $add: [
            { $multiply: [2, 3] },
            { $subtract: [10, { $divide: [20, 4] }] },
          ],
        }),
      ).toBe(11);
    });

    it("should resolve conditional expressions with nested operators", () => {
      expect(
        resolveExpression<string>(source, {
          $cond: {
            if: { $gt: ["$amount", 50] },
            then: { $concat: ["High: ", { $toString: "$amount" }] },
            else: "Low",
          },
        }),
      ).toBe("High: 100");
    });

    it("should resolve switch expressions with nested operators", () => {
      expect(
        resolveExpression<string>(source, {
          $switch: {
            branches: [
              {
                case: { $gt: ["$amount", 200] },
                then: "Very High",
              },
              {
                case: { $gt: ["$amount", 50] },
                then: { $concat: ["High: ", { $toString: "$amount" }] },
              },
            ],
            default: "Low",
          },
        }),
      ).toBe("High: 100");
    });
  });

  describe("Execution Context", () => {
    const ctx: ExecutionContext = {
      context: source,
      $current: { name: "Alice", age: 25 },
      $index: 2,
      $accumulated: 150,
    };

    it("should resolve expressions with $current", () => {
      expect(
        resolveExpression<string>(
          source,
          { $concat: ["$prefix", "$current.name"] },
          ctx,
        ),
      ).toBe("User: Alice");
    });

    it("should resolve expressions with $index", () => {
      expect(
        resolveExpression<number>(source, { $add: ["$index", 10] }, ctx),
      ).toBe(12);
    });

    it("should resolve expressions with $accumulated", () => {
      expect(
        resolveExpression<number>(
          source,
          { $add: ["$accumulated", "$current.age"] },
          ctx,
        ),
      ).toBe(175);
    });

    it("should resolve complex expressions mixing context and regular paths", () => {
      expect(
        resolveExpression<number>(
          source,
          {
            $add: [
              "$amount",
              "$accumulated",
              { $multiply: ["$current.age", "$multiplier"] },
            ],
          },
          ctx,
        ),
      ).toBe(300);
    });

    it("should resolve conditional expressions with context variables", () => {
      expect(
        resolveExpression<string>(
          source,
          {
            $cond: {
              if: { $gt: ["$current.age", 20] },
              then: { $concat: ["Adult: ", "$current.name"] },
              else: { $concat: ["Minor: ", "$current.name"] },
            },
          },
          ctx,
        ),
      ).toBe("Adult: Alice");
    });

    it("should handle undefined context variables gracefully", () => {
      const partialCtx: ExecutionContext = {
        context: source,
        $current: { name: "Bob" },
      };

      expect(
        resolveExpression<string>(
          source,
          { $concat: ["Name: ", "$current.name"] },
          partialCtx,
        ),
      ).toBe("Name: Bob");

      expect(
        resolveExpression<boolean>(source, { $isNull: "$index" }, partialCtx),
      ).toBe(true);
    });

    it("should handle falsy but defined context variables", () => {
      const falsyCtx: ExecutionContext = {
        context: source,
        $current: { value: 0 },
        $index: 0,
        $accumulated: 0,
      };

      expect(
        resolveExpression<number>(
          source,
          { $add: ["$current.value", "$index", "$accumulated"] },
          falsyCtx,
        ),
      ).toBe(0);
    });
  });

  describe("Error Handling", () => {
    it("should return null for unknown operators", () => {
      expect(resolveExpression(source, { $unknownOp: [1, 2] })).toBeNull();
    });

    it("should return null for expressions with multiple operator keys", () => {
      expect(
        resolveExpression(source, { $add: [1, 2], $multiply: [3, 4] }),
      ).toBeNull();
    });

    it("should return null for expressions with no operator keys", () => {
      expect(resolveExpression(source, {})).toBeNull();
    });

    it("should handle operator execution errors gracefully", () => {
      expect(
        resolveExpression<number>(source, { $divide: ["$amount", 0] }),
      ).toBe(Infinity);
    });

    it("should return null when operator throws an error", () => {
      expect(
        resolveExpression(source, { $unknownOperator: ["test"] }),
      ).toBeNull();
    });
  });

  describe("Defensive Programming", () => {
    it("should handle primitive values (defensive)", () => {
      expect(resolveExpression(source, "hello" as any)).toBe("hello");
      expect(resolveExpression(source, 123 as any)).toBe(123);
      expect(resolveExpression(source, true as any)).toBe(true);
      expect(resolveExpression(source, false as any)).toBe(false);
    });

    it("should handle null and undefined (defensive)", () => {
      expect(resolveExpression(source, null as any)).toBe(null);
      expect(resolveExpression(source, undefined as any)).toBe(undefined);
    });

    it("should handle arrays (defensive)", () => {
      const result = resolveExpression(source, [
        1,
        { $add: [2, 3] },
        "$amount",
      ] as any);
      expect(result).toEqual([1, 5, "$amount"]);
    });
  });

  describe("Complex Real-World Scenarios", () => {
    it("should calculate tax and total", () => {
      expect(
        resolveExpression<number>(source, {
          $add: ["$amount", { $multiply: ["$amount", "$tax"] }],
        }),
      ).toBe(110);
    });

    it("should format user information", () => {
      expect(
        resolveExpression<string>(source, {
          $concat: [
            "$user.name",
            " is ",
            { $toString: "$user.age" },
            " years old",
          ],
        }),
      ).toBe("John is 30 years old");
    });

    it("should handle complex conditional logic", () => {
      expect(
        resolveExpression<string>(source, {
          $cond: {
            if: {
              $and: [{ $gt: ["$amount", 50] }, { $lt: ["$amount", 200] }],
            },
            then: "Medium",
            else: {
              $cond: {
                if: { $gte: ["$amount", 200] },
                then: "High",
                else: "Low",
              },
            },
          },
        }),
      ).toBe("Medium");
    });

    it("should handle array operations with context", () => {
      const arrayCtx: ExecutionContext = {
        context: source,
        $current: { price: 50, quantity: 3 },
        $index: 0,
        $accumulated: 0,
      };

      expect(
        resolveExpression<number>(
          source,
          {
            $add: [
              "$accumulated",
              { $multiply: ["$current.price", "$current.quantity"] },
            ],
          },
          arrayCtx,
        ),
      ).toBe(150);
    });

    it("should handle null coalescing", () => {
      const nullSource = { value: null, fallback: "default" };
      expect(
        resolveExpression<string>(nullSource, {
          $ifNull: ["$value", "$fallback"],
        }),
      ).toBe("default");
    });

    it("should handle type conversions", () => {
      expect(
        resolveExpression<number>(source, {
          $toNumber: { $toString: "$amount" },
        }),
      ).toBe(100);
    });
  });

  describe("Integration with resolveValue", () => {
    it("should resolve object arguments correctly", () => {
      expect(
        resolveExpression(source, {
          $cond: {
            if: true,
            then: {
              name: "$user.name",
              doubled: { $multiply: ["$amount", 2] },
            },
            else: { name: "unknown", doubled: 0 },
          },
        }),
      ).toEqual({ name: "John", doubled: 200 });
    });

    it("should resolve array arguments correctly", () => {
      expect(
        resolveExpression<string>(source, {
          $concat: ["$user.name", " - ", { $toString: "$amount" }],
        }),
      ).toBe("John - 100");
    });

    it("should resolve nested structures in arguments", () => {
      expect(
        resolveExpression(source, {
          $cond: {
            if: { $gt: ["$amount", 50] },
            then: {
              user: {
                name: "$user.name",
                total: { $multiply: ["$amount", 2] },
              },
            },
            else: null,
          },
        }),
      ).toEqual({
        user: {
          name: "John",
          total: 200,
        },
      });
    });
  });
});
