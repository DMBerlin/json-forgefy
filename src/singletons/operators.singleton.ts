import { OperatorKey, OperatorValue } from "@/types/operator.types";

/**
 * Singleton Operator Registry
 *
 * Solves circular dependency by providing a global registry that:
 * 1. Is created at module load (empty)
 * 2. Gets populated by forgefy.operators.ts (after all imports)
 * 3. Is accessed at runtime (when fully populated)
 *
 * This breaks the circular dependency chain:
 * - array operators → resolve-expression → registry (gets singleton instance)
 * - forgefy.operators → array operators → ... (already loaded)
 * - forgefy.operators → registry.set() (populates singleton)
 *
 * At runtime, resolve-expression uses the fully-populated singleton.
 */
class OperatorRegistry {
  private static instance: OperatorRegistry | null = null;
  private registry: Map<OperatorKey, OperatorValue> = new Map();

  private constructor() {
    // Private constructor ensures singleton pattern
  }

  public static getInstance(): OperatorRegistry {
    /* istanbul ignore next - singleton always created on first import */
    if (!OperatorRegistry.instance) {
      OperatorRegistry.instance = new OperatorRegistry();
    }
    return OperatorRegistry.instance;
  }

  public register(key: OperatorKey, operator: OperatorValue): this {
    this.registry.set(key, operator);
    return this;
  }

  public get(key: OperatorKey): OperatorValue | undefined {
    return this.registry.get(key);
  }

  public has(key: OperatorKey): boolean {
    return this.registry.has(key);
  }

  public keys(): IterableIterator<OperatorKey> {
    return this.registry.keys();
  }
}

// Export singleton instance - single source of truth for v4.0.0
export const operatorRegistry: OperatorRegistry =
  OperatorRegistry.getInstance();
