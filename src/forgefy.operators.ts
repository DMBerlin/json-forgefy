import { OperatorKey, OperatorValue } from "./types/operator.types";
import { $toString } from "./operators/to-string.operator";
import { $toNumber } from "./operators/to-number.operator";
import { $multiply } from "./operators/multiply.operator";
import { $subtract } from "./operators/subtract.operator";
import { $toUpper } from "./operators/to-upper.operator";
import { $toLower } from "./operators/to-lower.operator";
import { $ifNull } from "./operators/if-null.operator";
import { $substr } from "./operators/substr.operator";
import { $divide } from "./operators/divide.operator";
import { $concat } from "./operators/concat.operator";
import { $slice } from "./operators/slice.operator";
import { $split } from "./operators/split.operator";
import { $size } from "./operators/size.operator";
import { $add } from "./operators/add.operator";
import { $eq } from "./operators/eq.operator";
import { $switch } from "./operators/switch.operator";
import { $cond } from "./operators/cond.operator";
import { $abs } from "./operators/abs.operator";
import { $ceil } from "./operators/ceil.operator";
import { $floor } from "./operators/floor.operator";
import { $max } from "./operators/max.operator";
import { $min } from "./operators/min.operator";
import { $dateDiff } from "./operators/date-diff.operator";
import { $toFixed } from "./operators/to-fixed.operator";

export const operators: Map<OperatorKey, OperatorValue> = new Map<
  OperatorKey,
  OperatorValue
>()
  .set("$ifNull", $ifNull)
  .set("$toString", $toString)
  .set("$toUpper", $toUpper)
  .set("$toLower", $toLower)
  .set("$toNumber", $toNumber)
  .set("$concat", $concat)
  .set("$slice", $slice)
  .set("$split", $split)
  .set("$substr", $substr)
  .set("$add", $add)
  .set("$subtract", $subtract)
  .set("$multiply", $multiply)
  .set("$divide", $divide)
  .set("$size", $size)
  .set("$eq", $eq)
  .set("$switch", $switch)
  .set("$cond", $cond)
  .set("$abs", $abs)
  .set("$ceil", $ceil)
  .set("$floor", $floor)
  .set("$max", $max)
  .set("$min", $min)
  .set("$dateDiff", $dateDiff)
  .set("$toFixed", $toFixed);
