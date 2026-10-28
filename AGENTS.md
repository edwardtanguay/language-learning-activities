# Language Learning Activities

A platform for generating self-contained language learning activities and worksheets for self-study, language exchange tandems, and online tutoring platforms (e.g., Preply, iTalki).

## Repository Structure

- `index.html`: Root landing page and catalog listing all available activities.
- `topics/<topic-slug>/index.html`: Individual self-contained activity pages.
- `creators/`: Resources and tools for activity creators.
- `.agents/skills/`: Agent skills defining specific creation workflows (e.g., `/create-text-and-multiple-choice`).

## Activity Architecture & Technical Rules

Each activity lives in `topics/<topic-slug>/index.html`:
- **Directory Naming**: Use SEO-friendly, descriptive kebab-case names under `topics/` (e.g., `topics/regions-of-ecuador/`).
- **Self-Contained File**: All HTML, CSS (`<style>`), and JavaScript (`<script>`) must reside within the single `index.html` file so it can be emailed, shared, or opened offline.
- **No Local Asset Dependencies**: Do not use relative links to local external files (CSS, JS, or images). If media is needed, link to absolute web URLs hosted on the published website.
- **Local State & Reset**: Interactive features (e.g., quiz answers, score tracking) may use `localStorage` for persistence, but MUST include a visible reset button.
- **Catalog Registration**: When an activity is created, register its title, target language, proficiency level, and link in the root `index.html` catalog.
- the language on the page of the activity is always exclusively in the target language of the activity, even links and buttons

## Design System: 1970s School Handout

- **Aesthetic**: Authentic 1970s school handout / mimeograph worksheet. Clean, calm, and distraction-free. Avoid flashy modern animations or neon styling.
- **Layout & Responsiveness**:
  - **Desktop & Tablet (Landscape)**: Balanced margins, comfortable reading widths, and structured side-by-side or worksheet sections.
  - **Mobile (Portrait)**: Single-column vertical flow with touch-friendly controls.
- **Languages**
    - Use the following colors and language codes for the languages everywhere in the application so that everything is consistent:
      - English (`en`): `#9333ea` (purple)
      - German (`de`): `#7e4402` (brown)
      - French (`fr`): `#333388` (dark blue)
      - Spanish (`es`): `#be185d` (magenta / pink-red)
      - Italian (`it`): `#194d19` (dark green / forest green)
      - Dutch (`nl`): `#d97706` (mustard-orange)
      - Polish (`pl`): `#b8b8b8` (light grey)
      - Russian (`ru`): `#3f3f46` (dark grey)
      - Greek (`el`): `#0d9488` (teal / emerald)
      - Icelandic (`is`): `#06b6d4` (cyan / light blue)
      - Danish (`da`): `#ff1493` (hot pink)
    - The above order should also be used where languages are listed together

## Pedagogical Guidelines

- **Proficiency & Regional Style**: Tailor vocabulary, grammar, and cultural context to the learner's specified CEFR level (A1–C2) and target dialect (e.g., Latin American Spanish).
- **Comprehension Checks**: Test reading comprehension and grammar in context with immediate feedback and concise explanations.
- **Discussion & Tutor Prompts**:
  - Use open-ended "how" and "why" prompts that encourage deep language production.
  - Avoid simple yes/no or one-word answers.
  - Prompt learners to explain reasons, give examples, and describe scenarios in detail.

## Agent Execution Rules

- **No Browser Testing**: Do not launch browser subagents or open browser tabs to verify activities. Users test them manually.
- **Clarify Missing Information**: If target language, proficiency level, or topic is missing, prompt the user before creating the activity.
- **Follow Skill Definitions**: Follow the relevant skill file in `.agents/skills/` for layout, structure, and metadata standards.
