/**
 * Recursively deep-clones a JSON-like projection blueprint.
 *
 * Blueprints only ever contain JSON-compatible values (strings, numbers,
 * booleans, null, arrays and plain objects), so a simple structural clone is
 * sufficient. Unlike the global `structuredClone`, this implementation rebuilds
 * plain objects and arrays using literals in the current realm, which keeps
 * `instanceof` checks (such as `isObject`) working correctly even inside
 * sandboxed realms (e.g. Jest's VM context).
 *
 * @template T - The type of the value being cloned
 * @param value - The value to clone
 * @returns A deep copy of the value that shares no references with the original
 *
 * @example
 * ```typescript
 * const blueprint = { total: { $add: ["$a", 1] } };
 * const copy = cloneProjection(blueprint);
 * copy !== blueprint;             // true
 * copy.total !== blueprint.total; // true
 * ```
 */
export function cloneProjection<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => cloneProjection(item)) as unknown as T;
  }

  if (value !== null && typeof value === "object") {
    const cloned: Record<string, unknown> = {};
    for (const key of Object.keys(value as Record<string, unknown>)) {
      cloned[key] = cloneProjection((value as Record<string, unknown>)[key]);
    }
    return cloned as T;
  }

  return value;
}
