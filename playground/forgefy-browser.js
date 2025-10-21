"use strict";
var ForgefyBundle = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/singletons/operators.singleton.js
  var require_operators_singleton = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/singletons/operators.singleton.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.operatorRegistry = void 0;
      var _OperatorRegistry = class _OperatorRegistry {
        constructor() {
          __publicField(this, "registry", /* @__PURE__ */ new Map());
        }
        static getInstance() {
          if (!_OperatorRegistry.instance) {
            _OperatorRegistry.instance = new _OperatorRegistry();
          }
          return _OperatorRegistry.instance;
        }
        register(key, operator) {
          this.registry.set(key, operator);
          return this;
        }
        get(key) {
          return this.registry.get(key);
        }
        has(key) {
          return this.registry.has(key);
        }
        keys() {
          return this.registry.keys();
        }
      };
      __publicField(_OperatorRegistry, "instance", null);
      var OperatorRegistry = _OperatorRegistry;
      exports.operatorRegistry = OperatorRegistry.getInstance();
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/to-string.operator.js
  var require_to_string_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/to-string.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$toString = void 0;
      var $toString = () => {
        return function(value) {
          return String(value);
        };
      };
      exports.$toString = $toString;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/to-upper.operator.js
  var require_to_upper_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/to-upper.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$toUpper = void 0;
      var $toUpper = () => {
        return function(value) {
          return value.toUpperCase();
        };
      };
      exports.$toUpper = $toUpper;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/to-lower.operator.js
  var require_to_lower_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/to-lower.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$toLower = void 0;
      var $toLower = () => {
        return function(value) {
          return value.toLowerCase();
        };
      };
      exports.$toLower = $toLower;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/substr.operator.js
  var require_substr_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/substr.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$substr = void 0;
      var $substr = () => {
        return function(params) {
          return params.value.substring(params.start, params.start + params.length);
        };
      };
      exports.$substr = $substr;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/concat.operator.js
  var require_concat_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/concat.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$concat = void 0;
      var $concat = () => {
        return function(value) {
          return value.reduce((accumulator, base) => accumulator + base, "");
        };
      };
      exports.$concat = $concat;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/slice.operator.js
  var require_slice_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/slice.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$slice = void 0;
      var $slice = () => {
        return function(params) {
          return params.input.slice(params.start, params.end);
        };
      };
      exports.$slice = $slice;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/split.operator.js
  var require_split_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/split.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$split = void 0;
      var $split = () => {
        return function(params) {
          return params.input.split(params.delimiter);
        };
      };
      exports.$split = $split;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/size.operator.js
  var require_size_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/size.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$size = void 0;
      var $size = () => {
        return function(values) {
          return values.length;
        };
      };
      exports.$size = $size;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/replace.operator.js
  var require_replace_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/replace.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$replace = void 0;
      var $replace = () => {
        return function(params) {
          let result = params.input;
          for (const searchValue of params.searchValues) {
            const regex = new RegExp(escapeRegExp(searchValue), "g");
            result = result.replace(regex, params.replacement);
          }
          return result;
        };
      };
      exports.$replace = $replace;
      function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/regex-replace.operator.js
  var require_regex_replace_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/regex-replace.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$regexReplace = void 0;
      var $regexReplace = () => {
        return function(params) {
          const { input, pattern, replacement, flags = "g" } = params;
          const regex = new RegExp(pattern, flags);
          return input.replace(regex, replacement);
        };
      };
      exports.$regexReplace = $regexReplace;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/trim.operator.js
  var require_trim_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/trim.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$trim = void 0;
      var $trim = () => {
        return function(params) {
          const { input, chars = [" ", "	", "\n", "\r"] } = params;
          let result = input;
          for (const char of chars) {
            const regex = new RegExp(`^${escapeRegExp(char)}+|${escapeRegExp(char)}+$`, "g");
            result = result.replace(regex, "");
          }
          return result;
        };
      };
      exports.$trim = $trim;
      function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/common/get-value-by-path.common.js
  var require_get_value_by_path_common = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/common/get-value-by-path.common.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getValueByPath = getValueByPath;
      function getValueByPath(source, path) {
        return path.at(0) === "$" ? path.slice(1).split(".").reduce((obj, key) => obj === null || obj === void 0 ? void 0 : obj[key], source) : void 0;
      }
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/common/resolve-execution-context.common.js
  var require_resolve_execution_context_common = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/common/resolve-execution-context.common.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.augmentSourceWithContext = augmentSourceWithContext;
      function augmentSourceWithContext(source, executionContext) {
        if (!executionContext) {
          return source;
        }
        return __spreadValues(__spreadValues(__spreadValues(__spreadValues({}, source), executionContext.$current !== void 0 && {
          current: executionContext.$current
        }), executionContext.$accumulated !== void 0 && {
          accumulated: executionContext.$accumulated
        }), executionContext.$index !== void 0 && {
          index: executionContext.$index
        });
      }
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/common/resolve-value.common.js
  var require_resolve_value_common = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/common/resolve-value.common.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.resolveValue = resolveValue;
      var get_value_by_path_common_1 = require_get_value_by_path_common();
      var resolve_execution_context_common_1 = require_resolve_execution_context_common();
      var is_valid_object_path_helper_1 = require_is_valid_object_path_helper();
      function resolveValue(value, source, executionContext) {
        if (value === null || value === void 0) {
          return value;
        }
        if (typeof value === "string") {
          if ((0, is_valid_object_path_helper_1.isValidObjectPath)(value)) {
            const augmentedSource = (0, resolve_execution_context_common_1.augmentSourceWithContext)(source, executionContext);
            return (0, get_value_by_path_common_1.getValueByPath)(augmentedSource, value);
          }
          return value;
        }
        if (Array.isArray(value)) {
          return value.map((item) => resolveValue(item, source, executionContext));
        }
        if (typeof value === "object") {
          const resolved = {};
          for (const [key, val] of Object.entries(value)) {
            resolved[key] = resolveValue(val, source, executionContext);
          }
          return resolved;
        }
        return value;
      }
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/types/error.types.js
  var require_error_types = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/types/error.types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MalformedOperatorParametersError = exports.MissingOperatorParameterError = exports.ArrayOperatorInputError = exports.UnknownOperatorError = exports.InvalidStrategyError = exports.TimestampRangeError = exports.InvalidDateFormatError = exports.InvalidWeekendError = exports.InvalidHolidayError = exports.MaxIterationsError = exports.OperatorInputError = exports.TimezoneValidationError = exports.DateValidationError = void 0;
      var ForgefyError = class extends Error {
        constructor(message, errorClass) {
          super(message);
          this.name = this.constructor.name;
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, errorClass);
          }
        }
      };
      var DateValidationError = class _DateValidationError extends ForgefyError {
        constructor(message, input) {
          super(message, _DateValidationError);
          __publicField(this, "input");
          this.input = input;
        }
      };
      exports.DateValidationError = DateValidationError;
      var TimezoneValidationError = class _TimezoneValidationError extends ForgefyError {
        constructor(message, timezone) {
          super(message, _TimezoneValidationError);
          __publicField(this, "timezone");
          this.timezone = timezone;
        }
      };
      exports.TimezoneValidationError = TimezoneValidationError;
      var OperatorInputError = class _OperatorInputError extends ForgefyError {
        constructor(message, operator, input) {
          super(message, _OperatorInputError);
          __publicField(this, "operator");
          __publicField(this, "input");
          this.operator = operator;
          this.input = input;
        }
      };
      exports.OperatorInputError = OperatorInputError;
      var MaxIterationsError = class _MaxIterationsError extends ForgefyError {
        constructor(message, iterations) {
          super(message, _MaxIterationsError);
          __publicField(this, "iterations");
          this.iterations = iterations;
        }
      };
      exports.MaxIterationsError = MaxIterationsError;
      var InvalidHolidayError = class _InvalidHolidayError extends ForgefyError {
        constructor(message, holiday) {
          super(message, _InvalidHolidayError);
          __publicField(this, "holiday");
          this.holiday = holiday;
        }
      };
      exports.InvalidHolidayError = InvalidHolidayError;
      var InvalidWeekendError = class _InvalidWeekendError extends ForgefyError {
        constructor(message, weekends) {
          super(message, _InvalidWeekendError);
          __publicField(this, "weekends");
          this.weekends = weekends;
        }
      };
      exports.InvalidWeekendError = InvalidWeekendError;
      var InvalidDateFormatError = class _InvalidDateFormatError extends ForgefyError {
        constructor(message, input) {
          super(message, _InvalidDateFormatError);
          __publicField(this, "input");
          this.input = input;
        }
      };
      exports.InvalidDateFormatError = InvalidDateFormatError;
      var TimestampRangeError = class _TimestampRangeError extends ForgefyError {
        constructor(message, timestamp) {
          super(message, _TimestampRangeError);
          __publicField(this, "timestamp");
          this.timestamp = timestamp;
        }
      };
      exports.TimestampRangeError = TimestampRangeError;
      var InvalidStrategyError = class _InvalidStrategyError extends ForgefyError {
        constructor(message, strategy, validStrategies) {
          super(message, _InvalidStrategyError);
          __publicField(this, "strategy");
          __publicField(this, "validStrategies");
          this.strategy = strategy;
          this.validStrategies = validStrategies;
        }
      };
      exports.InvalidStrategyError = InvalidStrategyError;
      var UnknownOperatorError = class _UnknownOperatorError extends ForgefyError {
        constructor(operatorKey, availableOperators) {
          super(`Unknown operator: ${operatorKey}${availableOperators ? `. Available operators: ${availableOperators.length} registered` : ""}`, _UnknownOperatorError);
          __publicField(this, "operatorKey");
          __publicField(this, "availableOperators");
          this.operatorKey = operatorKey;
          this.availableOperators = availableOperators;
        }
      };
      exports.UnknownOperatorError = UnknownOperatorError;
      var ArrayOperatorInputError = class _ArrayOperatorInputError extends ForgefyError {
        constructor(operatorName, receivedType, receivedValue) {
          super(`${operatorName} 'input' must be an array, received ${receivedType}`, _ArrayOperatorInputError);
          __publicField(this, "operatorName");
          __publicField(this, "receivedType");
          __publicField(this, "receivedValue");
          this.operatorName = operatorName;
          this.receivedType = receivedType;
          this.receivedValue = receivedValue;
        }
      };
      exports.ArrayOperatorInputError = ArrayOperatorInputError;
      var MissingOperatorParameterError = class _MissingOperatorParameterError extends ForgefyError {
        constructor(operatorName, missingParameter, requiredParameters) {
          super(`${operatorName} requires '${missingParameter}' to be defined. Required: ${requiredParameters.join(", ")}`, _MissingOperatorParameterError);
          __publicField(this, "operatorName");
          __publicField(this, "missingParameter");
          __publicField(this, "requiredParameters");
          this.operatorName = operatorName;
          this.missingParameter = missingParameter;
          this.requiredParameters = requiredParameters;
        }
      };
      exports.MissingOperatorParameterError = MissingOperatorParameterError;
      var MalformedOperatorParametersError = class _MalformedOperatorParametersError extends ForgefyError {
        constructor(operatorName, expectedFormat, receivedValue) {
          super(`${operatorName} requires ${expectedFormat}, received ${typeof receivedValue}`, _MalformedOperatorParametersError);
          __publicField(this, "operatorName");
          __publicField(this, "expectedFormat");
          __publicField(this, "receivedValue");
          this.operatorName = operatorName;
          this.expectedFormat = expectedFormat;
          this.receivedValue = receivedValue;
        }
      };
      exports.MalformedOperatorParametersError = MalformedOperatorParametersError;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/helpers/is-operator.helper.js
  var require_is_operator_helper = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/helpers/is-operator.helper.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isOperator = isOperator;
      var forgefy_operators_1 = require_forgefy_operators();
      function isOperator(obj) {
        if (!obj || typeof obj !== "object") {
          return false;
        }
        const keys = Object.keys(obj);
        return keys.length === 1 && keys[0].startsWith("$") && forgefy_operators_1.operatorRegistry.has(keys[0]);
      }
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/common/resolve-args.common.js
  var require_resolve_args_common = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/common/resolve-args.common.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.resolveArgs = resolveArgs;
      var resolve_value_common_1 = require_resolve_value_common();
      var is_operator_helper_1 = require_is_operator_helper();
      function resolveArgs(args, source, executionContext, expressionResolver) {
        if (args === null || args === void 0) {
          return args;
        }
        if (Array.isArray(args)) {
          return args.map((item) => resolveArgs(item, source, executionContext, expressionResolver));
        }
        if (typeof args === "object") {
          if ((0, is_operator_helper_1.isOperator)(args)) {
            if (expressionResolver) {
              return expressionResolver(source, args, executionContext);
            }
            return args;
          }
          const resolved = {};
          for (const [key, val] of Object.entries(args)) {
            resolved[key] = resolveArgs(val, source, executionContext, expressionResolver);
          }
          return resolved;
        }
        return (0, resolve_value_common_1.resolveValue)(args, source, executionContext);
      }
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/common/resolve-expression.common.js
  var require_resolve_expression_common = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/common/resolve-expression.common.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.resolveExpression = resolveExpression;
      var operators_singleton_1 = require_operators_singleton();
      var error_types_1 = require_error_types();
      var resolve_args_common_1 = require_resolve_args_common();
      function resolveExpression(source, expression, executionContext = { context: source }) {
        try {
          if (typeof expression !== "object" || expression === null) {
            return expression;
          }
          if (Array.isArray(expression)) {
            return expression.map((item) => resolveExpression(source, item, executionContext));
          }
          const keys = Object.keys(expression);
          if (keys.length !== 1) {
            throw new Error(`Expression must have exactly one operator key, found ${keys.length}`);
          }
          const key = keys[0];
          const operator = operators_singleton_1.operatorRegistry.get(key);
          if (!operator) {
            throw new error_types_1.UnknownOperatorError(key, Array.from(operators_singleton_1.operatorRegistry.keys()));
          }
          const resolvedArgs = (0, resolve_args_common_1.resolveArgs)(expression[key], source, executionContext, resolveExpression);
          return operator(executionContext)(resolvedArgs);
        } catch (e) {
          return null;
        }
      }
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/helpers/fallback.helper.js
  var require_fallback_helper = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/helpers/fallback.helper.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.hasFallback = hasFallback;
      exports.resolveFallback = resolveFallback;
      var resolve_value_common_1 = require_resolve_value_common();
      var resolve_expression_common_1 = require_resolve_expression_common();
      var is_operator_helper_1 = require_is_operator_helper();
      function hasFallback(params) {
        return Boolean(params && typeof params === "object" && params.fallback !== void 0);
      }
      function resolveFallback(fallback, payload, error) {
        if (fallback === void 0) {
          throw error;
        }
        if (typeof fallback === "object" && fallback !== null && (0, is_operator_helper_1.isOperator)(fallback)) {
          return (0, resolve_expression_common_1.resolveExpression)(payload, fallback, { context: payload });
        }
        return (0, resolve_value_common_1.resolveValue)(fallback, payload, { context: payload });
      }
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/ltrim.operator.js
  var require_ltrim_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/ltrim.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$ltrim = void 0;
      var fallback_helper_1 = require_fallback_helper();
      var error_types_1 = require_error_types();
      var $ltrim = (ctx) => {
        const payload = (ctx == null ? void 0 : ctx.context) || {};
        return function(params) {
          try {
            const { input, chars = [" ", "	", "\n", "\r"] } = params;
            if (typeof input !== "string") {
              throw new error_types_1.OperatorInputError(`Expects a string input, received ${typeof input}`, "$ltrim", params);
            }
            let result = input;
            const charsPattern = chars.map(escapeRegExp).join("");
            const regex = new RegExp(`^[${charsPattern}]+`);
            result = result.replace(regex, "");
            return result;
          } catch (error) {
            return (0, fallback_helper_1.resolveFallback)(params.fallback, payload, error instanceof Error ? error : new Error(String(error)));
          }
        };
      };
      exports.$ltrim = $ltrim;
      function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/rtrim.operator.js
  var require_rtrim_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/rtrim.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$rtrim = void 0;
      var fallback_helper_1 = require_fallback_helper();
      var error_types_1 = require_error_types();
      var $rtrim = (ctx) => {
        const payload = (ctx == null ? void 0 : ctx.context) || {};
        return function(params) {
          try {
            const { input, chars = [" ", "	", "\n", "\r"] } = params;
            if (typeof input !== "string") {
              throw new error_types_1.OperatorInputError(`Expects a string input, received ${typeof input}`, "$rtrim", params);
            }
            let result = input;
            const charsPattern = chars.map(escapeRegExp).join("");
            const regex = new RegExp(`[${charsPattern}]+$`);
            result = result.replace(regex, "");
            return result;
          } catch (error) {
            return (0, fallback_helper_1.resolveFallback)(params.fallback, payload, error instanceof Error ? error : new Error(String(error)));
          }
        };
      };
      exports.$rtrim = $rtrim;
      function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/index-of.operator.js
  var require_index_of_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/index-of.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$indexOf = void 0;
      var fallback_helper_1 = require_fallback_helper();
      var error_types_1 = require_error_types();
      var $indexOf = (ctx) => {
        const payload = (ctx == null ? void 0 : ctx.context) || {};
        return function(params) {
          try {
            const { input, substring, start = 0 } = params;
            if (typeof input !== "string") {
              throw new error_types_1.OperatorInputError(`Expects a string input, received ${typeof input}`, "$indexOf", params);
            }
            if (typeof substring !== "string") {
              throw new error_types_1.OperatorInputError(`Expects a string substring, received ${typeof substring}`, "$indexOf", params);
            }
            return input.indexOf(substring, start);
          } catch (error) {
            return (0, fallback_helper_1.resolveFallback)(params.fallback, payload, error instanceof Error ? error : new Error(String(error)));
          }
        };
      };
      exports.$indexOf = $indexOf;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/replace-one.operator.js
  var require_replace_one_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/replace-one.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$replaceOne = void 0;
      var fallback_helper_1 = require_fallback_helper();
      var error_types_1 = require_error_types();
      var $replaceOne = (ctx) => {
        const payload = (ctx == null ? void 0 : ctx.context) || {};
        return function(params) {
          try {
            const { input, search, replacement } = params;
            if (typeof input !== "string") {
              throw new error_types_1.OperatorInputError(`Expects a string input, received ${typeof input}`, "$replaceOne", params);
            }
            if (typeof search !== "string") {
              throw new error_types_1.OperatorInputError(`Expects a string search, received ${typeof search}`, "$replaceOne", params);
            }
            if (typeof replacement !== "string") {
              throw new error_types_1.OperatorInputError(`Expects a string replacement, received ${typeof replacement}`, "$replaceOne", params);
            }
            return input.replace(search, replacement);
          } catch (error) {
            return (0, fallback_helper_1.resolveFallback)(params.fallback, payload, error instanceof Error ? error : new Error(String(error)));
          }
        };
      };
      exports.$replaceOne = $replaceOne;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/replace-all.operator.js
  var require_replace_all_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/string/replace-all.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$replaceAll = void 0;
      var fallback_helper_1 = require_fallback_helper();
      var error_types_1 = require_error_types();
      var $replaceAll = (ctx) => {
        const payload = (ctx == null ? void 0 : ctx.context) || {};
        return function(params) {
          try {
            const { input, search, replacement } = params;
            if (typeof input !== "string") {
              throw new error_types_1.OperatorInputError(`Expects a string input, received ${typeof input}`, "$replaceAll", params);
            }
            if (typeof search !== "string") {
              throw new error_types_1.OperatorInputError(`Expects a string search, received ${typeof search}`, "$replaceAll", params);
            }
            if (typeof replacement !== "string") {
              throw new error_types_1.OperatorInputError(`Expects a string replacement, received ${typeof replacement}`, "$replaceAll", params);
            }
            if (typeof String.prototype.replaceAll === "function") {
              return input.replaceAll(search, replacement);
            } else {
              return input.split(search).join(replacement);
            }
          } catch (error) {
            return (0, fallback_helper_1.resolveFallback)(params.fallback, payload, error instanceof Error ? error : new Error(String(error)));
          }
        };
      };
      exports.$replaceAll = $replaceAll;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/multiply.operator.js
  var require_multiply_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/multiply.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$multiply = void 0;
      var $multiply = () => {
        return function(values) {
          return values.reduce((accumulator, base) => accumulator * base);
        };
      };
      exports.$multiply = $multiply;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/subtract.operator.js
  var require_subtract_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/subtract.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$subtract = void 0;
      var $subtract = () => {
        return function(values) {
          return values.reduce((accumulator, base) => accumulator - base);
        };
      };
      exports.$subtract = $subtract;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/divide.operator.js
  var require_divide_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/divide.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$divide = void 0;
      var $divide = () => {
        return function(values) {
          return values.reduce((accumulator, base) => accumulator / base);
        };
      };
      exports.$divide = $divide;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/add.operator.js
  var require_add_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/add.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$add = void 0;
      var $add = () => {
        return function(value) {
          return value.reduce((accumulator, base) => accumulator + base, 0);
        };
      };
      exports.$add = $add;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/abs.operator.js
  var require_abs_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/abs.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$abs = void 0;
      var $abs = () => {
        return function(value) {
          return Math.abs(value);
        };
      };
      exports.$abs = $abs;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/ceil.operator.js
  var require_ceil_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/ceil.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$ceil = void 0;
      var $ceil = () => {
        return function(value) {
          return Math.ceil(value);
        };
      };
      exports.$ceil = $ceil;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/floor.operator.js
  var require_floor_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/floor.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$floor = void 0;
      var $floor = () => {
        return function(value) {
          return Math.floor(value);
        };
      };
      exports.$floor = $floor;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/max.operator.js
  var require_max_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/max.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$max = void 0;
      var $max = () => {
        return function(values) {
          return Math.max(...values);
        };
      };
      exports.$max = $max;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/min.operator.js
  var require_min_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/min.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$min = void 0;
      var $min = () => {
        return function(values) {
          return Math.min(...values);
        };
      };
      exports.$min = $min;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/to-fixed.operator.js
  var require_to_fixed_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/to-fixed.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$toFixed = void 0;
      var $toFixed = () => {
        return function(input) {
          if (typeof input.value !== "number")
            return input.value;
          const rule = new RegExp("^-?\\d+(?:.\\d{0," + (input.precision || -1) + "})?");
          return Number(input.value.toString().match(rule)[0]);
        };
      };
      exports.$toFixed = $toFixed;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/round.operator.js
  var require_round_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/round.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$round = void 0;
      var $round = () => {
        return function(params) {
          const { value, precision = 0 } = params;
          const factor = Math.pow(10, precision);
          return Math.round(value * factor) / factor;
        };
      };
      exports.$round = $round;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/mod.operator.js
  var require_mod_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/mod.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$mod = void 0;
      var fallback_helper_1 = require_fallback_helper();
      var error_types_1 = require_error_types();
      var $mod = (ctx) => {
        const payload = (ctx == null ? void 0 : ctx.context) || {};
        return function(input) {
          try {
            const { dividend, divisor } = input;
            if (typeof dividend !== "number" || typeof divisor !== "number") {
              throw new error_types_1.OperatorInputError(`Requires numeric dividend and divisor, got dividend: ${typeof dividend}, divisor: ${typeof divisor}`, "$mod", input);
            }
            if (divisor === 0) {
              throw new error_types_1.OperatorInputError("Division by zero", "$mod", input);
            }
            return dividend % divisor;
          } catch (error) {
            return (0, fallback_helper_1.resolveFallback)(input.fallback, payload, error instanceof Error ? error : new Error(String(error)));
          }
        };
      };
      exports.$mod = $mod;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/pow.operator.js
  var require_pow_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/pow.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$pow = void 0;
      var fallback_helper_1 = require_fallback_helper();
      var error_types_1 = require_error_types();
      var $pow = (ctx) => {
        const payload = (ctx == null ? void 0 : ctx.context) || {};
        return function(input) {
          try {
            const { base, exponent } = input;
            if (typeof base !== "number" || typeof exponent !== "number") {
              throw new error_types_1.OperatorInputError(`Requires numeric base and exponent, got base: ${typeof base}, exponent: ${typeof exponent}`, "$pow", input);
            }
            const result = Math.pow(base, exponent);
            if (isNaN(result)) {
              throw new error_types_1.OperatorInputError(`Resulted in NaN (base: ${base}, exponent: ${exponent})`, "$pow", input);
            }
            return result;
          } catch (error) {
            return (0, fallback_helper_1.resolveFallback)(input.fallback, payload, error instanceof Error ? error : new Error(String(error)));
          }
        };
      };
      exports.$pow = $pow;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/sqrt.operator.js
  var require_sqrt_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/sqrt.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$sqrt = void 0;
      var fallback_helper_1 = require_fallback_helper();
      var error_types_1 = require_error_types();
      var $sqrt = (ctx) => {
        const payload = (ctx == null ? void 0 : ctx.context) || {};
        return function(input) {
          try {
            const { value } = input;
            if (typeof value !== "number") {
              throw new error_types_1.OperatorInputError(`Requires a numeric value, got ${typeof value}`, "$sqrt", input);
            }
            if (value < 0) {
              throw new error_types_1.OperatorInputError(`Cannot calculate square root of negative number: ${value}`, "$sqrt", input);
            }
            return Math.sqrt(value);
          } catch (error) {
            return (0, fallback_helper_1.resolveFallback)(input.fallback, payload, error instanceof Error ? error : new Error(String(error)));
          }
        };
      };
      exports.$sqrt = $sqrt;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/trunc.operator.js
  var require_trunc_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/math/trunc.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$trunc = void 0;
      var fallback_helper_1 = require_fallback_helper();
      var error_types_1 = require_error_types();
      var $trunc = (ctx) => {
        const payload = (ctx == null ? void 0 : ctx.context) || {};
        return function(input) {
          try {
            const { value } = input;
            if (typeof value !== "number") {
              throw new error_types_1.OperatorInputError(`Requires a numeric value, got ${typeof value}`, "$trunc", input);
            }
            return Math.trunc(value);
          } catch (error) {
            return (0, fallback_helper_1.resolveFallback)(input.fallback, payload, error instanceof Error ? error : new Error(String(error)));
          }
        };
      };
      exports.$trunc = $trunc;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/conditional/if-null.operator.js
  var require_if_null_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/conditional/if-null.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$ifNull = void 0;
      var $ifNull = () => {
        return function(values) {
          var _a;
          return (_a = values[0]) != null ? _a : values[1];
        };
      };
      exports.$ifNull = $ifNull;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/conditional/switch.operator.js
  var require_switch_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/conditional/switch.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$switch = void 0;
      var $switch = () => {
        return function(value) {
          for (const branch of value.branches) {
            if (branch.case)
              return branch.then;
          }
          return value.default;
        };
      };
      exports.$switch = $switch;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/conditional/cond.operator.js
  var require_cond_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/conditional/cond.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$cond = void 0;
      var $cond = () => {
        return function(value) {
          return value.if ? value.then : value.else;
        };
      };
      exports.$cond = $cond;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/conditional/coalesce.operator.js
  var require_coalesce_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/conditional/coalesce.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$coalesce = void 0;
      var $coalesce = () => {
        return function(values) {
          for (const value of values) {
            if (value !== null && value !== void 0) {
              return value;
            }
          }
          return null;
        };
      };
      exports.$coalesce = $coalesce;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/conditional/every.operator.js
  var require_every_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/conditional/every.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$every = void 0;
      var $every = () => {
        return function(value) {
          const allConditionsMet = value.conditions.every((condition) => Boolean(condition));
          return allConditionsMet ? value.then : value.else;
        };
      };
      exports.$every = $every;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/conditional/some.operator.js
  var require_some_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/conditional/some.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$some = void 0;
      var $some = () => {
        return function(value) {
          const anyConditionMet = value.conditions.some((condition) => Boolean(condition));
          return anyConditionMet ? value.then : value.else;
        };
      };
      exports.$some = $some;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/comparison/eq.operator.js
  var require_eq_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/comparison/eq.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$eq = void 0;
      var $eq = () => {
        return function(values) {
          return values[0] === values[1];
        };
      };
      exports.$eq = $eq;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/comparison/gt.operator.js
  var require_gt_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/comparison/gt.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$gt = void 0;
      var $gt = () => {
        return function(value) {
          const [firstValue, secondValue] = value;
          return firstValue > secondValue;
        };
      };
      exports.$gt = $gt;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/comparison/gte.operator.js
  var require_gte_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/comparison/gte.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$gte = void 0;
      var $gte = () => {
        return function(value) {
          const [firstValue, secondValue] = value;
          return firstValue >= secondValue;
        };
      };
      exports.$gte = $gte;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/comparison/lt.operator.js
  var require_lt_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/comparison/lt.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$lt = void 0;
      var $lt = () => {
        return function(value) {
          const [firstValue, secondValue] = value;
          return firstValue < secondValue;
        };
      };
      exports.$lt = $lt;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/comparison/lte.operator.js
  var require_lte_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/comparison/lte.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$lte = void 0;
      var $lte = () => {
        return function(value) {
          const [firstValue, secondValue] = value;
          return firstValue <= secondValue;
        };
      };
      exports.$lte = $lte;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/comparison/regex.operator.js
  var require_regex_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/comparison/regex.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$regex = void 0;
      var $regex = () => {
        return function(value) {
          const regexPattern = new RegExp(value.pattern);
          return regexPattern.test(value.value);
        };
      };
      exports.$regex = $regex;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/comparison/ne.operator.js
  var require_ne_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/comparison/ne.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$ne = void 0;
      var $ne = () => {
        return function(value) {
          const [firstValue, secondValue] = value;
          return firstValue !== secondValue;
        };
      };
      exports.$ne = $ne;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/comparison/in.operator.js
  var require_in_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/comparison/in.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$in = void 0;
      var $in = () => {
        return function(value) {
          const [targetValue, arrayValues] = value;
          if (!Array.isArray(arrayValues)) {
            return false;
          }
          return arrayValues.includes(targetValue);
        };
      };
      exports.$in = $in;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/comparison/nin.operator.js
  var require_nin_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/comparison/nin.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$nin = void 0;
      var $nin = () => {
        return function(value) {
          const [targetValue, arrayValues] = value;
          if (!Array.isArray(arrayValues)) {
            return true;
          }
          return !arrayValues.includes(targetValue);
        };
      };
      exports.$nin = $nin;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/logical/and.operator.js
  var require_and_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/logical/and.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$and = void 0;
      var $and = () => {
        return function(expressions) {
          if (expressions.length === 0) {
            return true;
          }
          for (const expression of expressions) {
            if (!expression) {
              return false;
            }
          }
          return true;
        };
      };
      exports.$and = $and;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/logical/or.operator.js
  var require_or_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/logical/or.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$or = void 0;
      var $or = () => {
        return function(expressions) {
          if (expressions.length === 0) {
            return false;
          }
          for (const expression of expressions) {
            if (expression) {
              return true;
            }
          }
          return false;
        };
      };
      exports.$or = $or;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/logical/not.operator.js
  var require_not_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/logical/not.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$not = void 0;
      var $not = () => {
        return function(expression) {
          return !expression;
        };
      };
      exports.$not = $not;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/logical/none.operator.js
  var require_none_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/logical/none.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$none = void 0;
      var $none = () => {
        return function(expressions) {
          if (expressions.length === 0) {
            return true;
          }
          for (const expression of expressions) {
            if (expression) {
              return false;
            }
          }
          return true;
        };
      };
      exports.$none = $none;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/type/to-number.operator.js
  var require_to_number_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/type/to-number.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$toNumber = void 0;
      var $toNumber = () => {
        return function(value) {
          return Number(value);
        };
      };
      exports.$toNumber = $toNumber;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/type/exists.operator.js
  var require_exists_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/type/exists.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$exists = void 0;
      var $exists = (ctx) => {
        return function(fieldPath) {
          if (!(ctx == null ? void 0 : ctx.context)) {
            return false;
          }
          const pathString = typeof fieldPath === "string" ? fieldPath : String(fieldPath);
          const cleanPath = pathString.startsWith("$") ? pathString.slice(1) : pathString;
          try {
            const pathParts = cleanPath.split(".");
            let current = ctx.context;
            for (const part of pathParts) {
              if (current === null || current === void 0 || typeof current !== "object") {
                return false;
              }
              if (!(part in current)) {
                return false;
              }
              current = current[part];
            }
            return true;
          } catch (e) {
            return false;
          }
        };
      };
      exports.$exists = $exists;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/type/is-null.operator.js
  var require_is_null_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/type/is-null.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$isNull = void 0;
      var $isNull = () => {
        return function(expression) {
          return expression === null || expression === void 0;
        };
      };
      exports.$isNull = $isNull;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/type/is-number.operator.js
  var require_is_number_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/type/is-number.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$isNumber = void 0;
      var $isNumber = () => {
        return function(value) {
          return typeof value === "number" && !isNaN(value);
        };
      };
      exports.$isNumber = $isNumber;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/type/is-nan.operator.js
  var require_is_nan_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/type/is-nan.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$isNaN = void 0;
      var $isNaN = () => {
        return function(value) {
          return isNaN(Number(value));
        };
      };
      exports.$isNaN = $isNaN;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/type/type.operator.js
  var require_type_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/type/type.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$type = void 0;
      var $type = () => {
        return function(value) {
          if (value === null) {
            return "null";
          }
          if (value === void 0) {
            return "undefined";
          }
          if (Array.isArray(value)) {
            return "array";
          }
          if (value instanceof Date) {
            return "date";
          }
          return typeof value;
        };
      };
      exports.$type = $type;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/type/is-array.operator.js
  var require_is_array_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/type/is-array.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$isArray = void 0;
      var $isArray = () => {
        return function(value) {
          return Array.isArray(value);
        };
      };
      exports.$isArray = $isArray;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/type/is-string.operator.js
  var require_is_string_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/type/is-string.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$isString = void 0;
      var $isString = () => {
        return function(value) {
          return typeof value === "string";
        };
      };
      exports.$isString = $isString;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/type/is-boolean.operator.js
  var require_is_boolean_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/type/is-boolean.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$isBoolean = void 0;
      var $isBoolean = () => {
        return function(value) {
          return typeof value === "boolean";
        };
      };
      exports.$isBoolean = $isBoolean;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/type/is-date.operator.js
  var require_is_date_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/type/is-date.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$isDate = void 0;
      var $isDate = () => {
        return function(value) {
          if (value instanceof Date) {
            return !isNaN(value.getTime());
          }
          if (typeof value === "string") {
            const date = new Date(value);
            return !isNaN(date.getTime());
          }
          return false;
        };
      };
      exports.$isDate = $isDate;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/helpers/timezone.helper.js
  var require_timezone_helper = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/helpers/timezone.helper.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.normalizeHour = normalizeHour;
      exports.isValidTimezone = isValidTimezone;
      exports.getDateInTimezone = getDateInTimezone;
      exports.createDateInTimezone = createDateInTimezone;
      exports.getTimezoneOffset = getTimezoneOffset;
      exports.clearFormatterCache = clearFormatterCache;
      var date_time_helper_1 = require_date_time_helper();
      var formatterCache = /* @__PURE__ */ new Map();
      function getFormatter(timezone) {
        if (!formatterCache.has(timezone)) {
          const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone: timezone,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            weekday: "short"
          });
          formatterCache.set(timezone, formatter);
        }
        return formatterCache.get(timezone);
      }
      function normalizeHour(hour) {
        return hour === 24 ? 0 : hour;
      }
      function isValidTimezone(timezone) {
        try {
          Intl.DateTimeFormat(void 0, { timeZone: timezone });
          return true;
        } catch (e) {
          return false;
        }
      }
      function getDateInTimezone(date, timezone) {
        const formatter = getFormatter(timezone);
        const parts = formatter.formatToParts(date);
        const values = {};
        for (const part of parts) {
          if (part.type !== "literal") {
            values[part.type] = part.value;
          }
        }
        const dayOfWeekMap = {
          Sun: 0,
          Mon: 1,
          Tue: 2,
          Wed: 3,
          Thu: 4,
          Fri: 5,
          Sat: 6
        };
        return {
          year: parseInt(values.year, 10),
          month: parseInt(values.month, 10),
          day: parseInt(values.day, 10),
          hour: normalizeHour(parseInt(values.hour, 10)),
          minute: parseInt(values.minute, 10),
          second: parseInt(values.second, 10),
          dayOfWeek: dayOfWeekMap[values.weekday]
        };
      }
      function createDateInTimezone(year, month, day, timezone) {
        const utcDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
        const components = getDateInTimezone(utcDate, timezone);
        const hourDiff = components.hour;
        const minuteDiff = components.minute;
        const secondDiff = components.second;
        const adjustedDate = new Date(utcDate.getTime() - hourDiff * date_time_helper_1.MS_PER_HOUR - minuteDiff * date_time_helper_1.MS_PER_MINUTE - secondDiff * date_time_helper_1.MS_PER_SECOND);
        const verifyComponents = getDateInTimezone(adjustedDate, timezone);
        if (verifyComponents.year !== year || verifyComponents.month !== month || verifyComponents.day !== day) {
          const targetDate = new Date(year, month - 1, day);
          const actualDate = new Date(verifyComponents.year, verifyComponents.month - 1, verifyComponents.day);
          const daysDiff = Math.round((targetDate.getTime() - actualDate.getTime()) / date_time_helper_1.MS_PER_DAY);
          return new Date(adjustedDate.getTime() + daysDiff * date_time_helper_1.MS_PER_DAY);
        }
        return adjustedDate;
      }
      function getTimezoneOffset(date, timezone) {
        const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
        const tzDate = new Date(date.toLocaleString("en-US", { timeZone: timezone }));
        return tzDate.getTime() - utcDate.getTime();
      }
      function clearFormatterCache() {
        formatterCache.clear();
      }
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/helpers/date-time.helper.js
  var require_date_time_helper = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/helpers/date-time.helper.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.UNIX_TIMESTAMP_THRESHOLD = exports.MAX_DATE_VALUE = exports.MS_PER_DAY = exports.MS_PER_HOUR = exports.MS_PER_MINUTE = exports.MS_PER_SECOND = void 0;
      exports.isValidDateString = isValidDateString;
      exports.isDirectDateInput = isDirectDateInput;
      exports.parseDate = parseDate;
      exports.formatDateISO = formatDateISO;
      exports.isValidCalendarDate = isValidCalendarDate;
      exports.isLeapYear = isLeapYear;
      exports.getDayOfYear = getDayOfYear;
      exports.diffInDays = diffInDays;
      exports.diffInMonths = diffInMonths;
      exports.diffInYears = diffInYears;
      var timezone_helper_1 = require_timezone_helper();
      var error_types_1 = require_error_types();
      exports.MS_PER_SECOND = 1e3;
      exports.MS_PER_MINUTE = 60 * exports.MS_PER_SECOND;
      exports.MS_PER_HOUR = 60 * exports.MS_PER_MINUTE;
      exports.MS_PER_DAY = 24 * exports.MS_PER_HOUR;
      exports.MAX_DATE_VALUE = 864e13;
      exports.UNIX_TIMESTAMP_THRESHOLD = 1e10;
      function isValidDateString(dateString) {
        const date = new Date(dateString);
        return Number.isFinite(date.getTime());
      }
      function isDirectDateInput(input) {
        return typeof input === "string" || typeof input === "number" || input instanceof Date;
      }
      function parseDate(input) {
        if (input instanceof Date) {
          if (!Number.isFinite(input.getTime())) {
            throw new error_types_1.DateValidationError("Invalid Date object", input);
          }
          return input;
        }
        if (typeof input === "string") {
          const isoRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|[+-]\d{2}:\d{2})?)?$/;
          if (!isoRegex.test(input)) {
            throw new error_types_1.InvalidDateFormatError(`Invalid ISO-8601 date string: ${input}. Expected format: YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss.sssZ`, input);
          }
          const date = new Date(input);
          if (!Number.isFinite(date.getTime())) {
            throw new error_types_1.DateValidationError(`Invalid date string: ${input}`, input);
          }
          return date;
        }
        if (typeof input === "number") {
          if (!Number.isFinite(input)) {
            throw new error_types_1.DateValidationError(`Invalid timestamp: must be a finite number, got ${input}`, input);
          }
          const timestamp = input < exports.UNIX_TIMESTAMP_THRESHOLD ? input * exports.MS_PER_SECOND : input;
          if (Math.abs(timestamp) > exports.MAX_DATE_VALUE) {
            throw new error_types_1.TimestampRangeError(`Timestamp out of representable range: ${input}. Valid range: \xB1${exports.MAX_DATE_VALUE}`, input);
          }
          return new Date(timestamp);
        }
        throw new error_types_1.InvalidDateFormatError(`Unsupported date input type: ${typeof input}. Expected string, number, or Date`, input);
      }
      function formatDateISO(date) {
        return date.toISOString();
      }
      function isValidCalendarDate(year, month, day) {
        if (month < 1 || month > 12)
          return false;
        if (day < 1)
          return false;
        const daysInMonth = [
          31,
          isLeapYear(year) ? 29 : 28,
          31,
          30,
          31,
          30,
          31,
          31,
          30,
          31,
          30,
          31
        ];
        return day <= daysInMonth[month - 1];
      }
      function isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
      }
      function getDayOfYear(date, timezone) {
        const dateInTz = (0, timezone_helper_1.getDateInTimezone)(date, timezone);
        const startOfYear = (0, timezone_helper_1.createDateInTimezone)(dateInTz.year, 1, 1, timezone);
        const diff = date.getTime() - startOfYear.getTime();
        return Math.floor(diff / exports.MS_PER_DAY) + 1;
      }
      function diffInDays(startDate, endDate) {
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        return Math.ceil(diffTime / exports.MS_PER_DAY);
      }
      function diffInMonths(startDate, endDate) {
        const diffTime = endDate.getTime() - startDate.getTime();
        return Math.floor(diffTime / (exports.MS_PER_DAY * 30));
      }
      function diffInYears(startDate, endDate) {
        const diffTime = endDate.getTime() - startDate.getTime();
        return Math.floor(diffTime / (exports.MS_PER_DAY * 365));
      }
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/date/date-diff.operator.js
  var require_date_diff_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/date/date-diff.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$dateDiff = void 0;
      var date_time_helper_1 = require_date_time_helper();
      var error_types_1 = require_error_types();
      var $dateDiff = () => {
        return function(input) {
          const startDate = (0, date_time_helper_1.isValidDateString)(input.startDate) ? new Date(input.startDate) : /* @__PURE__ */ new Date();
          const endDate = (0, date_time_helper_1.isValidDateString)(input.endDate) ? new Date(input.endDate) : /* @__PURE__ */ new Date();
          switch (input.unit) {
            case "days":
              return (0, date_time_helper_1.diffInDays)(startDate, endDate);
            case "months":
              return (0, date_time_helper_1.diffInMonths)(startDate, endDate);
            case "years":
              return (0, date_time_helper_1.diffInYears)(startDate, endDate);
            default:
              throw new error_types_1.OperatorInputError(`Invalid unit: ${input.unit}. Valid units: "days", "months", "years"`, "$dateDiff", input);
          }
        };
      };
      exports.$dateDiff = $dateDiff;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/helpers/is-object.helper.js
  var require_is_object_helper = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/helpers/is-object.helper.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isObject = isObject;
      exports.isObjectWithProperty = isObjectWithProperty;
      exports.isObjectWithProperties = isObjectWithProperties;
      function isObject(value) {
        return value instanceof Object && !Array.isArray(value);
      }
      function isObjectWithProperty(value, property) {
        return typeof value === "object" && value !== null && property in value;
      }
      function isObjectWithProperties(value, properties) {
        return properties.every((property) => isObjectWithProperty(value, property));
      }
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/date/to-date.operator.js
  var require_to_date_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/date/to-date.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$toDate = void 0;
      var date_time_helper_1 = require_date_time_helper();
      var fallback_helper_1 = require_fallback_helper();
      var is_object_helper_1 = require_is_object_helper();
      var error_types_1 = require_error_types();
      var $toDate = () => {
        return (input) => {
          try {
            if ((0, is_object_helper_1.isObjectWithProperty)(input, "value")) {
              try {
                return (0, date_time_helper_1.parseDate)(input.value);
              } catch (error) {
                return (0, fallback_helper_1.resolveFallback)(input.fallback, {}, error instanceof Error ? error : new Error("Invalid date"));
              }
            }
            if ((0, date_time_helper_1.isDirectDateInput)(input)) {
              return (0, date_time_helper_1.parseDate)(input);
            }
            throw new error_types_1.OperatorInputError(`Invalid input format. Expected date string/number/Date or object with 'value' property`, "$toDate", input);
          } catch (error) {
            if (error instanceof error_types_1.OperatorInputError) {
              throw error;
            }
            throw new Error(`$toDate: Invalid date value - ${error instanceof Error ? error.message : "Unknown error"}`);
          }
        };
      };
      exports.$toDate = $toDate;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/date/day-of-week.operator.js
  var require_day_of_week_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/date/day-of-week.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$dayOfWeek = void 0;
      var date_time_helper_1 = require_date_time_helper();
      var timezone_helper_1 = require_timezone_helper();
      var fallback_helper_1 = require_fallback_helper();
      var is_object_helper_1 = require_is_object_helper();
      var error_types_1 = require_error_types();
      var $dayOfWeek = () => {
        return (input) => {
          try {
            if ((0, is_object_helper_1.isObjectWithProperty)(input, "date")) {
              try {
                const date = (0, date_time_helper_1.parseDate)(input.date);
                const timezone = input.timezone || "UTC";
                const dateInTz = (0, timezone_helper_1.getDateInTimezone)(date, timezone);
                return dateInTz.dayOfWeek;
              } catch (error) {
                if ((0, fallback_helper_1.hasFallback)(input)) {
                  return (0, fallback_helper_1.resolveFallback)(input.fallback, {}, error instanceof Error ? error : new Error("Invalid date"));
                }
                throw error;
              }
            }
            if ((0, date_time_helper_1.isDirectDateInput)(input)) {
              const date = (0, date_time_helper_1.parseDate)(input);
              return date.getUTCDay();
            }
            throw new error_types_1.OperatorInputError(`Invalid input format. Expected date string/number/Date or object with 'date' property`, "$dayOfWeek", input);
          } catch (error) {
            if (error instanceof error_types_1.OperatorInputError) {
              throw error;
            }
            throw new Error(`$dayOfWeek: Invalid date value - ${error instanceof Error ? error.message : "Unknown error"}`);
          }
        };
      };
      exports.$dayOfWeek = $dayOfWeek;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/date/day-of-month.operator.js
  var require_day_of_month_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/date/day-of-month.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$dayOfMonth = void 0;
      var date_time_helper_1 = require_date_time_helper();
      var timezone_helper_1 = require_timezone_helper();
      var fallback_helper_1 = require_fallback_helper();
      var is_object_helper_1 = require_is_object_helper();
      var error_types_1 = require_error_types();
      var $dayOfMonth = () => {
        return (input) => {
          try {
            if ((0, is_object_helper_1.isObjectWithProperty)(input, "date")) {
              try {
                const date = (0, date_time_helper_1.parseDate)(input.date);
                const timezone = input.timezone || "UTC";
                const dateInTz = (0, timezone_helper_1.getDateInTimezone)(date, timezone);
                return dateInTz.day;
              } catch (error) {
                if ((0, fallback_helper_1.hasFallback)(input)) {
                  return (0, fallback_helper_1.resolveFallback)(input.fallback, {}, error instanceof Error ? error : new Error("Invalid date"));
                }
                throw error;
              }
            }
            if ((0, date_time_helper_1.isDirectDateInput)(input)) {
              const date = (0, date_time_helper_1.parseDate)(input);
              return date.getUTCDate();
            }
            throw new error_types_1.OperatorInputError(`Invalid input format. Expected date string/number/Date or object with 'date' property`, "$dayOfMonth", input);
          } catch (error) {
            if (error instanceof error_types_1.OperatorInputError) {
              throw error;
            }
            throw new Error(`$dayOfMonth: Invalid date value - ${error instanceof Error ? error.message : "Unknown error"}`);
          }
        };
      };
      exports.$dayOfMonth = $dayOfMonth;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/date/day-of-year.operator.js
  var require_day_of_year_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/date/day-of-year.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$dayOfYear = void 0;
      var date_time_helper_1 = require_date_time_helper();
      var fallback_helper_1 = require_fallback_helper();
      var is_object_helper_1 = require_is_object_helper();
      var error_types_1 = require_error_types();
      var $dayOfYear = () => {
        return (input) => {
          try {
            if ((0, is_object_helper_1.isObjectWithProperty)(input, "date")) {
              try {
                const date = (0, date_time_helper_1.parseDate)(input.date);
                const timezone = input.timezone || "UTC";
                return (0, date_time_helper_1.getDayOfYear)(date, timezone);
              } catch (error) {
                if ((0, fallback_helper_1.hasFallback)(input)) {
                  return (0, fallback_helper_1.resolveFallback)(input.fallback, {}, error instanceof Error ? error : new Error("Invalid date"));
                }
                throw error;
              }
            }
            if ((0, date_time_helper_1.isDirectDateInput)(input)) {
              const date = (0, date_time_helper_1.parseDate)(input);
              const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 0));
              const diff = date.getTime() - start.getTime();
              return Math.floor(diff / date_time_helper_1.MS_PER_DAY);
            }
            throw new error_types_1.OperatorInputError(`Invalid input format. Expected date string/number/Date or object with 'date' property`, "$dayOfYear", input);
          } catch (error) {
            if (error instanceof error_types_1.OperatorInputError) {
              throw error;
            }
            throw new Error(`$dayOfYear: Invalid date value - ${error instanceof Error ? error.message : "Unknown error"}`);
          }
        };
      };
      exports.$dayOfYear = $dayOfYear;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/types/operator-input.types.js
  var require_operator_input_types = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/types/operator-input.types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DateShiftStrategy = void 0;
      exports.DateShiftStrategy = {
        ROLL_FORWARD: "rollForward",
        ROLL_BACKWARD: "rollBackward",
        KEEP: "keep"
      };
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/helpers/business-day.helper.js
  var require_business_day_helper = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/helpers/business-day.helper.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.formatDateKey = formatDateKey;
      exports.normalizeHolidays = normalizeHolidays;
      exports.isHoliday = isHoliday;
      exports.isWeekend = isWeekend;
      exports.isBusinessDay = isBusinessDay;
      exports.validateWeekends = validateWeekends;
      exports.validateHolidays = validateHolidays;
      var date_time_helper_1 = require_date_time_helper();
      var timezone_helper_1 = require_timezone_helper();
      var error_types_1 = require_error_types();
      function formatDateKey(date, timezone = "UTC") {
        const dateInTz = (0, timezone_helper_1.getDateInTimezone)(date, timezone);
        return `${dateInTz.year}-${String(dateInTz.month).padStart(2, "0")}-${String(dateInTz.day).padStart(2, "0")}`;
      }
      function normalizeHolidays(holidays, timezone = "UTC") {
        const holidaySet = /* @__PURE__ */ new Set();
        for (const holiday of holidays) {
          try {
            const holidayDate = (0, date_time_helper_1.parseDate)(holiday);
            const holidayKey = formatDateKey(holidayDate, timezone);
            holidaySet.add(holidayKey);
          } catch (e) {
            throw new error_types_1.InvalidHolidayError(`Invalid holiday date: ${holiday}. Expected ISO-8601 format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss.sssZ)`, holiday);
          }
        }
        return holidaySet;
      }
      function isHoliday(date, holidays, timezone = "UTC") {
        const holidaySet = holidays instanceof Set ? holidays : normalizeHolidays(holidays, timezone);
        const dateKey = formatDateKey(date, timezone);
        return holidaySet.has(dateKey);
      }
      function isWeekend(date, weekends = [0, 6], timezone = "UTC") {
        const dateInTz = (0, timezone_helper_1.getDateInTimezone)(date, timezone);
        return weekends.includes(dateInTz.dayOfWeek);
      }
      function isBusinessDay(date, options = {}) {
        const { holidays = [], weekends = [0, 6], timezone = "UTC" } = options;
        if (isWeekend(date, weekends, timezone)) {
          return false;
        }
        const hasHolidays = Array.isArray(holidays) ? holidays.length > 0 : holidays.size > 0;
        if (hasHolidays && isHoliday(date, holidays, timezone)) {
          return false;
        }
        return true;
      }
      function validateWeekends(weekends) {
        if (!Array.isArray(weekends)) {
          throw new error_types_1.InvalidWeekendError("weekends must be an array of numbers (0-6)", weekends);
        }
        for (const weekend of weekends) {
          if (typeof weekend !== "number" || weekend < 0 || weekend > 6) {
            throw new error_types_1.InvalidWeekendError("weekends must contain numbers between 0-6 (0=Sunday, 6=Saturday)", weekends);
          }
        }
      }
      function validateHolidays(holidays) {
        if (!Array.isArray(holidays)) {
          throw new error_types_1.InvalidHolidayError("holidays must be an array of ISO-8601 date strings", String(holidays));
        }
      }
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/date/date-shift.operator.js
  var require_date_shift_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/date/date-shift.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$dateShift = void 0;
      var date_time_helper_1 = require_date_time_helper();
      var timezone_helper_1 = require_timezone_helper();
      var fallback_helper_1 = require_fallback_helper();
      var is_object_helper_1 = require_is_object_helper();
      var error_types_1 = require_error_types();
      var operator_input_types_1 = require_operator_input_types();
      var business_day_helper_1 = require_business_day_helper();
      var VALID_STRATEGIES = Object.values(operator_input_types_1.DateShiftStrategy);
      var $dateShift = () => {
        return (input) => {
          try {
            if (!(0, is_object_helper_1.isObjectWithProperty)(input, "date")) {
              throw new error_types_1.OperatorInputError("Requires an object with date property", "$dateShift", input);
            }
            const date = (0, date_time_helper_1.parseDate)(input.date);
            const timezone = input.timezone || "UTC";
            const strategy = input.strategy || operator_input_types_1.DateShiftStrategy.ROLL_FORWARD;
            const holidays = input.holidays || [];
            const weekends = input.weekends || [0, 6];
            const maxIterations = input.maxIterations || 365;
            if (!(0, timezone_helper_1.isValidTimezone)(timezone)) {
              throw new error_types_1.TimezoneValidationError(`Invalid timezone: ${timezone}`, timezone);
            }
            if (!VALID_STRATEGIES.includes(strategy)) {
              throw new error_types_1.InvalidStrategyError(`Invalid strategy: ${strategy}`, strategy, VALID_STRATEGIES);
            }
            (0, business_day_helper_1.validateHolidays)(holidays);
            (0, business_day_helper_1.validateWeekends)(weekends);
            if (strategy === operator_input_types_1.DateShiftStrategy.KEEP) {
              return (0, date_time_helper_1.formatDateISO)(date);
            }
            const holidaySet = (0, business_day_helper_1.normalizeHolidays)(holidays, timezone);
            let currentDate = new Date(date.getTime());
            let iterations = 0;
            while (!(0, business_day_helper_1.isBusinessDay)(currentDate, {
              holidays: holidaySet,
              weekends,
              timezone
            }) && iterations < maxIterations) {
              if (strategy === operator_input_types_1.DateShiftStrategy.ROLL_FORWARD) {
                currentDate = new Date(currentDate.getTime() + date_time_helper_1.MS_PER_DAY);
              } else if (strategy === operator_input_types_1.DateShiftStrategy.ROLL_BACKWARD) {
                currentDate = new Date(currentDate.getTime() - date_time_helper_1.MS_PER_DAY);
              }
              iterations++;
            }
            if (iterations >= maxIterations) {
              throw new error_types_1.MaxIterationsError(`Maximum iterations (${maxIterations}) reached while trying to find a business day`, iterations);
            }
            return (0, date_time_helper_1.formatDateISO)(currentDate);
          } catch (error) {
            if ((0, fallback_helper_1.hasFallback)(input)) {
              return (0, fallback_helper_1.resolveFallback)(input.fallback, {}, error instanceof Error ? error : new Error("Unknown error in $dateShift"));
            }
            if (error instanceof error_types_1.TimezoneValidationError || error instanceof error_types_1.MaxIterationsError || error instanceof error_types_1.InvalidStrategyError || error instanceof error_types_1.InvalidHolidayError || error instanceof error_types_1.InvalidWeekendError) {
              throw error;
            }
            throw new Error(`$dateShift: ${error instanceof Error ? error.message : "Unknown error"}`);
          }
        };
      };
      exports.$dateShift = $dateShift;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/date/is-weekend.operator.js
  var require_is_weekend_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/date/is-weekend.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$isWeekend = void 0;
      var date_time_helper_1 = require_date_time_helper();
      var fallback_helper_1 = require_fallback_helper();
      var is_object_helper_1 = require_is_object_helper();
      var business_day_helper_1 = require_business_day_helper();
      var error_types_1 = require_error_types();
      var $isWeekend = () => {
        return (input) => {
          try {
            if ((0, is_object_helper_1.isObjectWithProperty)(input, "date")) {
              try {
                const date = (0, date_time_helper_1.parseDate)(input.date);
                const timezone = input.timezone || "UTC";
                const weekends = input.weekends || [0, 6];
                (0, business_day_helper_1.validateWeekends)(weekends);
                return (0, business_day_helper_1.isWeekend)(date, weekends, timezone);
              } catch (error) {
                if ((0, fallback_helper_1.hasFallback)(input)) {
                  return (0, fallback_helper_1.resolveFallback)(input.fallback, {}, error instanceof Error ? error : new Error("Invalid date"));
                }
                throw error;
              }
            }
            if ((0, date_time_helper_1.isDirectDateInput)(input)) {
              const date = (0, date_time_helper_1.parseDate)(input);
              return (0, business_day_helper_1.isWeekend)(date, [0, 6], "UTC");
            }
            throw new error_types_1.OperatorInputError(`Invalid input format. Expected date string/number/Date or object with 'date' property`, "$isWeekend", input);
          } catch (error) {
            if (error instanceof error_types_1.OperatorInputError) {
              throw error;
            }
            throw new Error(`$isWeekend: Invalid date value - ${error instanceof Error ? error.message : "Unknown error"}`);
          }
        };
      };
      exports.$isWeekend = $isWeekend;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/date/is-holiday.operator.js
  var require_is_holiday_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/date/is-holiday.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$isHoliday = void 0;
      var date_time_helper_1 = require_date_time_helper();
      var fallback_helper_1 = require_fallback_helper();
      var is_object_helper_1 = require_is_object_helper();
      var business_day_helper_1 = require_business_day_helper();
      var error_types_1 = require_error_types();
      var $isHoliday = () => {
        return (input) => {
          try {
            if (!(0, is_object_helper_1.isObjectWithProperty)(input, "date")) {
              throw new error_types_1.OperatorInputError("Requires an object with date and holidays properties", "$isHoliday", input);
            }
            (0, business_day_helper_1.validateHolidays)(input.holidays);
            const date = (0, date_time_helper_1.parseDate)(input.date);
            const timezone = input.timezone || "UTC";
            return (0, business_day_helper_1.isHoliday)(date, input.holidays, timezone);
          } catch (error) {
            if ((0, fallback_helper_1.hasFallback)(input)) {
              return (0, fallback_helper_1.resolveFallback)(input.fallback, {}, error instanceof Error ? error : new Error("Invalid date or holidays"));
            }
            throw new Error(`$isHoliday: ${error instanceof Error ? error.message : "Unknown error"}`);
          }
        };
      };
      exports.$isHoliday = $isHoliday;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/date/add-days.operator.js
  var require_add_days_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/date/add-days.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$addDays = void 0;
      var date_time_helper_1 = require_date_time_helper();
      var fallback_helper_1 = require_fallback_helper();
      var is_object_helper_1 = require_is_object_helper();
      var error_types_1 = require_error_types();
      var $addDays = () => {
        return (input) => {
          try {
            if (!(0, is_object_helper_1.isObjectWithProperties)(input, ["date", "days"])) {
              throw new error_types_1.OperatorInputError("Requires an object with date and days properties", "$addDays", input);
            }
            if (typeof input.days !== "number" || !Number.isFinite(input.days)) {
              throw new error_types_1.OperatorInputError(`days must be a finite number, got: ${typeof input.days}`, "$addDays", input);
            }
            const parsedDate = (0, date_time_helper_1.parseDate)(input.date);
            const newDate = new Date(parsedDate.getTime() + input.days * date_time_helper_1.MS_PER_DAY);
            return (0, date_time_helper_1.formatDateISO)(newDate);
          } catch (error) {
            if ((0, fallback_helper_1.hasFallback)(input)) {
              return (0, fallback_helper_1.resolveFallback)(input.fallback, {}, error instanceof Error ? error : new Error("Invalid date or days"));
            }
            throw error;
          }
        };
      };
      exports.$addDays = $addDays;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/helpers/array-validation.helper.js
  var require_array_validation_helper = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/helpers/array-validation.helper.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.validateArrayOperatorParams = validateArrayOperatorParams;
      exports.validateArrayInput = validateArrayInput;
      exports.validateNumberInput = validateNumberInput;
      exports.getEmptyArrayFallback = getEmptyArrayFallback;
      exports.extractNumericValues = extractNumericValues;
      var error_types_1 = require_error_types();
      function validateArrayOperatorParams(params, operatorName, requiredFields) {
        if (!params || typeof params !== "object") {
          throw new error_types_1.MissingOperatorParameterError(operatorName, requiredFields.join(", "), requiredFields);
        }
        for (const field of requiredFields) {
          if (!(field in params) || params[field] === void 0) {
            if (params.fallback !== void 0) {
              return params;
            }
            throw new error_types_1.MissingOperatorParameterError(operatorName, field, requiredFields);
          }
        }
        return params;
      }
      function validateArrayInput(value, operatorName, fallback) {
        if (!Array.isArray(value)) {
          if (fallback !== void 0) {
            return fallback;
          }
          throw new error_types_1.ArrayOperatorInputError(operatorName, typeof value, value);
        }
        return value;
      }
      function validateNumberInput(value, operatorName, paramName, fallback) {
        if (typeof value !== "number" || !Number.isFinite(value)) {
          if (fallback !== void 0) {
            return fallback;
          }
          throw new Error(`${operatorName} '${paramName}' must be a finite number, received ${typeof value}`);
        }
        return value;
      }
      function getEmptyArrayFallback(array, fallback) {
        if (array.length === 0 && fallback !== void 0) {
          return fallback;
        }
        return void 0;
      }
      function extractNumericValues(array, fallback, defaultValue = 0) {
        if (array.length === 0) {
          return fallback !== void 0 ? fallback : defaultValue;
        }
        const numbers = array.filter((v) => typeof v === "number" && !isNaN(v));
        if (numbers.length === 0) {
          return fallback !== void 0 ? fallback : defaultValue;
        }
        return numbers;
      }
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/array/map.operator.js
  var require_map_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/array/map.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$map = void 0;
      var resolve_args_common_1 = require_resolve_args_common();
      var fallback_helper_1 = require_fallback_helper();
      var resolve_execution_context_common_1 = require_resolve_execution_context_common();
      var resolve_expression_common_1 = require_resolve_expression_common();
      var array_validation_helper_1 = require_array_validation_helper();
      var $map = (ctx) => {
        const basePayload = (ctx == null ? void 0 : ctx.context) || {};
        const payload = (0, resolve_execution_context_common_1.augmentSourceWithContext)(basePayload, ctx);
        return function(params) {
          try {
            const validatedParams = (0, array_validation_helper_1.validateArrayOperatorParams)(params, "$map", [
              "input",
              "expression"
            ]);
            const { input, expression } = validatedParams;
            const validArray = (0, array_validation_helper_1.validateArrayInput)(input, "$map");
            if (!Array.isArray(validArray) || validArray.length === 0) {
              return [];
            }
            return validArray.map((element, index) => {
              const elementContext = {
                context: payload,
                $current: element,
                $index: index
              };
              return (0, resolve_args_common_1.resolveArgs)(expression, payload, elementContext, resolve_expression_common_1.resolveExpression);
            });
          } catch (error) {
            if ((0, fallback_helper_1.hasFallback)(params)) {
              return (0, fallback_helper_1.resolveFallback)(params.fallback, payload, error instanceof Error ? error : new Error("$map operation failed"));
            }
            throw error;
          }
        };
      };
      exports.$map = $map;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/array/filter.operator.js
  var require_filter_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/array/filter.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$filter = void 0;
      var resolve_args_common_1 = require_resolve_args_common();
      var fallback_helper_1 = require_fallback_helper();
      var resolve_execution_context_common_1 = require_resolve_execution_context_common();
      var resolve_expression_common_1 = require_resolve_expression_common();
      var array_validation_helper_1 = require_array_validation_helper();
      var $filter = (ctx) => {
        const basePayload = (ctx == null ? void 0 : ctx.context) || {};
        const payload = (0, resolve_execution_context_common_1.augmentSourceWithContext)(basePayload, ctx);
        return function(params) {
          try {
            const validatedParams = (0, array_validation_helper_1.validateArrayOperatorParams)(params, "$filter", [
              "input",
              "condition"
            ]);
            const { input, condition } = validatedParams;
            const validArray = (0, array_validation_helper_1.validateArrayInput)(input, "$filter");
            if (!Array.isArray(validArray) || validArray.length === 0) {
              return [];
            }
            return validArray.filter((element, index) => {
              const elementContext = {
                context: payload,
                $current: element,
                $index: index
              };
              const result = (0, resolve_args_common_1.resolveArgs)(condition, payload, elementContext, resolve_expression_common_1.resolveExpression);
              return Boolean(result);
            });
          } catch (error) {
            if ((0, fallback_helper_1.hasFallback)(params)) {
              return (0, fallback_helper_1.resolveFallback)(params.fallback, payload, error instanceof Error ? error : new Error("$filter operation failed"));
            }
            throw error;
          }
        };
      };
      exports.$filter = $filter;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/array/reduce.operator.js
  var require_reduce_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/array/reduce.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$reduce = void 0;
      var resolve_args_common_1 = require_resolve_args_common();
      var fallback_helper_1 = require_fallback_helper();
      var resolve_execution_context_common_1 = require_resolve_execution_context_common();
      var resolve_expression_common_1 = require_resolve_expression_common();
      var array_validation_helper_1 = require_array_validation_helper();
      var $reduce = (ctx) => {
        const basePayload = (ctx == null ? void 0 : ctx.context) || {};
        const payload = (0, resolve_execution_context_common_1.augmentSourceWithContext)(basePayload, ctx);
        return function(params) {
          try {
            const validatedParams = (0, array_validation_helper_1.validateArrayOperatorParams)(params, "$reduce", [
              "input",
              "initialValue",
              "expression"
            ]);
            const { input, initialValue, expression } = validatedParams;
            const validArray = (0, array_validation_helper_1.validateArrayInput)(input, "$reduce");
            if (!Array.isArray(validArray) || validArray.length === 0) {
              return initialValue;
            }
            return validArray.reduce((accumulated, element, index) => {
              const elementContext = {
                context: payload,
                $accumulated: accumulated,
                $current: element,
                $index: index
              };
              return (0, resolve_args_common_1.resolveArgs)(expression, payload, elementContext, resolve_expression_common_1.resolveExpression);
            }, initialValue);
          } catch (error) {
            if ((0, fallback_helper_1.hasFallback)(params)) {
              return (0, fallback_helper_1.resolveFallback)(params.fallback, payload, error instanceof Error ? error : new Error("$reduce operation failed"));
            }
            throw error;
          }
        };
      };
      exports.$reduce = $reduce;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/array/array-first.operator.js
  var require_array_first_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/array/array-first.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$arrayFirst = void 0;
      var array_validation_helper_1 = require_array_validation_helper();
      var $arrayFirst = () => {
        return function(params) {
          const validatedParams = (0, array_validation_helper_1.validateArrayOperatorParams)(params, "$arrayFirst", [
            "input"
          ]);
          if (validatedParams.fallback !== void 0 && !validatedParams.input) {
            return validatedParams.fallback;
          }
          const { input, fallback } = validatedParams;
          const validArray = (0, array_validation_helper_1.validateArrayInput)(input, "$arrayFirst", fallback);
          if (!Array.isArray(validArray)) {
            return validArray;
          }
          if (validArray.length === 0) {
            return fallback !== void 0 ? fallback : void 0;
          }
          return validArray[0];
        };
      };
      exports.$arrayFirst = $arrayFirst;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/array/array-last.operator.js
  var require_array_last_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/array/array-last.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$arrayLast = void 0;
      var array_validation_helper_1 = require_array_validation_helper();
      var $arrayLast = () => {
        return function(params) {
          const validatedParams = (0, array_validation_helper_1.validateArrayOperatorParams)(params, "$arrayLast", [
            "input"
          ]);
          if (validatedParams.fallback !== void 0 && !validatedParams.input) {
            return validatedParams.fallback;
          }
          const { input, fallback } = validatedParams;
          const validArray = (0, array_validation_helper_1.validateArrayInput)(input, "$arrayLast", fallback);
          if (!Array.isArray(validArray)) {
            return validArray;
          }
          if (validArray.length === 0) {
            return fallback !== void 0 ? fallback : void 0;
          }
          return validArray[validArray.length - 1];
        };
      };
      exports.$arrayLast = $arrayLast;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/array/array-at.operator.js
  var require_array_at_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/array/array-at.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$arrayAt = void 0;
      var array_validation_helper_1 = require_array_validation_helper();
      var $arrayAt = () => {
        return function(params) {
          const validatedParams = (0, array_validation_helper_1.validateArrayOperatorParams)(params, "$arrayAt", [
            "input",
            "index"
          ]);
          if (validatedParams.fallback !== void 0 && !validatedParams.input) {
            return validatedParams.fallback;
          }
          const { input, index, fallback } = validatedParams;
          const validArray = (0, array_validation_helper_1.validateArrayInput)(input, "$arrayAt", fallback);
          if (!Array.isArray(validArray)) {
            return validArray;
          }
          const validIndex = (0, array_validation_helper_1.validateNumberInput)(index, "$arrayAt", "index", fallback);
          if (typeof validIndex !== "number") {
            return validIndex;
          }
          const actualIndex = validIndex < 0 ? validArray.length + validIndex : validIndex;
          if (actualIndex < 0 || actualIndex >= validArray.length) {
            return fallback !== void 0 ? fallback : void 0;
          }
          return validArray[actualIndex];
        };
      };
      exports.$arrayAt = $arrayAt;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/array/avg.operator.js
  var require_avg_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/array/avg.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$avg = void 0;
      var array_validation_helper_1 = require_array_validation_helper();
      var $avg = () => {
        return function(params) {
          const validatedParams = (0, array_validation_helper_1.validateArrayOperatorParams)(params, "$avg", [
            "values"
          ]);
          if (validatedParams.fallback !== void 0 && !validatedParams.values) {
            return validatedParams.fallback;
          }
          const { values, fallback } = validatedParams;
          const validArray = (0, array_validation_helper_1.validateArrayInput)(values, "$avg", fallback);
          if (!Array.isArray(validArray)) {
            return validArray;
          }
          const numbers = (0, array_validation_helper_1.extractNumericValues)(validArray, fallback);
          if (!Array.isArray(numbers)) {
            return numbers;
          }
          const sum = numbers.reduce((acc, num) => acc + num, 0);
          return sum / numbers.length;
        };
      };
      exports.$avg = $avg;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/array/sum.operator.js
  var require_sum_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/array/sum.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$sum = void 0;
      var array_validation_helper_1 = require_array_validation_helper();
      var $sum = () => {
        return function(params) {
          const validatedParams = (0, array_validation_helper_1.validateArrayOperatorParams)(params, "$sum", [
            "values"
          ]);
          if (validatedParams.fallback !== void 0 && !validatedParams.values) {
            return validatedParams.fallback;
          }
          const { values, fallback } = validatedParams;
          const validArray = (0, array_validation_helper_1.validateArrayInput)(values, "$sum", fallback);
          if (!Array.isArray(validArray)) {
            return validArray;
          }
          const numbers = (0, array_validation_helper_1.extractNumericValues)(validArray, fallback);
          if (!Array.isArray(numbers)) {
            return numbers;
          }
          return numbers.reduce((acc, num) => acc + num, 0);
        };
      };
      exports.$sum = $sum;
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/forgefy.operators.js
  var require_forgefy_operators = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/operators/forgefy.operators.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.operatorRegistry = void 0;
      var operators_singleton_1 = require_operators_singleton();
      Object.defineProperty(exports, "operatorRegistry", { enumerable: true, get: function() {
        return operators_singleton_1.operatorRegistry;
      } });
      var to_string_operator_1 = require_to_string_operator();
      var to_upper_operator_1 = require_to_upper_operator();
      var to_lower_operator_1 = require_to_lower_operator();
      var substr_operator_1 = require_substr_operator();
      var concat_operator_1 = require_concat_operator();
      var slice_operator_1 = require_slice_operator();
      var split_operator_1 = require_split_operator();
      var size_operator_1 = require_size_operator();
      var replace_operator_1 = require_replace_operator();
      var regex_replace_operator_1 = require_regex_replace_operator();
      var trim_operator_1 = require_trim_operator();
      var ltrim_operator_1 = require_ltrim_operator();
      var rtrim_operator_1 = require_rtrim_operator();
      var index_of_operator_1 = require_index_of_operator();
      var replace_one_operator_1 = require_replace_one_operator();
      var replace_all_operator_1 = require_replace_all_operator();
      var multiply_operator_1 = require_multiply_operator();
      var subtract_operator_1 = require_subtract_operator();
      var divide_operator_1 = require_divide_operator();
      var add_operator_1 = require_add_operator();
      var abs_operator_1 = require_abs_operator();
      var ceil_operator_1 = require_ceil_operator();
      var floor_operator_1 = require_floor_operator();
      var max_operator_1 = require_max_operator();
      var min_operator_1 = require_min_operator();
      var to_fixed_operator_1 = require_to_fixed_operator();
      var round_operator_1 = require_round_operator();
      var mod_operator_1 = require_mod_operator();
      var pow_operator_1 = require_pow_operator();
      var sqrt_operator_1 = require_sqrt_operator();
      var trunc_operator_1 = require_trunc_operator();
      var if_null_operator_1 = require_if_null_operator();
      var switch_operator_1 = require_switch_operator();
      var cond_operator_1 = require_cond_operator();
      var coalesce_operator_1 = require_coalesce_operator();
      var every_operator_1 = require_every_operator();
      var some_operator_1 = require_some_operator();
      var eq_operator_1 = require_eq_operator();
      var gt_operator_1 = require_gt_operator();
      var gte_operator_1 = require_gte_operator();
      var lt_operator_1 = require_lt_operator();
      var lte_operator_1 = require_lte_operator();
      var regex_operator_1 = require_regex_operator();
      var ne_operator_1 = require_ne_operator();
      var in_operator_1 = require_in_operator();
      var nin_operator_1 = require_nin_operator();
      var and_operator_1 = require_and_operator();
      var or_operator_1 = require_or_operator();
      var not_operator_1 = require_not_operator();
      var none_operator_1 = require_none_operator();
      var to_number_operator_1 = require_to_number_operator();
      var exists_operator_1 = require_exists_operator();
      var is_null_operator_1 = require_is_null_operator();
      var is_number_operator_1 = require_is_number_operator();
      var is_nan_operator_1 = require_is_nan_operator();
      var type_operator_1 = require_type_operator();
      var is_array_operator_1 = require_is_array_operator();
      var is_string_operator_1 = require_is_string_operator();
      var is_boolean_operator_1 = require_is_boolean_operator();
      var is_date_operator_1 = require_is_date_operator();
      var date_diff_operator_1 = require_date_diff_operator();
      var to_date_operator_1 = require_to_date_operator();
      var day_of_week_operator_1 = require_day_of_week_operator();
      var day_of_month_operator_1 = require_day_of_month_operator();
      var day_of_year_operator_1 = require_day_of_year_operator();
      var date_shift_operator_1 = require_date_shift_operator();
      var is_weekend_operator_1 = require_is_weekend_operator();
      var is_holiday_operator_1 = require_is_holiday_operator();
      var add_days_operator_1 = require_add_days_operator();
      var map_operator_1 = require_map_operator();
      var filter_operator_1 = require_filter_operator();
      var reduce_operator_1 = require_reduce_operator();
      var array_first_operator_1 = require_array_first_operator();
      var array_last_operator_1 = require_array_last_operator();
      var array_at_operator_1 = require_array_at_operator();
      var avg_operator_1 = require_avg_operator();
      var sum_operator_1 = require_sum_operator();
      operators_singleton_1.operatorRegistry.register("$abs", abs_operator_1.$abs).register("$add", add_operator_1.$add).register("$and", and_operator_1.$and).register("$ceil", ceil_operator_1.$ceil).register("$coalesce", coalesce_operator_1.$coalesce).register("$cond", cond_operator_1.$cond).register("$concat", concat_operator_1.$concat).register("$dateDiff", date_diff_operator_1.$dateDiff).register("$divide", divide_operator_1.$divide).register("$eq", eq_operator_1.$eq).register("$every", every_operator_1.$every).register("$exists", exists_operator_1.$exists).register("$floor", floor_operator_1.$floor).register("$gt", gt_operator_1.$gt).register("$gte", gte_operator_1.$gte).register("$ifNull", if_null_operator_1.$ifNull).register("$in", in_operator_1.$in).register("$isNaN", is_nan_operator_1.$isNaN).register("$isNull", is_null_operator_1.$isNull).register("$isNumber", is_number_operator_1.$isNumber).register("$lt", lt_operator_1.$lt).register("$lte", lte_operator_1.$lte).register("$max", max_operator_1.$max).register("$min", min_operator_1.$min).register("$multiply", multiply_operator_1.$multiply).register("$ne", ne_operator_1.$ne).register("$nin", nin_operator_1.$nin).register("$none", none_operator_1.$none).register("$not", not_operator_1.$not).register("$or", or_operator_1.$or).register("$regex", regex_operator_1.$regex).register("$regexReplace", regex_replace_operator_1.$regexReplace).register("$replace", replace_operator_1.$replace).register("$round", round_operator_1.$round).register("$size", size_operator_1.$size).register("$slice", slice_operator_1.$slice).register("$some", some_operator_1.$some).register("$split", split_operator_1.$split).register("$substr", substr_operator_1.$substr).register("$subtract", subtract_operator_1.$subtract).register("$switch", switch_operator_1.$switch).register("$toFixed", to_fixed_operator_1.$toFixed).register("$toLower", to_lower_operator_1.$toLower).register("$toNumber", to_number_operator_1.$toNumber).register("$toString", to_string_operator_1.$toString).register("$toUpper", to_upper_operator_1.$toUpper).register("$trim", trim_operator_1.$trim).register("$type", type_operator_1.$type).register("$isArray", is_array_operator_1.$isArray).register("$isString", is_string_operator_1.$isString).register("$isBoolean", is_boolean_operator_1.$isBoolean).register("$isDate", is_date_operator_1.$isDate).register("$mod", mod_operator_1.$mod).register("$pow", pow_operator_1.$pow).register("$sqrt", sqrt_operator_1.$sqrt).register("$trunc", trunc_operator_1.$trunc).register("$ltrim", ltrim_operator_1.$ltrim).register("$rtrim", rtrim_operator_1.$rtrim).register("$indexOf", index_of_operator_1.$indexOf).register("$replaceOne", replace_one_operator_1.$replaceOne).register("$replaceAll", replace_all_operator_1.$replaceAll).register("$toDate", to_date_operator_1.$toDate).register("$dayOfWeek", day_of_week_operator_1.$dayOfWeek).register("$dayOfMonth", day_of_month_operator_1.$dayOfMonth).register("$dayOfYear", day_of_year_operator_1.$dayOfYear).register("$dateShift", date_shift_operator_1.$dateShift).register("$isWeekend", is_weekend_operator_1.$isWeekend).register("$isHoliday", is_holiday_operator_1.$isHoliday).register("$addDays", add_days_operator_1.$addDays).register("$map", map_operator_1.$map).register("$filter", filter_operator_1.$filter).register("$reduce", reduce_operator_1.$reduce).register("$arrayFirst", array_first_operator_1.$arrayFirst).register("$arrayLast", array_last_operator_1.$arrayLast).register("$arrayAt", array_at_operator_1.$arrayAt).register("$avg", avg_operator_1.$avg).register("$sum", sum_operator_1.$sum);
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/helpers/is-valid-object-path.helper.js
  var require_is_valid_object_path_helper = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/helpers/is-valid-object-path.helper.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isValidObjectPath = isValidObjectPath;
      var forgefy_operators_1 = require_forgefy_operators();
      function isValidObjectPath(value) {
        return typeof value === "string" && value.startsWith("$") && value.length > 1 && !forgefy_operators_1.operatorRegistry.has(value);
      }
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/core/forgefy.core.js
  var require_forgefy_core = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/core/forgefy.core.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.forgefy = forgefy;
      var is_valid_object_path_helper_1 = require_is_valid_object_path_helper();
      var get_value_by_path_common_1 = require_get_value_by_path_common();
      var is_object_helper_1 = require_is_object_helper();
      var is_operator_helper_1 = require_is_operator_helper();
      var resolve_expression_common_1 = require_resolve_expression_common();
      function assignValueByOperator(key, origin, node) {
        node[key] = (0, resolve_expression_common_1.resolveExpression)(origin, node[key]);
      }
      function assignValueByPath(key, origin, node) {
        node[key] = (0, get_value_by_path_common_1.getValueByPath)(origin, node[key]);
      }
      function keyHandler(key, origin, node) {
        if ((0, is_valid_object_path_helper_1.isValidObjectPath)(node[key])) {
          assignValueByPath(key, origin, node);
        } else if ((0, is_object_helper_1.isObject)(node[key])) {
          if ((0, is_operator_helper_1.isOperator)(node[key])) {
            assignValueByOperator(key, origin, node);
          } else {
            node[key] = forgefy(origin, node[key]);
          }
        }
      }
      function forgefy(payload, projection) {
        for (const key of Object.keys(projection)) {
          keyHandler(key, payload, projection);
        }
        return projection;
      }
    }
  });

  // node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/index.js
  var require_dist = __commonJS({
    "node_modules/.pnpm/json-forgefy@4.0.0/node_modules/json-forgefy/dist/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var forgefy_core_1 = require_forgefy_core();
      var Forgefy2 = {
        this: forgefy_core_1.forgefy
      };
      exports.default = Forgefy2;
    }
  });

  // forgefy-entry.js
  var forgefy_entry_exports = {};
  __export(forgefy_entry_exports, {
    Forgefy: () => import_json_forgefy.default
  });
  var import_json_forgefy = __toESM(require_dist());
  if (typeof window !== "undefined") {
    window.Forgefy = import_json_forgefy.default;
  }
  return __toCommonJS(forgefy_entry_exports);
})();
