import Forgefy from "@/index";
import { originFixture } from "@fixtures/origin.fixtures";
import { blueprintFixture } from "@fixtures/blueprint.fixture";
import { expectedFixture } from "@fixtures/expected.fixture";

describe("ForgefyCore", () => {
  it("should forge actual into expected correctly", () => {
    const actual = Forgefy.this(originFixture, blueprintFixture);
    expect(actual).toEqual(expectedFixture);
  });

  it("should not mutate the projection blueprint", () => {
    const blueprint = { total: { $add: ["$a", 1] } };
    const snapshot = JSON.parse(JSON.stringify(blueprint));

    Forgefy.this({ a: 1 }, blueprint);

    expect(blueprint).toEqual(snapshot);
  });

  it("should produce correct results when a blueprint is reused across payloads", () => {
    const blueprint = { total: { $add: ["$a", 1] } };

    const first = Forgefy.this({ a: 1 }, blueprint);
    const second = Forgefy.this({ a: 5 }, blueprint);

    expect(first).toEqual({ total: 2 });
    expect(second).toEqual({ total: 6 });
  });

  it("should return a new object rather than the original projection reference", () => {
    const blueprint = { name: "$user.name" };

    const result = Forgefy.this({ user: { name: "John" } }, blueprint);

    expect(result).not.toBe(blueprint);
    expect(result).toEqual({ name: "John" });
  });

  it("should not mutate nested projection objects", () => {
    const blueprint = {
      user: { fullName: { $concat: ["$first", " ", "$last"] } },
    };
    const snapshot = JSON.parse(JSON.stringify(blueprint));

    Forgefy.this({ first: "Jane", last: "Doe" }, blueprint);

    expect(blueprint).toEqual(snapshot);
  });
});
