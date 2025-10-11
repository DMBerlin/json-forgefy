// JSON Forgefy Playground Application

const payloadTextarea = document.getElementById('payload');
const projectionTextarea = document.getElementById('projection');
const resultPre = document.getElementById('result');
const errorDiv = document.getElementById('error');
const transformBtn = document.getElementById('transform-btn');
const clearBtn = document.getElementById('clear-btn');
const exampleBtn = document.getElementById('example-btn');
const beautifyBtn = document.getElementById('beautify-btn');
const themeToggle = document.getElementById('theme-toggle');
const copyBtn = document.getElementById('copy-btn');

// Example data - Product-focused
const examplePayload = {
    user: {
        id: 12345,
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@company.com',
        role: 'Product Manager',
        department: 'Engineering',
        joinDate: '2023-01-15',
        salary: 95000,
        isActive: true
    },
    projects: [
        { id: 101, name: 'Mobile App Redesign', budget: 50000, status: 'in-progress', completion: 75 },
        { id: 102, name: 'API Gateway', budget: 30000, status: 'completed', completion: 100 },
        { id: 103, name: 'Analytics Dashboard', budget: 45000, status: 'planning', completion: 10 }
    ],
    metrics: {
        totalProjects: 3,
        activeProjects: 2,
        totalBudget: 125000,
        avgCompletion: 61.67
    }
};

const exampleProjection = {
    // User profile transformation
    profile: {
        id: '$user.id',
        fullName: { $concat: ['$user.firstName', ' ', '$user.lastName'] },
        email: { $toLower: '$user.email' },
        title: '$user.role',
        department: '$user.department',
        status: {
            $cond: {
                if: '$user.isActive',
                then: 'Active',
                else: 'Inactive'
            }
        }
    },
    
    // Project analytics
    projectSummary: {
        total: '$metrics.totalProjects',
        active: '$metrics.activeProjects',
        totalBudget: {
            $concat: ['$', { $toString: '$metrics.totalBudget' }]
        },
        avgProgress: {
            $concat: [
                { $toString: { $toFixed: { value: '$metrics.avgCompletion', precision: 1 } } },
                '%'
            ]
        }
    },
    
    // Project status breakdown
    projectsByStatus: {
        inProgress: {
            $size: {
                $filter: {
                    input: '$projects',
                    cond: { $eq: ['$$this.status', 'in-progress'] }
                }
            }
        },
        completed: {
            $size: {
                $filter: {
                    input: '$projects',
                    cond: { $eq: ['$$this.status', 'completed'] }
                }
            }
        }
    },
    
    // High-value projects
    highValueProjects: {
        $filter: {
            input: '$projects',
            cond: { $gte: ['$$this.budget', 40000] }
        }
    }
};

// Load example
function loadExample() {
    payloadTextarea.value = JSON.stringify(examplePayload, null, 2);
    projectionTextarea.value = JSON.stringify(exampleProjection, null, 2);
    clearError();
    resultPre.textContent = '';
    addLineNumbers();
}

// Clear all fields
function clearAll() {
    payloadTextarea.value = '';
    projectionTextarea.value = '';
    resultPre.textContent = '';
    clearError();
    removeLineNumbers();
}

// Show error
function showError(message) {
    errorDiv.innerHTML = `<strong>Error:</strong> ${escapeHtml(message)}`;
    errorDiv.style.display = 'block';
}

// Clear error
function clearError() {
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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
            throw new Error('Forgefy library not loaded. Please refresh the page.');
        }

        // Transform
        const result = Forgefy.this(payload, projection);

        // Display result with syntax highlighting
        resultPre.textContent = JSON.stringify(result, null, 2);
        highlightJSON(resultPre);
        
        // Show success feedback
        showSuccessMessage();
    } catch (error) {
        showError(error.message);
        console.error('Transformation error:', error);
    }
}

// Show success message
function showSuccessMessage() {
    const successMsg = document.createElement('div');
    successMsg.className = 'success-toast';
    successMsg.textContent = '✓ Transformation successful';
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
        successMsg.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        successMsg.classList.remove('show');
        setTimeout(() => successMsg.remove(), 300);
    }, 2000);
}

// Beautify JSON
function beautifyJSON() {
    clearError();
    
    try {
        // Beautify payload
        if (payloadTextarea.value.trim()) {
            const payload = JSON.parse(payloadTextarea.value);
            payloadTextarea.value = JSON.stringify(payload, null, 2);
        }
        
        // Beautify projection
        if (projectionTextarea.value.trim()) {
            const projection = JSON.parse(projectionTextarea.value);
            projectionTextarea.value = JSON.stringify(projection, null, 2);
        }
        
        // Beautify result if it exists
        if (resultPre.textContent.trim()) {
            const result = JSON.parse(resultPre.textContent);
            resultPre.textContent = JSON.stringify(result, null, 2);
            highlightJSON(resultPre);
        }
        
        addLineNumbers();
    } catch (error) {
        showError('Invalid JSON: ' + error.message);
    }
}

// Copy result to clipboard
async function copyResult() {
    if (!resultPre.textContent.trim()) {
        showError('No result to copy');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(resultPre.textContent);
        
        // Show feedback
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '✓ Copied!';
        copyBtn.classList.add('success');
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.remove('success');
        }, 2000);
    } catch (error) {
        showError('Failed to copy to clipboard');
    }
}

// Simple JSON syntax highlighting
function highlightJSON(element) {
    let json = element.textContent;
    
    // Highlight strings
    json = json.replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:');
    json = json.replace(/: "([^"]*)"/g, ': <span class="json-string">"$1"</span>');
    
    // Highlight numbers
    json = json.replace(/: (-?\d+\.?\d*)/g, ': <span class="json-number">$1</span>');
    
    // Highlight booleans
    json = json.replace(/: (true|false)/g, ': <span class="json-boolean">$1</span>');
    
    // Highlight null
    json = json.replace(/: (null)/g, ': <span class="json-null">$1</span>');
    
    element.innerHTML = json;
}

// Add line numbers to textareas
function addLineNumbers() {
    [payloadTextarea, projectionTextarea].forEach(textarea => {
        const lines = textarea.value.split('\n').length;
        textarea.style.backgroundImage = generateLineNumbers(lines);
    });
}

// Remove line numbers
function removeLineNumbers() {
    [payloadTextarea, projectionTextarea].forEach(textarea => {
        textarea.style.backgroundImage = 'none';
    });
}

// Generate line numbers background
function generateLineNumbers(lines) {
    const lineHeight = 20;
    const numbers = Array.from({ length: lines }, (_, i) => i + 1).join('\\A');
    return `linear-gradient(transparent ${lineHeight}px, transparent ${lineHeight}px)`;
}

// Event listeners
transformBtn.addEventListener('click', transform);
clearBtn.addEventListener('click', clearAll);
exampleBtn.addEventListener('click', loadExample);
beautifyBtn.addEventListener('click', beautifyJSON);
copyBtn.addEventListener('click', copyResult);

// Auto-beautify on input (debounced)
let beautifyTimeout;
[payloadTextarea, projectionTextarea].forEach(textarea => {
    textarea.addEventListener('input', () => {
        clearTimeout(beautifyTimeout);
        beautifyTimeout = setTimeout(() => {
            addLineNumbers();
        }, 500);
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to transform
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        transform();
    }
    
    // Ctrl/Cmd + Shift + F to beautify
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        beautifyJSON();
    }
    
    // Ctrl/Cmd + Shift + C to copy result
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        copyResult();
    }
});

// Theme management - Default to dark (Dracula)
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.textContent = '🌙';
        themeToggle.title = 'Switch to dark mode';
    } else {
        document.body.classList.remove('light-theme');
        themeToggle.textContent = '☀️';
        themeToggle.title = 'Switch to light mode';
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    
    themeToggle.textContent = isLight ? '🌙' : '☀️';
    themeToggle.title = isLight ? 'Switch to dark mode' : 'Switch to light mode';
    
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Theme toggle event
themeToggle.addEventListener('click', toggleTheme);

// Load example on initial load
window.addEventListener('load', () => {
    initTheme();
    loadExample();
    
    // Add welcome message
    setTimeout(() => {
        const welcome = document.createElement('div');
        welcome.className = 'welcome-toast';
        welcome.innerHTML = '👋 Welcome! Press <kbd>Ctrl+Enter</kbd> to transform';
        document.body.appendChild(welcome);
        
        setTimeout(() => welcome.classList.add('show'), 10);
        setTimeout(() => {
            welcome.classList.remove('show');
            setTimeout(() => welcome.remove(), 300);
        }, 4000);
    }, 500);
});
