import Forgefy from "..";

/**
 * Regression suite that locks in the immutability guarantee of `Forgefy.this`
 * across the full breadth of operator categories.
 *
 * The core invariant (introduced when fixing the blueprint-mutation bug) is:
 *
 *   1. A blueprint is never mutated by a transformation.
 *   2. The same blueprint can be reused across different payloads and always
 *      produces payload-specific results.
 *
 * Because these tests exercise many operator families at once, they act as a
 * safety net for new features: any change that reintroduces blueprint mutation
 * or shared-state leakage will fail here regardless of which operator is
 * touched.
 */
describe("Blueprint immutability & reuse (regression)", () => {
  const cases = [
    {
      name: "math operators",
      blueprint: {
        sum: { $add: ["$a", "$b"] },
        product: { $multiply: ["$a", "$b"] },
        rounded: { $round: { value: "$a", precision: 1 } },
      },
      payloads: [
        { input: { a: 2, b: 3 }, expected: { sum: 5, product: 6, rounded: 2 } },
        {
          input: { a: 10, b: 4 },
          expected: { sum: 14, product: 40, rounded: 10 },
        },
      ],
    },
    {
      name: "string operators",
      blueprint: {
        upper: { $toUpper: "$name" },
        greeting: { $concat: ["Hello, ", "$name"] },
      },
      payloads: [
        {
          input: { name: "john" },
          expected: { upper: "JOHN", greeting: "Hello, john" },
        },
        {
          input: { name: "mary" },
          expected: { upper: "MARY", greeting: "Hello, mary" },
        },
      ],
    },
    {
      name: "conditional operators",
      blueprint: {
        tier: {
          $cond: {
            if: { $gte: ["$score", 90] },
            then: "high",
            else: "low",
          },
        },
        label: {
          $switch: {
            branches: [
              { case: { $eq: ["$status", "A"] }, then: "active" },
              { case: { $eq: ["$status", "P"] }, then: "pending" },
            ],
            default: "unknown",
          },
        },
      },
      payloads: [
        {
          input: { score: 95, status: "A" },
          expected: { tier: "high", label: "active" },
        },
        {
          input: { score: 40, status: "P" },
          expected: { tier: "low", label: "pending" },
        },
      ],
    },
    {
      name: "array aggregation operators",
      blueprint: {
        total: { $sum: { values: "$items" } },
        average: { $avg: { values: "$items" } },
      },
      payloads: [
        { input: { items: [1, 2, 3] }, expected: { total: 6, average: 2 } },
        { input: { items: [10, 20] }, expected: { total: 30, average: 15 } },
      ],
    },
    {
      name: "array transformation operators",
      blueprint: {
        doubled: {
          $map: { input: "$items", expression: { $multiply: ["$current", 2] } },
        },
        big: {
          $filter: { input: "$items", condition: { $gt: ["$current", 2] } },
        },
      },
      payloads: [
        {
          input: { items: [1, 2, 3] },
          expected: { doubled: [2, 4, 6], big: [3] },
        },
        {
          input: { items: [5, 1, 8] },
          expected: { doubled: [10, 2, 16], big: [5, 8] },
        },
      ],
    },
    {
      name: "nested projections",
      blueprint: {
        user: {
          fullName: { $concat: ["$first", " ", "$last"] },
          contact: { email: "$email" },
        },
      },
      payloads: [
        {
          input: { first: "Ada", last: "Lovelace", email: "ada@x.com" },
          expected: {
            user: { fullName: "Ada Lovelace", contact: { email: "ada@x.com" } },
          },
        },
        {
          input: { first: "Alan", last: "Turing", email: "alan@x.com" },
          expected: {
            user: { fullName: "Alan Turing", contact: { email: "alan@x.com" } },
          },
        },
      ],
    },
  ];

  it.each(cases)(
    "should not mutate the blueprint for $name",
    ({ blueprint, payloads }) => {
      const snapshot = JSON.parse(JSON.stringify(blueprint));

      for (const { input } of payloads) {
        Forgefy.this(input, blueprint);
      }

      expect(blueprint).toEqual(snapshot);
    },
  );

  it.each(cases)(
    "should produce payload-specific results on blueprint reuse for $name",
    ({ blueprint, payloads }) => {
      for (const { input, expected } of payloads) {
        expect(Forgefy.this(input, blueprint)).toEqual(expected);
      }
    },
  );

  it.each(cases)(
    "should return a fresh object distinct from the blueprint for $name",
    ({ blueprint, payloads }) => {
      const result = Forgefy.this(payloads[0].input, blueprint);
      expect(result).not.toBe(blueprint);
    },
  );

  it("should not leak state between two independent reuses of the same blueprint", () => {
    const blueprint = { value: { $add: ["$n", 1] } };

    const first = Forgefy.this({ n: 1 }, blueprint);
    const second = Forgefy.this({ n: 100 }, blueprint);
    const third = Forgefy.this({ n: 1 }, blueprint);

    expect(first).toEqual({ value: 2 });
    expect(second).toEqual({ value: 101 });
    expect(third).toEqual({ value: 2 });
    expect(first).not.toBe(third);
  });
});
