import { ExecutionContext } from "../interfaces/execution-context.interface";
import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { LteOperatorInput } from "../types/operator-input.types";
import { resolvePathOrExpression } from "../common/resolve-path-or-expression.common";

export const $lte: ExecutableExpression<LteOperatorInput, boolean> = (
  ctx?: ExecutionContext,
) => {
  return function (value: LteOperatorInput): boolean {
    const [firstExpression, secondExpression] = value;
    const firstValue = resolvePathOrExpression(firstExpression, ctx);
    const secondValue = resolvePathOrExpression(secondExpression, ctx);
    return firstValue <= secondValue;
  };
};
