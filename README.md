# JSON Forgefy 🔧

[![npm version](https://badge.fury.io/js/json-forgefy.svg)](https://badge.fury.io/js/json-forgefy)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/DMBerlin/json-forgefy/badge)](https://securityscorecards.dev/viewer/?uri=github.com/DMBerlin/json-forgefy)
[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/11594/badge)](https://www.bestpractices.dev/projects/11594)

**Transform JSON data with MongoDB-style operators. No database required.**

JSON Forgefy lets you reshape, calculate, and transform JSON objects using familiar MongoDB aggregation operators. Perfect for API responses, data pipelines, and any JSON transformation needs.

## 🎯 What Problems Does It Solve?

- **API Response Mapping**: Transform external API responses to match your app's data structure
- **Data Normalization**: Convert inconsistent data formats into standardized schemas  
- **Calculations**: Perform math operations, string manipulations, and conditional logic
- **Data Pipelines**: Create reusable transformation blueprints for consistent data processing
- **Type Safety**: Get full TypeScript support with compile-time validation

## ✨ Key Benefits

- **🚀 Zero Dependencies**: Lightweight with no external dependencies
- **📝 Declarative**: Define transformations as simple blueprint objects
- **🔄 MongoDB Operators**: Use familiar `$add`, `$multiply`, `$cond`, `$switch` syntax
- **🏗️ Composable**: Nest operators and combine transformations seamlessly
- **📦 Type-Safe**: Full TypeScript support with comprehensive type definitions
- **🧪 Battle-Tested**: 100% test coverage with comprehensive test suite

## 📦 Installation

```bash
pnpm add json-forgefy
```

```bash
# Alternative package managers
npm install json-forgefy
yarn add json-forgefy
```

## 🎮 Try It Online

Try JSON Forgefy in your browser with our interactive playground:

- **🌐 Live Playground**: [https://dmberlin.github.io/json-forgefy-playground](https://dmberlin.github.io/json-forgefy-playground)
- **📦 Source Code**: [https://github.com/DMBerlin/json-forgefy-playground](https://github.com/DMBerlin/json-forgefy-playground)

The playground lets you test all 77 operators with real-time transformation, syntax highlighting, and interactive API reference.

## 🚀 Quick Start

Transform API responses, calculate values, and reshape data in seconds:

```typescript
import Forgefy from 'json-forgefy';

// Raw API response
const apiResponse = {
  user: { 
    first_name: "john", 
    last_name: "doe", 
    email: "john@example.com",
    balance: "1250.75",
    cpf: "123.456.789-10"
  },
  transaction: { 
    amount: "100.50", 
    currency: "USD",
    status: "pending"
  }
};

// Define your transformation blueprint
const blueprint = {
  // Extract and format user data
  user: {
    fullName: { 
      $concat: [
        { $toUpper: { $substr: { value: "$user.first_name", start: 0, length: 1 } } },
        { $substr: { value: "$user.first_name", start: 1, length: 100 } },
        " ",
        { $toUpper: { $substr: { value: "$user.last_name", start: 0, length: 1 } } },
        { $substr: { value: "$user.last_name", start: 1, length: 100 } }
      ]
    },
    email: "$user.email",
    balance: { $toNumber: "$user.balance" },
    cleanCpf: { 
      $replace: { 
        input: "$user.cpf", 
        searchValues: [".", "-"], 
        replacement: "" 
      } 
    }
  },
  
  // Calculate transaction details
  transaction: {
    amount: { $toNumber: "$transaction.amount" },
    amountCents: { $multiply: [{ $toNumber: "$transaction.amount" }, 100] },
    currency: "$transaction.currency",
    status: { $toUpper: "$transaction.status" },
    isHighValue: { $gt: [{ $toNumber: "$transaction.amount" }, 100] }
  }
};

// Transform the data
const result = Forgefy.this(apiResponse, blueprint);

// Output:
{
  user: {
    fullName: "John Doe",
    email: "john@example.com", 
    balance: 1250.75,
    cleanCpf: "12345678910"
  },
  transaction: {
    amount: 100.5,
    amountCents: 10050,
    currency: "USD",
    status: "PENDING",
    isHighValue: true
  }
}
```

## 💼 Real-World Use Cases

### 1. **API Response Standardization**
Transform inconsistent third-party API responses into your app's data structure:

```typescript
// External API returns snake_case, you need camelCase
const externalApiData = {
  user_id: 123,
  first_name: "jane",
  account_balance: "2500.00",
  is_premium_member: true
};

const blueprint = {
  id: "$user_id",
  firstName: "$first_name", 
  balance: { $toNumber: "$account_balance" },
  isPremium: "$is_premium_member",
  tier: {
    $cond: {
      if: "$is_premium_member",
      then: "Premium",
      else: "Standard"
    }
  }
};

// Transform the data
const result = Forgefy.this(externalApiData, blueprint);

// Output:
{
  id: 123,
  firstName: "jane",
  balance: 2500,
  isPremium: true,
  tier: "Premium"
}
```

### 2. **Financial Calculations**
Process payment data with complex calculations:

```typescript
const paymentData = {
  subtotal: "99.99",
  tax_rate: "0.08",
  discount_percent: "10",
  shipping: "5.99"
};

const blueprint = {
  subtotal: { $toNumber: "$subtotal" },
  tax: { 
    $multiply: [
      { $toNumber: "$subtotal" }, 
      { $toNumber: "$tax_rate" }
    ] 
  },
  discount: {
    $multiply: [
      { $toNumber: "$subtotal" },
      { $divide: [{ $toNumber: "$discount_percent" }, 100] }
    ]
  },
  total: {
    $add: [
      { $toNumber: "$subtotal" },
      { $multiply: [{ $toNumber: "$subtotal" }, { $toNumber: "$tax_rate" }] },
      { $toNumber: "$shipping" },
      { $multiply: [
        { $toNumber: "$subtotal" },
        { $divide: [{ $toNumber: "$discount_percent" }, 100] }
      ]}
    ]
  }
};

// Transform the data
const result = Forgefy.this(paymentData, blueprint);

// Output:
{
  subtotal: 99.99,
  tax: 8.00,
  discount: 10.00,
  total: 123.99
}
```

### 3. **Data Validation & Conditional Logic**
Apply business rules and validation:

```typescript
const userData = {
  age: 25,
  country: "US",
  subscription_type: "premium",
  last_login: "2024-01-15T10:30:00Z"
};

const blueprint = {
  canAccessPremium: {
    $and: [
      { $gte: ["$age", 18] },
      { $eq: ["$subscription_type", "premium"] }
    ]
  },
  region: {
    $switch: {
      branches: [
        { case: { $eq: ["$country", "US"] }, then: "North America" },
        { case: { $eq: ["$country", "CA"] }, then: "North America" },
        { case: { $eq: ["$country", "GB"] }, then: "Europe" }
      ],
      default: "Other"
    }
  },
  accountStatus: {
    $cond: {
      if: { $gt: [{ $dateDiff: { startDate: "$last_login", endDate: "now", unit: "days" } }, 30] },
      then: "Inactive",
      else: "Active"
    }
  }
};

// Transform the data
const result = Forgefy.this(userData, blueprint);

// Output:
{
  canAccessPremium: true,
  region: "North America", 
  accountStatus: "Inactive"
}
```

## 🔧 Core Concepts

### 1. Path Extraction
Use `$` prefix to extract values from nested objects:

```typescript
const data = { user: { profile: { name: "Alice" } } };
const blueprint = { name: "$user.profile.name" };
// Transform the data
const result = Forgefy.this(data, blueprint);
// Result: { name: "Alice" }
```

### 2. Operators
Transform data using MongoDB-style operators:

```typescript
const blueprint = {
  total: { $add: [10, 20, 30] },           // Math operations
  text: { $toString: 123 },                // Type conversions
  upper: { $toUpper: "$user.name" },       // String operations
  conditional: {                           // Conditional logic
    $cond: {
      if: { $gt: ["$amount", 100] },
      then: "Premium",
      else: "Standard"
    }
  }
};
```

### 3. Nested Transformations
Create complex nested structures:

```typescript
const blueprint = {
  user: {
    id: "$userId",
    profile: {
      displayName: { $toUpper: "$user.name" },
      isActive: { $eq: ["$status", "active"] }
    }
  },
  summary: {
    total: { $add: ["$price", "$tax"] },
    formatted: { $concat: ["$", { $toString: { $add: ["$price", "$tax"] } }] }
  }
};
```

## 📚 Complete Operator Reference

> 📖 **For detailed API documentation with comprehensive examples, see [GUIDE.md](GUIDE.md)**

**77 operators across 10 categories:**

| Category | Operators | Count |
|----------|-----------|-------|
| 🔢 **Mathematical** | $add, $subtract, $multiply, $divide, $abs, $ceil, $floor, $max, $min, $toFixed, $round, $mod, $pow, $sqrt, $trunc | 15 |
| 📝 **String** | $concat, $toUpper, $toLower, $substr, $slice, $split, $size, $replace, $regexReplace, $trim, $ltrim, $rtrim, $indexOf, $replaceOne, $replaceAll | 15 |
| ⚖️ **Comparison** | $eq, $ne, $gt, $gte, $lt, $lte, $in, $nin, $regex | 9 |
| 🔀 **Logical** | $and, $or, $not, $none | 4 |
| 🎯 **Conditional** | $cond, $switch, $ifNull, $coalesce, $every, $some | 6 |
| 🔄 **Type Conversion** | $toNumber, $toString, $toDate | 3 |
| 🔍 **Type Checking** | $type, $isArray, $isString, $isBoolean, $isDate, $isNumber, $isNull, $isNaN, $exists | 9 |
| 📅 **Date** | $dayOfWeek, $dayOfMonth, $dayOfYear, $isWeekend, $isHoliday, $addDays, $dateShift, $dateDiff | 8 |
| 📋 **Array Transform** | $map, $filter, $reduce | 3 |
| 📊 **Array Utilities** | $arrayFirst, $arrayLast, $arrayAt, $sum, $avg | 5 |

---

### 🔢 Mathematical Operations
Perfect for calculations, aggregations, and numeric transformations:

| Operator | Description | Example | Result |
|----------|-------------|---------|---------|
| `$add` | Add numbers | `{ $add: [1, 2, 3] }` | `6` |
| `$subtract` | Subtract numbers | `{ $subtract: [10, 3] }` | `7` |
| `$multiply` | Multiply numbers | `{ $multiply: [4, 5] }` | `20` |
| `$divide` | Divide numbers | `{ $divide: [20, 4] }` | `5` |
| `$abs` | Absolute value | `{ $abs: -5 }` | `5` |
| `$ceil` | Round up | `{ $ceil: 4.2 }` | `5` |
| `$floor` | Round down | `{ $floor: 4.8 }` | `4` |
| `$max` | Maximum value | `{ $max: [1, 5, 3] }` | `5` |
| `$min` | Minimum value | `{ $min: [1, 5, 3] }` | `1` |
| `$toFixed` | Format decimals | `{ $toFixed: { value: 3.14159, precision: 2 } }` | `3.14` |
| `$round` | Round to precision | `{ $round: { value: 3.14159, precision: 2 } }` | `3.14` |
| `$mod` | Modulo (remainder) | `{ $mod: { dividend: 10, divisor: 3 } }` | `1` |
| `$pow` | Power/exponentiation | `{ $pow: { base: 2, exponent: 3 } }` | `8` |
| `$sqrt` | Square root | `{ $sqrt: { value: 16 } }` | `4` |
| `$trunc` | Truncate to integer | `{ $trunc: 4.9 }` | `4` |

<details>
<summary>🔢 <b>Math Examples</b> (click to expand)</summary>

```typescript
// Basic arithmetic
const math = {
  sum: { $add: [10, 20, 30] },                    // 60
  difference: { $subtract: [100, 25] },            // 75
  product: { $multiply: [5, 6] },                  // 30
  quotient: { $divide: [100, 4] },                 // 25
  absolute: { $abs: -42 },                         // 42
  roundUp: { $ceil: 4.2 },                         // 5
  roundDown: { $floor: 4.8 },                      // 4
  maximum: { $max: [10, 25, 15] },                 // 25
  minimum: { $min: [10, 25, 15] }                  // 10
};

// Advanced math
const advanced = {
  remainder: { $mod: { dividend: 17, divisor: 5 } },      // 2
  power: { $pow: { base: 2, exponent: 10 } },             // 1024
  squareRoot: { $sqrt: { value: 144 } },                  // 12
  truncated: { $trunc: 3.9 },                             // 3
  formatted: { $toFixed: { value: 3.14159, precision: 2 } }, // "3.14"
  rounded: { $round: { value: 3.14159, precision: 2 } }   // 3.14
};

// With fallback for errors
const safe = {
  safeSqrt: { $sqrt: { value: -16, fallback: 0 } }        // 0 (negative number)
};
```

</details>

### 📝 String Operations
Transform and manipulate text data:

| Operator | Description | Example | Result |
|----------|-------------|---------|---------|
| `$toString` | Convert to string | `{ $toString: 123 }` | `"123"` |
| `$toUpper` | Uppercase | `{ $toUpper: "hello" }` | `"HELLO"` |
| `$toLower` | Lowercase | `{ $toLower: "HELLO" }` | `"hello"` |
| `$concat` | Join strings | `{ $concat: ["Hello", " ", "World"] }` | `"Hello World"` |
| `$substr` | Extract substring | `{ $substr: { value: "Hello", start: 1, length: 3 } }` | `"ell"` |
| `$slice` | Slice string/array | `{ $slice: { input: "Hello", start: 0, end: 2 } }` | `"He"` |
| `$split` | Split string | `{ $split: { input: "a,b,c", delimiter: "," } }` | `["a", "b", "c"]` |
| `$size` | Get length | `{ $size: "Hello" }` | `5` |
| `$replace` | Replace multiple values | `{ $replace: { input: "123.456.789-10", searchValues: [".", "-"], replacement: "" } }` | `"12345678910"` |
| `$regexReplace` | Regex replacement | `{ $regexReplace: { input: "hello      world", pattern: "\\s+", replacement: " " } }` | `"hello world"` |
| `$trim` | Trim whitespace/chars | `{ $trim: { input: "  hello  ", chars: [" "] } }` | `"hello"` |
| `$ltrim` | Trim left | `{ $ltrim: { input: "  hello", chars: [" "] } }` | `"hello"` |
| `$rtrim` | Trim right | `{ $rtrim: { input: "hello  ", chars: [" "] } }` | `"hello"` |
| `$indexOf` | Find substring index | `{ $indexOf: { input: "hello", substring: "ll" } }` | `2` |
| `$replaceOne` | Replace first match | `{ $replaceOne: { input: "hello", search: "l", replacement: "L" } }` | `"heLlo"` |
| `$replaceAll` | Replace all matches | `{ $replaceAll: { input: "hello", search: "l", replacement: "L" } }` | `"heLLo"` |

<details>
<summary>📝 <b>String Examples</b> (click to expand)</summary>

```typescript
// Basic string operations
const strings = {
  upper: { $toUpper: "hello world" },                     // "HELLO WORLD"
  lower: { $toLower: "HELLO WORLD" },                     // "hello world"
  joined: { $concat: ["Hello", " ", "World", "!"] },      // "Hello World!"
  substring: { $substr: { value: "Hello World", start: 6, length: 5 } }, // "World"
  sliced: { $slice: { input: "Hello", start: 1, end: 4 } }, // "ell"
  parts: { $split: { input: "a,b,c", delimiter: "," } },  // ["a", "b", "c"]
  length: { $size: "Hello" }                              // 5
};

// Advanced string manipulation
const advanced = {
  cleaned: { $trim: { input: "  hello  ", chars: [" "] } },              // "hello"
  leftTrim: { $ltrim: { input: "  hello", chars: [" "] } },             // "hello"
  rightTrim: { $rtrim: { input: "hello  ", chars: [" "] } },            // "hello"
  position: { $indexOf: { input: "hello world", substring: "world" } }, // 6
  replaceFirst: { $replaceOne: { input: "hello", search: "l", replacement: "L" } }, // "heLlo"
  replaceAll: { $replaceAll: { input: "hello", search: "l", replacement: "L" } }    // "heLLo"
};

// Pattern replacement
const patterns = {
  // Remove all non-digits
  digitsOnly: { 
    $regexReplace: { input: "ABC-123-XYZ", pattern: "\\D", replacement: "" } 
  },  // "123"
  
  // Normalize whitespace
  normalized: { 
    $regexReplace: { input: "hello    world", pattern: "\\s+", replacement: " " } 
  },  // "hello world"
  
  // Clean phone number
  cleanPhone: { 
    $replace: { 
      input: "(555) 123-4567", 
      searchValues: ["(", ")", " ", "-"], 
      replacement: "" 
    } 
  }  // "5551234567"
};
```

</details>

### ⚖️ Comparison & Logic
Make decisions and validate data:

| Operator | Description | Example | Result |
|----------|-------------|---------|---------|
| `$eq` | Equal | `{ $eq: [5, 5] }` | `true` |
| `$ne` | Not equal | `{ $ne: [5, 3] }` | `true` |
| `$gt` | Greater than | `{ $gt: [10, 5] }` | `true` |
| `$gte` | Greater or equal | `{ $gte: [5, 5] }` | `true` |
| `$lt` | Less than | `{ $lt: [3, 5] }` | `true` |
| `$lte` | Less or equal | `{ $lte: [5, 5] }` | `true` |
| `$and` | Logical AND | `{ $and: [true, false] }` | `false` |
| `$or` | Logical OR | `{ $or: [true, false] }` | `true` |
| `$not` | Logical NOT | `{ $not: true }` | `false` |
| `$none` | All conditions false | `{ $none: [false, false] }` | `true` |
| `$in` | Value in array | `{ $in: ["a", ["a", "b"]] }` | `true` |
| `$nin` | Value not in array | `{ $nin: ["c", ["a", "b"]] }` | `true` |
| `$exists` | Field exists | `{ $exists: "$field" }` | `true/false` |
| `$isNull` | Is null/undefined | `{ $isNull: null }` | `true` |
| `$isNumber` | Is valid number | `{ $isNumber: 123 }` | `true` |
| `$isNaN` | Is NaN | `{ $isNaN: NaN }` | `true` |
| `$regex` | Pattern matching | `{ $regex: { value: "$email", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" } }` | `true/false` |

<details>
<summary>⚖️ <b>Comparison & Logic Examples</b> (click to expand)</summary>

```typescript
// Comparisons
const checks = {
  isEqual: { $eq: [5, 5] },                        // true
  notEqual: { $ne: [5, 3] },                       // true
  greaterThan: { $gt: [10, 5] },                   // true
  greaterOrEqual: { $gte: [5, 5] },                // true
  lessThan: { $lt: [3, 5] },                       // true
  lessOrEqual: { $lte: [5, 5] }                    // true
};

// Logical operators
const logic = {
  allTrue: { $and: [true, true, true] },           // true
  anyTrue: { $or: [false, true, false] },          // true
  inverted: { $not: false },                       // true
  noneTrue: { $none: [false, false, false] }       // true
};

// Membership
const membership = {
  inList: { $in: ["apple", ["apple", "banana"]] }, // true
  notInList: { $nin: ["grape", ["apple", "banana"]] } // true
};

// Validation
const validation = {
  hasField: { $exists: "$user.email" },            // true/false
  isNull: { $isNull: "$optionalField" },           // true/false
  isValidNumber: { $isNumber: "$age" },            // true/false
  isNotANumber: { $isNaN: "$invalidNumber" }       // true/false
};

// Pattern matching
const patterns = {
  isEmail: { 
    $regex: { 
      value: "$email", 
      pattern: "^[^@]+@[^@]+\\.[^@]+$" 
    } 
  }  // true/false
};
```

</details>

### 🔀 Conditional Logic
Handle complex decision-making:

| Operator | Description | Example |
|----------|-------------|---------|
| `$cond` | If-then-else | `{ $cond: { if: { $gt: ["$age", 18] }, then: "Adult", else: "Minor" } }` |
| `$switch` | Multi-branch | `{ $switch: { branches: [{ case: { $eq: ["$type", "A"] }, then: "Type A" }], default: "Other" } }` |
| `$ifNull` | Null coalescing | `{ $ifNull: ["$optional", "default"] }` |
| `$coalesce` | First non-null value | `{ $coalesce: ["$displayName", "$firstName", "Anonymous"] }` |
| `$every` | All conditions true | `{ $every: { conditions: [...], then: "valid", else: "invalid" } }` |
| `$some` | Any condition true | `{ $some: { conditions: [...], then: "found", else: "none" } }` |

<details>
<summary>🔀 <b>Conditional Examples</b> (click to expand)</summary>

```typescript
// If-then-else with $cond
const status = {
  age: 25,
  category: {
    $cond: {
      if: { $gte: ["$age", 18] },
      then: "Adult",
      else: "Minor"
    }
  }  // "Adult"
};

// Multi-branch with $switch
const tier = {
  score: 850,
  level: {
    $switch: {
      branches: [
        { case: { $gte: ["$score", 900] }, then: "Platinum" },
        { case: { $gte: ["$score", 800] }, then: "Gold" },
        { case: { $gte: ["$score", 700] }, then: "Silver" }
      ],
      default: "Bronze"
    }
  }  // "Gold"
};

// Null handling
const safe = {
  optionalName: null,
  displayName: { $coalesce: ["$optionalName", "$firstName", "Guest"] }, // Uses first non-null
  safeName: { $ifNull: ["$optionalName", "Unknown"] }                   // "Unknown"
};

// Multiple conditions
const validation = {
  checks: [
    { $gte: ["$age", 18] },
    { $eq: ["$status", "active"] },
    "$verified"
  ],
  allValid: { $every: { conditions: "$checks", then: true, else: false } },
  anyValid: { $some: { conditions: "$checks", then: true, else: false } }
};
```

</details>

### 🔄 Type Conversion
Convert between data types safely:

| Operator | Description | Example | Result |
|----------|-------------|---------|---------|
| `$toNumber` | Convert to number | `{ $toNumber: "123" }` | `123` |
| `$toString` | Convert to string | `{ $toString: 123 }` | `"123"` |

<details>
<summary>🔄 <b>Type Conversion Examples</b> (click to expand)</summary>

```typescript
// Number conversion
const numbers = {
  fromString: { $toNumber: "123.45" },             // 123.45
  fromBoolean: { $toNumber: true },                // 1
  invalid: { $toNumber: "abc" }                    // NaN
};

// String conversion
const strings = {
  fromNumber: { $toString: 123 },                  // "123"
  fromBoolean: { $toString: true },                // "true"
  fromNull: { $toString: null }                    // "null"
};
```

</details>

### 📅 Date Operations
Work with dates, extract components, and handle business days:

| Operator | Description | Example | Result |
|----------|-------------|---------|---------|
| `$toDate` | Convert to date | `{ $toDate: { date: "2025-01-15" } }` | `Date object` |
| `$dayOfWeek` | Day of week (0-6) | `{ $dayOfWeek: { date: "$date" } }` | `0-6` |
| `$dayOfMonth` | Day of month (1-31) | `{ $dayOfMonth: { date: "$date" } }` | `1-31` |
| `$dayOfYear` | Day of year (1-366) | `{ $dayOfYear: { date: "$date" } }` | `1-366` |
| `$isWeekend` | Check if weekend | `{ $isWeekend: { date: "$date" } }` | `true/false` |
| `$isHoliday` | Check if holiday | `{ $isHoliday: { date: "$date", holidays: ["2025-01-01"] } }` | `true/false` |
| `$addDays` | Add/subtract days | `{ $addDays: { date: "$date", days: 7 } }` | `"2025-01-22"` |
| `$dateShift` | Shift to business day | `{ $dateShift: { date: "$date", strategy: "rollForward", holidays: "$holidays" } }` | `"2025-01-20"` |
| `$dateDiff` | Calculate difference | `{ $dateDiff: { startDate: "$start", endDate: "$end", unit: "days" } }` | `10` |

<details>
<summary>📅 <b>Date Operators Examples</b> (click to expand)</summary>

```typescript
// Extract date components
const dateInfo = {
  date: "2025-03-15T10:00:00Z",
  dayOfWeek: { $dayOfWeek: { date: "$date" } },        // 6 (Saturday)
  dayOfMonth: { $dayOfMonth: { date: "$date" } },      // 15
  dayOfYear: { $dayOfYear: { date: "$date" } },        // 74
  isWeekend: { $isWeekend: { date: "$date" } }         // true
};

// Business day handling
const businessDay = {
  scheduledDate: "2025-03-01",  // Saturday
  holidays: ["2025-03-03"],     // Monday is holiday
  executionDate: {
    $dateShift: {
      date: "$scheduledDate",
      strategy: "rollForward",    // Options: rollForward, rollBackward, keep
      holidays: "$holidays",
      weekends: [6, 0]           // Saturday, Sunday
    }
  }
  // Result: "2025-03-04" (Tuesday - skips weekend and holiday)
};

// Date arithmetic
const futureDate = {
  today: "2025-01-01",
  nextWeek: { $addDays: { date: "$today", days: 7 } },      // "2025-01-08"
  lastMonth: { $addDays: { date: "$today", days: -30 } }    // "2024-12-02"
};
```

</details>


### 📋 Array Transformation
Transform, filter, and aggregate arrays:

| Operator | Description | Example |
|----------|-------------|---------|
| `$map` | Transform each element | `{ $map: { input: "$items", expression: { $multiply: ["$current", 2] } } }` |
| `$filter` | Filter elements | `{ $filter: { input: "$items", condition: { $gt: ["$current", 10] } } }` |
| `$reduce` | Aggregate to single value | `{ $reduce: { input: "$items", initialValue: 0, expression: { $add: ["$accumulated", "$current"] } } }` |

<details>
<summary>📋 <b>Array Operators Examples</b> (click to expand)</summary>

```typescript
// Transform array elements with $map
const doubled = {
  numbers: [1, 2, 3, 4, 5],
  doubled: {
    $map: {
      input: "$numbers",
      expression: { $multiply: ["$current", 2] }
    }
  }
  // Result: [2, 4, 6, 8, 10]
};

// Filter array with conditions
const adults = {
  users: [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 17 },
    { name: "Charlie", age: 30 }
  ],
  adults: {
    $filter: {
      input: "$users",
      condition: { $gte: ["$current.age", 18] }
    }
  }
  // Result: [{ name: "Alice", age: 25 }, { name: "Charlie", age: 30 }]
};

// Aggregate with $reduce
const sum = {
  values: [1, 2, 3, 4, 5],
  total: {
    $reduce: {
      input: "$values",
      initialValue: 0,
      expression: { $add: ["$accumulated", "$current"] }
    }
  }
  // Result: 15
};

// Context variables in array operators
// $current - current element
// $index - current index (0-based)
// $accumulated - accumulated value (in $reduce)
```

</details>

### 📊 Array Utilities
Access and aggregate array elements:

| Operator | Description | Example | Result |
|----------|-------------|---------|---------|
| `$arrayFirst` | First element | `{ $arrayFirst: { input: [1, 2, 3] } }` | `1` |
| `$arrayLast` | Last element | `{ $arrayLast: { input: [1, 2, 3] } }` | `3` |
| `$arrayAt` | Element at index | `{ $arrayAt: { input: [1, 2, 3], index: 1 } }` | `2` |
| `$sum` | Sum numbers | `{ $sum: { values: [1, 2, 3] } }` | `6` |
| `$avg` | Average | `{ $avg: { values: [1, 2, 3] } }` | `2` |

<details>
<summary>📊 <b>Array Utility Examples</b> (click to expand)</summary>

```typescript
// Access specific elements
const scores = {
  all: [85, 92, 78, 95, 88],
  first: { $arrayFirst: { input: "$all" } },          // 85
  last: { $arrayLast: { input: "$all" } },            // 88
  third: { $arrayAt: { input: "$all", index: 2 } },   // 78
  secondLast: { $arrayAt: { input: "$all", index: -2 } }  // 95 (negative indexing)
};

// Aggregate numbers
const stats = {
  values: [10, 20, 30, 40, 50],
  total: { $sum: { values: "$values" } },             // 150
  average: { $avg: { values: "$values" } },           // 30
  count: { $size: "$values" }                         // 5
};

// With fallback for safety
const safe = {
  maybeArray: null,
  first: { 
    $arrayFirst: { 
      input: "$maybeArray", 
      fallback: "default" 
    } 
  }  // "default"
};
```

</details>

### 🔍 Type Checking
Validate data types:

| Operator | Description | Example | Result |
|----------|-------------|---------|---------|
| `$type` | Get type name | `{ $type: "$value" }` | `"string"` |
| `$isArray` | Check if array | `{ $isArray: "$value" }` | `true/false` |
| `$isString` | Check if string | `{ $isString: "$value" }` | `true/false` |
| `$isBoolean` | Check if boolean | `{ $isBoolean: "$value" }` | `true/false` |
| `$isDate` | Check if valid date | `{ $isDate: "$value" }` | `true/false` |

<details>
<summary>🔍 <b>Type Checking Examples</b> (click to expand)</summary>

```typescript
// Type identification
const types = {
  stringType: { $type: "hello" },                  // "string"
  numberType: { $type: 123 },                      // "number"
  arrayType: { $type: [1, 2, 3] },                 // "array"
  objectType: { $type: { a: 1 } },                 // "object"
  nullType: { $type: null },                       // "null"
  undefinedType: { $type: undefined }              // "undefined"
};

// Type validation
const checks = {
  checkArray: { $isArray: [1, 2, 3] },             // true
  checkString: { $isString: "hello" },             // true
  checkBoolean: { $isBoolean: true },              // true
  checkDate: { $isDate: "2025-01-01" }             // true
};

// Use in conditionals
const conditional = {
  value: [1, 2, 3],
  result: {
    $cond: {
      if: { $isArray: "$value" },
      then: { $size: "$value" },
      else: 0
    }
  }  // 3
};
```

</details>



## 🎯 Common Patterns & Best Practices

### Pattern 1: Data Normalization
Standardize inconsistent API responses:

```typescript
// Transform snake_case API to camelCase
const normalizeUser = {
  userId: "$user_id",
  firstName: "$first_name", 
  lastName: "$last_name",
  emailAddress: "$email_address",
  accountBalance: { $toNumber: "$account_balance" },
  isVerified: "$is_verified",
  createdAt: "$created_at"
};
```

### Pattern 2: Calculated Fields
Add computed properties to your data:

```typescript
const addCalculations = {
  // Keep original data
  price: "$price",
  tax: "$tax",
  
  // Add calculated fields
  subtotal: { $add: ["$price", "$tax"] },
  discountAmount: { $multiply: ["$price", "$discountRate"] },
  finalPrice: { 
    $subtract: [
      { $add: ["$price", "$tax"] },
      { $multiply: ["$price", "$discountRate"] }
    ]
  },
  isExpensive: { $gt: ["$price", 100] }
};
```

### Pattern 3: Conditional Data Enrichment
Add fields based on business logic:

```typescript
const enrichUserData = {
  // Basic user info
  name: "$name",
  age: "$age",
  
  // Conditional enrichment
  category: {
    $switch: {
      branches: [
        { case: { $lt: ["$age", 18] }, then: "Minor" },
        { case: { $lt: ["$age", 65] }, then: "Adult" }
      ],
      default: "Senior"
    }
  },
  canVote: { $gte: ["$age", 18] },
  greeting: {
    $cond: {
      if: { $gte: ["$age", 18] },
      then: { $concat: ["Hello ", "$name", ", you can vote!"] },
      else: { $concat: ["Hi ", "$name", ", you'll be able to vote in ", { $toString: { $subtract: [18, "$age"] } }, " years"] }
    }
  }
};
```

### Pattern 4: Data Validation & Sanitization
Clean and validate incoming data:

```typescript
const validateAndClean = {
  // Clean string data
  email: { $toLower: "$email" },
  // Clean CPF by removing dots and dashes
  cleanCpf: { 
    $replace: { 
      input: "$cpf", 
      searchValues: [".", "-"], 
      replacement: "" 
    } 
  },
  name: { 
    $concat: [
      { $toUpper: { $substr: { value: "$firstName", start: 0, length: 1 } } },
      { $substr: { value: "$firstName", start: 1, length: 100 } },
      " ",
      { $toUpper: { $substr: { value: "$lastName", start: 0, length: 1 } } },
      { $substr: { value: "$lastName", start: 1, length: 100 } }
    ]
  },
  
  // Validate and set defaults
  age: { $ifNull: ["$age", 0] },
  isValidEmail: { $regex: { value: "$email", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" } },
  status: {
    $cond: {
      if: { $and: ["$email", { $gt: ["$age", 0] }] },
      then: "Valid",
      else: "Invalid"
    }
  }
};
```

### Pattern 5: Advanced Text Processing with RegexReplace
Use regex patterns for complex string transformations:

```typescript
const textProcessing = {
  // Normalize whitespace - handle any number of spaces
  normalizedText: {
    $trim: {
      input: {
        $regexReplace: {
          input: "$userInput",              // "  hello      world  "
          pattern: "\\s+",                   // Match one or more whitespace chars
          replacement: " "
        }
      }
    }
  },  // Result: "hello world"
  
  // Clean phone number - remove all non-digits
  cleanPhone: {
    $regexReplace: {
      input: "$phone",                      // "(555) 123-4567"
      pattern: "\\D",                       // Match any non-digit
      replacement: ""
    }
  },  // Result: "5551234567"
  
  // Remove HTML tags
  plainText: {
    $regexReplace: {
      input: "$htmlContent",                // "<p>Hello <strong>World</strong></p>"
      pattern: "<[^>]+>",                   // Match HTML tags
      replacement: ""
    }
  },  // Result: "Hello World"
  
  // Case-insensitive replacement
  sanitized: {
    $regexReplace: {
      input: "$text",                       // "Test TEST test"
      pattern: "test",
      replacement: "demo",
      flags: "gi"                           // Global + case-insensitive
    }
  },  // Result: "demo demo demo"
  
  // Combine with other operators for validation
  hasValidPhone: {
    $eq: [
      {
        $size: {
          $regexReplace: {
            input: "$phone",
            pattern: "\\D",
            replacement: ""
          }
        }
      },
      10
    ]
  }  // Check if phone has exactly 10 digits
};
```

## 🛡️ Fallback System

Many operators support fallback values for graceful error handling:

<details>
<summary>🛡️ <b>Fallback Examples</b> (click to expand)</summary>

```typescript
// Array operators with fallback
const safe = {
  maybeArray: null,
  
  // Returns fallback if input is not an array
  first: { 
    $arrayFirst: { 
      input: "$maybeArray", 
      fallback: "no data" 
    } 
  },  // "no data"
  
  // Math operators with fallback
  safeSqrt: { 
    $sqrt: { 
      value: "$negativeNumber", 
      fallback: 0 
    } 
  },  // 0 (if negative)
  
  // Sum with fallback for non-numeric values
  total: { 
    $sum: { 
      values: ["$invalidData"], 
      fallback: 0 
    } 
  }  // 0
};

// Fallback can be:
// - Static value: fallback: 0
// - Path reference: fallback: "$defaultValue"
// - Expression: fallback: { $add: [1, 2] }
```

</details>

## 📌 Important Notes

### Array Operator Limitations

Due to JavaScript module circular dependencies, array operators (`$map`, `$filter`, `$reduce`) cannot be nested within object properties:

```typescript
// ❌ This doesn't work (nested $map in object property)
{
  $map: {
    input: [{ items: [1, 2, 3] }],
    expression: {
      doubled: {  // ← Nested in object property
        $map: { input: "$current.items", expression: { $multiply: ["$current", 2] } }
      }
    }
  }
}
// Returns: [{ doubled: null }]

// ✅ Use $map at expression root instead
{
  $map: {
    input: [{ items: [1, 2, 3] }],
    expression: {
      $map: {  // ← At root level
        input: "$current.items",
        expression: { $multiply: ["$current", 2] }
      }
    }
  }
}
// Returns: [[2, 4, 6]]
```

All other operators nest perfectly to unlimited depth.

## 🛠️ Development

### Prerequisites
- Node.js 16+
- pnpm (recommended) or npm/yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/DMBerlin/json-forgefy.git
cd json-forgefy

# Install dependencies with pnpm
pnpm install

# Run tests
pnpm test

# Build the project
pnpm build

# Run linting
pnpm lint
```

### Development Commands
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:cov

# Lint and fix code
pnpm lint:fix

# Build for production
pnpm build
```

## 📖 API Reference

### `Forgefy.this(payload, projection)`

The main transformation function.

**Parameters:**
- `payload` (Record<string, any>): The source object to transform
- `projection` (Projection): The blueprint object defining the transformation

**Returns:**
- `Record<string, any>`: The transformed object

**Example:**
```typescript
const result = Forgefy.this(sourceData, transformationBlueprint);
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by MongoDB's aggregation pipeline operators
- Built with TypeScript for type safety and developer experience
- Designed for modern JavaScript/TypeScript applications

---

Made with ❤️ by [Daniel Marinho](https://github.com/DMBerlin)