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
  end: number;
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

export type ToNumberOperatorInput = string;

export type ToStringOperatorInput = unknown;

export type ToUpperOperatorInput = string;

export type ToFixedOperatorInput = {
  value: number;
  precision: number;
};

export type GtOperatorInput = [ExpressionValues, ExpressionValues];
export type GteOperatorInput = [ExpressionValues, ExpressionValues];
export type LtOperatorInput = [ExpressionValues, ExpressionValues];
export type LteOperatorInput = [ExpressionValues, ExpressionValues];
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
  fallback?: unknown;
};

export type PowOperatorInput = {
  base: number;
  exponent: number;
  fallback?: unknown;
};

export type SqrtOperatorInput = {
  value: number;
  fallback?: unknown;
};

export type TruncOperatorInput = {
  value: number;
  fallback?: unknown;
};

export type LtrimOperatorInput = {
  input: string;
  chars?: string[];
  fallback?: unknown;
};

export type RtrimOperatorInput = {
  input: string;
  chars?: string[];
  fallback?: unknown;
};

export type IndexOfOperatorInput = {
  input: string;
  substring: string;
  start?: number;
  fallback?: unknown;
};

export type ReplaceOneOperatorInput = {
  input: string;
  search: string;
  replacement: string;
  fallback?: unknown;
};

export type ReplaceAllOperatorInput = {
  input: string;
  search: string;
  replacement: string;
  fallback?: unknown;
};

// Date operator types
export type ToDateOperatorInput =
  | string
  | number
  | Date
  | {
      value: string | number | Date;
      fallback?: unknown;
    };

export type DayOfWeekOperatorInput =
  | string
  | number
  | Date
  | {
      date: string | number | Date;
      timezone?: string;
      fallback?: unknown;
    };

export type DayOfMonthOperatorInput =
  | string
  | number
  | Date
  | {
      date: string | number | Date;
      timezone?: string;
      fallback?: unknown;
    };

export type DayOfYearOperatorInput =
  | string
  | number
  | Date
  | {
      date: string | number | Date;
      timezone?: string;
      fallback?: unknown;
    };

export type DateShiftOperatorInput = {
  date: string | number | Date;
  strategy?: "rollForward" | "rollBackward" | "keep";
  holidays?: string[];
  weekends?: number[];
  timezone?: string;
  maxIterations?: number;
  fallback?: unknown;
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
      fallback?: unknown;
    };

export type IsHolidayOperatorInput = {
  date: string | number | Date;
  holidays: string[];
  timezone?: string;
  fallback?: unknown;
};

export type AddDaysOperatorInput = {
  date: string | number | Date;
  days: number;
  timezone?: string;
  fallback?: unknown;
};

export type MonthOperatorInput =
  | string
  | number
  | Date
  | {
      date: string | number | Date;
      timezone?: string;
      fallback?: unknown;
    };

export type YearOperatorInput =
  | string
  | number
  | Date
  | {
      date: string | number | Date;
      timezone?: string;
      fallback?: unknown;
    };

export type IsLeapYearOperatorInput =
  | string
  | number
  | Date
  | {
      value: string | number | Date;
      fallback?: unknown;
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
  fallback?: unknown;
};

export type ArrayFirstOperatorInput = {
  input: unknown[];
  fallback?: unknown;
};

export type ArrayLastOperatorInput = {
  input: unknown[];
  fallback?: unknown;
};

export type AvgOperatorInput = {
  values: number[];
  fallback?: unknown;
};

export type SumOperatorInput = {
  values: number[];
  fallback?: unknown;
};
