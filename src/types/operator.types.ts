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
  NoneOperatorInput,
  ExistsOperatorInput,
  IsNullOperatorInput,
  IsNumberOperatorInput,
  CoalesceOperatorInput,
  RoundOperatorInput,
  EveryOperatorInput,
  SomeOperatorInput,
  IsNaNOperatorInput,
  TrimOperatorInput,
  RegexReplaceOperatorInput,
  TypeOperatorInput,
  IsArrayOperatorInput,
  IsStringOperatorInput,
  IsBooleanOperatorInput,
  IsDateOperatorInput,
  ModOperatorInput,
  PowOperatorInput,
  SqrtOperatorInput,
  TruncOperatorInput,
} from "./operator-input.types";

export type OperatorValue = (
  source?: Record<string, any>,
) => (...args: any[]) => any;

export type OperatorKey =
  | "$abs"
  | "$add"
  | "$and"
  | "$ceil"
  | "$coalesce"
  | "$cond"
  | "$concat"
  | "$dateDiff"
  | "$divide"
  | "$eq"
  | "$every"
  | "$exists"
  | "$floor"
  | "$gt"
  | "$gte"
  | "$ifNull"
  | "$in"
  | "$isNaN"
  | "$isNull"
  | "$isNumber"
  | "$lt"
  | "$lte"
  | "$max"
  | "$min"
  | "$multiply"
  | "$ne"
  | "$nin"
  | "$none"
  | "$not"
  | "$or"
  | "$regex"
  | "$regexReplace"
  | "$replace"
  | "$round"
  | "$size"
  | "$slice"
  | "$some"
  | "$split"
  | "$substr"
  | "$subtract"
  | "$switch"
  | "$toFixed"
  | "$toLower"
  | "$toNumber"
  | "$toString"
  | "$toUpper"
  | "$trim"
  | "$type"
  | "$isArray"
  | "$isString"
  | "$isBoolean"
  | "$isDate"
  | "$mod"
  | "$pow"
  | "$sqrt"
  | "$trunc";

export type OperatorInput =
  | AddOperatorInput
  | AbsOperatorInput
  | AndOperatorInput
  | CeilOperatorInput
  | CoalesceOperatorInput
  | ConcatOperatorInput
  | CondOperatorInput
  | DateDiffOperatorInput
  | DivideOperatorInput
  | EqOperatorInput
  | EveryOperatorInput
  | ExistsOperatorInput
  | FloorOperatorInput
  | GtOperatorInput
  | GteOperatorInput
  | IfNullOperatorInput
  | InOperatorInput
  | IsNaNOperatorInput
  | IsNullOperatorInput
  | IsNumberOperatorInput
  | LtOperatorInput
  | LteOperatorInput
  | MaxOperatorInput
  | MinOperatorInput
  | MultiplyOperatorInput
  | NeOperatorInput
  | NinOperatorInput
  | NoneOperatorInput
  | NotOperatorInput
  | OrOperatorInput
  | RegexOperatorInput
  | RegexReplaceOperatorInput
  | RoundOperatorInput
  | SizeOperatorInput
  | SliceOperatorInput
  | SomeOperatorInput
  | SplitOperatorInput
  | SubstrOperatorInput
  | SubtractOperatorInput
  | SwitchOperatorInput
  | ToFixedOperatorInput
  | ToLowerOperatorInput
  | ToNumberOperatorInput
  | ToStringOperatorInput
  | ToUpperOperatorInput
  | TrimOperatorInput
  | TypeOperatorInput
  | IsArrayOperatorInput
  | IsStringOperatorInput
  | IsBooleanOperatorInput
  | IsDateOperatorInput
  | ModOperatorInput
  | PowOperatorInput
  | SqrtOperatorInput
  | TruncOperatorInput;
