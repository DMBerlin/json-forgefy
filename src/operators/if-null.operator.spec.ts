import { $ifNull } from "@operators/if-null.operator";

describe("ifNull operator", () => {
  it("should return the first value if operation resolves correctly", () => {
    expect($ifNull()([{ $floor: 3.9 }, 5])).toBe(3);
  });
  it("should return the first value if it is an expression that resolves correctly", () => {
    expect($ifNull({ context: { a: { b: { c: 3 } } } })(["$a.b.c", 1])).toBe(3);
  });
  it("should return the second value if the first value resolves to null", () => {
    expect($ifNull({ context: { a: { b: { c: null } } } })(["$a.b.c", 1])).toBe(
      1,
    );
  });
});
