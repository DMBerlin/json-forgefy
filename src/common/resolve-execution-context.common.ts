import { ExecutionContext } from "@interfaces/execution-context.interface";

/**
 * Augments a source object with execution context variables.
 * This function adds $current, $accumulated, and $index to the source object
 * (without the $ prefix) so they can be resolved as regular paths.
 *
 * @param source - The original source object
 * @param executionContext - The execution context containing special variables
 * @returns A new object with the source and context variables merged
 *
 * @example
 * ```typescript
 * const source = { amount: 100 };
 * const ctx: ExecutionContext = {
 *   context: source,
 *   $current: { name: "Alice", age: 25 },
 *   $index: 2,
 *   $accumulated: 150
 * };
 *
 * const augmented = augmentSourceWithContext(source, ctx);
 * // Returns: {
 * //   amount: 100,
 * //   current: { name: "Alice", age: 25 },
 * //   index: 2,
 * //   accumulated: 150
 * // }
 * ```
 */
export function augmentSourceWithContext(
  source: Record<string, any>,
  executionContext?: ExecutionContext,
): Record<string, any> {
  if (!executionContext) {
    return source;
  }

  return {
    ...source,
    ...(executionContext.$current !== undefined && {
      current: executionContext.$current,
    }),
    ...(executionContext.$accumulated !== undefined && {
      accumulated: executionContext.$accumulated,
    }),
    ...(executionContext.$index !== undefined && {
      index: executionContext.$index,
    }),
  };
}
