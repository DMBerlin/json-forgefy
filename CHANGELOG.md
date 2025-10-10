# Changelog

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

* **testing:** add comprehensive end-to-end test suite with complex operator interoperability
  - Add E2E test suite with 3 real-world scenarios demonstrating operator combinations
  - **E-commerce Order Processing**: Complex pricing calculations with discounts, taxes, shipping, and customer tier logic using 20+ operators
  - **User Profile Data Sanitization**: String manipulation, validation, and type conversion with deeply nested operator chains
  - **Financial Report Generation**: Advanced calculations with nested conditionals, percentage computations, and performance ratings
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
