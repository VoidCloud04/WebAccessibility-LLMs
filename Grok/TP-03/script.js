// Project data
const projects = [
    {
        title: 'Web Portfolio',
        category: 'web',
        description: 'A responsive portfolio website.',
        details: 'Built with HTML, CSS, and JavaScript. Features include smooth scrolling and interactive elements.',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zNWVtIiBmaWxsPSIjMDAwIiBmb250LXNpemU9IjI1Ij5Qcm9qZWN0PC90ZXh0Pgo8L3N2Zz4='
    },
    {
        title: 'Mobile App',
        category: 'mobile',
        description: 'A task management app.',
        details: 'Developed with React Native. Includes user authentication and cloud storage.',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zNWVtIiBmaWxsPSIjMDAwIiBmb250LXNpemU9IjI1Ij5Qcm9qZWN0PC90ZXh0Pgo8L3N2Zz4='
    },
    {
        title: 'Data Analysis Tool',
        category: 'data',
        description: 'Python script for data visualization.',
        details: 'Uses Pandas and Matplotlib to analyze and visualize datasets. Supports CSV and JSON inputs.',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zNWVtIiBmaWxsPSIjMDAwIiBmb250LXNpemU9IjI1Ij5Qcm9qZWN0PC90ZXh0Pgo8L3N2Zz4='
    }
];

// Render projects
function renderProjects(filteredProjects = projects) {
    const gallery = document.getElementById('projects-gallery');
    gallery.innerHTML = '';
    filteredProjects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <button onclick="toggleDetails(${index})">Show Details</button>
            <div class="project-details" id="details-${index}">${project.details}</div>
        `;
        gallery.appendChild(card);
    });
}

// Toggle project details
function toggleDetails(index) {
    const details = document.getElementById(`details-${index}`);
    details.style.display = details.style.display === 'block' ? 'none' : 'block';
}

// Filter projects
function filterProjects() {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-select').value;
    const filtered = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchQuery) ||
                              project.description.toLowerCase().includes(searchQuery);
        const matchesCategory = !category || project.category === category;
        return matchesSearch && matchesCategory;
    });
    renderProjects(filtered);
}

// Validate form
function validateForm(name, email, message) {
    if (!name.trim() || !email.trim() || !message.trim()) {
        return 'All fields are required.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address.';
    }
    return null;
}

// Event listeners
document.getElementById('search-input').addEventListener('input', filterProjects);
document.getElementById('category-select').addEventListener('change', filterProjects);

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
        document.getElementById('contact-form').reset();
    }
});

// Smooth scrolling for nav links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Initial render
renderProjects();