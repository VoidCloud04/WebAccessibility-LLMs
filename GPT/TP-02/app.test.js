// Minimal vanilla JS test runner (no libraries)

const results = [];

function assert(condition, message) {
  if (!condition) throw new Error(message || "Assertion failed");
}

function test(name, fn) {
  try {
    fn();
    results.push({ name, status: "pass" });
  } catch (err) {
    results.push({ name, status: "fail", error: err.message });
  }
}

function setupDOM() {
  document.body.innerHTML = `
    <input id="project-search" />
    <select id="project-filter">
      <option value="all">All</option>
      <option value="web">Web</option>
      <option value="data">Data</option>
      <option value="systems">Systems</option>
    </select>
    <div id="projects-grid"></div>

    <div id="modal" class="modal hidden">
      <div id="modal-title"></div>
      <div id="modal-desc"></div>
      <div id="modal-tags"></div>
    </div>
    <button id="close-modal"></button>

    <form id="contact-form">
      <input id="name" />
      <input id="email" />
      <textarea id="message"></textarea>
      <p id="form-msg"></p>
    </form>
  `;
}

function runTests() {
  setupDOM();

  test("renderProjects renders cards", () => {
    renderProjects([{ title: "P1", description: "D", tags: ["web"], details: "X" }]);
    assert(document.querySelectorAll("#projects-grid .card").length === 1, "Card render failed");
  });

  test("filterProjects filters by tag", () => {
    document.getElementById("project-search").value = "";
    document.getElementById("project-filter").value = "systems";
    filterProjects();
    const text = document.getElementById("projects-grid").textContent;
    assert(text.includes("Mini OS Scheduler"), "Filter by tag failed");
  });

  test("filterProjects filters by query", () => {
    document.getElementById("project-search").value = "expense";
    document.getElementById("project-filter").value = "all";
    filterProjects();
    const text = document.getElementById("projects-grid").textContent.toLowerCase();
    assert(text.includes("expense vision"), "Filter by query failed");
  });

  test("openModal fills modal content", () => {
    openModal({ title: "X", details: "Y", tags: ["web"] });
    assert(document.getElementById("modal-title").textContent === "X", "Modal title failed");
    assert(document.getElementById("modal-desc").textContent === "Y", "Modal desc failed");
  });

  test("closeModal hides modal", () => {
    document.getElementById("modal").classList.remove("hidden");
    closeModal();
    assert(document.getElementById("modal").classList.contains("hidden"), "Modal close failed");
  });

  test("validateForm rejects empty", () => {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "a@b.com";
    document.getElementById("message").value = "Hi";
    const ok = validateForm();
    assert(ok === false, "Empty validation failed");
  });

  test("validateForm rejects invalid email", () => {
    document.getElementById("name").value = "A";
    document.getElementById("email").value = "invalid";
    document.getElementById("message").value = "Hi";
    const ok = validateForm();
    assert(ok === false, "Email validation failed");
  });

  test("validateForm accepts valid input", () => {
    document.getElementById("name").value = "A";
    document.getElementById("email").value = "a@b.com";
    document.getElementById("message").value = "Hi";
    const ok = validateForm();
    assert(ok === true, "Valid input failed");
  });

  return results;
}