import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { CoalesceOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $coalesce operator returns the first non-null, non-undefined value from a list.
 * This is inspired by SQL's COALESCE function and is more flexible than $ifNull
 * as it can handle multiple fallback values.
 *
 * Note: By the time this operator receives the values, all nested expressions
 * (including paths and nested operators) have already been resolved by resolveArgs
 * in resolveExpression. The operator simply finds the first non-null value.
 *
 * @returns A function that returns the first non-null, non-undefined value
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   amount: { $coalesce: ["$transaction.amount", 0] }, // Use amount or default to 0
 *   balance: { $coalesce: ["$transaction.balance", ""] }, // Use balance or default to empty string
 *   name: { $coalesce: ["$user.displayName", "$user.firstName", "Anonymous"] }, // Multiple fallbacks
 *   status: { $coalesce: ["$order.status", "pending"] } // Use status or default to pending
 * }
 * ```
 */
export const $coalesce: ExecutableExpression<
  CoalesceOperatorInput,
  unknown
> = () => {
  return function (values: CoalesceOperatorInput): unknown {
    // All values are already resolved by resolveArgs
    for (const value of values) {
      if (value !== null && value !== undefined) {
        return value;
      }
    }
    return null; // Return null if all values are null/undefined
  };
};
