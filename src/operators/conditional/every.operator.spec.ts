import { $every } from "@operators/conditional/every.operator";
import { EveryOperatorInput } from "@lib-types/operator-input.types";

describe("Every operator", () => {
  const source = {
    amount: 100,
    user: { email: "test@example.com", name: "John" },
    status: "active",
  };

  it("should return then value when all conditions are true", () => {
    const input: EveryOperatorInput = {
      conditions: [true, true, true],
      then: "success",
      else: "failure",
    };
    const result = $every({ context: source })(input);
    expect(result).toBe("success");
  });

  it("should return else value when any condition is false", () => {
    const input: EveryOperatorInput = {
      conditions: [true, false, true],
      then: "success",
      else: "failure",
    };
    const result = $every({ context: source })(input);
    expect(result).toBe("failure");
  });

  it("should return else value when all conditions are false", () => {
    const input: EveryOperatorInput = {
      conditions: [false, false, false],
      then: "success",
      else: "failure",
    };
    const result = $every({ context: source })(input);
    expect(result).toBe("failure");
  });

  it("should handle empty conditions array (all conditions met)", () => {
    const input: EveryOperatorInput = {
      conditions: [],
      then: "success",
      else: "failure",
    };
    const result = $every({ context: source })(input);
    expect(result).toBe("success");
  });

  it("should handle single condition", () => {
    expect(
      $every({ context: source })({
        conditions: [true],
        then: "yes",
        else: "no",
      }),
    ).toBe("yes");

    expect(
      $every({ context: source })({
        conditions: [false],
        then: "yes",
        else: "no",
      }),
    ).toBe("no");
  });

  it("should handle truthy and falsy values", () => {
    expect(
      $every({ context: source })({
        conditions: [1, "text", true],
        then: "all truthy",
        else: "has falsy",
      }),
    ).toBe("all truthy");

    expect(
      $every({ context: source })({
        conditions: [1, 0, true],
        then: "all truthy",
        else: "has falsy",
      }),
    ).toBe("has falsy");

    expect(
      $every({ context: source })({
        conditions: [1, "", true],
        then: "all truthy",
        else: "has falsy",
      }),
    ).toBe("has falsy");
  });

  it("should return then value when conditions are already resolved", () => {
    const input: EveryOperatorInput = {
      conditions: [true, true],
      then: "SUCCESS", // Already resolved
      else: "FAILURE",
    };
    const result = $every()(input);
    expect(result).toBe("SUCCESS");
  });

  it("should handle already resolved conditions", () => {
    const input: EveryOperatorInput = {
      conditions: [true, true], // Already resolved by resolveArgs
      then: "valid",
      else: "invalid",
    };
    const result = $every()(input);
    expect(result).toBe("valid");
  });

  it("should handle already resolved complex values", () => {
    const input: EveryOperatorInput = {
      conditions: [true, true, true], // Already resolved by resolveArgs
      then: 200, // Already resolved
      else: 0,
    };
    const result = $every()(input);
    expect(result).toBe(200);
  });
});
