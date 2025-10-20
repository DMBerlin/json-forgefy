/**
 * Base class for all json-forgefy custom errors
 * Ensures proper stack traces and error names
 */
abstract class ForgefyError extends Error {
  protected constructor(
    message: string,
    errorClass: new (...args: any[]) => Error,
  ) {
    super(message);
    this.name = this.constructor.name;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if ((Error as any).captureStackTrace) {
      (Error as any).captureStackTrace(this, errorClass);
    }
  }
}

/**
 * Error thrown when date validation fails
 */
export class DateValidationError extends ForgefyError {
  constructor(
    message: string,
    public readonly input: any,
  ) {
    super(message, DateValidationError);
  }
}

/**
 * Error thrown when timezone validation fails
 */
export class TimezoneValidationError extends ForgefyError {
  constructor(
    message: string,
    public readonly timezone: string,
  ) {
    super(message, TimezoneValidationError);
  }
}

/**
 * Error thrown when operator input validation fails
 */
export class OperatorInputError extends ForgefyError {
  constructor(
    message: string,
    public readonly operator: string,
    public readonly input: any,
  ) {
    super(message, OperatorInputError);
  }
}

/**
 * Error thrown when maximum iterations are reached in iterative operations
 */
export class MaxIterationsError extends ForgefyError {
  constructor(
    message: string,
    public readonly iterations: number,
  ) {
    super(message, MaxIterationsError);
  }
}

/**
 * Error thrown when holiday date validation fails
 */
export class InvalidHolidayError extends ForgefyError {
  constructor(
    message: string,
    public readonly holiday: string,
  ) {
    super(message, InvalidHolidayError);
  }
}

/**
 * Error thrown when weekend configuration validation fails
 */
export class InvalidWeekendError extends ForgefyError {
  constructor(
    message: string,
    public readonly weekends: any,
  ) {
    super(message, InvalidWeekendError);
  }
}

/**
 * Error thrown when date input format is invalid
 */
export class InvalidDateFormatError extends ForgefyError {
  constructor(
    message: string,
    public readonly input: any,
  ) {
    super(message, InvalidDateFormatError);
  }
}

/**
 * Error thrown when timestamp is out of representable range
 */
export class TimestampRangeError extends ForgefyError {
  constructor(
    message: string,
    public readonly timestamp: number,
  ) {
    super(message, TimestampRangeError);
  }
}

/**
 * Error thrown when strategy parameter is invalid
 */
export class InvalidStrategyError extends ForgefyError {
  constructor(
    message: string,
    public readonly strategy: string,
    public readonly validStrategies: string[],
  ) {
    super(message, InvalidStrategyError);
  }
}

/**
 * Error thrown when an unknown operator is referenced in an expression
 */
export class UnknownOperatorError extends ForgefyError {
  constructor(
    public readonly operatorKey: string,
    public readonly availableOperators?: string[],
  ) {
    super(
      `Unknown operator: ${operatorKey}${
        availableOperators
          ? `. Available operators: ${availableOperators.length} registered`
          : ""
      }`,
      UnknownOperatorError,
    );
  }
}

/**
 * Error thrown when array operator receives non-array input
 */
export class ArrayOperatorInputError extends ForgefyError {
  constructor(
    public readonly operatorName: string,
    public readonly receivedType: string,
    public readonly receivedValue: unknown,
  ) {
    super(
      `${operatorName} 'input' must be an array, received ${receivedType}`,
      ArrayOperatorInputError,
    );
  }
}

/**
 * Error thrown when array operator is missing required parameters
 */
export class MissingOperatorParameterError extends ForgefyError {
  constructor(
    public readonly operatorName: string,
    public readonly missingParameter: string,
    public readonly requiredParameters: string[],
  ) {
    super(
      `${operatorName} requires '${missingParameter}' to be defined. Required: ${requiredParameters.join(", ")}`,
      MissingOperatorParameterError,
    );
  }
}

/**
 * Error thrown when operator receives malformed parameters
 */
export class MalformedOperatorParametersError extends ForgefyError {
  constructor(
    public readonly operatorName: string,
    public readonly expectedFormat: string,
    public readonly receivedValue: unknown,
  ) {
    super(
      `${operatorName} requires ${expectedFormat}, received ${typeof receivedValue}`,
      MalformedOperatorParametersError,
    );
  }
}
