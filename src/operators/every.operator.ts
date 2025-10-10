import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { EveryOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $every operator checks if ALL conditions in an array are true.
 * If all conditions pass, it executes the 'then' expression; otherwise, it executes the 'else' expression.
 * This is perfect for complex validation scenarios where multiple conditions must be met.
 *
 * @param ctx - Optional execution context containing the source object for expression resolution
 * @returns A function that returns the 'then' value if all conditions are true, 'else' value otherwise
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   validAmount: {
 *     $every: {
 *       conditions: [
 *         { $isNumber: "$transaction.amount" },
 *         { $gt: ["$transaction.amount", 0] },
 *         { $lt: ["$transaction.amount", 10000] }
 *       ],
 *       then: { $toNumber: "$transaction.amount" },
 *       else: 0
 *     }
 *   },
 *   completeUser: {
 *     $every: {
 *       conditions: [
 *         { $exists: "$user.email" },
 *         { $exists: "$user.name" },
 *         { $regex: { value: "$user.email", pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$" } }
 *       ],
 *       then: "$user",
 *       else: null
 *     }
 *   }
 * }
 * ```
 */
export const $every: ExecutableExpression<EveryOperatorInput, unknown> = () => {
  return function (value: EveryOperatorInput): unknown {
    // All conditions are already resolved by resolveArgs
    // Check if all conditions are truthy
    const allConditionsMet = value.conditions.every((condition) =>
      Boolean(condition),
    );

    // Return 'then' if all conditions met, 'else' otherwise
    // Both branches are already resolved by resolveArgs
    return allConditionsMet ? value.then : value.else;
  };
};
