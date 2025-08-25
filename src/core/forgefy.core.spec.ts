import { forgefy } from "@core/forgefy.core";
import { originFixture } from "@fixtures/origin.fixtures";
import { blueprintFixture } from "@fixtures/blueprint.fixture";
import { expectedFixture } from "@fixtures/expected.fixture";

describe("ForgefyCore", () => {
  it("should forge actual into expected correctly", () => {
    const actual = forgefy(originFixture, blueprintFixture);
    expect(actual).toEqual(expectedFixture);
  });
});
