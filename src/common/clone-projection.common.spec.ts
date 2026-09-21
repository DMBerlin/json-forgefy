import { cloneProjection } from "@common/clone-projection.common";

describe("cloneProjection", () => {
  it("should return primitives as-is", () => {
    expect(cloneProjection("hello")).toBe("hello");
    expect(cloneProjection(42)).toBe(42);
    expect(cloneProjection(true)).toBe(true);
    expect(cloneProjection(null)).toBeNull();
    expect(cloneProjection(undefined)).toBeUndefined();
  });

  it("should deep-clone plain objects without sharing references", () => {
    const original = { a: 1, nested: { b: 2 } };
    const clone = cloneProjection(original);

    expect(clone).toEqual(original);
    expect(clone).not.toBe(original);
    expect(clone.nested).not.toBe(original.nested);
  });

  it("should deep-clone arrays without sharing references", () => {
    const original = [1, { a: 2 }, [3, 4]];
    const clone = cloneProjection(original);

    expect(clone).toEqual(original);
    expect(clone).not.toBe(original);
    expect(clone[1]).not.toBe(original[1]);
    expect(clone[2]).not.toBe(original[2]);
  });

  it("should preserve current-realm prototypes so instanceof checks pass", () => {
    const clone = cloneProjection({ $add: ["$a", 1] });

    expect(clone instanceof Object).toBe(true);
    expect(Array.isArray(clone.$add)).toBe(true);
  });

  it("should not mutate the original when the clone is mutated", () => {
    const original = { list: [1, 2], nested: { value: 3 } };
    const clone = cloneProjection(original);

    clone.list.push(99);
    clone.nested.value = 100;

    expect(original.list).toEqual([1, 2]);
    expect(original.nested.value).toBe(3);
  });
});
