import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { IsBooleanOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $isBoolean operator checks if a value is a boolean.
 * It returns true if the value is a boolean (true or false), false otherwise.
 *
 * @returns A function that returns true if the value is a boolean, false otherwise
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   isBooleanTrue: { $isBoolean: true }, // Returns true
 *   isBooleanFalse: { $isBoolean: false }, // Returns true
 *   isBooleanString: { $isBoolean: "true" }, // Returns false
 *   isBooleanNumber: { $isBoolean: 1 }, // Returns false
 *   isBooleanNull: { $isBoolean: null }, // Returns false
 *   checkField: { $isBoolean: "$user.active" } // Returns true if active is a boolean
 * }
 * ```
 */
export const $isBoolean: ExecutableExpression<
  IsBooleanOperatorInput,
  boolean
> = () => {
  return function (value: IsBooleanOperatorInput): boolean {
    return typeof value === "boolean";
  };
};
