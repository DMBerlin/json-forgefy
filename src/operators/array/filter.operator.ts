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
 * Supports:
 * - Simple boolean conditions
 * - Complex nested conditions ($and, $or, $cond, etc.)
 * - Comparison operators ($gt, $lt, $eq, etc.)
 * - Execution context variables ($current, $index)
 * - Fallback values for error handling
 * - Empty arrays
 *
 * **LIMITATION:** Due to circular module dependencies, you cannot nest $filter (or other array
 * operators like $map, $reduce) within object properties. Nested $filter calls will return null.
 *
 * **Workaround:** Use $filter at the expression root level instead of nesting it in object properties,
 * or use sequential filter operations.
 *
 * @param ctx - Execution context containing the source object
 * @returns A function that filters an array based on the given condition
 *
 * @example
 * ```typescript
 * // Simple condition
 * {
 *   adults: {
 *     $filter: {
 *       input: "$users",
 *       condition: { $gte: ["$current.age", 18] }
 *     }
 *   }
 * }
 *
 * // With $and and $or
 * {
 *   eligible: {
 *     $filter: {
 *       input: "$candidates",
 *       condition: {
 *         $and: [
 *           { $gte: ["$current.age", 18] },
 *           { $eq: ["$current.status", "active"] }
 *         ]
 *       }
 *     }
 *   }
 * }
 *
 * // With $cond
 * {
 *   filtered: {
 *     $filter: {
 *       input: "$items",
 *       condition: {
 *         $cond: {
 *           if: { $eq: ["$current.type", "premium"] },
 *           then: { $gt: ["$current.price", 100] },
 *           else: { $gt: ["$current.price", 50] }
 *         }
 *       }
 *     }
 *   }
 * }
 *
 * // With index
 * {
 *   oddIndexed: {
 *     $filter: {
 *       input: "$items",
 *       condition: { $eq: [{ $mod: ["$index", 2] }, 1] }
 *     }
 *   }
 * }
 *
 * // With fallback
 * {
 *   safe: {
 *     $filter: {
 *       input: "$maybeArray",
 *       condition: "$current.active",
 *       fallback: []
 *     }
 *   }
 * }
 *
 * // ❌ LIMITATION - Nested $filter in object property doesn't work
 * {
 *   $map: {
 *     input: "$groups",
 *     expression: {
 *       filtered: {  // ← Nested in object - will return null
 *         $filter: { input: "$current.items", condition: { $gt: ["$current", 100] } }
 *       }
 *     }
 *   }
 * }
 * // Returns: [{ filtered: null }, ...]
 *
 * // ✅ WORKAROUND - $filter at expression root
 * {
 *   $map: {
 *     input: "$groups",
 *     expression: {
 *       $filter: {  // ← At root level - works!
 *         input: "$current.items",
 *         condition: { $gt: ["$current", 100] }
 *       }
 *     }
 *   }
 * }
 * // Returns: [[filtered items], ...]
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
