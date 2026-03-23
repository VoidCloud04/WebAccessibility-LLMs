const projects = [
  {
    title: "Campus Navigator",
    description: "Interactive campus map with optimized routing.",
    tags: ["web", "algorithms"],
    details: "Built with Dijkstra’s algorithm and a custom graph model.",
  },
  {
    title: "Expense Vision",
    description: "Personal finance tracker with analytics dashboards.",
    tags: ["data", "web"],
    details: "Includes CSV import, data normalization, and summary charts.",
  },
  {
    title: "Mini OS Scheduler",
    description: "Simulates CPU scheduling strategies and benchmarks.",
    tags: ["systems"],
    details: "Implements FCFS, SJF, and Round Robin with performance stats.",
  },
  {
    title: "Study Buddy",
    description: "Pomodoro + task manager for focused study sessions.",
    tags: ["web"],
    details: "Local storage persistence and offline-first behavior.",
  },
];

const grid = document.getElementById("project-grid");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const filterSelect = document.getElementById("filter");

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
      <button class="btn ghost" data-index="${idx}">View Details</button>
    `;
    grid.appendChild(card);
  });
}

function filterAndSortProjects(list, query, filter, sort) {
  const q = query.trim().toLowerCase();

  let filtered = list.filter((p) => {
    const matchesQuery =
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q));

    const matchesFilter = filter === "all" || p.tags.includes(filter);
    return matchesQuery && matchesFilter;
  });

  filtered.sort((a, b) => {
    if (sort === "za") return b.title.localeCompare(a.title);
    return a.title.localeCompare(b.title);
  });

  return filtered;
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

function validateFormData({ name, email, message }) {
  if (!name || !email || !message) {
    return { ok: false, msg: "Please fill in all fields." };
  }
  if (!email.includes("@") || !email.includes(".")) {
    return { ok: false, msg: "Please enter a valid email." };
  }
  return { ok: true, msg: "Message sent! (demo)" };
}

function updateProjects() {
  const filtered = filterAndSortProjects(
    projects,
    searchInput.value,
    filterSelect.value,
    sortSelect.value
  );
  renderProjects(filtered);
}

grid.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-index]");
  if (!btn) return;
  const idx = parseInt(btn.dataset.index, 10);
  openModal(projects[idx]);
});

closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

searchInput.addEventListener("input", updateProjects);
filterSelect.addEventListener("change", updateProjects);
sortSelect.addEventListener("change", updateProjects);

document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const result = validateFormData({
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim(),
  });

  const msg = document.getElementById("form-msg");
  msg.textContent = result.msg;
  msg.className = `form-msg ${result.ok ? "success" : "error"}`;
});

renderProjects(projects);