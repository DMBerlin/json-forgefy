import { ExecutableExpression } from "@interfaces/executable-expression.interface";
import { ExecutionContext } from "@interfaces/execution-context.interface";
import { ExistsOperatorInput } from "@lib-types/operator-input.types";

/**
 * The $exists operator checks if a field exists in the source object.
 * It returns true if the field path exists (even if the value is null or undefined),
 * false if the path does not exist in the object structure.
 *
 * @param ctx - Optional execution context containing the source object for path resolution
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

    // Remove the $ prefix if present for path checking
    const cleanPath = fieldPath.startsWith("$")
      ? fieldPath.slice(1)
      : fieldPath;

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
