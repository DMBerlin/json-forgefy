import * as fs from "fs";
import * as path from "path";
import { operatorRegistry } from "@operators/forgefy.operators";
import { OperatorKey } from "@lib-types/operator.types";

/**
 * Regression suite that protects the operator registry as the library scales.
 *
 * These tests are intentionally data-driven: they discover operator source
 * files on disk rather than relying on a hard-coded list. As a result, they
 * automatically guard every newly added operator without any test changes,
 * catching the most common mistakes when introducing a new operator:
 *
 * - Creating an operator file but forgetting to register it.
 * - Registering the same operator key from two different files.
 * - Registering a malformed operator (wrong callable shape).
 * - Using an operator key that does not follow the `$`-prefixed convention.
 */
describe("Operator registry integrity", () => {
  const operatorsDir = path.resolve(__dirname);

  /** Recursively collects every `*.operator.ts` source file (excluding specs). */
  function collectOperatorFiles(dir: string): string[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files: string[] = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...collectOperatorFiles(fullPath));
      } else if (
        entry.name.endsWith(".operator.ts") &&
        !entry.name.endsWith(".spec.ts")
      ) {
        files.push(fullPath);
      }
    }

    return files;
  }

  /** Extracts every exported `$`-prefixed operator name from a module. */
  function operatorExportsOf(filePath: string): string[] {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require(filePath) as Record<string, unknown>;
    return Object.keys(mod).filter((key) => key.startsWith("$"));
  }

  const operatorFiles = collectOperatorFiles(operatorsDir);

  it("should discover operator source files on disk", () => {
    expect(operatorFiles.length).toBeGreaterThan(0);
  });

  it("should register every operator exported by a source file", () => {
    const unregistered: string[] = [];

    for (const file of operatorFiles) {
      for (const exportName of operatorExportsOf(file)) {
        if (!operatorRegistry.has(exportName as OperatorKey)) {
          unregistered.push(
            `${exportName} (${path.relative(operatorsDir, file)})`,
          );
        }
      }
    }

    expect(unregistered).toEqual([]);
  });

  it("should not export the same operator key from more than one file", () => {
    const keyToFiles = new Map<string, string[]>();

    for (const file of operatorFiles) {
      for (const exportName of operatorExportsOf(file)) {
        const relative = path.relative(operatorsDir, file);
        keyToFiles.set(exportName, [
          ...(keyToFiles.get(exportName) ?? []),
          relative,
        ]);
      }
    }

    const duplicates = [...keyToFiles.entries()]
      .filter(([, files]) => files.length > 1)
      .map(([key, files]) => `${key}: ${files.join(", ")}`);

    expect(duplicates).toEqual([]);
  });

  it("should expose a callable factory for every registered operator", () => {
    for (const key of operatorRegistry.keys()) {
      const factory = operatorRegistry.get(key);
      expect(typeof factory).toBe("function");
      // Every operator follows the curried `(ctx?) => (args) => result` shape.
      expect(typeof factory?.()).toBe("function");
    }
  });

  it("should only register keys that follow the $-prefixed convention", () => {
    const invalid = [...operatorRegistry.keys()].filter(
      (key) => !key.startsWith("$"),
    );

    expect(invalid).toEqual([]);
  });
});
