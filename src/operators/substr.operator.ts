import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { SubstrOperatorInput } from "../types/operator-input.types";

/**
 * The $substr operator extracts a substring from a string.
 * It takes a starting position and length to determine which part of the string to extract.
 *
 * @returns A function that extracts a substring based on start position and length
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   firstThree: { $substr: { value: "$productCode", start: 0, length: 3 } }, // First 3 characters
 *   middlePart: { $substr: { value: "Hello World", start: 6, length: 5 } }, // "World"
 *   lastFour: { $substr: { value: "$phoneNumber", start: -4, length: 4 } }, // Last 4 digits
 *   excerpt: { $substr: { value: "$description", start: 0, length: 100 } } // First 100 chars
 * }
 * ```
 */
export const $substr: ExecutableExpression<
  SubstrOperatorInput,
  string
> = () => {
  return function (params: SubstrOperatorInput): string {
    return params.value.substring(params.start, params.start + params.length);
  };
};
