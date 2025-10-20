import { $slice } from "@operators/string/slice.operator";

describe("slice operator", () => {
  it("should return a slice of the input string", () => {
    const input = "hello world";
    const start = 0;
    const end = 5;
    const result = $slice()({ input, start, end });
    expect(result).toEqual("hello");
  });

  it("should handle slicing from middle", () => {
    expect($slice()({ input: "hello world", start: 6, end: 11 })).toBe("world");
  });

  it("should handle negative indices", () => {
    expect($slice()({ input: "hello world", start: -5, end: -1 })).toBe("worl");
  });

  it("should handle omitted end", () => {
    expect($slice()({ input: "hello world", start: 6, end: undefined })).toBe(
      "world",
    );
  });
});
