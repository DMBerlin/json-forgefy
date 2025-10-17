import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ArrayAtOperatorInput } from "@lib-types/operator-input.types";
import {
  validateArrayOperatorParams,
  validateArrayInput,
  validateNumberInput,
} from "@helpers/array-validation.helper";

/**
 * The $arrayAt operator returns the element at a specific index in an array.
 * Supports negative indices (counting from the end).
 * If the index is out of bounds or input is not a valid array, it returns the fallback value if provided.
 *
 * @param _ctx - Execution context (not used by this operator)
 * @returns A function that returns the element at the specified index
 *
 * @example
 * ```typescript
 * // Get element at index 2
 * {
 *   third: {
 *     $arrayAt: {
 *       input: [10, 20, 30, 40],
 *       index: 2
 *     }
 *   }
 * }
 * // Result: { third: 30 }
 *
 * // Get last element with negative index
 * {
 *   last: {
 *     $arrayAt: {
 *       input: [10, 20, 30],
 *       index: -1
 *     }
 *   }
 * }
 * // Result: { last: 30 }
 *
 * // With fallback for out of bounds
 * {
 *   element: {
 *     $arrayAt: {
 *       input: [10, 20],
 *       index: 5,
 *       fallback: null
 *     }
 *   }
 * }
 * // Result: { element: null }
 *
 * // From path
 * {
 *   item: {
 *     $arrayAt: {
 *       input: "$items",
 *       index: { $add: ["$selectedIndex", 1] },
 *       fallback: { default: "item" }
 *     }
 *   }
 * }
 * ```
 */
export const $arrayAt: ExecutableExpression<
  ArrayAtOperatorInput,
  unknown
> = () => {
  return function (params: ArrayAtOperatorInput): unknown {
    // Validate params structure
    const validatedParams = validateArrayOperatorParams(params, "$arrayAt", [
      "input",
      "index",
    ]);

    // If params had fallback and was malformed, it's returned as-is
    if (validatedParams.fallback !== undefined && !validatedParams.input) {
      return validatedParams.fallback;
    }

    const { input, index, fallback } = validatedParams;

    // Validate input is an array
    const validArray = validateArrayInput(input, "$arrayAt", fallback);
    if (!Array.isArray(validArray)) {
      return validArray; // This is the fallback
    }

    // Validate index is a number
    const validIndex = validateNumberInput(
      index,
      "$arrayAt",
      "index",
      fallback,
    );
    if (typeof validIndex !== "number") {
      return validIndex; // This is the fallback
    }

    // Handle negative indices
    const actualIndex =
      validIndex < 0 ? validArray.length + validIndex : validIndex;

    // Check bounds
    if (actualIndex < 0 || actualIndex >= validArray.length) {
      return fallback !== undefined ? fallback : undefined;
    }

    return validArray[actualIndex];
  };
};
