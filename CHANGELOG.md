# Changelog

## [4.0.1](https://github.com/DMBerlin/json-forgefy/compare/v4.0.0...v4.0.1) (2025-11-19)

### 🛡 Security

- Addressed advisory regarding `glob` CLI command injection via `-c/--cmd` by ensuring our dependency graph resolves to a patched `glob` version. While this project does not invoke the `glob` CLI directly, some tools in the dev toolchain can bring `glob` transitively. We updated/bounded dependencies to avoid vulnerable ranges (`glob >=10.2.0 <10.5.0` and `glob >=11.0.0 <11.1.0`). This prevents the presence of the vulnerable CLI in CI or local environments.

### 🧰 Maintenance

- Bumped development dependencies to versions that resolve `glob` to a fixed release (`>= 11.1.0`).
- Updated metadata and release configuration in preparation for publishing.

> Note: No public API changes. This is a patch release focused on the supply‑chain hardening of development tooling.

## [4.0.0](https://github.com/DMBerlin/json-forgefy/compare/v3.2.0...v4.0.0) (2025-10-17)

### 🎉 Major Release: Array Transformation & Date Operations

This major release introduces powerful array transformation operators and comprehensive date handling capabilities, bringing json-forgefy to feature parity with MongoDB's aggregation pipeline for common use cases.

### ⚠ BREAKING CHANGES

* **operators:** Array operators (`$map`, `$filter`, `$reduce`) have a documented limitation - they cannot be nested within object properties due to JavaScript module circular dependencies. Use them at expression root level instead. See README for workarounds.

### ✨ Features

#### **Array Transformation Operators**
* **$map**: Transform each element in an array with expressions
  - Full execution context support (`$current`, `$index`)
  - Complex nested expressions ($cond, $switch, math operators)
  - Fallback support for error handling
  - 43 comprehensive tests, 100% coverage
  
* **$filter**: Filter array elements based on conditions
  - Support for complex conditions ($and, $or, $cond)
  - Execution context variables (`$current`, `$index`)
  - 41 tests covering all scenarios
  
* **$reduce**: Aggregate array to single value
  - Full context support (`$accumulated`, `$current`, `$index`)
  - Complex aggregations with $switch, $cond
  - 48 tests including real-world use cases

#### **Array Utility Operators**
* **$arrayFirst**: Get first array element with fallback
* **$arrayLast**: Get last array element with fallback
* **$arrayAt**: Get element at index (supports negative indexing)
* **$sum**: Sum numeric array values (filters non-numeric)
* **$avg**: Calculate average of numeric values (filters non-numeric)
  - Total: 230 tests across 5 utility operators

#### **Date Operations**
* **$toDate**: Convert and validate dates (ISO-8601, timestamps, Date objects)
* **$dayOfWeek**: Extract day of week (0-6, Sunday-Saturday)
* **$dayOfMonth**: Extract day of month (1-31)
* **$dayOfYear**: Extract day of year (1-366, leap year aware)
* **$isWeekend**: Check if date is weekend (customizable weekends)
* **$isHoliday**: Check if date is in holiday list
* **$addDays**: Add/subtract days from date
* **$dateShift**: Shift date to next/previous business day
  - Strategies: rollForward, rollBackward, keep
  - Holiday and custom weekend support
  - DST-aware with timezone support

#### **Advanced Math**
* **$mod**: Modulo/remainder operation
* **$pow**: Power/exponentiation
* **$sqrt**: Square root with fallback for negative numbers
* **$trunc**: Truncate to integer

#### **Enhanced String Operations**
* **$ltrim**: Trim characters from start
* **$rtrim**: Trim characters from end
* **$indexOf**: Find substring index
* **$replaceOne**: Replace first occurrence
* **$replaceAll**: Replace all occurrences

#### **Type Checking**
* **$type**: Get type name with comprehensive JavaScript type support
  - Detects all 11 JavaScript types (string, number, boolean, bigint, symbol, null, undefined, array, object, date, function)
  - Clarifies JSON-compatible types vs runtime-only types
  - Added 8 new tests for complete type coverage
* **$isArray**: Validate array type
* **$isString**: Validate string type
* **$isBoolean**: Validate boolean type
* **$isDate**: Validate date type

### 🏗️ Architecture

#### **Validation Helper System**
* Created `array-validation.helper.ts` with 5 reusable validation functions
* Eliminated 148 lines of duplicate validation code across operators
* Comprehensive 91-test suite for validation helpers
* All array operators now use centralized validation

#### **DRY Principles & Helper Functions**
* **`hasFallback()`** - Type-safe helper for fallback validation
  - Updated 10 operators with single-line validation
  - Added 6 comprehensive test cases
* **`isObjectWithProperty()`** - Type guard for single property validation
  - Updated 6 operators to eliminate verbose validation
  - Added 5 test suites with 13 test cases
* **`isObjectWithProperties()`** - Multi-property validation
  - Reuses `isObjectWithProperty()` for DRY implementation
  - Added 7 test suites with 17 test cases

#### **Constants & Type Safety**
* **`UNIX_TIMESTAMP_THRESHOLD`** - Scientific notation (1e10) for timestamp parsing
* **`DateShiftStrategy`** - Const object pattern over enums
  - Zero runtime overhead, tree-shakeable
  - Follows gts naming convention (UPPER_SNAKE_CASE)
  - Exported from public API
  - Values: ROLL_FORWARD, ROLL_BACKWARD, KEEP

#### **Domain-Specific Error Handling**
* Replace generic errors with `OperatorInputError` in 12 operators
  - Math: $mod, $pow, $sqrt, $trunc
  - String: $indexOf, $ltrim, $rtrim, $replaceOne, $replaceAll
  - Date: $dateShift, $isHoliday, $dateDiff
* Structured error data with operator name and input as properties
* Cleaner error messages without duplication

#### **Fallback System**
* Universal fallback support across math, array, and date operators
* Fallback can be static values, path references, or expressions
* Graceful error handling with descriptive error messages

#### **Infrastructure**
* Timezone helpers with Intl.DateTimeFormat caching
* Date validation helpers (parseDate, formatDateISO, isLeapYear)
* Business day helpers (reused across date operators)
* Custom error types for better debugging

#### **Playground**
* Interactive browser playground with 77 operators documented
* API reference extracted from JSDoc comments
* Organized by 8 categories with params, returns, and examples

#### **Documentation**
* **`GUIDE.md`** - Comprehensive MongoDB-style API reference
  - All 77 operators documented with detailed examples
  - Machine-parsable structure for playground integration
  - Organized by categories with parameter specs and return types
  - Realistic use cases and best practices
  - Can be used to programmatically populate playground API reference

### 📊 Statistics

* **+26 new operators** (from 51 in v3.2.0 to 77 in v4.0.0)
  - +8 array operators with 408 tests
  - +9 date operators with extensive coverage
  - +9 enhanced operators (math, string, type checking)
* **1745 tests passing** (6 skipped for documented limitations)
* **+556 new tests** in v4.0.0 (from 1189 in v3.2.0)
* **17 operators refactored** for better code quality
* **3 new helper functions** (hasFallback, isObjectWithProperty, isObjectWithProperties)
* **44 new helper tests** for validation functions
* **100% code coverage** maintained across all metrics
* **Zero dependencies** - pure JavaScript/TypeScript

### 🧪 Testing

* Added 500+ new tests across all new operators
* Maintained 100% coverage requirement
* All operators follow consistent testing patterns
* Performance tested with 1000+ element arrays

### 📚 Documentation

* Updated README with all new operators
* Collapsible examples using HTML details tags
* Documented array operator limitations with workarounds
* Added fallback system documentation
* Enhanced operator reference tables

### 🎯 Migration from v3.x

No breaking changes to existing operators. All v3.x code continues to work.

**New capabilities:**
- Array transformations with `$map`, `$filter`, `$reduce`
- Array utilities for element access and aggregation
- Comprehensive date operations
- Enhanced math, string, and type operators

---

## [3.2.0](https://github.com/DMBerlin/json-forgefy/compare/v3.1.0...v3.2.0) (2025-10-11)

### Features

* **operators:** add `$none` logical operator for checking all conditions are falsy
  - Add `$none` operator that returns true only if ALL expressions evaluate to false (are falsy)
  - Inverse of `$or` operator - checks that no conditions are met
  - Perfect for validation scenarios: checking for absence of errors, restrictions, or issues
  - Uses short-circuit evaluation for performance optimization
  - Add comprehensive unit tests with 60+ test cases covering edge cases and boolean coercion
  - Add extensive e2e tests with 5 real-world scenarios:
    - **System Health Monitoring**: Validate no errors, warnings, or resource issues
    - **User Permission Validation**: Check for absence of admin rights and restrictions
    - **Order Processing**: Combine with `$every`, `$some`, and `$and` for complex validation
    - **Security Checks**: Detect absence of threats and malicious patterns
    - **Complex Negation Patterns**: Advanced security validation with nested operators
  - Register operator in main operator registry with proper type definitions
  - Update documentation with examples and use cases

### Documentation

* **readme:** add `$none` operator to logical operators reference table
  - Include operator description, example usage, and expected output
  - Position alongside other logical operators (`$and`, `$or`, `$not`)

### Testing

* **e2e:** add comprehensive end-to-end tests for `$none` operator interoperability
  - Test combinations with `$and`, `$or`, `$not`, `$every`, `$some`
  - Test integration with `$cond`, `$switch` conditional operators
  - Test with `$exists`, `$eq`, `$gt`, `$gte` comparison operators
  - Validate real-world use cases: health checks, permissions, security, order validation

## [3.0.0](https://github.com/DMBerlin/json-forgefy/compare/v2.1.0...v3.0.0) (2025-10-10)

### ⚠ BREAKING CHANGES

* **core:** refactor expression resolution architecture for improved consistency
  - Restructure `resolveExpression` to handle operator execution more uniformly
  - All operators now follow a consistent pattern for argument resolution
  - Operators receive pre-resolved arguments, simplifying operator implementations
  - This change may affect custom operator implementations or advanced usage patterns

### Features

* **operators:** add new utility operators for enhanced data manipulation
  - Add `$coalesce` operator for returning the first non-null value from a list
  - Add `$every` operator for checking if all conditions in an array are truthy
  - Add `$some` operator for checking if at least one condition in an array is truthy
  - Add `$isNaN` operator for checking if a value is NaN (Not-a-Number)
  - Add `$isNumber` operator for validating numeric values
  - Add `$round` operator for rounding numbers with configurable precision
  - Add `$trim` operator for trimming custom characters from strings (not just whitespace)
  - Add `$regexReplace` operator for regex-based string replacement with pattern matching
    - Support full regex patterns for complex transformations (e.g., normalize multiple spaces with `\s+`)
    - Include optional flags parameter for case-insensitive and multiline matching
    - Enable advanced text processing: whitespace normalization, HTML tag removal, phone number cleaning
    - Provide comprehensive unit tests with 60+ test cases covering edge cases and real-world scenarios
    - Add extensive e2e tests demonstrating interoperability with other string, conditional, and validation operators

* **testing:** add comprehensive end-to-end test suite with complex operator interoperability
  - Add E2E test suite with 4 real-world scenarios demonstrating operator combinations
  - **E-commerce Order Processing**: Complex pricing calculations with discounts, taxes, shipping, and customer tier logic using 20+ operators
  - **User Profile Data Sanitization**: String manipulation, validation, and type conversion with deeply nested operator chains
  - **Financial Report Generation**: Advanced calculations with nested conditionals, percentage computations, and performance ratings
  - **Text Processing with RegexReplace**: Advanced regex-based text sanitization combining `$regexReplace` with string, conditional, and validation operators
  - Include practical PIX debt transaction transformation example
  - Validate recursive operator resolution (DFS bottom-up) with multiple nesting levels
  - Test operators working together: arithmetic, string, logical, comparison, conditional, validation, and date operators
  - Demonstrate real-world use cases: data transformation, validation, sanitization, and complex business logic

* **playground:** add browser playground for testing and experimentation
  - Create browser-based playground environment
  - Add build configuration for browser compatibility
  - Enable interactive testing of json-forgefy in the browser

* **documentation:** add comprehensive generated documentation
  - Add detailed architecture transformation documentation
  - Include operator consistency guidelines
  - Add implementation status reports and analysis
  - Document coverage achievements and improvements

### Improvements

* **core:** significantly improve operator consistency and maintainability
  - Refactor all operators to follow uniform implementation patterns
  - Simplify operator logic by moving argument resolution to core
  - Improve type safety across all operator implementations
  - Enhance error handling and edge case coverage

* **operators:** update existing operators for consistency
  - Refactor `$and`, `$or`, `$not` logical operators for uniform behavior
  - Update `$eq`, `$ne`, `$gt`, `$gte`, `$lt`, `$lte` comparison operators
  - Improve `$in`, `$nin` membership operators with better expression handling
  - Enhance `$cond`, `$switch`, `$ifNull` conditional operators
  - Optimize `$divide`, `$multiply` arithmetic operators
  - Standardize `$exists`, `$isNull` validation operators

* **testing:** achieve and maintain 100% test coverage across the codebase
  - Add comprehensive unit tests for all operators (374 total tests)
  - Add tests for helper functions and utilities
  - Include edge case and error scenario coverage
  - Add tests for `date-time.helper`, `is-operator.helper`, and `is-valid-object-path.helper`
  - Update `is-valid-object-path.helper` tests to reflect corrected path validation behavior

* **build:** improve package distribution and configuration
  - Add `.npmignore` file for cleaner npm package distribution
  - Exclude test files, documentation, and development artifacts from published package
  - Optimize package size for faster installation

### Bug Fixes

* **core:** fix critical path validation bug in nested operator expressions
  - Fix `isValidObjectPath` to reject single `"$"` character as invalid path
  - Prevent `"$"` in arrays from being incorrectly resolved as path reference
  - Ensure proper validation requires at least one character after `"$"` symbol
  - Resolves issue where operators like `$replace` with `"$"` in `searchValues` would fail with undefined values

* **core:** fix expression resolution edge cases
  - Fix handling of nested expressions in array contexts
  - Improve null/undefined handling in path resolution
  - Fix operator detection for edge cases

### Refactoring

* **tests:** convert integration tests to focused unit tests
  - Refactor test suite to emphasize unit testing over integration
  - Improve test isolation and maintainability
  - Reduce test execution time and complexity

### Chore

* **dependencies:** upgrade TypeScript ESLint packages for TypeScript 5.9 compatibility
  - Upgrade `@typescript-eslint/eslint-plugin` from v6.21.0 to v8.18.1
  - Upgrade `@typescript-eslint/parser` from v6.21.0 to v8.18.1
  - Resolve TypeScript 5.9 compatibility warnings
  - Ensure full support for latest TypeScript features and syntax

* **types:** improve type definitions for better TypeScript 5.9 compatibility
  - Update `CondOperatorInput.if` from `Expression` to `ExpressionValues` to accept resolved primitive values
  - Update `SwitchOperatorInput.branches[].case` from `Expression` to `ExpressionValues`
  - Update `IfNullOperatorInput` to accept `ExpressionValues` for more flexible type handling
  - Update `SizeOperatorInput` from `number[]` to `unknown[]` to support mixed-type arrays
  - Simplify `DivideOperatorInput` from `Array<number | Expression>` to `number[]` for consistency
  - Align type definitions with operator architecture where values are pre-resolved

* **config:** update ESLint configuration for playground
  - Add dedicated ESLint config for playground environment
  - Ensure consistent code quality across all project areas

* **version:** bump version to 3.0.0 for major release
  - Update package.json to reflect breaking changes
  - Prepare for npm publication

## [2.1.0](https://github.com/DMBerlin/json-forgefy/compare/v2.0.1...v2.1.0) (2025-10-09)

### Features

* **operators:** add `$replace` operator for multiple string replacements
  - Add `$replace` operator that follows String.prototype.replace() pattern but accepts array of search values
  - Support replacing multiple different characters in a single operation (e.g., clean CPF by removing dots and dashes)
  - Include proper regex escaping for special characters to ensure safe literal string replacement
  - Add comprehensive test coverage with 9 test cases covering edge cases and special regex characters
  - Register operator in main operator registry with lexicographic ordering
  - Update documentation with practical examples and usage patterns

### Improvements

* **codebase:** improve code organization and maintainability
  - Reorder `OperatorKey` type in lexicographic order for better organization
  - Reorder operators map in `forgefy.operators.ts` to match lexicographic order
  - Enhance code readability and maintainability for future operator additions

### Documentation

* **readme:** update documentation to include new `$replace` operator
  - Add `$replace` operator to String Operations section with example and result
  - Include practical CPF cleaning example in Quick Start section
  - Add `$replace` usage in Data Validation & Sanitization pattern
  - Update output examples to showcase the new operator functionality

## [1.11.0](https://www.github.com/DMBerlin/json-forgefy/compare/v1.9.0...v1.10.0) (2025-09-24)

### Features

* **documentation:** completely overhaul README with user-friendly, product-focused content
  - Add compelling value proposition and problem-solving focus
  - Include comprehensive real-world use cases and examples
  - Add detailed operator reference with practical examples
  - Create common patterns and best practices section
  - Center documentation around pnpm as primary package manager
* **ci/cd:** enhance GitHub Actions workflows with pnpm support
  - Update all workflows to use pnpm instead of npm
  - Add comprehensive CI pipeline with lint, test, and build stages
  - Integrate Codecov for coverage reporting
  - Add build artifact uploads for better CI visibility
* **release:** improve automated release process
  - Move Release Please configuration to package.json for cleaner setup
  - Add npm publishing automation with proper authentication
  - Enhance release workflow with better error handling and permissions
  - Add release scripts for manual release management
* **dependencies:** add comprehensive Dependabot integration
  - Configure automated dependency updates with smart grouping
  - Add security-focused updates with daily scanning
  - Implement auto-merge for safe minor/patch updates
  - Add manual review requirement for major updates
  - Protect critical dependencies from breaking changes
* **tooling:** update project configuration for better developer experience
  - Fix Husky v10 compatibility warnings
  - Add release-please as dev dependency
  - Update package.json scripts to use pnpm consistently
  - Improve project structure and configuration management

### Improvements

* **developer experience:** significantly improve project setup and maintenance
  - Streamlined release process with automated npm publishing
  - Better dependency management with intelligent auto-updates
  - Enhanced CI/CD pipeline with comprehensive testing
  - Cleaner configuration with single-source-of-truth approach
* **documentation:** transform technical documentation into user-focused content
  - Clear problem-solving approach with real-world examples
  - Comprehensive operator reference with practical use cases
  - Better onboarding experience for new users
  - Professional presentation suitable for npm package listing

### Technical Debt

* **configuration:** consolidate configuration files for better maintainability
  - Move Release Please config from separate file to package.json
  - Remove deprecated Husky configuration files
  - Standardize on pnpm across all tooling and documentation
  - Improve project structure and file organization

## [1.10.0](https://www.github.com/DMBerlin/json-forgefy/compare/v1.9.0...v1.10.0) (2025-08-24)

### Features

* **operators:** add comprehensive MongoDB-style logical operators
  - Add `$and` operator for logical AND operations with support for nested expressions
  - Add `$or` operator for logical OR operations with support for nested expressions  
  - Add `$not` operator for logical NOT operations with support for nested expressions
* **operators:** add advanced comparison and membership operators
  - Add `$ne` (not equal) operator for inequality comparisons
  - Add `$in` operator for array membership checks with expression support in both value and array elements
  - Add `$nin` (not in) operator for negative array membership checks with expression support in both value and array elements
* **operators:** add field existence and null checking operators
  - Add `$exists` operator for checking field existence in objects
  - Add `$isNull` operator for null value checking
* **operators:** register previously implemented comparison operators
  - Register `$gt`, `$gte`, `$lt`, `$lte` comparison operators in main operator registry
  - Register `$regex` pattern matching operator in main operator registry
* **core:** enhance expression resolution in array elements
  - Update `$in` and `$nin` operators to resolve expressions within array elements
  - Improve `resolvePathOrExpression` handling for complex nested scenarios
  - Add robust null/undefined handling in `getValueByPath` and `isOperator` helpers
  - Implement path aliases for better readability in nested paths
* **testing:** add comprehensive test coverage for all new operators
  - Add 296+ test cases covering edge cases, nested expressions, and complex scenarios
  - Achieve 99.45% statement coverage and 98.83% branch coverage
  - Add specific tests for expression resolution within array elements

### Bug Fixes

* **core:** fix null/undefined handling in helper functions
  - Fix `TypeError` in `getValueByPath` when accessing properties of null/undefined objects
  - Fix `TypeError` in `isOperator` when checking null/undefined inputs
  - Improve error handling in `$exists` operator for non-existent nested paths

## [1.9.0](https://www.github.com/DMBerlin/json-forgefy/compare/v1.8.0...v1.9.0) (2024-08-08)


### Features

* update packages from outdated releases ([#50](https://www.github.com/DMBerlin/json-forgefy/issues/50)) ([13cb955](https://www.github.com/DMBerlin/json-forgefy/commit/13cb955c74d3f9986846ff6f909aa2d5ef986794))

## [1.8.0](https://www.github.com/DMBerlin/json-forgefy/compare/v1.7.0...v1.8.0) (2024-08-06)


### Features

* **operator:** add regex operator ([#48](https://www.github.com/DMBerlin/json-forgefy/issues/48)) ([a4c67dd](https://www.github.com/DMBerlin/json-forgefy/commit/a4c67dded97aae0ec334c8c59fd52704ab17d288))

## [1.7.0](https://www.github.com/DMBerlin/json-forgefy/compare/v1.6.1...v1.7.0) (2024-06-15)


### Features

* update lint packages ([#45](https://www.github.com/DMBerlin/json-forgefy/issues/45)) ([889ab7e](https://www.github.com/DMBerlin/json-forgefy/commit/889ab7e920f775dbaeb8addcd48e9776785a845c))

### [1.6.1](https://www.github.com/DMBerlin/json-forgefy/compare/v1.6.0...v1.6.1) (2024-06-15)


### Bug Fixes

* date diff testing on invalid date inputs ([#44](https://www.github.com/DMBerlin/json-forgefy/issues/44)) ([933739a](https://www.github.com/DMBerlin/json-forgefy/commit/933739a3af25bc0d229606dd7b615d8c382da22b))

## [1.6.0](https://www.github.com/DMBerlin/json-forgefy/compare/v1.5.0...v1.6.0) (2024-06-10)


### Features

* update testing pipeline ([#42](https://www.github.com/DMBerlin/json-forgefy/issues/42)) ([163e2b0](https://www.github.com/DMBerlin/json-forgefy/commit/163e2b0bd8d6c81d9938cd6e7afb8db0d4b9cbfb))

## [1.5.0](https://www.github.com/DMBerlin/json-forgefy/compare/v1.4.0...v1.5.0) (2024-06-09)


### Features

* add code linting workflow ([#30](https://www.github.com/DMBerlin/json-forgefy/issues/30)) ([c0b7d07](https://www.github.com/DMBerlin/json-forgefy/commit/c0b7d07b5ecd4449661d28cf15b0f823e44bad52))
* add release please ([#18](https://www.github.com/DMBerlin/json-forgefy/issues/18)) ([64cd1f9](https://www.github.com/DMBerlin/json-forgefy/commit/64cd1f9046da4c2d505ee3c71420c34ca47ce68f))

## [1.3.0](https://github.com/DMBerlin/json-forgefy/compare/v1.2.0...v1.3.0) (2024-06-05)


### Features

* add code linting workflow ([#30](https://github.com/DMBerlin/json-forgefy/issues/30)) ([c0b7d07](https://github.com/DMBerlin/json-forgefy/commit/c0b7d07b5ecd4449661d28cf15b0f823e44bad52))

## [1.2.0](https://github.com/DMBerlin/json-forgefy/compare/v1.1.0...v1.2.0) (2024-06-05)


### Features

* add release please ([#18](https://github.com/DMBerlin/json-forgefy/issues/18)) ([64cd1f9](https://github.com/DMBerlin/json-forgefy/commit/64cd1f9046da4c2d505ee3c71420c34ca47ce68f))
