/**
 * Simple Vanilla JS Unit Testing Framework
 * (No libraries required)
 */
const TestSuite = {
    passed: 0,
    failed: 0,

    // Assertion Helper
    expect: function(actual) {
        return {
            toBe: (expected) => {
                if (actual !== expected) throw new Error(`Expected "${expected}" but got "${actual}"`);
            },
            toEqual: (expected) => {
                if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`Expected object to match.`);
            },
            toBeGreaterThan: (expected) => {
                if (actual <= expected) throw new Error(`Expected > ${expected} but got ${actual}`);
            },
            toBeTrue: () => {
                if (actual !== true) throw new Error(`Expected true but got ${actual}`);
            },
            toBeFalse: () => {
                if (actual !== false) throw new Error(`Expected false but got ${actual}`);
            }
        }
    },

    // Test Runner
    test: function(desc, fn) {
        try {
            fn();
            this.passed++;
            this.log(`✔ ${desc}`, 'pass');
        } catch (error) {
            this.failed++;
            this.log(`✘ ${desc}`, 'fail', error);
            console.error(error);
        }
        this.updateSummary();
    },

    log: function(msg, type, error) {
        const div = document.createElement('div');
        div.className = `test-result ${type}`;
        div.textContent = msg;
        if(error) {
            const det = document.createElement('div');
            det.className = 'error-details';
            det.textContent = error.message;
            div.appendChild(det);
        }
        document.getElementById('results').appendChild(div);
    },

    updateSummary: function() {
        const el = document.getElementById('summary');
        el.innerHTML = `Tests Completed. <span class="pass-count">${this.passed} Passed</span>, <span class="fail-count">${this.failed} Failed</span>`;
    }
};

// ==========================================
// UNIT TESTS FOR SCRIPT.JS
// ==========================================

// --- 1. Testing Logic (Pure Functions) ---

TestSuite.test("Filter Data: Should return all projects when category is 'all'", () => {
    const mockData = [
        { id: 1, category: 'web', title: 'A', tags: [] },
        { id: 2, category: 'ai', title: 'B', tags: [] }
    ];
    const result = Portfolio.filterData(mockData, 'all', '');
    TestSuite.expect(result.length).toBe(2);
});

TestSuite.test("Filter Data: Should filter by category 'web'", () => {
    const mockData = [
        { id: 1, category: 'web', title: 'Web App', tags: [] },
        { id: 2, category: 'ai', title: 'AI Bot', tags: [] }
    ];
    const result = Portfolio.filterData(mockData, 'web', '');
    TestSuite.expect(result.length).toBe(1);
    TestSuite.expect(result[0].title).toBe('Web App');
});

TestSuite.test("Filter Data: Should filter by search term (Case Insensitive)", () => {
    const mockData = [
        { id: 1, category: 'web', title: 'Super Dashboard', tags: [] },
        { id: 2, category: 'web', title: 'Tiny App', tags: [] }
    ];
    const result = Portfolio.filterData(mockData, 'all', 'super');
    TestSuite.expect(result.length).toBe(1);
    TestSuite.expect(result[0].title).toBe('Super Dashboard');
});

TestSuite.test("Validation: Should fail if email is invalid", () => {
    const result = Portfolio.validateForm("Alex", "not-an-email", "Hello world message here");
    TestSuite.expect(result.isValid).toBeFalse();
    TestSuite.expect(result.errors.email).toBe('Please enter a valid email');
});

TestSuite.test("Validation: Should fail if message is too short", () => {
    const result = Portfolio.validateForm("Alex", "alex@test.com", "Hi");
    TestSuite.expect(result.isValid).toBeFalse();
    TestSuite.expect(result.errors.message).toBe('Message must be at least 10 characters');
});

TestSuite.test("Validation: Should pass with valid data", () => {
    const result = Portfolio.validateForm("Alex", "alex@test.com", "This is a long enough message.");
    TestSuite.expect(result.isValid).toBeTrue();
});


// --- 2. Testing DOM Integration ---
// Since we have the #test-fixtures in test.html, we can check if render works.

TestSuite.test("DOM: Render should create project cards", () => {
    // 1. Setup Mock Data
    const mockData = [{
        id: 99, 
        title: "Test Card", 
        image: "img.jpg", 
        tags: ["T1"], 
        description: "Desc",
        category: "web"
    }];

    // 2. Call Render
    Portfolio.renderProjects(mockData);

    // 3. Check HTML
    const container = document.getElementById('projectsContainer');
    const cards = container.getElementsByClassName('project-card');
    
    TestSuite.expect(cards.length).toBe(1);
    TestSuite.expect(container.innerHTML.includes('Test Card')).toBeTrue();
});

TestSuite.test("DOM: Empty results should show message", () => {
    Portfolio.renderProjects([]); // Empty array
    const container = document.getElementById('projectsContainer');
    TestSuite.expect(container.innerHTML.includes('No projects found')).toBeTrue();
});