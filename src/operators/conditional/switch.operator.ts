import { SwitchOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $switch operator provides multi-branch conditional logic.
 * It evaluates multiple case conditions in order and returns the value of the first matching case.
 * If no cases match, it returns the default value. This is similar to switch statements in programming.
 *
 * Note: By the time this operator receives the value, all nested expressions
 * (including branch.case values) have already been resolved by resolveArgs in
 * resolveExpression. The operator simply checks which case is truthy and returns
 * the corresponding branch value.
 *
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
export const $switch = () => {
  return function (value: SwitchOperatorInput) {
    // All case expressions are already resolved by resolveArgs
    // Simply check which case is truthy and return the corresponding branch
    for (const branch of value.branches) {
      if (branch.case) return branch.then;
    }
    return value.default;
  };
};
