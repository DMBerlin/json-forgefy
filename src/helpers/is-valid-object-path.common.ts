export function isValidObjectPath(value: string): boolean {
  return typeof value === "string" && value.startsWith("$");
}
