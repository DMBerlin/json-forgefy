# JSON Forgefy 🔧

[![npm version](https://badge.fury.io/js/json-forgefy.svg)](https://badge.fury.io/js/json-forgefy)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A powerful TypeScript library for transforming JSON objects using MongoDB-inspired operators and projection blueprints. Perfect for data transformation, API response mapping, and creating flexible data processing pipelines.

## 🚀 Why JSON Forgefy?

- **🎯 Declarative**: Define transformations using simple blueprint objects
- **🔄 MongoDB-Inspired**: Familiar operators like `$add`, `$multiply`, `$cond`, `$switch`
- **🏗️ Composable**: Nest operators and combine transformations
- **📦 Type-Safe**: Full TypeScript support with comprehensive type definitions
- **⚡ Lightweight**: Zero dependencies, minimal footprint
- **🧪 Well-Tested**: Comprehensive test coverage

## 📦 Installation

```bash
npm install json-forgefy
```

```bash
yarn add json-forgefy
```

## 🎯 Quick Start

```typescript
import { forgefy } from 'json-forgefy';

// Your source data
const payload = {
  user: { name: "John Doe", age: 30 },
  transaction: { amount: "100.50", currency: "USD" }
};

// Your transformation blueprint
const blueprint = {
  userName: "$user.name",                    // Extract nested values
  userAge: "$user.age",
  amount: { $toNumber: "$transaction.amount" },  // Convert string to number
  amountCents: { 
    $multiply: [{ $toNumber: "$transaction.amount" }, 100] 
  },
  currency: "$transaction.currency"
};

// Transform the data
const result = forgefy(payload, blueprint);

console.log(result);
// Output:
// {
//   userName: "John Doe",
//   userAge: 30,
//   amount: 100.5,
//   amountCents: 10050,
//   currency: "USD"
// }
```

## 🔧 Core Concepts

### 1. Path Extraction
Use `$` prefix to extract values from nested objects:

```typescript
const data = { user: { profile: { name: "Alice" } } };
const blueprint = { name: "$user.profile.name" };
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

## 📚 Available Operators

### Mathematical Operators
- `$add` - Addition: `{ $add: [1, 2, 3] }` → `6`
- `$subtract` - Subtraction: `{ $subtract: [10, 3] }` → `7`
- `$multiply` - Multiplication: `{ $multiply: [4, 5] }` → `20`
- `$divide` - Division: `{ $divide: [20, 4] }` → `5`
- `$abs` - Absolute value: `{ $abs: -5 }` → `5`
- `$ceil` - Ceiling: `{ $ceil: 4.2 }` → `5`
- `$floor` - Floor: `{ $floor: 4.8 }` → `4`
- `$max` - Maximum: `{ $max: [1, 5, 3] }` → `5`
- `$min` - Minimum: `{ $min: [1, 5, 3] }` → `1`
- `$toFixed` - Fixed decimals: `{ $toFixed: [3.14159, 2] }` → `"3.14"`

### String Operators
- `$toString` - Convert to string: `{ $toString: 123 }` → `"123"`
- `$toUpper` - Uppercase: `{ $toUpper: "hello" }` → `"HELLO"`
- `$toLower` - Lowercase: `{ $toLower: "HELLO" }` → `"hello"`
- `$concat` - Concatenate: `{ $concat: ["Hello", " ", "World"] }` → `"Hello World"`
- `$substr` - Substring: `{ $substr: ["Hello", 1, 3] }` → `"ell"`
- `$slice` - Slice array/string: `{ $slice: ["Hello", 0, 2] }` → `"He"`
- `$split` - Split string: `{ $split: ["a,b,c", ","] }` → `["a", "b", "c"]`
- `$size` - Get length: `{ $size: "Hello" }` → `5`

### Comparison Operators
- `$eq` - Equal: `{ $eq: [5, 5] }` → `true`
- `$gt` - Greater than: `{ $gt: [10, 5] }` → `true`
- `$gte` - Greater than or equal: `{ $gte: [5, 5] }` → `true`
- `$lt` - Less than: `{ $lt: [3, 5] }` → `true`
- `$lte` - Less than or equal: `{ $lte: [5, 5] }` → `true`

### Conditional Operators
- `$cond` - If-then-else logic
- `$switch` - Multi-branch conditional
- `$ifNull` - Null coalescing: `{ $ifNull: [null, "default"] }` → `"default"`

### Type Conversion
- `$toNumber` - Convert to number: `{ $toNumber: "123" }` → `123`
- `$toString` - Convert to string: `{ $toString: 123 }` → `"123"`

### Date Operators
- `$dateDiff` - Calculate date differences

### Utility Operators
- `$regex` - Regular expression matching

## 🌟 Advanced Examples

### E-commerce Order Processing
```typescript
const orderData = {
  items: [
    { name: "Laptop", price: 999.99, quantity: 1 },
    { name: "Mouse", price: 29.99, quantity: 2 }
  ],
  customer: { 
    name: "john doe", 
    tier: "premium",
    country: "US" 
  },
  discount: 0.1
};

const blueprint = {
  customerName: { $toUpper: "$customer.name" },
  itemCount: { $size: "$items" },
  subtotal: { 
    $add: [
      { $multiply: ["$items.0.price", "$items.0.quantity"] },
      { $multiply: ["$items.1.price", "$items.1.quantity"] }
    ]
  },
  discountAmount: {
    $cond: {
      if: { $eq: ["$customer.tier", "premium"] },
      then: { $multiply: [
        { $add: [
          { $multiply: ["$items.0.price", "$items.0.quantity"] },
          { $multiply: ["$items.1.price", "$items.1.quantity"] }
        ]},
        "$discount"
      ]},
      else: 0
    }
  },
  shippingCost: {
    $switch: {
      branches: [
        { case: { $eq: ["$customer.country", "US"] }, then: 5.99 },
        { case: { $eq: ["$customer.country", "CA"] }, then: 7.99 }
      ],
      default: 12.99
    }
  }
};
```

### API Response Transformation
```typescript
const apiResponse = {
  user_id: 12345,
  first_name: "jane",
  last_name: "smith",
  email_address: "jane.smith@example.com",
  account_balance: "1250.75",
  is_verified: true,
  created_at: "2024-01-15T10:30:00Z"
};

const blueprint = {
  id: "$user_id",
  fullName: { 
    $concat: [
      { $toUpper: { $substr: ["$first_name", 0, 1] } },
      { $substr: ["$first_name", 1] },
      " ",
      { $toUpper: { $substr: ["$last_name", 0, 1] } },
      { $substr: ["$last_name", 1] }
    ]
  },
  email: "$email_address",
  balance: {
    amount: { $toNumber: "$account_balance" },
    formatted: { $concat: ["$", "$account_balance"] }
  },
  status: {
    $cond: {
      if: "$is_verified",
      then: "Verified User",
      else: "Pending Verification"
    }
  },
  memberSince: "$created_at"
};
```

## 🛠️ Development

### Prerequisites
- Node.js 16+
- pnpm, npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/DMBerlin/json-forgefy.git
cd json-forgefy

# Install dependencies
pnpm install

# Run tests
pnpm test

# Build the project
pnpm build

# Run linting
pnpm lint
```

### Testing
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:cov
```

## 📖 API Reference

### `forgefy(payload, projection)`

The main transformation function.

**Parameters:**
- `payload` (Record<string, any>): The source object to transform
- `projection` (Projection): The blueprint object defining the transformation

**Returns:**
- `Record<string, any>`: The transformed object

**Example:**
```typescript
const result = forgefy(sourceData, transformationBlueprint);
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

## 📞 Support

- 🐛 [Report Issues](https://github.com/DMBerlin/json-forgefy/issues)
- 💬 [Discussions](https://github.com/DMBerlin/json-forgefy/discussions)
- 📧 [Email Support](mailto:your-email@example.com)

---

Made with ❤️ by [Daniel Marinho](https://github.com/DMBerlin)