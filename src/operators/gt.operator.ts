import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { ExpressionValues } from "../types/expression.types";
import { ExecutionContext } from "../interfaces/execution-context.interface";
import { resolvePathOrExpression } from "../common/resolve-path-or-expression.common";

type GtOperatorInput = [ExpressionValues, ExpressionValues];

export const $gt: ExecutableExpression<GtOperatorInput, boolean> = (
  ctx?: ExecutionContext,
) => {
  return function (value: GtOperatorInput): boolean {
    const [firstExpression, secondExpression] = value;
    const firstValue = resolvePathOrExpression(firstExpression, ctx);
    const secondValue = resolvePathOrExpression(secondExpression, ctx);
    return firstValue > secondValue;
  };
};
