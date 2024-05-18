import { isValidObjectPath } from "../helpers/is-valid-object-path.helper";
import { getValueByPath } from "../common/get-value-by-path.common";
import { isObject } from "../helpers/is-object.helper";
import { isOperator } from "../helpers/is-operator.helper";
import { resolveExpression } from "../common/resolve-expression.common";
import { Projection } from "../types/expression.types";

function assignValueByOperator(
  key: string,
  origin: Record<string, any>,
  node: Record<string, any>,
): void {
  node[key] = resolveExpression(origin, node[key]);
}

function assignValueByPath(
  key: string,
  origin: Record<string, any>,
  node: Record<string, any>,
): void {
  node[key] = getValueByPath(origin, node[key]);
}

function keyHandler(
  key: string,
  origin: Record<string, any>,
  node: Record<string, any>,
): void {
  if (isValidObjectPath(node[key])) {
    assignValueByPath(key, origin, node);
  } else if (isObject(node[key])) {
    if (isOperator(node[key])) {
      assignValueByOperator(key, origin, node);
    } else {
      node[key] = forgefy(origin, node[key]);
    }
  }
}

/**
 * @description Function that converts an incoming payload to a new object based on the projection.
 * @param payload
 * @param projection
 * @returns {Record<string, any>}
 */
export function forgefy(
  payload: Record<string, any>,
  projection: Projection,
): Record<string, any> {
  for (const key of Object.keys(projection)) {
    keyHandler(key, payload, projection);
  }
  return projection;
}
