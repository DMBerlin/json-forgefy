import { resolvePathOrExpression } from "@common/resolve-path-or-expression.common";
import { FallbackValue } from "@lib-types/fallback.types";

/**
 * Resolves a fallback value using the same mechanism as expression resolution.
 * The fallback can be:
 * - A static value: "2025-01-02T00:00:00Z", 123, true, null, etc.
 * - A path to a field in the payload: "$fallback_date", "$user.default_date"
 * - An expression: { $add: [1, 2] }, { $cond: { if: ..., then: ..., else: ... } }
 *
 * @param fallback - The fallback value to resolve (undefined means no fallback)
 * @param payload - The source object used for path and expression resolution
 * @param error - The original error that triggered the fallback
 * @returns The resolved fallback value
 * @throws The original error if fallback is undefined
 *
 * @example
 * ```typescript
 * // Static value
 * resolveFallback("default", payload, error); // Returns "default"
 *
 * // Path resolution
 * resolveFallback("$fallback_date", { fallback_date: "2025-01-02" }, error); // Returns "2025-01-02"
 *
 * // Expression resolution
 * resolveFallback({ $add: [1, 2] }, payload, error); // Returns 3
 *
 * // No fallback - throws original error
 * resolveFallback(undefined, payload, error); // Throws error
 * ```
 */
export function resolveFallback<T = any>(
  fallback: FallbackValue | undefined,
  payload: Record<string, any>,
  error: Error,
): T {
  if (fallback === undefined) {
    throw error;
  }

  // Use the same mechanism of resolution that already exists in the core
  // This automatically handles static values, paths, and expressions
  return resolvePathOrExpression(fallback, { context: payload }) as T;
}
