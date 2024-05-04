export function isObject(value: any): boolean {
  return value instanceof Object && !Array.isArray(value);
}
