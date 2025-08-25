import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { ToStringOperatorInput } from "../types/operator-input.types";

/**
 * The $toString operator converts a value to its string representation.
 * This is useful for ensuring values are treated as strings in the output.
 *
 * @returns A function that converts any input value to a string
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   id: { $toString: "$userId" }, // Converts number to string
 *   amount: { $toString: 123.45 }, // Returns "123.45"
 *   boolean: { $toString: true }, // Returns "true"
 *   combined: { $toString: { $add: [10, 20] } } // Converts result to "30"
 * }
 * ```
 */
export const $toString: ExecutableExpression<
  ToStringOperatorInput,
  string
> = () => {
  return function (value: ToStringOperatorInput): string {
    return String(value);
  };
};
