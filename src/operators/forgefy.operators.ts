import { operatorRegistry } from "@/singletons/operators.singleton";

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
import { $isWeekend } from "@operators/date/is-weekend.operator";
import { $isHoliday } from "@operators/date/is-holiday.operator";
import { $addDays } from "@operators/date/add-days.operator";

// Array operators
import { $map } from "@operators/array/map.operator";
import { $filter } from "@operators/array/filter.operator";

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
 * - Date: $dateDiff, $toDate, $dayOfWeek, $dayOfMonth, $dayOfYear, $dateShift, $isWeekend, $isHoliday, $addDays
 * - Array Transformation: $map, $filter
 * - Utility: $toFixed
 *
 * @example
 * ```typescript
 * // The operators map is used internally by resolveExpression
 * const operator = operators.get("$add");
 * const result = operator({ context: sourceData })([1, 2, 3]); // Returns 6
 * ```
 */

// Populate the singleton operator registry
operatorRegistry
  .register("$abs", $abs)
  .register("$add", $add)
  .register("$and", $and)
  .register("$ceil", $ceil)
  .register("$coalesce", $coalesce)
  .register("$cond", $cond)
  .register("$concat", $concat)
  .register("$dateDiff", $dateDiff)
  .register("$divide", $divide)
  .register("$eq", $eq)
  .register("$every", $every)
  .register("$exists", $exists)
  .register("$floor", $floor)
  .register("$gt", $gt)
  .register("$gte", $gte)
  .register("$ifNull", $ifNull)
  .register("$in", $in)
  .register("$isNaN", $isNaN)
  .register("$isNull", $isNull)
  .register("$isNumber", $isNumber)
  .register("$lt", $lt)
  .register("$lte", $lte)
  .register("$max", $max)
  .register("$min", $min)
  .register("$multiply", $multiply)
  .register("$ne", $ne)
  .register("$nin", $nin)
  .register("$none", $none)
  .register("$not", $not)
  .register("$or", $or)
  .register("$regex", $regex)
  .register("$regexReplace", $regexReplace)
  .register("$replace", $replace)
  .register("$round", $round)
  .register("$size", $size)
  .register("$slice", $slice)
  .register("$some", $some)
  .register("$split", $split)
  .register("$substr", $substr)
  .register("$subtract", $subtract)
  .register("$switch", $switch)
  .register("$toFixed", $toFixed)
  .register("$toLower", $toLower)
  .register("$toNumber", $toNumber)
  .register("$toString", $toString)
  .register("$toUpper", $toUpper)
  .register("$trim", $trim)
  .register("$type", $type)
  .register("$isArray", $isArray)
  .register("$isString", $isString)
  .register("$isBoolean", $isBoolean)
  .register("$isDate", $isDate)
  .register("$mod", $mod)
  .register("$pow", $pow)
  .register("$sqrt", $sqrt)
  .register("$trunc", $trunc)
  .register("$ltrim", $ltrim)
  .register("$rtrim", $rtrim)
  .register("$indexOf", $indexOf)
  .register("$replaceOne", $replaceOne)
  .register("$replaceAll", $replaceAll)
  .register("$toDate", $toDate)
  .register("$dayOfWeek", $dayOfWeek)
  .register("$dayOfMonth", $dayOfMonth)
  .register("$dayOfYear", $dayOfYear)
  .register("$dateShift", $dateShift)
  .register("$isWeekend", $isWeekend)
  .register("$isHoliday", $isHoliday)
  .register("$addDays", $addDays)
  .register("$map", $map)
  .register("$filter", $filter);

// Export singleton for access from other modules
export { operatorRegistry };
