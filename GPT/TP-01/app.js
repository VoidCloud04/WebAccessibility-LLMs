const PORTFOLIO_CONFIG = {
  name: "Void Cloud",
  role: "Software Developer",
  tagline: "I build minimal, high-performance web experiences.",
  about:
    "Focused on clean architecture, accessibility, and developer ergonomics. I design systems that are easy to evolve and scale.",
  ctaPrimary: { label: "View Projects", href: "#projects" },
  ctaSecondary: { label: "Contact Me", href: "#contact" },
  meta: ["Remote", "Open to Work", "JavaScript", "UI Systems"],
  heroHighlights: [
    { label: "5+", value: "Years Experience" },
    { label: "20+", value: "Shipped Apps" },
    { label: "99.9%", value: "Uptime Focus" },
  ],
  skills: ["JavaScript", "TypeScript", "HTML", "CSS", "Node.js", "Testing", "UX"],
  projects: [
    {
      title: "Nimbus Dash",
      description: "Realtime analytics dashboard with modular widgets.",
      tags: ["Web", "Data", "UI"],
      link: "https://example.com",
    },
    {
      title: "Atlas API",
      description: "Secure multi-tenant API with observability built in.",
      tags: ["API", "Security", "DevOps"],
      link: "https://example.com",
    },
    {
      title: "Aurora CLI",
      description: "Developer productivity CLI for automation workflows.",
      tags: ["CLI", "Tooling"],
      link: "https://example.com",
    },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop"
  ],
  contact: {
    email: "hello@example.com",
    location: "USA",
    github: "https://github.com/VoidCloud04",
  },
};

function setText(el, text) {
  if (!el) return;
  el.textContent = text;
}

function setHref(el, href) {
  if (!el) return;
  el.setAttribute("href", href);
}

function renderMeta(meta, container) {
  if (!container) return;
  container.innerHTML = "";
  meta.forEach((m) => {
    const pill = document.createElement("span");
    pill.className = "pill";
    pill.textContent = m;
    container.appendChild(pill);
  });
}

function renderHeroCard(items, container) {
  if (!container) return;
  container.innerHTML = "";
  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `<strong>${item.value}</strong><span class="muted">${item.label}</span>`;
    container.appendChild(row);
  });
}

function renderSkills(skills, container) {
  if (!container) return;
  container.innerHTML = "";
  skills.forEach((skill) => {
    const chip = document.createElement("div");
    chip.className = "chip";
    chip.textContent = skill;
    container.appendChild(chip);
  });
}

function renderProjects(projects, container) {
  if (!container) return;
  container.innerHTML = "";
  projects.forEach((p) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="title">${p.title}</div>
      <div class="desc">${p.description}</div>
      <div class="tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
      <a class="btn ghost" href="${p.link}" target="_blank" rel="noopener">Open</a>
    `;
    container.appendChild(card);
  });
}

function renderGallery(images, container) {
  if (!container) return;
  container.innerHTML = "";
  images.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Project preview";
    container.appendChild(img);
  });
}

function renderContact(contact, container) {
  if (!container) return;
  container.innerHTML = `
    <div><strong>Email:</strong> ${contact.email}</div>
    <div><strong>Location:</strong> ${contact.location}</div>
    <div><strong>GitHub:</strong> <a class="btn ghost" href="${contact.github}" target="_blank" rel="noopener">Profile</a></div>
  `;
}

function bindData(config) {
  document.querySelectorAll("[data-bind]").forEach((el) => {
    const key = el.getAttribute("data-bind");
    setText(el, config[key]);
  });

  document.querySelectorAll("[data-bind-href]").forEach((el) => {
    const key = el.getAttribute("data-bind-href");
    const parts = key.split(".");
    let value = config;
    parts.forEach((p) => (value = value[p]));
    setHref(el, value);
  });

  renderMeta(config.meta, document.getElementById("meta"));
  renderHeroCard(config.heroHighlights, document.getElementById("hero-card"));
  renderSkills(config.skills, document.getElementById("skills-list"));
  renderProjects(config.projects, document.getElementById("projects-grid"));
  renderGallery(config.gallery, document.getElementById("gallery-grid"));
  renderContact(config.contact, document.getElementById("contact-card"));
}

function updateConfig(partial) {
  Object.assign(PORTFOLIO_CONFIG, partial);
  bindData(PORTFOLIO_CONFIG);
}

document.addEventListener("DOMContentLoaded", () => {
  bindData(PORTFOLIO_CONFIG);
});

window.Portfolio = {
  updateConfig,
  getConfig: () => ({ ...PORTFOLIO_CONFIG }),
  bindData,
  renderMeta,
  renderHeroCard,
  renderSkills,
  renderProjects,
  renderGallery,
  renderContact,
  setText,
  setHref,
};