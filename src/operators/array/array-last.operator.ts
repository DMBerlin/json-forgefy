import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ArrayLastOperatorInput } from "@lib-types/operator-input.types";
import {
  validateArrayOperatorParams,
  validateArrayInput,
} from "@helpers/array-validation.helper";

/**
 * The $arrayLast operator returns the last element of an array.
 * If the array is empty or not a valid array, it returns the fallback value if provided.
 *
 * @param _ctx - Execution context (not used by this operator)
 * @returns A function that returns the last element of an array
 *
 * @example
 * ```typescript
 * // Get last element
 * {
 *   last: {
 *     $arrayLast: {
 *       input: [10, 20, 30]
 *     }
 *   }
 * }
 * // Result: { last: 30 }
 *
 * // With fallback for empty array
 * {
 *   last: {
 *     $arrayLast: {
 *       input: [],
 *       fallback: null
 *     }
 *   }
 * }
 * // Result: { last: null }
 *
 * // From path
 * {
 *   last: {
 *     $arrayLast: {
 *       input: "$items",
 *       fallback: { default: "value" }
 *     }
 *   }
 * }
 * ```
 */
export const $arrayLast: ExecutableExpression<
  ArrayLastOperatorInput,
  unknown
> = () => {
  return function (params: ArrayLastOperatorInput): unknown {
    // Validate params structure
    const validatedParams = validateArrayOperatorParams(params, "$arrayLast", [
      "input",
    ]);

    // If params had fallback and was malformed, it's returned as-is
    if (validatedParams.fallback !== undefined && !validatedParams.input) {
      return validatedParams.fallback;
    }

    const { input, fallback } = validatedParams;

    // Validate input is an array
    const validArray = validateArrayInput(input, "$arrayLast", fallback);
    if (!Array.isArray(validArray)) {
      return validArray; // This is the fallback
    }

    // Return last element or fallback if empty
    if (validArray.length === 0) {
      return fallback !== undefined ? fallback : undefined;
    }

    return validArray[validArray.length - 1];
  };
};
