/**
 * @fileoverview JSON Forgefy - A powerful TypeScript library for transforming JSON objects
 * using MongoDB-inspired operators and projection blueprints.
 *
 * This library provides a declarative way to transform data structures by defining
 * transformation blueprints that can include:
 * - Path extraction using $ notation (e.g., "$user.name")
 * - Mathematical operators (e.g., $add, $multiply, $subtract)
 * - String operations (e.g., $concat, $toUpper, $substr)
 * - Conditional logic (e.g., $cond, $switch)
 * - Type conversions (e.g., $toString, $toNumber)
 * - And many more operators inspired by MongoDB's aggregation pipeline
 *
 * @author Daniel Marinho
 * @version 3.0.0
 * @license ISC
 */

import { forgefy } from "@core/forgefy.core";

/**
 * The main transformation function exported by the json-forgefy library.
 *
 * @example
 * ```typescript
 * import { Forgefy } from 'json-forgefy';
 *
 * const payload = { user: { name: "John" }, amount: "100" };
 * const blueprint = {
 *   userName: "$user.name",
 *   total: { $toNumber: "$amount" }
 * };
 *
 * const result = Forgefy.this(payload, blueprint);
 * // Result: { userName: "John", total: 100 }
 * ```
 */

const Forgefy = {
  this: forgefy,
};

export { Forgefy };
