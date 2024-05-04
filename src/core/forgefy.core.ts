import { isValidObjectPath } from "../helpers/is-valid-object-path.common";
import { getValueByPath } from "../common/get-value-by-path.common";
import { isObject } from "../helpers/is-object.helper";
import { isOperator } from "../helpers/is-operator.common";
import { resolveOperation } from "../common/resolve-operation.common";

export function forgefy(
  source: Record<string, any>,
  blueprint: Record<string, any>,
): Record<string, any> {
  for (const key of Object.keys(blueprint)) {
    if (isValidObjectPath(blueprint[key])) {
      blueprint[key] = getValueByPath(source, blueprint[key]);
    } else if (isObject(blueprint[key])) {
      if (isOperator(blueprint[key])) {
        blueprint[key] = resolveOperation(source, blueprint[key]);
      } else {
        blueprint[key] = forgefy(source, blueprint[key]);
      }
    }
  }
  return blueprint;
}
