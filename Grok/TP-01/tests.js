// Simple unit tests for the functions in script.js
// Run this file in the browser console or with Node.js (may need DOM simulation for Node)

// Helper function to assert
function assert(condition, message) {
    if (!condition) {
        console.error('Test failed:', message);
    } else {
        console.log('Test passed:', message);
    }
}

// Test toggleTheme
function testToggleTheme() {
    const initialClass = document.body.classList.contains('light');
    toggleTheme();
    const afterClass = document.body.classList.contains('light');
    assert(initialClass !== afterClass, 'toggleTheme should toggle the light class');
    // Toggle back
    toggleTheme();
    assert(document.body.classList.contains('light') === initialClass, 'toggleTheme should toggle back');
}

// Test updateAbout
function testUpdateAbout() {
    const initialText = document.getElementById('about-text').textContent;
    const newText = 'New about text';
    updateAbout(newText);
    assert(document.getElementById('about-text').textContent === newText, 'updateAbout should update the text');
    // Reset
    updateAbout(initialText);
}

// Test addSkill
function testAddSkill() {
    const initialCount = document.getElementById('skills-list').children.length;
    addSkill('New Skill');
    const afterCount = document.getElementById('skills-list').children.length;
    assert(afterCount === initialCount + 1, 'addSkill should add one li element');
    assert(document.getElementById('skills-list').lastElementChild.textContent === 'New Skill', 'addSkill should add the correct skill');
    // Remove for clean up
    document.getElementById('skills-list').lastElementChild.remove();
}

// Test addProject
function testAddProject() {
    const initialCount = document.getElementById('projects-container').children.length;
    addProject('Test Project', 'Test description', 'images/test.jpg');
    const afterCount = document.getElementById('projects-container').children.length;
    assert(afterCount === initialCount + 1, 'addProject should add one project div');
    const newProject = document.getElementById('projects-container').lastElementChild;
    assert(newProject.querySelector('h3').textContent === 'Test Project', 'addProject should set correct title');
    assert(newProject.querySelector('p').textContent === 'Test description', 'addProject should set correct description');
    assert(newProject.querySelector('img').src.includes('images/test.jpg'), 'addProject should set correct image src');
    // Remove for clean up
    document.getElementById('projects-container').lastElementChild.remove();
}

// Test addGalleryImage
function testAddGalleryImage() {
    const initialCount = document.getElementById('gallery-container').children.length;
    addGalleryImage('images/testgallery.jpg', 'Test Alt');
    const afterCount = document.getElementById('gallery-container').children.length;
    assert(afterCount === initialCount + 1, 'addGalleryImage should add one img element');
    const newImage = document.getElementById('gallery-container').lastElementChild;
    assert(newImage.src.includes('images/testgallery.jpg'), 'addGalleryImage should set correct src');
    assert(newImage.alt === 'Test Alt', 'addGalleryImage should set correct alt');
    // Remove for clean up
    document.getElementById('gallery-container').lastElementChild.remove();
}

// Run all tests
function runTests() {
    testToggleTheme();
    testUpdateAbout();
    testAddSkill();
    testAddProject();
    testAddGalleryImage();
    console.log('All tests completed.');
}

// Call runTests to execute
runTests();