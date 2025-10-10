import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { RegexReplaceOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $regexReplace operator replaces substrings that match a regular expression pattern.
 * Unlike $replace which only handles literal strings, this operator supports full regex patterns
 * for complex string transformations like normalizing whitespace, removing patterns, etc.
 *
 * @returns A function that replaces all occurrences matching the regex pattern with the replacement value
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   // Normalize whitespace - replace multiple spaces with single space
 *   normalizedText: {
 *     $regexReplace: {
 *       input: "hello      world",
 *       pattern: "\\s+",
 *       replacement: " "
 *     }
 *   }, // "hello world"
 *
 *   // Remove all digits
 *   cleanText: {
 *     $regexReplace: {
 *       input: "abc123def456",
 *       pattern: "\\d+",
 *       replacement: ""
 *     }
 *   }, // "abcdef"
 *
 *   // Replace multiple patterns with word boundaries
 *   sanitized: {
 *     $regexReplace: {
 *       input: "Hello World!",
 *       pattern: "\\b(Hello|World)\\b",
 *       replacement: "Goodbye"
 *     }
 *   }, // "Goodbye Goodbye!"
 *
 *   // Case-insensitive replacement
 *   cleaned: {
 *     $regexReplace: {
 *       input: "TeSt TesT",
 *       pattern: "test",
 *       replacement: "demo",
 *       flags: "gi"
 *     }
 *   }, // "demo demo"
 *
 *   // Trim and normalize combined
 *   formatted: {
 *     $regexReplace: {
 *       input: "  hello   world  ",
 *       pattern: "^\\s+|\\s+$|\\s+(?=\\s)",
 *       replacement: ""
 *     }
 *   } // "hello world"
 * }
 * ```
 */
export const $regexReplace: ExecutableExpression<
  RegexReplaceOperatorInput,
  string
> = () => {
  return function (params: RegexReplaceOperatorInput): string {
    const { input, pattern, replacement, flags = "g" } = params;

    // Create the regex with the provided pattern and flags
    const regex = new RegExp(pattern, flags);

    // Replace all matches with the replacement string
    return input.replace(regex, replacement);
  };
};
