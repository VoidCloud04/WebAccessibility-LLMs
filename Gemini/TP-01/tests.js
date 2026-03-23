/**
 * Simple Vanilla JS Test Runner
 */
const TestRunner = {
    passed: 0,
    failed: 0,
    resultsDiv: document.getElementById('results'),

    // Assertion Helper
    expect: function(actual) {
        return {
            toBe: function(expected) {
                if (actual !== expected) {
                    throw new Error(`Expected "${expected}", but got "${actual}"`);
                }
            },
            toContain: function(fragment) {
                if (!actual.includes(fragment)) {
                    throw new Error(`Expected string to contain "${fragment}", but got "${actual}"`);
                }
            },
            toBeGreaterThan: function(number) {
                if (actual <= number) {
                    throw new Error(`Expected ${actual} to be greater than ${number}`);
                }
            }
        };
    },

    // Test Case Definition
    test: function(testName, testFn) {
        try {
            // Reset Fixtures before every test
            document.getElementById('header-root').innerHTML = '';
            document.getElementById('bio-root').innerHTML = '';
            document.getElementById('projects-root').innerHTML = '';
            document.getElementById('gallery-root').innerHTML = '';
            
            testFn();
            
            this.passed++;
            this.log(`✔ PASS: ${testName}`, 'pass');
        } catch (error) {
            this.failed++;
            this.log(`✘ FAIL: ${testName} - ${error.message}`, 'fail');
            console.error(error);
        }
    },

    log: function(msg, type) {
        const div = document.createElement('div');
        div.className = type;
        div.textContent = msg;
        this.resultsDiv.appendChild(div);
    },

    summary: function() {
        const div = document.createElement('div');
        div.className = 'summary';
        div.innerHTML = `Total: ${this.passed + this.failed} | Passed: <span class="pass">${this.passed}</span> | Failed: <span class="fail">${this.failed}</span>`;
        document.body.appendChild(div);
    }
};

// --- Tests Start Here ---

// 1. Test Element Creation Helper
TestRunner.test('createElement should generate valid HTML', () => {
    const el = PortfolioApp.createElement('div', 'test-class', 'Hello');
    
    TestRunner.expect(el.tagName).toBe('DIV');
    TestRunner.expect(el.className).toBe('test-class');
    TestRunner.expect(el.textContent).toBe('Hello');
});

// 2. Test Header Rendering
TestRunner.test('renderHeader should display Name and Role', () => {
    // Inject Mock Data
    const originalProfile = PortfolioApp.config.profile;
    PortfolioApp.config.profile = { name: "Test User", role: "Test Role" };

    PortfolioApp.renderHeader();
    
    const root = document.getElementById('header-root');
    const h1 = root.querySelector('h1');
    const role = root.querySelector('.role');

    TestRunner.expect(h1.textContent).toBe('Test User');
    TestRunner.expect(role.textContent).toBe('Test Role');

    // Restore Data
    PortfolioApp.config.profile = originalProfile;
});

// 3. Test Bio Rendering
TestRunner.test('renderBio should display Bio text', () => {
    const originalProfile = PortfolioApp.config.profile;
    PortfolioApp.config.profile = { bio: "This is a test bio." };

    PortfolioApp.renderBio();

    const root = document.getElementById('bio-root');
    const p = root.querySelector('p');

    TestRunner.expect(p.textContent).toBe('This is a test bio.');
    
    PortfolioApp.config.profile = originalProfile;
});

// 4. Test Project Rendering
TestRunner.test('renderProjects should render correct number of cards', () => {
    const originalProjects = PortfolioApp.config.projects;
    PortfolioApp.config.projects = [
        { title: "P1", description: "D1", tags: ["T1"] },
        { title: "P2", description: "D2", tags: ["T2"] }
    ];

    PortfolioApp.renderProjects();

    const root = document.getElementById('projects-root');
    const cards = root.querySelectorAll('.card');

    TestRunner.expect(cards.length).toBe(2);
    TestRunner.expect(cards[0].querySelector('h3').textContent).toBe('P1');

    PortfolioApp.config.projects = originalProjects;
});

// 5. Test Gallery Rendering
TestRunner.test('renderGallery should render images with src and alt', () => {
    const originalGallery = PortfolioApp.config.gallery;
    PortfolioApp.config.gallery = [
        { src: "img.jpg", caption: "Test Caption" }
    ];

    PortfolioApp.renderGallery();

    const root = document.getElementById('gallery-root');
    const img = root.querySelector('img');
    const caption = root.querySelector('.gallery-caption');

    TestRunner.expect(img.getAttribute('src')).toBe('img.jpg'); // getAttribute for raw value
    TestRunner.expect(img.alt).toBe('Test Caption');
    TestRunner.expect(caption.textContent).toBe('Test Caption');

    PortfolioApp.config.gallery = originalGallery;
});

// Run Summary
TestRunner.summary();