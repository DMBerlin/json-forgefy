import { resolveExpression } from "../common/resolve-expression.common";
import { ExecutionContext } from "../interfaces/execution-context.interface";
import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { CondOperatorInput } from "../types/operator-input.types";

export const $cond: ExecutableExpression<CondOperatorInput, unknown> = (
  ctx?: ExecutionContext,
) => {
  return function (value: CondOperatorInput): unknown {
    return resolveExpression(ctx?.context, value.if) ? value.then : value.else;
  };
};
