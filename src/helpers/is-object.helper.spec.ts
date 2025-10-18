import {
  isObject,
  isObjectWithProperty,
  isObjectWithProperties,
} from "@helpers/is-object.helper";

describe("isObject Testing Suit", () => {
  it("should return true if the value is an object", () => {
    expect(isObject({})).toBe(true);
  });

  it("should return false if the value is not an object", () => {
    expect(isObject([])).toBe(false);
    expect(isObject("")).toBe(false);
    expect(isObject(0)).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
  });
});

describe("isObjectWithProperty Testing Suit", () => {
  it("should return true if value is an object with the specified property", () => {
    expect(isObjectWithProperty({ date: "2024-01-01" }, "date")).toBe(true);
    expect(isObjectWithProperty({ value: 123 }, "value")).toBe(true);
    expect(isObjectWithProperty({ a: 1, b: 2 }, "a")).toBe(true);
    expect(isObjectWithProperty({ a: 1, b: 2 }, "b")).toBe(true);
  });

  it("should return false if value is an object without the specified property", () => {
    expect(isObjectWithProperty({ other: "value" }, "date")).toBe(false);
    expect(isObjectWithProperty({}, "date")).toBe(false);
    expect(isObjectWithProperty({ a: 1 }, "b")).toBe(false);
  });

  it("should return false if value is not an object", () => {
    expect(isObjectWithProperty("string", "date")).toBe(false);
    expect(isObjectWithProperty(123, "date")).toBe(false);
    expect(isObjectWithProperty(true, "date")).toBe(false);
    expect(isObjectWithProperty([], "date")).toBe(false);
  });

  it("should return false if value is null or undefined", () => {
    expect(isObjectWithProperty(null, "date")).toBe(false);
    expect(isObjectWithProperty(undefined, "date")).toBe(false);
  });

  it("should work with properties that have undefined values", () => {
    expect(isObjectWithProperty({ date: undefined }, "date")).toBe(true);
    expect(isObjectWithProperty({ value: null }, "value")).toBe(true);
  });
});

describe("isObjectWithProperties Testing Suit", () => {
  it("should return true if value is an object with all specified properties", () => {
    expect(
      isObjectWithProperties({ date: "2024-01-01", days: 5 }, ["date", "days"]),
    ).toBe(true);
    expect(isObjectWithProperties({ a: 1, b: 2, c: 3 }, ["a", "b"])).toBe(true);
    expect(isObjectWithProperties({ a: 1, b: 2, c: 3 }, ["a", "b", "c"])).toBe(
      true,
    );
  });

  it("should return true if checking for empty properties array", () => {
    expect(isObjectWithProperties({}, [])).toBe(true);
    expect(isObjectWithProperties({ a: 1 }, [])).toBe(true);
  });

  it("should return false if value is missing any of the specified properties", () => {
    expect(
      isObjectWithProperties({ date: "2024-01-01" }, ["date", "days"]),
    ).toBe(false);
    expect(isObjectWithProperties({ a: 1 }, ["a", "b"])).toBe(false);
    expect(isObjectWithProperties({ a: 1, b: 2 }, ["a", "b", "c"])).toBe(false);
  });

  it("should return false if value is not an object", () => {
    expect(isObjectWithProperties("string", ["date"])).toBe(false);
    expect(isObjectWithProperties(123, ["date"])).toBe(false);
    expect(isObjectWithProperties(true, ["date"])).toBe(false);
    expect(isObjectWithProperties([], ["date"])).toBe(false);
  });

  it("should return false if value is null or undefined", () => {
    expect(isObjectWithProperties(null, ["date"])).toBe(false);
    expect(isObjectWithProperties(undefined, ["date"])).toBe(false);
  });

  it("should work with properties that have undefined or null values", () => {
    expect(
      isObjectWithProperties({ date: undefined, days: null }, ["date", "days"]),
    ).toBe(true);
    expect(
      isObjectWithProperties({ a: null, b: undefined, c: 0 }, ["a", "b", "c"]),
    ).toBe(true);
  });

  it("should validate single property correctly", () => {
    expect(isObjectWithProperties({ date: "2024-01-01" }, ["date"])).toBe(true);
    expect(isObjectWithProperties({ other: "value" }, ["date"])).toBe(false);
  });
});
