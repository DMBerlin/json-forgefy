import { ExpressionValues } from "./expression.types";

/**
 * Represents a fallback value that can be:
 * - A static value (string, number, boolean, null, etc.)
 * - A path to a field in the payload (e.g., "$fallback_date")
 * - An expression to be resolved (e.g., { $add: [1, 2] })
 */
export type FallbackValue = ExpressionValues;

/**
 * Interface to be extended by operator inputs that support fallback
 */
export interface WithFallback {
  /**
   * Optional fallback value to use when the operation fails.
   * Can be a static value, a path to a field in the payload, or an expression.
   *
   * @example
   * ```typescript
   * // Static value
   * { fallback: "2025-01-02T00:00:00Z" }
   *
   * // Path to payload field
   * { fallback: "$fallback_date" }
   *
   * // Expression
   * { fallback: { $add: ["$value", 1] } }
   * ```
   */
  fallback?: FallbackValue;
}
