import { ExecutionContext } from "../interfaces/execution-context.interface";
import { getValueByPath } from "./get-value-by-path.common";
import { resolveExpression } from "./resolve-expression.common";
import { isValidObjectPath } from "../helpers/is-valid-object-path.helper";
import { isOperator } from "../helpers/is-operator.helper";

/**
 * Resolves a value that can be either a direct value, an object path, or an operator expression.
 * This utility function determines the type of the input value and processes it accordingly:
 * - If it's a valid object path (string starting with $), extracts the value from the context
 * - If it's an operator expression (object with operator key), resolves the expression
 * - Otherwise, returns the value as-is
 *
 * @param value - The value to resolve, which can be a primitive, path string, or operator expression
 * @param ctx - Optional execution context containing the source object for path/expression resolution
 * @returns The resolved value after processing paths and expressions, or the original value if no processing is needed
 *
 * @example
 * ```typescript
 * const context = { user: { name: "John" }, amount: 100 };
 * const ctx = { context };
 *
 * // Resolve a path
 * resolvePathOrExpression("$user.name", ctx); // Returns "John"
 *
 * // Resolve an expression
 * resolvePathOrExpression({ $multiply: ["$amount", 2] }, ctx); // Returns 200
 *
 * // Return direct value
 * resolvePathOrExpression("hello", ctx); // Returns "hello"
 * resolvePathOrExpression(42, ctx); // Returns 42
 * ```
 */
export const resolvePathOrExpression = (
  value: unknown,
  ctx?: ExecutionContext,
) => {
  if (typeof value === "string" && isValidObjectPath(value)) {
    return getValueByPath(ctx?.context, value);
  } else if (typeof value === "object" && isOperator(value)) {
    return resolveExpression(ctx?.context, value);
  } else {
    return value;
  }
};
