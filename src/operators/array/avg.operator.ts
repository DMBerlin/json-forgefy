import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { AvgOperatorInput } from "@lib-types/operator-input.types";
import {
  validateArrayOperatorParams,
  validateArrayInput,
  extractNumericValues,
} from "@helpers/array-validation.helper";

/**
 * The $avg operator calculates the average (mean) of an array of numbers.
 * If the array is empty or contains non-numeric values, it uses the fallback value if provided.
 *
 * @param _ctx - Execution context (not used by this operator)
 * @returns A function that calculates the average of a number array
 *
 * @example
 * ```typescript
 * // Calculate average
 * {
 *   average: {
 *     $avg: {
 *       values: [10, 20, 30, 40]
 *     }
 *   }
 * }
 * // Result: { average: 25 }
 *
 * // With fallback for empty array
 * {
 *   average: {
 *     $avg: {
 *       values: [],
 *       fallback: 0
 *     }
 *   }
 * }
 * // Result: { average: 0 }
 *
 * // From path
 * {
 *   avgScore: {
 *     $avg: {
 *       values: "$scores",
 *       fallback: null
 *     }
 *   }
 * }
 * ```
 */
export const $avg: ExecutableExpression<AvgOperatorInput, number> = () => {
  return function (params: AvgOperatorInput): number {
    // Validate params structure
    const validatedParams = validateArrayOperatorParams(params, "$avg", [
      "values",
    ]);

    // If params had fallback and was malformed, it's returned as-is
    if (validatedParams.fallback !== undefined && !validatedParams.values) {
      return validatedParams.fallback as number;
    }

    const { values, fallback } = validatedParams;

    // Validate values is an array
    const validArray = validateArrayInput(values, "$avg", fallback);
    if (!Array.isArray(validArray)) {
      return validArray as number; // This is the fallback
    }

    // Extract valid numeric values (handles empty array and non-numeric filtering)
    const numbers = extractNumericValues(validArray, fallback);
    if (!Array.isArray(numbers)) {
      return numbers as number; // This is the fallback or default value
    }

    // Calculate average
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
  };
};
