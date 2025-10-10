import { $exists } from "./exists.operator";

describe("$exists operator", () => {
  const mockContext = {
    context: {
      user: {
        name: "John",
        email: "john@example.com",
        profile: {
          age: 25,
          bio: null,
          preferences: {
            theme: "dark",
            notifications: undefined,
          },
        },
      },
      settings: {
        privacy: true,
        notifications: {
          email: false,
          push: true,
        },
      },
      data: {
        items: [
          { name: "item1", value: 100 },
          { name: "item2", value: null },
          { name: "item3" },
        ],
        emptyArray: [],
        count: 0,
        isActive: false,
      },
      nullValue: null,
      undefinedValue: undefined,
      emptyString: "",
      zeroValue: 0,
    },
  };

  it("should return true for existing top-level field", () => {
    const result = $exists(mockContext)("user");
    expect(result).toBe(true);
  });

  it("should return true for existing nested field", () => {
    const result = $exists(mockContext)("user.name");
    expect(result).toBe(true);
  });

  it("should return true for deeply nested field", () => {
    const result = $exists(mockContext)("user.profile.preferences.theme");
    expect(result).toBe(true);
  });

  it("should return false for non-existing top-level field", () => {
    const result = $exists(mockContext)("nonExistentField");
    expect(result).toBe(false);
  });

  it("should return false for non-existing nested field", () => {
    const result = $exists(mockContext)("user.nonExistentField");
    expect(result).toBe(false);
  });

  it("should return false for deeply non-existing field", () => {
    const result = $exists(mockContext)("user.profile.nonExistent.field");
    expect(result).toBe(false);
  });

  it("should return true for field with null value", () => {
    const result = $exists(mockContext)("user.profile.bio");
    expect(result).toBe(true);
  });

  it("should return true for field with undefined value", () => {
    const result = $exists(mockContext)(
      "user.profile.preferences.notifications",
    );
    expect(result).toBe(true);
  });

  it("should return true for top-level null field", () => {
    const result = $exists(mockContext)("nullValue");
    expect(result).toBe(true);
  });

  it("should return true for top-level undefined field", () => {
    const result = $exists(mockContext)("undefinedValue");
    expect(result).toBe(true);
  });

  it("should return true for field with empty string", () => {
    const result = $exists(mockContext)("emptyString");
    expect(result).toBe(true);
  });

  it("should return true for field with zero value", () => {
    const result = $exists(mockContext)("zeroValue");
    expect(result).toBe(true);
  });

  it("should return true for field with false boolean", () => {
    const result = $exists(mockContext)("data.isActive");
    expect(result).toBe(true);
  });

  it("should return true for array element that exists", () => {
    const result = $exists(mockContext)("data.items.0.name");
    expect(result).toBe(true);
  });

  it("should return true for array element with null value", () => {
    const result = $exists(mockContext)("data.items.1.value");
    expect(result).toBe(true);
  });

  it("should return false for array element that doesn't exist", () => {
    const result = $exists(mockContext)("data.items.10.name");
    expect(result).toBe(false);
  });

  it("should return false for field in array element that doesn't exist", () => {
    const result = $exists(mockContext)("data.items.2.value");
    expect(result).toBe(false);
  });

  it("should return true for empty array", () => {
    const result = $exists(mockContext)("data.emptyArray");
    expect(result).toBe(true);
  });

  it("should work with $ prefix", () => {
    const result = $exists(mockContext)("$user.email");
    expect(result).toBe(true);
  });

  it("should work with $ prefix for non-existing field", () => {
    const result = $exists(mockContext)("$user.nonExistent");
    expect(result).toBe(false);
  });

  it("should return false without context", () => {
    const result = $exists()("user.name");
    expect(result).toBe(false);
  });

  it("should return false with empty context", () => {
    const result = $exists({ context: {} })("user.name");
    expect(result).toBe(false);
  });

  it("should handle complex nested paths", () => {
    const result = $exists(mockContext)("settings.notifications.email");
    expect(result).toBe(true);
  });

  it("should return false for invalid nested paths", () => {
    const result = $exists(mockContext)("settings.nonExistent.field");
    expect(result).toBe(false);
  });

  it("should return false when trying to access property of null", () => {
    const result = $exists(mockContext)("nullValue.someProperty");
    expect(result).toBe(false);
  });

  it("should return false when trying to access property of undefined", () => {
    const result = $exists(mockContext)("undefinedValue.someProperty");
    expect(result).toBe(false);
  });

  it("should return false when trying to access property of primitive value", () => {
    const result = $exists(mockContext)("emptyString.someProperty");
    expect(result).toBe(false);
  });

  it("should return false when trying to access property of number", () => {
    const result = $exists(mockContext)("zeroValue.someProperty");
    expect(result).toBe(false);
  });

  it("should handle error cases gracefully", () => {
    // Create a context with a getter that throws an error
    const errorContext = {
      context: {
        get errorProperty() {
          throw new Error("Access denied");
        },
      },
    };
    const result = $exists(errorContext)("errorProperty.nested");
    expect(result).toBe(false);
  });

  it("should handle non-string field paths", () => {
    // Test with non-string input
    const result = $exists(mockContext)(123 as any);
    expect(result).toBe(false);
  });

  it("should handle paths with array-like objects", () => {
    const arrayContext = {
      context: {
        items: { "0": "first", "1": "second", length: 2 },
      },
    };
    expect($exists(arrayContext)("items.0")).toBe(true);
    expect($exists(arrayContext)("items.1")).toBe(true);
    expect($exists(arrayContext)("items.2")).toBe(false);
  });
});
