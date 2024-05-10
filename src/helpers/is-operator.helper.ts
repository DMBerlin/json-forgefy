import { operators } from "../forgefy.operators";

export function isOperator(obj: Record<string, any>): boolean {
  const keys: string[] = Object.keys(obj);
  return keys.length === 1 && keys[0].startsWith("$") && operators.has(keys[0]);
}
