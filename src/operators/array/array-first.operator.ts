import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ArrayFirstOperatorInput } from "@lib-types/operator-input.types";
import {
  validateArrayOperatorParams,
  validateArrayInput,
} from "@helpers/array-validation.helper";

/**
 * The $arrayFirst operator returns the first element of an array.
 * If the array is empty or not a valid array, it returns the fallback value if provided.
 *
 * @param _ctx - Execution context (not used by this operator)
 * @returns A function that returns the first element of an array
 *
 * @example
 * ```typescript
 * // Get first element
 * {
 *   first: {
 *     $arrayFirst: {
 *       input: [10, 20, 30]
 *     }
 *   }
 * }
 * // Result: { first: 10 }
 *
 * // With fallback for empty array
 * {
 *   first: {
 *     $arrayFirst: {
 *       input: [],
 *       fallback: null
 *     }
 *   }
 * }
 * // Result: { first: null }
 *
 * // From path
 * {
 *   first: {
 *     $arrayFirst: {
 *       input: "$items",
 *       fallback: { default: "value" }
 *     }
 *   }
 * }
 * ```
 */
export const $arrayFirst: ExecutableExpression<
  ArrayFirstOperatorInput,
  unknown
> = () => {
  return function (params: ArrayFirstOperatorInput): unknown {
    // Validate params structure
    const validatedParams = validateArrayOperatorParams(params, "$arrayFirst", [
      "input",
    ]);

    // If params had fallback and was malformed, it's returned as-is
    if (validatedParams.fallback !== undefined && !validatedParams.input) {
      return validatedParams.fallback;
    }

    const { input, fallback } = validatedParams;

    // Validate input is an array
    const validArray = validateArrayInput(input, "$arrayFirst", fallback);
    if (!Array.isArray(validArray)) {
      return validArray; // This is the fallback
    }

    // Return first element or fallback if empty
    if (validArray.length === 0) {
      return fallback !== undefined ? fallback : undefined;
    }

    return validArray[0];
  };
};
