import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ExecutionContext } from "@interfaces/execution-context.interface";
import { MapOperatorInput } from "@lib-types/operator-input.types";
import { resolveArgs } from "@common/resolve-args.common";
import { resolveFallback } from "@helpers/fallback.helper";
import { augmentSourceWithContext } from "@common/resolve-execution-context.common";
import { resolveExpression } from "@common/resolve-expression.common";
import {
  ArrayOperatorInputError,
  MissingOperatorParameterError,
  MalformedOperatorParametersError,
} from "@lib-types/error.types";

/**
 * The $map operator transforms each element in an array using an expression.
 * It iterates over the array and applies the provided expression to each element,
 * making the current element available as $current and the index as $index.
 *
 * Supports:
 * - Simple transformations
 * - Complex nested expressions ($cond, $switch, math operators, etc.)
 * - Execution context variables ($current, $index)
 * - Fallback values for error handling
 * - Empty arrays
 *
 * **LIMITATION:** Due to circular module dependencies, you cannot nest $map (or other array
 * operators like $filter, $reduce) within object properties. Nested $map calls will return null.
 *
 * **Workaround:** Use $map at the expression root level instead of nesting it in object properties,
 * or use sequential map operations.
 *
 * @param ctx - Execution context containing the source object
 * @returns A function that maps over an array with the given expression
 *
 * @example
 * ```typescript
 * // Simple transformation
 * {
 *   doubled: {
 *     $map: {
 *       input: "$numbers",
 *       expression: { $multiply: ["$current", 2] }
 *     }
 *   }
 * }
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
 * // With index
 * {
 *   indexed: {
 *     $map: {
 *       input: "$items",
 *       expression: {
 *         item: "$current",
 *         position: { $add: ["$index", 1] } // 1-based index
 *       }
 *     }
 *   }
 * }
 *
 * // With fallback
 * {
 *   safe: {
 *     $map: {
 *       input: "$maybeArray",
 *       expression: "$current",
 *       fallback: []
 *     }
 *   }
 * }
 *
 * // ❌ LIMITATION - Nested $map in object property doesn't work
 * {
 *   $map: {
 *     input: [{ items: [1, 2, 3] }],
 *     expression: {
 *       doubled: {  // ← Nested in object - will return null
 *         $map: { input: "$current.items", expression: { $multiply: ["$current", 2] } }
 *       }
 *     }
 *   }
 * }
 * // Returns: [{ doubled: null }]
 *
 * // ✅ WORKAROUND - $map at expression root
 * {
 *   $map: {
 *     input: [{ items: [1, 2, 3] }],
 *     expression: {
 *       $map: {  // ← At root level - works!
 *         input: "$current.items",
 *         expression: { $multiply: ["$current", 2] }
 *       }
 *     }
 *   }
 * }
 * // Returns: [[2, 4, 6]]
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
      // Validate params structure
      if (!params || typeof params !== "object" || !("input" in params)) {
        throw new MalformedOperatorParametersError(
          "$map",
          "an object with 'input' and 'expression'",
          params,
        );
      }

      const { input, expression } = params;

      // Validate input is an array
      if (!Array.isArray(input)) {
        throw new ArrayOperatorInputError("$map", typeof input, input);
      }

      // Validate expression is provided
      if (expression === undefined) {
        throw new MissingOperatorParameterError("$map", "expression", [
          "input",
          "expression",
        ]);
      }

      // Handle empty array
      if (input.length === 0) {
        return [];
      }

      // Map over the array with execution context
      return input.map((element, index) => {
        // Create execution context for this element
        const elementContext: ExecutionContext = {
          context: payload,
          $current: element,
          $index: index,
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
      if (
        params &&
        typeof params === "object" &&
        params.fallback !== undefined
      ) {
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
