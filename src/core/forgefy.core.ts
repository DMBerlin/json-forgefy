import { isValidObjectPath } from "../helpers/is-valid-object-path.common";
import { getValueByPath } from "../common/get-value-by-path.common";
import { isObject } from "../helpers/is-object.helper";
import { isOperator } from "../helpers/is-operator.common";
import { resolveOperation } from "../common/resolve-operation.common";

function assignValueByOperator(
  key: string,
  source: Record<string, any>,
  blueprint: Record<string, any>,
): void {
  blueprint[key] = resolveOperation(source, blueprint[key]);
}

function assignValueByPath(
  key: string,
  source: Record<string, any>,
  blueprint: Record<string, any>,
): void {
  blueprint[key] = getValueByPath(source, blueprint[key]);
}

function keyHandler(
  key: string,
  source: Record<string, any>,
  blueprint: Record<string, any>,
): void {
  if (isValidObjectPath(blueprint[key])) {
    assignValueByPath(key, source, blueprint);
  } else if (isObject(blueprint[key])) {
    if (isOperator(blueprint[key])) {
      assignValueByOperator(key, source, blueprint);
    } else {
      blueprint[key] = forgefy(source, blueprint[key]);
    }
  }
}

export function forgefy(
  source: Record<string, any>,
  blueprint: Record<string, any>,
): Record<string, any> {
  for (const key of Object.keys(blueprint)) {
    keyHandler(key, source, blueprint);
  }
  return blueprint;
}
