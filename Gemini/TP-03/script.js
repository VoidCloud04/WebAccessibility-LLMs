/**
 * CORE LOGIC
 * Pure functions that can be tested independently of the DOM.
 */
const PortfolioLogic = {
    /**
     * Filters a list of projects based on a category.
     * @param {Array} projects - Array of project objects
     * @param {String} category - Category to filter by ('all', 'web', 'ai', etc)
     * @returns {Array} Filtered projects
     */
    filterProjects: (projects, category) => {
        if (!category || category === 'all') return projects;
        return projects.filter(p => p.category === category);
    },

    /**
     * Validates contact form inputs.
     * @param {String} name 
     * @param {String} email 
     * @param {String} message 
     * @returns {Object} { isValid: boolean, errors: { name, email, message } }
     */
    validateForm: (name, email, message) => {
        const errors = {};
        let isValid = true;

        if (!name || name.trim().length < 2) {
            errors.name = "Name must be at least 2 characters.";
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            errors.email = "Please enter a valid email address.";
            isValid = false;
        }

        if (!message || message.trim().length < 10) {
            errors.message = "Message must be at least 10 characters.";
            isValid = false;
        }

        return { isValid, errors };
    }
};

/**
 * UI CONTROLLER
 * Handles DOM manipulation and events.
 */
const PortfolioUI = {
    data: [
        {
            id: 1,
            title: "AlgoVisualizer",
            category: "web",
            desc: "An interactive pathfinding algorithm visualizer built with React. Visualizes Dijkstra, A*, and DFS in real-time.",
            tags: ["React", "Algorithms", "CSS Grid"],
            img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 2,
            title: "NeuralNet Classifier",
            category: "ai",
            desc: "A Python-based Convolutional Neural Network (CNN) that classifies handwritten digits with 99% accuracy.",
            tags: ["Python", "TensorFlow", "NumPy"],
            img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 3,
            title: "TaskMaster App",
            category: "mobile",
            desc: "A cross-platform productivity app with cloud sync features built using Flutter and Firebase.",
            tags: ["Flutter", "Firebase", "Dart"],
            img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 4,
            title: "Go Microservice",
            category: "web",
            desc: "High-performance REST API handling 10k req/s for user authentication and session management.",
            tags: ["Go", "Docker", "Redis"],
            img: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        }
    ],

    init: function() {
        this.cacheDOM();
        this.bindEvents();
        this.renderProjects(this.data);
    },

    cacheDOM: function() {
        this.dom = {
            grid: document.getElementById('projects-grid'),
            filterBtns: document.querySelectorAll('.filter-btn'),
            modal: document.getElementById('project-modal'),
            closeModal: document.querySelector('.close-modal'),
            contactForm: document.getElementById('contact-form')
        };
    },

    bindEvents: function() {
        // Filter Buttons
        this.dom.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e));
        });

        // Close Modal
        this.dom.closeModal.addEventListener('click', () => {
            this.dom.modal.style.display = 'none';
        });

        // Outside Click Modal
        window.addEventListener('click', (e) => {
            if (e.target === this.dom.modal) this.dom.modal.style.display = 'none';
        });

        // Form Submit
        this.dom.contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
    },

    renderProjects: function(projects) {
        this.dom.grid.innerHTML = '';
        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <img src="${project.img}" alt="${project.title}" class="project-img">
                <div class="project-content">
                    <span class="project-cat">${project.category}</span>
                    <h3>${project.title}</h3>
                    <p>${project.desc.substring(0, 60)}...</p>
                </div>
            `;
            // Add click event for modal
            card.addEventListener('click', () => this.openModal(project));
            this.dom.grid.appendChild(card);
        });
    },

    handleFilter: function(e) {
        // Update active class
        this.dom.filterBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Logic
        const category = e.target.getAttribute('data-filter');
        const filtered = PortfolioLogic.filterProjects(this.data, category);
        
        // Render
        this.renderProjects(filtered);
    },

    openModal: function(project) {
        document.getElementById('modal-title').textContent = project.title;
        document.getElementById('modal-desc').textContent = project.desc;
        document.getElementById('modal-img').src = project.img;
        
        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = project.tags.map(t => `<span>${t}</span>`).join('');
        
        this.dom.modal.style.display = 'flex';
    },

    handleFormSubmit: function(e) {
        e.preventDefault();
        
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const message = form.message.value;

        // Use Core Logic for Validation
        const result = PortfolioLogic.validateForm(name, email, message);

        // Reset UI
        document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');
        document.getElementById('form-success').textContent = '';

        if (!result.isValid) {
            if (result.errors.name) {
                const el = document.getElementById('error-name');
                el.textContent = result.errors.name;
                el.style.display = 'block';
            }
            if (result.errors.email) {
                const el = document.getElementById('error-email');
                el.textContent = result.errors.email;
                el.style.display = 'block';
            }
            if (result.errors.message) {
                const el = document.getElementById('error-message');
                el.textContent = result.errors.message;
                el.style.display = 'block';
            }
        } else {
            document.getElementById('form-success').textContent = "Message sent successfully!";
            form.reset();
        }
    }
};

// Initialize app only if in browser environment
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        PortfolioUI.init();
    });
}