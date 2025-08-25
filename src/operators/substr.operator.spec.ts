import { $substr } from "@operators/substr.operator";

describe("substr operator", () => {
  it("should return a substring from a string", () => {
    const input = {
      value: "hello,world",
      start: 0,
      length: 5,
    };
    expect($substr()(input)).toBe("hello");
  });
  it("should return everything if length bigger than str", () => {
    const input = {
      value: "1234",
      start: 0,
      length: 5,
    };
    expect($substr()(input)).toBe("1234");
  });
});
