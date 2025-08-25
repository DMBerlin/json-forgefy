import { resolveExpression } from "@common/resolve-expression.common";
import { ExecutionContext } from "@interfaces/execution-context.interface";
import { SwitchOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $switch operator provides multi-branch conditional logic.
 * It evaluates multiple case conditions in order and returns the value of the first matching case.
 * If no cases match, it returns the default value. This is similar to switch statements in programming.
 *
 * @param ctx - Optional execution context containing the source object for expression resolution
 * @returns A function that evaluates cases and returns the matching branch value or default
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   grade: {
 *     $switch: {
 *       branches: [
 *         { case: { $gte: ["$score", 90] }, then: "A" },
 *         { case: { $gte: ["$score", 80] }, then: "B" },
 *         { case: { $gte: ["$score", 70] }, then: "C" },
 *         { case: { $gte: ["$score", 60] }, then: "D" }
 *       ],
 *       default: "F"
 *     }
 *   },
 *   shipping: {
 *     $switch: {
 *       branches: [
 *         { case: { $eq: ["$country", "US"] }, then: 5.99 },
 *         { case: { $eq: ["$country", "CA"] }, then: 7.99 },
 *         { case: { $eq: ["$country", "UK"] }, then: 9.99 }
 *       ],
 *       default: 15.99
 *     }
 *   }
 * }
 * ```
 */
export const $switch = (ctx?: ExecutionContext) => {
  return function (value: SwitchOperatorInput) {
    for (const branch of value.branches) {
      if (resolveExpression(ctx?.context, branch.case)) return branch.then;
    }
    return value.default;
  };
};
