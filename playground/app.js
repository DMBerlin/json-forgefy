// JSON Forgefy Playground Application

const payloadTextarea = document.getElementById('payload');
const projectionTextarea = document.getElementById('projection');
const resultPre = document.getElementById('result');
const transformBtn = document.getElementById('transform-btn');
const themeToggle = document.getElementById('theme-toggle');

// Example data
const examples = {
    basic: {
        payload: {
            user: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com'
            }
        },
        projection: {
            fullName: { $concat: ['$user.firstName', ' ', '$user.lastName'] },
            email: { $toLower: '$user.email' }
        }
    },
    math: {
        payload: {
            items: [
                { price: 10.50, quantity: 2 },
                { price: 25.00, quantity: 1 },
                { price: 5.75, quantity: 3 }
            ]
        },
        projection: {
            subtotal: {
                $add: [
                    { $multiply: ['$items.0.price', '$items.0.quantity'] },
                    { $multiply: ['$items.1.price', '$items.1.quantity'] },
                    { $multiply: ['$items.2.price', '$items.2.quantity'] }
                ]
            },
            itemCount: { $add: ['$items.0.quantity', '$items.1.quantity', '$items.2.quantity'] }
        }
    },
    conditional: {
        payload: {
            user: {
                age: 25,
                status: 'premium',
                balance: 150
            }
        },
        projection: {
            canAccess: {
                $cond: {
                    if: { $and: [{ $gte: ['$user.age', 18] }, { $eq: ['$user.status', 'premium'] }] },
                    then: 'Full Access',
                    else: 'Limited Access'
                }
            },
            accountLevel: {
                $cond: {
                    if: { $gte: ['$user.balance', 100] },
                    then: 'Gold',
                    else: 'Silver'
                }
            }
        }
    },
    string: {
        payload: {
            product: {
                name: 'laptop computer',
                sku: 'LAP-001',
                description: 'high performance laptop'
            }
        },
        projection: {
            displayName: { $toUpper: '$product.name' },
            sku: '$product.sku',
            shortDesc: {
                $concat: [
                    { $toUpper: { $substr: { value: '$product.description', start: 0, length: 1 } } },
                    { $substr: { value: '$product.description', start: 1, length: 100 } }
                ]
            }
        }
    },
    array: {
        payload: {
            orders: [
                { id: 1, status: 'completed', amount: 100 },
                { id: 2, status: 'pending', amount: 250 },
                { id: 3, status: 'completed', amount: 75 }
            ]
        },
        projection: {
            totalOrders: { $size: '$orders' },
            completedCount: {
                $size: {
                    $filter: {
                        input: '$orders',
                        cond: { $eq: ['$$this.status', 'completed'] }
                    }
                }
            }
        }
    },
    complex: {
        payload: {
            employee: {
                id: 12345,
                firstName: 'Sarah',
                lastName: 'Johnson',
                salary: 95000,
                bonus: 5000
            },
            performance: {
                rating: 4.5,
                projectsCompleted: 12
            }
        },
        projection: {
            profile: {
                id: '$employee.id',
                fullName: { $concat: ['$employee.firstName', ' ', '$employee.lastName'] }
            },
            compensation: {
                total: { $add: ['$employee.salary', '$employee.bonus'] },
                formatted: {
                    $concat: ['$', { $toString: { $add: ['$employee.salary', '$employee.bonus'] } }]
                }
            },
            performance: {
                rating: '$performance.rating',
                status: {
                    $cond: {
                        if: { $gte: ['$performance.rating', 4.0] },
                        then: 'Excellent',
                        else: 'Good'
                    }
                }
            }
        }
    }
};

// Load example
function loadExample(exampleKey) {
    const example = examples[exampleKey];
    if (!example) return;

    const payloadValue = JSON.stringify(example.payload, null, 2);
    const projectionValue = JSON.stringify(example.projection, null, 2);

    // Save as original values for undo functionality
    originalValues.payload = payloadValue;
    originalValues.projection = projectionValue;

    payloadTextarea.value = payloadValue;
    projectionTextarea.value = projectionValue;
    clearAllErrors();
    resultPre.textContent = '';
    highlightTextarea(payloadTextarea);
    highlightTextarea(projectionTextarea);

    setTimeout(() => transform(), 100);
}

// Validate JSON and show inline error
function validateJSON(targetId) {
    const element = document.getElementById(targetId);
    const errorDiv = document.getElementById(`error-${targetId}`);

    if (!element || !errorDiv) return true;

    const text = element.tagName === 'TEXTAREA' ? element.value : element.textContent;

    if (!text.trim()) {
        errorDiv.style.display = 'none';
        return true;
    }

    try {
        JSON.parse(text);
        errorDiv.style.display = 'none';
        return true;
    } catch (error) {
        errorDiv.textContent = `Invalid JSON: ${error.message}`;
        errorDiv.style.display = 'block';
        return false;
    }
}

// Clear specific field
function clearField(targetId) {
    const element = document.getElementById(targetId);
    const errorDiv = document.getElementById(`error-${targetId}`);

    if (element) {
        if (element.tagName === 'TEXTAREA') {
            element.value = '';
        } else {
            element.textContent = '';
        }
    }

    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

// Clear all errors
function clearAllErrors() {
    document.querySelectorAll('.error-inline').forEach(el => {
        el.style.display = 'none';
    });
}

// Copy to clipboard
async function copyToClipboard(targetId) {
    const element = document.getElementById(targetId);
    if (!element) return;

    const text = element.tagName === 'TEXTAREA' ? element.value : element.textContent;

    if (!text.trim()) {
        showToast('Nothing to copy', 'error');
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        showToast('✓ Copied!', 'success');
    } catch (error) {
        showToast('Failed to copy', 'error');
    }
}

// Beautify specific field
function beautifyField(targetId) {
    const element = document.getElementById(targetId);
    if (!element) return;

    const text = element.tagName === 'TEXTAREA' ? element.value : element.textContent;

    if (!text.trim()) {
        showToast('Nothing to beautify', 'error');
        return;
    }

    try {
        const parsed = JSON.parse(text);
        const beautified = JSON.stringify(parsed, null, 2);

        if (element.tagName === 'TEXTAREA') {
            element.value = beautified;
            highlightTextarea(element);
        } else {
            element.textContent = beautified;
            highlightJSON(element);
        }

        validateJSON(targetId);
        showToast('✓ Beautified!', 'success');
    } catch (error) {
        validateJSON(targetId);
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// Transform data
function transform() {
    clearAllErrors();
    resultPre.textContent = '';

    // Validate inputs first
    const payloadValid = validateJSON('payload');
    const projectionValid = validateJSON('projection');

    if (!payloadValid || !projectionValid) {
        return;
    }

    try {
        const payload = JSON.parse(payloadTextarea.value || '{}');
        const projection = JSON.parse(projectionTextarea.value || '{}');

        if (typeof Forgefy === 'undefined') {
            throw new Error('Forgefy library not loaded. Please refresh the page.');
        }

        const result = Forgefy.this(payload, projection);
        resultPre.textContent = JSON.stringify(result, null, 2);
        highlightJSON(resultPre);
        showToast('✓ Transformed!', 'success');
    } catch (error) {
        const errorDiv = document.getElementById('error-result');
        errorDiv.textContent = `Transformation Error: ${error.message}`;
        errorDiv.style.display = 'block';
        console.error('Transformation error:', error);
    }
}

// JSON syntax highlighting for result
function highlightJSON(element) {
    let json = element.textContent;

    json = json.replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:');
    json = json.replace(/: "([^"]*)"/g, ': <span class="json-string">"$1"</span>');
    json = json.replace(/: (-?\d+\.?\d*)/g, ': <span class="json-number">$1</span>');
    json = json.replace(/: (true|false)/g, ': <span class="json-boolean">$1</span>');
    json = json.replace(/: (null)/g, ': <span class="json-null">$1</span>');

    element.innerHTML = json;
}

// Syntax highlighting for textareas
function highlightTextarea(textarea) {
    if (!textarea.value.trim()) return;

    try {
        JSON.parse(textarea.value);
        // Valid JSON - add subtle highlight
        textarea.style.color = 'var(--text-primary)';
    } catch (e) {
        // Invalid JSON - keep normal
        textarea.style.color = 'var(--text-primary)';
    }
}

// Event listeners
transformBtn.addEventListener('click', transform);

// Action icon handlers
document.querySelectorAll('.action-icon').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const action = e.currentTarget.dataset.action;
        const target = e.currentTarget.dataset.target;

        if (action === 'copy') {
            copyToClipboard(target);
        } else if (action === 'clear') {
            clearField(target);
        } else if (action === 'beautify') {
            beautifyField(target);
        } else if (action === 'undo') {
            undoChanges(target);
        }
    });
});

// Example card handlers
document.querySelectorAll('.example-card').forEach(card => {
    card.addEventListener('click', (e) => {
        const example = e.currentTarget.dataset.example;
        loadExample(example);

        document.querySelectorAll('.example-card').forEach(c => c.classList.remove('active'));
        e.currentTarget.classList.add('active');
    });
});

// Real-time JSON validation on input
[payloadTextarea, projectionTextarea].forEach(textarea => {
    textarea.addEventListener('input', () => {
        const targetId = textarea.id;
        validateJSON(targetId);
        highlightTextarea(textarea);
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        transform();
    }
});

// Theme management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const isLight = savedTheme === 'light';

    if (isLight) {
        document.body.classList.add('light-theme');
        themeToggle.checked = true;
    } else {
        document.body.classList.remove('light-theme');
        themeToggle.checked = false;
    }
}

function toggleTheme() {
    const isLight = themeToggle.checked;

    if (isLight) {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }

    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

themeToggle.addEventListener('change', toggleTheme);

// Initialize
window.addEventListener('load', () => {
    initTheme();
    loadExample('basic');

    setTimeout(() => {
        const welcome = document.createElement('div');
        welcome.className = 'toast toast-info';
        welcome.innerHTML = '👋 Click an example below or press <kbd>Ctrl+Enter</kbd> to transform';
        document.body.appendChild(welcome);

        setTimeout(() => welcome.classList.add('show'), 10);
        setTimeout(() => {
            welcome.classList.remove('show');
            setTimeout(() => welcome.remove(), 300);
        }, 4000);
    }, 500);
});


// Original values for undo
const originalValues = {
    payload: null,
    projection: null
};

// Undo functionality
function undoChanges(targetId) {
    const element = document.getElementById(targetId);
    if (element && originalValues[targetId] !== null) {
        element.value = originalValues[targetId];
        validateJSON(targetId);
        highlightTextarea(element);
        showToast('✓ Reverted to original', 'success');
    } else {
        showToast('No original data to revert to', 'error');
    }
}

// Save original values
function saveOriginalValue(targetId, value) {
    if (originalValues[targetId] === null) {
        originalValues[targetId] = value;
    }
}

// Handle Tab key for indentation
function handleTabKey(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
        const textarea = e.target;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;

        if (e.shiftKey) {
            // Shift+Tab: Remove 2 spaces from the beginning of the line
            const lineStart = value.lastIndexOf('\n', start - 1) + 1;
            const lineEnd = value.indexOf('\n', start);
            const actualLineEnd = lineEnd === -1 ? value.length : lineEnd;
            const line = value.substring(lineStart, actualLineEnd);

            // Check if line starts with spaces
            if (line.startsWith('  ')) {
                // Remove 2 spaces
                textarea.value = value.substring(0, lineStart) + line.substring(2) + value.substring(actualLineEnd);
                textarea.selectionStart = textarea.selectionEnd = Math.max(lineStart, start - 2);
            }
        } else {
            // Tab: Insert 2 spaces
            textarea.value = value.substring(0, start) + '  ' + value.substring(end);
            textarea.selectionStart = textarea.selectionEnd = start + 2;
        }
    }
}

// Attach tab handler to textareas
[payloadTextarea, projectionTextarea].forEach(textarea => {
    textarea.addEventListener('keydown', handleTabKey);
});

// Forgefy Operators Autocomplete - API Reference
// Data loaded from api-reference-data.js (auto-generated from GUIDE.md)
// To update: run `pnpm run build:api` in playground directory

// Fallback if data not loaded
if (typeof forgefyOperators === 'undefined') {
    console.error('API reference data not loaded. Please run: pnpm run build:api');
    const forgefyOperators = [
        // === MATH OPERATORS ===
        {
            op: '$add',
            desc: 'Add numbers together',
            category: 'Math',
            usage: 'Sums all provided values and returns the total',
            params: 'Array of numbers',
            returns: 'Number',
            example: '{ $add: [10, 20, 30] } → 60',
            notes: 'Supports paths and nested operators'
        },
        {
            op: '$subtract',
            desc: 'Subtract numbers',
            category: 'Math',
            usage: 'Subtracts each subsequent number from the first',
            params: 'Array of numbers',
            returns: 'Number',
            example: '{ $subtract: [100, 20, 5] } → 75'
        },
        {
            op: '$multiply',
            desc: 'Multiply numbers',
            category: 'Math',
            usage: 'Multiplies all values together',
            params: 'Array of numbers',
            returns: 'Number',
            example: '{ $multiply: [5, 4, 2] } → 40'
        },
        {
            op: '$divide',
            desc: 'Divide numbers',
            category: 'Math',
            usage: 'Divides first number by each subsequent number',
            params: 'Array of numbers',
            returns: 'Number',
            example: '{ $divide: [100, 2, 5] } → 10'
        },
        {
            op: '$abs',
            desc: 'Absolute value',
            category: 'Math',
            usage: 'Returns absolute value of a number',
            params: 'Number',
            returns: 'Number',
            example: '{ $abs: -42 } → 42'
        },
        {
            op: '$ceil',
            desc: 'Round up',
            category: 'Math',
            usage: 'Rounds up to nearest integer',
            params: 'Number',
            returns: 'Number',
            example: '{ $ceil: 4.2 } → 5'
        },
        {
            op: '$floor',
            desc: 'Round down',
            category: 'Math',
            usage: 'Rounds down to nearest integer',
            params: 'Number',
            returns: 'Number',
            example: '{ $floor: 4.8 } → 4'
        },
        {
            op: '$max',
            desc: 'Maximum value',
            category: 'Math',
            usage: 'Returns largest number from array',
            params: 'Array of numbers',
            returns: 'Number',
            example: '{ $max: [10, 50, 30] } → 50'
        },
        {
            op: '$min',
            desc: 'Minimum value',
            category: 'Math',
            usage: 'Returns smallest number from array',
            params: 'Array of numbers',
            returns: 'Number',
            example: '{ $min: [10, 50, 30] } → 10'
        },
        {
            op: '$mod',
            desc: 'Modulo operation',
            category: 'Math',
            usage: 'Returns remainder of division',
            params: '{ dividend: number, divisor: number }',
            returns: 'Number',
            example: '{ $mod: { dividend: 10, divisor: 3 } } → 1'
        },
        {
            op: '$pow',
            desc: 'Power/exponentiation',
            category: 'Math',
            usage: 'Raises base to exponent power',
            params: '{ base: number, exponent: number }',
            returns: 'Number',
            example: '{ $pow: { base: 5, exponent: 2 } } → 25'
        },
        {
            op: '$sqrt',
            desc: 'Square root',
            category: 'Math',
            usage: 'Calculates square root of a number',
            params: '{ value: number }',
            returns: 'Number',
            example: '{ $sqrt: { value: 16 } } → 4'
        },
        {
            op: '$round',
            desc: 'Round to precision',
            category: 'Math',
            usage: 'Rounds to specified decimal places',
            params: '{ value: number, precision: number }',
            returns: 'Number',
            example: '{ $round: { value: 3.14159, precision: 2 } } → 3.14'
        },
        {
            op: '$toFixed',
            desc: 'Format decimal places',
            category: 'Math',
            usage: 'Truncates to specified precision',
            params: '{ value: number, precision: number }',
            returns: 'Number',
            example: '{ $toFixed: { value: 3.14159, precision: 2 } } → 3.14'
        },
        {
            op: '$trunc',
            desc: 'Truncate decimals',
            category: 'Math',
            usage: 'Removes decimal part without rounding',
            params: '{ value: number }',
            returns: 'Number',
            example: '{ $trunc: { value: 4.9 } } → 4'
        },

        // === STRING OPERATORS ===
        {
            op: '$concat',
            desc: 'Concatenate strings',
            category: 'String',
            usage: 'Joins multiple strings in order',
            params: 'Array of strings',
            returns: 'String',
            example: '{ $concat: ["$firstName", " ", "$lastName"] } → "John Doe"',
            notes: 'Commonly used for full names, URLs, or formatted text'
        },
        {
            op: '$toUpper',
            desc: 'Convert to uppercase',
            category: 'String',
            usage: 'Converts string to uppercase',
            params: 'String',
            returns: 'String',
            example: '{ $toUpper: "hello" } → "HELLO"'
        },
        {
            op: '$toLower',
            desc: 'Convert to lowercase',
            category: 'String',
            usage: 'Converts string to lowercase',
            params: 'String',
            returns: 'String',
            example: '{ $toLower: "HELLO" } → "hello"'
        },
        {
            op: '$substr',
            desc: 'Extract substring',
            category: 'String',
            usage: 'Extracts part of string by position and length',
            params: '{ value: string, start: number, length: number }',
            returns: 'String',
            example: '{ $substr: { value: "Hello", start: 1, length: 3 } } → "ell"'
        },
        {
            op: '$slice',
            desc: 'Slice string',
            category: 'String',
            usage: 'Extracts section using start and end indices',
            params: '{ input: string, start: number, end?: number }',
            returns: 'String',
            example: '{ $slice: { input: "Hello", start: 0, end: 2 } } → "He"'
        },
        {
            op: '$split',
            desc: 'Split string',
            category: 'String',
            usage: 'Splits string into array by delimiter',
            params: '{ input: string, delimiter: string }',
            returns: 'Array',
            example: '{ $split: { input: "a,b,c", delimiter: "," } } → ["a","b","c"]'
        },
        {
            op: '$trim',
            desc: 'Trim whitespace',
            category: 'String',
            usage: 'Removes whitespace or specified chars from both ends',
            params: '{ input: string, chars?: string[] }',
            returns: 'String',
            example: '{ $trim: { input: "  hello  ", chars: [" "] } } → "hello"'
        },
        {
            op: '$ltrim',
            desc: 'Trim left',
            category: 'String',
            usage: 'Removes chars from start of string',
            params: '{ input: string, chars?: string[] }',
            returns: 'String',
            example: '{ $ltrim: { input: "  hello" } } → "hello"'
        },
        {
            op: '$rtrim',
            desc: 'Trim right',
            category: 'String',
            usage: 'Removes chars from end of string',
            params: '{ input: string, chars?: string[] }',
            returns: 'String',
            example: '{ $rtrim: { input: "hello  " } } → "hello"'
        },
        {
            op: '$replace',
            desc: 'Replace multiple values',
            category: 'String',
            usage: 'Replaces multiple search values with replacement',
            params: '{ input: string, searchValues: string[], replacement: string }',
            returns: 'String',
            example: '{ $replace: { input: "123.456-78", searchValues: [".", "-"], replacement: "" } } → "12345678"'
        },
        {
            op: '$replaceOne',
            desc: 'Replace first occurrence',
            category: 'String',
            usage: 'Replaces first match only',
            params: '{ input: string, search: string, replacement: string }',
            returns: 'String',
            example: '{ $replaceOne: { input: "Hi Hi", search: "Hi", replacement: "Hello" } } → "Hello Hi"'
        },
        {
            op: '$replaceAll',
            desc: 'Replace all occurrences',
            category: 'String',
            usage: 'Replaces all matches',
            params: '{ input: string, search: string, replacement: string }',
            returns: 'String',
            example: '{ $replaceAll: { input: "Hi Hi", search: "Hi", replacement: "Hello" } } → "Hello Hello"'
        },
        {
            op: '$regexReplace',
            desc: 'Replace with regex',
            category: 'String',
            usage: 'Replaces using regex pattern',
            params: '{ input: string, pattern: string, replacement: string, flags?: string }',
            returns: 'String',
            example: '{ $regexReplace: { input: "hello  world", pattern: "\\s+", replacement: " " } } → "hello world"'
        },
        {
            op: '$size',
            desc: 'Get length',
            category: 'String',
            usage: 'Returns length of string or array',
            params: 'String or Array',
            returns: 'Number',
            example: '{ $size: "Hello" } → 5'
        },
        {
            op: '$indexOf',
            desc: 'Find substring position',
            category: 'String',
            usage: 'Returns index of first occurrence',
            params: '{ input: string, substring: string, start?: number }',
            returns: 'Number',
            example: '{ $indexOf: { input: "Hello", substring: "llo" } } → 2'
        },

        // === COMPARISON OPERATORS ===
        {
            op: '$eq',
            desc: 'Equal to',
            category: 'Comparison',
            usage: 'Checks if values are equal',
            params: 'Array with 2 values',
            returns: 'Boolean',
            example: '{ $eq: [5, 5] } → true'
        },
        {
            op: '$ne',
            desc: 'Not equal to',
            category: 'Comparison',
            usage: 'Checks if values are not equal',
            params: 'Array with 2 values',
            returns: 'Boolean',
            example: '{ $ne: [5, 3] } → true'
        },
        {
            op: '$gt',
            desc: 'Greater than',
            category: 'Comparison',
            usage: 'Checks if first > second',
            params: 'Array with 2 values',
            returns: 'Boolean',
            example: '{ $gt: [10, 5] } → true'
        },
        {
            op: '$gte',
            desc: 'Greater than or equal',
            category: 'Comparison',
            usage: 'Checks if first >= second',
            params: 'Array with 2 values',
            returns: 'Boolean',
            example: '{ $gte: [5, 5] } → true'
        },
        {
            op: '$lt',
            desc: 'Less than',
            category: 'Comparison',
            usage: 'Checks if first < second',
            params: 'Array with 2 values',
            returns: 'Boolean',
            example: '{ $lt: [3, 5] } → true'
        },
        {
            op: '$lte',
            desc: 'Less than or equal',
            category: 'Comparison',
            usage: 'Checks if first <= second',
            params: 'Array with 2 values',
            returns: 'Boolean',
            example: '{ $lte: [5, 5] } → true'
        },
        {
            op: '$in',
            desc: 'Value in array',
            category: 'Comparison',
            usage: 'Checks if value exists in array',
            params: 'Array with [value, array]',
            returns: 'Boolean',
            example: '{ $in: ["a", ["a", "b", "c"]] } → true'
        },
        {
            op: '$nin',
            desc: 'Value not in array',
            category: 'Comparison',
            usage: 'Checks if value not in array',
            params: 'Array with [value, array]',
            returns: 'Boolean',
            example: '{ $nin: ["d", ["a", "b", "c"]] } → true'
        },
        {
            op: '$regex',
            desc: 'Regular expression match',
            category: 'Comparison',
            usage: 'Tests string against regex pattern',
            params: '{ value: string, pattern: string }',
            returns: 'Boolean',
            example: '{ $regex: { value: "test@email.com", pattern: "^[^@]+@[^@]+$" } } → true'
        },

        // === LOGICAL OPERATORS ===
        {
            op: '$and',
            desc: 'Logical AND',
            category: 'Logical',
            usage: 'Returns true if all expressions are true',
            params: 'Array of expressions',
            returns: 'Boolean',
            example: '{ $and: [true, true, false] } → false',
            notes: 'Short-circuit evaluation'
        },
        {
            op: '$or',
            desc: 'Logical OR',
            category: 'Logical',
            usage: 'Returns true if any expression is true',
            params: 'Array of expressions',
            returns: 'Boolean',
            example: '{ $or: [false, true, false] } → true',
            notes: 'Short-circuit evaluation'
        },
        {
            op: '$not',
            desc: 'Logical NOT',
            category: 'Logical',
            usage: 'Inverts boolean value',
            params: 'Expression',
            returns: 'Boolean',
            example: '{ $not: true } → false'
        },
        {
            op: '$none',
            desc: 'None are true',
            category: 'Logical',
            usage: 'Returns true if all expressions are false',
            params: 'Array of expressions',
            returns: 'Boolean',
            example: '{ $none: [false, false] } → true'
        },

        // === CONDITIONAL OPERATORS ===
        {
            op: '$cond',
            desc: 'If-then-else conditional',
            category: 'Conditional',
            usage: 'Evaluates condition and returns one of two values',
            params: '{ if: condition, then: value, else: value }',
            returns: 'Any',
            example: '{ $cond: { if: { $gt: ["$age", 18] }, then: "Adult", else: "Minor" } }',
            notes: 'Essential for conditional logic in transformations'
        },
        {
            op: '$switch',
            desc: 'Multi-branch conditional',
            category: 'Conditional',
            usage: 'Evaluates multiple cases like a switch statement',
            params: '{ branches: [{ case: condition, then: value }], default: value }',
            returns: 'Any',
            example: '{ $switch: { branches: [{ case: true, then: "A" }], default: "B" } }'
        },
        {
            op: '$ifNull',
            desc: 'Null coalescing',
            category: 'Conditional',
            usage: 'Returns first non-null value',
            params: 'Array with 2 values',
            returns: 'Any',
            example: '{ $ifNull: [null, "default"] } → "default"'
        },
        {
            op: '$coalesce',
            desc: 'First non-null/undefined value',
            category: 'Conditional',
            usage: 'Returns first value that is not null or undefined',
            params: 'Array of values',
            returns: 'Any',
            example: '{ $coalesce: [null, undefined, "value"] } → "value"',
            notes: 'Like SQL COALESCE or JS nullish coalescing (??)'
        },
        {
            op: '$some',
            desc: 'At least one condition true',
            category: 'Conditional',
            usage: 'If any condition passes, execute then branch',
            params: '{ conditions: array, then: value, else: value }',
            returns: 'Any',
            example: '{ $some: { conditions: [true, false], then: "yes", else: "no" } } → "yes"'
        },
        {
            op: '$every',
            desc: 'All conditions true',
            category: 'Conditional',
            usage: 'If all conditions pass, execute then branch',
            params: '{ conditions: array, then: value, else: value }',
            returns: 'Any',
            example: '{ $every: { conditions: [true, true], then: "yes", else: "no" } } → "yes"'
        },

        // === ARRAY OPERATORS ===
        {
            op: '$filter',
            desc: 'Filter array',
            category: 'Array',
            usage: 'Filters elements based on condition',
            params: '{ input: array, condition: expression }',
            returns: 'Array',
            example: '{ $filter: { input: "$items", condition: { $gt: ["$current.price", 10] } } }',
            notes: 'Use $current for element, $index for position'
        },
        {
            op: '$map',
            desc: 'Transform array',
            category: 'Array',
            usage: 'Transforms each element with expression',
            params: '{ input: array, expression: expression }',
            returns: 'Array',
            example: '{ $map: { input: "$items", expression: { $multiply: ["$current", 2] } } }',
            notes: 'Use $current for element, $index for position'
        },
        {
            op: '$reduce',
            desc: 'Reduce array',
            category: 'Array',
            usage: 'Reduces array to single value',
            params: '{ input: array, initialValue: any, expression: expression }',
            returns: 'Any',
            example: '{ $reduce: { input: [1,2,3], initialValue: 0, expression: { $add: ["$accumulated", "$current"] } } }',
            notes: 'Use $accumulated and $current in expression'
        },
        {
            op: '$sum',
            desc: 'Sum array',
            category: 'Array',
            usage: 'Calculates sum of number array',
            params: '{ values: array }',
            returns: 'Number',
            example: '{ $sum: { values: [10, 20, 30] } } → 60'
        },
        {
            op: '$avg',
            desc: 'Average array',
            category: 'Array',
            usage: 'Calculates average of number array',
            params: '{ values: array }',
            returns: 'Number',
            example: '{ $avg: { values: [10, 20, 30] } } → 20'
        },
        {
            op: '$arrayAt',
            desc: 'Get element at index',
            category: 'Array',
            usage: 'Returns element at specific index',
            params: '{ input: array, index: number }',
            returns: 'Any',
            example: '{ $arrayAt: { input: [10,20,30], index: 1 } } → 20',
            notes: 'Supports negative indices'
        },
        {
            op: '$arrayFirst',
            desc: 'Get first element',
            category: 'Array',
            usage: 'Returns first array element',
            params: '{ input: array }',
            returns: 'Any',
            example: '{ $arrayFirst: { input: [10,20,30] } } → 10'
        },
        {
            op: '$arrayLast',
            desc: 'Get last element',
            category: 'Array',
            usage: 'Returns last array element',
            params: '{ input: array }',
            returns: 'Any',
            example: '{ $arrayLast: { input: [10,20,30] } } → 30'
        },

        // === TYPE OPERATORS ===
        {
            op: '$toString',
            desc: 'Convert to string',
            category: 'Type',
            usage: 'Converts value to string',
            params: 'Any value',
            returns: 'String',
            example: '{ $toString: 123 } → "123"'
        },
        {
            op: '$toNumber',
            desc: 'Convert to number',
            category: 'Type',
            usage: 'Converts value to number',
            params: 'Any value',
            returns: 'Number',
            example: '{ $toNumber: "123" } → 123'
        },
        {
            op: '$toDate',
            desc: 'Convert to date',
            category: 'Type',
            usage: 'Converts value to Date object',
            params: 'String, number, or Date',
            returns: 'Date',
            example: '{ $toDate: "2024-01-15T10:30:00Z" }'
        },
        {
            op: '$type',
            desc: 'Get value type',
            category: 'Type',
            usage: 'Returns type of value as string',
            params: 'Any value',
            returns: 'String',
            example: '{ $type: 42 } → "number"',
            notes: 'Returns: string, number, boolean, array, object, null, undefined, date'
        },
        {
            op: '$exists',
            desc: 'Check if field exists',
            category: 'Type',
            usage: 'Checks if field exists in source',
            params: 'Field path string',
            returns: 'Boolean',
            example: '{ $exists: "user.email" } → true/false'
        },
        {
            op: '$isNull',
            desc: 'Check if null',
            category: 'Type',
            usage: 'Checks if value is null or undefined',
            params: 'Any value',
            returns: 'Boolean',
            example: '{ $isNull: null } → true'
        },
        {
            op: '$isNumber',
            desc: 'Check if number',
            category: 'Type',
            usage: 'Checks if value is a valid number',
            params: 'Any value',
            returns: 'Boolean',
            example: '{ $isNumber: 123 } → true'
        },
        {
            op: '$isNaN',
            desc: 'Check if NaN',
            category: 'Type',
            usage: 'Checks if value is NaN',
            params: 'Any value',
            returns: 'Boolean',
            example: '{ $isNaN: NaN } → true'
        },
        {
            op: '$isString',
            desc: 'Check if string',
            category: 'Type',
            usage: 'Checks if value is a string',
            params: 'Any value',
            returns: 'Boolean',
            example: '{ $isString: "hello" } → true'
        },
        {
            op: '$isBoolean',
            desc: 'Check if boolean',
            category: 'Type',
            usage: 'Checks if value is a boolean',
            params: 'Any value',
            returns: 'Boolean',
            example: '{ $isBoolean: true } → true'
        },
        {
            op: '$isArray',
            desc: 'Check if array',
            category: 'Type',
            usage: 'Checks if value is an array',
            params: 'Any value',
            returns: 'Boolean',
            example: '{ $isArray: [1,2,3] } → true'
        },
        {
            op: '$isDate',
            desc: 'Check if valid date',
            category: 'Type',
            usage: 'Checks if value is valid Date or date string',
            params: 'Any value',
            returns: 'Boolean',
            example: '{ $isDate: "2025-01-15" } → true'
        },

        // === DATE OPERATORS ===
        {
            op: '$addDays',
            desc: 'Add/subtract days',
            category: 'Date',
            usage: 'Adds or subtracts days from date',
            params: '{ date: date, days: number }',
            returns: 'ISO-8601 string',
            example: '{ $addDays: { date: "2025-01-01", days: 5 } } → "2025-01-06"'
        },
        {
            op: '$dateDiff',
            desc: 'Date difference',
            category: 'Date',
            usage: 'Calculates difference between dates',
            params: '{ startDate: date, endDate: date, unit: "days"|"months"|"years" }',
            returns: 'Number',
            example: '{ $dateDiff: { startDate: "$start", endDate: "$end", unit: "days" } }'
        },
        {
            op: '$dateShift',
            desc: 'Shift to business day',
            category: 'Date',
            usage: 'Adjusts dates to business days',
            params: '{ date: date, strategy: "rollForward"|"rollBackward"|"keep" }',
            returns: 'ISO-8601 string',
            example: '{ $dateShift: { date: "2025-03-01", strategy: "rollForward" } }',
            notes: 'Supports custom holidays and weekends'
        },
        {
            op: '$dayOfMonth',
            desc: 'Day of month',
            category: 'Date',
            usage: 'Extracts day of month (1-31)',
            params: 'Date or { date: date, timezone?: string }',
            returns: 'Number',
            example: '{ $dayOfMonth: "2024-01-15" } → 15'
        },
        {
            op: '$dayOfWeek',
            desc: 'Day of week',
            category: 'Date',
            usage: 'Extracts day of week (0-6, Sunday=0)',
            params: 'Date or { date: date, timezone?: string }',
            returns: 'Number',
            example: '{ $dayOfWeek: "2024-01-15" } → 1'
        },
        {
            op: '$dayOfYear',
            desc: 'Day of year',
            category: 'Date',
            usage: 'Extracts day of year (1-366)',
            params: 'Date or { date: date, timezone?: string }',
            returns: 'Number',
            example: '{ $dayOfYear: "2024-01-15" } → 15'
        },
        {
            op: '$isWeekend',
            desc: 'Check if weekend',
            category: 'Date',
            usage: 'Checks if date falls on weekend',
            params: 'Date or { date: date, weekends?: number[] }',
            returns: 'Boolean',
            example: '{ $isWeekend: "2025-01-04" } → true',
            notes: 'Supports custom weekend days'
        },
        {
            op: '$isHoliday',
            desc: 'Check if holiday',
            category: 'Date',
            usage: 'Checks if date is in holidays list',
            params: '{ date: date, holidays: string[] }',
            returns: 'Boolean',
            example: '{ $isHoliday: { date: "2025-01-01", holidays: ["2025-01-01"] } } → true'
        }
    ];
}

let autocompleteState = {
    visible: false,
    selectedIndex: 0,
    items: [],
    textarea: null,
    container: null,
    cursorPos: 0
};

// Show autocomplete
function showAutocomplete(textarea, query, cursorPos) {
    const containerId = `autocomplete-${textarea.id}`;
    const container = document.getElementById(containerId);

    if (!container) return;

    // Filter operators
    const filtered = forgefyOperators.filter(item =>
        item.op.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) {
        hideAutocomplete();
        return;
    }

    // Update state
    autocompleteState = {
        visible: true,
        selectedIndex: 0,
        items: filtered,
        textarea: textarea,
        container: container,
        cursorPos: cursorPos,
        query: query
    };

    // Render items
    container.innerHTML = filtered.map((item, index) => `
        <div class="autocomplete-item ${index === 0 ? 'selected' : ''}" data-index="${index}">
            <div class="autocomplete-header">
                <div>
                    <div class="autocomplete-operator">${item.op}</div>
                    <div class="autocomplete-desc">${item.desc} • ${item.category}</div>
                </div>
                <button class="autocomplete-expand" data-index="${index}" title="Show details">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"/>
                    </svg>
                </button>
            </div>
            <div class="autocomplete-details" data-index="${index}">
                <div class="autocomplete-usage">${item.usage}</div>
                <div class="autocomplete-example">${item.example}</div>
            </div>
        </div>
    `).join('');

    // Position autocomplete
    const rect = textarea.getBoundingClientRect();
    const lineHeight = 20;
    const lines = textarea.value.substr(0, cursorPos).split('\n').length;

    container.style.display = 'block';
    container.style.top = `${Math.min(lines * lineHeight, 100)}px`;
    container.style.left = '10px';

    // Add click handlers
    container.querySelectorAll('.autocomplete-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (!e.target.closest('.autocomplete-expand')) {
                const index = parseInt(item.dataset.index);
                selectAutocompleteItem(index);
            }
        });
    });

    // Add expand button handlers
    container.querySelectorAll('.autocomplete-expand').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = btn.dataset.index;
            const details = container.querySelector(`.autocomplete-details[data-index="${index}"]`);
            const isVisible = details.classList.contains('visible');

            // Close all other details
            container.querySelectorAll('.autocomplete-details').forEach(d => d.classList.remove('visible'));
            container.querySelectorAll('.autocomplete-expand').forEach(b => b.classList.remove('expanded'));

            // Toggle current
            if (!isVisible) {
                details.classList.add('visible');
                btn.classList.add('expanded');
            }
        });
    });
}

// Hide autocomplete
function hideAutocomplete() {
    if (autocompleteState.container) {
        autocompleteState.container.style.display = 'none';
    }
    autocompleteState.visible = false;
}

// Select autocomplete item
function selectAutocompleteItem(index) {
    if (!autocompleteState.visible || !autocompleteState.items[index]) return;

    const item = autocompleteState.items[index];
    const textarea = autocompleteState.textarea;
    const value = textarea.value;
    const cursorPos = autocompleteState.cursorPos;
    const query = autocompleteState.query;

    // Find the start of the $ operator
    let start = cursorPos - query.length;

    // Replace the partial operator with the full one
    const before = value.substring(0, start);
    const after = value.substring(cursorPos);
    textarea.value = before + item.op + after;

    // Set cursor position after the inserted operator
    const newPos = start + item.op.length;
    textarea.setSelectionRange(newPos, newPos);
    textarea.focus();

    hideAutocomplete();
}

// Navigate autocomplete
function navigateAutocomplete(direction) {
    if (!autocompleteState.visible) return;

    const items = autocompleteState.container.querySelectorAll('.autocomplete-item');
    items[autocompleteState.selectedIndex].classList.remove('selected');

    if (direction === 'down') {
        autocompleteState.selectedIndex = (autocompleteState.selectedIndex + 1) % items.length;
    } else {
        autocompleteState.selectedIndex = (autocompleteState.selectedIndex - 1 + items.length) % items.length;
    }

    items[autocompleteState.selectedIndex].classList.add('selected');
    items[autocompleteState.selectedIndex].scrollIntoView({ block: 'nearest' });
}

// Handle textarea input for autocomplete
function handleAutocompleteInput(e) {
    const textarea = e.target;
    const value = textarea.value;
    const cursorPos = textarea.selectionStart;

    // Find if we're typing a $ operator
    let start = cursorPos - 1;
    while (start >= 0 && value[start] !== '"' && value[start] !== ' ' && value[start] !== '\n' && value[start] !== '{' && value[start] !== '[' && value[start] !== ':') {
        start--;
    }
    start++;

    const currentWord = value.substring(start, cursorPos);

    if (currentWord.startsWith('$') && currentWord.length > 1) {
        showAutocomplete(textarea, currentWord, cursorPos);
    } else {
        hideAutocomplete();
    }
}

// Handle keyboard navigation
function handleAutocompleteKeydown(e) {
    if (!autocompleteState.visible) return;

    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            navigateAutocomplete('down');
            break;
        case 'ArrowUp':
            e.preventDefault();
            navigateAutocomplete('up');
            break;
        case 'Enter':
        case 'Tab':
            e.preventDefault();
            selectAutocompleteItem(autocompleteState.selectedIndex);
            break;
        case 'Escape':
            e.preventDefault();
            hideAutocomplete();
            break;
    }
}

// Attach autocomplete to projection textarea
projectionTextarea.addEventListener('input', handleAutocompleteInput);
projectionTextarea.addEventListener('keydown', handleAutocompleteKeydown);

// Hide autocomplete when clicking outside
document.addEventListener('click', (e) => {
    if (autocompleteState.visible &&
        !e.target.closest('.autocomplete-container') &&
        e.target !== projectionTextarea) {
        hideAutocomplete();
    }
});


// API Reference Sidebar
const apiReferenceSidebar = document.getElementById('api-reference-sidebar');
const apiReferenceOverlay = document.getElementById('api-reference-overlay');
const apiReferenceBtn = document.getElementById('api-reference-btn');
const closeApiReferenceBtn = document.getElementById('close-api-reference');
const apiSearchInput = document.getElementById('api-search');
const apiReferenceContent = document.getElementById('api-reference-content');
const apiReferenceDetail = document.getElementById('api-reference-detail');

let selectedOperator = null;

// Open API Reference
function openApiReference() {
    apiReferenceSidebar.classList.add('active');
    apiReferenceOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close API Reference
function closeApiReference() {
    apiReferenceSidebar.classList.remove('active');
    apiReferenceOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Generate Operator List (Right Column)
function generateApiReferenceContent(searchTerm = '') {
    // Group operators by category
    const categories = {};

    forgefyOperators.forEach(op => {
        if (!categories[op.category]) {
            categories[op.category] = [];
        }
        categories[op.category].push(op);
    });

    // Filter by search term
    let filteredCategories = {};
    if (searchTerm) {
        Object.keys(categories).forEach(category => {
            const filtered = categories[category].filter(op =>
                op.op.toLowerCase().includes(searchTerm.toLowerCase()) ||
                op.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                op.usage.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (filtered.length > 0) {
                filteredCategories[category] = filtered;
            }
        });
    } else {
        filteredCategories = categories;
    }

    // Check if no results
    if (Object.keys(filteredCategories).length === 0) {
        apiReferenceContent.innerHTML = `
            <div class="api-no-results">
                <div class="api-no-results-icon">🔍</div>
                <p>No operators found matching "${searchTerm}"</p>
            </div>
        `;
        return;
    }

    // Category order
    const categoryOrder = ['Math', 'String', 'Type', 'Comparison', 'Logical', 'Conditional', 'Array', 'Validation', 'Date'];
    const categoryIcons = {
        'Math': '🔢',
        'String': '📝',
        'Type': '🔄',
        'Comparison': '⚖️',
        'Logical': '🔀',
        'Conditional': '🔀',
        'Array': '📊',
        'Validation': '✅',
        'Date': '📅'
    };

    // Generate HTML
    let html = '';
    categoryOrder.forEach(category => {
        if (filteredCategories[category]) {
            const operators = filteredCategories[category];
            const icon = categoryIcons[category] || '📌';

            html += `
                <div class="api-category">
                    <div class="api-category-title" onclick="toggleCategory(this)">
                        <div class="api-category-title-left">
                            <span>${icon} ${category}</span>
                            <span class="api-category-count">(${operators.length})</span>
                        </div>
                        <span class="api-category-arrow">▼</span>
                    </div>
                    <div class="api-category-items">
            `;

            operators.forEach(op => {
                const isActive = selectedOperator === op.op ? 'active' : '';
                html += `
                    <div class="api-operator-item ${isActive}" data-operator="${op.op}" onclick="showOperatorDetail('${op.op}')">
                        <div class="api-operator-item-name">${op.op}</div>
                        <div class="api-operator-item-desc">${op.desc}</div>
                    </div>
                `;
            });

            html += '</div></div>';
        }
    });

    apiReferenceContent.innerHTML = html;
}

// Toggle category accordion
function toggleCategory(element) {
    const category = element.closest('.api-category');
    category.classList.toggle('collapsed');
}

// Show Operator Detail (Left Column)
function showOperatorDetail(operatorName) {
    const operator = forgefyOperators.find(op => op.op === operatorName);
    if (!operator) return;

    selectedOperator = operatorName;

    // Update active state in list
    document.querySelectorAll('.api-operator-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.operator === operatorName) {
            item.classList.add('active');
        }
    });

    // Category icons
    const categoryIcons = {
        'Math': '🔢',
        'String': '📝',
        'Type': '🔄',
        'Comparison': '⚖️',
        'Logical': '🔀',
        'Conditional': '🔀',
        'Array': '📊',
        'Validation': '✅',
        'Date': '📅'
    };

    const icon = categoryIcons[operator.category] || '📌';

    // Generate detailed view
    let html = `
        <div class="api-detail-header">
            <div class="api-detail-title">${operator.op}</div>
            <div class="api-detail-category">${icon} ${operator.category}</div>
            <div class="api-detail-desc">${operator.desc}</div>
            <div class="api-detail-usage">${operator.usage}</div>
        </div>
    `;

    // Parameters section (if available)
    if (operator.params) {
        html += `
            <div class="api-detail-section">
                <div class="api-detail-section-title">📥 Parameters</div>
                <div class="api-detail-example">
                    <div class="api-detail-code">${escapeHtml(operator.params)}</div>
                </div>
            </div>
        `;
    }

    // Returns section (if available)
    if (operator.returns) {
        html += `
            <div class="api-detail-section">
                <div class="api-detail-section-title">📤 Returns</div>
                <div class="api-detail-example">
                    <div class="api-detail-code">${escapeHtml(operator.returns)}</div>
                </div>
            </div>
        `;
    }

    // Example section
    html += `
        <div class="api-detail-section">
            <div class="api-detail-section-title">📋 Example</div>
            <div class="api-detail-example">
                <div class="api-detail-example-label">Usage</div>
                <div class="api-detail-code">${escapeHtml(operator.example)}</div>
            </div>
        </div>

        <div class="api-detail-section">
            <div class="api-detail-section-title">💡 How to Use</div>
            <div class="api-detail-example">
                <div class="api-detail-example-label">In your projection</div>
                <div class="api-detail-code">{
  "result": ${escapeHtml(operator.example.match(/\{[^}]+\}/)?.[0] || operator.op)}
}</div>
            </div>
        </div>
    `;

    // Notes section (if available)
    if (operator.notes) {
        html += `
            <div class="api-detail-section">
                <div class="api-detail-section-title">💭 Notes</div>
                <div class="api-detail-example">
                    <div class="api-detail-code">${escapeHtml(operator.notes)}</div>
                </div>
            </div>
        `;
    }

    html += `
        <div class="api-detail-actions">
            <button class="api-detail-btn api-detail-btn-primary" onclick="copyOperatorExample('${operator.op}')">
                📋 Copy Example
            </button>
        </div>
    `;

    apiReferenceDetail.innerHTML = html;
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Copy operator example
function copyOperatorExample(operatorName) {
    const operator = forgefyOperators.find(op => op.op === operatorName);
    if (!operator) return;

    const exampleMatch = operator.example.match(/\{[^}]+\}/);
    if (exampleMatch) {
        navigator.clipboard.writeText(exampleMatch[0]).then(() => {
            showToast('✓ Example copied!', 'success');
        });
    }
}

// Try operator - insert example into projection
function tryOperator(operatorName) {
    const operator = forgefyOperators.find(op => op.op === operatorName);
    if (!operator) return;

    // Extract just the operator part from the example
    const exampleMatch = operator.example.match(/\{[^}]+\}/);
    if (exampleMatch) {
        const operatorExample = exampleMatch[0];

        // Create a simple projection with the operator
        const projection = {
            result: JSON.parse(operatorExample)
        };

        projectionTextarea.value = JSON.stringify(projection, null, 2);
        highlightTextarea(projectionTextarea);

        // Close sidebar
        closeApiReference();

        // Focus on projection textarea
        projectionTextarea.focus();

        showToast(`✓ ${operatorName} example loaded!`, 'success');
    }
}

// Event listeners
apiReferenceBtn.addEventListener('click', () => {
    openApiReference();
    generateApiReferenceContent();
});

closeApiReferenceBtn.addEventListener('click', closeApiReference);
apiReferenceOverlay.addEventListener('click', closeApiReference);

// Search functionality
apiSearchInput.addEventListener('input', (e) => {
    generateApiReferenceContent(e.target.value);
});

// Keyboard shortcut to open API Reference (Ctrl+K or Cmd+K)
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (apiReferenceSidebar.classList.contains('active')) {
            closeApiReference();
        } else {
            openApiReference();
            generateApiReferenceContent();
            setTimeout(() => apiSearchInput.focus(), 100);
        }
    }

    // ESC to close
    if (e.key === 'Escape' && apiReferenceSidebar.classList.contains('active')) {
        closeApiReference();
    }
});
