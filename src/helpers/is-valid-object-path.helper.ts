import { operatorRegistry } from "@operators/forgefy.operators";
import { OperatorKey } from "@lib-types/operator.types";

/**
 * Determines if a string represents a valid object path for value extraction.
 * A valid object path must be a string that starts with "$" but is not a registered operator key.
 * This distinguishes between path references (like "$user.name") and operator expressions (like "$add").
 *
 * @param value - The string value to check
 * @returns true if the value is a valid object path, false otherwise
 *
 * @example
 * ```typescript
 * isValidObjectPath("$user.name"); // Returns true
 * isValidObjectPath("$transaction.amount"); // Returns true
 * isValidObjectPath("$data"); // Returns true
 *
 * isValidObjectPath("$add"); // Returns false (registered operator)
 * isValidObjectPath("$multiply"); // Returns false (registered operator)
 * isValidObjectPath("user.name"); // Returns false (no $ prefix)
 * isValidObjectPath(""); // Returns false (empty string)
 * ```
 */
export function isValidObjectPath(value: string): boolean {
  return (
    typeof value === "string" &&
    value.startsWith("$") &&
    value.length > 1 && // Must have at least one character after "$"
    !operatorRegistry.has(value as OperatorKey)
  );
}
