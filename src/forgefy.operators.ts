import { OperatorKey, OperatorValue } from "@lib-types/operator.types";

// String operators
import { $toString } from "@operators/string/to-string.operator";
import { $toUpper } from "@operators/string/to-upper.operator";
import { $toLower } from "@operators/string/to-lower.operator";
import { $substr } from "@operators/string/substr.operator";
import { $concat } from "@operators/string/concat.operator";
import { $slice } from "@operators/string/slice.operator";
import { $split } from "@operators/string/split.operator";
import { $size } from "@operators/string/size.operator";
import { $replace } from "@operators/string/replace.operator";
import { $regexReplace } from "@operators/string/regex-replace.operator";
import { $trim } from "@operators/string/trim.operator";
import { $ltrim } from "@operators/string/ltrim.operator";
import { $rtrim } from "@operators/string/rtrim.operator";
import { $indexOf } from "@operators/string/index-of.operator";
import { $replaceOne } from "@operators/string/replace-one.operator";
import { $replaceAll } from "@operators/string/replace-all.operator";

// Math operators
import { $multiply } from "@operators/math/multiply.operator";
import { $subtract } from "@operators/math/subtract.operator";
import { $divide } from "@operators/math/divide.operator";
import { $add } from "@operators/math/add.operator";
import { $abs } from "@operators/math/abs.operator";
import { $ceil } from "@operators/math/ceil.operator";
import { $floor } from "@operators/math/floor.operator";
import { $max } from "@operators/math/max.operator";
import { $min } from "@operators/math/min.operator";
import { $toFixed } from "@operators/math/to-fixed.operator";
import { $round } from "@operators/math/round.operator";
import { $mod } from "@operators/math/mod.operator";
import { $pow } from "@operators/math/pow.operator";
import { $sqrt } from "@operators/math/sqrt.operator";
import { $trunc } from "@operators/math/trunc.operator";

// Conditional operators
import { $ifNull } from "@operators/conditional/if-null.operator";
import { $switch } from "@operators/conditional/switch.operator";
import { $cond } from "@operators/conditional/cond.operator";
import { $coalesce } from "@operators/conditional/coalesce.operator";
import { $every } from "@operators/conditional/every.operator";
import { $some } from "@operators/conditional/some.operator";

// Comparison operators
import { $eq } from "@operators/comparison/eq.operator";
import { $gt } from "@operators/comparison/gt.operator";
import { $gte } from "@operators/comparison/gte.operator";
import { $lt } from "@operators/comparison/lt.operator";
import { $lte } from "@operators/comparison/lte.operator";
import { $regex } from "@operators/comparison/regex.operator";
import { $ne } from "@operators/comparison/ne.operator";
import { $in } from "@operators/comparison/in.operator";
import { $nin } from "@operators/comparison/nin.operator";

// Logical operators
import { $and } from "@operators/logical/and.operator";
import { $or } from "@operators/logical/or.operator";
import { $not } from "@operators/logical/not.operator";
import { $none } from "@operators/logical/none.operator";

// Type operators
import { $toNumber } from "@operators/type/to-number.operator";
import { $exists } from "@operators/type/exists.operator";
import { $isNull } from "@operators/type/is-null.operator";
import { $isNumber } from "@operators/type/is-number.operator";
import { $isNaN } from "@operators/type/is-nan.operator";
import { $type } from "@operators/type/type.operator";
import { $isArray } from "@operators/type/is-array.operator";
import { $isString } from "@operators/type/is-string.operator";
import { $isBoolean } from "@operators/type/is-boolean.operator";
import { $isDate } from "@operators/type/is-date.operator";

// Date operators
import { $dateDiff } from "@operators/date/date-diff.operator";
import { $toDate } from "@operators/date/to-date.operator";
import { $dayOfWeek } from "@operators/date/day-of-week.operator";
import { $dayOfMonth } from "@operators/date/day-of-month.operator";
import { $dayOfYear } from "@operators/date/day-of-year.operator";
import { $dateShift } from "@operators/date/date-shift.operator";

/**
 * Central registry of all available operators in the json-forgefy library.
 * This Map contains all the operator functions that can be used in transformation blueprints.
 * Each operator is registered with its key (e.g., "$add", "$multiply") and corresponding
 * implementation function.
 *
 * The operators are organized into categories:
 * - Mathematical: $add, $subtract, $multiply, $divide, $abs, $ceil, $floor, $max, $min, $mod, $pow, $sqrt, $trunc
 * - String: $toString, $toUpper, $toLower, $concat, $substr, $slice, $split, $size, $replace, $regexReplace, $trim, $ltrim, $rtrim, $indexOf, $replaceOne, $replaceAll
 * - Conditional: $cond, $switch, $ifNull
 * - Comparison: $eq, $gt, $gte, $lt, $lte, $ne, $regex
 * - Logical: $and, $or, $not, $none
 * - Array: $in, $nin
 * - Utility: $exists, $isNull
 * - Type Conversion: $toNumber, $toString
 * - Type Checking: $type, $isArray, $isString, $isBoolean, $isDate, $isNumber, $isNull, $isNaN
 * - Date: $dateDiff, $toDate, $dayOfWeek, $dayOfMonth, $dayOfYear, $dateShift
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
  .set("$abs", $abs)
  .set("$add", $add)
  .set("$and", $and)
  .set("$ceil", $ceil)
  .set("$coalesce", $coalesce)
  .set("$cond", $cond)
  .set("$concat", $concat)
  .set("$dateDiff", $dateDiff)
  .set("$divide", $divide)
  .set("$eq", $eq)
  .set("$every", $every)
  .set("$exists", $exists)
  .set("$floor", $floor)
  .set("$gt", $gt)
  .set("$gte", $gte)
  .set("$ifNull", $ifNull)
  .set("$in", $in)
  .set("$isNaN", $isNaN)
  .set("$isNull", $isNull)
  .set("$isNumber", $isNumber)
  .set("$lt", $lt)
  .set("$lte", $lte)
  .set("$max", $max)
  .set("$min", $min)
  .set("$multiply", $multiply)
  .set("$ne", $ne)
  .set("$nin", $nin)
  .set("$none", $none)
  .set("$not", $not)
  .set("$or", $or)
  .set("$regex", $regex)
  .set("$regexReplace", $regexReplace)
  .set("$replace", $replace)
  .set("$round", $round)
  .set("$size", $size)
  .set("$slice", $slice)
  .set("$some", $some)
  .set("$split", $split)
  .set("$substr", $substr)
  .set("$subtract", $subtract)
  .set("$switch", $switch)
  .set("$toFixed", $toFixed)
  .set("$toLower", $toLower)
  .set("$toNumber", $toNumber)
  .set("$toString", $toString)
  .set("$toUpper", $toUpper)
  .set("$trim", $trim)
  .set("$type", $type)
  .set("$isArray", $isArray)
  .set("$isString", $isString)
  .set("$isBoolean", $isBoolean)
  .set("$isDate", $isDate)
  .set("$mod", $mod)
  .set("$pow", $pow)
  .set("$sqrt", $sqrt)
  .set("$trunc", $trunc)
  .set("$ltrim", $ltrim)
  .set("$rtrim", $rtrim)
  .set("$indexOf", $indexOf)
  .set("$replaceOne", $replaceOne)
  .set("$replaceAll", $replaceAll)
  .set("$toDate", $toDate)
  .set("$dayOfWeek", $dayOfWeek)
  .set("$dayOfMonth", $dayOfMonth)
  .set("$dayOfYear", $dayOfYear)
  .set("$dateShift", $dateShift);
