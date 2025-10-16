import { operatorRegistry } from "@/forgefy.operators";
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
