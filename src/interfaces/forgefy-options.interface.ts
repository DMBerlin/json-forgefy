/**
 * Options that control how a transformation is executed.
 */
export interface ForgefyOptions {
  /**
   * When true, the transformation surfaces errors instead of silently
   * resolving failing expressions to `null`.
   *
   * In strict mode:
   * - Unknown / misspelled operators throw {@link UnknownOperatorError}.
   * - Malformed expressions (e.g. multiple operator keys) throw.
   * - Errors raised inside operators propagate to the caller.
   *
   * Defaults to `false`, preserving the library's graceful "errors become
   * null" behavior for backward compatibility.
   */
  strict?: boolean;
}
