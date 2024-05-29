import { forgefy } from "../core/forgefy.core";
import { originFixture } from "../__fixtures__/origin.fixtures";
import { blueprintFixture } from "../__fixtures__/blueprint.fixture";
import { expectedFixture } from "../__fixtures__/expected.fixture";

describe("ForgefyCore", () => {
  it("should forge actual into expected correctly", () => {
    const actual = forgefy(originFixture, blueprintFixture);
    expect(actual).toEqual(expectedFixture);
  });
});
