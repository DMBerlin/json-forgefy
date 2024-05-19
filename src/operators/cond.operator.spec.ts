import { $cond } from "@operators/cond.operator";
import { CondOperatorInput } from "@/types/operator-input.types";

describe("Cond operator", () => {
  it("should return the first truthy expression on a truthy if statement", () => {
    const condition: CondOperatorInput = {
      if: { $eq: [1, 1] },
      then: "Hello",
      else: "World",
    };
    const result = $cond()(condition);
    expect(result).toBe("Hello");
  });
  it("should return the second truthy expression on a truthy if statement", () => {
    const condition: CondOperatorInput = {
      if: { $eq: [1, 2] },
      then: "Hello",
      else: "World",
    };
    const result = $cond()(condition);
    expect(result).toBe("World");
  });
});
