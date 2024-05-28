import { SwitchOperatorInput } from "@/types/operator-input.types";
import { $switch } from "@operators/switch.operator";

describe("switch operator", () => {
  it("should return the first branch that matches the case", () => {
    const input: SwitchOperatorInput = {
      branches: [
        { case: { $eq: [1, 1] }, then: "one" },
        { case: { $eq: [2, 0] }, then: "two" },
      ],
      default: "default",
    };
    expect($switch()(input)).toBe("one");
  });
  it("should return the second branch that matches the case", () => {
    const input: SwitchOperatorInput = {
      branches: [
        { case: { $eq: [1, 2] }, then: "one" },
        { case: { $eq: [2, 2] }, then: "two" },
      ],
      default: "default",
    };
    expect($switch()(input)).toBe("two");
  });
  it("should return the default branch when there is no matches", () => {
    const input: SwitchOperatorInput = {
      branches: [
        { case: { $eq: [1, 2] }, then: "one" },
        { case: { $eq: [2, 3] }, then: "two" },
      ],
      default: "default",
    };
    expect($switch()(input)).toBe("default");
  });
});
