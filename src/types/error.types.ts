/**
 * Error thrown when date validation fails
 */
export class DateValidationError extends Error {
  constructor(
    message: string,
    public readonly input: any,
  ) {
    super(message);
    this.name = "DateValidationError";

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if ((Error as any).captureStackTrace) {
      (Error as any).captureStackTrace(this, DateValidationError);
    }
  }
}

/**
 * Error thrown when timezone validation fails
 */
export class TimezoneValidationError extends Error {
  constructor(
    message: string,
    public readonly timezone: string,
  ) {
    super(message);
    this.name = "TimezoneValidationError";

    if ((Error as any).captureStackTrace) {
      (Error as any).captureStackTrace(this, TimezoneValidationError);
    }
  }
}

/**
 * Error thrown when operator input validation fails
 */
export class OperatorInputError extends Error {
  constructor(
    message: string,
    public readonly operator: string,
    public readonly input: any,
  ) {
    super(message);
    this.name = "OperatorInputError";

    if ((Error as any).captureStackTrace) {
      (Error as any).captureStackTrace(this, OperatorInputError);
    }
  }
}

/**
 * Error thrown when maximum iterations are reached in iterative operations
 */
export class MaxIterationsError extends Error {
  constructor(
    message: string,
    public readonly iterations: number,
  ) {
    super(message);
    this.name = "MaxIterationsError";

    if ((Error as any).captureStackTrace) {
      (Error as any).captureStackTrace(this, MaxIterationsError);
    }
  }
}
