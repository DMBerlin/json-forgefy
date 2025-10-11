// JSON Forgefy Browser Bundle
// Browser-compatible version of the JSON Forgefy library
// Generated: 2025-10-11T02:17:21.156Z

(function(global) {
    'use strict';

    // Core Forgefy implementation for browser
    const Forgefy = {
        this: function(payload, projection) {
            if (!payload || typeof payload !== 'object') {
                throw new Error('Payload must be a valid object');
            }
            if (!projection || typeof projection !== 'object') {
                throw new Error('Projection must be a valid object');
            }

            return transformObject(payload, projection, payload);
        }
    };

    // Helper function to get value by path
    function getValueByPath(obj, path) {
        if (!path || path === '') return obj;
        
        const keys = path.split('.');
        let current = obj;
        
        for (const key of keys) {
            if (current === null || current === undefined) {
                return undefined;
            }
            current = current[key];
        }
        
        return current;
    }

    // Helper function to check if value is an operator
    function isOperator(value) {
        return typeof value === 'object' && value !== null && 
               Object.keys(value).some(key => key.startsWith('$'));
    }

    // Helper function to check if value is a path reference
    function isPathReference(value) {
        return typeof value === 'string' && value.startsWith('$');
    }

    // Main transformation function
    function transformObject(payload, projection, rootPayload) {
        const result = {};
        
        for (const [key, value] of Object.entries(projection)) {
            try {
                result[key] = transformValue(payload, value, rootPayload);
            } catch (error) {
                console.warn(`Error transforming field "${key}":`, error.message);
                result[key] = null;
            }
        }
        
        return result;
    }

    // Transform a single value
    function transformValue(payload, value, rootPayload) {
        if (value === null || value === undefined) {
            return value;
        }

        if (isPathReference(value)) {
            const path = value.substring(1);
            return getValueByPath(rootPayload, path);
        }

        if (isOperator(value)) {
            return executeOperator(payload, value, rootPayload);
        }

        if (Array.isArray(value)) {
            return value.map(item => transformValue(payload, item, rootPayload));
        }

        if (typeof value === 'object') {
            return transformObject(payload, value, rootPayload);
        }

        return value;
    }

    // Execute operators
    function executeOperator(payload, operatorObj, rootPayload) {
        const operatorKeys = Object.keys(operatorObj).filter(key => key.startsWith('$'));
        
        if (operatorKeys.length === 0) {
            return transformObject(payload, operatorObj, rootPayload);
        }

        const operator = operatorKeys[0];
        const value = operatorObj[operator];
        return executeSingleOperator(operator, value, payload, rootPayload);
    }

    // Execute a single operator
    function executeSingleOperator(operator, value, payload, rootPayload) {
        switch (operator) {
            case '$add':
                return executeAdd(value, payload, rootPayload);
            case '$subtract':
                return executeSubtract(value, payload, rootPayload);
            case '$multiply':
                return executeMultiply(value, payload, rootPayload);
            case '$divide':
                return executeDivide(value, payload, rootPayload);
            case '$abs':
                return Math.abs(transformValue(payload, value, rootPayload));
            case '$ceil':
                return Math.ceil(transformValue(payload, value, rootPayload));
            case '$floor':
                return Math.floor(transformValue(payload, value, rootPayload));
            case '$max':
                return executeMax(value, payload, rootPayload);
            case '$min':
                return executeMin(value, payload, rootPayload);
            case '$toString':
                return String(transformValue(payload, value, rootPayload));
            case '$toNumber':
                return Number(transformValue(payload, value, rootPayload));
            case '$toUpper':
                return String(transformValue(payload, value, rootPayload)).toUpperCase();
            case '$toLower':
                return String(transformValue(payload, value, rootPayload)).toLowerCase();
            case '$concat':
                return executeConcat(value, payload, rootPayload);
            case '$substr':
                return executeSubstr(value, payload, rootPayload);
            case '$size':
                return executeSize(value, payload, rootPayload);
            case '$eq':
                return executeEq(value, payload, rootPayload);
            case '$ne':
                return executeNe(value, payload, rootPayload);
            case '$gt':
                return executeGt(value, payload, rootPayload);
            case '$gte':
                return executeGte(value, payload, rootPayload);
            case '$lt':
                return executeLt(value, payload, rootPayload);
            case '$lte':
                return executeLte(value, payload, rootPayload);
            case '$and':
                return executeAnd(value, payload, rootPayload);
            case '$or':
                return executeOr(value, payload, rootPayload);
            case '$not':
                return !transformValue(payload, value, rootPayload);
            case '$cond':
                return executeCond(value, payload, rootPayload);
            case '$ifNull':
                return executeIfNull(value, payload, rootPayload);
            case '$in':
                return executeIn(value, payload, rootPayload);
            case '$nin':
                return executeNin(value, payload, rootPayload);
            case '$exists':
                return executeExists(value, payload, rootPayload);
            case '$isNull':
                return executeIsNull(value, payload, rootPayload);
            default:
                console.warn(`Unknown operator: ${operator}`);
                return transformValue(payload, value, rootPayload);
        }
    }

    // Operator implementations
    function executeAdd(value, payload, rootPayload) {
        if (!Array.isArray(value)) return transformValue(payload, value, rootPayload);
        return value.reduce((sum, item) => sum + (Number(transformValue(payload, item, rootPayload)) || 0), 0);
    }

    function executeSubtract(value, payload, rootPayload) {
        if (!Array.isArray(value) || value.length < 2) return 0;
        const [first, ...rest] = value;
        const firstVal = Number(transformValue(payload, first, rootPayload)) || 0;
        return rest.reduce((result, item) => result - (Number(transformValue(payload, item, rootPayload)) || 0), firstVal);
    }

    function executeMultiply(value, payload, rootPayload) {
        if (!Array.isArray(value)) return transformValue(payload, value, rootPayload);
        return value.reduce((product, item) => product * (Number(transformValue(payload, item, rootPayload)) || 1), 1);
    }

    function executeDivide(value, payload, rootPayload) {
        if (!Array.isArray(value) || value.length < 2) return 0;
        const [first, ...rest] = value;
        const firstVal = Number(transformValue(payload, first, rootPayload)) || 0;
        return rest.reduce((result, item) => result / (Number(transformValue(payload, item, rootPayload)) || 1), firstVal);
    }

    function executeMax(value, payload, rootPayload) {
        if (!Array.isArray(value)) return transformValue(payload, value, rootPayload);
        const values = value.map(item => Number(transformValue(payload, item, rootPayload)) || 0);
        return Math.max(...values);
    }

    function executeMin(value, payload, rootPayload) {
        if (!Array.isArray(value)) return transformValue(payload, value, rootPayload);
        const values = value.map(item => Number(transformValue(payload, item, rootPayload)) || 0);
        return Math.min(...values);
    }

    function executeConcat(value, payload, rootPayload) {
        if (!Array.isArray(value)) return transformValue(payload, value, rootPayload);
        return value.map(item => transformValue(payload, item, rootPayload)).join('');
    }

    function executeSubstr(value, payload, rootPayload) {
        if (typeof value !== 'object' || !value.value) return '';
        const str = String(transformValue(payload, value.value, rootPayload));
        const start = Number(value.start) || 0;
        const length = Number(value.length) || str.length;
        return str.substr(start, length);
    }

    function executeSize(value, payload, rootPayload) {
        const transformed = transformValue(payload, value, rootPayload);
        if (Array.isArray(transformed) || typeof transformed === 'string') {
            return transformed.length;
        }
        return 0;
    }

    function executeEq(value, payload, rootPayload) {
        if (!Array.isArray(value) || value.length < 2) return false;
        const [first, second] = value;
        return transformValue(payload, first, rootPayload) === transformValue(payload, second, rootPayload);
    }

    function executeNe(value, payload, rootPayload) {
        return !executeEq(value, payload, rootPayload);
    }

    function executeGt(value, payload, rootPayload) {
        if (!Array.isArray(value) || value.length < 2) return false;
        const [first, second] = value;
        return (Number(transformValue(payload, first, rootPayload)) || 0) > (Number(transformValue(payload, second, rootPayload)) || 0);
    }

    function executeGte(value, payload, rootPayload) {
        if (!Array.isArray(value) || value.length < 2) return false;
        const [first, second] = value;
        return (Number(transformValue(payload, first, rootPayload)) || 0) >= (Number(transformValue(payload, second, rootPayload)) || 0);
    }

    function executeLt(value, payload, rootPayload) {
        if (!Array.isArray(value) || value.length < 2) return false;
        const [first, second] = value;
        return (Number(transformValue(payload, first, rootPayload)) || 0) < (Number(transformValue(payload, second, rootPayload)) || 0);
    }

    function executeLte(value, payload, rootPayload) {
        if (!Array.isArray(value) || value.length < 2) return false;
        const [first, second] = value;
        return (Number(transformValue(payload, first, rootPayload)) || 0) <= (Number(transformValue(payload, second, rootPayload)) || 0);
    }

    function executeAnd(value, payload, rootPayload) {
        if (!Array.isArray(value)) return transformValue(payload, value, rootPayload);
        return value.every(item => Boolean(transformValue(payload, item, rootPayload)));
    }

    function executeOr(value, payload, rootPayload) {
        if (!Array.isArray(value)) return transformValue(payload, value, rootPayload);
        return value.some(item => Boolean(transformValue(payload, item, rootPayload)));
    }

    function executeCond(value, payload, rootPayload) {
        if (typeof value !== 'object' || !value.if) return null;
        const condition = transformValue(payload, value.if, rootPayload);
        return Boolean(condition) ? transformValue(payload, value.then, rootPayload) : transformValue(payload, value.else, rootPayload);
    }

    function executeIfNull(value, payload, rootPayload) {
        if (!Array.isArray(value) || value.length < 2) return null;
        const [first, second] = value;
        const firstVal = transformValue(payload, first, rootPayload);
        return (firstVal === null || firstVal === undefined) ? transformValue(payload, second, rootPayload) : firstVal;
    }

    function executeIn(value, payload, rootPayload) {
        if (!Array.isArray(value) || value.length < 2) return false;
        const [first, second] = value;
        const firstVal = transformValue(payload, first, rootPayload);
        const secondVal = transformValue(payload, second, rootPayload);
        return Array.isArray(secondVal) && secondVal.includes(firstVal);
    }

    function executeNin(value, payload, rootPayload) {
        return !executeIn(value, payload, rootPayload);
    }

    function executeExists(value, payload, rootPayload) {
        if (typeof value !== 'string' || !value.startsWith('$')) return false;
        const path = value.substring(1);
        return getValueByPath(rootPayload, path) !== undefined;
    }

    function executeIsNull(value, payload, rootPayload) {
        const transformed = transformValue(payload, value, rootPayload);
        return transformed === null || transformed === undefined;
    }

    // Export to global scope for browser
    if (typeof window !== 'undefined') {
        window.Forgefy = Forgefy;
    } else if (typeof global !== 'undefined') {
        global.Forgefy = Forgefy;
    }

})(typeof window !== 'undefined' ? window : this);