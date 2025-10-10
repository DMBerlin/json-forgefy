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
  ToFixedOperatorInput,
  ToLowerOperatorInput,
  ToNumberOperatorInput,
  ToStringOperatorInput,
  ToUpperOperatorInput,
  GtOperatorInput,
  GteOperatorInput,
  LtOperatorInput,
  LteOperatorInput,
  RegexOperatorInput,
  AndOperatorInput,
  OrOperatorInput,
  NotOperatorInput,
  NeOperatorInput,
  InOperatorInput,
  NinOperatorInput,
  ExistsOperatorInput,
  IsNullOperatorInput,
  IsNumberOperatorInput,
  DefaultOperatorInput,
  RoundOperatorInput,
  EveryOperatorInput,
  SomeOperatorInput,
  IsNaNOperatorInput,
  TrimOperatorInput,
} from "./operator-input.types";

export type OperatorValue = (
  source?: Record<string, any>,
) => (...args: any[]) => any;

export type OperatorKey =
  | "$abs"
  | "$add"
  | "$and"
  | "$ceil"
  | "$cond"
  | "$concat"
  | "$dateDiff"
  | "$default"
  | "$divide"
  | "$eq"
  | "$exists"
  | "$floor"
  | "$gt"
  | "$gte"
  | "$ifNull"
  | "$in"
  | "$isNull"
  | "$isNumber"
  | "$lt"
  | "$lte"
  | "$max"
  | "$min"
  | "$multiply"
  | "$ne"
  | "$nin"
  | "$not"
  | "$or"
  | "$regex"
  | "$replace"
  | "$round"
  | "$size"
  | "$slice"
  | "$split"
  | "$substr"
  | "$subtract"
  | "$switch"
  | "$toFixed"
  | "$toLower"
  | "$toNumber"
  | "$toString"
  | "$toUpper"
  | "$every"
  | "$some"
  | "$isNaN"
  | "$trim";

export type OperatorInput =
  | AddOperatorInput
  | AbsOperatorInput
  | SwitchOperatorInput
  | CeilOperatorInput
  | ConcatOperatorInput
  | CondOperatorInput
  | DateDiffOperatorInput
  | DefaultOperatorInput
  | DivideOperatorInput
  | EqOperatorInput
  | FloorOperatorInput
  | IfNullOperatorInput
  | IsNumberOperatorInput
  | MaxOperatorInput
  | MinOperatorInput
  | MultiplyOperatorInput
  | RoundOperatorInput
  | SizeOperatorInput
  | SliceOperatorInput
  | SplitOperatorInput
  | SubstrOperatorInput
  | SubtractOperatorInput
  | ToLowerOperatorInput
  | ToNumberOperatorInput
  | ToStringOperatorInput
  | ToUpperOperatorInput
  | ToFixedOperatorInput
  | GtOperatorInput
  | GteOperatorInput
  | LtOperatorInput
  | LteOperatorInput
  | RegexOperatorInput
  | AndOperatorInput
  | OrOperatorInput
  | NotOperatorInput
  | NeOperatorInput
  | InOperatorInput
  | NinOperatorInput
  | ExistsOperatorInput
  | IsNullOperatorInput
  | EveryOperatorInput
  | SomeOperatorInput
  | IsNaNOperatorInput
  | TrimOperatorInput;
