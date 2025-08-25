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
import { $gt } from "./operators/gt.operator";
import { $gte } from "./operators/gte.operator";
import { $lt } from "./operators/lt.operator";
import { $lte } from "./operators/lte.operator";
import { $regex } from "./operators/regex.operator";
import { $and } from "./operators/and.operator";
import { $or } from "./operators/or.operator";
import { $not } from "./operators/not.operator";
import { $ne } from "./operators/ne.operator";
import { $in } from "./operators/in.operator";
import { $nin } from "./operators/nin.operator";
import { $exists } from "./operators/exists.operator";
import { $isNull } from "./operators/is-null.operator";

/**
 * Central registry of all available operators in the json-forgefy library.
 * This Map contains all the operator functions that can be used in transformation blueprints.
 * Each operator is registered with its key (e.g., "$add", "$multiply") and corresponding
 * implementation function.
 *
 * The operators are organized into categories:
 * - Mathematical: $add, $subtract, $multiply, $divide, $abs, $ceil, $floor, $max, $min
 * - String: $toString, $toUpper, $toLower, $concat, $substr, $slice, $split, $size
 * - Conditional: $cond, $switch, $ifNull
 * - Comparison: $eq, $gt, $gte, $lt, $lte, $ne, $regex
 * - Logical: $and, $or, $not
 * - Array: $in, $nin
 * - Utility: $exists, $isNull
 * - Type Conversion: $toNumber, $toString
 * - Date: $dateDiff
 * - Utility: $toFixed
 *
 * @example
 * ```typescript
 * // The operators map is used internally by resolveExpression
 * const operator = operators.get("$add");
 * const result = operator({ context: sourceData })([1, 2, 3]); // Returns 6
 * ```
 */
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
  .set("$toFixed", $toFixed)
  .set("$gt", $gt)
  .set("$gte", $gte)
  .set("$lt", $lt)
  .set("$lte", $lte)
  .set("$regex", $regex)
  .set("$and", $and)
  .set("$or", $or)
  .set("$not", $not)
  .set("$ne", $ne)
  .set("$in", $in)
  .set("$nin", $nin)
  .set("$exists", $exists)
  .set("$isNull", $isNull);
