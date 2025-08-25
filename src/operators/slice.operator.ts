import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { SliceOperatorInput } from "../types/operator-input.types";

/**
 * The $slice operator extracts a section of a string and returns it as a new string.
 * It uses start and end indices to determine which part of the string to extract.
 * 
 * @returns A function that extracts a slice of the input string
 * 
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   firstPart: { $slice: { input: "$fullText", start: 0, end: 10 } }, // First 10 characters
 *   lastPart: { $slice: { input: "Hello World", start: 6, end: 11 } }, // "World"
 *   middle: { $slice: { input: "$description", start: 5, end: -5 } }, // Middle part, excluding first and last 5
 *   fromIndex: { $slice: { input: "$text", start: 3 } } // From index 3 to end
 * }
 * ```
 */
export const $slice: ExecutableExpression<SliceOperatorInput, string> = () => {
  return function (params: SliceOperatorInput): string {
    return params.input.slice(params.start, params.end);
  };
};
