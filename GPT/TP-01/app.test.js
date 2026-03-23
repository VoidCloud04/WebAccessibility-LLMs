// Minimal vanilla JS test runner (no libraries)

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

const results = [];

function setupDOM() {
  document.body.innerHTML = `
    <div data-bind="name"></div>
    <a data-bind-href="ctaPrimary.href">link</a>
    <div id="meta"></div>
    <div id="hero-card"></div>
    <div id="skills-list"></div>
    <div id="projects-grid"></div>
    <div id="gallery-grid"></div>
    <div id="contact-card"></div>
  `;
}

function runTests() {
  setupDOM();

  test("setText sets textContent", () => {
    const el = document.createElement("div");
    setText(el, "Hello");
    assert(el.textContent === "Hello", "setText failed");
  });

  test("setHref sets href", () => {
    const el = document.createElement("a");
    setHref(el, "#test");
    assert(el.getAttribute("href") === "#test", "setHref failed");
  });

  test("renderMeta creates pills", () => {
    renderMeta(["One", "Two"], document.getElementById("meta"));
    assert(document.querySelectorAll(".pill").length === 2, "renderMeta failed");
  });

  test("renderHeroCard creates rows", () => {
    renderHeroCard([{ label: "A", value: "1" }], document.getElementById("hero-card"));
    assert(document.querySelectorAll("#hero-card .row").length === 1, "renderHeroCard failed");
  });

  test("renderSkills creates chips", () => {
    renderSkills(["JS", "CSS"], document.getElementById("skills-list"));
    assert(document.querySelectorAll(".chip").length === 2, "renderSkills failed");
  });

  test("renderProjects creates cards", () => {
    renderProjects(
      [{ title: "P1", description: "D", tags: ["T"], link: "#" }],
      document.getElementById("projects-grid")
    );
    assert(document.querySelectorAll("#projects-grid .card").length === 1, "renderProjects failed");
  });

  test("renderGallery creates images", () => {
    renderGallery(["a.jpg", "b.jpg"], document.getElementById("gallery-grid"));
    assert(document.querySelectorAll("#gallery-grid img").length === 2, "renderGallery failed");
  });

  test("renderContact creates contact card", () => {
    renderContact({ email: "a@b.com", location: "X", github: "#" }, document.getElementById("contact-card"));
    assert(document.getElementById("contact-card").textContent.includes("a@b.com"), "renderContact failed");
  });

  test("bindData binds all sections", () => {
    const config = {
      name: "Test Name",
      ctaPrimary: { href: "#p" },
      meta: ["One"],
      heroHighlights: [{ label: "L", value: "V" }],
      skills: ["S1"],
      projects: [{ title: "P", description: "D", tags: ["T"], link: "#" }],
      gallery: ["x.jpg"],
      contact: { email: "e@e.com", location: "Loc", github: "#" },
    };

    bindData(config);
    assert(document.querySelector("[data-bind='name']").textContent === "Test Name", "bindData name failed");
    assert(document.querySelectorAll(".pill").length === 1, "bindData meta failed");
    assert(document.querySelectorAll(".chip").length === 1, "bindData skills failed");
    assert(document.querySelectorAll(".card").length === 1, "bindData projects failed");
    assert(document.querySelectorAll("#gallery-grid img").length === 1, "bindData gallery failed");
  });

  return results;
}