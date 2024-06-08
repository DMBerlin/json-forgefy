import { ExecutionContext } from "../interfaces/execution-context.interface";
import { getValueByPath } from "./get-value-by-path.common";
import { resolveExpression } from "./resolve-expression.common";
import { isValidObjectPath } from "../helpers/is-valid-object-path.helper";
import { isOperator } from "../helpers/is-operator.helper";

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
