import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { SizeOperatorInput } from "../types/operator-input.types";

/**
 * The $size operator returns the length of a string or array.
 * It counts the number of characters in a string or elements in an array.
 *
 * @returns A function that returns the size/length of the input
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   nameLength: { $size: "$user.name" }, // Length of user name
 *   itemCount: { $size: "$items" }, // Number of items in array
 *   textLength: { $size: "Hello World" }, // Returns 11
 *   tagCount: { $size: { $split: { input: "$tags", delimiter: "," } } } // Count tags after splitting
 * }
 * ```
 */
export const $size: ExecutableExpression<SizeOperatorInput, number> = () => {
  return function (values: SizeOperatorInput): number {
    return values.length;
  };
};
