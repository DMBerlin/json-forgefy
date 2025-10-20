import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { TypeOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $type operator returns the type of a value as a string.
 * Detects all JavaScript types at runtime, though only a subset can exist in JSON.
 *
 * **JSON-compatible types** (can appear in JSON input):
 * - "string", "number", "boolean", "null", "object", "array"
 *
 * **Runtime-only types** (appear after transformations or from code):
 * - "undefined", "bigint", "symbol", "function", "date"
 *
 * @returns A function that returns the type of the value as a string
 *
 * @example
 * ```typescript
 * // JSON-compatible types (common cases):
 * {
 *   stringType: { $type: "hello" }, // "string"
 *   numberType: { $type: 42 }, // "number"
 *   booleanType: { $type: true }, // "boolean"
 *   nullType: { $type: null }, // "null"
 *   arrayType: { $type: [1, 2, 3] }, // "array"
 *   objectType: { $type: { key: "value" } }, // "object"
 * }
 *
 * // Runtime-only types (after transformations):
 * {
 *   dateType: { $type: { $toDate: "2024-01-15" } }, // "date"
 *   undefinedType: { $type: "$nonExistent" }, // "undefined"
 * }
 *
 * // From path
 * {
 *   fieldType: { $type: "$user.name" } // Type of field value
 * }
 * ```
 */
export const $type: ExecutableExpression<TypeOperatorInput, string> = () => {
  return function (value: TypeOperatorInput): string {
    if (value === null) {
      return "null";
    }

    if (value === undefined) {
      return "undefined";
    }

    if (Array.isArray(value)) {
      return "array";
    }

    if (value instanceof Date) {
      return "date";
    }

    return typeof value;
  };
};
