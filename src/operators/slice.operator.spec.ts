import { $slice } from "@operators/slice.operator";

describe("slice operator", () => {
  it("should return a slice of the input string", () => {
    const input = "hello world";
    const start = 0;
    const end = 5;
    const result = $slice()({ input, start, end });
    expect(result).toEqual("hello");
  });
});
