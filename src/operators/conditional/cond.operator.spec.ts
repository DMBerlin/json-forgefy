import { $cond } from "@operators/conditional/cond.operator";
import { CondOperatorInput } from "@lib-types/operator-input.types";

describe("Cond operator", () => {
  it("should return the then value when if is truthy", () => {
    const condition: CondOperatorInput = {
      if: true, // Already resolved by resolveArgs
      then: "Hello",
      else: "World",
    };
    const result = $cond()(condition);
    expect(result).toBe("Hello");
  });

  it("should return the else value when if is falsy", () => {
    const condition: CondOperatorInput = {
      if: false, // Already resolved by resolveArgs
      then: "Hello",
      else: "World",
    };
    const result = $cond()(condition);
    expect(result).toBe("World");
  });

  it("should handle falsy values correctly (0, empty string, etc)", () => {
    expect($cond()({ if: 0, then: "A", else: "B" })).toBe("B");
    expect($cond()({ if: "", then: "A", else: "B" })).toBe("B");
    expect($cond()({ if: null, then: "A", else: "B" })).toBe("B");
    expect($cond()({ if: undefined, then: "A", else: "B" })).toBe("B");
  });

  it("should handle truthy values correctly", () => {
    expect($cond()({ if: 1, then: "A", else: "B" })).toBe("A");
    expect($cond()({ if: "text", then: "A", else: "B" })).toBe("A");
    expect($cond()({ if: [], then: "A", else: "B" })).toBe("A");
    expect($cond()({ if: {}, then: "A", else: "B" })).toBe("A");
  });
});
