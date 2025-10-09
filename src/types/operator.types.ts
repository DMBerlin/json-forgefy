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
  | "$abs"
  | "$add"
  | "$and"
  | "$ceil"
  | "$cond"
  | "$concat"
  | "$dateDiff"
  | "$divide"
  | "$eq"
  | "$exists"
  | "$floor"
  | "$gt"
  | "$gte"
  | "$ifNull"
  | "$in"
  | "$isNull"
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
  | "$toUpper";

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
