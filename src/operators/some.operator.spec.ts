import { $some } from "@operators/some.operator";
import { SomeOperatorInput } from "@lib-types/operator-input.types";

describe("Some operator", () => {
  const source = {
    amount: 100,
    user: { email: "test@example.com", name: "John" },
    status: "active",
  };

  it("should return then value when at least one condition is true", () => {
    const input: SomeOperatorInput = {
      conditions: [false, true, false],
      then: "success",
      else: "failure",
    };
    const result = $some({ context: source })(input);
    expect(result).toBe("success");
  });

  it("should return then value when all conditions are true", () => {
    const input: SomeOperatorInput = {
      conditions: [true, true, true],
      then: "success",
      else: "failure",
    };
    const result = $some({ context: source })(input);
    expect(result).toBe("success");
  });

  it("should return else value when all conditions are false", () => {
    const input: SomeOperatorInput = {
      conditions: [false, false, false],
      then: "success",
      else: "failure",
    };
    const result = $some({ context: source })(input);
    expect(result).toBe("failure");
  });

  it("should return else value for empty conditions array", () => {
    const input: SomeOperatorInput = {
      conditions: [],
      then: "success",
      else: "failure",
    };
    const result = $some({ context: source })(input);
    expect(result).toBe("failure");
  });

  it("should handle single condition", () => {
    expect(
      $some({ context: source })({
        conditions: [true],
        then: "yes",
        else: "no",
      }),
    ).toBe("yes");

    expect(
      $some({ context: source })({
        conditions: [false],
        then: "yes",
        else: "no",
      }),
    ).toBe("no");
  });

  it("should handle truthy and falsy values", () => {
    expect(
      $some({ context: source })({
        conditions: [0, "", 1],
        then: "has truthy",
        else: "all falsy",
      }),
    ).toBe("has truthy");

    expect(
      $some({ context: source })({
        conditions: [0, "", false],
        then: "has truthy",
        else: "all falsy",
      }),
    ).toBe("all falsy");

    expect(
      $some({ context: source })({
        conditions: ["text", 0, false],
        then: "has truthy",
        else: "all falsy",
      }),
    ).toBe("has truthy");
  });

  it("should return then value when conditions are already resolved", () => {
    const input: SomeOperatorInput = {
      conditions: [false, true],
      then: "SUCCESS", // Already resolved
      else: "FAILURE",
    };
    const result = $some()(input);
    expect(result).toBe("SUCCESS");
  });

  it("should handle already resolved conditions", () => {
    const input: SomeOperatorInput = {
      conditions: [false, true], // Already resolved by resolveArgs
      then: "valid",
      else: "invalid",
    };
    const result = $some()(input);
    expect(result).toBe("valid");
  });

  it("should handle already resolved complex values", () => {
    const input: SomeOperatorInput = {
      conditions: [false, true, false], // Already resolved by resolveArgs
      then: 200, // Already resolved
      else: 0,
    };
    const result = $some()(input);
    expect(result).toBe(200);
  });

  it("should short-circuit on first truthy condition", () => {
    const input: SomeOperatorInput = {
      conditions: [true, false], // Already resolved
      then: "found",
      else: "not found",
    };
    const result = $some()(input);
    expect(result).toBe("found");
  });
});
