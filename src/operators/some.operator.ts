import { ExecutableExpression } from "@interfaces/executable-expression.interface";
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
export const $some: ExecutableExpression<SomeOperatorInput, unknown> = () => {
  return function (value: SomeOperatorInput): unknown {
    // All conditions are already resolved by resolveArgs
    // Check if any condition is truthy
    const anyConditionMet = value.conditions.some((condition) =>
      Boolean(condition),
    );

    // Return 'then' if any condition met, 'else' otherwise
    // Both branches are already resolved by resolveArgs
    return anyConditionMet ? value.then : value.else;
  };
};
