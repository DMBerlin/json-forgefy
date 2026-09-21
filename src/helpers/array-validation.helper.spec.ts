import {
  validateArrayOperatorParams,
  validateArrayInput,
  validateNumberInput,
  filterNumeric,
} from "./array-validation.helper";
import {
  ArrayOperatorInputError,
  MissingOperatorParameterError,
} from "@lib-types/error.types";

describe("array-validation.helper", () => {
  describe("validateArrayOperatorParams", () => {
    describe("valid params", () => {
      it("should return params when all required fields are present", () => {
        const params = { input: [1, 2, 3], expression: "$current" };
        // @ts-expect-error - test case
        const result = validateArrayOperatorParams(params, "$map", [
          "input",
          "expression",
        ]);
        expect(result).toBe(params);
      });

      it("should return params with optional fields", () => {
        const params = {
          input: [1, 2, 3],
          expression: "$current",
          fallback: [],
        };
        const result = validateArrayOperatorParams(params, "$map", [
          "input",
          "expression",
        ]);
        expect(result).toBe(params);
      });

      it("should return params with single required field", () => {
        const params = { values: [1, 2, 3] };
        // @ts-expect-error - test case
        const result = validateArrayOperatorParams(params, "$sum", ["values"]);
        expect(result).toBe(params);
      });
    });

    describe("missing fields with fallback", () => {
      it("should return params when missing required field but has fallback", () => {
        const params = { expression: "$current", fallback: [] } as any;
        const result = validateArrayOperatorParams(params, "$map", [
          "input",
          "expression",
        ]);
        expect(result).toBe(params);
      });

      it("should return params when missing multiple fields but has fallback", () => {
        const params = { fallback: "default" } as any;
        const result = validateArrayOperatorParams(params, "$map", [
          "input",
          "expression",
        ]);
        expect(result).toBe(params);
      });

      it("should return params when field is undefined but has fallback", () => {
        const params = {
          input: [1, 2, 3],
          expression: undefined,
          fallback: [],
        } as any;
        const result = validateArrayOperatorParams(params, "$map", [
          "input",
          "expression",
        ]);
        expect(result).toBe(params);
      });
    });

    describe("malformed params without fallback", () => {
      it("should throw error when params is null", () => {
        expect(() => {
          validateArrayOperatorParams(null as any, "$map", [
            "input",
            "expression",
          ]);
        }).toThrow(MissingOperatorParameterError);
      });

      it("should throw error when params is undefined", () => {
        expect(() => {
          validateArrayOperatorParams(undefined as any, "$map", [
            "input",
            "expression",
          ]);
        }).toThrow(MissingOperatorParameterError);
      });

      it("should throw error when params is not an object", () => {
        expect(() => {
          validateArrayOperatorParams("not object" as any, "$map", [
            "input",
            "expression",
          ]);
        }).toThrow(MissingOperatorParameterError);
      });

      it("should throw error when required field is missing", () => {
        expect(() => {
          validateArrayOperatorParams(
            { expression: "$current" } as any,
            "$map",
            ["input", "expression"],
          );
        }).toThrow(MissingOperatorParameterError);
      });

      it("should throw error when multiple required fields are missing", () => {
        expect(() => {
          validateArrayOperatorParams({} as any, "$map", [
            "input",
            "expression",
          ]);
        }).toThrow(MissingOperatorParameterError);
      });

      it("should throw error when field is undefined without fallback", () => {
        expect(() => {
          validateArrayOperatorParams(
            { input: [1, 2, 3], expression: undefined } as any,
            "$map",
            ["input", "expression"],
          );
        }).toThrow(MissingOperatorParameterError);
      });
    });
  });

  describe("validateArrayInput", () => {
    describe("valid arrays", () => {
      it("should return array when input is valid", () => {
        const input = [1, 2, 3];
        const result = validateArrayInput(input, "$map");
        expect(result).toBe(input);
      });

      it("should return empty array", () => {
        const input: any[] = [];
        const result = validateArrayInput(input, "$map");
        expect(result).toBe(input);
      });

      it("should return array with mixed types", () => {
        const input = [1, "text", null, { a: 1 }];
        const result = validateArrayInput(input, "$map");
        expect(result).toBe(input);
      });
    });

    describe("invalid input with fallback", () => {
      it("should return fallback when input is string", () => {
        const result = validateArrayInput("not array", "$map", []);
        expect(result).toEqual([]);
      });

      it("should return fallback when input is number", () => {
        const result = validateArrayInput(123, "$map", null);
        expect(result).toBeNull();
      });

      it("should return fallback when input is object", () => {
        const result = validateArrayInput({ a: 1 }, "$map", "default");
        expect(result).toBe("default");
      });

      it("should return fallback when input is null", () => {
        const result = validateArrayInput(null, "$map", []);
        expect(result).toEqual([]);
      });

      it("should return fallback when input is undefined", () => {
        const result = validateArrayInput(undefined, "$map", 0);
        expect(result).toBe(0);
      });

      it("should allow falsy fallback values", () => {
        const result = validateArrayInput("not array", "$map", 0);
        expect(result).toBe(0);
      });
    });

    describe("invalid input without fallback", () => {
      it("should throw error when input is string", () => {
        expect(() => {
          validateArrayInput("not array", "$map");
        }).toThrow(ArrayOperatorInputError);
      });

      it("should throw error when input is number", () => {
        expect(() => {
          validateArrayInput(123, "$map");
        }).toThrow(ArrayOperatorInputError);
      });

      it("should throw error when input is object", () => {
        expect(() => {
          validateArrayInput({ a: 1 }, "$map");
        }).toThrow(ArrayOperatorInputError);
      });

      it("should throw error when input is null", () => {
        expect(() => {
          validateArrayInput(null, "$map");
        }).toThrow(ArrayOperatorInputError);
      });

      it("should throw error when input is undefined", () => {
        expect(() => {
          validateArrayInput(undefined, "$map");
        }).toThrow(ArrayOperatorInputError);
      });
    });
  });

  describe("validateNumberInput", () => {
    describe("valid numbers", () => {
      it("should return number when valid", () => {
        const result = validateNumberInput(5, "$arrayAt", "index");
        expect(result).toBe(5);
      });

      it("should return zero", () => {
        const result = validateNumberInput(0, "$arrayAt", "index");
        expect(result).toBe(0);
      });

      it("should return negative number", () => {
        const result = validateNumberInput(-5, "$arrayAt", "index");
        expect(result).toBe(-5);
      });

      it("should return decimal number", () => {
        const result = validateNumberInput(3.14, "$arrayAt", "index");
        expect(result).toBe(3.14);
      });

      it("should return negative zero", () => {
        const result = validateNumberInput(-0, "$arrayAt", "index");
        expect(result).toBe(-0); // -0 is a valid number, Object.is(-0, 0) is false
      });
    });

    describe("invalid numbers with fallback", () => {
      it("should return fallback when value is NaN", () => {
        const result = validateNumberInput(NaN, "$arrayAt", "index", null);
        expect(result).toBeNull();
      });

      it("should return fallback when value is Infinity", () => {
        const result = validateNumberInput(Infinity, "$arrayAt", "index", -1);
        expect(result).toBe(-1);
      });

      it("should return fallback when value is -Infinity", () => {
        const result = validateNumberInput(-Infinity, "$arrayAt", "index", 0);
        expect(result).toBe(0);
      });

      it("should return fallback when value is string", () => {
        const result = validateNumberInput("5", "$arrayAt", "index", null);
        expect(result).toBeNull();
      });

      it("should return fallback when value is null", () => {
        const result = validateNumberInput(null, "$arrayAt", "index", -1);
        expect(result).toBe(-1);
      });

      it("should return fallback when value is undefined", () => {
        const result = validateNumberInput(undefined, "$arrayAt", "index", 0);
        expect(result).toBe(0);
      });

      it("should allow falsy fallback values", () => {
        const result = validateNumberInput(
          "not number",
          "$arrayAt",
          "index",
          0,
        );
        expect(result).toBe(0);
      });
    });

    describe("invalid numbers without fallback", () => {
      it("should throw error when value is NaN", () => {
        expect(() => {
          validateNumberInput(NaN, "$arrayAt", "index");
        }).toThrow(Error);
      });

      it("should throw error when value is Infinity", () => {
        expect(() => {
          validateNumberInput(Infinity, "$arrayAt", "index");
        }).toThrow(Error);
      });

      it("should throw error when value is string", () => {
        expect(() => {
          validateNumberInput("5", "$arrayAt", "index");
        }).toThrow(Error);
      });

      it("should throw error when value is null", () => {
        expect(() => {
          validateNumberInput(null, "$arrayAt", "index");
        }).toThrow(Error);
      });

      it("should throw error when value is object", () => {
        expect(() => {
          validateNumberInput({ value: 5 }, "$arrayAt", "index");
        }).toThrow(Error);
      });
    });
  });

  describe("filterNumeric", () => {
    describe("valid numeric arrays", () => {
      it("should return all values when they are numeric", () => {
        expect(filterNumeric([10, 20, 30])).toEqual([10, 20, 30]);
      });

      it("should filter out non-numeric values", () => {
        expect(filterNumeric([10, "text", 20, null, 30])).toEqual([10, 20, 30]);
      });

      it("should filter out NaN values", () => {
        expect(filterNumeric([10, NaN, 20, 30])).toEqual([10, 20, 30]);
      });

      it("should filter out undefined values", () => {
        expect(filterNumeric([10, undefined, 20, 30])).toEqual([10, 20, 30]);
      });

      it("should filter out boolean values", () => {
        expect(filterNumeric([10, true, 20, false, 30])).toEqual([10, 20, 30]);
      });

      it("should filter out object values", () => {
        expect(filterNumeric([10, { value: 5 }, 20])).toEqual([10, 20]);
      });

      it("should filter out array values", () => {
        expect(filterNumeric([10, [5], 20])).toEqual([10, 20]);
      });

      it("should include zeros", () => {
        expect(filterNumeric([10, 0, 20, 0, 30])).toEqual([10, 0, 20, 0, 30]);
      });

      it("should include negative numbers", () => {
        expect(filterNumeric([10, -5, 20, -10])).toEqual([10, -5, 20, -10]);
      });

      it("should include decimals", () => {
        expect(filterNumeric([1.5, 2.5, 3.5])).toEqual([1.5, 2.5, 3.5]);
      });

      it("should include Infinity and -Infinity", () => {
        expect(filterNumeric([Infinity, 1, -Infinity])).toEqual([
          Infinity,
          1,
          -Infinity,
        ]);
      });
    });

    describe("empty results", () => {
      it("should return an empty array for an empty input", () => {
        expect(filterNumeric([])).toEqual([]);
      });

      it("should return an empty array when no values are numeric", () => {
        expect(filterNumeric(["a", "b", "c"])).toEqual([]);
      });

      it("should return an empty array for only NaN values", () => {
        expect(filterNumeric([NaN, NaN])).toEqual([]);
      });

      it("should return an empty array for only null/undefined", () => {
        expect(filterNumeric([null, undefined])).toEqual([]);
      });
    });

    it("should not mutate the input array", () => {
      const input = [1, "x", 2];
      filterNumeric(input);
      expect(input).toEqual([1, "x", 2]);
    });
  });
});
