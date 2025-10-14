import { resolveExpression } from "@common/resolve-expression.common";
import { ExecutionContext } from "@interfaces/execution-context.interface";

describe("resolveExpression with ExecutionContext Integration", () => {
  const source = {
    users: [
      { name: "John", age: 30, city: "New York" },
      { name: "Jane", age: 25, city: "Boston" },
      { name: "Bob", age: 35, city: "Chicago" },
    ],
    multiplier: 2,
    prefix: "User: ",
  };

  it("should resolve expressions without execution context (backward compatibility)", () => {
    const expression = { $concat: ["$prefix", "Test"] };
    const result = resolveExpression<string>(source, expression);
    expect(result).toBe("User: Test");
  });

  it("should resolve expressions with execution context", () => {
    const executionContext: ExecutionContext = {
      context: source,
      $current: { name: "John", age: 30, city: "New York" },
      $index: 0,
    };

    const expression = { $concat: ["$prefix", "$current.name"] };
    const result = resolveExpression<string>(
      source,
      expression,
      executionContext,
    );
    expect(result).toBe("User: John");
  });

  it("should handle complex expressions with context variables", () => {
    const executionContext: ExecutionContext = {
      context: source,
      $current: { name: "Jane", age: 25, city: "Boston" },
      $index: 1,
    };

    const expression = {
      $cond: {
        if: { $gt: ["$current.age", 20] },
        then: {
          $concat: ["Adult: ", "$current.name", " from ", "$current.city"],
        },
        else: { $concat: ["Minor: ", "$current.name"] },
      },
    };

    const result = resolveExpression<string>(
      source,
      expression,
      executionContext,
    );
    expect(result).toBe("Adult: Jane from Boston");
  });

  it("should handle expressions with $accumulated in reduce context", () => {
    const executionContext: ExecutionContext = {
      context: source,
      $current: { name: "Bob", age: 35, city: "Chicago" },
      $accumulated: 55, // Sum of previous ages: 30 + 25
      $index: 2,
    };

    const expression = { $add: ["$accumulated", "$current.age"] };
    const result = resolveExpression<number>(
      source,
      expression,
      executionContext,
    );
    expect(result).toBe(90); // 55 + 35
  });

  it("should handle nested expressions with multiple context variables", () => {
    const executionContext: ExecutionContext = {
      context: source,
      $current: { name: "John", age: 30, city: "New York" },
      $index: 0,
    };

    const expression = {
      $switch: {
        branches: [
          {
            case: { $eq: ["$index", 0] },
            then: { $concat: ["First: ", "$current.name"] },
          },
          {
            case: { $eq: ["$index", 1] },
            then: { $concat: ["Second: ", "$current.name"] },
          },
        ],
        default: { $concat: ["Other: ", "$current.name"] },
      },
    };

    const result = resolveExpression<string>(
      source,
      expression,
      executionContext,
    );
    expect(result).toBe("First: John");
  });

  it("should handle expressions that mix context variables with regular paths", () => {
    const executionContext: ExecutionContext = {
      context: source,
      $current: { name: "Jane", age: 25, city: "Boston" },
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

    const result = resolveExpression<string>(
      source,
      expression,
      executionContext,
    );
    expect(result).toBe("User: Jane (2x age: 50)");
  });

  it("should handle array expressions with context variables", () => {
    const executionContext: ExecutionContext = {
      context: source,
      $current: { name: "Bob", age: 35, city: "Chicago" },
      $index: 2,
    };

    // Note: resolveExpression doesn't resolve paths in top-level arrays
    // This is consistent with the existing behavior
    const expression = [
      "$current.name",
      "$current.age",
      "$current.city",
      "$index",
    ];
    const result = resolveExpression(source, expression, executionContext);
    expect(result).toEqual([
      "$current.name",
      "$current.age",
      "$current.city",
      "$index",
    ]);
  });

  it("should return null for invalid expressions even with context", () => {
    const executionContext: ExecutionContext = {
      context: source,
      $current: { name: "John", age: 30 },
      $index: 0,
    };

    const expression = { $invalidOperator: ["$current.name"] };
    const result = resolveExpression(source, expression, executionContext);
    expect(result).toBeNull();
  });
});
