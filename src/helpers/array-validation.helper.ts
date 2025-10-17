import {
  ArrayOperatorInputError,
  MissingOperatorParameterError,
} from "@lib-types/error.types";

/**
 * Validates that params is a well-formed object with required fields.
 * Returns the fallback value if params is malformed but has a fallback.
 * Throws an error if params is malformed and no fallback is provided.
 *
 * @param params - The operator parameters to validate
 * @param operatorName - The name of the operator (for error messages)
 * @param requiredFields - Array of required field names
 * @returns The params object if valid, or fallback value if malformed with fallback
 * @throws {MissingOperatorParameterError} If params is malformed and no fallback
 *
 * @example
 * ```typescript
 * const validated = validateArrayOperatorParams(
 *   params,
 *   "$map",
 *   ["input", "expression"]
 * );
 * ```
 */
export function validateArrayOperatorParams<T extends { fallback?: unknown }>(
  params: T,
  operatorName: string,
  requiredFields: string[],
): T | never {
  // Check if params is a valid object
  if (!params || typeof params !== "object") {
    throw new MissingOperatorParameterError(
      operatorName,
      requiredFields.join(", "),
      requiredFields,
    );
  }

  // Check if all required fields are present
  for (const field of requiredFields) {
    if (!(field in params)) {
      // Check for fallback when required field is missing
      if (params.fallback !== undefined) {
        return params;
      }
      throw new MissingOperatorParameterError(
        operatorName,
        field,
        requiredFields,
      );
    }
  }

  return params;
}

/**
 * Validates that a value is an array.
 * Returns the fallback value if provided and validation fails.
 * Throws an error if validation fails and no fallback is provided.
 *
 * @param value - The value to validate as an array
 * @param operatorName - The name of the operator (for error messages)
 * @param fallback - Optional fallback value to return on validation failure
 * @returns The validated array or fallback value
 * @throws {ArrayOperatorInputError} If value is not an array and no fallback
 *
 * @example
 * ```typescript
 * const validArray = validateArrayInput(
 *   input,
 *   "$map",
 *   params.fallback
 * );
 * ```
 */
export function validateArrayInput<T = unknown>(
  value: unknown,
  operatorName: string,
  fallback?: T,
): unknown[] | T | never {
  if (!Array.isArray(value)) {
    if (fallback !== undefined) {
      return fallback;
    }
    throw new ArrayOperatorInputError(operatorName, typeof value, value);
  }
  return value;
}

/**
 * Validates that a value is a finite number.
 * Returns the fallback value if provided and validation fails.
 * Throws an error if validation fails and no fallback is provided.
 *
 * @param value - The value to validate as a number
 * @param operatorName - The name of the operator (for error messages)
 * @param paramName - The name of the parameter being validated
 * @param fallback - Optional fallback value to return on validation failure
 * @returns The validated number or fallback value
 * @throws {Error} If value is not a finite number and no fallback
 *
 * @example
 * ```typescript
 * const validIndex = validateNumberInput(
 *   index,
 *   "$arrayAt",
 *   "index",
 *   params.fallback
 * );
 * ```
 */
export function validateNumberInput<T = unknown>(
  value: unknown,
  operatorName: string,
  paramName: string,
  fallback?: T,
): number | T | never {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    if (fallback !== undefined) {
      return fallback as T;
    }
    throw new Error(
      `${operatorName} '${paramName}' must be a finite number, received ${typeof value}`,
    );
  }
  return value;
}

/**
 * Checks if an array is empty and returns fallback if provided.
 * This is a convenience helper for the common pattern of checking array length.
 *
 * @param array - The array to check
 * @param fallback - Optional fallback value to return if empty
 * @returns The fallback value if array is empty and fallback is provided, otherwise undefined
 *
 * @example
 * ```typescript
 * if (array.length === 0) {
 *   const fb = getEmptyArrayFallback(array, fallback);
 *   if (fb !== undefined) return fb;
 * }
 * ```
 */
export function getEmptyArrayFallback<T>(
  array: unknown[],
  fallback?: T,
): T | undefined {
  if (array.length === 0 && fallback !== undefined) {
    return fallback;
  }
  return undefined;
}

/**
 * Filters an array to extract only valid numeric values.
 * Excludes NaN, null, undefined, strings, objects, and other non-numeric types.
 * Returns the filtered array of numbers, or fallback if no valid numbers found.
 * Returns default value (0) if array is empty or no valid numbers and no fallback provided.
 *
 * @param array - The array to filter
 * @param fallback - Optional fallback value to return if no valid numbers
 * @param defaultValue - Default value to return if no numbers and no fallback (default: 0)
 * @returns Array of valid numbers, fallback, or default value
 *
 * @example
 * ```typescript
 * const numbers = extractNumericValues([10, "text", 20, null, 30], null);
 * // Returns: [10, 20, 30]
 *
 * const empty = extractNumericValues(["a", "b", "c"], 999);
 * // Returns: 999 (no valid numbers, uses fallback)
 *
 * const defaulted = extractNumericValues([]);
 * // Returns: 0 (default value)
 * ```
 */
export function extractNumericValues<T = number>(
  array: unknown[],
  fallback?: T,
  defaultValue: number = 0,
): number[] | T | number {
  // Handle empty array
  if (array.length === 0) {
    return fallback !== undefined ? fallback : defaultValue;
  }

  // Filter out non-numeric values
  const numbers = array.filter(
    (v): v is number => typeof v === "number" && !isNaN(v),
  );

  // If no valid numbers found
  if (numbers.length === 0) {
    return fallback !== undefined ? fallback : defaultValue;
  }

  return numbers;
}
