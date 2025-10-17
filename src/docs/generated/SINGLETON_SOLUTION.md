# Singleton Registry Solution

**User Insight:** Use a singleton pattern with clear lifecycle phases

## The Solution

### Phase 1: Registry Creation (Global Scope)
Create empty registry that's globally accessible

### Phase 2: Operator Registration  
Register all operators into the singleton

### Phase 3: Runtime Usage
Operators access the fully-populated registry at runtime

---

## Implementation Plan

```typescript
// 1. operators.singleton.ts - Singleton with lazy getter
class OperatorRegistry {
  private static instance: OperatorRegistry;
  private registry: Map<OperatorKey, OperatorValue> = new Map();
  
  private constructor() {}
  
  static getInstance(): OperatorRegistry {
    if (!OperatorRegistry.instance) {
      OperatorRegistry.instance = new OperatorRegistry();
    }
    return OperatorRegistry.instance;
  }
  
  register(key: OperatorKey, operator: OperatorValue) {
    this.registry.set(key, operator);
  }
  
  get(key: OperatorKey): OperatorValue | undefined {
    return this.registry.get(key);
  }
  
  getAll(): Map<OperatorKey, OperatorValue> {
    return this.registry;
  }
}

export const operatorRegistry = OperatorRegistry.getInstance();
```

This breaks the circular dependency because operators import the **instance**, not the module that imports them!

