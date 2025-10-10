import { SwitchOperatorInput } from "@lib-types/operator-input.types";
import { $switch } from "@operators/switch.operator";

describe("switch operator", () => {
  it("should return the first branch that matches (case is truthy)", () => {
    const input: SwitchOperatorInput = {
      branches: [
        { case: true, then: "one" }, // Already resolved by resolveArgs
        { case: false, then: "two" },
      ],
      default: "default",
    };
    expect($switch()(input)).toBe("one");
  });

  it("should return the second branch when first case is falsy", () => {
    const input: SwitchOperatorInput = {
      branches: [
        { case: false, then: "one" }, // Already resolved by resolveArgs
        { case: true, then: "two" },
      ],
      default: "default",
    };
    expect($switch()(input)).toBe("two");
  });

  it("should return the default branch when no cases match", () => {
    const input: SwitchOperatorInput = {
      branches: [
        { case: false, then: "one" }, // Already resolved by resolveArgs
        { case: false, then: "two" },
      ],
      default: "default",
    };
    expect($switch()(input)).toBe("default");
  });

  it("should handle various falsy values", () => {
    const input: SwitchOperatorInput = {
      branches: [
        { case: 0, then: "zero" },
        { case: "", then: "empty" },
        { case: null, then: "null" },
        { case: undefined, then: "undefined" },
      ],
      default: "default",
    };
    expect($switch()(input)).toBe("default");
  });

  it("should handle various truthy values", () => {
    expect(
      $switch()({
        branches: [
          { case: 1, then: "number" },
          { case: false, then: "false" },
        ],
        default: "default",
      }),
    ).toBe("number");

    expect(
      $switch()({
        branches: [
          { case: false, then: "false" },
          { case: "text", then: "string" },
        ],
        default: "default",
      }),
    ).toBe("string");
  });
});
