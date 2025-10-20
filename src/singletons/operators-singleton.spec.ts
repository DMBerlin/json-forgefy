import { operatorRegistry } from "./operators.singleton";

describe("Operator Registry Singleton", () => {
  it("should return the same instance", () => {
    const instance1 = (operatorRegistry as any).constructor.getInstance();
    const instance2 = (operatorRegistry as any).constructor.getInstance();
    expect(instance1).toBe(instance2);
  });

  it("should allow registering operators", () => {
    const testOp = () => () => 42;
    operatorRegistry.register("$testOp" as any, testOp as any);
    expect(operatorRegistry.has("$testOp" as any)).toBe(true);
    expect(operatorRegistry.get("$testOp" as any)).toBe(testOp);
  });

  it("should return all registered operator keys", () => {
    // Import forgefy.operators to trigger population
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
    require("@operators/forgefy.operators");

    const keys = Array.from(operatorRegistry.keys());
    expect(keys.length).toBeGreaterThan(0);
    expect(keys).toContain("$add");
    expect(keys).toContain("$multiply");
    expect(keys).toContain("$map");
  });

  it("should have all 70 operators registered", () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
    require("@operators/forgefy.operators");

    const keys = Array.from(operatorRegistry.keys());
    expect(keys.length).toBeGreaterThanOrEqual(70); // At least 70, may have test operators
  });
});
