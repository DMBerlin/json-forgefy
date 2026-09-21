import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ExecutionContext } from "@interfaces/execution-context.interface";
import { ReduceOperatorInput } from "@lib-types/operator-input.types";
import { resolveArgs } from "@common/resolve-args.common";
import { resolveFallback, hasFallback } from "@helpers/fallback.helper";
import { augmentSourceWithContext } from "@common/resolve-execution-context.common";
import { resolveExpression } from "@common/resolve-expression.common";
import {
  validateArrayOperatorParams,
  validateArrayInput,
} from "@helpers/array-validation.helper";

/**
 * The $reduce operator reduces an array to a single value by iteratively applying
 * an expression to each element along with an accumulated value.
 * It makes the current element available as $current, the accumulated value as
 * $accumulated, and the index as $index.
 *
 * Supports simple aggregations (sum, product, concatenation), complex
 * expressions ($cond, $switch, math operators, etc.), execution-context
 * variables ($current, $accumulated, $index), an initial accumulator value,
 * fallback values, empty arrays (returns initialValue), and nesting other array
 * operators inside the expression.
 *
 * @param ctx - Execution context containing the source object
 * @returns A function that reduces an array to a single value with the given expression
 *
 * @example
 * ```typescript
 * // Simple sum
 * { total: { $reduce: { input: [1, 2, 3, 4, 5], initialValue: 0, expression: { $add: ["$accumulated", "$current"] } } } }
 * // Result: { total: 15 }
 *
 * // Conditional accumulation (sum positives only)
 * {
 *   sum: {
 *     $reduce: {
 *       input: [5, -3, 8, -2, 10],
 *       initialValue: 0,
 *       expression: { $cond: { if: { $gt: ["$current", 0] }, then: { $add: ["$accumulated", "$current"] }, else: "$accumulated" } }
 *     }
 *   }
 * }
 * // Result: { sum: 23 }
 *
 * // With index (weighted sum) and fallback
 * {
 *   weighted: {
 *     $reduce: {
 *       input: [10, 20, 30],
 *       initialValue: 0,
 *       expression: { $add: ["$accumulated", { $multiply: ["$current", { $add: ["$index", 1] }] }] },
 *       fallback: null
 *     }
 *   }
 * }
 * // Result: { weighted: 140 } (10*1 + 20*2 + 30*3)
 *
 * // Nesting array operators inside the expression is supported
 * {
 *   $map: {
 *     input: [[1, 2, 3], [4, 5, 6]],
 *     expression: { sum: { $reduce: { input: "$current", initialValue: 0, expression: { $add: ["$accumulated", "$current"] } } } }
 *   }
 * }
 * // Returns: [{ sum: 6 }, { sum: 15 }]
 * ```
 */
export const $reduce: ExecutableExpression<ReduceOperatorInput, unknown> = (
  ctx?: ExecutionContext,
) => {
  // Augment source with execution context variables ($current, $index, $accumulated)
  // This ensures that when used in nested scenarios, the parent context is accessible
  const basePayload = ctx?.context || {};
  const payload = augmentSourceWithContext(basePayload, ctx);

  return function (params: ReduceOperatorInput): unknown {
    try {
      // Validate params structure and required fields
      const validatedParams = validateArrayOperatorParams(params, "$reduce", [
        "input",
        "initialValue",
        "expression",
      ]);

      const { input, initialValue, expression } = validatedParams;

      // Validate input is an array
      const validArray = validateArrayInput(input, "$reduce");

      // Handle empty array - return initialValue
      if (!Array.isArray(validArray) || validArray.length === 0) {
        return initialValue;
      }

      // Reduce the array with execution context
      return validArray.reduce((accumulated, element, index) => {
        // Create execution context for this iteration
        const elementContext: ExecutionContext = {
          context: payload,
          $accumulated: accumulated,
          $current: element,
          $index: index,
          strict: ctx?.strict,
        };

        // Use resolveArgs to handle both operator expressions and plain objects/values
        // resolveArgs will call resolveExpression for operator expressions
        // and resolveValue for paths and plain objects
        return resolveArgs(
          expression,
          payload,
          elementContext,
          resolveExpression,
        );
      }, initialValue);
    } catch (error) {
      // Handle fallback if available
      if (hasFallback(params)) {
        return resolveFallback(
          params.fallback,
          payload,
          /* istanbul ignore next - defensive: non-Error exceptions are extremely rare */
          error instanceof Error
            ? error
            : /* istanbul ignore next */ new Error("$reduce operation failed"),
        );
      }

      // No fallback - throw error as-is (preserves custom error types)
      throw error;
    }
  };
};
