// Project data
const projects = [
    {
        title: 'Project 1: Web App',
        description: 'A simple web application built with HTML, CSS, and JS.',
        details: 'This project demonstrates basic web development skills. It includes responsive design and interactivity.'
    },
    {
        title: 'Project 2: Algorithm Visualizer',
        description: 'Visualize sorting algorithms in Python.',
        details: 'Uses Pygame to animate bubble sort and quick sort. Great for learning data structures.'
    },
    {
        title: 'Project 3: Chat App',
        description: 'A real-time chat application using Node.js.',
        details: 'Features include user authentication and message encryption for secure communication.'
    }
];

// Render projects
function renderProjects(filteredProjects = projects) {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';
    filteredProjects.forEach((project, index) => {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project';
        projectDiv.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <button onclick="toggleDetails(${index})">Show Details</button>
            <div class="details" id="details-${index}">${project.details}</div>
        `;
        container.appendChild(projectDiv);
    });
}

// Toggle project details
function toggleDetails(index) {
    const detailsDiv = document.getElementById(`details-${index}`);
    detailsDiv.style.display = detailsDiv.style.display === 'block' ? 'none' : 'block';
}

// Filter projects
function filterProjects(query) {
    const filtered = projects.filter(project =>
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase())
    );
    renderProjects(filtered);
}

// Form validation
function validateForm(name, email, message) {
    if (!name || !email || !message) {
        return 'All fields are required.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address.';
    }
    return null; // No errors
}

// Event listeners
document.getElementById('search-input').addEventListener('input', (e) => {
    filterProjects(e.target.value);
});

document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const error = validateForm(name, email, message);
    const messageDiv = document.getElementById('form-message');
    if (error) {
        messageDiv.textContent = error;
        messageDiv.style.color = 'red';
    } else {
        messageDiv.textContent = 'Message sent successfully!';
        messageDiv.style.color = 'green';
        // Reset form
        document.getElementById('contact-form').reset();
    }
});

// Initial render
renderProjects();