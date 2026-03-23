/**
 * Simple Unit Testing Framework
 */
const TestRunner = {
    results: [],
    
    // Assertion Helper
    expect: (actual) => ({
        toBe: (expected) => {
            if (actual !== expected) throw new Error(`Expected ${expected}, but got ${actual}`);
        },
        toEqual: (expected) => {
            const isMatch = JSON.stringify(actual) === JSON.stringify(expected);
            if (!isMatch) throw new Error(`Expected object to match.`);
        },
        toBeTrue: () => {
            if (actual !== true) throw new Error(`Expected true, but got ${actual}`);
        },
        toBeFalse: () => {
            if (actual !== false) throw new Error(`Expected false, but got ${actual}`);
        }
    }),

    // Run a Test
    test: function(description, fn) {
        try {
            fn();
            this.results.push({ desc: description, status: 'PASS' });
            console.log(`%c PASS: ${description}`, 'color: green');
        } catch (error) {
            this.results.push({ desc: description, status: 'FAIL', error: error.message });
            console.error(`%c FAIL: ${description}`, 'color: red', error.message);
        }
        this.renderResults();
    },

    // Render results to HTML
    renderResults: function() {
        const container = document.getElementById('test-results');
        if (!container) return;
        
        container.innerHTML = this.results.map(r => `
            <div class="test-card ${r.status.toLowerCase()}">
                <strong>[${r.status}]</strong> ${r.desc}
                ${r.error ? `<div class="error-detail">${r.error}</div>` : ''}
            </div>
        `).join('');
    }
};

/**
 * TEST SUITE
 * Tests for PortfolioLogic (from script.js)
 */

// 1. FILTERING TESTS
const mockProjects = [
    { id: 1, category: 'web', title: 'Web Project' },
    { id: 2, category: 'ai', title: 'AI Project' },
    { id: 3, category: 'web', title: 'Another Web Project' }
];

TestRunner.test('Filter: Should return all projects when category is "all"', () => {
    const result = PortfolioLogic.filterProjects(mockProjects, 'all');
    TestRunner.expect(result.length).toBe(3);
});

TestRunner.test('Filter: Should return only "web" projects', () => {
    const result = PortfolioLogic.filterProjects(mockProjects, 'web');
    TestRunner.expect(result.length).toBe(2);
    TestRunner.expect(result[0].category).toBe('web');
    TestRunner.expect(result[1].category).toBe('web');
});

TestRunner.test('Filter: Should return empty array for unused category', () => {
    const result = PortfolioLogic.filterProjects(mockProjects, 'mobile');
    TestRunner.expect(result.length).toBe(0);
});

// 2. VALIDATION TESTS

TestRunner.test('Validation: Should fail if name is empty', () => {
    const result = PortfolioLogic.validateForm('', 'test@example.com', 'Hello world message');
    TestRunner.expect(result.isValid).toBeFalse();
    TestRunner.expect(result.errors.name).toBe("Name must be at least 2 characters.");
});

TestRunner.test('Validation: Should fail if email is invalid format', () => {
    const result = PortfolioLogic.validateForm('John', 'not-an-email', 'Hello world message');
    TestRunner.expect(result.isValid).toBeFalse();
    TestRunner.expect(result.errors.email).toBe("Please enter a valid email address.");
});

TestRunner.test('Validation: Should fail if message is too short', () => {
    const result = PortfolioLogic.validateForm('John', 'john@test.com', 'Hi');
    TestRunner.expect(result.isValid).toBeFalse();
    TestRunner.expect(result.errors.message).toBe("Message must be at least 10 characters.");
});

TestRunner.test('Validation: Should pass with valid inputs', () => {
    const result = PortfolioLogic.validateForm('John Doe', 'john@test.com', 'This is a long enough message for the form.');
    TestRunner.expect(result.isValid).toBeTrue();
});