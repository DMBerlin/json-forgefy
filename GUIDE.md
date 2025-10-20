# JSON Forgefy - Complete API Reference

> Comprehensive guide to all 77 operators with examples and usage patterns

## Table of Contents

- [Mathematical Operators](#mathematical-operators) (15)
- [String Operators](#string-operators) (15)
- [Comparison Operators](#comparison-operators) (9)
- [Logical Operators](#logical-operators) (4)
- [Conditional Operators](#conditional-operators) (6)
- [Array Operators](#array-operators) (8)
- [Type Operators](#type-operators) (12)
- [Date Operators](#date-operators) (8)

---

## Mathematical Operators

### $add

**Description**: Adds multiple numbers together and returns their sum.

**Category**: Math

**Parameters**: 
- `value`: Array of numbers to add together

**Returns**: `number` - The sum of all numbers

**Example**:
```typescript
// Basic usage
{ $add: [10, 20, 30] }
// Result: 60

// With paths
{ $add: ["$price", "$tax", "$shipping"] }

// Mixed literals and paths
{ $add: [100, "$discount", 25] }
```

---

### $subtract

**Description**: Subtracts each subsequent number from the first number in sequence.

**Category**: Math

**Parameters**:
- `values`: Array of numbers

**Returns**: `number` - The result of subtraction

**Example**:
```typescript
// Basic usage
{ $subtract: [100, 20, 5] }
// Result: 75

// With paths
{ $subtract: ["$total", "$discount"] }

// Multiple subtractions
{ $subtract: ["$balance", "$payment", "$fee"] }
```

---

### $multiply

**Description**: Multiplies all provided values together and returns the product.

**Category**: Math

**Parameters**:
- `values`: Array of numbers

**Returns**: `number` - The product

**Example**:
```typescript
// Basic usage
{ $multiply: [10, 2, 3] }
// Result: 60

// With paths
{ $multiply: ["$price", "$quantity"] }

// Calculate percentage
{ $multiply: ["$amount", 0.1] }
```

---

### $divide

**Description**: Divides the first number by each subsequent number in sequence.

**Category**: Math

**Parameters**:
- `values`: Array of numbers

**Returns**: `number` - The result of division

**Example**:
```typescript
// Basic usage
{ $divide: [100, 2, 5] }
// Result: 10

// Calculate average
{ $divide: ["$total", "$count"] }

// Nested expression
{ $divide: [{ $add: [10, 20] }, 2] }
// Result: 15
```

---

### $abs

**Description**: Returns the absolute value of a number, converting negative numbers to positive.

**Category**: Math

**Parameters**:
- `value`: Number

**Returns**: `number` - Absolute value

**Example**:
```typescript
// Basic usage
{ $abs: -5 }
// Result: 5

// Absolute difference
{ $abs: { $subtract: ["$value1", "$value2"] } }

// Ensure positive value
{ $abs: "$balance" }
```

---

### $ceil

**Description**: Rounds a number up to the nearest integer.

**Category**: Math

**Parameters**:
- `value`: Number

**Returns**: `number` - Rounded up value

**Example**:
```typescript
// Basic usage
{ $ceil: 4.2 }
// Result: 5

// Calculate pages needed
{ $ceil: { $divide: ["$totalItems", "$itemsPerPage"] } }

// Negative numbers
{ $ceil: -4.8 }
// Result: -4 (rounds towards positive infinity)
```

---

### $floor

**Description**: Rounds a number down to the nearest integer.

**Category**: Math

**Parameters**:
- `value`: Number

**Returns**: `number` - Rounded down value

**Example**:
```typescript
// Basic usage
{ $floor: 4.8 }
// Result: 4

// Calculate whole units
{ $floor: { $divide: ["$totalAmount", "$unitPrice"] } }

// Negative numbers
{ $floor: -4.2 }
// Result: -5 (rounds towards negative infinity)
```

---

### $max

**Description**: Returns the largest number from an array of numbers.

**Category**: Math

**Parameters**:
- `values`: Array of numbers

**Returns**: `number` - Maximum value

**Example**:
```typescript
// Basic usage
{ $max: [10, 25, 5, 30] }
// Result: 30

// Find highest price
{ $max: ["$price1", "$price2", "$price3"] }

// Use higher limit
{ $max: ["$userLimit", "$systemLimit"] }
```

---

### $min

**Description**: Returns the smallest number from an array of numbers.

**Category**: Math

**Parameters**:
- `values`: Array of numbers

**Returns**: `number` - Minimum value

**Example**:
```typescript
// Basic usage
{ $min: [10, 25, 5, 30] }
// Result: 5

// Find lowest price
{ $min: ["$price1", "$price2", "$price3"] }

// Cap value at maximum
{ $min: ["$calculatedValue", 100] }
```

---

### $mod

**Description**: Calculates the remainder of dividing the dividend by the divisor (modulo operation).

**Category**: Math

**Parameters**:
- `dividend`: Number to be divided
- `divisor`: Number to divide by
- `fallback`: (Optional) Value to return on error

**Returns**: `number` - Remainder

**Example**:
```typescript
// Basic usage
{ $mod: { dividend: 10, divisor: 3 } }
// Result: 1

// Check if even
{ $eq: [{ $mod: { dividend: "$number", divisor: 2 } }, 0] }

// With fallback
{ $mod: { dividend: 10, divisor: 0, fallback: 0 } }
// Result: 0 (fallback on division by zero)

// Cycle through indices
{ $mod: { dividend: "$index", divisor: 5 } }
// Result: 0-4 cycling
```

---

### $pow

**Description**: Raises a base number to the power of an exponent (exponentiation).

**Category**: Math

**Parameters**:
- `base`: Base number
- `exponent`: Exponent value
- `fallback`: (Optional) Value to return on error

**Returns**: `number` - Result of exponentiation

**Example**:
```typescript
// Basic usage
{ $pow: { base: 5, exponent: 2 } }
// Result: 25

// Cube a value
{ $pow: { base: "$value", exponent: 3 } }

// Square root alternative
{ $pow: { base: 16, exponent: 0.5 } }
// Result: 4

// With fallback for NaN
{ $pow: { base: -1, exponent: 0.5, fallback: 0 } }
```

---

### $sqrt

**Description**: Calculates the square root of a number.

**Category**: Math

**Parameters**:
- `value`: Number (must be non-negative)
- `fallback`: (Optional) Value to return for negative numbers

**Returns**: `number` - Square root

**Example**:
```typescript
// Basic usage
{ $sqrt: { value: 16 } }
// Result: 4

// Calculate distance (Pythagorean theorem)
{ $sqrt: { 
  value: { 
    $add: [
      { $pow: { base: "$x", exponent: 2 } }, 
      { $pow: { base: "$y", exponent: 2 } }
    ] 
  } 
} }

// With fallback
{ $sqrt: { value: -1, fallback: 0 } }
// Result: 0
```

---

### $round

**Description**: Rounds a number to a specified number of decimal places.

**Category**: Math

**Parameters**:
- `value`: Number to round
- `precision`: Number of decimal places (default: 0)

**Returns**: `number` - Rounded value

**Example**:
```typescript
// Round to 2 decimals
{ $round: { value: 3.14159, precision: 2 } }
// Result: 3.14

// Round to whole number
{ $round: { value: 3.7, precision: 0 } }
// Result: 4

// Round to thousands
{ $round: { value: 12345, precision: -3 } }
// Result: 12000
```

---

### $toFixed

**Description**: Formats a number to a specified number of decimal places (truncates, doesn't round).

**Category**: Math

**Parameters**:
- `value`: Number to format
- `precision`: Number of decimal places

**Returns**: `number` - Formatted value

**Example**:
```typescript
// Format to 2 decimals
{ $toFixed: { value: 123.456789, precision: 2 } }
// Result: 123.45

// Currency format
{ $toFixed: { value: "$amount", precision: 2 } }

// No decimals
{ $toFixed: { value: 3.14159, precision: 0 } }
// Result: 3
```

---

### $trunc

**Description**: Truncates a number to an integer by removing the decimal part (doesn't round).

**Category**: Math

**Parameters**:
- `value`: Number to truncate
- `fallback`: (Optional) Value to return on error

**Returns**: `number` - Integer part

**Example**:
```typescript
// Basic usage
{ $trunc: { value: 4.9 } }
// Result: 4

// Negative numbers
{ $trunc: { value: -4.9 } }
// Result: -4 (not -5 like floor)

// With fallback
{ $trunc: { value: "$maybeNumber", fallback: 0 } }
```

---

## String Operators

### $concat

**Description**: Concatenates multiple strings into a single string in order.

**Category**: String

**Parameters**:
- `value`: Array of strings or expressions that resolve to strings

**Returns**: `string` - Concatenated result

**Example**:
```typescript
// Basic usage
{ $concat: ["Hello", " ", "World"] }
// Result: "Hello World"

// Build full name
{ $concat: ["$firstName", " ", "$lastName"] }

// Build URL
{ $concat: ["https://", "$domain", "/", "$path"] }

// Greeting message
{ $concat: ["Hello ", "$user.name", "!"] }
```

**Notes**: Non-string values are automatically converted to strings.

---

### $toUpper

**Description**: Converts a string to uppercase.

**Category**: String

**Parameters**:
- `value`: String to convert

**Returns**: `string` - Uppercase string

**Example**:
```typescript
// Basic usage
{ $toUpper: "hello" }
// Result: "HELLO"

// From path
{ $toUpper: "$user.name" }

// Nested
{ $toUpper: { $concat: ["$firstName", " ", "$lastName"] } }
```

---

### $toLower

**Description**: Converts a string to lowercase.

**Category**: String

**Parameters**:
- `value`: String to convert

**Returns**: `string` - Lowercase string

**Example**:
```typescript
// Basic usage
{ $toLower: "HELLO" }
// Result: "hello"

// Normalize email
{ $toLower: "$userEmail" }

// Create slug
{ $toLower: "$title" }
```

---

### $substr

**Description**: Extracts a substring from a string by position and length.

**Category**: String

**Parameters**:
- `value`: String to extract from
- `start`: Starting position (0-indexed)
- `length`: Number of characters to extract

**Returns**: `string` - Substring

**Example**:
```typescript
// Basic usage
{ $substr: { value: "Hello", start: 1, length: 3 } }
// Result: "ell"

// First 3 characters
{ $substr: { value: "$productCode", start: 0, length: 3 } }

// Extract portion
{ $substr: { value: "Hello World", start: 6, length: 5 } }
// Result: "World"
```

---

### $slice

**Description**: Extracts a section of a string using start and end indices.

**Category**: String

**Parameters**:
- `input`: String to slice
- `start`: Start index
- `end`: (Optional) End index

**Returns**: `string` - Sliced string

**Example**:
```typescript
// Basic usage
{ $slice: { input: "Hello", start: 0, end: 2 } }
// Result: "He"

// Last part
{ $slice: { input: "Hello World", start: 6, end: 11 } }
// Result: "World"

// From index to end
{ $slice: { input: "$text", start: 3 } }
```

---

### $split

**Description**: Splits a string into an array of substrings using a delimiter.

**Category**: String

**Parameters**:
- `input`: String to split
- `delimiter`: Delimiter character(s)

**Returns**: `string[]` - Array of substrings

**Example**:
```typescript
// Basic usage
{ $split: { input: "a,b,c", delimiter: "," } }
// Result: ["a", "b", "c"]

// Split by space
{ $split: { input: "Hello World", delimiter: " " } }
// Result: ["Hello", "World"]

// Split file path
{ $split: { input: "$filePath", delimiter: "/" } }
```

---

### $trim

**Description**: Removes whitespace or specified characters from both ends of a string.

**Category**: String

**Parameters**:
- `input`: String to trim
- `chars`: (Optional) Array of characters to remove (default: [" ", "\t", "\n", "\r"])

**Returns**: `string` - Trimmed string

**Example**:
```typescript
// Basic usage (whitespace)
{ $trim: { input: "  hello  " } }
// Result: "hello"

// Custom characters
{ $trim: { input: "---hello---", chars: ["-"] } }
// Result: "hello"

// Remove multiple chars
{ $trim: { input: "$description", chars: ["\n", "\t", " "] } }
```

**Notes**: Essential for cleaning user input and normalizing string data.

---

### $ltrim

**Description**: Removes whitespace or specified characters from the start of a string.

**Category**: String

**Parameters**:
- `input`: String to trim
- `chars`: (Optional) Array of characters to remove (default: [" ", "\t", "\n", "\r"])
- `fallback`: (Optional) Value to return on error

**Returns**: `string` - Left-trimmed string

**Example**:
```typescript
// Basic usage
{ $ltrim: { input: "  hello" } }
// Result: "hello"

// Custom characters
{ $ltrim: { input: "---ABC123", chars: ["-"] } }
// Result: "ABC123"

// Remove newlines and tabs
{ $ltrim: { input: "\n\t  Hello", chars: ["\n", "\t", " "] } }
// Result: "Hello"
```

---

### $rtrim

**Description**: Removes whitespace or specified characters from the end of a string.

**Category**: String

**Parameters**:
- `input`: String to trim
- `chars`: (Optional) Array of characters to remove (default: [" ", "\t", "\n", "\r"])
- `fallback`: (Optional) Value to return on error

**Returns**: `string` - Right-trimmed string

**Example**:
```typescript
// Basic usage
{ $rtrim: { input: "hello  " } }
// Result: "hello"

// Custom characters
{ $rtrim: { input: "ABC123---", chars: ["-"] } }
// Result: "ABC123"

// Remove whitespace
{ $rtrim: { input: "Hello  \n\t", chars: ["\n", "\t", " "] } }
// Result: "Hello"
```

---

### $replace

**Description**: Replaces multiple search values in a string with a single replacement value.

**Category**: String

**Parameters**:
- `input`: String to process
- `searchValues`: Array of strings to search for
- `replacement`: String to replace with

**Returns**: `string` - String with replacements

**Example**:
```typescript
// Clean CPF
{ $replace: { 
  input: "$cpf", 
  searchValues: [".", "-"], 
  replacement: "" 
} }
// "123.456.789-10" → "12345678910"

// Clean phone number
{ $replace: { 
  input: "$phone", 
  searchValues: ["(", ")", " ", "-"], 
  replacement: "" 
} }
// "(555) 123-4567" → "5551234567"

// Normalize text
{ $replace: { 
  input: "$text", 
  searchValues: ["\n", "\t", "  "], 
  replacement: " " 
} }
```

---

### $replaceOne

**Description**: Replaces the first occurrence of a search string with a replacement string.

**Category**: String

**Parameters**:
- `input`: String to process
- `search`: String to search for
- `replacement`: String to replace with
- `fallback`: (Optional) Value to return on error

**Returns**: `string` - String with first replacement

**Example**:
```typescript
// Replace first occurrence
{ $replaceOne: { 
  input: "Hello Hello World", 
  search: "Hello", 
  replacement: "Hi" 
} }
// Result: "Hi Hello World"

// Clean path
{ $replaceOne: { 
  input: "/api/v1/users", 
  search: "/api", 
  replacement: "" 
} }
// Result: "/v1/users"

// Update protocol
{ $replaceOne: { 
  input: "$url", 
  search: "http://", 
  replacement: "https://" 
} }
```

---

### $replaceAll

**Description**: Replaces all occurrences of a search string with a replacement string.

**Category**: String

**Parameters**:
- `input`: String to process
- `search`: String to search for
- `replacement`: String to replace with
- `fallback`: (Optional) Value to return on error

**Returns**: `string` - String with all replacements

**Example**:
```typescript
// Replace all occurrences
{ $replaceAll: { 
  input: "Hello Hello World", 
  search: "Hello", 
  replacement: "Hi" 
} }
// Result: "Hi Hi World"

// Remove dashes
{ $replaceAll: { 
  input: "123-456-789", 
  search: "-", 
  replacement: "" 
} }
// Result: "123456789"

// Normalize spaces
{ $replaceAll: { 
  input: "$text", 
  search: "  ", 
  replacement: " " 
} }
```

---

### $regexReplace

**Description**: Replaces substrings matching a regex pattern with a replacement value.

**Category**: String

**Parameters**:
- `input`: String to process
- `pattern`: Regular expression pattern
- `replacement`: String to replace with
- `flags`: (Optional) Regex flags (default: "g")

**Returns**: `string` - String with regex replacements

**Example**:
```typescript
// Normalize whitespace
{ $regexReplace: { 
  input: "hello      world", 
  pattern: "\\s+", 
  replacement: " " 
} }
// Result: "hello world"

// Remove all digits
{ $regexReplace: { 
  input: "abc123def456", 
  pattern: "\\d+", 
  replacement: "" 
} }
// Result: "abcdef"

// Case-insensitive replacement
{ $regexReplace: { 
  input: "TeSt TesT", 
  pattern: "test", 
  replacement: "demo", 
  flags: "gi" 
} }
// Result: "demo demo"
```

**Notes**: Supports full regex syntax for complex string transformations.

---

### $size

**Description**: Returns the length of a string or array.

**Category**: String

**Parameters**:
- `value`: String or array

**Returns**: `number` - Length

**Example**:
```typescript
// String length
{ $size: "Hello World" }
// Result: 11

// Array length
{ $size: "$items" }

// After splitting
{ $size: { $split: { input: "$tags", delimiter: "," } } }
```

---

### $indexOf

**Description**: Returns the index of the first occurrence of a substring within a string.

**Category**: String

**Parameters**:
- `input`: String to search in
- `substring`: String to search for
- `start`: (Optional) Position to start searching from
- `fallback`: (Optional) Value to return on error

**Returns**: `number` - Index (or -1 if not found)

**Example**:
```typescript
// Basic usage
{ $indexOf: { input: "Hello World", substring: "World" } }
// Result: 6

// Not found
{ $indexOf: { input: "Hello", substring: "xyz" } }
// Result: -1

// Start from position
{ $indexOf: { 
  input: "Hello Hello", 
  substring: "Hello", 
  start: 1 
} }
// Result: 6 (finds second occurrence)

// Find @ in email
{ $indexOf: { input: "$email", substring: "@" } }
```

---

## Comparison Operators

### $eq

**Description**: Performs equality comparison between two values using strict equality (===).

**Category**: Comparison

**Parameters**:
- `values`: Array with exactly 2 values to compare

**Returns**: `boolean` - true if equal, false otherwise

**Example**:
```typescript
// Basic usage
{ $eq: [5, 5] }
// Result: true

// Compare with path
{ $eq: ["$status", "active"] }

// Compare two paths
{ $eq: ["$price", "$originalPrice"] }

// With expression
{ $eq: [{ $subtract: ["$total", "$paid"] }, 0] }
```

---

### $ne

**Description**: Performs "not equal" comparison between two values.

**Category**: Comparison

**Parameters**:
- `values`: Array with exactly 2 values to compare

**Returns**: `boolean` - true if not equal, false if equal

**Example**:
```typescript
// Basic usage
{ $ne: [5, 3] }
// Result: true

// Check not deleted
{ $ne: ["$status", "deleted"] }

// Different users
{ $ne: ["$userId", "$currentUserId"] }

// Has changed
{ $ne: ["$originalValue", "$currentValue"] }
```

---

### $gt

**Description**: Checks if the first value is greater than the second.

**Category**: Comparison

**Parameters**:
- `value`: Array with exactly 2 values to compare

**Returns**: `boolean` - true if first > second

**Example**:
```typescript
// Basic usage
{ $gt: [10, 5] }
// Result: true

// Check if expensive
{ $gt: ["$price", 100] }

// Compare two values
{ $gt: ["$user.age", "$minAge"] }

// With expression
{ $gt: [{ $add: ["$base", "$extra"] }, "$limit"] }
```

---

### $gte

**Description**: Checks if the first value is greater than or equal to the second.

**Category**: Comparison

**Parameters**:
- `value`: Array with exactly 2 values to compare

**Returns**: `boolean` - true if first >= second

**Example**:
```typescript
// Basic usage
{ $gte: [5, 5] }
// Result: true

// Check can purchase
{ $gte: ["$balance", "$price"] }

// Check is adult
{ $gte: ["$user.age", 18] }

// Minimum items
{ $gte: [{ $size: "$items" }, 1] }
```

---

### $lt

**Description**: Checks if the first value is less than the second.

**Category**: Comparison

**Parameters**:
- `value`: Array with exactly 2 values to compare

**Returns**: `boolean` - true if first < second

**Example**:
```typescript
// Basic usage
{ $lt: [3, 5] }
// Result: true

// Check affordable
{ $lt: ["$price", "$budget"] }

// Check young
{ $lt: ["$user.age", 25] }

// Under limit
{ $lt: [{ $size: "$items" }, "$maxItems"] }
```

---

### $lte

**Description**: Checks if the first value is less than or equal to the second.

**Category**: Comparison

**Parameters**:
- `value`: Array with exactly 2 values to compare

**Returns**: `boolean` - true if first <= second

**Example**:
```typescript
// Basic usage
{ $lte: [5, 5] }
// Result: true

// Within budget
{ $lte: ["$totalCost", "$budget"] }

// Check eligible
{ $lte: ["$user.age", 65] }

// Has capacity
{ $lte: [{ $size: "$attendees" }, "$maxCapacity"] }
```

---

### $in

**Description**: Checks if a value exists within an array of values.

**Category**: Comparison

**Parameters**:
- `value`: Array with [valueToFind, arrayToSearchIn]

**Returns**: `boolean` - true if value is in array

**Example**:
```typescript
// Basic usage
{ $in: ["a", ["a", "b", "c"]] }
// Result: true

// Valid status
{ $in: ["$status", ["active", "pending", "approved"]] }

// Allowed role
{ $in: ["$user.role", ["admin", "moderator", "editor"]] }

// Check permission
{ $in: [{ $toString: "$userId" }, "$authorizedUsers"] }
```

---

### $nin

**Description**: Checks if a value does NOT exist within an array of values.

**Category**: Comparison

**Parameters**:
- `value`: Array with [valueToFind, arrayToSearchIn]

**Returns**: `boolean` - true if value is NOT in array

**Example**:
```typescript
// Basic usage
{ $nin: ["d", ["a", "b", "c"]] }
// Result: true

// Not deleted
{ $nin: ["$status", ["deleted", "archived", "suspended"]] }

// Not restricted
{ $nin: ["$user.role", ["banned", "restricted"]] }

// Not in blacklist
{ $nin: ["$product.category", "$blacklistedCategories"] }
```

---

### $regex

**Description**: Tests if a string matches a regular expression pattern.

**Category**: Comparison

**Parameters**:
- `value`: String to test
- `pattern`: Regular expression pattern

**Returns**: `boolean` - true if matches

**Example**:
```typescript
// Email validation
{ $regex: { 
  value: "$user.email", 
  pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$" 
} }

// Phone number
{ $regex: { 
  value: "$contact.phone", 
  pattern: "^\\+?[1-9]\\d{1,14}$" 
} }

// Has numbers
{ $regex: { 
  value: "$inputText", 
  pattern: "\\d+" 
} }

// Valid product code
{ $regex: { 
  value: "$productCode", 
  pattern: "^[A-Z]{2}\\d{4}$" 
} }
```

---

## Logical Operators

### $and

**Description**: Logical AND operation - returns true only if ALL expressions are truthy.

**Category**: Logical

**Parameters**:
- `expressions`: Array of expressions to evaluate

**Returns**: `boolean` - true if all are true

**Example**:
```typescript
// Basic usage
{ $and: [true, true, false] }
// Result: false

// Multiple conditions
{ $and: [
  { $gte: ["$age", 18] },
  { $eq: ["$status", "active"] },
  { $gt: ["$balance", 0] }
] }

// Can purchase
{ $and: [
  { $gte: ["$balance", "$price"] },
  { $eq: ["$accountStatus", "verified"] }
] }
```

**Notes**: Uses short-circuit evaluation - stops at first false.

---

### $or

**Description**: Logical OR operation - returns true if ANY expression is truthy.

**Category**: Logical

**Parameters**:
- `expressions`: Array of expressions to evaluate

**Returns**: `boolean` - true if any is true

**Example**:
```typescript
// Basic usage
{ $or: [false, true, false] }
// Result: true

// Has access
{ $or: [
  { $eq: ["$role", "admin"] },
  { $eq: ["$role", "moderator"] },
  { $eq: ["$isOwner", true] }
] }

// Can edit
{ $or: [
  { $eq: ["$userId", "$ownerId"] },
  { $eq: ["$permissions.edit", true] }
] }
```

**Notes**: Uses short-circuit evaluation - stops at first true.

---

### $not

**Description**: Logical NOT operation - inverts a boolean value.

**Category**: Logical

**Parameters**:
- `expression`: Expression to negate

**Returns**: `boolean` - Inverted value

**Example**:
```typescript
// Basic usage
{ $not: true }
// Result: false

// Not active
{ $not: { $eq: ["$status", "active"] } }

// Not admin
{ $not: { $eq: ["$role", "admin"] } }

// Has no balance
{ $not: { $gt: ["$balance", 0] } }
```

---

### $none

**Description**: Returns true only if ALL expressions are falsy (inverse of $or).

**Category**: Logical

**Parameters**:
- `expressions`: Array of expressions to evaluate

**Returns**: `boolean` - true if all are false

**Example**:
```typescript
// Basic usage
{ $none: [false, false, false] }
// Result: true

// No errors
{ $none: [
  { $exists: "errors.critical" },
  { $exists: "errors.warning" },
  { $gt: ["$errorCount", 0] }
] }

// Is inactive
{ $none: [
  { $eq: ["$status", "active"] },
  { $eq: ["$status", "pending"] },
  { $gt: ["$lastActivity", "$threshold"] }
] }
```

---

## Conditional Operators

### $cond

**Description**: If-then-else conditional expression that evaluates a boolean condition.

**Category**: Conditional

**Parameters**:
- `if`: Condition to evaluate
- `then`: Value to return if condition is true
- `else`: Value to return if condition is false

**Returns**: `any` - Either then or else value

**Example**:
```typescript
// Basic usage
{ $cond: { 
  if: { $gt: ["$age", 18] }, 
  then: "Adult", 
  else: "Minor" 
} }

// Status check
{ $cond: { 
  if: { $eq: ["$amount", 0] }, 
  then: "Free", 
  else: "Paid" 
} }

// Nested calculation
{ $cond: { 
  if: { $gt: ["$orderTotal", 100] }, 
  then: { $multiply: ["$orderTotal", 0.1] }, // 10% discount
  else: 0 
} }
```

**Notes**: Essential for conditional logic. The "if" field can contain any comparison or logical operator.

---

### $switch

**Description**: Multi-branch conditional logic (like switch statements).

**Category**: Conditional

**Parameters**:
- `branches`: Array of `{ case: condition, then: value }` objects
- `default`: Value to return if no cases match

**Returns**: `any` - First matching branch value or default

**Example**:
```typescript
// Grade calculation
{ $switch: { 
  branches: [
    { case: { $gte: ["$score", 90] }, then: "A" },
    { case: { $gte: ["$score", 80] }, then: "B" },
    { case: { $gte: ["$score", 70] }, then: "C" },
    { case: { $gte: ["$score", 60] }, then: "D" }
  ],
  default: "F" 
} }

// Shipping cost by country
{ $switch: { 
  branches: [
    { case: { $eq: ["$country", "US"] }, then: 5.99 },
    { case: { $eq: ["$country", "CA"] }, then: 7.99 },
    { case: { $eq: ["$country", "UK"] }, then: 9.99 }
  ],
  default: 15.99 
} }
```

---

### $ifNull

**Description**: Returns the first non-null value (null coalescing).

**Category**: Conditional

**Parameters**:
- `values`: Array with exactly 2 values

**Returns**: `any` - First non-null value

**Example**:
```typescript
// Basic usage
{ $ifNull: [null, "default"] }
// Result: "default"

// Use nickname or name
{ $ifNull: ["$user.nickname", "$user.name"] }

// Use sale price or regular
{ $ifNull: ["$salePrice", "$regularPrice"] }

// With expression
{ $ifNull: [{ $size: "$items" }, 0] }
```

---

### $coalesce

**Description**: Returns the first non-null and non-undefined value from a list (like SQL COALESCE).

**Category**: Conditional

**Parameters**:
- `values`: Array of values to evaluate in order

**Returns**: `any` - First non-null/undefined value

**Example**:
```typescript
// Basic usage
{ $coalesce: [null, undefined, "value", "fallback"] }
// Result: "value"

// Multiple fallbacks
{ $coalesce: ["$user.displayName", "$user.firstName", "Anonymous"] }

// With default
{ $coalesce: ["$transaction.amount", 0] }

// Check multiple fields
{ $coalesce: ["$primary", "$secondary", "$tertiary", "default"] }
```

**Notes**: Similar to JavaScript nullish coalescing (??). Useful for providing fallback values.

---

### $some

**Description**: If ANY condition passes, executes the then branch; otherwise executes else branch.

**Category**: Conditional

**Parameters**:
- `conditions`: Array of conditions to evaluate
- `then`: Value to return if any condition is true
- `else`: Value to return if all conditions are false

**Returns**: `any` - Then or else value

**Example**:
```typescript
// Check has contact info
{ $some: { 
  conditions: [
    { $exists: "$user.email" },
    { $exists: "$user.phone" },
    { $exists: "$user.address" }
  ],
  then: true,
  else: false 
} }

// Display name with fallbacks
{ $some: { 
  conditions: [
    { $exists: "$user.displayName" },
    { $exists: "$user.firstName" },
    { $exists: "$user.username" }
  ],
  then: { $coalesce: ["$user.displayName", "$user.firstName", "$user.username"] },
  else: "Anonymous" 
} }
```

---

### $every

**Description**: If ALL conditions pass, executes the then branch; otherwise executes else branch.

**Category**: Conditional

**Parameters**:
- `conditions`: Array of conditions to evaluate
- `then`: Value to return if all conditions are true
- `else`: Value to return if any condition is false

**Returns**: `any` - Then or else value

**Example**:
```typescript
// Validate amount
{ $every: { 
  conditions: [
    { $isNumber: "$transaction.amount" },
    { $gt: ["$transaction.amount", 0] },
    { $lt: ["$transaction.amount", 10000] }
  ],
  then: { $toNumber: "$transaction.amount" },
  else: 0 
} }

// Complete user profile
{ $every: { 
  conditions: [
    { $exists: "$user.email" },
    { $exists: "$user.name" },
    { $regex: { value: "$user.email", pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$" } }
  ],
  then: "$user",
  else: null 
} }
```

---

## Array Operators

### $filter

**Description**: Filters elements in an array based on a condition.

**Category**: Array

**Parameters**:
- `input`: Array to filter
- `condition`: Expression to evaluate for each element (use $current for element, $index for position)
- `fallback`: (Optional) Value to return on error

**Returns**: `array` - Filtered array

**Example**:
```typescript
// Simple condition
{ $filter: { 
  input: "$users", 
  condition: { $gte: ["$current.age", 18] } 
} }

// With AND condition
{ $filter: { 
  input: "$candidates", 
  condition: {
    $and: [
      { $gte: ["$current.age", 18] },
      { $eq: ["$current.status", "active"] }
    ]
  } 
} }

// Using index
{ $filter: { 
  input: "$items", 
  condition: { $eq: [{ $mod: { dividend: "$index", divisor: 2 } }, 1] } 
} }
// Returns items at odd indices

// With fallback
{ $filter: { 
  input: "$maybeArray", 
  condition: "$current.active", 
  fallback: [] 
} }
```

**Notes**: Use `$current` for element and `$index` for position in conditions.

---

### $map

**Description**: Transforms each element in an array using an expression.

**Category**: Array

**Parameters**:
- `input`: Array to transform
- `expression`: Expression to apply to each element (use $current for element, $index for position)
- `fallback`: (Optional) Value to return on error

**Returns**: `array` - Transformed array

**Example**:
```typescript
// Simple transformation
{ $map: { 
  input: "$numbers", 
  expression: { $multiply: ["$current", 2] } 
} }

// With conditional
{ $map: { 
  input: "$items", 
  expression: {
    $cond: {
      if: { $gt: ["$current.amount", 100] },
      then: { $multiply: ["$current.amount", 0.9] }, // 10% discount
      else: "$current.amount"
    }
  } 
} }

// Build object
{ $map: { 
  input: "$items", 
  expression: {
    item: "$current",
    position: { $add: ["$index", 1] } // 1-based index
  } 
} }

// With fallback
{ $map: { 
  input: "$maybeArray", 
  expression: "$current", 
  fallback: [] 
} }
```

**Notes**: Use `$current` for element and `$index` for position in expressions.

---

### $reduce

**Description**: Reduces an array to a single value by iteratively applying an expression.

**Category**: Array

**Parameters**:
- `input`: Array to reduce
- `initialValue`: Starting value for accumulator
- `expression`: Expression to apply (use $accumulated, $current, $index)
- `fallback`: (Optional) Value to return on error

**Returns**: `any` - Reduced value

**Example**:
```typescript
// Sum array
{ $reduce: { 
  input: [1, 2, 3, 4, 5], 
  initialValue: 0, 
  expression: { $add: ["$accumulated", "$current"] } 
} }
// Result: 15

// Product
{ $reduce: { 
  input: [2, 3, 4], 
  initialValue: 1, 
  expression: { $multiply: ["$accumulated", "$current"] } 
} }
// Result: 24

// Conditional aggregation
{ $reduce: { 
  input: [5, -3, 8, -2, 10], 
  initialValue: 0, 
  expression: {
    $cond: {
      if: { $gt: ["$current", 0] },
      then: { $add: ["$accumulated", "$current"] },
      else: "$accumulated"
    }
  } 
} }
// Result: 23 (sum of positive numbers only)

// Weighted sum with index
{ $reduce: { 
  input: [10, 20, 30], 
  initialValue: 0, 
  expression: {
    $add: [
      "$accumulated",
      { $multiply: ["$current", { $add: ["$index", 1] }] }
    ]
  } 
} }
// Result: 140 (10*1 + 20*2 + 30*3)
```

**Notes**: Use `$accumulated`, `$current`, and `$index` in expressions.

---

### $sum

**Description**: Calculates the sum of an array of numbers.

**Category**: Array

**Parameters**:
- `values`: Array of numbers
- `fallback`: (Optional) Value to return on error

**Returns**: `number` - Sum

**Example**:
```typescript
// Basic usage
{ $sum: { values: [10, 20, 30, 40] } }
// Result: 100

// From path
{ $sum: { values: "$amounts" } }

// With fallback
{ $sum: { values: "$maybeArray", fallback: 0 } }

// Filters non-numeric values
{ $sum: { values: [10, "text", 20, null, 30] } }
// Result: 60 (sums only 10, 20, 30)
```

---

### $avg

**Description**: Calculates the average (mean) of an array of numbers.

**Category**: Array

**Parameters**:
- `values`: Array of numbers
- `fallback`: (Optional) Value to return on error

**Returns**: `number` - Average

**Example**:
```typescript
// Basic usage
{ $avg: { values: [10, 20, 30, 40] } }
// Result: 25

// From path
{ $avg: { values: "$scores" } }

// With fallback
{ $avg: { values: "$maybeArray", fallback: 0 } }
```

---

### $arrayAt

**Description**: Returns the element at a specific index in an array.

**Category**: Array

**Parameters**:
- `input`: Array
- `index`: Index position (supports negative indices)
- `fallback`: (Optional) Value to return if out of bounds

**Returns**: `any` - Element at index

**Example**:
```typescript
// Get third element
{ $arrayAt: { input: [10, 20, 30, 40], index: 2 } }
// Result: 30

// Last element with negative index
{ $arrayAt: { input: [10, 20, 30], index: -1 } }
// Result: 30

// With fallback for out of bounds
{ $arrayAt: { input: [10, 20], index: 5, fallback: null } }
// Result: null

// From path
{ $arrayAt: { 
  input: "$items", 
  index: { $add: ["$selectedIndex", 1] } 
} }
```

**Notes**: Supports negative indices counting from the end.

---

### $arrayFirst

**Description**: Returns the first element of an array.

**Category**: Array

**Parameters**:
- `input`: Array
- `fallback`: (Optional) Value to return if empty

**Returns**: `any` - First element

**Example**:
```typescript
// Basic usage
{ $arrayFirst: { input: [10, 20, 30] } }
// Result: 10

// With fallback for empty array
{ $arrayFirst: { input: [], fallback: null } }
// Result: null

// From path
{ $arrayFirst: { input: "$items" } }
```

---

### $arrayLast

**Description**: Returns the last element of an array.

**Category**: Array

**Parameters**:
- `input`: Array
- `fallback`: (Optional) Value to return if empty

**Returns**: `any` - Last element

**Example**:
```typescript
// Basic usage
{ $arrayLast: { input: [10, 20, 30] } }
// Result: 30

// With fallback for empty array
{ $arrayLast: { input: [], fallback: null } }
// Result: null

// From path
{ $arrayLast: { input: "$items" } }
```

---

## Type Operators

### $type

**Description**: Returns the type of a value as a string. Detects all JavaScript types.

**Category**: Type

**Parameters**:
- `value`: Any value

**Returns**: `string` - Type name

**Possible Values**:
- **JSON-compatible**: "string", "number", "boolean", "null", "object", "array"
- **Runtime-only**: "undefined", "bigint", "symbol", "function", "date"

**Example**:
```typescript
// Primitives
{ $type: "hello" }        // "string"
{ $type: 42 }             // "number"
{ $type: true }           // "boolean"
{ $type: null }           // "null"

// Reference types
{ $type: [1, 2, 3] }      // "array"
{ $type: { key: "value" } } // "object"
{ $type: new Date() }     // "date"

// Runtime types
{ $type: { $toDate: "2024-01-15" } } // "date"
{ $type: "$nonExistent" }  // "undefined"

// From path
{ $type: "$user.name" }
```

---

### $toString

**Description**: Converts any value to its string representation.

**Category**: Type

**Parameters**:
- `value`: Any value

**Returns**: `string` - String representation

**Example**:
```typescript
// Basic usage
{ $toString: 123 }
// Result: "123"

// Convert boolean
{ $toString: true }
// Result: "true"

// Convert expression result
{ $toString: { $add: [10, 20] } }
// Result: "30"

// From path
{ $toString: "$userId" }
```

---

### $toNumber

**Description**: Converts a value to its numeric representation.

**Category**: Type

**Parameters**:
- `value`: Any value

**Returns**: `number` - Numeric value

**Example**:
```typescript
// Basic usage
{ $toNumber: "123" }
// Result: 123

// Convert string
{ $toNumber: "$priceString" }

// Convert boolean
{ $toNumber: true }
// Result: 1

// Convert expression
{ $toNumber: { $toString: { $add: [10, 20] } } }
```

---

### $toDate

**Description**: Converts and validates dates from various formats.

**Category**: Type

**Parameters**:
- `value`: ISO-8601 string, Unix timestamp (seconds or milliseconds), or Date object
- `fallback`: (Optional) Value to return on error

**Returns**: `Date` - Date object

**Example**:
```typescript
// ISO string
{ $toDate: "2024-01-15T10:30:00Z" }

// Unix timestamp (milliseconds)
{ $toDate: 1705318200000 }

// Unix timestamp (seconds)
{ $toDate: 1705318200 }

// With fallback
{ $toDate: { value: "invalid", fallback: "2024-01-01T00:00:00Z" } }
```

**Notes**: Automatically detects timestamp format (seconds vs milliseconds).

---

### $exists

**Description**: Checks if a field exists in the source object structure.

**Category**: Type

**Parameters**:
- `fieldPath`: Field path string (without $ prefix)

**Returns**: `boolean` - true if field exists

**Example**:
```typescript
// Basic usage
{ $exists: "user.email" }

// Nested path
{ $exists: "user.profile.bio" }

// Array element
{ $exists: "data.items.0.name" }

// Deep nesting
{ $exists: "settings.notifications.email.enabled" }
```

**Notes**: Returns true even if the value is null or undefined - checks structure, not value.

---

### $isNull

**Description**: Checks if a value is null or undefined.

**Category**: Type

**Parameters**:
- `value`: Any value

**Returns**: `boolean` - true if null or undefined

**Example**:
```typescript
// Basic usage
{ $isNull: null }
// Result: true

// From path
{ $isNull: "$user.email" }

// Check optional field
{ $isNull: "$user.profile.bio" }

// After expression
{ $isNull: { $ifNull: ["$optionalField", null] } }
```

---

### $isNumber

**Description**: Checks if a value is a valid number (excludes NaN).

**Category**: Type

**Parameters**:
- `value`: Any value

**Returns**: `boolean` - true if valid number

**Example**:
```typescript
// Basic usage
{ $isNumber: 123 }
// Result: true

// Check field
{ $isNumber: "$transaction.amount" }

// After conversion
{ $isNumber: { $toNumber: "$stringValue" } }

// Excludes NaN
{ $isNumber: NaN }
// Result: false
```

---

### $isNaN

**Description**: Checks if a value is NaN (Not a Number).

**Category**: Type

**Parameters**:
- `value`: Any value

**Returns**: `boolean` - true if NaN

**Example**:
```typescript
// Basic usage
{ $isNaN: NaN }
// Result: true

// Check invalid number
{ $isNaN: "$transaction.amount" }

// After conversion
{ $isNaN: { $toNumber: "$invalidString" } }
```

---

### $isString

**Description**: Checks if a value is a string.

**Category**: Type

**Parameters**:
- `value`: Any value

**Returns**: `boolean` - true if string

**Example**:
```typescript
// Basic usage
{ $isString: "hello" }
// Result: true

// Check field
{ $isString: "$user.name" }

// Type guards
{ $isString: 42 }        // false
{ $isString: [1, 2, 3] } // false
{ $isString: null }      // false
```

---

### $isBoolean

**Description**: Checks if a value is a boolean.

**Category**: Type

**Parameters**:
- `value`: Any value

**Returns**: `boolean` - true if boolean

**Example**:
```typescript
// Basic usage
{ $isBoolean: true }  // true
{ $isBoolean: false } // true

// Check field
{ $isBoolean: "$user.active" }

// Type guards
{ $isBoolean: "true" } // false
{ $isBoolean: 1 }      // false
{ $isBoolean: null }   // false
```

---

### $isArray

**Description**: Checks if a value is an array.

**Category**: Type

**Parameters**:
- `value`: Any value

**Returns**: `boolean` - true if array

**Example**:
```typescript
// Basic usage
{ $isArray: [1, 2, 3] }
// Result: true

// Check field
{ $isArray: "$user.tags" }

// Type guards
{ $isArray: "hello" }          // false
{ $isArray: { key: "value" } } // false
{ $isArray: null }             // false
```

---

### $isDate

**Description**: Checks if a value is a valid Date object or date string.

**Category**: Type

**Parameters**:
- `value`: Any value

**Returns**: `boolean` - true if valid date

**Example**:
```typescript
// Date object
{ $isDate: new Date() }
// Result: true

// ISO string
{ $isDate: "2025-01-15" }
// Result: true

// Invalid date
{ $isDate: "invalid-date" }
// Result: false

// Check field
{ $isDate: "$transaction.date" }

// Type guards
{ $isDate: 42 }   // false
{ $isDate: null } // false
```

---

## Date Operators

### $dateDiff

**Description**: Calculates the difference between two dates in specified units.

**Category**: Date

**Parameters**:
- `startDate`: Starting date
- `endDate`: Ending date
- `unit`: Unit of measurement ("days", "months", or "years")

**Returns**: `number` - Difference in specified units

**Example**:
```typescript
// Days difference
{ $dateDiff: { 
  startDate: "2025-01-01", 
  endDate: "2025-01-15", 
  unit: "days" 
} }
// Result: 14

// Age in years
{ $dateDiff: { 
  startDate: "$user.birthDate", 
  endDate: "$currentDate", 
  unit: "years" 
} }

// Months employed
{ $dateDiff: { 
  startDate: "$employee.startDate", 
  endDate: "$employee.endDate", 
  unit: "months" 
} }
```

**Notes**: Invalid date strings default to current date.

---

### $addDays

**Description**: Adds or subtracts days from a date.

**Category**: Date

**Parameters**:
- `date`: Date (ISO string, timestamp, or Date object)
- `days`: Number of days to add (negative to subtract)
- `fallback`: (Optional) Value to return on error

**Returns**: `string` - ISO-8601 formatted date string

**Example**:
```typescript
// Add 5 days
{ $addDays: { date: "2025-01-01T12:00:00Z", days: 5 } }
// Result: "2025-01-06T12:00:00.000Z"

// Subtract 3 days
{ $addDays: { date: "2025-01-10T12:00:00Z", days: -3 } }
// Result: "2025-01-07T12:00:00.000Z"

// With fallback
{ $addDays: { date: "invalid", days: 1, fallback: "2025-01-01T00:00:00.000Z" } }

// From path
{ $addDays: { date: "$order.createdAt", days: 30 } }
```

---

### $dateDiff

**Description**: Calculates the difference between two dates in specified units.

**Category**: Date

**Parameters**:
- `startDate`: Starting date
- `endDate`: Ending date
- `unit`: Unit of measurement ("days", "months", or "years")

**Returns**: `number` - Difference in specified units

**Example**:
```typescript
// Days difference
{ $dateDiff: { 
  startDate: "2025-01-01", 
  endDate: "2025-01-15", 
  unit: "days" 
} }
// Result: 14

// Age in years
{ $dateDiff: { 
  startDate: "$user.birthDate", 
  endDate: "$currentDate", 
  unit: "years" 
} }

// Months employed
{ $dateDiff: { 
  startDate: "$employee.startDate", 
  endDate: "$employee.endDate", 
  unit: "months" 
} }
```

**Notes**: Invalid date strings default to current date.

---

### $dateShift

**Description**: Adjusts dates to business days by rolling forward, backward, or keeping unchanged.

**Category**: Date

**Parameters**:
- `date`: Date to adjust
- `strategy`: "rollForward", "rollBackward", or "keep" (default: "rollForward")
- `holidays`: (Optional) Array of holiday date strings
- `weekends`: (Optional) Array of weekend day numbers (default: [0, 6] for Sunday/Saturday)
- `timezone`: (Optional) Timezone (default: "UTC")
- `maxIterations`: (Optional) Maximum iterations (default: 365)
- `fallback`: (Optional) Value to return on error

**Returns**: `string` - Adjusted ISO-8601 date string

**Example**:
```typescript
// Roll Saturday to Monday
{ $dateShift: { 
  date: "2025-03-01T10:00:00Z", 
  strategy: "rollForward" 
} }
// Result: "2025-03-03T10:00:00.000Z" (skips weekend)

// Skip holiday
{ $dateShift: { 
  date: "2025-03-01T10:00:00Z", 
  strategy: "rollForward", 
  holidays: ["2025-03-03"] 
} }
// Result: "2025-03-04T10:00:00.000Z" (skips weekend + holiday)

// Roll back to Friday
{ $dateShift: { 
  date: "2025-03-01T10:00:00Z", 
  strategy: "rollBackward" 
} }
// Result: "2025-02-28T10:00:00.000Z"

// Keep unchanged
{ $dateShift: { 
  date: "2025-03-01T10:00:00Z", 
  strategy: "keep" 
} }
// Result: "2025-03-01T10:00:00.000Z"

// Custom weekends (Middle East: Friday/Saturday)
{ $dateShift: { 
  date: "2025-01-03T10:00:00Z", 
  strategy: "rollForward", 
  weekends: [5, 6] 
} }
```

**Notes**: Supports custom holidays, weekends, and timezone-aware calculations.

---

### $dayOfMonth

**Description**: Extracts the day of the month from a date (1-31).

**Category**: Date

**Parameters**:
- `date`: Date value, or object with `date` and optional `timezone`
- `timezone`: (Optional) Timezone (default: "UTC")
- `fallback`: (Optional) Value to return on error

**Returns**: `number` - Day of month (1-31)

**Example**:
```typescript
// Basic usage (UTC)
{ $dayOfMonth: "2024-01-15T10:30:00Z" }
// Result: 15

// With timezone
{ $dayOfMonth: { 
  date: "2024-01-15T23:30:00Z", 
  timezone: "America/New_York" 
} }

// With fallback
{ $dayOfMonth: { date: "invalid", fallback: 1 } }
```

**Notes**: Supports timezone-aware calculations.

---

### $dayOfWeek

**Description**: Extracts the day of the week from a date (0-6, where 0 is Sunday).

**Category**: Date

**Parameters**:
- `date`: Date value, or object with `date` and optional `timezone`
- `timezone`: (Optional) Timezone (default: "UTC")
- `fallback`: (Optional) Value to return on error

**Returns**: `number` - Day of week (0-6)

**Example**:
```typescript
// Basic usage (UTC)
{ $dayOfWeek: "2024-01-15T10:30:00Z" }
// Result: 1 (Monday)

// With timezone
{ $dayOfWeek: { 
  date: "2024-01-15T23:30:00Z", 
  timezone: "America/New_York" 
} }

// With fallback
{ $dayOfWeek: { date: "invalid", fallback: 0 } }
```

**Notes**: 0 = Sunday, 1 = Monday, ..., 6 = Saturday

---

### $dayOfYear

**Description**: Extracts the day of the year from a date (1-366).

**Category**: Date

**Parameters**:
- `date`: Date value, or object with `date` and optional `timezone`
- `timezone`: (Optional) Timezone (default: "UTC")
- `fallback`: (Optional) Value to return on error

**Returns**: `number` - Day of year (1-366)

**Example**:
```typescript
// Basic usage (UTC)
{ $dayOfYear: "2024-01-15T10:30:00Z" }
// Result: 15

// Leap year
{ $dayOfYear: { date: "2024-02-29T10:00:00Z", timezone: "UTC" } }
// Result: 60

// With fallback
{ $dayOfYear: { date: "invalid", fallback: 1 } }
```

**Notes**: Supports leap years (366 days).

---

### $isWeekend

**Description**: Checks if a date falls on a weekend.

**Category**: Date

**Parameters**:
- `date`: Date value, or object with `date`, optional `weekends` and `timezone`
- `weekends`: (Optional) Array of weekend day numbers (default: [0, 6])
- `timezone`: (Optional) Timezone (default: "UTC")
- `fallback`: (Optional) Value to return on error

**Returns**: `boolean` - true if weekend

**Example**:
```typescript
// Check Saturday (default weekends: [0, 6])
{ $isWeekend: "2025-01-04T12:00:00Z" }
// Result: true

// Custom weekends (Friday and Saturday)
{ $isWeekend: { 
  date: "2025-01-03T12:00:00Z", 
  weekends: [5, 6] 
} }
// Result: true

// With timezone
{ $isWeekend: { 
  date: "2025-01-05T04:00:00Z", 
  timezone: "America/New_York" 
} }

// With fallback
{ $isWeekend: { date: "invalid", fallback: false } }
```

**Notes**: Supports custom weekend days for different regions.

---

### $isHoliday

**Description**: Checks if a date is in a list of holidays.

**Category**: Date

**Parameters**:
- `date`: Date to check
- `holidays`: Array of holiday date strings
- `timezone`: (Optional) Timezone (default: "UTC")
- `fallback`: (Optional) Value to return on error

**Returns**: `boolean` - true if holiday

**Example**:
```typescript
// Basic usage
{ $isHoliday: { 
  date: "2025-01-01T12:00:00Z", 
  holidays: ["2025-01-01", "2025-12-25"] 
} }
// Result: true

// With timezone
{ $isHoliday: { 
  date: "2025-01-02T04:00:00Z", 
  holidays: ["2025-01-01"], 
  timezone: "America/New_York" 
} }

// With fallback
{ $isHoliday: { 
  date: "invalid", 
  holidays: ["2025-01-01"], 
  fallback: false 
} }
```

**Notes**: Timezone-aware date comparison.

---

## API Reference for Scripts

This file can be parsed programmatically using the following structure:

```markdown
### OperatorName

**Description**: ...
**Category**: ...
**Parameters**: ...
**Returns**: ...
**Example**: ...
**Notes**: ... (optional)
```

Each operator section starts with `###` and the operator name (with $).
Metadata follows with **bold** labels.
Code examples are in fenced code blocks with `typescript` language.

---

## MongoDB-Style Documentation Pattern

This guide follows MongoDB's documentation style:
- Clear operator names with $ prefix
- Concise descriptions
- Detailed parameter lists
- Return type specifications
- Multiple realistic examples
- Usage notes and best practices
- Organized by functional categories

---

## Operator Index

All 77 operators documented in this guide:

**Math (15)**: $add, $subtract, $multiply, $divide, $abs, $ceil, $floor, $max, $min, $mod, $pow, $sqrt, $round, $toFixed, $trunc

**String (15)**: $concat, $toUpper, $toLower, $substr, $slice, $split, $trim, $ltrim, $rtrim, $replace, $replaceOne, $replaceAll, $regexReplace, $size, $indexOf

**Comparison (9)**: $eq, $ne, $gt, $gte, $lt, $lte, $in, $nin, $regex

**Logical (4)**: $and, $or, $not, $none

**Conditional (6)**: $cond, $switch, $ifNull, $coalesce, $some, $every

**Array (8)**: $filter, $map, $reduce, $sum, $avg, $arrayAt, $arrayFirst, $arrayLast

**Type (12)**: $type, $toString, $toNumber, $toDate, $exists, $isNull, $isNumber, $isNaN, $isString, $isBoolean, $isArray, $isDate

**Date (8)**: $addDays, $dateDiff, $dateShift, $dayOfMonth, $dayOfWeek, $dayOfYear, $isWeekend, $isHoliday

---

*Last Updated: October 2025*  
*Version: 4.0.0*  
*Total Operators: 77*  
*Format: MongoDB-style API reference*

