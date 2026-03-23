// Function to toggle theme
function toggleTheme() {
    document.body.classList.toggle('light');
}

// Function to update about text
function updateAbout(newText) {
    document.getElementById('about-text').textContent = newText;
}

// Function to add a skill
function addSkill(skillName) {
    const skillsList = document.getElementById('skills-list');
    const newSkill = document.createElement('li');
    newSkill.textContent = skillName;
    skillsList.appendChild(newSkill);
}

// Function to add a project
function addProject(title, description, imageSrc) {
    const projectsContainer = document.getElementById('projects-container');
    const newProject = document.createElement('div');
    newProject.className = 'project';
    newProject.innerHTML = `
        <h3>${title}</h3>
        <img src="${imageSrc}" alt="${title} Image" class="project-image">
        <p>${description}</p>
    `;
    projectsContainer.appendChild(newProject);
}

// Function to add gallery image
function addGalleryImage(imageSrc, altText) {
    const galleryContainer = document.getElementById('gallery-container');
    const newImage = document.createElement('img');
    newImage.src = imageSrc;
    newImage.alt = altText;
    newImage.className = 'gallery-image';
    galleryContainer.appendChild(newImage);
}

// Event listeners
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

document.getElementById('update-about').addEventListener('click', function() {
    const newText = prompt('Enter new about text:');
    if (newText) updateAbout(newText);
});

document.getElementById('add-skill').addEventListener('click', function() {
    const skill = prompt('Enter new skill:');
    if (skill) addSkill(skill);
});

document.getElementById('add-project').addEventListener('click', function() {
    const title = prompt('Enter project title:');
    const description = prompt('Enter project description:');
    const imageSrc = prompt('Enter image src (e.g., images/newproject.jpg):');
    if (title && description && imageSrc) addProject(title, description, imageSrc);
});

document.getElementById('add-gallery-image').addEventListener('click', function() {
    const imageSrc = prompt('Enter image src (e.g., images/newimage.jpg):');
    const altText = prompt('Enter alt text:');
    if (imageSrc && altText) addGalleryImage(imageSrc, altText);
});