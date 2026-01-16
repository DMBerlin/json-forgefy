# CLAUDE.md - Project Context & Agent Memory

## 🧠 Core Identity & Protocol
You are an advanced AI engineering partner utilizing specialized personas to deliver enterprise-grade software. 
**Current Context:** JSON Forgefy - A TypeScript library for transforming JSON data using MongoDB-style operators
**Tech Stack:** TypeScript, Node.js, Jest, Zero Runtime Dependencies

## 🚦 Operational Rules
1.  **Memory First:** Always check this file and the `docs/` folder for architectural decisions before suggesting major changes.
2.  **Persona Adoption:** You must adopt one of the three specialist personas below based on the task type.
3.  **Update Protocol:** If we learn a new lesson, fix a recurring bug, or make an architectural decision, YOU must propose an update to this `CLAUDE.md` file to preserve that memory for future sessions.

## 🎭 Persona Activation
*Load the relevant skill file when performing these specific tasks:*

| Task Type | Persona | File to Read |
| :--- | :--- | :--- |
| **Requirements, Scope, User Stories, Roadmapping** | Principal Product Manager | `SKILLS_PRODUCT_MANAGER.md` |
| **Coding, Architecture, Refactoring, Debugging** | Principal Software Engineer | `SKILLS_SOFTWARE_DEVELOPER.md` |
| **Testing, Edge Cases, Validation, Pre-flight** | Principal QA Engineer | `SKILLS_QA.md` |

## 🛠️ Quick Commands
- **@PM**: "Read `SKILLS_PRODUCT_MANAGER.md` and act as the PM to review this request."
- **@DEV**: "Read `SKILLS_SOFTWARE_DEVELOPER.md` and act as the Principal Dev to implement this."
- **@QA**: "Read `SKILLS_QA.md` and act as the QA to critique this solution."

## 📝 Project Memory (Lessons Learned)
*Append new critical context here as the project evolves.*

### Architecture Decisions
- **Singleton Pattern**: Operators are registered in a singleton registry to avoid circular dependencies between array operators and resolve-expression
- **Immutable Operators**: Each operator is a pure function that doesn't mutate input data (except the core forgefy function which mutates the projection)
- **Zero Dependencies**: The library has zero runtime dependencies - this is a core principle
- **100% Test Coverage**: All code must maintain 100% test coverage (branches, functions, lines, statements)
- **Path Extraction**: Use `$` prefix for extracting values from nested objects (e.g., `"$user.name"`)

### Known Limitations
- **Nested Array Operators**: Cannot nest `$map`, `$filter`, `$reduce` within object properties due to circular module dependencies. Workaround: Use at expression root level
- **Projection Mutation**: The `forgefy()` function modifies the projection object in place rather than creating a new object

### Testing Standards
- Jest with ts-jest for testing
- Coverage thresholds: 100% for all metrics (branches, functions, lines, statements)
- Test files use `.spec.ts` suffix
- Path aliases configured: `@/`, `@core/`, `@operators/`, `@helpers/`, `@common/`, `@interfaces/`, `@lib-types/`

## 🎯 Future EPICs (Opportunities for Implementation)

### EPIC 1: Custom Operators API
**Problem**: Users cannot extend the library with their own custom operators
**Value**: Enable domain-specific transformations without modifying library code
**Scope**:
- Public API to register custom operators: `Forgefy.registerOperator(name, implementation)`
- Type-safe operator registration with TypeScript generics
- Validation for operator name conflicts
- Documentation and examples for creating custom operators
- Ability to unregister/override operators
**Acceptance Criteria**:
- Users can register custom operators that work seamlessly with built-in operators
- Custom operators support execution context (`$current`, `$index`, `$accumulated`)
- Type definitions are generated for custom operators
- Examples folder contains working custom operator implementations

### EPIC 2: Immutable Transformations
**Problem**: The `forgefy()` function mutates the projection object in place
**Value**: Safer transformations that don't have side effects, better for functional programming patterns
**Scope**:
- Add optional `immutable: boolean` parameter to `Forgefy.this()`
- Deep clone projection before transformation when immutable mode is enabled
- Performance optimization: only clone when necessary
- Update documentation to explain mutable vs immutable modes
**Acceptance Criteria**:
- Original projection object is not modified when `immutable: true`
- Performance impact is minimal (< 10% overhead for typical use cases)
- All existing tests pass in both modes
- Documentation clearly explains trade-offs

### EPIC 3: Enhanced Error Messages
**Problem**: Error messages don't include context about where in the blueprint the error occurred
**Value**: Faster debugging of complex transformation blueprints
**Scope**:
- Track path through blueprint during transformation (e.g., `"user.profile.name"`)
- Include path in error messages: `"Error at path 'user.profile.name': ..."`
- Add optional `debug: boolean` mode for verbose error output
- Stack trace enhancement for operator errors
**Acceptance Criteria**:
- All operator errors include the blueprint path where the error occurred
- Error messages are clear and actionable
- Debug mode provides detailed execution trace
- No performance impact when debug mode is disabled

### EPIC 4: Async Operators Support
**Problem**: Cannot perform async operations (API calls, database queries) within transformations
**Value**: Enable data enrichment from external sources during transformation
**Scope**:
- Create `Forgefy.thisAsync()` method that returns a Promise
- Support async operators (e.g., `$fetch`, `$lookup`)
- Parallel execution of independent async operations
- Error handling for async failures
- Timeout support for async operations
**Acceptance Criteria**:
- Async operators can be mixed with sync operators
- Independent async operations execute in parallel
- Proper error handling and timeout support
- Documentation includes async transformation examples
- Backward compatibility: existing sync API unchanged

### EPIC 5: Blueprint Schema Validation
**Problem**: Invalid blueprints fail at runtime, not at definition time
**Value**: Catch blueprint errors early, better IDE support
**Scope**:
- JSON Schema or Zod schema for blueprint validation
- `Forgefy.validate(blueprint)` method
- Optional runtime validation mode
- TypeScript type inference from blueprints
- IDE autocomplete for operator parameters
**Acceptance Criteria**:
- Blueprints can be validated before execution
- Validation errors are clear and specific
- TypeScript provides autocomplete for all operators
- Minimal performance impact when validation is disabled
- Documentation includes validation examples

### EPIC 6: Performance Optimizations
**Problem**: Complex blueprints are re-parsed on every execution
**Value**: Faster transformations for repeated use cases
**Scope**:
- Blueprint compilation/caching system
- `Forgefy.compile(blueprint)` returns reusable transformer
- Operator result memoization for pure operations
- Benchmark suite to measure performance improvements
- Performance documentation and best practices
**Acceptance Criteria**:
- Compiled blueprints execute 2-5x faster than non-compiled
- Memory usage remains reasonable (< 2x increase)
- Benchmark suite tracks performance across versions
- Documentation includes performance tuning guide

### EPIC 7: Streaming Support
**Problem**: Large arrays must be fully loaded into memory
**Value**: Process large datasets efficiently with constant memory usage
**Scope**:
- `Forgefy.stream()` method for streaming transformations
- Support for Node.js streams and async iterators
- Streaming versions of array operators (`$map`, `$filter`, `$reduce`)
- Backpressure handling
- Progress callbacks for long-running transformations
**Acceptance Criteria**:
- Can process arrays larger than available memory
- Memory usage remains constant regardless of input size
- Compatible with Node.js stream ecosystem
- Documentation includes streaming examples
- Performance comparable to in-memory processing for small datasets

### EPIC 8: Debug Mode & Execution Tracing
**Problem**: Difficult to understand how complex blueprints are executed
**Value**: Easier debugging and learning for complex transformations
**Scope**:
- `Forgefy.debug(payload, blueprint)` returns execution trace
- Step-by-step execution log with intermediate values
- Visual blueprint execution tree
- Performance profiling per operator
- Integration with browser DevTools
**Acceptance Criteria**:
- Execution trace shows all operator calls and results
- Performance profiling identifies slow operators
- Visual tree representation of blueprint execution
- Documentation includes debugging guide
- Zero performance impact when debug mode is disabled

### EPIC 9: Missing Date Operators
**Problem**: `$year`, `$month`, `$isLeapYear` are in types but not implemented
**Value**: Complete date manipulation capabilities
**Scope**:
- Implement `$year` operator (extract year from date)
- Implement `$month` operator (extract month from date, 1-12)
- Implement `$isLeapYear` operator (check if year is leap year)
- Add comprehensive tests for all date operators
- Update documentation with date operator examples
**Acceptance Criteria**:
- All date operators in type definitions are implemented
- 100% test coverage for new operators
- Documentation includes examples for all date operators
- Consistent behavior with existing date operators

### EPIC 10: Blueprint Composition & Reusability
**Problem**: Cannot compose or extend blueprints, leading to duplication
**Value**: DRY principle for transformation blueprints
**Scope**:
- `Forgefy.extend(baseBlueprint, extensions)` method
- `Forgefy.merge(blueprint1, blueprint2)` method
- Blueprint fragments/partials support
- Operator aliasing (e.g., `$plus` as alias for `$add`)
- Blueprint inheritance and overrides
**Acceptance Criteria**:
- Blueprints can be composed from smaller blueprints
- Extensions override base blueprint properties
- Merge combines blueprints without mutation
- Documentation includes composition patterns and examples
- Type safety maintained for composed blueprints

---

## 📋 EPIC Selection Guide
When starting a new feature, reference the EPIC number and title:
- **Example**: "Let's implement EPIC 1: Custom Operators API"
- **Example**: "I want to work on EPIC 3: Enhanced Error Messages"

Each EPIC should follow the spec-driven development workflow:
1. Create requirements.md with user stories and acceptance criteria
2. Create design.md with architecture and correctness properties
3. Create tasks.md with implementation checklist
4. Execute tasks incrementally with testing