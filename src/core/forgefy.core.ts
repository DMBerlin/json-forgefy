import { isValidObjectPath } from "@helpers/is-valid-object-path.helper";
import { getValueByPath } from "@common/get-value-by-path.common";
import { isObject } from "@helpers/is-object.helper";
import { isOperator } from "@helpers/is-operator.helper";
import { resolveExpression } from "@common/resolve-expression.common";
import { Projection } from "@lib-types/expression.types";

/**
 * Assigns a value to a node property by resolving an operator expression.
 * This function handles cases where the node value contains an operator (like $add, $multiply, etc.)
 * and resolves it using the original payload as context.
 *
 * @param key - The property key in the node object to assign the resolved value to
 * @param origin - The original payload object used as context for expression resolution
 * @param node - The target node object where the resolved value will be assigned
 * @returns void - Modifies the node object in place
 *
 * @example
 * ```typescript
 * const origin = { amount: 100 };
 * const node = { total: { $multiply: ["$amount", 2] } };
 * assignValueByOperator("total", origin, node);
 * // node.total is now 200
 * ```
 */
function assignValueByOperator(
  key: string,
  origin: Record<string, any>,
  node: Record<string, any>,
): void {
  node[key] = resolveExpression(origin, node[key]);
}

/**
 * Assigns a value to a node property by extracting it from the origin object using a path.
 * This function handles cases where the node value is a string path (like "$user.name")
 * and extracts the corresponding value from the original payload.
 *
 * @param key - The property key in the node object to assign the extracted value to
 * @param origin - The original payload object to extract the value from
 * @param node - The target node object where the extracted value will be assigned
 * @returns void - Modifies the node object in place
 *
 * @example
 * ```typescript
 * const origin = { user: { name: "John", age: 30 } };
 * const node = { userName: "$user.name" };
 * assignValueByPath("userName", origin, node);
 * // node.userName is now "John"
 * ```
 */
function assignValueByPath(
  key: string,
  origin: Record<string, any>,
  node: Record<string, any>,
): void {
  node[key] = getValueByPath(origin, node[key]);
}

/**
 * Handles the processing of a single key-value pair in the projection object.
 * This function determines the type of value (path, operator, or nested object) and
 * processes it accordingly by delegating to the appropriate handler function.
 *
 * @param key - The property key being processed
 * @param origin - The original payload object used as context
 * @param node - The projection node being processed
 * @returns void - Modifies the node object in place
 *
 * @example
 * ```typescript
 * const origin = { user: { name: "John" }, amount: 100 };
 * const node = {
 *   userName: "$user.name",           // Will use assignValueByPath
 *   total: { $multiply: ["$amount", 2] }, // Will use assignValueByOperator
 *   nested: { value: "$amount" }      // Will recursively call forgefy
 * };
 * keyHandler("userName", origin, node);
 * ```
 */
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
 * Transforms an incoming payload into a new object structure based on a projection blueprint.
 * This is the main function of the json-forgefy library that processes each key-value pair
 * in the projection and applies the appropriate transformations using operators, path extraction,
 * or recursive processing for nested objects.
 *
 * @param payload - The source object containing the data to be transformed
 * @param projection - The blueprint object defining how the payload should be transformed.
 *                    Can contain direct values, object paths (starting with $), operators, or nested objects
 * @returns The transformed object with the same structure as the projection but with resolved values
 *
 * @example
 * ```typescript
 * const payload = {
 *   user: { name: "John", age: 30 },
 *   transaction: { amount: "100.50", currency: "USD" }
 * };
 *
 * const projection = {
 *   userName: "$user.name",
 *   userAge: "$user.age",
 *   amount: { $toNumber: "$transaction.amount" },
 *   amountCents: { $multiply: [{ $toNumber: "$transaction.amount" }, 100] },
 *   currency: "$transaction.currency"
 * };
 *
 * const result = forgefy(payload, projection);
 * // Result: {
 * //   userName: "John",
 * //   userAge: 30,
 * //   amount: 100.5,
 * //   amountCents: 10050,
 * //   currency: "USD"
 * // }
 * ```
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
