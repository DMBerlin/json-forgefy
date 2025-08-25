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
} from "./operator-input.types";

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
  | "$dateDiff"
  | "$toFixed"
  | "$gt"
  | "$gte"
  | "$lt"
  | "$lte"
  | "$regex"
  | "$and"
  | "$or"
  | "$not"
  | "$ne"
  | "$in"
  | "$nin"
  | "$exists"
  | "$isNull";

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
  | IsNullOperatorInput;
