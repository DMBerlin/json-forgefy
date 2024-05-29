import { ExecutableExpression } from "../interfaces/executable-expression.interface";
import { IfNullOperatorInput } from "../types/operator-input.types";
import { isOperator } from "../helpers/is-operator.helper";
import { resolveExpression } from "../common/resolve-expression.common";
import { isValidObjectPath } from "../helpers/is-valid-object-path.helper";
import { getValueByPath } from "../common/get-value-by-path.common";
import { ExecutionContext } from "../interfaces/execution-context.interface";

export const $ifNull: ExecutableExpression<
  IfNullOperatorInput,
  unknown | null
> = (ctx?: ExecutionContext) => {
  return function (values: IfNullOperatorInput): unknown {
    if (typeof values[0] === "object" && isOperator(values[0])) {
      values[0] = resolveExpression(ctx?.context, values[0]);
    } else if (typeof values[0] === "string" && isValidObjectPath(values[0])) {
      values[0] = getValueByPath(ctx?.context, values[0]);
    }
    return values[0] ?? values[1];
  };
};
