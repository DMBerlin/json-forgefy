var ForgefyBundle = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/to-string.operator.js
  var require_to_string_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/to-string.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/to-number.operator.js
  var require_to_number_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/to-number.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/multiply.operator.js
  var require_multiply_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/multiply.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/subtract.operator.js
  var require_subtract_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/subtract.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/to-upper.operator.js
  var require_to_upper_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/to-upper.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/to-lower.operator.js
  var require_to_lower_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/to-lower.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/if-null.operator.js
  var require_if_null_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/if-null.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/substr.operator.js
  var require_substr_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/substr.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/divide.operator.js
  var require_divide_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/divide.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/concat.operator.js
  var require_concat_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/concat.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/slice.operator.js
  var require_slice_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/slice.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/split.operator.js
  var require_split_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/split.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/size.operator.js
  var require_size_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/size.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/add.operator.js
  var require_add_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/add.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/eq.operator.js
  var require_eq_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/eq.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/switch.operator.js
  var require_switch_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/switch.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/cond.operator.js
  var require_cond_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/cond.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/abs.operator.js
  var require_abs_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/abs.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/ceil.operator.js
  var require_ceil_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/ceil.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/floor.operator.js
  var require_floor_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/floor.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/max.operator.js
  var require_max_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/max.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/min.operator.js
  var require_min_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/min.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/helpers/date-time.heper.js
  var require_date_time_heper = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/helpers/date-time.heper.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isValidDateString = isValidDateString;
      exports.diffInDays = diffInDays;
      exports.diffInMonths = diffInMonths;
      exports.diffInYears = diffInYears;
      function isValidDateString(dateString) {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
      }
      function diffInDays(startDate, endDate) {
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        return Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      }
      function diffInMonths(startDate, endDate) {
        const diffTime = endDate.getTime() - startDate.getTime();
        return Math.floor(diffTime / (1e3 * 3600 * 24 * 30));
      }
      function diffInYears(startDate, endDate) {
        const diffTime = endDate.getTime() - startDate.getTime();
        return Math.floor(diffTime / (1e3 * 3600 * 24 * 365));
      }
    }
  });

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/date-diff.operator.js
  var require_date_diff_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/date-diff.operator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.$dateDiff = void 0;
      var date_time_heper_1 = require_date_time_heper();
      var $dateDiff = () => {
        return function(input) {
          const startDate = (0, date_time_heper_1.isValidDateString)(input.startDate) ? new Date(input.startDate) : /* @__PURE__ */ new Date();
          const endDate = (0, date_time_heper_1.isValidDateString)(input.endDate) ? new Date(input.endDate) : /* @__PURE__ */ new Date();
          switch (input.unit) {
            case "days":
              return (0, date_time_heper_1.diffInDays)(startDate, endDate);
            case "months":
              return (0, date_time_heper_1.diffInMonths)(startDate, endDate);
            case "years":
              return (0, date_time_heper_1.diffInYears)(startDate, endDate);
            default:
              throw new Error(`Invalid unit: ${input.unit}`);
          }
        };
      };
      exports.$dateDiff = $dateDiff;
    }
  });

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/to-fixed.operator.js
  var require_to_fixed_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/to-fixed.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/gt.operator.js
  var require_gt_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/gt.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/gte.operator.js
  var require_gte_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/gte.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/lt.operator.js
  var require_lt_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/lt.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/lte.operator.js
  var require_lte_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/lte.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/regex.operator.js
  var require_regex_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/regex.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/regex-replace.operator.js
  var require_regex_replace_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/regex-replace.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/and.operator.js
  var require_and_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/and.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/or.operator.js
  var require_or_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/or.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/not.operator.js
  var require_not_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/not.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/ne.operator.js
  var require_ne_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/ne.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/in.operator.js
  var require_in_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/in.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/nin.operator.js
  var require_nin_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/nin.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/exists.operator.js
  var require_exists_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/exists.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/is-null.operator.js
  var require_is_null_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/is-null.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/replace.operator.js
  var require_replace_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/replace.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/is-number.operator.js
  var require_is_number_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/is-number.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/coalesce.operator.js
  var require_coalesce_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/coalesce.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/round.operator.js
  var require_round_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/round.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/every.operator.js
  var require_every_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/every.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/some.operator.js
  var require_some_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/some.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/is-nan.operator.js
  var require_is_nan_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/is-nan.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/trim.operator.js
  var require_trim_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/trim.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/none.operator.js
  var require_none_operator = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/operators/none.operator.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/forgefy.operators.js
  var require_forgefy_operators = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/forgefy.operators.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.operators = void 0;
      var to_string_operator_1 = require_to_string_operator();
      var to_number_operator_1 = require_to_number_operator();
      var multiply_operator_1 = require_multiply_operator();
      var subtract_operator_1 = require_subtract_operator();
      var to_upper_operator_1 = require_to_upper_operator();
      var to_lower_operator_1 = require_to_lower_operator();
      var if_null_operator_1 = require_if_null_operator();
      var substr_operator_1 = require_substr_operator();
      var divide_operator_1 = require_divide_operator();
      var concat_operator_1 = require_concat_operator();
      var slice_operator_1 = require_slice_operator();
      var split_operator_1 = require_split_operator();
      var size_operator_1 = require_size_operator();
      var add_operator_1 = require_add_operator();
      var eq_operator_1 = require_eq_operator();
      var switch_operator_1 = require_switch_operator();
      var cond_operator_1 = require_cond_operator();
      var abs_operator_1 = require_abs_operator();
      var ceil_operator_1 = require_ceil_operator();
      var floor_operator_1 = require_floor_operator();
      var max_operator_1 = require_max_operator();
      var min_operator_1 = require_min_operator();
      var date_diff_operator_1 = require_date_diff_operator();
      var to_fixed_operator_1 = require_to_fixed_operator();
      var gt_operator_1 = require_gt_operator();
      var gte_operator_1 = require_gte_operator();
      var lt_operator_1 = require_lt_operator();
      var lte_operator_1 = require_lte_operator();
      var regex_operator_1 = require_regex_operator();
      var regex_replace_operator_1 = require_regex_replace_operator();
      var and_operator_1 = require_and_operator();
      var or_operator_1 = require_or_operator();
      var not_operator_1 = require_not_operator();
      var ne_operator_1 = require_ne_operator();
      var in_operator_1 = require_in_operator();
      var nin_operator_1 = require_nin_operator();
      var exists_operator_1 = require_exists_operator();
      var is_null_operator_1 = require_is_null_operator();
      var replace_operator_1 = require_replace_operator();
      var is_number_operator_1 = require_is_number_operator();
      var coalesce_operator_1 = require_coalesce_operator();
      var round_operator_1 = require_round_operator();
      var every_operator_1 = require_every_operator();
      var some_operator_1 = require_some_operator();
      var is_nan_operator_1 = require_is_nan_operator();
      var trim_operator_1 = require_trim_operator();
      var none_operator_1 = require_none_operator();
      exports.operators = (/* @__PURE__ */ new Map()).set("$abs", abs_operator_1.$abs).set("$add", add_operator_1.$add).set("$and", and_operator_1.$and).set("$ceil", ceil_operator_1.$ceil).set("$coalesce", coalesce_operator_1.$coalesce).set("$cond", cond_operator_1.$cond).set("$concat", concat_operator_1.$concat).set("$dateDiff", date_diff_operator_1.$dateDiff).set("$divide", divide_operator_1.$divide).set("$eq", eq_operator_1.$eq).set("$every", every_operator_1.$every).set("$exists", exists_operator_1.$exists).set("$floor", floor_operator_1.$floor).set("$gt", gt_operator_1.$gt).set("$gte", gte_operator_1.$gte).set("$ifNull", if_null_operator_1.$ifNull).set("$in", in_operator_1.$in).set("$isNaN", is_nan_operator_1.$isNaN).set("$isNull", is_null_operator_1.$isNull).set("$isNumber", is_number_operator_1.$isNumber).set("$lt", lt_operator_1.$lt).set("$lte", lte_operator_1.$lte).set("$max", max_operator_1.$max).set("$min", min_operator_1.$min).set("$multiply", multiply_operator_1.$multiply).set("$ne", ne_operator_1.$ne).set("$nin", nin_operator_1.$nin).set("$none", none_operator_1.$none).set("$not", not_operator_1.$not).set("$or", or_operator_1.$or).set("$regex", regex_operator_1.$regex).set("$regexReplace", regex_replace_operator_1.$regexReplace).set("$replace", replace_operator_1.$replace).set("$round", round_operator_1.$round).set("$size", size_operator_1.$size).set("$slice", slice_operator_1.$slice).set("$some", some_operator_1.$some).set("$split", split_operator_1.$split).set("$substr", substr_operator_1.$substr).set("$subtract", subtract_operator_1.$subtract).set("$switch", switch_operator_1.$switch).set("$toFixed", to_fixed_operator_1.$toFixed).set("$toLower", to_lower_operator_1.$toLower).set("$toNumber", to_number_operator_1.$toNumber).set("$toString", to_string_operator_1.$toString).set("$toUpper", to_upper_operator_1.$toUpper).set("$trim", trim_operator_1.$trim);
    }
  });

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/helpers/is-valid-object-path.helper.js
  var require_is_valid_object_path_helper = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/helpers/is-valid-object-path.helper.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isValidObjectPath = isValidObjectPath;
      var forgefy_operators_1 = require_forgefy_operators();
      function isValidObjectPath(value) {
        return typeof value === "string" && value.startsWith("$") && value.length > 1 && !forgefy_operators_1.operators.has(value);
      }
    }
  });

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/common/get-value-by-path.common.js
  var require_get_value_by_path_common = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/common/get-value-by-path.common.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getValueByPath = getValueByPath;
      function getValueByPath(source, path) {
        return path.at(0) === "$" ? path.slice(1).split(".").reduce((obj, key) => obj === null || obj === void 0 ? void 0 : obj[key], source) : void 0;
      }
    }
  });

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/helpers/is-object.helper.js
  var require_is_object_helper = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/helpers/is-object.helper.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isObject = isObject;
      function isObject(value) {
        return value instanceof Object && !Array.isArray(value);
      }
    }
  });

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/helpers/is-operator.helper.js
  var require_is_operator_helper = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/helpers/is-operator.helper.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isOperator = isOperator;
      var forgefy_operators_1 = require_forgefy_operators();
      function isOperator(obj) {
        if (!obj || typeof obj !== "object") {
          return false;
        }
        const keys = Object.keys(obj);
        return keys.length === 1 && keys[0].startsWith("$") && forgefy_operators_1.operators.has(keys[0]);
      }
    }
  });

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/common/resolve-expression.common.js
  var require_resolve_expression_common = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/common/resolve-expression.common.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.resolveExpression = resolveExpression;
      var is_valid_object_path_helper_1 = require_is_valid_object_path_helper();
      var get_value_by_path_common_1 = require_get_value_by_path_common();
      var is_operator_helper_1 = require_is_operator_helper();
      var forgefy_operators_1 = require_forgefy_operators();
      function resolveExpression(source, expression) {
        try {
          if (typeof expression !== "object" || expression === null) {
            return expression;
          }
          if (Array.isArray(expression)) {
            return expression.map((item) => resolveExpression(source, item));
          }
          const keys = Object.keys(expression);
          if (keys.length !== 1) {
            throw new Error(`Expression must have exactly one operator key, found ${keys.length}`);
          }
          const key = keys[0];
          const operator = forgefy_operators_1.operators.get(key);
          if (!operator) {
            throw new Error(`Unknown operator: ${key}`);
          }
          const resolveArgs = (args2) => {
            if (args2 === null || args2 === void 0) {
              return args2;
            }
            if (Array.isArray(args2)) {
              return args2.map(resolveArgs);
            }
            if (typeof args2 === "string") {
              if ((0, is_valid_object_path_helper_1.isValidObjectPath)(args2)) {
                return (0, get_value_by_path_common_1.getValueByPath)(source, args2);
              }
              return args2;
            }
            if (typeof args2 === "object") {
              if ((0, is_operator_helper_1.isOperator)(args2)) {
                return resolveExpression(source, args2);
              }
              const resolved = {};
              for (const [k, v] of Object.entries(args2)) {
                resolved[k] = resolveArgs(v);
              }
              return resolved;
            }
            return args2;
          };
          const args = resolveArgs(expression[key]);
          return operator({ context: source })(args);
        } catch (e) {
          return null;
        }
      }
    }
  });

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/core/forgefy.core.js
  var require_forgefy_core = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/core/forgefy.core.js"(exports) {
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

  // node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/index.js
  var require_dist = __commonJS({
    "node_modules/.pnpm/json-forgefy@3.2.0/node_modules/json-forgefy/dist/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Forgefy = void 0;
      var forgefy_core_1 = require_forgefy_core();
      var Forgefy2 = {
        this: forgefy_core_1.forgefy
      };
      exports.Forgefy = Forgefy2;
    }
  });

  // forgefy-entry.js
  var forgefy_entry_exports = {};
  __export(forgefy_entry_exports, {
    Forgefy: () => import_json_forgefy.Forgefy
  });
  var import_json_forgefy = __toESM(require_dist());
  if (typeof window !== "undefined") {
    window.Forgefy = import_json_forgefy.Forgefy;
  }
  return __toCommonJS(forgefy_entry_exports);
})();
