import { isValidObjectPath } from "../helpers/is-valid-object-path.helper";
import { getValueByPath } from "./get-value-by-path.common";
import { operators } from "../forgefy.operators";

export function resolveExpression<T>(
  source: Record<string, any>,
  expression: Record<string, any>,
): T {
  const key = Object.keys(expression)[0];
  const args = isValidObjectPath(expression[key])
    ? getValueByPath(source, expression[key])
    : expression[key];
  const operator = operators.get(key);
  return operator(source)(args);
}
