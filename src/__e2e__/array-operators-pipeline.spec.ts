import Forgefy from "..";

/**
 * End-to-end regression suite for array-transformation operators through the
 * public `Forgefy.this` API.
 *
 * These operators evaluate a per-element sub-expression (`expression` for $map /
 * $reduce, `condition` for $filter) that references the execution-context
 * variables `$current`, `$index` and `$accumulated`. The resolution pipeline
 * must therefore pass those sub-expressions through raw (deferred) while still
 * resolving the surrounding arguments such as `input` and `initialValue`.
 *
 * Previously these operators returned `null` through the public API because the
 * sub-expression was resolved eagerly before the per-element context existed.
 * This suite locks in the fixed behaviour and guards the deferred-argument
 * handling in resolveExpression.
 */
describe("Array operators through Forgefy.this (regression)", () => {
  describe("$map", () => {
    it("should apply an operator expression to each element", () => {
      const result = Forgefy.this(
        { items: [1, 2, 3] },
        {
          doubled: {
            $map: {
              input: "$items",
              expression: { $multiply: ["$current", 2] },
            },
          },
        },
      );
      expect(result).toEqual({ doubled: [2, 4, 6] });
    });

    it("should resolve a path sub-expression against $current", () => {
      const result = Forgefy.this(
        { users: [{ name: "Ada" }, { name: "Alan" }] },
        { names: { $map: { input: "$users", expression: "$current.name" } } },
      );
      expect(result).toEqual({ names: ["Ada", "Alan"] });
    });

    it("should expose $index inside the expression", () => {
      const result = Forgefy.this(
        { items: [10, 20, 30] },
        {
          positions: {
            $map: {
              input: "$items",
              expression: {
                value: "$current",
                position: { $add: ["$index", 1] },
              },
            },
          },
        },
      );
      expect(result).toEqual({
        positions: [
          { value: 10, position: 1 },
          { value: 20, position: 2 },
          { value: 30, position: 3 },
        ],
      });
    });

    it("should use the fallback when input is not an array", () => {
      const result = Forgefy.this(
        {},
        {
          safe: {
            $map: { input: "$missing", expression: "$current", fallback: [] },
          },
        },
      );
      expect(result).toEqual({ safe: [] });
    });

    it("should evaluate a nested aggregation operator per element", () => {
      const result = Forgefy.this(
        {
          groups: [
            [1, 2],
            [3, 4],
          ],
        },
        {
          sums: {
            $map: {
              input: "$groups",
              expression: { $sum: { values: "$current" } },
            },
          },
        },
      );
      expect(result).toEqual({ sums: [3, 7] });
    });
  });

  describe("$filter", () => {
    it("should keep elements matching a condition expression", () => {
      const result = Forgefy.this(
        { items: [1, 2, 3, 4] },
        {
          big: {
            $filter: { input: "$items", condition: { $gt: ["$current", 2] } },
          },
        },
      );
      expect(result).toEqual({ big: [3, 4] });
    });

    it("should filter objects using $current properties", () => {
      const result = Forgefy.this(
        {
          users: [
            { name: "Ada", age: 36 },
            { name: "Kid", age: 12 },
            { name: "Alan", age: 41 },
          ],
        },
        {
          adults: {
            $filter: {
              input: "$users",
              condition: { $gte: ["$current.age", 18] },
            },
          },
        },
      );
      expect(result).toEqual({
        adults: [
          { name: "Ada", age: 36 },
          { name: "Alan", age: 41 },
        ],
      });
    });
  });

  describe("$reduce", () => {
    it("should accumulate values across elements", () => {
      const result = Forgefy.this(
        { items: [1, 2, 3, 4] },
        {
          total: {
            $reduce: {
              input: "$items",
              initialValue: 0,
              expression: { $add: ["$accumulated", "$current"] },
            },
          },
        },
      );
      expect(result).toEqual({ total: 10 });
    });

    it("should expose $index alongside $accumulated and $current", () => {
      const result = Forgefy.this(
        { items: [10, 20, 30] },
        {
          weighted: {
            $reduce: {
              input: "$items",
              initialValue: 0,
              expression: {
                $add: [
                  "$accumulated",
                  { $multiply: ["$current", { $add: ["$index", 1] }] },
                ],
              },
            },
          },
        },
      );
      // 10*1 + 20*2 + 30*3 = 140
      expect(result).toEqual({ weighted: 140 });
    });

    it("should resolve initialValue from a path", () => {
      const result = Forgefy.this(
        { items: [1, 2, 3], start: 100 },
        {
          total: {
            $reduce: {
              input: "$items",
              initialValue: "$start",
              expression: { $add: ["$accumulated", "$current"] },
            },
          },
        },
      );
      expect(result).toEqual({ total: 106 });
    });
  });

  describe("malformed usage", () => {
    it("should return null when a deferred operator receives non-object args", () => {
      const result = Forgefy.this(
        { items: [1, 2, 3] },
        { bad: { $map: "not-an-object" as unknown as never } },
      );
      expect(result).toEqual({ bad: null });
    });
  });
});
