import {
  DateValidationError,
  TimezoneValidationError,
  OperatorInputError,
  MaxIterationsError,
} from "./error.types";

describe("Error Types", () => {
  describe("DateValidationError", () => {
    it("should create error with message and input", () => {
      const input = "invalid-date";
      const error = new DateValidationError("Invalid date format", input);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(DateValidationError);
      expect(error.name).toBe("DateValidationError");
      expect(error.message).toBe("Invalid date format");
      expect(error.input).toBe(input);
    });

    it("should have proper stack trace", () => {
      const error = new DateValidationError("Test error", "test-input");
      expect(error.stack).toBeDefined();
      expect(error.stack).toContain("DateValidationError");
    });
  });

  describe("TimezoneValidationError", () => {
    it("should create error with message and timezone", () => {
      const timezone = "Invalid/Timezone";
      const error = new TimezoneValidationError("Invalid timezone", timezone);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(TimezoneValidationError);
      expect(error.name).toBe("TimezoneValidationError");
      expect(error.message).toBe("Invalid timezone");
      expect(error.timezone).toBe(timezone);
    });

    it("should have proper stack trace", () => {
      const error = new TimezoneValidationError("Test error", "Test/Zone");
      expect(error.stack).toBeDefined();
      expect(error.stack).toContain("TimezoneValidationError");
    });
  });

  describe("OperatorInputError", () => {
    it("should create error with message, operator, and input", () => {
      const operator = "$testOperator";
      const input = { invalid: "data" };
      const error = new OperatorInputError("Invalid input", operator, input);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(OperatorInputError);
      expect(error.name).toBe("OperatorInputError");
      expect(error.message).toBe("Invalid input");
      expect(error.operator).toBe(operator);
      expect(error.input).toEqual(input);
    });

    it("should have proper stack trace", () => {
      const error = new OperatorInputError("Test error", "$test", {});
      expect(error.stack).toBeDefined();
      expect(error.stack).toContain("OperatorInputError");
    });
  });

  describe("MaxIterationsError", () => {
    it("should create error with message and iterations", () => {
      const iterations = 365;
      const error = new MaxIterationsError(
        "Max iterations reached",
        iterations,
      );

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(MaxIterationsError);
      expect(error.name).toBe("MaxIterationsError");
      expect(error.message).toBe("Max iterations reached");
      expect(error.iterations).toBe(iterations);
    });

    it("should have proper stack trace", () => {
      const error = new MaxIterationsError("Test error", 100);
      expect(error.stack).toBeDefined();
      expect(error.stack).toContain("MaxIterationsError");
    });
  });
});
