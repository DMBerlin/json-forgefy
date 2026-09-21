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

  // Check if all required fields are present and defined
  for (const field of requiredFields) {
    if (!(field in params) || (params as any)[field] === undefined) {
      // Check for fallback when required field is missing or undefined
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
 * Filters an array down to its valid numeric values.
 *
 * A pure, single-responsibility helper: it keeps only entries that are actual
 * numbers (excluding `NaN`) and drops everything else — strings, booleans,
 * objects, arrays, `null`, and `undefined`. `Infinity` / `-Infinity` are kept
 * (they are numbers and not `NaN`). Empty-array and no-valid-number handling
 * (fallbacks, defaults) is intentionally left to the caller so the contract
 * stays a simple `unknown[] -> number[]`.
 *
 * @param array - The array to filter
 * @returns A new array containing only the valid numbers (possibly empty)
 *
 * @example
 * ```typescript
 * filterNumeric([10, "text", 20, null, 30]); // [10, 20, 30]
 * filterNumeric(["a", "b"]);                  // []
 * filterNumeric([]);                          // []
 * ```
 */
export function filterNumeric(array: unknown[]): number[] {
  return array.filter((v): v is number => typeof v === "number" && !isNaN(v));
}
