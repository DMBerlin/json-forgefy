import { forgefy } from "@core/forgefy.core";

describe("Math Operators E2E", () => {
  describe("$mod operator", () => {
    it("should calculate modulo in a transformation", () => {
      const source = { value: 10, divisor: 3 };
      const blueprint = {
        remainder: { $mod: { dividend: "$value", divisor: "$divisor" } },
        isEven: {
          $eq: [{ $mod: { dividend: "$value", divisor: 2 } }, 0],
        },
      };

      const result = forgefy(source, blueprint);

      expect(result).toEqual({
        remainder: 1,
        isEven: true,
      });
    });

    it("should use fallback for division by zero", () => {
      const source = { value: 10, divisor: 0 };
      const blueprint = {
        result: {
          $mod: { dividend: "$value", divisor: "$divisor", fallback: -1 },
        },
      };

      const result = forgefy(source, blueprint);

      expect(result).toEqual({
        result: -1,
      });
    });
  });

  describe("$pow operator", () => {
    it("should calculate power in a transformation", () => {
      const source = { base: 2, exponent: 3 };
      const blueprint = {
        result: { $pow: { base: "$base", exponent: "$exponent" } },
        squared: { $pow: { base: 5, exponent: 2 } },
      };

      const result = forgefy(source, blueprint);

      expect(result).toEqual({
        result: 8,
        squared: 25,
      });
    });

    it("should use fallback for invalid operations", () => {
      const source = { base: -1, exponent: 0.5 };
      const blueprint = {
        result: {
          $pow: { base: "$base", exponent: "$exponent", fallback: 0 },
        },
      };

      const result = forgefy(source, blueprint);

      expect(result).toEqual({
        result: 0,
      });
    });
  });

  describe("$sqrt operator", () => {
    it("should calculate square root in a transformation", () => {
      const source = { area: 16 };
      const blueprint = {
        side: { $sqrt: { value: "$area" } },
        distance: {
          $sqrt: {
            value: {
              $add: [
                { $pow: { base: 3, exponent: 2 } },
                { $pow: { base: 4, exponent: 2 } },
              ],
            },
          },
        },
      };

      const result = forgefy(source, blueprint);

      expect(result).toEqual({
        side: 4,
        distance: 5,
      });
    });

    it("should use fallback for negative numbers", () => {
      const source = { value: -1 };
      const blueprint = {
        result: { $sqrt: { value: "$value", fallback: 0 } },
      };

      const result = forgefy(source, blueprint);

      expect(result).toEqual({
        result: 0,
      });
    });
  });

  describe("$trunc operator", () => {
    it("should truncate numbers in a transformation", () => {
      const source = { positive: 4.9, negative: -4.9 };
      const blueprint = {
        truncatedPositive: { $trunc: { value: "$positive" } },
        truncatedNegative: { $trunc: { value: "$negative" } },
      };

      const result = forgefy(source, blueprint);

      expect(result).toEqual({
        truncatedPositive: 4,
        truncatedNegative: -4,
      });
    });
  });

  describe("Combined operators", () => {
    it("should work with conditional operators", () => {
      const source = { number: 17 };
      const blueprint = {
        type: {
          $cond: {
            if: { $eq: [{ $mod: { dividend: "$number", divisor: 2 } }, 0] },
            then: "even",
            else: "odd",
          },
        },
        squared: { $pow: { base: "$number", exponent: 2 } },
        squareRoot: {
          $sqrt: { value: { $pow: { base: "$number", exponent: 2 } } },
        },
        truncated: {
          $trunc: {
            value: {
              $divide: [{ $pow: { base: "$number", exponent: 2 } }, 10],
            },
          },
        },
      };

      const result = forgefy(source, blueprint);

      expect(result).toEqual({
        type: "odd",
        squared: 289,
        squareRoot: 17,
        truncated: 28,
      });
    });
  });
});
