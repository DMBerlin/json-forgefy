import { $isNull } from "./is-null.operator";

describe("$isNull operator", () => {
  const mockContext = {
    context: {
      user: {
        name: "John",
        email: null,
        profile: {
          bio: undefined,
          age: 25,
          preferences: {
            theme: "dark",
            notifications: null,
          },
        },
      },
      settings: {
        privacy: true,
        notifications: false,
      },
      data: {
        count: 0,
        emptyString: "",
        isActive: false,
        items: [null, undefined, "value", 0],
      },
      nullValue: null,
      undefinedValue: undefined,
      zeroValue: 0,
      emptyStringValue: "",
      falseValue: false,
    },
  };

  it("should return true for null value", () => {
    const result = $isNull(mockContext)("$user.email");
    expect(result).toBe(true);
  });

  it("should return true for undefined value", () => {
    const result = $isNull(mockContext)("$user.profile.bio");
    expect(result).toBe(true);
  });

  it("should return true for top-level null", () => {
    const result = $isNull(mockContext)("$nullValue");
    expect(result).toBe(true);
  });

  it("should return true for top-level undefined", () => {
    const result = $isNull(mockContext)("$undefinedValue");
    expect(result).toBe(true);
  });

  it("should return true for nested null", () => {
    const result = $isNull(mockContext)(
      "$user.profile.preferences.notifications",
    );
    expect(result).toBe(true);
  });

  it("should return false for string value", () => {
    const result = $isNull(mockContext)("$user.name");
    expect(result).toBe(false);
  });

  it("should return false for number value", () => {
    const result = $isNull(mockContext)("$user.profile.age");
    expect(result).toBe(false);
  });

  it("should return false for boolean true", () => {
    const result = $isNull(mockContext)("$settings.privacy");
    expect(result).toBe(false);
  });

  it("should return false for boolean false", () => {
    const result = $isNull(mockContext)("$settings.notifications");
    expect(result).toBe(false);
  });

  it("should return false for zero value", () => {
    const result = $isNull(mockContext)("$zeroValue");
    expect(result).toBe(false);
  });

  it("should return false for empty string", () => {
    const result = $isNull(mockContext)("$emptyStringValue");
    expect(result).toBe(false);
  });

  it("should return false for false boolean", () => {
    const result = $isNull(mockContext)("$falseValue");
    expect(result).toBe(false);
  });

  it("should work with array elements - null", () => {
    const result = $isNull(mockContext)("$data.items.0");
    expect(result).toBe(true);
  });

  it("should work with array elements - undefined", () => {
    const result = $isNull(mockContext)("$data.items.1");
    expect(result).toBe(true);
  });

  it("should work with array elements - string value", () => {
    const result = $isNull(mockContext)("$data.items.2");
    expect(result).toBe(false);
  });

  it("should work with array elements - zero value", () => {
    const result = $isNull(mockContext)("$data.items.3");
    expect(result).toBe(false);
  });

  it("should return true for non-existent path", () => {
    const result = $isNull(mockContext)("$nonExistentField");
    expect(result).toBe(true);
  });

  it("should return true for non-existent nested path", () => {
    const result = $isNull(mockContext)("$user.nonExistent.field");
    expect(result).toBe(true);
  });

  it("should work with literal null", () => {
    const result = $isNull(mockContext)(null);
    expect(result).toBe(true);
  });

  it("should work with literal undefined", () => {
    const result = $isNull(mockContext)(undefined);
    expect(result).toBe(true);
  });

  it("should work with literal values", () => {
    const result = $isNull(mockContext)("literal string");
    expect(result).toBe(false);
  });

  it("should work with literal numbers", () => {
    const result = $isNull(mockContext)(42);
    expect(result).toBe(false);
  });

  it("should work with literal booleans", () => {
    const result = $isNull(mockContext)(true);
    expect(result).toBe(false);
  });

  it("should work with nested expressions", () => {
    const result = $isNull(mockContext)({ $ifNull: ["$user.email", null] });
    expect(result).toBe(true);
  });

  it("should work with nested expressions returning value", () => {
    const result = $isNull(mockContext)({
      $ifNull: ["$user.email", "default"],
    });
    expect(result).toBe(false);
  });

  it("should work without context", () => {
    const result = $isNull()(null);
    expect(result).toBe(true);
  });

  it("should work without context with undefined", () => {
    const result = $isNull()(undefined);
    expect(result).toBe(true);
  });

  it("should work without context with value", () => {
    const result = $isNull()("value");
    expect(result).toBe(false);
  });
});
