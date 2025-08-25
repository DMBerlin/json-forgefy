/**
 * Extracts a value from a source object using a dot-notation path string.
 * The path must start with "$" to be considered valid. The function navigates
 * through nested objects using the dot-separated path segments.
 *
 * @param source - The source object to extract the value from
 * @param path - The dot-notation path string starting with "$" (e.g., "$user.profile.name")
 * @returns The value found at the specified path, or undefined if the path is invalid or doesn't start with "$"
 *
 * @example
 * ```typescript
 * const source = {
 *   user: {
 *     profile: {
 *       name: "John Doe",
 *       age: 30
 *     },
 *     settings: {
 *       theme: "dark"
 *     }
 *   }
 * };
 *
 * getValueByPath(source, "$user.profile.name"); // Returns "John Doe"
 * getValueByPath(source, "$user.settings.theme"); // Returns "dark"
 * getValueByPath(source, "user.profile.name"); // Returns undefined (no $ prefix)
 * getValueByPath(source, "$user.nonexistent"); // Returns undefined
 * ```
 */
export function getValueByPath(
  source: Record<string, unknown>,
  path: string,
): unknown {
  return path.at(0) === "$"
    ? path
        .slice(1)
        .split(".")
        .reduce((obj: Record<string, any>, key: string) => obj[key], source)
    : undefined;
}
