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
  - The instructions box outlines the workflow for both self-study and tandem/tutoring sessions concisely in the target language under the heading **INSTRUCCIONES**:
    - **• Before Class / Antes de la clase**: Student and teacher familiarize themselves with the text as much as they want (no trailing period, e.g., `Estudiante y profesor se familiarizan con el texto lo que deseen`).
    - **• In Class / En clase**: comma-separated list: `(1) Lectura en voz alta con corrección, (2) Ejercicios juntos, (3) Preguntas de discusión juntos`.
    - Keep phrasing concise, bulleted, and inline rather than multi-sentence lists so it can be read in seconds.
- **Reading Passage (~400 Words, No Word Counts, No Left Border Lines)**:
  - The reading text in Section A should always be approximately 400 words in length, divided into logical paragraphs or subsections.
  - Do NOT include word count indicators (such as `~400 palabras`) anywhere in section titles, subtitles, or headers.
  - Paragraphs and subsection cards must NOT have vertical border lines on the left (clean unbordered text).
- **Section Lettering & Question Numbering**: Main sections across the worksheet are designated with clean capital letters without periods, placed inside a light gray/warm-parchment circle (`<span class="section-num">A</span>`, `B`, `C`, `D`) — e.g., `<span class="section-num">A</span> Texto de Lectura`, `<span class="section-num">B</span> Vocabulario`, `<span class="section-num">C</span> Comprensión`, `<span class="section-num">D</span> Discusión`. Circular badge is styled cleanly (~32px diameter, background `#e6e0d2`, dark charcoal letter centered). Questions nested inside Section C are clearly numbered 1, 2, 3... without ambiguity.
- **Section B: Vocabulary (Vocabulario) Drag & Drop & Hint Exercise**:
  - Positioned immediately following Section A (the reading text).
  - Titled "Vocabulary" translated into the target language (e.g., "Vocabulario" in Spanish, without "Clave" or period).
  - Features the 10 hardest words from the text. Each word must be strictly ONE standard single word in the target language (e.g., "decenas", "calurosa", "nevados", "cálido"), avoiding multi-word phrases or broad international terms like "Biodiversidad".
  - Layout & Interaction:
    - Top: waiting word chips in a flexible layout (`.vocab-pool`) horizontally centered (`justify-content: center;`), balanced across rows as equally as possible (e.g. 5 and 5 when wrapped into two rows). Reduced upper and lower padding on word chips (`padding: 2px 9px;`).
    - Below: active target definition cards in shuffled order (`.vocab-targets`). Cards contain only the definition text, with NO placeholder prompt like "Toca o arrastra aquí...".
    - Pill & Card Styling: All pills (waiting word chips `.vocab-chip` and completed word pills `.vocab-completed-pill`) and target cards must be square-cornered (`border-radius: 0;`) with narrower padding.
    - Compact Mobile Layout: Ultra-compact styling (tight gap, ~6px 10px card padding, 13.5px definition font) ensuring all 10 definitions are visible and accessible without cumbersome scrolling.
    - Fully responsive: supports mouse drag, touch drag, and tap-to-select for seamless mobile usability.
    - Word chip click on top: clicking a waiting chip opens a hint popup displaying the word title with a lookup icon next to it, followed by a green hand pointing right SVG icon and the hint text in the target language (hint helps without making the answer obvious, no trailing punctuation, no repeating word prefix).
    - Lookup icon: next to the word at the top, a magnifying glass lookup button opens a new tab and searches Google: `give me the definition of the word "<word>" in <language>, and the translation of the word in English, and then three example sentences with that word, for each example, once in <language> and once in English`.
    - Wrong drop panel:
      - Neutral background (no red fill or red border; the ONLY red element on the panel is the red X icon).
      - Red X SVG icon placed next to the wrong definition (starts with lowercase and ends with no punctuation).
      - Below that: a green vector hand pointing right SVG icon next to the hint text (no trailing punctuation, without repeating the word twice).
      - To the right of the word title at the top, a lookup icon.
      - No X close button in the upper right. Text is fully selectable to copy, but clicking the box anywhere (without text selected) closes it and returns the chip to the waiting pool.
    - Correct drop: creates a complete boxed dictionary entry for that word (word, part of speech, lookup icon, definition, and quote from the text highlighting the word). Dims/disables the page until the user clicks anywhere on the box, which removes that definition card and moves the word chip to completed words.
    - Completed words section: no section title; displays completed words in a flex row of square-cornered pills, each with a green check SVG icon to its left.
    - Clicking any completed word pill pops open its complete dictionary definition card (including lookup icon) in a designated view area above the pills until clicked again to close.
    - Completed vocabulary progress is persisted in `localStorage` and reset with the "Reiniciar respuestas" button.
- **Universal Text Selection & Copy/Paste Support**:
  - Learners must be able to select and copy text anywhere on the page without restriction (reading passage, word chips, definition cards, completed word pills, popup dictionary entries, quiz questions, options, and feedback explanations).
  - Do not apply `user-select: none;` to text-bearing elements.
  - On modal and popup cards, clicking or selecting text inside the card must NEVER accidentally dismiss or close it. Dismissing via click must ignore clicks where text is currently selected (`window.getSelection().toString().trim().length > 0`) or clicks on lookup buttons.
- **Section C: Comprehension Questions & Neutral Radio-Free Option Styling**:
  - Heading standardized to "Comprehension" in the target language (e.g., "Comprensión" in Spanish, lettered as Section C).
  - Do NOT include generic instructions like "Elige la respuesta correcta para cada pregunta...".
  - NO radio buttons (`<input type="radio">` removed completely).
  - Options must have NO background fill and NO hover background (`background: transparent;`), with tight vertical spacing between options.
  - Option letters are followed by a period (`A.`, `B.`, `C.`, `D.`) with option text positioned close to the period. When an option is selected, its option letter highlights in bold/accent color (`--stamp-blue`).
  - Contextual Inline Feedback:
    - Display the feedback box directly beneath the actively selected option, keeping its subtle background tint (`--paper-bg`).
    - Inside the feedback box, display a thick green check SVG icon (✓) for correct answers or a thick red X SVG icon (✗) for incorrect answers alongside the explanation text.
    - Do NOT include status text words like "¡Correcto!" or "Incorrecto.", and do NOT prefix explanations with option letters.
    - Keep question cards clean and neutral; do NOT color the entire question card green or red.
- **Section D: Discussion Section**:
  - Heading standardized to "Discussion" in the target language (e.g., "Discusión" in Spanish, lettered as Section D).
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
