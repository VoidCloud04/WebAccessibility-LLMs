# WebAccessibility-LLMs
For a University project storing LLM Generated Webpages and testing them for accessibility and other metrics.
### LLMs being tested
- GPT-5.2-Codex
- Grok Code Flash 1
- Gemini 3 Pro
### Test Prompts
| Prompt Number | Prompt Used |
| ------------- | ----------- |
| TP-01 | Generate a minimalist dark theme software developer portfolio. Make it dynamically upgradeable and changeable through the javascript code. It should also contain images for a gallery or either for projects. Make it fully out of Vanilla HTML, JS, and CSS using separate files. Generate Unit Tests for All JavaScript functions and features. |
| TP-02 | Generate a student project showcase website for a computer science student using separate HTML, CSS and JavaScript files. It should have a clean theme with colors and fonts and include sections like a navigation bar, about section, skills, projects, and a contact form. The about and contact section should have placeholder images. Add interactivity using JavaScript such as searching or filtering projects, showing more details for a project, and basic form validation with messages. Make sure everything works without needing any fixes. |
| TP-03 | Create a multi-file website for a computer science student that showcases their work and skills. Generate separate files for HTML, CSS, and JavaScript. The design should feel modern and cohesive, using a consistent color scheme and readable fonts. The webpage should include a header with navigation, a landing section, an about section, a skills section, a projects gallery, and a contact section. Use placeholder images where visuals are needed, such as for profile and project content. Add JavaScript features that make the page interactive, such as filtering or sorting projects, expanding project cards to reveal more information, and validating user input in the contact form with clear feedback messages. Also include a separate file with unit tests for the JavaScript logic (for example, testing validation and filtering behavior) using a standard testing approach. Make sure all files are complete, clearly organized, and function properly together without requiring any additional changes. |
### Raw Data
| Prompt Number | Model | WAVE Score | Unit Testing Score | Additional Info |
| ------------- | ----- | ---------- | ------------------ | --------------- |
| TP-01 | GPT | 8.4 | Failed to Run | Redeclared Const Variable |
| TP-02 | GPT | 7.9 | Failed to Run | addEventListener Failed |
| TP-03 | GPT | 8.4 | 6/6 | couldn't access addEventListener |
| TP-01 | Grok | 9.1 | 12/12 | |
| TP-02 | Grok | 5.5 | 1/5 | couldn't access querySelector |
| TP-03 | Grok | 4.8 | 5/10 | Test Failure & Type Error querySelector |
| TP-01 | Gemini | 9.9 | 5/5 | |
| TP-02 | Gemini | 9.7 | 6/8 | Type Error couldn't access a property |
| TP-03 | Gemini | 10 | 7/7 | |
### Compiled Data
| Value | GPT | Grok | Gemini |
| ----- | --- | ---- | ------ |
| Average AIM Score | 8.23 | 6.47 | 9.87 |
| Average Unit Test Completion | 33.33% | 56.67% | 91.67% |
| Average Accessibility Errors | 2 | 0.67 | 0.33 |
| Average Contrast Errors | 0.67 | 8.33 | 0 |
| Average Accessibility Alerts | 3.33 | 2 | 1 |
### Composite Scores
| Value | Data |
| ----- | ---- |
| Composite Average AIM Score | 8.19 |
| Composite Average Unit Test Completion | 60.56% |
| Composite Average Accessibility Errors | 1 |
| Composite Average Contrast Errors | 3 |
| Composite Average Accessibility Alerts | 2.11 |
| Most Effective Model Accessibility | Gemini |
| Most Effective Model Unit Tests | Gemini |
| Least Effective Model Accessibility | Grok |
| Least Effective Model Unit Tests | GPT |
