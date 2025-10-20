import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ExecutionContext } from "@interfaces/execution-context.interface";
import { ExistsOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $exists operator checks if a field exists in the source object.
 * It returns true if the field path exists (even if the value is null or undefined),
 * false if the path does not exist in the object structure.
 *
 * Note: This operator is special - it needs the context to check path existence
 * and expects to receive the raw path string (not resolved value) to perform
 * the existence check on the object structure.
 *
 * @param ctx - Execution context containing the source object for path checking
 * @returns A function that returns true if the field path exists, false otherwise
 *
 * @example
 * ```typescript
 * // In a projection:
 * {
 *   hasEmail: { $exists: "user.email" },
 *   hasProfile: { $exists: "user.profile" },
 *   hasOptionalField: { $exists: "settings.notifications.email" },
 *   hasNestedArray: { $exists: "data.items.0.name" }
 * }
 * ```
 */
export const $exists: ExecutableExpression<ExistsOperatorInput, boolean> = (
  ctx?: ExecutionContext,
) => {
  return function (fieldPath: ExistsOperatorInput): boolean {
    if (!ctx?.context) {
      return false;
    }

    // The fieldPath should be a string path (already resolved by resolveArgs)
    // but for $exists, we expect it to be the actual path string, not the resolved value
    const pathString =
      typeof fieldPath === "string" ? fieldPath : String(fieldPath);

    // Remove the $ prefix if present for path checking
    const cleanPath = pathString.startsWith("$")
      ? pathString.slice(1)
      : pathString;

    try {
      // Check if the path exists by traversing the object
      const pathParts = cleanPath.split(".");
      let current: any = ctx.context;

      for (const part of pathParts) {
        if (
          current === null ||
          current === undefined ||
          typeof current !== "object"
        ) {
          return false;
        }
        if (!(part in current)) {
          return false;
        }
        current = current[part];
      }

      return true;
    } catch {
      // If any error occurs during traversal, the path doesn't exist
      return false;
    }
  };
};
