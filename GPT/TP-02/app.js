const projects = [
  {
    title: "Campus Navigator",
    description: "Interactive campus map with optimized route suggestions.",
    tags: ["web", "algorithms"],
    details: "Built with Dijkstra’s algorithm and a custom graph data model.",
  },
  {
    title: "Expense Vision",
    description: "Personal finance tracker with analytics dashboards.",
    tags: ["data", "web"],
    details: "Includes CSV import, data normalization, and charts.",
  },
  {
    title: "Mini OS Scheduler",
    description: "Simulates CPU scheduling strategies and benchmarks.",
    tags: ["systems"],
    details: "Implements FCFS, SJF, and Round Robin with performance stats.",
  },
  {
    title: "Study Buddy",
    description: "Pomodoro + task list app for better focus.",
    tags: ["web"],
    details: "Local storage persistence and offline-first design.",
  },
];

const grid = document.getElementById("projects-grid");
const searchInput = document.getElementById("project-search");
const filterSelect = document.getElementById("project-filter");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalTags = document.getElementById("modal-tags");
const closeModalBtn = document.getElementById("close-modal");

function renderProjects(items) {
  grid.innerHTML = "";
  if (items.length === 0) {
    grid.innerHTML = "<p>No projects found.</p>";
    return;
  }

  items.forEach((p, idx) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${p.title}</h3>
      <p class="desc">${p.description}</p>
      <div class="tags">
        ${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
      </div>
      <button data-index="${idx}">View Details</button>
    `;
    grid.appendChild(card);
  });
}

function filterProjects() {
  const query = searchInput.value.toLowerCase();
  const filter = filterSelect.value;

  const filtered = projects.filter((p) => {
    const matchesQuery =
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tags.some((t) => t.includes(query));

    const matchesFilter = filter === "all" || p.tags.includes(filter);
    return matchesQuery && matchesFilter;
  });

  renderProjects(filtered);
}

function openModal(project) {
  modalTitle.textContent = project.title;
  modalDesc.textContent = project.details;
  modalTags.innerHTML = project.tags.map((t) => `<span class="tag">${t}</span>`).join("");
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

function setupProjectDetails() {
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-index]");
    if (!btn) return;
    const idx = parseInt(btn.dataset.index, 10);
    openModal(projects[idx]);
  });
}

function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const msg = document.getElementById("form-msg");

  if (!name || !email || !message) {
    msg.textContent = "Please fill in all fields.";
    msg.className = "form-msg error";
    return false;
  }

  if (!email.includes("@") || !email.includes(".")) {
    msg.textContent = "Please enter a valid email.";
    msg.className = "form-msg error";
    return false;
  }

  msg.textContent = "Message sent! (demo)";
  msg.className = "form-msg success";
  return true;
}

document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  validateForm();
});

searchInput.addEventListener("input", filterProjects);
filterSelect.addEventListener("change", filterProjects);
closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

renderProjects(projects);
setupProjectDetails();