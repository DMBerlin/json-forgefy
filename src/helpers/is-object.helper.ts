/**
 * Determines if a value is a plain object (not an array, null, or other non-object types).
 * This helper function is used throughout the library to identify when a value should be
 * processed as an object that might contain nested projections or operators.
 * 
 * @param value - The value to check
 * @returns true if the value is a plain object, false otherwise
 * 
 * @example
 * ```typescript
 * isObject({}); // Returns true
 * isObject({ key: "value" }); // Returns true
 * isObject([]); // Returns false (array)
 * isObject(null); // Returns false (null)
 * isObject("string"); // Returns false (string)
 * isObject(42); // Returns false (number)
 * isObject(new Date()); // Returns true (Date is an object)
 * ```
 */
export function isObject(value: any): boolean {
  return value instanceof Object && !Array.isArray(value);
}
