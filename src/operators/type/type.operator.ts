import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { TypeOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $type operator returns the type of a value as a string.
 * It returns one of: "string", "number", "boolean", "array", "object", "null", "undefined", "date"
 *
 * @returns A function that returns the type of the value as a string
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   stringType: { $type: "hello" }, // Returns "string"
 *   numberType: { $type: 42 }, // Returns "number"
 *   booleanType: { $type: true }, // Returns "boolean"
 *   arrayType: { $type: [1, 2, 3] }, // Returns "array"
 *   objectType: { $type: { key: "value" } }, // Returns "object"
 *   nullType: { $type: null }, // Returns "null"
 *   dateType: { $type: new Date() }, // Returns "date"
 *   fieldType: { $type: "$user.name" } // Returns type of the field value
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
