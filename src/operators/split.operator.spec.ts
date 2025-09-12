import { $split } from "@operators/split.operator";

describe("split operator", () => {
  it("should split a string by a delimiter", () => {
    const input = {
      input: "hello,world",
      delimiter: ",",
    };
    expect($split()(input)).toEqual(["hello", "world"]);
  });
  it("should split a string by a delimiter", () => {
    const input = {
      input: "hello,,world,",
      delimiter: ",",
    };
    expect($split()(input)).toEqual(["hello", "", "world", ""]);
  });
});
