import { ExecutionContext } from "@interfaces/execution-context.interface";
import { OperatorInput } from "@lib-types/operator.types";

/**
 * The canonical signature for every operator implementation.
 *
 * An operator is a curried factory: it optionally receives an
 * {@link ExecutionContext} (used by array operators for `$current` / `$index` /
 * `$accumulated`) and returns the function that computes the result from a
 * fully-resolved input.
 *
 * **Resolution contract:** by the time an operator's inner function runs, its
 * input has already been resolved by `resolveArgs` — every path (`$field`) has
 * been looked up and every nested operator expression evaluated. Implementations
 * therefore operate on concrete values only and never re-resolve their inputs.
 *
 * @typeParam P - The resolved input type accepted by the operator
 * @typeParam R - The operator's return type
 */
export type ExecutableExpression<P extends OperatorInput, R = unknown> = (
  ctx?: ExecutionContext,
) => (value: P) => R;
