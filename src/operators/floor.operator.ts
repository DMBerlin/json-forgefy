import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { FloorOperatorInput } from "../types/operator-input.types";

/**
 * The $floor operator rounds a number down to the nearest integer.
 * It always rounds towards negative infinity, regardless of the number's sign.
 *
 * @returns A function that returns the floor (rounded down) value of the input number
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   roundedDown: { $floor: 4.8 }, // Returns 4
 *   wholeUnits: { $floor: { $divide: ["$totalAmount", "$unitPrice"] } }, // Calculate whole units
 *   negativeRound: { $floor: -4.2 }, // Returns -5 (rounds towards negative infinity)
 *   discountFloor: { $floor: "$calculatedDiscount" } // Round discount down
 * }
 * ```
 */
export const $floor: ExecutableExpression<FloorOperatorInput, number> = () => {
  return function (value: FloorOperatorInput): number {
    return Math.floor(value);
  };
};
