import { $size } from "../operators/size.operator";

describe("size operator", () => {
  it("should return the size of the input array", () => {
    const input = [1, 2, 3, 4, 5];
    const result = $size()(input);
    expect(result).toEqual(5);
  });
});
