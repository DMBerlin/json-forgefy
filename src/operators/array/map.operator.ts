import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ExecutionContext } from "@interfaces/execution-context.interface";
import { MapOperatorInput } from "@lib-types/operator-input.types";
import { resolveArgs } from "@common/resolve-args.common";
import { resolveFallback, hasFallback } from "@helpers/fallback.helper";
import { augmentSourceWithContext } from "@common/resolve-execution-context.common";
import { resolveExpression } from "@common/resolve-expression.common";
import {
  validateArrayOperatorParams,
  validateArrayInput,
} from "@helpers/array-validation.helper";

/**
 * The $map operator transforms each element in an array using an expression.
 * It iterates over the array and applies the provided expression to each element,
 * making the current element available as $current and the index as $index.
 *
 * Supports simple transformations, complex nested expressions ($cond, $switch,
 * math operators, etc.), execution-context variables ($current, $index),
 * fallback values, empty arrays, and nesting other array operators (including
 * $map/$filter/$reduce) inside the expression.
 *
 * @param ctx - Execution context containing the source object
 * @returns A function that maps over an array with the given expression
 *
 * @example
 * ```typescript
 * // Simple transformation
 * { doubled: { $map: { input: "$numbers", expression: { $multiply: ["$current", 2] } } } }
 *
 * // With conditional logic
 * {
 *   processed: {
 *     $map: {
 *       input: "$items",
 *       expression: {
 *         $cond: {
 *           if: { $gt: ["$current.amount", 100] },
 *           then: { $multiply: ["$current.amount", 0.9] }, // 10% discount
 *           else: "$current.amount"
 *         }
 *       }
 *     }
 *   }
 * }
 *
 * // With index (1-based position) and fallback
 * { indexed: { $map: { input: "$items", expression: { item: "$current", position: { $add: ["$index", 1] } }, fallback: [] } } }
 *
 * // Nesting array operators inside the expression is supported
 * {
 *   $map: {
 *     input: [{ items: [1, 2, 3] }],
 *     expression: { doubled: { $map: { input: "$current.items", expression: { $multiply: ["$current", 2] } } } }
 *   }
 * }
 * // Returns: [{ doubled: [2, 4, 6] }]
 * ```
 */
export const $map: ExecutableExpression<MapOperatorInput, unknown[]> = (
  ctx?: ExecutionContext,
) => {
  // Augment source with execution context variables ($current, $index, $accumulated)
  // This ensures that when used in nested scenarios, the parent context is accessible
  const basePayload = ctx?.context || {};
  const payload = augmentSourceWithContext(basePayload, ctx);

  return function (params: MapOperatorInput): unknown[] {
    try {
      // Validate params structure and required fields
      const validatedParams = validateArrayOperatorParams(params, "$map", [
        "input",
        "expression",
      ]);

      const { input, expression } = validatedParams;

      // Validate input is an array
      const validArray = validateArrayInput(input, "$map");

      // Handle empty array
      if (!Array.isArray(validArray) || validArray.length === 0) {
        return [];
      }

      // Map over the array with execution context
      return validArray.map((element, index) => {
        // Create execution context for this element
        const elementContext: ExecutionContext = {
          context: payload,
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
            : /* istanbul ignore next */ new Error("$map operation failed"),
        );
      }

      // No fallback - throw error as-is (preserves custom error types)
      throw error;
    }
  };
};
