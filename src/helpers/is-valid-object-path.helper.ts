import { operators } from "../forgefy.operators";

export function isValidObjectPath(value: string): boolean {
  return (
    typeof value === "string" && value.startsWith("$") && !operators.has(value)
  );
}
