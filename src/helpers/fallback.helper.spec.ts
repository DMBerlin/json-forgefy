import { resolveFallback, hasFallback } from "./fallback.helper";

describe("hasFallback", () => {
  it("should return true if params has a defined fallback property", () => {
    expect(hasFallback({ input: [1, 2], fallback: [] })).toBe(true);
    expect(hasFallback({ date: "2024-01-01", fallback: null })).toBe(true);
    expect(hasFallback({ value: 123, fallback: 0 })).toBe(true);
    expect(hasFallback({ fallback: "default" })).toBe(true);
  });

  it("should return false if params does not have fallback property", () => {
    expect(hasFallback({ input: [1, 2] })).toBe(false);
    expect(hasFallback({ date: "2024-01-01" })).toBe(false);
    expect(hasFallback({})).toBe(false);
  });

  it("should return false if fallback is undefined", () => {
    expect(hasFallback({ input: [1, 2], fallback: undefined })).toBe(false);
  });

  it("should return false if params is not an object", () => {
    expect(hasFallback(null)).toBe(false);
    expect(hasFallback(undefined)).toBe(false);
    expect(hasFallback("string")).toBe(false);
    expect(hasFallback(123)).toBe(false);
    expect(hasFallback(true)).toBe(false);
    expect(hasFallback([])).toBe(false);
  });

  it("should work with various fallback value types", () => {
    expect(hasFallback({ fallback: 0 })).toBe(true);
    expect(hasFallback({ fallback: "" })).toBe(true);
    expect(hasFallback({ fallback: false })).toBe(true);
    expect(hasFallback({ fallback: null })).toBe(true);
    expect(hasFallback({ fallback: [] })).toBe(true);
    expect(hasFallback({ fallback: {} })).toBe(true);
  });
});

describe("resolveFallback", () => {
  const mockError = new Error("Test error");

  describe("static values", () => {
    it("should return static string value", () => {
      const result = resolveFallback("default-value", {}, mockError);
      expect(result).toBe("default-value");
    });

    it("should return static number value", () => {
      const result = resolveFallback(123, {}, mockError);
      expect(result).toBe(123);
    });

    it("should return static boolean value", () => {
      const result = resolveFallback(true, {}, mockError);
      expect(result).toBe(true);
    });

    it("should return static null value", () => {
      const result = resolveFallback(null, {}, mockError);
      expect(result).toBe(null);
    });

    it("should return static object value", () => {
      const obj = { key: "value" };
      const result = resolveFallback(obj, {}, mockError);
      expect(result).toEqual(obj);
    });

    it("should return static array value", () => {
      const arr = [1, 2, 3];
      const result = resolveFallback(arr, {}, mockError);
      expect(result).toEqual(arr);
    });
  });

  describe("path resolution", () => {
    it("should resolve path from payload", () => {
      const payload = { fallback_date: "2025-01-02T00:00:00Z" };
      const result = resolveFallback("$fallback_date", payload, mockError);
      expect(result).toBe("2025-01-02T00:00:00Z");
    });

    it("should resolve nested path from payload", () => {
      const payload = { user: { default_date: "2025-01-02T00:00:00Z" } };
      const result = resolveFallback("$user.default_date", payload, mockError);
      expect(result).toBe("2025-01-02T00:00:00Z");
    });

    it("should return undefined for non-existent path", () => {
      const payload = { other: "value" };
      const result = resolveFallback("$nonexistent", payload, mockError);
      expect(result).toBe(undefined);
    });
  });

  describe("expression resolution", () => {
    it("should resolve simple expression", () => {
      const payload = { value: 10 };
      const result = resolveFallback(
        { $add: ["$value", 5] },
        payload,
        mockError,
      );
      expect(result).toBe(15);
    });

    it("should resolve nested expression", () => {
      const payload = { a: 10, b: 5 };
      const result = resolveFallback(
        { $multiply: [{ $add: ["$a", "$b"] }, 2] },
        payload,
        mockError,
      );
      expect(result).toBe(30);
    });

    it("should resolve conditional expression", () => {
      const payload = { exists: true, value: "yes" };
      const result = resolveFallback(
        {
          $cond: {
            if: "$exists",
            then: "$value",
            else: "no",
          },
        },
        payload,
        mockError,
      );
      expect(result).toBe("yes");
    });
  });

  describe("no fallback", () => {
    it("should throw original error when fallback is undefined", () => {
      expect(() => {
        resolveFallback(undefined, {}, mockError);
      }).toThrow("Test error");
    });

    it("should throw original error when fallback is explicitly undefined", () => {
      const customError = new Error("Custom error message");
      expect(() => {
        resolveFallback(undefined, {}, customError);
      }).toThrow("Custom error message");
    });
  });
});
