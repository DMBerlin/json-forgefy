import Forgefy, { forgefy } from "./index";

describe("Index Entry Point", () => {
  const payload = { user: { name: "Alice" }, amount: "50" };
  const blueprint = {
    userName: "$user.name",
    total: { $toNumber: "$amount" },
  };

  it("should transform data correctly using default export Forgefy.this", () => {
    const result = Forgefy.this(payload, blueprint);
    expect(result).toEqual({ userName: "Alice", total: 50 });
  });

  it("should transform data correctly using named export forgefy", () => {
    const result = forgefy(payload, blueprint);
    expect(result).toEqual({ userName: "Alice", total: 50 });
  });

  it("should support strict mode via named export", () => {
    const result = forgefy(payload, blueprint, { strict: true });
    expect(result).toEqual({ userName: "Alice", total: 50 });
  });
});
