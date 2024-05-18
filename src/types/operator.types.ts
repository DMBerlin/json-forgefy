import {
  AbsOperatorInput,
  AddOperatorInput,
  CeilOperatorInput,
  ConcatOperatorInput,
  CondOperatorInput,
  DateDiffOperatorInput,
  DivideOperatorInput,
  EqOperatorInput,
  FloorOperatorInput,
  IfNullOperatorInput,
  MaxOperatorInput,
  MinOperatorInput,
  MultiplyOperatorInput,
  SizeOperatorInput,
  SliceOperatorInput,
  SplitOperatorInput,
  SubstrOperatorInput,
  SubtractOperatorInput,
  SwitchOperatorInput,
  ToLowerOperatorInput,
  ToNumberOperatorInput,
  ToStringOperatorInput,
  ToUpperOperatorInput,
} from "./inputs.types";

export type OperatorValue = (
  source?: Record<string, any>,
) => (...args: any[]) => any;

export type OperatorKey =
  | "$ifNull"
  | "$multiply"
  | "$toNumber"
  | "$toString"
  | "$divide"
  | "$add"
  | "$subtract"
  | "$toUpper"
  | "$toLower"
  | "$concat"
  | "$size"
  | "$substr"
  | "$slice"
  | "$split"
  | "$eq"
  | "$switch"
  | "$cond"
  | "$abs"
  | "$ceil"
  | "$floor"
  | "$max"
  | "$min"
  | "$dateDiff";

export type OperatorInput =
  | AddOperatorInput
  | AbsOperatorInput
  | SwitchOperatorInput
  | CeilOperatorInput
  | ConcatOperatorInput
  | CondOperatorInput
  | DateDiffOperatorInput
  | DivideOperatorInput
  | EqOperatorInput
  | FloorOperatorInput
  | IfNullOperatorInput
  | MaxOperatorInput
  | MinOperatorInput
  | MultiplyOperatorInput
  | SizeOperatorInput
  | SliceOperatorInput
  | SplitOperatorInput
  | SubstrOperatorInput
  | SubtractOperatorInput
  | ToLowerOperatorInput
  | ToNumberOperatorInput
  | ToStringOperatorInput
  | ToUpperOperatorInput;
