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

function runTests() {
  test("filterAndSortProjects filters by tag", () => {
    const list = [
      { title: "A", description: "", tags: ["web"] },
      { title: "B", description: "", tags: ["data"] },
    ];
    const out = filterAndSortProjects(list, "", "web", "az");
    assert(out.length === 1 && out[0].title === "A", "Filter by tag failed");
  });

  test("filterAndSortProjects searches by title", () => {
    const list = [
      { title: "Alpha", description: "", tags: ["web"] },
      { title: "Beta", description: "", tags: ["web"] },
    ];
    const out = filterAndSortProjects(list, "bet", "all", "az");
    assert(out.length === 1 && out[0].title === "Beta", "Search failed");
  });

  test("filterAndSortProjects sorts Z-A", () => {
    const list = [
      { title: "A", description: "", tags: ["web"] },
      { title: "C", description: "", tags: ["web"] },
    ];
    const out = filterAndSortProjects(list, "", "all", "za");
    assert(out[0].title === "C", "Sort Z-A failed");
  });

  test("validateFormData rejects empty fields", () => {
    const out = validateFormData({ name: "", email: "a@b.com", message: "x" });
    assert(out.ok === false, "Empty field check failed");
  });

  test("validateFormData rejects invalid email", () => {
    const out = validateFormData({ name: "A", email: "invalid", message: "x" });
    assert(out.ok === false, "Email validation failed");
  });

  test("validateFormData accepts valid input", () => {
    const out = validateFormData({ name: "A", email: "a@b.com", message: "x" });
    assert(out.ok === true, "Valid input failed");
  });

  return results;
}