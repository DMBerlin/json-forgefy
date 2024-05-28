import { $max } from "@operators/max.operator";

describe("max operator", () => {
  it("should return the maximum value from the input array", () => {
    const input = [1, 2, 3, 4, 5];
    const result = $max()(input);
    expect(result).toEqual(5);
  });
});
