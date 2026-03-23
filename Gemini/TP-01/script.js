// Namespace to avoid global scope pollution
const PortfolioApp = {
    
    // --- 1. Dynamic Configuration (Editable) ---
    config: {
        profile: {
            name: "VoidCloud04",
            role: "Software Engineer & Architect",
            bio: "Building resilient systems in the cloud. I specialize in backend architecture, security compliance, and minimalist frontend interfaces."
        },
        projects: [
            {
                title: "Serverless API Gateway",
                description: "A custom lightweight API gateway built with Node.js handling 10k requests/second.",
                tags: ["Node.js", "AWS", "Performance"]
            },
            {
                title: "Crypto Ledger",
                description: "Blockchain visualization tool to track transaction flows in real-time.",
                tags: ["Vanilla JS", "WebSockets", "D3.js"]
            },
            {
                title: "Dark Mode UI Kit",
                description: "An open-source CSS library for creating dark-themed web applications.",
                tags: ["CSS3", "HTML5"]
            }
        ],
        gallery: [
            { src: "https://via.placeholder.com/400x300/111/00e5ff?text=Code+Review", caption: "Code Review Session" },
            { src: "https://via.placeholder.com/400x300/111/00e5ff?text=Server+Room", caption: "Server Architecture" },
            { src: "https://via.placeholder.com/400x300/111/00e5ff?text=Design", caption: "UI Mockups" }
        ]
    },

    // --- 2. Core Functions ---

    /**
     * Helper to create DOM elements safely
     */
    createElement: function(tag, className, text) {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (text) el.textContent = text;
        return el;
    },

    renderHeader: function() {
        const root = document.getElementById('header-root');
        if (!root) return;

        root.innerHTML = '';
        const h1 = this.createElement('h1', null, this.config.profile.name);
        const role = this.createElement('div', 'role', this.config.profile.role);
        
        root.appendChild(h1);
        root.appendChild(role);
    },

    renderBio: function() {
        const root = document.getElementById('bio-root');
        if (!root) return;

        root.innerHTML = '';
        root.appendChild(this.createElement('h2', null, 'About_Me'));
        root.appendChild(this.createElement('p', null, this.config.profile.bio));
    },

    renderProjects: function() {
        const root = document.getElementById('projects-root');
        if (!root) return;

        root.innerHTML = '';
        root.appendChild(this.createElement('h2', null, 'Projects'));

        const grid = this.createElement('div', 'grid');

        this.config.projects.forEach(project => {
            const card = this.createElement('div', 'card');
            
            const title = this.createElement('h3', null, project.title);
            const desc = this.createElement('p', null, project.description);
            const tagContainer = this.createElement('div', 'tags');

            project.tags.forEach(tag => {
                const tagSpan = this.createElement('span', 'tag', tag);
                tagContainer.appendChild(tagSpan);
            });

            card.appendChild(title);
            card.appendChild(desc);
            card.appendChild(tagContainer);
            grid.appendChild(card);
        });

        root.appendChild(grid);
    },

    renderGallery: function() {
        const root = document.getElementById('gallery-root');
        if (!root) return;

        root.innerHTML = '';
        root.appendChild(this.createElement('h2', null, 'Gallery'));

        const grid = this.createElement('div', 'grid');

        this.config.gallery.forEach(item => {
            const wrapper = this.createElement('div', 'gallery-item');
            
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.caption;
            img.className = 'gallery-img';

            const caption = this.createElement('div', 'gallery-caption', item.caption);

            wrapper.appendChild(img);
            wrapper.appendChild(caption);
            grid.appendChild(wrapper);
        });

        root.appendChild(grid);
    },

    renderFooter: function() {
        const root = document.getElementById('footer-root');
        if (!root) return;
        const year = new Date().getFullYear();
        root.innerHTML = `&copy; ${year} ${this.config.profile.name} :: Generated System`;
    },

    // --- 3. Initialization ---
    init: function() {
        this.renderHeader();
        this.renderBio();
        this.renderProjects();
        this.renderGallery();
        this.renderFooter();
    }
};