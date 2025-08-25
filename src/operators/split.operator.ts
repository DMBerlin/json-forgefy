import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { SplitOperatorInput } from "../types/operator-input.types";

/**
 * The $split operator splits a string into an array of substrings using a delimiter.
 * It divides the string at each occurrence of the specified delimiter.
 *
 * @returns A function that splits the input string into an array of strings
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   tags: { $split: { input: "$tagString", delimiter: "," } }, // "tag1,tag2,tag3" -> ["tag1", "tag2", "tag3"]
 *   words: { $split: { input: "Hello World", delimiter: " " } }, // ["Hello", "World"]
 *   pathParts: { $split: { input: "$filePath", delimiter: "/" } }, // Split file path
 *   csvData: { $split: { input: "$csvRow", delimiter: ";" } } // Parse CSV row
 * }
 * ```
 */
export const $split: ExecutableExpression<
  SplitOperatorInput,
  string[]
> = () => {
  return function (params: SplitOperatorInput): string[] {
    return params.input.split(params.delimiter);
  };
};
