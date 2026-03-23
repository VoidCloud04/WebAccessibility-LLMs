/**
 * Portfolio Logic Namespace
 * We expose this object so we can test the logic independently of the HTML.
 */
const Portfolio = {
    // --- Data ---
    projects: [
        {
            id: 1,
            title: "E-Commerce Dashboard",
            category: "web",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            description: "A full-stack admin dashboard for managing products and orders.",
            tags: ["React", "Node.js", "MongoDB"],
            repoLink: "#",
            liveLink: "#"
        },
        {
            id: 2,
            title: "AI Image Classifier",
            category: "ai",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            description: "A Python application using TensorFlow to classify plant species.",
            tags: ["Python", "TensorFlow"],
            repoLink: "#",
            liveLink: "#"
        },
        {
            id: 3,
            title: "Fitness Tracker App",
            category: "mobile",
            image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            description: "Cross-platform mobile app to track workouts and nutrition.",
            tags: ["React Native", "Firebase"],
            repoLink: "#",
            liveLink: "#"
        }
    ],

    // --- Core Logic (Pure Functions) ---
    
    /**
     * Filters projects based on category and search term.
     * This is a "Pure Function" - easy to unit test because it returns data.
     */
    filterData: function(allProjects, category, searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        return allProjects.filter(project => {
            const matchesCategory = category === 'all' || project.category === category;
            const matchesSearch = project.title.toLowerCase().includes(term) || 
                                  project.tags.some(tag => tag.toLowerCase().includes(term));
            return matchesCategory && matchesSearch;
        });
    },

    /**
     * Validates contact form data.
     * Returns an object with isValid boolean and error messages.
     */
    validateForm: function(name, email, message) {
        const errors = {};
        let isValid = true;

        if (!name || name.trim() === '') {
            errors.name = 'Name is required';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email.trim())) {
            errors.email = 'Please enter a valid email';
            isValid = false;
        }

        if (!message || message.trim().length < 10) {
            errors.message = 'Message must be at least 10 characters';
            isValid = false;
        }

        return { isValid, errors };
    },

    // --- UI Logic (DOM Interaction) ---
    
    init: function() {
        // Only run DOM logic if we are in a browser environment with these elements
        const container = document.getElementById('projectsContainer');
        if(!container) return; 

        this.cacheDOM();
        this.bindEvents();
        this.renderProjects(this.projects);
    },

    cacheDOM: function() {
        this.dom = {
            container: document.getElementById('projectsContainer'),
            searchInput: document.getElementById('searchInput'),
            filterBtns: document.querySelectorAll('.filter-btn'),
            modal: document.getElementById('projectModal'),
            closeModal: document.querySelector('.close-modal'),
            contactForm: document.getElementById('contactForm')
        };
    },

    bindEvents: function() {
        // Filter Buttons
        this.dom.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterClick(e));
        });

        // Search Input
        this.dom.searchInput.addEventListener('input', (e) => {
            const activeCategory = document.querySelector('.filter-btn.active').dataset.filter;
            this.handleSearch(activeCategory, e.target.value);
        });

        // Modal Close
        this.dom.closeModal.onclick = () => this.dom.modal.style.display = "none";
        window.onclick = (event) => {
            if (event.target == this.dom.modal) this.dom.modal.style.display = "none";
        };

        // Form Submit
        this.dom.contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
    },

    renderProjects: function(data) {
        this.dom.container.innerHTML = '';
        if (data.length === 0) {
            this.dom.container.innerHTML = '<p>No projects found matching your criteria.</p>';
            return;
        }

        data.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="project-img">
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                    <span class="view-details" data-id="${project.id}">View Details &rarr;</span>
                </div>
            `;
            this.dom.container.appendChild(card);
        });

        // Re-attach modal listeners
        document.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', (e) => this.openModal(e.target.dataset.id));
        });
    },

    handleFilterClick: function(e) {
        this.dom.filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const category = e.target.dataset.filter;
        const filtered = this.filterData(this.projects, category, this.dom.searchInput.value);
        this.renderProjects(filtered);
    },

    handleSearch: function(category, term) {
        const filtered = this.filterData(this.projects, category, term);
        this.renderProjects(filtered);
    },

    openModal: function(id) {
        const project = this.projects.find(p => p.id == id);
        if (!project) return;
        
        // In a real app, you'd bind these IDs to the DOM cache too
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalImage').src = project.image;
        document.getElementById('modalDesc').textContent = project.description;
        document.getElementById('modalTags').innerHTML = project.tags.map(t => `<span class="tag-pill">${t}</span>`).join('');
        this.dom.modal.style.display = "flex";
    },

    handleFormSubmit: function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Use the pure function for validation
        const validation = this.validateForm(name, email, message);

        // Reset errors
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

        if (!validation.isValid) {
            if(validation.errors.name) document.getElementById('nameError').textContent = validation.errors.name;
            if(validation.errors.email) document.getElementById('emailError').textContent = validation.errors.email;
            if(validation.errors.message) document.getElementById('msgError').textContent = validation.errors.message;
        } else {
            document.getElementById('successMessage').textContent = 'Message sent successfully!';
            this.dom.contactForm.reset();
        }
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => Portfolio.init());