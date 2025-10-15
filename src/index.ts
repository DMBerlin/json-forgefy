/**
 * @fileoverview JSON Forgefy - A powerful TypeScript library for transforming JSON objects
 * using MongoDB-inspired operators and projection blueprints.
 *
 * This library provides a declarative way to transform data structures by defining
 * transformation blueprints that can include:
 * - Path extraction using $ notation (e.g., "$user.name")
 * - Mathematical operators (e.g., $add, $multiply, $subtract)
 * - String operations (e.g., $concat, $toUpper, $substr)
 * - Conditional logic (e.g., $cond, $switch)
 * - Type conversions (e.g., $toString, $toNumber)
 * - And many more operators inspired by MongoDB's aggregation pipeline
 *
 * @author Daniel Marinho
 * @version 3.0.0
 * @license ISC
 */

import { forgefy } from "@core/forgefy.core";

/**
 * The main transformation function exported by the json-forgefy library.
 *
 * @example
 * ```typescript
 * import { Forgefy } from 'json-forgefy';
 *
 * const payload = { user: { name: "John" }, amount: "100" };
 * const blueprint = {
 *   userName: "$user.name",
 *   total: { $toNumber: "$amount" }
 * };
 *
 * const result = Forgefy.this(payload, blueprint);
 * // Result: { userName: "John", total: 100 }
 * ```
 */

const Forgefy = {
  this: forgefy,
};

export { Forgefy };

// Export types for TypeScript users
export type {
  Expression,
  ExpressionValues,
  Projection,
} from "@lib-types/expression.types";
export type {
  OperatorKey,
  OperatorInput,
  OperatorValue,
} from "@lib-types/operator.types";
export type { FallbackValue, WithFallback } from "@lib-types/fallback.types";
export type {
  DateValidationError,
  TimezoneValidationError,
  OperatorInputError,
  MaxIterationsError,
} from "@lib-types/error.types";

// Export all operator input types
export type {
  // Math operators
  AddOperatorInput,
  AbsOperatorInput,
  SubtractOperatorInput,
  MultiplyOperatorInput,
  DivideOperatorInput,
  ModOperatorInput,
  PowOperatorInput,
  SqrtOperatorInput,
  TruncOperatorInput,
  CeilOperatorInput,
  FloorOperatorInput,
  MaxOperatorInput,
  MinOperatorInput,
  RoundOperatorInput,
  ToFixedOperatorInput,
  AvgOperatorInput,
  SumOperatorInput,

  // String operators
  ConcatOperatorInput,
  ToLowerOperatorInput,
  ToUpperOperatorInput,
  ToStringOperatorInput,
  SubstrOperatorInput,
  SliceOperatorInput,
  SplitOperatorInput,
  SizeOperatorInput,
  TrimOperatorInput,
  LtrimOperatorInput,
  RtrimOperatorInput,
  IndexOfOperatorInput,
  ReplaceOperatorInput,
  ReplaceOneOperatorInput,
  ReplaceAllOperatorInput,
  RegexOperatorInput,
  RegexReplaceOperatorInput,

  // Date operators
  DateDiffOperatorInput,
  ToDateOperatorInput,
  DayOfWeekOperatorInput,
  DayOfMonthOperatorInput,
  DayOfYearOperatorInput,
  MonthOperatorInput,
  YearOperatorInput,
  IsLeapYearOperatorInput,
  IsWeekendOperatorInput,
  IsHolidayOperatorInput,
  AddDaysOperatorInput,
  DateShiftOperatorInput,

  // Array operators
  MapOperatorInput,
  FilterOperatorInput,
  ReduceOperatorInput,
  ArrayAtOperatorInput,
  ArrayFirstOperatorInput,
  ArrayLastOperatorInput,

  // Comparison operators
  EqOperatorInput,
  NeOperatorInput,
  GtOperatorInput,
  GteOperatorInput,
  LtOperatorInput,
  LteOperatorInput,
  InOperatorInput,
  NinOperatorInput,

  // Logical operators
  AndOperatorInput,
  OrOperatorInput,
  NotOperatorInput,
  NoneOperatorInput,

  // Conditional operators
  CondOperatorInput,
  SwitchOperatorInput,
  IfNullOperatorInput,
  CoalesceOperatorInput,
  EveryOperatorInput,
  SomeOperatorInput,

  // Type operators
  TypeOperatorInput,
  IsArrayOperatorInput,
  IsStringOperatorInput,
  IsBooleanOperatorInput,
  IsDateOperatorInput,
  IsNullOperatorInput,
  IsNumberOperatorInput,
  IsNaNOperatorInput,
  ExistsOperatorInput,
  ToNumberOperatorInput,
} from "@lib-types/operator-input.types";
