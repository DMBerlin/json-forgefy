import { resolveValue } from "@common/resolve-value.common";
import { resolveExpression } from "@common/resolve-expression.common";
import { isOperator } from "@helpers/is-operator.helper";
import { FallbackValue } from "@lib-types/fallback.types";

/**
 * Checks if params has a defined fallback property.
 * This helper eliminates repetitive validation across operators.
 *
 * @param params - The params object to check
 * @returns true if params is an object with a defined fallback property
 *
 * @example
 * ```typescript
 * hasFallback({ input: [1, 2], fallback: [] }); // Returns true
 * hasFallback({ input: [1, 2] }); // Returns false
 * hasFallback(null); // Returns false
 * hasFallback(undefined); // Returns false
 * ```
 */
export function hasFallback(
  params: any,
): params is { fallback: FallbackValue } {
  return Boolean(
    params && typeof params === "object" && params.fallback !== undefined,
  );
}

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

  // Check if it's an operator expression
  // Type guard needed for TypeScript - isOperator handles the validation
  if (
    typeof fallback === "object" &&
    fallback !== null &&
    isOperator(fallback)
  ) {
    return resolveExpression(payload, fallback, { context: payload }) as T;
  }

  // Otherwise use resolveValue for paths and primitives
  return resolveValue(fallback, payload, { context: payload }) as T;
}
