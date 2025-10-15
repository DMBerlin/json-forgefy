import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { IsArrayOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $isArray operator checks if a value is an array.
 * It returns true if the value is an array, false otherwise.
 *
 * @returns A function that returns true if the value is an array, false otherwise
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   isArrayTrue: { $isArray: [1, 2, 3] }, // Returns true
 *   isArrayFalse: { $isArray: "hello" }, // Returns false
 *   isArrayObject: { $isArray: { key: "value" } }, // Returns false
 *   isArrayNull: { $isArray: null }, // Returns false
 *   checkField: { $isArray: "$user.tags" } // Returns true if tags is an array
 * }
 * ```
 */
export const $isArray: ExecutableExpression<
  IsArrayOperatorInput,
  boolean
> = () => {
  return function (value: IsArrayOperatorInput): boolean {
    return Array.isArray(value);
  };
};
