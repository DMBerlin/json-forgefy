import { Expression } from "./expression.types";

export type AddOperatorInput = number[];

export type AbsOperatorInput = number;

export type SwitchOperatorInput = {
  branches: Array<{ case: Expression; then: unknown }>;
  default: unknown;
};

export type CeilOperatorInput = number;

export type ConcatOperatorInput = string[];

export type CondOperatorInput = {
  if: Expression;
  then: unknown;
  else: unknown;
};

export type DateDiffOperatorInput = {
  startDate: string;
  endDate: string;
  unit: "days" | "months" | "years";
};

export type DivideOperatorInput = Array<number | Expression>;

export type EqOperatorInput = [
  Omit<Expression, "$eq"> | number | string | boolean,
  Omit<Expression, "$eq"> | number | string | boolean,
];

export type FloorOperatorInput = number;

export type IfNullOperatorInput = [unknown, unknown];

export type MaxOperatorInput = number[];

export type MinOperatorInput = number[];

export type MultiplyOperatorInput = number[];

export type SizeOperatorInput = number[];

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

export type ToStringOperatorInput = string;

export type ToUpperOperatorInput = string;

export type ToFixedOperatorInput = {
  value: number;
  precision: number;
};
