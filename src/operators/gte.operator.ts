import { ExecutionContext } from "../interfaces/execution-context.interface";
import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { resolvePathOrExpression } from "../common/resolve-path-or-expression.common";
import { GteOperatorInput } from "../types/operator-input.types";

export const $gte: ExecutableExpression<GteOperatorInput, boolean> = (
  ctx?: ExecutionContext,
) => {
  return function (value: GteOperatorInput): boolean {
    const [firstExpression, secondExpression] = value;
    const firstValue = resolvePathOrExpression(firstExpression, ctx);
    const secondValue = resolvePathOrExpression(secondExpression, ctx);
    return firstValue >= secondValue;
  };
};
