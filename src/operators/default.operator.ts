import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ExecutionContext } from "@interfaces/execution-context.interface";
import { resolvePathOrExpression } from "@common/resolve-path-or-expression.common";
import { DefaultOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $default operator returns the first non-null, non-undefined value from a list.
 * It's similar to $coalesce but specifically designed for default value fallbacks.
 * This is more flexible than $ifNull as it can handle multiple fallback values.
 *
 * @param ctx - Optional execution context containing the source object for path/expression resolution
 * @returns A function that returns the first non-null, non-undefined value
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   amount: { $default: ["$transaction.amount", 0] }, // Use amount or default to 0
 *   balance: { $default: ["$transaction.balance", ""] }, // Use balance or default to empty string
 *   name: { $default: ["$user.displayName", "$user.firstName", "Anonymous"] }, // Multiple fallbacks
 *   status: { $default: ["$order.status", "pending"] } // Use status or default to pending
 * }
 * ```
 */
export const $default: ExecutableExpression<DefaultOperatorInput, unknown> = (
  ctx?: ExecutionContext,
) => {
  return function (values: DefaultOperatorInput): unknown {
    for (const value of values) {
      const resolved = resolvePathOrExpression(value, ctx);
      if (resolved !== null && resolved !== undefined) {
        return resolved;
      }
    }
    return null; // Return null if all values are null/undefined
  };
};
