import Forgefy from "@/index";

describe("Type Operators E2E", () => {
  describe("$type operator", () => {
    it("should return correct types for various values", () => {
      const payload = {
        stringValue: "hello",
        numberValue: 42,
        booleanValue: true,
        arrayValue: [1, 2, 3],
        objectValue: { key: "value" },
        nullValue: null,
        dateValue: new Date("2025-01-15"),
      };

      const blueprint = {
        stringType: { $type: "$stringValue" },
        numberType: { $type: "$numberValue" },
        booleanType: { $type: "$booleanValue" },
        arrayType: { $type: "$arrayValue" },
        objectType: { $type: "$objectValue" },
        nullType: { $type: "$nullValue" },
        dateType: { $type: "$dateValue" },
      };

      const result = Forgefy.this(payload, blueprint);

      expect(result).toEqual({
        stringType: "string",
        numberType: "number",
        booleanType: "boolean",
        arrayType: "array",
        objectType: "object",
        nullType: "null",
        dateType: "date",
      });
    });
  });

  describe("$isArray operator", () => {
    it("should correctly identify arrays", () => {
      const payload = {
        tags: ["tag1", "tag2"],
        name: "John",
        count: 5,
      };

      const blueprint = {
        tagsIsArray: { $isArray: "$tags" },
        nameIsArray: { $isArray: "$name" },
        countIsArray: { $isArray: "$count" },
      };

      const result = Forgefy.this(payload, blueprint);

      expect(result).toEqual({
        tagsIsArray: true,
        nameIsArray: false,
        countIsArray: false,
      });
    });
  });

  describe("$isString operator", () => {
    it("should correctly identify strings", () => {
      const payload = {
        name: "John",
        age: 30,
        active: true,
      };

      const blueprint = {
        nameIsString: { $isString: "$name" },
        ageIsString: { $isString: "$age" },
        activeIsString: { $isString: "$active" },
      };

      const result = Forgefy.this(payload, blueprint);

      expect(result).toEqual({
        nameIsString: true,
        ageIsString: false,
        activeIsString: false,
      });
    });
  });

  describe("$isBoolean operator", () => {
    it("should correctly identify booleans", () => {
      const payload = {
        active: true,
        inactive: false,
        name: "John",
        count: 1,
      };

      const blueprint = {
        activeIsBoolean: { $isBoolean: "$active" },
        inactiveIsBoolean: { $isBoolean: "$inactive" },
        nameIsBoolean: { $isBoolean: "$name" },
        countIsBoolean: { $isBoolean: "$count" },
      };

      const result = Forgefy.this(payload, blueprint);

      expect(result).toEqual({
        activeIsBoolean: true,
        inactiveIsBoolean: true,
        nameIsBoolean: false,
        countIsBoolean: false,
      });
    });
  });

  describe("$isDate operator", () => {
    it("should correctly identify valid dates", () => {
      const payload = {
        dateObject: new Date("2025-01-15"),
        dateString: "2025-01-15T10:30:00Z",
        invalidDate: "not-a-date",
        number: 42,
      };

      const blueprint = {
        dateObjectIsDate: { $isDate: "$dateObject" },
        dateStringIsDate: { $isDate: "$dateString" },
        invalidDateIsDate: { $isDate: "$invalidDate" },
        numberIsDate: { $isDate: "$number" },
      };

      const result = Forgefy.this(payload, blueprint);

      expect(result).toEqual({
        dateObjectIsDate: true,
        dateStringIsDate: true,
        invalidDateIsDate: false,
        numberIsDate: false,
      });
    });
  });

  describe("Combined type operators with conditional logic", () => {
    it("should use type operators in conditional expressions", () => {
      const payload = {
        value1: "hello",
        value2: 42,
        value3: [1, 2, 3],
      };

      const blueprint = {
        value1Type: {
          $cond: {
            if: { $isString: "$value1" },
            then: "It's a string",
            else: "Not a string",
          },
        },
        value2Type: {
          $cond: {
            if: { $isArray: "$value2" },
            then: "It's an array",
            else: "Not an array",
          },
        },
        value3Type: {
          $cond: {
            if: { $isArray: "$value3" },
            then: "It's an array",
            else: "Not an array",
          },
        },
      };

      const result = Forgefy.this(payload, blueprint);

      expect(result).toEqual({
        value1Type: "It's a string",
        value2Type: "Not an array",
        value3Type: "It's an array",
      });
    });

    it("should use $type operator in switch expressions", () => {
      const payload = {
        value: "hello",
      };

      const blueprint = {
        typeDescription: {
          $switch: {
            branches: [
              { case: { $eq: [{ $type: "$value" }, "string"] }, then: "Text" },
              {
                case: { $eq: [{ $type: "$value" }, "number"] },
                then: "Number",
              },
              { case: { $eq: [{ $type: "$value" }, "array"] }, then: "List" },
            ],
            default: "Unknown",
          },
        },
      };

      const result = Forgefy.this(payload, blueprint);

      expect(result).toEqual({
        typeDescription: "Text",
      });
    });
  });
});
