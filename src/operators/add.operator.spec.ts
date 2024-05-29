import { $add } from "../operators/add.operator";

describe("Add operator", () => {
  it("should return the sum of all numbers", () => {
    const numbers = [1, 2, 3, 4, 5];
    const result = $add()(numbers);
    expect(result).toBe(15);
  });
  it("should return 0 if no numbers are provided", () => {
    const numbers = [];
    const result = $add()(numbers);
    expect(result).toBe(0);
  });
  it("should return the same number if only one number is provided", () => {
    const numbers = [1];
    const result = $add()(numbers);
    expect(result).toBe(1);
  });
});
