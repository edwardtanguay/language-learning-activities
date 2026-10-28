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
- **Target Language Exclusivity**: All content and interface elements on an activity page (including headings, instructions, buttons, and navigation links) must be exclusively in the target language.

## Design System: 1970s School Handout

- **Aesthetic**: Authentic 1970s school handout / mimeograph worksheet. Clean, calm, and distraction-free. Avoid flashy modern animations or neon styling.
- **Paper on Desk Aesthetic**:
  - The handout sheet (`.handout-sheet`) sits atop the background with a realistic, soft blurred shadow (`box-shadow: 0 12px 38px rgba(45, 40, 35, 0.08), 0 3px 10px rgba(45, 40, 35, 0.04)`) and a delicate warm border (`1px solid #e8e2d5`), giving the tactile look of a physical piece of paper resting on a desk.
- **No Harsh Black Outlines**:
  - Do not use dark or solid black outlines anywhere on the worksheet (such as harsh borders around cards, boxes, or headers), as thick dark borders evoke death/funeral announcements in several cultures.
  - Instead, use soft, warm parchment rules (`--ink-rule: #d5cebf`), soft cards with subtle shadows, and light background shifts.
- **Minimalist Title Area**:
  - The title header has NO enclosing box or outline border (`border: none`).
  - Contains strictly the activity title and a prominent, slightly tilted stamp badge (e.g., `Español B1` or `[Idioma] [Nivel]`).
  - Do not include generic subtitle taglines (e.g., "Hoja de trabajo pedagógica..."), student name/date fill blanks, or cluttering metadata tag pills.
  - Stamp badge is large and clear (`font-size: 18px`, `border: 3px solid var(--lang-color)`), slightly tilted (e.g. `-2deg`), and uses the standardized language color.
- **Clean Navigation**:
  - Top utility navigation contains only a back link to the index (e.g., `← Índice de Actividades`) with a thick, prominent arrow (SVG or bold glyph).
  - Do not include "(Home)" in the link label.
  - Do not include "Imprimir / Guardar PDF" buttons in the navigation bar.
- **Plain Large Numbers (No Inverted Dark Boxes)**:
  - In section titles (1, 2, 3...) and quiz question prompts, numbers are rendered as clean, large numbers in the text color (`--ink-main`) without dark box backgrounds, white-on-black fills, or heavy border boxes.
- **No Word Count Mentions**:
  - Do not include word counts (such as `~400 palabras`) anywhere in section titles or headers.
- **Layout & Responsiveness**:
  - **Desktop & Tablet (Landscape)**: Balanced margins, comfortable reading widths, and structured side-by-side or worksheet sections.
  - **Mobile (Portrait)**: Single-column vertical flow with touch-friendly controls.

## Standardized Languages & Palette

Use the following standardized languages, 2-letter ISO codes, and hex colors everywhere across the application so that all badges, tags, and filters remain consistent:

1. English (`en`): `#9333ea` (purple / `--lang-en`)
2. German (`de`): `#7e4402` (brown / `--lang-de`)
3. French (`fr`): `#333388` (dark blue / `--lang-fr`)
4. Spanish (`es`): `#be185d` (magenta / pink-red / `--lang-es`)
5. Italian (`it`): `#194d19` (dark green / forest green / `--lang-it`)
6. Dutch (`nl`): `#d97706` (mustard-orange / `--lang-nl`)
7. Polish (`pl`): `#b8b8b8` (light grey / `--lang-pl`)
8. Russian (`ru`): `#3f3f46` (dark grey / `--lang-ru`)
9. Greek (`el`): `#0d9488` (teal / emerald / `--lang-el`)
10. Icelandic (`is`): `#06b6d4` (cyan / light blue / `--lang-is`)
11. Danish (`da`): `#ff1493` (hot pink / `--lang-da`)

### Language UI Rules

- **Ordering**: The above order must always be used whenever languages are listed together (e.g., catalog filters, documentation, legends).
- **Catalog Cards (`index.html`)**: Activity cards display a `.badge-lang` styled with the target language's color for its border, text, and subtle tint.
- **Catalog Dropdown Filter (`index.html`)**: The language filter dropdown includes all 11 standardized languages in the canonical order.
- **Activity Pages (`topics/<slug>/index.html`)**: The header stamp badge (`.stamp-badge`) and language metadata tags use the designated language color (e.g., `#be185d` for Spanish) to resemble an authentic colored ink stamp, while preserving the calm mimeograph ink aesthetic for the rest of the worksheet.

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
