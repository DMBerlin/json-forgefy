import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { IsStringOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $isString operator checks if a value is a string.
 * It returns true if the value is a string, false otherwise.
 *
 * @returns A function that returns true if the value is a string, false otherwise
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   isStringTrue: { $isString: "hello" }, // Returns true
 *   isStringFalse: { $isString: 42 }, // Returns false
 *   isStringArray: { $isString: [1, 2, 3] }, // Returns false
 *   isStringNull: { $isString: null }, // Returns false
 *   checkField: { $isString: "$user.name" } // Returns true if name is a string
 * }
 * ```
 */
export const $isString: ExecutableExpression<
  IsStringOperatorInput,
  boolean
> = () => {
  return function (value: IsStringOperatorInput): boolean {
    return typeof value === "string";
  };
};
