import { isValidObjectPath } from "@helpers/is-valid-object-path.helper";
import { getValueByPath } from "@common/get-value-by-path.common";
import { cloneProjection } from "@common/clone-projection.common";
import { isObject } from "@helpers/is-object.helper";
import { looksLikeOperator } from "@helpers/is-operator.helper";
import { resolveExpression } from "@common/resolve-expression.common";
import { Projection } from "@lib-types/expression.types";
import { ForgefyOptions } from "@interfaces/forgefy-options.interface";

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
  strict: boolean,
): void {
  node[key] = resolveExpression(origin, node[key], {
    context: origin,
    strict,
  });
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
  strict: boolean,
): void {
  if (isValidObjectPath(node[key])) {
    assignValueByPath(key, origin, node);
  } else if (isObject(node[key])) {
    if (looksLikeOperator(node[key])) {
      // Any single "$"-prefixed key is treated as an operator invocation.
      // Registered operators resolve normally; unknown / misspelled operators
      // are surfaced by resolveExpression (thrown in strict mode, resolved to
      // null otherwise) instead of being silently passed through verbatim.
      assignValueByOperator(key, origin, node, strict);
    } else {
      node[key] = forgefyNode(origin, node[key], strict);
    }
  }
}

/**
 * Recursively resolves every key of an already-cloned projection node in place.
 * This is the internal worker used by {@link forgefy}. It operates on a node
 * that is guaranteed to be a private copy, so mutating it has no observable
 * side effects on the caller's blueprint.
 *
 * @param payload - The source object used as context for resolution
 * @param node - The (cloned) projection node to resolve in place
 * @param strict - When true, resolution errors are surfaced instead of nulled
 * @returns The resolved node
 */
function forgefyNode(
  payload: Record<string, any>,
  node: Record<string, any>,
  strict: boolean,
): Record<string, any> {
  for (const key of Object.keys(node)) {
    keyHandler(key, payload, node, strict);
  }
  return node;
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
 * @param options - Optional transformation options. Set `{ strict: true }` to surface
 *                   errors (unknown operators, malformed expressions, operator failures)
 *                   instead of silently resolving them to null.
 * @returns A new transformed object with the same structure as the projection but with resolved values.
 *          The original projection blueprint is never mutated, so it can be safely reused across calls.
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
 * const result = Forgefy.this(payload, projection);
 * // Result: {
 * //   userName: "John",
 * //   userAge: 30,
 * //   amount: 100.5,
 * //   amountCents: 10050,
 * //   currency: "USD"
 * // }
 *
 * // Strict mode surfaces mistakes instead of returning null:
 * Forgefy.this(payload, { total: { $addd: ["$user.age", 1] } }, { strict: true });
 * // Throws UnknownOperatorError
 * ```
 */
export function forgefy(
  payload: Record<string, any>,
  projection: Projection,
  options?: ForgefyOptions,
): Record<string, any> {
  const strict = options?.strict ?? false;
  // Clone the projection once so the caller's blueprint is never mutated and
  // can be reused across multiple payloads. Recursion happens over this private
  // copy via forgefyNode, so nested nodes are not re-cloned.
  //
  // A dedicated recursive clone is used instead of structuredClone because the
  // latter produces objects bound to the Node realm, which breaks `instanceof`
  // checks (e.g. isObject) when running inside sandboxed realms such as Jest's
  // VM. cloneProjection rebuilds plain objects/arrays in the current realm.
  const draft = cloneProjection(projection) as Record<string, any>;
  return forgefyNode(payload, draft, strict);
}
