# JSON Forgefy 🔧

[![npm version](https://badge.fury.io/js/json-forgefy.svg)](https://badge.fury.io/js/json-forgefy)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

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

## 🚀 Quick Start

Transform API responses, calculate values, and reshape data in seconds:

```typescript
import { Forgefy } from 'json-forgefy';

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
| `$in` | Value in array | `{ $in: ["a", ["a", "b"]] }` | `true` |
| `$nin` | Value not in array | `{ $nin: ["c", ["a", "b"]] }` | `true` |
| `$exists` | Field exists | `{ $exists: "$field" }` | `true/false` |
| `$isNull` | Is null/undefined | `{ $isNull: null }` | `true` |

### 🔀 Conditional Logic
Handle complex decision-making:

| Operator | Description | Example |
|----------|-------------|---------|
| `$cond` | If-then-else | `{ $cond: { if: "$age > 18", then: "Adult", else: "Minor" } }` |
| `$switch` | Multi-branch | `{ $switch: { branches: [{ case: "$type === 'A'", then: "Type A" }], default: "Other" } }` |
| `$ifNull` | Null coalescing | `{ $ifNull: ["$optional", "default"] }` |

### 🔄 Type Conversion
Convert between data types safely:

| Operator | Description | Example | Result |
|----------|-------------|---------|---------|
| `$toNumber` | Convert to number | `{ $toNumber: "123" }` | `123` |
| `$toString` | Convert to string | `{ $toString: 123 }` | `"123"` |

### 📅 Date Operations
Work with dates and time:

| Operator | Description | Example |
|----------|-------------|---------|
| `$dateDiff` | Calculate difference | `{ $dateDiff: { startDate: "$start", endDate: "$end", unit: "days" } }` |

### 🔍 Advanced Operations
Powerful utilities for complex scenarios:

| Operator | Description | Example |
|----------|-------------|---------|
| `$regex` | Pattern matching | `{ $regex: { value: "$email", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" } }` |

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