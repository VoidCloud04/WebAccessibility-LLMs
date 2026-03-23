// Unit tests for script.js functions
// Simple assertions

function assert(condition, message) {
    if (!condition) {
        console.error('Test failed:', message);
    } else {
        console.log('Test passed:', message);
    }
}

// Mock projects array for tests
const testProjects = [
    { title: 'Test Project 1', description: 'Desc 1', details: 'Details 1' },
    { title: 'Test Project 2', description: 'Desc 2', details: 'Details 2' }
];

// Test renderProjects (hard to test DOM without setup, so basic check)
function testRenderProjects() {
    // Assume container exists
    const container = document.getElementById('projects-container');
    if (!container) {
        console.log('Skipping renderProjects test - container not found');
        return;
    }
    renderProjects(testProjects);
    const projectElements = container.querySelectorAll('.project');
    assert(projectElements.length === 2, 'renderProjects should render 2 projects');
}

// Test toggleDetails
function testToggleDetails() {
    // Set up a details div
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'details';
    detailsDiv.id = 'details-0';
    document.body.appendChild(detailsDiv);
    toggleDetails(0);
    assert(detailsDiv.style.display === 'block', 'toggleDetails should show details');
    toggleDetails(0);
    assert(detailsDiv.style.display === 'none', 'toggleDetails should hide details');
    document.body.removeChild(detailsDiv);
}

// Test filterProjects (mock)
function testFilterProjects() {
    // Mock container
    const container = document.createElement('div');
    container.id = 'projects-container';
    document.body.appendChild(container);
    // Temporarily set projects to testProjects
    const originalProjects = projects;
    window.projects = testProjects;
    filterProjects('Test Project 1');
    const projectElements = container.querySelectorAll('.project');
    assert(projectElements.length === 1, 'filterProjects should filter to 1 project');
    assert(projectElements[0].querySelector('h3').textContent === 'Test Project 1', 'filterProjects should show correct project');
    window.projects = originalProjects;
    document.body.removeChild(container);
}

// Test validateForm
function testValidateForm() {
    assert(validateForm('', 'email@test.com', 'msg') === 'All fields are required.', 'validateForm should require name');
    assert(validateForm('name', '', 'msg') === 'All fields are required.', 'validateForm should require email');
    assert(validateForm('name', 'email@test.com', '') === 'All fields are required.', 'validateForm should require message');
    assert(validateForm('name', 'invalidemail', 'msg') === 'Please enter a valid email address.', 'validateForm should validate email');
    assert(validateForm('name', 'email@test.com', 'msg') === null, 'validateForm should pass valid input');
}

// Run tests
function runTests() {
    testRenderProjects();
    testToggleDetails();
    testFilterProjects();
    testValidateForm();
    console.log('All tests completed.');
}

// Call runTests
runTests();