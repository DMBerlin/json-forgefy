import { ExecutionContext } from "@interfaces/execution-context.interface";
import {
  AbsOperatorInput,
  AddOperatorInput,
  AddDaysOperatorInput,
  AndOperatorInput,
  ArrayAtOperatorInput,
  ArrayFirstOperatorInput,
  ArrayLastOperatorInput,
  AvgOperatorInput,
  CeilOperatorInput,
  CoalesceOperatorInput,
  ConcatOperatorInput,
  CondOperatorInput,
  DateDiffOperatorInput,
  DateShiftOperatorInput,
  DayOfMonthOperatorInput,
  DayOfWeekOperatorInput,
  DayOfYearOperatorInput,
  DivideOperatorInput,
  EqOperatorInput,
  EveryOperatorInput,
  ExistsOperatorInput,
  FilterOperatorInput,
  FloorOperatorInput,
  GtOperatorInput,
  GteOperatorInput,
  IfNullOperatorInput,
  InOperatorInput,
  IndexOfOperatorInput,
  IsArrayOperatorInput,
  IsBooleanOperatorInput,
  IsDateOperatorInput,
  IsHolidayOperatorInput,
  IsLeapYearOperatorInput,
  IsNaNOperatorInput,
  IsNullOperatorInput,
  IsNumberOperatorInput,
  IsStringOperatorInput,
  IsWeekendOperatorInput,
  LtOperatorInput,
  LteOperatorInput,
  LtrimOperatorInput,
  MapOperatorInput,
  MaxOperatorInput,
  MinOperatorInput,
  ModOperatorInput,
  MonthOperatorInput,
  MultiplyOperatorInput,
  NeOperatorInput,
  NinOperatorInput,
  NoneOperatorInput,
  NotOperatorInput,
  OrOperatorInput,
  PowOperatorInput,
  ReduceOperatorInput,
  RegexOperatorInput,
  RegexReplaceOperatorInput,
  ReplaceOperatorInput,
  ReplaceAllOperatorInput,
  ReplaceOneOperatorInput,
  RoundOperatorInput,
  RtrimOperatorInput,
  SizeOperatorInput,
  SliceOperatorInput,
  SomeOperatorInput,
  SplitOperatorInput,
  SqrtOperatorInput,
  SubstrOperatorInput,
  SubtractOperatorInput,
  SumOperatorInput,
  SwitchOperatorInput,
  ToDateOperatorInput,
  ToFixedOperatorInput,
  ToLowerOperatorInput,
  ToNumberOperatorInput,
  ToStringOperatorInput,
  ToUpperOperatorInput,
  TrimOperatorInput,
  TruncOperatorInput,
  TypeOperatorInput,
  YearOperatorInput,
} from "./operator-input.types";

/**
 * The type-erased shape under which every operator is stored in the registry.
 *
 * Concrete operators are authored as {@link ExecutableExpression}`<P, R>` with
 * specific input/output types; they are widened to this common shape for
 * storage. The input is intentionally `any` (each operator narrows its own
 * input), while the result is `unknown` so callers must explicitly assert the
 * expected return type instead of silently propagating `any`.
 */
export type OperatorValue = (ctx?: ExecutionContext) => (value: any) => unknown;

export type OperatorKey =
  | "$abs"
  | "$add"
  | "$addDays"
  | "$and"
  | "$arrayAt"
  | "$arrayFirst"
  | "$arrayLast"
  | "$avg"
  | "$ceil"
  | "$coalesce"
  | "$cond"
  | "$concat"
  | "$dateDiff"
  | "$dateShift"
  | "$dayOfMonth"
  | "$dayOfWeek"
  | "$dayOfYear"
  | "$divide"
  | "$eq"
  | "$every"
  | "$exists"
  | "$filter"
  | "$floor"
  | "$gt"
  | "$gte"
  | "$ifNull"
  | "$in"
  | "$indexOf"
  | "$isArray"
  | "$isBoolean"
  | "$isDate"
  | "$isHoliday"
  | "$isLeapYear"
  | "$isNaN"
  | "$isNull"
  | "$isNumber"
  | "$isString"
  | "$isWeekend"
  | "$lt"
  | "$lte"
  | "$ltrim"
  | "$map"
  | "$max"
  | "$min"
  | "$mod"
  | "$month"
  | "$multiply"
  | "$ne"
  | "$nin"
  | "$none"
  | "$not"
  | "$or"
  | "$pow"
  | "$reduce"
  | "$regex"
  | "$regexReplace"
  | "$replace"
  | "$replaceAll"
  | "$replaceOne"
  | "$round"
  | "$rtrim"
  | "$size"
  | "$slice"
  | "$some"
  | "$split"
  | "$sqrt"
  | "$substr"
  | "$subtract"
  | "$sum"
  | "$switch"
  | "$toDate"
  | "$toFixed"
  | "$toLower"
  | "$toNumber"
  | "$toString"
  | "$toUpper"
  | "$trim"
  | "$trunc"
  | "$type"
  | "$year";

export type OperatorInput =
  | AbsOperatorInput
  | AddDaysOperatorInput
  | AddOperatorInput
  | AndOperatorInput
  | ArrayAtOperatorInput
  | ArrayFirstOperatorInput
  | ArrayLastOperatorInput
  | AvgOperatorInput
  | CeilOperatorInput
  | CoalesceOperatorInput
  | ConcatOperatorInput
  | CondOperatorInput
  | DateDiffOperatorInput
  | DateShiftOperatorInput
  | DayOfMonthOperatorInput
  | DayOfWeekOperatorInput
  | DayOfYearOperatorInput
  | DivideOperatorInput
  | EqOperatorInput
  | EveryOperatorInput
  | ExistsOperatorInput
  | FilterOperatorInput
  | FloorOperatorInput
  | GtOperatorInput
  | GteOperatorInput
  | IfNullOperatorInput
  | InOperatorInput
  | IndexOfOperatorInput
  | IsArrayOperatorInput
  | IsBooleanOperatorInput
  | IsDateOperatorInput
  | IsHolidayOperatorInput
  | IsLeapYearOperatorInput
  | IsNaNOperatorInput
  | IsNullOperatorInput
  | IsNumberOperatorInput
  | IsStringOperatorInput
  | IsWeekendOperatorInput
  | LtOperatorInput
  | LteOperatorInput
  | LtrimOperatorInput
  | MapOperatorInput
  | MaxOperatorInput
  | MinOperatorInput
  | ModOperatorInput
  | MonthOperatorInput
  | MultiplyOperatorInput
  | NeOperatorInput
  | NinOperatorInput
  | NoneOperatorInput
  | NotOperatorInput
  | OrOperatorInput
  | PowOperatorInput
  | ReduceOperatorInput
  | RegexOperatorInput
  | RegexReplaceOperatorInput
  | ReplaceOperatorInput
  | ReplaceAllOperatorInput
  | ReplaceOneOperatorInput
  | RoundOperatorInput
  | RtrimOperatorInput
  | SizeOperatorInput
  | SliceOperatorInput
  | SomeOperatorInput
  | SplitOperatorInput
  | SqrtOperatorInput
  | SubstrOperatorInput
  | SubtractOperatorInput
  | SumOperatorInput
  | SwitchOperatorInput
  | ToDateOperatorInput
  | ToFixedOperatorInput
  | ToLowerOperatorInput
  | ToNumberOperatorInput
  | ToStringOperatorInput
  | ToUpperOperatorInput
  | TrimOperatorInput
  | TruncOperatorInput
  | TypeOperatorInput
  | YearOperatorInput;
