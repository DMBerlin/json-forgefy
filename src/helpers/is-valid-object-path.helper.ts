import { operators } from "../forgefy.operators";
import { OperatorKey } from "../types/operator.types";

export function isValidObjectPath(value: string): boolean {
  return (
    typeof value === "string" &&
    value.startsWith("$") &&
    !operators.has(value as OperatorKey)
  );
}
