import { $eq } from "../operators/eq.operator";

describe("eq operator", () => {
  it("should return true if two values are equal", () => {
    expect($eq()([1, 1])).toBe(true);
  });

  it("should return false if two values are not equal", () => {
    expect($eq()([1, 2])).toBe(false);
  });

  it("should return true if two values are equal and one of them is a path", () => {
    const context = {
      a: {
        b: {
          c: 1,
        },
      },
    };
    expect($eq({ context })([1, "$a.b.c"])).toBe(true);
  });

  it("should return false if two values are not equal and one of them is a path", () => {
    const context = {
      a: {
        b: {
          c: 2,
        },
      },
    };
    expect($eq({ context })([1, "$a.b.c"])).toBe(false);
  });
});
