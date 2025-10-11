// JSON Forgefy Playground Application

const payloadTextarea = document.getElementById('payload');
const projectionTextarea = document.getElementById('projection');
const resultPre = document.getElementById('result');
const errorDiv = document.getElementById('error');
const transformBtn = document.getElementById('transform-btn');
const clearBtn = document.getElementById('clear-btn');
const exampleBtn = document.getElementById('example-btn');

// Example data
const examplePayload = {
    user: {
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        email: 'john.doe@example.com'
    },
    orders: [
        { id: 1, amount: 100, status: 'completed' },
        { id: 2, amount: 250, status: 'pending' },
        { id: 3, amount: 75, status: 'completed' }
    ],
    settings: {
        currency: 'USD',
        timezone: 'America/New_York'
    }
};

const exampleProjection = {
    fullName: { $concat: ['$user.firstName', ' ', '$user.lastName'] },
    email: '$user.email',
    isAdult: { $gte: ['$user.age', 18] },
    totalOrders: { $size: '$orders' },
    totalAmount: {
        $add: [
            { $multiply: ['$orders.0.amount', 1] },
            { $multiply: ['$orders.1.amount', 1] },
            { $multiply: ['$orders.2.amount', 1] }
        ]
    },
    currency: '$settings.currency',
    hasCompletedOrders: {
        $cond: {
            if: { $eq: ['$orders.0.status', 'completed'] },
            then: true,
            else: false
        }
    }
};

// Load example
function loadExample() {
    payloadTextarea.value = JSON.stringify(examplePayload, null, 2);
    projectionTextarea.value = JSON.stringify(exampleProjection, null, 2);
    clearError();
    resultPre.textContent = '';
}

// Clear all fields
function clearAll() {
    payloadTextarea.value = '';
    projectionTextarea.value = '';
    resultPre.textContent = '';
    clearError();
}

// Show error
function showError(message) {
    errorDiv.textContent = `Error: ${message}`;
    errorDiv.style.display = 'block';
}

// Clear error
function clearError() {
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
}

// Transform data
function transform() {
    clearError();
    resultPre.textContent = '';

    try {
        // Parse input
        const payload = JSON.parse(payloadTextarea.value || '{}');
        const projection = JSON.parse(projectionTextarea.value || '{}');

        // Check if Forgefy is available
        if (typeof Forgefy === 'undefined') {
            throw new Error('Forgefy library not loaded');
        }

        // Transform
        const result = Forgefy.this(payload, projection);

        // Display result
        resultPre.textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        showError(error.message);
        console.error('Transformation error:', error);
    }
}

// Event listeners
transformBtn.addEventListener('click', transform);
clearBtn.addEventListener('click', clearAll);
exampleBtn.addEventListener('click', loadExample);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to transform
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        transform();
    }
});

// Load example on initial load
window.addEventListener('load', () => {
    loadExample();
});
