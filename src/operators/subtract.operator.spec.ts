import { $subtract } from "@operators/subtract.operator";

describe("subtract operator", () => {
  it("should subtract two numbers", () => {
    expect($subtract()([2, 1])).toBe(1);
  });
  it("should subtract three numbers", () => {
    expect($subtract()([10, 2, 3])).toBe(5);
  });
  it("should subtract two negative numbers", () => {
    expect($subtract()([-2, -1])).toBe(-1);
  });
  it("should subtract three negative numbers", () => {
    expect($subtract()([-10, -2, -3])).toBe(-5);
  });
  it("should subtract a positive and a negative number", () => {
    expect($subtract()([10, -2])).toBe(12);
  });
});
