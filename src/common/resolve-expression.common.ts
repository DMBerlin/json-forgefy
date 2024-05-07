import { isValidObjectPath } from "../helpers/is-valid-object-path.common";
import { getValueByPath } from "./get-value-by-path.common";
import { operators } from "../forgefy.operators";

export function resolveExpression<T>(
  source: Record<string, any>,
  operator: Record<string, any>,
): T {
  const key = Object.keys(operator)[0];
  const args = isValidObjectPath(operator[key])
    ? getValueByPath(source, operator[key])
    : operator[key];
  const executable = operators.get(key);
  return executable(source)(args);
}
