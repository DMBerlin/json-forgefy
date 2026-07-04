import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ExecutionContext } from "@interfaces/execution-context.interface";
import { FilterOperatorInput } from "@lib-types/operator-input.types";
import { resolveArgs } from "@common/resolve-args.common";
import { resolveFallback, hasFallback } from "@helpers/fallback.helper";
import { augmentSourceWithContext } from "@common/resolve-execution-context.common";
import { resolveExpression } from "@common/resolve-expression.common";
import {
  validateArrayOperatorParams,
  validateArrayInput,
} from "@helpers/array-validation.helper";

/**
 * The $filter operator filters elements in an array based on a condition.
 * It iterates over the array and includes only elements where the condition
 * evaluates to truthy, making the current element available as $current and
 * the index as $index.
 *
 * Supports simple boolean conditions, complex nested conditions ($and, $or,
 * $cond, etc.), comparison operators ($gt, $lt, $eq, etc.), execution-context
 * variables ($current, $index), fallback values, empty arrays, and nesting
 * other array operators inside the condition.
 *
 * @param ctx - Execution context containing the source object
 * @returns A function that filters an array based on the given condition
 *
 * @example
 * ```typescript
 * // Simple condition
 * { adults: { $filter: { input: "$users", condition: { $gte: ["$current.age", 18] } } } }
 *
 * // With $and / $or
 * {
 *   eligible: {
 *     $filter: {
 *       input: "$candidates",
 *       condition: { $and: [{ $gte: ["$current.age", 18] }, { $eq: ["$current.status", "active"] }] }
 *     }
 *   }
 * }
 *
 * // With index and fallback
 * { oddIndexed: { $filter: { input: "$items", condition: { $eq: [{ $mod: ["$index", 2] }, 1] }, fallback: [] } } }
 *
 * // Nesting array operators inside another operator's expression is supported
 * {
 *   $map: {
 *     input: "$groups",
 *     expression: { filtered: { $filter: { input: "$current.items", condition: { $gt: ["$current", 100] } } } }
 *   }
 * }
 * ```
 */
export const $filter: ExecutableExpression<FilterOperatorInput, unknown[]> = (
  ctx?: ExecutionContext,
) => {
  // Augment source with execution context variables ($current, $index, $accumulated)
  // This ensures that when used in nested scenarios, the parent context is accessible
  const basePayload = ctx?.context || {};
  const payload = augmentSourceWithContext(basePayload, ctx);

  return function (params: FilterOperatorInput): unknown[] {
    try {
      // Validate params structure and required fields
      const validatedParams = validateArrayOperatorParams(params, "$filter", [
        "input",
        "condition",
      ]);

      const { input, condition } = validatedParams;

      // Validate input is an array
      const validArray = validateArrayInput(input, "$filter");

      // Handle empty array
      if (!Array.isArray(validArray) || validArray.length === 0) {
        return [];
      }

      // Filter the array with execution context
      return validArray.filter((element, index) => {
        // Create execution context for this element
        const elementContext: ExecutionContext = {
          context: payload,
          $current: element,
          $index: index,
          strict: ctx?.strict,
        };

        // Use resolveArgs to handle both operator expressions and plain values
        // resolveArgs will call resolveExpression for operator expressions
        // and resolveValue for paths and plain values
        const result = resolveArgs(
          condition,
          payload,
          elementContext,
          resolveExpression,
        );

        // Return truthy evaluation - convert result to boolean
        return Boolean(result);
      });
    } catch (error) {
      // Handle fallback if available
      if (hasFallback(params)) {
        return resolveFallback(
          params.fallback,
          payload,
          /* istanbul ignore next - defensive: non-Error exceptions are extremely rare */
          error instanceof Error
            ? error
            : /* istanbul ignore next */ new Error("$filter operation failed"),
        );
      }

      // No fallback - throw error as-is (preserves custom error types)
      throw error;
    }
  };
};
