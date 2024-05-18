import { resolveExpression } from "../common/resolve-expression.common";
import { ExecutionContext } from "../interfaces/execution-context.interface";
import { CondOperatorInput } from "../types/operator-inputs.types";
import { ExecutableExpression } from "../interfaces/executable-expression.interface";

export const $cond: ExecutableExpression<CondOperatorInput, unknown> = (
  ctx?: ExecutionContext,
) => {
  return function (value: CondOperatorInput): unknown {
    return resolveExpression(ctx.context, value.if) ? value.then : value.else;
  };
};
