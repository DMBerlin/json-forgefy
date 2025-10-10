import { $size } from "@operators/size.operator";

describe("size operator", () => {
  it("should return the size of the input array", () => {
    const input = [1, 2, 3, 4, 5];
    const result = $size()(input);
    expect(result).toEqual(5);
  });

  it("should return 0 for empty array", () => {
    expect($size()([])).toBe(0);
  });

  it("should handle single element array", () => {
    expect($size()([1])).toBe(1);
  });

  it("should handle arrays with mixed types", () => {
    expect($size()([1, "text", true, null, undefined])).toBe(5);
  });
});
