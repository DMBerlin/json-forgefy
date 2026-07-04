import { Expression, ExpressionValues } from "./expression.types";
import { FallbackValue } from "./fallback.types";
import { JsonValidTypes } from "./json.types";
import { ObjectPathValue } from "./object-path-value.types";

export type AddOperatorInput = number[];

export type AbsOperatorInput = number;

export type SwitchOperatorInput = {
  branches: Array<{ case: ExpressionValues; then: unknown }>;
  default: JsonValidTypes;
};

export type CeilOperatorInput = number;

export type ConcatOperatorInput = string[];

export type CondOperatorInput = {
  if: ExpressionValues;
  then: unknown;
  else: unknown;
};

export type DateDiffOperatorInput = {
  startDate: string;
  endDate: string;
  unit: "days" | "months" | "years";
};

export type DivideOperatorInput = number[];

export type EqOperatorInput = [
  Omit<Expression, "$eq"> | number | string | boolean,
  Omit<Expression, "$eq"> | number | string | boolean,
];

export type FloorOperatorInput = number;

export type IfNullOperatorInput = [
  ExpressionValues | ObjectPathValue,
  ExpressionValues,
];

export type MaxOperatorInput = number[];

export type MinOperatorInput = number[];

export type MultiplyOperatorInput = number[];

export type RegexOperatorInput = {
  value: string;
  pattern: string;
};

export type SizeOperatorInput = unknown[];

export type SliceOperatorInput = {
  input: string;
  start: number;
  end?: number;
};

export type SplitOperatorInput = {
  input: string;
  delimiter: string;
};

export type SubstrOperatorInput = {
  value: string;
  start: number;
  length: number;
};

export type SubtractOperatorInput = number[];

export type ToLowerOperatorInput = string;

export type ToNumberOperatorInput = ExpressionValues;

export type ToStringOperatorInput = unknown;

export type ToUpperOperatorInput = string;

export type ToFixedOperatorInput = {
  value: number;
  precision: number;
};

/**
 * A value that supports ordered relational comparison ($gt, $gte, $lt, $lte).
 * By the time these operators run, paths and nested expressions have been
 * resolved to concrete comparable primitives.
 */
export type ComparableValue = number | string;

export type GtOperatorInput = [ComparableValue, ComparableValue];
export type GteOperatorInput = [ComparableValue, ComparableValue];
export type LtOperatorInput = [ComparableValue, ComparableValue];
export type LteOperatorInput = [ComparableValue, ComparableValue];
export type AndOperatorInput = ExpressionValues[];
export type OrOperatorInput = ExpressionValues[];
export type NotOperatorInput = ExpressionValues;
export type NeOperatorInput = [ExpressionValues, ExpressionValues];
export type InOperatorInput = [ExpressionValues, ExpressionValues];
export type NinOperatorInput = [ExpressionValues, ExpressionValues];
export type ExistsOperatorInput = string;
export type IsNullOperatorInput = ExpressionValues;
export type ReplaceOperatorInput = {
  input: string;
  searchValues: string[];
  replacement: string;
};
export type IsNumberOperatorInput = unknown;
export type CoalesceOperatorInput = unknown[];
export type RoundOperatorInput = {
  value: number;
  precision?: number;
};

export type EveryOperatorInput = {
  conditions: unknown[];
  then: unknown;
  else: unknown;
};

export type SomeOperatorInput = {
  conditions: unknown[];
  then: unknown;
  else: unknown;
};

export type IsNaNOperatorInput = unknown;

export type TrimOperatorInput = {
  input: string;
  chars?: string[];
};

export type RegexReplaceOperatorInput = {
  input: string;
  pattern: string;
  replacement: string;
  flags?: string;
};

export type NoneOperatorInput = ExpressionValues[];

export type TypeOperatorInput = unknown;
export type IsArrayOperatorInput = unknown;
export type IsStringOperatorInput = unknown;
export type IsBooleanOperatorInput = unknown;
export type IsDateOperatorInput = unknown;

export type ModOperatorInput = {
  dividend: number;
  divisor: number;
  fallback?: FallbackValue;
};

export type PowOperatorInput = {
  base: number;
  exponent: number;
  fallback?: FallbackValue;
};

export type SqrtOperatorInput = {
  value: number;
  fallback?: FallbackValue;
};

export type TruncOperatorInput = {
  value: number;
  fallback?: FallbackValue;
};

export type LtrimOperatorInput = {
  input: string;
  chars?: string[];
  fallback?: FallbackValue;
};

export type RtrimOperatorInput = {
  input: string;
  chars?: string[];
  fallback?: FallbackValue;
};

export type IndexOfOperatorInput = {
  input: string;
  substring: string;
  start?: number;
  fallback?: FallbackValue;
};

export type ReplaceOneOperatorInput = {
  input: string;
  search: string;
  replacement: string;
  fallback?: FallbackValue;
};

export type ReplaceAllOperatorInput = {
  input: string;
  search: string;
  replacement: string;
  fallback?: FallbackValue;
};

// Date operator types
export type ToDateOperatorInput =
  | string
  | number
  | Date
  | {
      value: string | number | Date;
      fallback?: FallbackValue;
    };

export type DayOfWeekOperatorInput =
  | string
  | number
  | Date
  | {
      date: string | number | Date;
      timezone?: string;
      fallback?: FallbackValue;
    };

export type DayOfMonthOperatorInput =
  | string
  | number
  | Date
  | {
      date: string | number | Date;
      timezone?: string;
      fallback?: FallbackValue;
    };

export type DayOfYearOperatorInput =
  | string
  | number
  | Date
  | {
      date: string | number | Date;
      timezone?: string;
      fallback?: FallbackValue;
    };

/**
 * Valid strategies for $dateShift operator
 * Using const object pattern for zero runtime overhead and tree-shaking
 * Following gts naming convention: UPPER_SNAKE_CASE for const object members
 */
export const DateShiftStrategy = {
  ROLL_FORWARD: "rollForward",
  ROLL_BACKWARD: "rollBackward",
  KEEP: "keep",
} as const;

/**
 * Type derived from DateShiftStrategy const object
 */
export type DateShiftStrategy =
  (typeof DateShiftStrategy)[keyof typeof DateShiftStrategy];

export type DateShiftOperatorInput = {
  date: string | number | Date;
  strategy?: DateShiftStrategy;
  holidays?: string[];
  weekends?: number[];
  timezone?: string;
  maxIterations?: number;
  fallback?: FallbackValue;
};

// Additional date operator types
export type IsWeekendOperatorInput =
  | string
  | number
  | Date
  | {
      date: string | number | Date;
      timezone?: string;
      weekends?: number[];
      fallback?: FallbackValue;
    };

export type IsHolidayOperatorInput = {
  date: string | number | Date;
  holidays: string[];
  timezone?: string;
  fallback?: FallbackValue;
};

export type AddDaysOperatorInput = {
  date: string | number | Date;
  days: number;
  timezone?: string;
  fallback?: FallbackValue;
};

export type MonthOperatorInput =
  | string
  | number
  | Date
  | {
      date: string | number | Date;
      timezone?: string;
      fallback?: FallbackValue;
    };

export type YearOperatorInput =
  | string
  | number
  | Date
  | {
      date: string | number | Date;
      timezone?: string;
      fallback?: FallbackValue;
    };

export type IsLeapYearOperatorInput =
  | string
  | number
  | Date
  | {
      value: string | number | Date;
      fallback?: FallbackValue;
    };

// Array operator types
export type MapOperatorInput = {
  input: unknown[];
  expression: ExpressionValues;
  fallback?: FallbackValue;
};

export type FilterOperatorInput = {
  input: unknown[];
  condition: ExpressionValues;
  fallback?: FallbackValue;
};

export type ReduceOperatorInput = {
  input: unknown[];
  initialValue: unknown;
  expression: ExpressionValues;
  fallback?: FallbackValue;
};

export type ArrayAtOperatorInput = {
  input: unknown[];
  index: number;
  fallback?: FallbackValue;
};

export type ArrayFirstOperatorInput = {
  input: unknown[];
  fallback?: FallbackValue;
};

export type ArrayLastOperatorInput = {
  input: unknown[];
  fallback?: FallbackValue;
};

export type AvgOperatorInput = {
  values: number[];
  fallback?: FallbackValue;
};

export type SumOperatorInput = {
  values: number[];
  fallback?: FallbackValue;
};
