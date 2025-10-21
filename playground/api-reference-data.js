// Auto-generated from GUIDE.md - DO NOT EDIT MANUALLY
// Run: node build-api-reference.js to regenerate

const forgefyOperators = [
  {
    "op": "$add",
    "desc": "Adds multiple numbers together and returns their sum.",
    "category": "Math",
    "usage": "Adds multiple numbers together and returns their sum.",
    "params": "value: Array of numbers to add together",
    "returns": "number - The sum of all numbers",
    "example": "{ $add: [10, 20, 30] } → 60",
    "notes": ""
  },
  {
    "op": "$subtract",
    "desc": "Subtracts each subsequent number from the first number in sequence.",
    "category": "Math",
    "usage": "Subtracts each subsequent number from the first number in sequence.",
    "params": "values: Array of numbers",
    "returns": "number - The result of subtraction",
    "example": "{ $subtract: [100, 20, 5] } → 75",
    "notes": ""
  },
  {
    "op": "$multiply",
    "desc": "Multiplies all provided values together and returns the product.",
    "category": "Math",
    "usage": "Multiplies all provided values together and returns the product.",
    "params": "values: Array of numbers",
    "returns": "number - The product",
    "example": "{ $multiply: [10, 2, 3] } → 60",
    "notes": ""
  },
  {
    "op": "$divide",
    "desc": "Divides the first number by each subsequent number in sequence.",
    "category": "Math",
    "usage": "Divides the first number by each subsequent number in sequence.",
    "params": "values: Array of numbers",
    "returns": "number - The result of division",
    "example": "{ $divide: [100, 2, 5] } → 10",
    "notes": ""
  },
  {
    "op": "$abs",
    "desc": "Returns the absolute value of a number, converting negative numbers to positive.",
    "category": "Math",
    "usage": "Returns the absolute value of a number, converting negative numbers to positive.",
    "params": "value: Number",
    "returns": "number - Absolute value",
    "example": "{ $abs: -5 } → 5",
    "notes": ""
  },
  {
    "op": "$ceil",
    "desc": "Rounds a number up to the nearest integer.",
    "category": "Math",
    "usage": "Rounds a number up to the nearest integer.",
    "params": "value: Number",
    "returns": "number - Rounded up value",
    "example": "{ $ceil: 4.2 } → 5",
    "notes": ""
  },
  {
    "op": "$floor",
    "desc": "Rounds a number down to the nearest integer.",
    "category": "Math",
    "usage": "Rounds a number down to the nearest integer.",
    "params": "value: Number",
    "returns": "number - Rounded down value",
    "example": "{ $floor: 4.8 } → 4",
    "notes": ""
  },
  {
    "op": "$max",
    "desc": "Returns the largest number from an array of numbers.",
    "category": "Math",
    "usage": "Returns the largest number from an array of numbers.",
    "params": "values: Array of numbers",
    "returns": "number - Maximum value",
    "example": "{ $max: [10, 25, 5, 30] } → 30",
    "notes": ""
  },
  {
    "op": "$min",
    "desc": "Returns the smallest number from an array of numbers.",
    "category": "Math",
    "usage": "Returns the smallest number from an array of numbers.",
    "params": "values: Array of numbers",
    "returns": "number - Minimum value",
    "example": "{ $min: [10, 25, 5, 30] } → 5",
    "notes": ""
  },
  {
    "op": "$mod",
    "desc": "Calculates the remainder of dividing the dividend by the divisor (modulo operation).",
    "category": "Math",
    "usage": "Calculates the remainder of dividing the dividend by the divisor (modulo operation).",
    "params": "dividend: Number to be divided, divisor: Number to divide by, fallback: (Optional) Value to return on error",
    "returns": "number - Remainder",
    "example": "{ $mod: { dividend: 10, divisor: 3 } → 1",
    "notes": ""
  },
  {
    "op": "$pow",
    "desc": "Raises a base number to the power of an exponent (exponentiation).",
    "category": "Math",
    "usage": "Raises a base number to the power of an exponent (exponentiation).",
    "params": "base: Base number, exponent: Exponent value, fallback: (Optional) Value to return on error",
    "returns": "number - Result of exponentiation",
    "example": "{ $pow: { base: 5, exponent: 2 } → 25",
    "notes": ""
  },
  {
    "op": "$sqrt",
    "desc": "Calculates the square root of a number.",
    "category": "Math",
    "usage": "Calculates the square root of a number.",
    "params": "value: Number (must be non-negative), fallback: (Optional) Value to return for negative numbers",
    "returns": "number - Square root",
    "example": "{ $sqrt: { value: 16 } → 4",
    "notes": ""
  },
  {
    "op": "$round",
    "desc": "Rounds a number to a specified number of decimal places.",
    "category": "Math",
    "usage": "Rounds a number to a specified number of decimal places.",
    "params": "value: Number to round, precision: Number of decimal places (default: 0)",
    "returns": "number - Rounded value",
    "example": "{ $round: { value: 3.14159, precision: 2 } → 3.14",
    "notes": ""
  },
  {
    "op": "$toFixed",
    "desc": "Formats a number to a specified number of decimal places (truncates, doesn't round).",
    "category": "Math",
    "usage": "Formats a number to a specified number of decimal places (truncates, doesn't round).",
    "params": "value: Number to format, precision: Number of decimal places",
    "returns": "number - Formatted value",
    "example": "{ $toFixed: { value: 123.456789, precision: 2 } → 123.45",
    "notes": ""
  },
  {
    "op": "$trunc",
    "desc": "Truncates a number to an integer by removing the decimal part (doesn't round).",
    "category": "Math",
    "usage": "Truncates a number to an integer by removing the decimal part (doesn't round).",
    "params": "value: Number to truncate, fallback: (Optional) Value to return on error",
    "returns": "number - Integer part",
    "example": "{ $trunc: { value: 4.9 } → 4",
    "notes": ""
  },
  {
    "op": "$concat",
    "desc": "Concatenates multiple strings into a single string in order.",
    "category": "String",
    "usage": "Concatenates multiple strings into a single string in order.",
    "params": "value: Array of strings or expressions that resolve to strings",
    "returns": "string - Concatenated result",
    "example": "{ $concat: [\"Hello\", \" \", \"World\"] } → \"Hello World\"",
    "notes": "Non-string values are automatically converted to strings."
  },
  {
    "op": "$toUpper",
    "desc": "Converts a string to uppercase.",
    "category": "String",
    "usage": "Converts a string to uppercase.",
    "params": "value: String to convert",
    "returns": "string - Uppercase string",
    "example": "{ $toUpper: \"hello\" } → \"HELLO\"",
    "notes": ""
  },
  {
    "op": "$toLower",
    "desc": "Converts a string to lowercase.",
    "category": "String",
    "usage": "Converts a string to lowercase.",
    "params": "value: String to convert",
    "returns": "string - Lowercase string",
    "example": "{ $toLower: \"HELLO\" } → \"hello\"",
    "notes": ""
  },
  {
    "op": "$substr",
    "desc": "Extracts a substring from a string by position and length.",
    "category": "String",
    "usage": "Extracts a substring from a string by position and length.",
    "params": "value: String to extract from, start: Starting position (0-indexed), length: Number of characters to extract",
    "returns": "string - Substring",
    "example": "{ $substr: { value: \"Hello\", start: 1, length: 3 } → \"ell\"",
    "notes": ""
  },
  {
    "op": "$slice",
    "desc": "Extracts a section of a string using start and end indices.",
    "category": "String",
    "usage": "Extracts a section of a string using start and end indices.",
    "params": "input: String to slice, start: Start index, end: (Optional) End index",
    "returns": "string - Sliced string",
    "example": "{ $slice: { input: \"Hello\", start: 0, end: 2 } → \"He\"",
    "notes": ""
  },
  {
    "op": "$split",
    "desc": "Splits a string into an array of substrings using a delimiter.",
    "category": "String",
    "usage": "Splits a string into an array of substrings using a delimiter.",
    "params": "input: String to split, delimiter: Delimiter character(s)",
    "returns": "string[] - Array of substrings",
    "example": "{ $split: { input: \"a,b,c\", delimiter: \",\" } → [\"a\", \"b\", \"c\"]",
    "notes": ""
  },
  {
    "op": "$trim",
    "desc": "Removes whitespace or specified characters from both ends of a string.",
    "category": "String",
    "usage": "Removes whitespace or specified characters from both ends of a string.",
    "params": "input: String to trim, chars: (Optional) Array of characters to remove (default: [\" \", \"\\t\", \"\\n\", \"\\r\"])",
    "returns": "string - Trimmed string",
    "example": "{ $trim: { input: \"  hello  \" } → \"hello\"",
    "notes": "Essential for cleaning user input and normalizing string data."
  },
  {
    "op": "$ltrim",
    "desc": "Removes whitespace or specified characters from the start of a string.",
    "category": "String",
    "usage": "Removes whitespace or specified characters from the start of a string.",
    "params": "input: String to trim, chars: (Optional) Array of characters to remove (default: [\" \", \"\\t\", \"\\n\", \"\\r\"]), fallback: (Optional) Value to return on error",
    "returns": "string - Left-trimmed string",
    "example": "{ $ltrim: { input: \"  hello\" } → \"hello\"",
    "notes": ""
  },
  {
    "op": "$rtrim",
    "desc": "Removes whitespace or specified characters from the end of a string.",
    "category": "String",
    "usage": "Removes whitespace or specified characters from the end of a string.",
    "params": "input: String to trim, chars: (Optional) Array of characters to remove (default: [\" \", \"\\t\", \"\\n\", \"\\r\"]), fallback: (Optional) Value to return on error",
    "returns": "string - Right-trimmed string",
    "example": "{ $rtrim: { input: \"hello  \" } → \"hello\"",
    "notes": ""
  },
  {
    "op": "$replace",
    "desc": "Replaces multiple search values in a string with a single replacement value.",
    "category": "String",
    "usage": "Replaces multiple search values in a string with a single replacement value.",
    "params": "input: String to process, searchValues: Array of strings to search for, replacement: String to replace with",
    "returns": "string - String with replacements",
    "example": "{ $replace: { \r   input: \"$cpf\", \r   searchValues: [\".\", \"-\"], \r   replacement: \"\" \r }",
    "notes": ""
  },
  {
    "op": "$replaceOne",
    "desc": "Replaces the first occurrence of a search string with a replacement string.",
    "category": "String",
    "usage": "Replaces the first occurrence of a search string with a replacement string.",
    "params": "input: String to process, search: String to search for, replacement: String to replace with, fallback: (Optional) Value to return on error",
    "returns": "string - String with first replacement",
    "example": "{ $replaceOne: { \r   input: \"Hello Hello World\", \r   search: \"Hello\", \r   replacement: \"Hi\" \r }",
    "notes": ""
  },
  {
    "op": "$replaceAll",
    "desc": "Replaces all occurrences of a search string with a replacement string.",
    "category": "String",
    "usage": "Replaces all occurrences of a search string with a replacement string.",
    "params": "input: String to process, search: String to search for, replacement: String to replace with, fallback: (Optional) Value to return on error",
    "returns": "string - String with all replacements",
    "example": "{ $replaceAll: { \r   input: \"Hello Hello World\", \r   search: \"Hello\", \r   replacement: \"Hi\" \r }",
    "notes": ""
  },
  {
    "op": "$regexReplace",
    "desc": "Replaces substrings matching a regex pattern with a replacement value.",
    "category": "String",
    "usage": "Replaces substrings matching a regex pattern with a replacement value.",
    "params": "input: String to process, pattern: Regular expression pattern, replacement: String to replace with, flags: (Optional) Regex flags (default: \"g\")",
    "returns": "string - String with regex replacements",
    "example": "{ $regexReplace: { \r   input: \"hello      world\", \r   pattern: \"\\\\s+\", \r   replacement: \" \" \r }",
    "notes": "Supports full regex syntax for complex string transformations."
  },
  {
    "op": "$size",
    "desc": "Returns the length of a string or array.",
    "category": "String",
    "usage": "Returns the length of a string or array.",
    "params": "value: String or array",
    "returns": "number - Length",
    "example": "{ $size: \"Hello World\" } → 11",
    "notes": ""
  },
  {
    "op": "$indexOf",
    "desc": "Returns the index of the first occurrence of a substring within a string.",
    "category": "String",
    "usage": "Returns the index of the first occurrence of a substring within a string.",
    "params": "input: String to search in, substring: String to search for, start: (Optional) Position to start searching from, fallback: (Optional) Value to return on error",
    "returns": "number - Index (or -1 if not found)",
    "example": "{ $indexOf: { input: \"Hello World\", substring: \"World\" } → 6",
    "notes": ""
  },
  {
    "op": "$eq",
    "desc": "Performs equality comparison between two values using strict equality (===).",
    "category": "Comparison",
    "usage": "Performs equality comparison between two values using strict equality (===).",
    "params": "values: Array with exactly 2 values to compare",
    "returns": "boolean - true if equal, false otherwise",
    "example": "{ $eq: [5, 5] } → true",
    "notes": ""
  },
  {
    "op": "$ne",
    "desc": "Performs \"not equal\" comparison between two values.",
    "category": "Comparison",
    "usage": "Performs \"not equal\" comparison between two values.",
    "params": "values: Array with exactly 2 values to compare",
    "returns": "boolean - true if not equal, false if equal",
    "example": "{ $ne: [5, 3] } → true",
    "notes": ""
  },
  {
    "op": "$gt",
    "desc": "Checks if the first value is greater than the second.",
    "category": "Comparison",
    "usage": "Checks if the first value is greater than the second.",
    "params": "value: Array with exactly 2 values to compare",
    "returns": "boolean - true if first > second",
    "example": "{ $gt: [10, 5] } → true",
    "notes": ""
  },
  {
    "op": "$gte",
    "desc": "Checks if the first value is greater than or equal to the second.",
    "category": "Comparison",
    "usage": "Checks if the first value is greater than or equal to the second.",
    "params": "value: Array with exactly 2 values to compare",
    "returns": "boolean - true if first >= second",
    "example": "{ $gte: [5, 5] } → true",
    "notes": ""
  },
  {
    "op": "$lt",
    "desc": "Checks if the first value is less than the second.",
    "category": "Comparison",
    "usage": "Checks if the first value is less than the second.",
    "params": "value: Array with exactly 2 values to compare",
    "returns": "boolean - true if first < second",
    "example": "{ $lt: [3, 5] } → true",
    "notes": ""
  },
  {
    "op": "$lte",
    "desc": "Checks if the first value is less than or equal to the second.",
    "category": "Comparison",
    "usage": "Checks if the first value is less than or equal to the second.",
    "params": "value: Array with exactly 2 values to compare",
    "returns": "boolean - true if first <= second",
    "example": "{ $lte: [5, 5] } → true",
    "notes": ""
  },
  {
    "op": "$in",
    "desc": "Checks if a value exists within an array of values.",
    "category": "Comparison",
    "usage": "Checks if a value exists within an array of values.",
    "params": "value: Array with [valueToFind, arrayToSearchIn]",
    "returns": "boolean - true if value is in array",
    "example": "{ $in: [\"a\", [\"a\", \"b\", \"c\"]] } → true",
    "notes": ""
  },
  {
    "op": "$nin",
    "desc": "Checks if a value does NOT exist within an array of values.",
    "category": "Comparison",
    "usage": "Checks if a value does NOT exist within an array of values.",
    "params": "value: Array with [valueToFind, arrayToSearchIn]",
    "returns": "boolean - true if value is NOT in array",
    "example": "{ $nin: [\"d\", [\"a\", \"b\", \"c\"]] } → true",
    "notes": ""
  },
  {
    "op": "$regex",
    "desc": "Tests if a string matches a regular expression pattern.",
    "category": "Comparison",
    "usage": "Tests if a string matches a regular expression pattern.",
    "params": "value: String to test, pattern: Regular expression pattern",
    "returns": "boolean - true if matches",
    "example": "{ $regex: { \r   value: \"$user.email\", \r   pattern: \"^[\\\\w-\\\\.]+@([\\\\w-]+\\\\.)+[\\\\w-]{2,4}",
    "notes": ""
  },
  {
    "op": "$and",
    "desc": "Logical AND operation - returns true only if ALL expressions are truthy.",
    "category": "Logical",
    "usage": "Logical AND operation - returns true only if ALL expressions are truthy.",
    "params": "expressions: Array of expressions to evaluate",
    "returns": "boolean - true if all are true",
    "example": "{ $and: [true, true, false] } → false",
    "notes": "Uses short-circuit evaluation - stops at first false."
  },
  {
    "op": "$or",
    "desc": "Logical OR operation - returns true if ANY expression is truthy.",
    "category": "Logical",
    "usage": "Logical OR operation - returns true if ANY expression is truthy.",
    "params": "expressions: Array of expressions to evaluate",
    "returns": "boolean - true if any is true",
    "example": "{ $or: [false, true, false] } → true",
    "notes": "Uses short-circuit evaluation - stops at first true."
  },
  {
    "op": "$not",
    "desc": "Logical NOT operation - inverts a boolean value.",
    "category": "Logical",
    "usage": "Logical NOT operation - inverts a boolean value.",
    "params": "expression: Expression to negate",
    "returns": "boolean - Inverted value",
    "example": "{ $not: true } → false",
    "notes": ""
  },
  {
    "op": "$none",
    "desc": "Returns true only if ALL expressions are falsy (inverse of $or).",
    "category": "Logical",
    "usage": "Returns true only if ALL expressions are falsy (inverse of $or).",
    "params": "expressions: Array of expressions to evaluate",
    "returns": "boolean - true if all are false",
    "example": "{ $none: [false, false, false] } → true",
    "notes": ""
  },
  {
    "op": "$cond",
    "desc": "If-then-else conditional expression that evaluates a boolean condition.",
    "category": "Conditional",
    "usage": "If-then-else conditional expression that evaluates a boolean condition.",
    "params": "if: Condition to evaluate, then: Value to return if condition is true, else: Value to return if condition is false",
    "returns": "any - Either then or else value",
    "example": "{ $cond: { \r   if: { $gt: [\"$age\", 18] }",
    "notes": "Essential for conditional logic. The \"if\" field can contain any comparison or logical operator."
  },
  {
    "op": "$switch",
    "desc": "Multi-branch conditional logic (like switch statements).",
    "category": "Conditional",
    "usage": "Multi-branch conditional logic (like switch statements).",
    "params": "branches: Array of { case: condition, then: value } objects, default: Value to return if no cases match",
    "returns": "any - First matching branch value or default",
    "example": "{ $switch: { \r   branches: [\r     { case: { $gte: [\"$score\", 90] }",
    "notes": ""
  },
  {
    "op": "$ifNull",
    "desc": "Returns the first non-null value (null coalescing).",
    "category": "Conditional",
    "usage": "Returns the first non-null value (null coalescing).",
    "params": "values: Array with exactly 2 values",
    "returns": "any - First non-null value",
    "example": "{ $ifNull: [null, \"default\"] } → \"default\"",
    "notes": ""
  },
  {
    "op": "$coalesce",
    "desc": "Returns the first non-null and non-undefined value from a list (like SQL COALESCE).",
    "category": "Conditional",
    "usage": "Returns the first non-null and non-undefined value from a list (like SQL COALESCE).",
    "params": "values: Array of values to evaluate in order",
    "returns": "any - First non-null/undefined value",
    "example": "{ $coalesce: [null, undefined, \"value\", \"fallback\"] } → \"value\"",
    "notes": "Similar to JavaScript nullish coalescing (??). Useful for providing fallback values."
  },
  {
    "op": "$some",
    "desc": "If ANY condition passes, executes the then branch; otherwise executes else branch.",
    "category": "Conditional",
    "usage": "If ANY condition passes, executes the then branch; otherwise executes else branch.",
    "params": "conditions: Array of conditions to evaluate, then: Value to return if any condition is true, else: Value to return if all conditions are false",
    "returns": "any - Then or else value",
    "example": "{ $some: { \r   conditions: [\r     { $exists: \"$user.email\" }",
    "notes": ""
  },
  {
    "op": "$every",
    "desc": "If ALL conditions pass, executes the then branch; otherwise executes else branch.",
    "category": "Conditional",
    "usage": "If ALL conditions pass, executes the then branch; otherwise executes else branch.",
    "params": "conditions: Array of conditions to evaluate, then: Value to return if all conditions are true, else: Value to return if any condition is false",
    "returns": "any - Then or else value",
    "example": "{ $every: { \r   conditions: [\r     { $isNumber: \"$transaction.amount\" }",
    "notes": ""
  },
  {
    "op": "$filter",
    "desc": "Filters elements in an array based on a condition.",
    "category": "Array",
    "usage": "Filters elements in an array based on a condition.",
    "params": "input: Array to filter, condition: Expression to evaluate for each element (use $current for element, $index for position), fallback: (Optional) Value to return on error",
    "returns": "array - Filtered array",
    "example": "{ $filter: { \r   input: \"$users\", \r   condition: { $gte: [\"$current.age\", 18] }",
    "notes": "Use `$current` for element and `$index` for position in conditions."
  },
  {
    "op": "$map",
    "desc": "Transforms each element in an array using an expression.",
    "category": "Array",
    "usage": "Transforms each element in an array using an expression.",
    "params": "input: Array to transform, expression: Expression to apply to each element (use $current for element, $index for position), fallback: (Optional) Value to return on error",
    "returns": "array - Transformed array",
    "example": "{ $map: { \r   input: \"$numbers\", \r   expression: { $multiply: [\"$current\", 2] }",
    "notes": "Use `$current` for element and `$index` for position in expressions."
  },
  {
    "op": "$reduce",
    "desc": "Reduces an array to a single value by iteratively applying an expression.",
    "category": "Array",
    "usage": "Reduces an array to a single value by iteratively applying an expression.",
    "params": "input: Array to reduce, initialValue: Starting value for accumulator, expression: Expression to apply (use $accumulated, $current, $index), fallback: (Optional) Value to return on error",
    "returns": "any - Reduced value",
    "example": "{ $reduce: { \r   input: [1, 2, 3, 4, 5], \r   initialValue: 0, \r   expression: { $add: [\"$accumulated\", \"$current\"] } → 15",
    "notes": "Use `$accumulated`, `$current`, and `$index` in expressions."
  },
  {
    "op": "$sum",
    "desc": "Calculates the sum of an array of numbers.",
    "category": "Array",
    "usage": "Calculates the sum of an array of numbers.",
    "params": "values: Array of numbers, fallback: (Optional) Value to return on error",
    "returns": "number - Sum",
    "example": "{ $sum: { values: [10, 20, 30, 40] } → 100",
    "notes": ""
  },
  {
    "op": "$avg",
    "desc": "Calculates the average (mean) of an array of numbers.",
    "category": "Array",
    "usage": "Calculates the average (mean) of an array of numbers.",
    "params": "values: Array of numbers, fallback: (Optional) Value to return on error",
    "returns": "number - Average",
    "example": "{ $avg: { values: [10, 20, 30, 40] } → 25",
    "notes": ""
  },
  {
    "op": "$arrayAt",
    "desc": "Returns the element at a specific index in an array.",
    "category": "Array",
    "usage": "Returns the element at a specific index in an array.",
    "params": "input: Array, index: Index position (supports negative indices), fallback: (Optional) Value to return if out of bounds",
    "returns": "any - Element at index",
    "example": "{ $arrayAt: { input: [10, 20, 30, 40], index: 2 } → 30",
    "notes": "Supports negative indices counting from the end."
  },
  {
    "op": "$arrayFirst",
    "desc": "Returns the first element of an array.",
    "category": "Array",
    "usage": "Returns the first element of an array.",
    "params": "input: Array, fallback: (Optional) Value to return if empty",
    "returns": "any - First element",
    "example": "{ $arrayFirst: { input: [10, 20, 30] } → 10",
    "notes": ""
  },
  {
    "op": "$arrayLast",
    "desc": "Returns the last element of an array.",
    "category": "Array",
    "usage": "Returns the last element of an array.",
    "params": "input: Array, fallback: (Optional) Value to return if empty",
    "returns": "any - Last element",
    "example": "{ $arrayLast: { input: [10, 20, 30] } → 30",
    "notes": ""
  },
  {
    "op": "$type",
    "desc": "Returns the type of a value as a string. Detects all JavaScript types.",
    "category": "Type",
    "usage": "Returns the type of a value as a string. Detects all JavaScript types.",
    "params": "value: Any value",
    "returns": "string - Type name",
    "example": "{ $type: \"hello\" }",
    "notes": ""
  },
  {
    "op": "$toString",
    "desc": "Converts any value to its string representation.",
    "category": "Type",
    "usage": "Converts any value to its string representation.",
    "params": "value: Any value",
    "returns": "string - String representation",
    "example": "{ $toString: 123 } → \"123\"",
    "notes": ""
  },
  {
    "op": "$toNumber",
    "desc": "Converts a value to its numeric representation.",
    "category": "Type",
    "usage": "Converts a value to its numeric representation.",
    "params": "value: Any value",
    "returns": "number - Numeric value",
    "example": "{ $toNumber: \"123\" } → 123",
    "notes": ""
  },
  {
    "op": "$toDate",
    "desc": "Converts and validates dates from various formats.",
    "category": "Type",
    "usage": "Converts and validates dates from various formats.",
    "params": "value: ISO-8601 string, Unix timestamp (seconds or milliseconds), or Date object, fallback: (Optional) Value to return on error",
    "returns": "Date - Date object",
    "example": "{ $toDate: \"2024-01-15T10:30:00Z\" }",
    "notes": "Automatically detects timestamp format (seconds vs milliseconds)."
  },
  {
    "op": "$exists",
    "desc": "Checks if a field exists in the source object structure.",
    "category": "Type",
    "usage": "Checks if a field exists in the source object structure.",
    "params": "fieldPath: Field path string (without $ prefix)",
    "returns": "boolean - true if field exists",
    "example": "{ $exists: \"user.email\" }",
    "notes": "Returns true even if the value is null or undefined - checks structure, not value."
  },
  {
    "op": "$isNull",
    "desc": "Checks if a value is null or undefined.",
    "category": "Type",
    "usage": "Checks if a value is null or undefined.",
    "params": "value: Any value",
    "returns": "boolean - true if null or undefined",
    "example": "{ $isNull: null } → true",
    "notes": ""
  },
  {
    "op": "$isNumber",
    "desc": "Checks if a value is a valid number (excludes NaN).",
    "category": "Type",
    "usage": "Checks if a value is a valid number (excludes NaN).",
    "params": "value: Any value",
    "returns": "boolean - true if valid number",
    "example": "{ $isNumber: 123 } → true",
    "notes": ""
  },
  {
    "op": "$isNaN",
    "desc": "Checks if a value is NaN (Not a Number).",
    "category": "Type",
    "usage": "Checks if a value is NaN (Not a Number).",
    "params": "value: Any value",
    "returns": "boolean - true if NaN",
    "example": "{ $isNaN: NaN } → true",
    "notes": ""
  },
  {
    "op": "$isString",
    "desc": "Checks if a value is a string.",
    "category": "Type",
    "usage": "Checks if a value is a string.",
    "params": "value: Any value",
    "returns": "boolean - true if string",
    "example": "{ $isString: \"hello\" } → true",
    "notes": ""
  },
  {
    "op": "$isBoolean",
    "desc": "Checks if a value is a boolean.",
    "category": "Type",
    "usage": "Checks if a value is a boolean.",
    "params": "value: Any value",
    "returns": "boolean - true if boolean",
    "example": "{ $isBoolean: true }",
    "notes": ""
  },
  {
    "op": "$isArray",
    "desc": "Checks if a value is an array.",
    "category": "Type",
    "usage": "Checks if a value is an array.",
    "params": "value: Any value",
    "returns": "boolean - true if array",
    "example": "{ $isArray: [1, 2, 3] } → true",
    "notes": ""
  },
  {
    "op": "$isDate",
    "desc": "Checks if a value is a valid Date object or date string.",
    "category": "Type",
    "usage": "Checks if a value is a valid Date object or date string.",
    "params": "value: Any value",
    "returns": "boolean - true if valid date",
    "example": "{ $isDate: new Date() } → true",
    "notes": ""
  },
  {
    "op": "$dateDiff",
    "desc": "Calculates the difference between two dates in specified units.",
    "category": "Date",
    "usage": "Calculates the difference between two dates in specified units.",
    "params": "startDate: Starting date, endDate: Ending date, unit: Unit of measurement (\"days\", \"months\", or \"years\")",
    "returns": "number - Difference in specified units",
    "example": "{ $dateDiff: { \r   startDate: \"2025-01-01\", \r   endDate: \"2025-01-15\", \r   unit: \"days\" \r }",
    "notes": "Invalid date strings default to current date."
  },
  {
    "op": "$addDays",
    "desc": "Adds or subtracts days from a date.",
    "category": "Date",
    "usage": "Adds or subtracts days from a date.",
    "params": "date: Date (ISO string, timestamp, or Date object), days: Number of days to add (negative to subtract), fallback: (Optional) Value to return on error",
    "returns": "string - ISO-8601 formatted date string",
    "example": "{ $addDays: { date: \"2025-01-01T12:00:00Z\", days: 5 } → \"2025-01-06T12:00:00.000Z\"",
    "notes": ""
  },
  {
    "op": "$dateDiff",
    "desc": "Calculates the difference between two dates in specified units.",
    "category": "Date",
    "usage": "Calculates the difference between two dates in specified units.",
    "params": "startDate: Starting date, endDate: Ending date, unit: Unit of measurement (\"days\", \"months\", or \"years\")",
    "returns": "number - Difference in specified units",
    "example": "{ $dateDiff: { \r   startDate: \"2025-01-01\", \r   endDate: \"2025-01-15\", \r   unit: \"days\" \r }",
    "notes": "Invalid date strings default to current date."
  },
  {
    "op": "$dateShift",
    "desc": "Adjusts dates to business days by rolling forward, backward, or keeping unchanged.",
    "category": "Date",
    "usage": "Adjusts dates to business days by rolling forward, backward, or keeping unchanged.",
    "params": "date: Date to adjust, strategy: \"rollForward\", \"rollBackward\", or \"keep\" (default: \"rollForward\"), holidays: (Optional) Array of holiday date strings, weekends: (Optional) Array of weekend day numbers (default: [0, 6] for Sunday/Saturday), timezone: (Optional) Timezone (default: \"UTC\"), maxIterations: (Optional) Maximum iterations (default: 365), fallback: (Optional) Value to return on error",
    "returns": "string - Adjusted ISO-8601 date string",
    "example": "{ $dateShift: { \r   date: \"2025-03-01T10:00:00Z\", \r   strategy: \"rollForward\" \r }",
    "notes": "Supports custom holidays, weekends, and timezone-aware calculations."
  },
  {
    "op": "$dayOfMonth",
    "desc": "Extracts the day of the month from a date (1-31).",
    "category": "Date",
    "usage": "Extracts the day of the month from a date (1-31).",
    "params": "date: Date value, or object with date and optional timezone, timezone: (Optional) Timezone (default: \"UTC\"), fallback: (Optional) Value to return on error",
    "returns": "number - Day of month (1-31)",
    "example": "{ $dayOfMonth: \"2024-01-15T10:30:00Z\" } → 15",
    "notes": "Supports timezone-aware calculations."
  },
  {
    "op": "$dayOfWeek",
    "desc": "Extracts the day of the week from a date (0-6, where 0 is Sunday).",
    "category": "Date",
    "usage": "Extracts the day of the week from a date (0-6, where 0 is Sunday).",
    "params": "date: Date value, or object with date and optional timezone, timezone: (Optional) Timezone (default: \"UTC\"), fallback: (Optional) Value to return on error",
    "returns": "number - Day of week (0-6)",
    "example": "{ $dayOfWeek: \"2024-01-15T10:30:00Z\" } → 1 (Monday)",
    "notes": "0 = Sunday, 1 = Monday, ..., 6 = Saturday"
  },
  {
    "op": "$dayOfYear",
    "desc": "Extracts the day of the year from a date (1-366).",
    "category": "Date",
    "usage": "Extracts the day of the year from a date (1-366).",
    "params": "date: Date value, or object with date and optional timezone, timezone: (Optional) Timezone (default: \"UTC\"), fallback: (Optional) Value to return on error",
    "returns": "number - Day of year (1-366)",
    "example": "{ $dayOfYear: \"2024-01-15T10:30:00Z\" } → 15",
    "notes": "Supports leap years (366 days)."
  },
  {
    "op": "$isWeekend",
    "desc": "Checks if a date falls on a weekend.",
    "category": "Date",
    "usage": "Checks if a date falls on a weekend.",
    "params": "date: Date value, or object with date, optional weekends and timezone, weekends: (Optional) Array of weekend day numbers (default: [0, 6]), timezone: (Optional) Timezone (default: \"UTC\"), fallback: (Optional) Value to return on error",
    "returns": "boolean - true if weekend",
    "example": "{ $isWeekend: \"2025-01-04T12:00:00Z\" } → true",
    "notes": "Supports custom weekend days for different regions."
  },
  {
    "op": "$isHoliday",
    "desc": "Checks if a date is in a list of holidays.",
    "category": "Date",
    "usage": "Checks if a date is in a list of holidays.",
    "params": "date: Date to check, holidays: Array of holiday date strings, timezone: (Optional) Timezone (default: \"UTC\"), fallback: (Optional) Value to return on error",
    "returns": "boolean - true if holiday",
    "example": "{ $isHoliday: { \r   date: \"2025-01-01T12:00:00Z\", \r   holidays: [\"2025-01-01\", \"2025-12-25\"] \r }",
    "notes": "Timezone-aware date comparison."
  }
];

// Export for use in playground
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { forgefyOperators };
}
