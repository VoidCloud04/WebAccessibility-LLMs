// Unit tests for script.js functions using simple assertions

function assert(condition, message) {
    if (!condition) {
        console.error('Test failed:', message);
    } else {
        console.log('Test passed:', message);
    }
}

// Mock projects for testing
const mockProjects = [
    { title: 'Web Project', category: 'web', description: 'Web desc', details: 'Details', image: 'img' },
    { title: 'Data Project', category: 'data', description: 'Data desc', details: 'Details', image: 'img' }
];

// Test validateForm
function testValidateForm() {
    assert(validateForm('', 'test@email.com', 'msg') === 'All fields are required.', 'Should require name');
    assert(validateForm('Name', '', 'msg') === 'All fields are required.', 'Should require email');
    assert(validateForm('Name', 'test@email.com', '') === 'All fields are required.', 'Should require message');
    assert(validateForm('Name', 'invalid', 'msg') === 'Please enter a valid email address.', 'Should validate email');
    assert(validateForm('Name', 'test@email.com', 'msg') === null, 'Should pass valid input');
}

// Test filterProjects (requires DOM setup)
function testFilterProjects() {
    // Mock DOM elements
    const searchInput = document.createElement('input');
    searchInput.id = 'search-input';
    searchInput.value = 'Web';
    document.body.appendChild(searchInput);

    const select = document.createElement('select');
    select.id = 'category-select';
    select.value = '';
    document.body.appendChild(select);

    const gallery = document.createElement('div');
    gallery.id = 'projects-gallery';
    document.body.appendChild(gallery);

    // Temporarily set projects
    const originalProjects = window.projects;
    window.projects = mockProjects;

    filterProjects();
    const cards = gallery.querySelectorAll('.project-card');
    assert(cards.length === 1, 'Should filter to 1 project');
    assert(cards[0].querySelector('h3').textContent === 'Web Project', 'Should show correct project');

    // Reset
    window.projects = originalProjects;
    document.body.removeChild(searchInput);
    document.body.removeChild(select);
    document.body.removeChild(gallery);
}

// Test toggleDetails (requires DOM setup)
function testToggleDetails() {
    const details = document.createElement('div');
    details.className = 'project-details';
    details.id = 'details-0';
    document.body.appendChild(details);

    toggleDetails(0);
    assert(details.style.display === 'block', 'Should show details');
    toggleDetails(0);
    assert(details.style.display === 'none', 'Should hide details');

    document.body.removeChild(details);
}

// Test renderProjects (basic DOM check)
function testRenderProjects() {
    const gallery = document.createElement('div');
    gallery.id = 'projects-gallery';
    document.body.appendChild(gallery);

    renderProjects(mockProjects);
    const cards = gallery.querySelectorAll('.project-card');
    assert(cards.length === 2, 'Should render 2 cards');

    document.body.removeChild(gallery);
}

// Run all tests
function runTests() {
    testValidateForm();
    testFilterProjects();
    testToggleDetails();
    testRenderProjects();
    console.log('All tests completed.');
}

runTests();