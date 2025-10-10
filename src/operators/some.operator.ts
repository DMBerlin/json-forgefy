import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ExecutionContext } from "@interfaces/execution-context.interface";
import { resolveExpression } from "@common/resolve-expression.common";
import { SomeOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $some operator checks if AT LEAST ONE condition in an array is true.
 * If any condition passes, it executes the 'then' expression; otherwise, it executes the 'else' expression.
 * This is perfect for flexible fallback logic where any of multiple conditions can trigger an action.
 *
 * @param ctx - Optional execution context containing the source object for expression resolution
 * @returns A function that returns the 'then' value if any condition is true, 'else' value otherwise
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   displayName: {
 *     $some: {
 *       conditions: [
 *         { $exists: "$user.displayName" },
 *         { $exists: "$user.firstName" },
 *         { $exists: "$user.username" }
 *       ],
 *       then: { $coalesce: ["$user.displayName", "$user.firstName", "$user.username"] },
 *       else: "Anonymous"
 *     }
 *   },
 *   hasContact: {
 *     $some: {
 *       conditions: [
 *         { $exists: "$user.email" },
 *         { $exists: "$user.phone" },
 *         { $exists: "$user.address" }
 *       ],
 *       then: true,
 *       else: false
 *     }
 *   }
 * }
 * ```
 */
export const $some: ExecutableExpression<SomeOperatorInput, unknown> = (
  ctx?: ExecutionContext,
) => {
  return function (value: SomeOperatorInput): unknown {
    const source = ctx?.context;

    // Check if any condition is true
    const anyConditionMet = value.conditions.some((condition) => {
      const result = resolveExpression(source, condition);
      return Boolean(result);
    });

    // Return 'then' if any condition met, 'else' otherwise
    return anyConditionMet
      ? resolveExpression(source, value.then)
      : resolveExpression(source, value.else);
  };
};
