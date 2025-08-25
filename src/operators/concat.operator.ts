import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { ConcatOperatorInput } from "../types/operator-input.types";

/**
 * The $concat operator concatenates multiple strings into a single string.
 * It joins all provided string values in the order they are specified.
 * 
 * @returns A function that concatenates all input strings into one string
 * 
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   fullName: { $concat: ["$firstName", " ", "$lastName"] }, // "John Doe"
 *   url: { $concat: ["https://", "$domain", "/", "$path"] }, // Build URL
 *   message: { $concat: ["Hello ", "$user.name", "!"] }, // Greeting message
 *   filename: { $concat: ["$name", ".", "$extension"] } // "document.pdf"
 * }
 * ```
 */
export const $concat: ExecutableExpression<
  ConcatOperatorInput,
  string
> = () => {
  return function (value: ConcatOperatorInput): string {
    return value.reduce(
      (accumulator: string, base: string) => accumulator + base,
      "",
    );
  };
};
