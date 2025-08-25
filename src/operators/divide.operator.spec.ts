import { $divide } from "@operators/divide.operator";

describe("Divide operator", () => {
  it("should divide a sequence of numbers in order", () => {
    const values = [6, 2, 3];
    expect($divide()(values)).toBe(1);
  });
  it("should divide a sequence of numbers in reverse order", () => {
    const values = [3, 2, 6];
    expect($divide()(values)).toBe(0.25);
  });
  it("should divide a sequence of numbers in any order", () => {
    const values = [2, 6, 3];
    expect($divide()(values)).toBe(0.1111111111111111);
  });
  it("should divide a sequence of numbers with a single value", () => {
    const values = [6];
    expect($divide()(values)).toBe(6);
  });
  it("should divide a sequence of numbers with a single value and zero", () => {
    const values = [0];
    expect($divide()(values)).toBe(0);
  });
  it("should divide a sequence of numbers with a single value and negative number", () => {
    const values = [-6];
    expect($divide()(values)).toBe(-6);
  });
  it("should divide a sequence of numbers with a single value and positive number", () => {
    const values = [6];
    expect($divide()(values)).toBe(6);
  });
  it("should divide a sequence of numbers with a single value and floating point", () => {
    const values = [6.5];
    expect($divide()(values)).toBe(6.5);
  });
  it("should divide a sequence of numbers with a single value and negative floating point", () => {
    const values = [-6.5];
    expect($divide()(values)).toBe(-6.5);
  });
  it("should divide a sequence of numbers with a single value and zero floating point", () => {
    const values = [0.0];
    expect($divide()(values)).toBe(0);
  });
  it("should resolve expressions before dividing", () => {
    const values = [6, { $add: [2, 3] }];
    expect($divide({ context: { $add: [2, 3] } })(values)).toBe(1.2);
  });
});
