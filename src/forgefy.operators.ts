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
import { $cond } from "@operators/cond.operator";

export const operators: Map<string, (...any: any[]) => any> = new Map<
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
  .set("$cond", $cond);
