import { Expression, ExpressionValues } from "./expression.types";
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
