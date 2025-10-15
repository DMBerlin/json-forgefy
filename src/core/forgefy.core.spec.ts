import Forgefy from "@/index";
import { originFixture } from "@fixtures/origin.fixtures";
import { blueprintFixture } from "@fixtures/blueprint.fixture";
import { expectedFixture } from "@fixtures/expected.fixture";

describe("ForgefyCore", () => {
  it("should forge actual into expected correctly", () => {
    const actual = Forgefy.this(originFixture, blueprintFixture);
    expect(actual).toEqual(expectedFixture);
  });
});
