# Changelog

## [1.11.0](https://github.com/DMBerlin/json-forgefy/compare/v1.10.0...v1.11.0) (2025-09-12)


### Features

* improve readme and automation ([#53](https://github.com/DMBerlin/json-forgefy/issues/53)) ([8f7fda5](https://github.com/DMBerlin/json-forgefy/commit/8f7fda5377506635da2363ae25b97fe325ace9cb))

## [Unreleased]

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
