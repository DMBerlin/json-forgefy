import { augmentSourceWithContext } from "./resolve-execution-context.common";
import { ExecutionContext } from "@interfaces/execution-context.interface";

describe("augmentSourceWithContext", () => {
  const source = {
    amount: 100,
    tax: 0.1,
    user: { name: "John" },
  };

  it("should return source as-is when no execution context provided", () => {
    const result = augmentSourceWithContext(source);
    expect(result).toEqual(source);
  });

  it("should return source as-is when execution context is undefined", () => {
    const result = augmentSourceWithContext(source, undefined);
    expect(result).toEqual(source);
  });

  it("should augment source with $current", () => {
    const ctx: ExecutionContext = {
      context: source,
      $current: { name: "Alice", age: 25 },
    };

    const result = augmentSourceWithContext(source, ctx);
    expect(result).toEqual({
      amount: 100,
      tax: 0.1,
      user: { name: "John" },
      current: { name: "Alice", age: 25 },
    });
  });

  it("should augment source with $index", () => {
    const ctx: ExecutionContext = {
      context: source,
      $index: 2,
    };

    const result = augmentSourceWithContext(source, ctx);
    expect(result).toEqual({
      amount: 100,
      tax: 0.1,
      user: { name: "John" },
      index: 2,
    });
  });

  it("should augment source with $accumulated", () => {
    const ctx: ExecutionContext = {
      context: source,
      $accumulated: 150,
    };

    const result = augmentSourceWithContext(source, ctx);
    expect(result).toEqual({
      amount: 100,
      tax: 0.1,
      user: { name: "John" },
      accumulated: 150,
    });
  });

  it("should augment source with all context variables", () => {
    const ctx: ExecutionContext = {
      context: source,
      $current: { name: "Bob", age: 30 },
      $index: 5,
      $accumulated: 200,
    };

    const result = augmentSourceWithContext(source, ctx);
    expect(result).toEqual({
      amount: 100,
      tax: 0.1,
      user: { name: "John" },
      current: { name: "Bob", age: 30 },
      index: 5,
      accumulated: 200,
    });
  });

  it("should handle falsy but defined context variables", () => {
    const ctx: ExecutionContext = {
      context: source,
      $current: { value: 0 },
      $index: 0,
      $accumulated: 0,
    };

    const result = augmentSourceWithContext(source, ctx);
    expect(result).toEqual({
      amount: 100,
      tax: 0.1,
      user: { name: "John" },
      current: { value: 0 },
      index: 0,
      accumulated: 0,
    });
  });

  it("should not add context variables when they are undefined", () => {
    const ctx: ExecutionContext = {
      context: source,
      $current: { name: "Charlie" },
      // $index and $accumulated are undefined
    };

    const result = augmentSourceWithContext(source, ctx);
    expect(result).toEqual({
      amount: 100,
      tax: 0.1,
      user: { name: "John" },
      current: { name: "Charlie" },
    });
    expect(result).not.toHaveProperty("index");
    expect(result).not.toHaveProperty("accumulated");
  });

  it("should not mutate the original source object", () => {
    const ctx: ExecutionContext = {
      context: source,
      $current: { name: "Dave" },
      $index: 1,
    };

    const originalSource = { ...source };
    augmentSourceWithContext(source, ctx);

    expect(source).toEqual(originalSource);
    expect(source).not.toHaveProperty("current");
    expect(source).not.toHaveProperty("index");
  });

  it("should handle empty source object", () => {
    const emptySource = {};
    const ctx: ExecutionContext = {
      context: emptySource,
      $current: { name: "Eve" },
      $index: 3,
    };

    const result = augmentSourceWithContext(emptySource, ctx);
    expect(result).toEqual({
      current: { name: "Eve" },
      index: 3,
    });
  });

  it("should handle complex nested context variables", () => {
    const ctx: ExecutionContext = {
      context: source,
      $current: {
        user: {
          profile: {
            name: "Frank",
            settings: { theme: "dark" },
          },
        },
      },
      $accumulated: { total: 500, count: 10 },
    };

    const result = augmentSourceWithContext(source, ctx);
    expect(result).toEqual({
      amount: 100,
      tax: 0.1,
      user: { name: "John" },
      current: {
        user: {
          profile: {
            name: "Frank",
            settings: { theme: "dark" },
          },
        },
      },
      accumulated: { total: 500, count: 10 },
    });
  });

  it("should override source properties if context variables have same name", () => {
    const sourceWithCurrent = {
      amount: 100,
      current: "original",
      index: "original",
    };

    const ctx: ExecutionContext = {
      context: sourceWithCurrent,
      $current: { name: "Override" },
      $index: 99,
    };

    const result = augmentSourceWithContext(sourceWithCurrent, ctx);
    expect(result).toEqual({
      amount: 100,
      current: { name: "Override" },
      index: 99,
    });
  });
});
