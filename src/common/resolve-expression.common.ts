import { isValidObjectPath } from "../helpers/is-valid-object-path.helper";
import { getValueByPath } from "./get-value-by-path.common";
import { operators } from "../forgefy.operators";
import { OperatorKey, OperatorValue } from "../types/operator.types";
import { ExpressionValues } from "../types/expression.types";

export function resolveExpression<T>(
  source: Record<string, any>,
  expression: ExpressionValues,
): T {
  try {
    const key: OperatorKey = Object.keys(expression)[0] as OperatorKey;
    const args = isValidObjectPath(expression[key])
      ? getValueByPath(source, expression[key])
      : expression[key];
    const operator: OperatorValue = operators.get(key);
    return operator({ context: source })(args);
  } catch {
    return null;
  }
}
