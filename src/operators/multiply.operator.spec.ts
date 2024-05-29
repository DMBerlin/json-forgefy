import { $multiply } from "../operators/multiply.operator";

describe("multiply operator", () => {
  it("should multiply two numbers", () => {
    expect($multiply()([2, 3])).toBe(6);
  });
  it("should multiply three numbers", () => {
    expect($multiply()([2, 3, 4])).toBe(24);
  });
  it("should multiply two negative numbers", () => {
    expect($multiply()([-2, -3])).toBe(6);
  });
  it("should multiply three negative numbers", () => {
    expect($multiply()([-2, -3, -4])).toBe(-24);
  });
});
