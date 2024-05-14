import { operators } from "../forgefy.operators";
import { OperatorKey } from "../types/operator.types";

export function isOperator(obj: Record<string, any>): boolean {
  const keys: string[] = Object.keys(obj);
  return (
    keys.length === 1 &&
    keys[0].startsWith("$") &&
    operators.has(keys[0] as OperatorKey)
  );
}
