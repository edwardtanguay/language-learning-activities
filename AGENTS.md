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
- **Local State & Reset**: Interactive features (e.g., quiz answers, vocabulary completion state) must use `localStorage` for persistence, and MUST include a visible reset button that restores the worksheet to its initial state.
- **Catalog Registration**: When an activity is created, register its title, target language, proficiency level, and link in the root `index.html` catalog.
- **Target Language Exclusivity**: All content and interface elements on an activity page (including headings, instructions, buttons, wrong-drop hints, and navigation links) must be exclusively in the target language.
- **Structured Instructions Callout**:
  - The instructions box outlines the workflow for both self-study and tandem/tutoring sessions, structured with clear bold headings:
    - **Before Class / Antes de la clase**: Student and teacher read the text and exercises as much as possible; student looks up unknown words necessary to understand the text and questions; teacher familiarizes with the topic and prepares additional context.
    - **In Class / En clase**:
      1. Student reads through the text aloud while teacher corrects pronunciation errors immediately as they occur.
      2. Student and teacher work through exercises together.
      3. Student and teacher answer discussion questions, with the teacher always going first on each question; conversations should remain open-ended.
- **Reading Passage (~400 Words, No Word Counts)**:
  - The reading text in Section A should always be approximately 400 words in length, divided into logical paragraphs or subsections.
  - Do NOT include word count indicators (such as `~400 palabras`) anywhere in section titles, subtitles, or headers.
- **Section Lettering & Question Numbering**: Main sections across the worksheet are designated with clean large capital letters (A, B, C, D...) — e.g., Section A: Reading Text, Section B: Key Vocabulary, Section C: Comprehension Exercises, Section D: Discussion Questions — so that questions nested inside Section C are clearly numbered 1, 2, 3... without ambiguity.
- **Section B: Key Vocabulary (Vocabulario Clave) Drag & Drop Exercise**:
  - Positioned immediately following Section A (the reading text).
  - Titled "Key Vocabulary" translated into the target language (e.g., "Vocabulario Clave" in Spanish).
  - Features the 10 hardest words from the text. Each word must be strictly ONE standard single word in the target language (e.g., "decenas", "calurosa", "nevados", "cálido"), avoiding multi-word phrases or broad international terms like "Biodiversidad".
  - Layout & Interaction:
    - Top: waiting word chips in a flexible layout (`.vocab-pool`).
    - Below: active target definition cards in shuffled order (`.vocab-targets`).
    - Fully responsive: supports mouse drag, touch drag, and tap-to-select (tap a word chip to highlight it, then tap the target definition) for seamless mobile usability.
    - Wrong drop: the word sticks on the definition box, displays a red X SVG icon, and presents a hint in the target language explaining what that word actually means. The entire rest of the page is dimmed/disabled via an overlay until the user clicks anywhere on the box, which returns the word chip to the waiting pool.
    - Correct drop: creates a complete boxed dictionary entry for that word (word, part of speech, definition, and quote from the text highlighting the word). The page is dimmed/disabled until the user clicks anywhere on the box.
    - Dismissing a solved word removes that definition card from the active list and moves the word chip to the completed words section.
    - Completed words section: no section title; displays completed words in a flex row of pills, each with a green check SVG icon to its left.
    - Clicking any completed word pill pops open its complete dictionary definition card in a designated view area above the pills until clicked again to close.
    - Completed vocabulary progress is persisted in `localStorage` and reset with the "Reiniciar respuestas" button.
- **Section C: Comprehension Questions & Neutral Option Styling**:
  - Do NOT include generic instructions like "Elige la respuesta correcta para cada pregunta...".
  - Options must have NO background fill and NO hover background (`background: transparent;`), with tight vertical spacing between options.
  - Radio button circle remains alongside the option letter, vertically centered with the first line of text across all browsers.
  - Option letters are followed by a period (`A.`, `B.`, `C.`, `D.`) with option text positioned close to the period.
  - Contextual Inline Feedback:
    - Display the feedback box directly beneath the actively selected option, keeping its subtle background tint (`--paper-bg`).
    - Inside the feedback box, display a thick green check SVG icon (✓) for correct answers or a thick red X SVG icon (✗) for incorrect answers alongside the explanation text.
    - Do NOT include status text words like "¡Correcto!" or "Incorrecto.", and do NOT prefix explanations with option letters.
    - Keep question cards clean and neutral; do NOT color the entire question card green or red.
- **Section D: Discussion Questions Section**:
  - Heading standardized to "Discussion Questions" in the target language (e.g., "Preguntas de discusión" in Spanish), lettered as Section D.
  - Borderless and transparent container (remove dashed or solid outline boxes).
  - No boilerplate introductory instructions.
- **Bottom Actions Bar & Balanced Spacing**:
  - Equal upper and lower padding (`padding-top: 20px; padding-bottom: 20px; border-top: 1px solid var(--ink-rule); border-bottom: 1px solid var(--ink-rule);`) so the back link and reset button are equally distant from the horizontal rule lines above and below them on both desktop and mobile.
  - Discrete reset button with icon in the target language (e.g., "↺ Reiniciar respuestas") to clear all `localStorage` state (both multiple-choice and vocabulary).
- **Standardized Footer & Mobile Centering**:
  - Footer displays: `Language Learning Activities • See more projects by <a href="https://tanguay.info" target="_blank" rel="noopener noreferrer"><em>Edward</em></a>`
  - On mobile (`max-width: 680px`), stack and horizontally center "Language Learning Activities" and "See more projects by Edward" with the bullet dot hidden (`display: none;`).

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
