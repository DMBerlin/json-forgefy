import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { SumOperatorInput } from "@lib-types/operator-input.types";
import {
  validateArrayOperatorParams,
  validateArrayInput,
  extractNumericValues,
} from "@helpers/array-validation.helper";

/**
 * The $sum operator calculates the sum of an array of numbers.
 * If the array is empty or contains non-numeric values, it uses the fallback value if provided.
 *
 * @param _ctx - Execution context (not used by this operator)
 * @returns A function that calculates the sum of a number array
 *
 * @example
 * ```typescript
 * // Calculate sum
 * {
 *   total: {
 *     $sum: {
 *       values: [10, 20, 30, 40]
 *     }
 *   }
 * }
 * // Result: { total: 100 }
 *
 * // With fallback for empty array
 * {
 *   total: {
 *     $sum: {
 *       values: [],
 *       fallback: 0
 *     }
 *   }
 * }
 * // Result: { total: 0 }
 *
 * // From path
 * {
 *   totalAmount: {
 *     $sum: {
 *       values: "$amounts",
 *       fallback: null
 *     }
 *   }
 * }
 *
 * // Filters out non-numeric values
 * {
 *   total: {
 *     $sum: {
 *       values: [10, "text", 20, null, 30]
 *     }
 *   }
 * }
 * // Result: { total: 60 } (only sums 10, 20, 30)
 * ```
 */
export const $sum: ExecutableExpression<SumOperatorInput, number> = () => {
  return function (params: SumOperatorInput): number {
    // Validate params structure
    const validatedParams = validateArrayOperatorParams(params, "$sum", [
      "values",
    ]);

    // If params had fallback and was malformed, it's returned as-is
    if (validatedParams.fallback !== undefined && !validatedParams.values) {
      return validatedParams.fallback as number;
    }

    const { values, fallback } = validatedParams;

    // Validate values is an array
    const validArray = validateArrayInput(values, "$sum", fallback);
    if (!Array.isArray(validArray)) {
      return validArray as number; // This is the fallback
    }

    // Extract valid numeric values (handles empty array and non-numeric filtering)
    const numbers = extractNumericValues(validArray, fallback);
    if (!Array.isArray(numbers)) {
      return numbers as number; // This is the fallback or default value
    }

    // Calculate sum
    return numbers.reduce((acc, num) => acc + num, 0);
  };
};
