import { isOperator } from "../helpers/is-operator.helper";
import { resolveExpression } from "../common/resolve-expression.common";
import { isValidObjectPath } from "../helpers/is-valid-object-path.helper";
import { getValueByPath } from "../common/get-value-by-path.common";
import { ExecutionContext } from "../interfaces/execution-context.interface";
import { EqOperatorInput } from "../types/operator-inputs.types";
import { ExecutableExpression } from "../interfaces/executable-expression.interface";

export const $eq: ExecutableExpression<EqOperatorInput, boolean> = (
  ctx?: ExecutionContext,
) => {
  return function (values: EqOperatorInput): boolean {
    const prepare: Array<unknown> = values.map((value) => {
      if (typeof value === "object" && isOperator(value)) {
        return resolveExpression(ctx.context, value);
      }
      if (typeof value === "string" && isValidObjectPath(value)) {
        return getValueByPath(ctx.context, value);
      }
      return value;
    });
    return prepare[0] === prepare[1];
  };
};
