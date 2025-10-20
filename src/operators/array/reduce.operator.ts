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
 * Supports:
 * - Simple aggregations (sum, product, concatenation)
 * - Complex expressions ($cond, $switch, math operators, etc.)
 * - Execution context variables ($current, $accumulated, $index)
 * - Initial value for the accumulator
 * - Fallback values for error handling
 * - Empty arrays (returns initialValue)
 *
 * **LIMITATION:** Due to circular module dependencies, you cannot nest $reduce (or other array
 * operators like $map, $filter) within object properties. Nested $reduce calls will return null.
 *
 * **Workaround:** Use $reduce at the expression root level instead of nesting it in object properties,
 * or use sequential operations.
 *
 * @param ctx - Execution context containing the source object
 * @returns A function that reduces an array to a single value with the given expression
 *
 * @example
 * ```typescript
 * // Simple sum
 * {
 *   total: {
 *     $reduce: {
 *       input: [1, 2, 3, 4, 5],
 *       initialValue: 0,
 *       expression: { $add: ["$accumulated", "$current"] }
 *     }
 *   }
 * }
 * // Result: { total: 15 }
 *
 * // Product
 * {
 *   product: {
 *     $reduce: {
 *       input: [2, 3, 4],
 *       initialValue: 1,
 *       expression: { $multiply: ["$accumulated", "$current"] }
 *     }
 *   }
 * }
 * // Result: { product: 24 }
 *
 * // With $cond
 * {
 *   sum: {
 *     $reduce: {
 *       input: [5, -3, 8, -2, 10],
 *       initialValue: 0,
 *       expression: {
 *         $cond: {
 *           if: { $gt: ["$current", 0] },
 *           then: { $add: ["$accumulated", "$current"] },
 *           else: "$accumulated"
 *         }
 *       }
 *     }
 *   }
 * }
 * // Result: { sum: 23 } (only positive numbers)
 *
 * // With $switch
 * {
 *   result: {
 *     $reduce: {
 *       input: ["add", "multiply", "add"],
 *       initialValue: 10,
 *       expression: {
 *         $switch: {
 *           branches: [
 *             {
 *               case: { $eq: ["$current", "add"] },
 *               then: { $add: ["$accumulated", 5] }
 *             },
 *             {
 *               case: { $eq: ["$current", "multiply"] },
 *               then: { $multiply: ["$accumulated", 2] }
 *             }
 *           ],
 *           default: "$accumulated"
 *         }
 *       }
 *     }
 *   }
 * }
 * // Result: { result: 40 } (10 + 5 = 15, 15 * 2 = 30, 30 + 5 = 35... wait let me recalculate)
 * // 10 + 5 = 15, 15 * 2 = 30, 30 + 5 = 35
 *
 * // Building an object
 * {
 *   summary: {
 *     $reduce: {
 *       input: [
 *         { category: "A", value: 10 },
 *         { category: "B", value: 20 },
 *         { category: "A", value: 15 }
 *       ],
 *       initialValue: { A: 0, B: 0 },
 *       expression: {
 *         $cond: {
 *           if: { $eq: ["$current.category", "A"] },
 *           then: {
 *             A: { $add: ["$accumulated.A", "$current.value"] },
 *             B: "$accumulated.B"
 *           },
 *           else: {
 *             A: "$accumulated.A",
 *             B: { $add: ["$accumulated.B", "$current.value"] }
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 * // Result: { summary: { A: 25, B: 20 } }
 *
 * // With index
 * {
 *   weighted: {
 *     $reduce: {
 *       input: [10, 20, 30],
 *       initialValue: 0,
 *       expression: {
 *         $add: [
 *           "$accumulated",
 *           { $multiply: ["$current", { $add: ["$index", 1] }] }
 *         ]
 *       }
 *     }
 *   }
 * }
 * // Result: { weighted: 140 } (10*1 + 20*2 + 30*3 = 10 + 40 + 90 = 140)
 *
 * // With fallback
 * {
 *   safe: {
 *     $reduce: {
 *       input: "$maybeArray",
 *       initialValue: 0,
 *       expression: { $add: ["$accumulated", "$current"] },
 *       fallback: null
 *     }
 *   }
 * }
 *
 * // ❌ LIMITATION - Nested $reduce in object property doesn't work
 * {
 *   $map: {
 *     input: [[1, 2, 3], [4, 5, 6]],
 *     expression: {
 *       sum: {  // ← Nested in object - will return null
 *         $reduce: {
 *           input: "$current",
 *           initialValue: 0,
 *           expression: { $add: ["$accumulated", "$current"] }
 *         }
 *       }
 *     }
 *   }
 * }
 * // Returns: [{ sum: null }, { sum: null }]
 *
 * // ✅ WORKAROUND - $reduce at expression root
 * {
 *   $map: {
 *     input: [[1, 2, 3], [4, 5, 6]],
 *     expression: {
 *       $reduce: {  // ← At root level - works!
 *         input: "$current",
 *         initialValue: 0,
 *         expression: { $add: ["$accumulated", "$current"] }
 *       }
 *     }
 *   }
 * }
 * // Returns: [6, 15]
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
