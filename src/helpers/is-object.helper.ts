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

/**
 * Type guard that checks if a value is an object with a specific property.
 * This helper eliminates repetitive validation patterns across operators.
 *
 * @param value - The value to check
 * @param property - The property name to check for
 * @returns true if value is an object (not null) with the specified property
 *
 * @example
 * ```typescript
 * isObjectWithProperty({ date: "2024-01-01" }, "date"); // Returns true
 * isObjectWithProperty({ value: 123 }, "value"); // Returns true
 * isObjectWithProperty({ other: "value" }, "date"); // Returns false
 * isObjectWithProperty(null, "date"); // Returns false
 * isObjectWithProperty("string", "date"); // Returns false
 * isObjectWithProperty(undefined, "date"); // Returns false
 * ```
 */
export function isObjectWithProperty<T extends string>(
  value: any,
  property: T,
): value is Record<T, any> {
  return typeof value === "object" && value !== null && property in value;
}

/**
 * Type guard that checks if a value is an object with all specified properties.
 * This helper eliminates repetitive validation patterns for multi-property checks.
 *
 * @param value - The value to check
 * @param properties - Array of property names to check for
 * @returns true if value is an object (not null) with all specified properties
 *
 * @example
 * ```typescript
 * isObjectWithProperties({ date: "2024-01-01", days: 5 }, ["date", "days"]); // Returns true
 * isObjectWithProperties({ date: "2024-01-01" }, ["date", "days"]); // Returns false
 * isObjectWithProperties(null, ["date"]); // Returns false
 * isObjectWithProperties("string", ["date"]); // Returns false
 * isObjectWithProperties({}, ["date"]); // Returns false
 * ```
 */
export function isObjectWithProperties<T extends string>(
  value: any,
  properties: readonly T[],
): value is Record<T, any> {
  return properties.every((property) => isObjectWithProperty(value, property));
}
