import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ExecutionContext } from "@interfaces/execution-context.interface";
import { resolveExpression } from "@common/resolve-expression.common";
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
export const $every: ExecutableExpression<EveryOperatorInput, unknown> = (
  ctx?: ExecutionContext,
) => {
  return function (value: EveryOperatorInput): unknown {
    const source = ctx?.context;

    // Check if all conditions are true
    const allConditionsMet = value.conditions.every((condition) => {
      const result = resolveExpression(source, condition);
      return Boolean(result);
    });

    // Return 'then' if all conditions met, 'else' otherwise
    return allConditionsMet
      ? resolveExpression(source, value.then)
      : resolveExpression(source, value.else);
  };
};
