import { operatorRegistry } from "@/singletons/operators.singleton";
import { OperatorKey } from "@lib-types/operator.types";
import { ExpressionValues } from "@lib-types/expression.types";
import { ExecutionContext } from "@interfaces/execution-context.interface";
import { UnknownOperatorError } from "@lib-types/error.types";
import { isObject } from "@helpers/is-object.helper";
import { resolveArgs } from "./resolve-args.common";

/**
 * Fields whose values must NOT be eagerly resolved before the operator runs.
 *
 * Array-transformation operators ($map, $filter, $reduce) evaluate a
 * sub-expression once per element, injecting per-element context variables
 * ($current, $index, $accumulated). Those variables do not exist yet when the
 * operator's arguments are first resolved, so eagerly resolving the
 * sub-expression would collapse it to null. Instead, these fields are passed
 * through untouched and resolved by the operator itself for each element.
 */
const DEFERRED_ARG_FIELDS: Partial<Record<OperatorKey, readonly string[]>> = {
  $map: ["expression"],
  $filter: ["condition"],
  $reduce: ["expression"],
};

/**
 * Resolves the arguments of an operator expression, honoring deferred fields.
 *
 * For array-transformation operators, every argument is resolved eagerly except
 * the per-element sub-expression (see {@link DEFERRED_ARG_FIELDS}), which is
 * kept raw so the operator can resolve it per element with the correct
 * execution context. All other operators resolve their arguments normally.
 *
 * @param key - The operator key being executed
 * @param args - The raw arguments of the operator
 * @param source - The source object for path/expression resolution
 * @param executionContext - The current execution context
 * @returns The resolved arguments, with deferred fields left untouched
 */
function resolveOperatorArgs(
  key: OperatorKey,
  args: ExpressionValues,
  source: Record<string, any>,
  executionContext: ExecutionContext,
): any {
  const deferredFields = DEFERRED_ARG_FIELDS[key];

  if (deferredFields && isObject(args)) {
    const resolved: Record<string, any> = {};
    for (const field of Object.keys(args as Record<string, unknown>)) {
      resolved[field] = deferredFields.includes(field)
        ? (args as Record<string, unknown>)[field]
        : resolveArgs(
            (args as Record<string, unknown>)[field],
            source,
            executionContext,
            resolveExpression,
          );
    }
    return resolved;
  }

  return resolveArgs(args, source, executionContext, resolveExpression);
}

/**
 * Resolves an operator expression by executing the appropriate operator function.
 * This function:
 * 1. Validates the expression has exactly one operator key
 * 2. Retrieves the operator function from the registry
 * 3. Resolves all arguments (paths, nested expressions, etc.) via resolveArgs
 * 4. Executes the operator with the resolved arguments
 *
 * @template T - The expected return type of the resolved expression
 * @param source - The source object used as context for path resolution and operator execution
 * @param expression - The expression object containing an operator key and its arguments
 * @param executionContext - Optional execution context for array operators with special variables
 * @returns The result of executing the operator, or null if an error occurs
 *
 * @example
 * ```typescript
 * const source = { amount: 100, tax: 0.1 };
 *
 * // Resolve a multiply operation
 * const multiplyExpr = { $multiply: ["$amount", 2] };
 * const result1 = resolveExpression<number>(source, multiplyExpr); // Returns 200
 *
 * // Resolve an add operation with nested expression
 * const addExpr = { $add: ["$amount", { $multiply: ["$amount", "$tax"] }] };
 * const result2 = resolveExpression<number>(source, addExpr); // Returns 110
 *
 * // Resolve a string operation
 * const stringExpr = { $toString: "$amount" };
 * const result3 = resolveExpression<string>(source, stringExpr); // Returns "100"
 *
 * // Resolve with execution context (for array operators)
 * const context: ExecutionContext = { $current: { name: "John" }, $index: 0 };
 * const contextExpr = { $concat: ["User: ", "$current.name"] };
 * const result4 = resolveExpression<string>(source, contextExpr, context); // Returns "User: John"
 * ```
 */
export function resolveExpression<T>(
  source: Record<string, any>,
  expression: ExpressionValues,
  executionContext: ExecutionContext = { context: source },
): T {
  try {
    // Handle non-object values (defensive programming)
    if (typeof expression !== "object" || expression === null) {
      return expression as T;
    }

    // Handle arrays (defensive programming)
    if (Array.isArray(expression)) {
      return expression.map((item) =>
        resolveExpression(source, item, executionContext),
      ) as T;
    }

    // Get operator key
    const keys = Object.keys(expression);

    // Validate single operator key
    if (keys.length !== 1) {
      throw new Error(
        `Expression must have exactly one operator key, found ${keys.length}`,
      );
    }

    const key = keys[0] as OperatorKey;

    // Validate operator exists.
    // The registry lookup is intentionally modeled as possibly-undefined; the
    // guard below narrows it before use (an unknown / misspelled operator key
    // yields undefined here).
    const operator = operatorRegistry.get(key);
    if (!operator) {
      throw new UnknownOperatorError(key, Array.from(operatorRegistry.keys()));
    }

    // Recursively resolve arguments, keeping any deferred per-element
    // sub-expressions (for $map/$filter/$reduce) raw so the operator can
    // resolve them per element with the correct execution context.
    const resolvedArgs = resolveOperatorArgs(
      key,
      expression[key],
      source,
      executionContext,
    );

    // Execute the operator with resolved arguments.
    // Pass the execution context to preserve $current, $index, $accumulated for
    // nested operators. The registry stores operators with an `unknown` result,
    // so the caller-provided T is asserted here.
    return operator(executionContext)(resolvedArgs) as T;
  } catch (error) {
    // In strict mode, surface the error so unknown operators, malformed
    // expressions, and operator failures become diagnosable by the caller.
    if (executionContext.strict) {
      throw error;
    }
    // Return null on errors for backward compatibility
    // This allows operators to handle errors gracefully
    return null;
  }
}
