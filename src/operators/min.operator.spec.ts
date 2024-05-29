import { $min } from "../operators/min.operator";

describe("min operator", () => {
  it("should return the minimum value from the input array", () => {
    const input = [1, 2, 3, 4, 5];
    const result = $min()(input);
    expect(result).toEqual(1);
  });
});
