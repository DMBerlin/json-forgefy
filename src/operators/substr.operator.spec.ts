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

  it("should handle substring from middle", () => {
    expect($substr()({ value: "hello world", start: 6, length: 5 })).toBe(
      "world",
    );
  });

  it("should handle start beyond string length", () => {
    expect($substr()({ value: "hello", start: 10, length: 5 })).toBe("");
  });

  it("should handle zero length", () => {
    expect($substr()({ value: "hello", start: 0, length: 0 })).toBe("");
  });

  it("should handle partial substring at end", () => {
    expect($substr()({ value: "hello", start: 3, length: 10 })).toBe("lo");
  });
});
