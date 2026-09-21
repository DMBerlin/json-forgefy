import Forgefy from "..";
import { UnknownOperatorError } from "@lib-types/error.types";

/**
 * End-to-end regression suite for strict mode (`{ strict: true }`) through the
 * public `Forgefy.this` API.
 *
 * These tests protect two guarantees:
 * 1. Default (lenient) behavior is unchanged — failing expressions and unknown
 *    operators resolve to `null` instead of throwing (backward compatibility).
 * 2. Strict mode surfaces the errors that lenient mode hides: unknown /
 *    misspelled operators, malformed expressions, and operator failures.
 */
describe("Forgefy strict mode (E2E)", () => {
  describe("Unknown operators", () => {
    const payload = { age: 30 };
    const blueprint = { total: { $addd: ["$age", 1] } };

    it("resolves unknown operators to null in lenient (default) mode", () => {
      expect(Forgefy.this(payload, blueprint)).toEqual({ total: null });
    });

    it("resolves unknown operators to null when strict is explicitly false", () => {
      expect(Forgefy.this(payload, blueprint, { strict: false })).toEqual({
        total: null,
      });
    });

    it("throws UnknownOperatorError for unknown operators in strict mode", () => {
      expect(() => Forgefy.this(payload, blueprint, { strict: true })).toThrow(
        UnknownOperatorError,
      );
    });

    it("throws for a misspelled top-level operator in strict mode", () => {
      expect(() =>
        Forgefy.this(
          { name: "john" },
          { upper: { $toupper: "$name" } },
          { strict: true },
        ),
      ).toThrow(UnknownOperatorError);
    });
  });

  describe("Operator failures", () => {
    it("resolves failing operators to null in lenient mode", () => {
      expect(
        Forgefy.this({ n: -1 }, { root: { $sqrt: { value: "$n" } } }),
      ).toEqual({ root: null });
    });

    it("propagates operator errors in strict mode", () => {
      expect(() =>
        Forgefy.this(
          { n: -1 },
          { root: { $sqrt: { value: "$n" } } },
          { strict: true },
        ),
      ).toThrow();
    });
  });

  describe("Nested and array contexts", () => {
    it("propagates strictness into nested expressions", () => {
      expect(() =>
        Forgefy.this(
          { age: 30 },
          { total: { $add: ["$age", { $addd: [1, 2] }] } },
          { strict: true },
        ),
      ).toThrow(UnknownOperatorError);
    });

    it("propagates strictness into $map per-element expressions", () => {
      expect(() =>
        Forgefy.this(
          { nums: [1, 2, 3] },
          {
            out: {
              $map: { input: "$nums", expression: { $addd: ["$current", 1] } },
            },
          },
          { strict: true },
        ),
      ).toThrow(UnknownOperatorError);
    });

    it("keeps $map lenient by default when a per-element expression fails", () => {
      expect(
        Forgefy.this(
          { nums: [1, 2, 3] },
          {
            out: {
              $map: { input: "$nums", expression: { $addd: ["$current", 1] } },
            },
          },
        ),
      ).toEqual({ out: [null, null, null] });
    });
  });

  describe("Valid blueprints", () => {
    it("produces the same result in strict and lenient mode", () => {
      const payload = { a: 2, b: 3 };
      const blueprint = { sum: { $add: ["$a", "$b"] } };
      const lenient = Forgefy.this(payload, blueprint);
      const strict = Forgefy.this(payload, blueprint, { strict: true });
      expect(strict).toEqual({ sum: 5 });
      expect(strict).toEqual(lenient);
    });
  });
});
