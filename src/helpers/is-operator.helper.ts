import { operatorRegistry } from "@operators/forgefy.operators";
import { OperatorKey } from "@lib-types/operator.types";

/**
 * Determines if an object represents a valid operator expression.
 * An operator expression must have exactly one key that starts with "$" and
 * corresponds to a registered operator in the operators map.
 *
 * @param obj - The object to check for operator structure
 * @returns true if the object is a valid operator expression, false otherwise
 *
 * @example
 * ```typescript
 * isOperator({ $add: [1, 2] }); // Returns true
 * isOperator({ $multiply: ["$amount", 2] }); // Returns true
 * isOperator({ $toString: "$value" }); // Returns true
 *
 * isOperator({ add: [1, 2] }); // Returns false (no $ prefix)
 * isOperator({ $add: [1, 2], $multiply: [3, 4] }); // Returns false (multiple keys)
 * isOperator({ $unknownOp: "value" }); // Returns false (unregistered operator)
 * isOperator({}); // Returns false (no keys)
 * ```
 */
export function isOperator(obj: Record<string, any>): boolean {
  // Handle null, undefined, or non-object values
  if (!obj || typeof obj !== "object") {
    return false;
  }

  const keys: string[] = Object.keys(obj);
  return (
    keys.length === 1 &&
    keys[0].startsWith("$") &&
    operatorRegistry.has(keys[0] as OperatorKey)
  );
}

/**
 * Determines if an object is *shaped* like an operator expression, regardless
 * of whether the operator is actually registered.
 *
 * This is broader than {@link isOperator}: it returns true for any single-key
 * object whose key starts with "$", including unknown or misspelled operators.
 * It is used to detect operator-like values so that unregistered operators can
 * be surfaced (thrown in strict mode, resolved to null otherwise) instead of
 * being silently passed through as plain objects.
 *
 * @param obj - The object to check for operator-like structure
 * @returns true if the object looks like an operator expression, false otherwise
 *
 * @example
 * ```typescript
 * looksLikeOperator({ $add: [1, 2] }); // Returns true (registered)
 * looksLikeOperator({ $unknownOp: 1 }); // Returns true (unregistered but shaped like one)
 * looksLikeOperator({ name: "John" }); // Returns false (no $ prefix)
 * looksLikeOperator({ $a: 1, $b: 2 }); // Returns false (multiple keys)
 * ```
 */
export function looksLikeOperator(obj: Record<string, any>): boolean {
  // Handle null, undefined, or non-object values
  if (!obj || typeof obj !== "object") {
    return false;
  }

  const keys: string[] = Object.keys(obj);
  return keys.length === 1 && keys[0].startsWith("$");
}
