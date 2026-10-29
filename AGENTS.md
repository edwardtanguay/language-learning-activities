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
    - **Antes de la clase / Before Class**: No bullet dot in front of the label. The label is capitalized (`Antes de la clase:`) followed by an all-lowercase description (e.g., `estudiante y profesor se familiarizan con el texto lo que deseen`, without trailing period).
    - **En clase / In Class**: No bullet dot in front of the label. The label is capitalized (`En clase:`) followed by an all-lowercase comma-separated list: `(1) lectura en voz alta con corrección, (2) ejercicios juntos, (3) preguntas de discusión juntos`.
    - Keep phrasing concise, inline, and readable in seconds.
- **Header & Title on Mobile**:
  - On mobile (`max-width: 680px`), the stamp badge (`.stamp-badge`) is centered horizontally in the middle (`margin: 4px auto 0 auto; align-self: center;`), and the main title (`.handout-title-group h1`) and subtitle (`.handout-subtitle`) are centered.
  - The instructions callout heading (`.instructions-heading`, e.g. **INSTRUCCIONES**) is also centered on mobile.
- **Section Numbering & Right-Side Action Hints**:
  - Main sections across the worksheet are designated with clean numbers (1, 2, 3, 4) without periods, placed inside a light gray/warm-parchment circle (`<span class="section-num">1</span>`, `2`, `3`, `4`) — e.g., `<span class="section-num">1</span> Lectura`, `<span class="section-num">2</span> Vocabulario`, `<span class="section-num">3</span> Comprensión`, `<span class="section-num">4</span> Preguntas abiertas`. Circular badge is styled cleanly (~32px diameter, background `#e6e0d2`, dark charcoal number centered). Questions nested inside Section 3 are clearly numbered 1, 2, 3... without ambiguity.
  - On the right side of each section heading line, include an action hint written in small letters with subtle opacity (`.section-action-hint`, e.g. `font-size: 13px; color: var(--ink-muted); opacity: 0.65; font-family: var(--font-typewriter);`) translated into the worksheet's target language:
    - Section 1: "read aloud" (in Spanish: `leer en voz alta`)
    - Section 2: "drag and drop" (in Spanish: `arrastrar y soltar`)
    - Section 3: "multiple choice" (in Spanish: `opción múltiple`)
    - Section 4: "answer and discuss" (in Spanish: `responder y debatir`)
- **Section 1: Reading Passage (Lectura)**:
  - Titled "Lectura" in the target language (without "Texto de" or period), paired with right-aligned action hint "read aloud" in the target language.
  - The reading text should always be approximately 400 words in length, divided into logical paragraphs or subsections.
  - Natural left alignment (`text-align: left;`) with automatic hyphenation disabled (`hyphens: none;`) to prevent words from splitting across line ends (e.g., no "plane-" and "ta.").
  - Subtle In-Text Vocabulary Highlighting: The 10 vocabulary words featured in Section 2 are subtly styled when they appear in the reading passage (`.vocab-in-text`, e.g. `background-color: rgba(242, 233, 203, 0.55); padding: 0 2px; border-radius: 2px;`) just enough to notice them as special without disrupting reading flow. Do NOT use underlines or dotted borders, as they make words look too much like clickable links.
  - Do NOT include word count indicators (such as `~400 palabras`) anywhere in section titles, subtitles, or headers.
  - Paragraphs and subsection cards must NOT have vertical border lines on the left (clean unbordered text).
  - Subsection titles (e.g., `La Costa (Región Litoral)`) must use a normal font (`var(--font-body)`, serif) with standard capitalization (`text-transform: none; font-weight: 700;`) so learners can clearly distinguish uppercase and lowercase letters. Numbers must NOT be included in subsection titles.
- **Section 2: Vocabulary (Vocabulario) Drag & Drop & Hint Exercise**:
  - Positioned immediately following Section 1 (the reading text).
  - Titled "Vocabulary" translated into the target language (e.g., `<span class="section-num">2</span> Vocabulario` in Spanish, without "Clave" or period), paired with right-aligned action hint "drag and drop" in the target language.
  - Features the 10 hardest words from the text. Each word must be strictly ONE standard single word in the target language (e.g., "decenas", "calurosa", "nevados", "cálido"), avoiding multi-word phrases or broad international terms like "Biodiversidad".
  - Layout & Interaction:
    - Top: waiting word chips in `.vocab-pool`. Styled identical to completed word pills below (same typewriter font, 13px font size, ink-main color, parchment sheet background, 3px 8px padding, square corners, without green checkmark).
    - Top Pool Balancing: When words are matched and removed, dynamically restructure remaining chips. When 6 or more words remain, divide them evenly across two centered flex rows (`Math.ceil(N/2)` and `Math.floor(N/2)`). When 5 or fewer words remain, place them on a single centered row.
    - Below: active target definition cards in shuffled order (`.vocab-targets`). Cards contain only the definition text, with NO placeholder prompt like "Toca o arrastra aquí...".
    - Pill & Card Styling: All pills (waiting word chips `.vocab-chip` and completed word pills `.vocab-completed-pill`) and target cards must be square-cornered (`border-radius: 0;`).
    - Compact Mobile Layout: Ultra-compact styling (tight gap, ~6px 10px card padding, 13.5px definition font) ensuring all 10 definitions are visible and accessible without cumbersome scrolling.
    - Fully responsive: supports mouse drag, touch drag, and tap-to-select for seamless mobile usability.
    - Equal Popup Padding: In all popups and modals (hint popup modal, wrong-drop state card, and correct-drop dictionary card), padding is uniform on all four sides (top, bottom, left, and right: 18px).
    - Word chip click on top: clicking a waiting chip opens a hint popup displaying the word title with a lookup icon next to it, followed by a warm amber lightbulb SVG icon (`#d97706`) and the hint text in the target language (hint helps without making the answer obvious, no trailing punctuation, no repeating word prefix).
    - Lookup icon: next to the word at the top, a magnifying glass lookup button opens a new tab and searches Google: `give me the definition of the word "<word>" in <language>, and the translation of the word in English, and then three example sentences with that word, for each example, once in <language> and once in English`.
    - Wrong drop panel:
      - Very light red background (`#fdf6f6` with border `#f5cfcf`).
      - Red X SVG icon placed next to the wrong definition (starts with lowercase and ends with no punctuation).
      - Below that: a warm amber lightbulb SVG icon (`#d97706`) next to the hint text (no trailing punctuation, without repeating the word twice).
      - To the right of the word title at the top, a lookup icon.
      - No X close button in the upper right. Text is fully selectable to copy, but clicking the box anywhere (without text selected) closes it and returns the chip to the waiting pool.
    - Correct drop: creates a complete boxed dictionary entry for that word with a very light green background (`#f4faf4` with border `#cce8ce`), green checkmark SVG to the left of the definition text, word, part of speech, lookup icon, and the complete full sentence from the reading text highlighting the word (without ellipsis). Displays elevated in-place on the card and dims the page. Learner can freely select text or double-click words. Single-clicking the card anywhere or clicking outside dismisses it, removing the card and moving the chip to completed words. NO X close button in the upper right.
    - Completed words section: no section title; displays completed words in square-cornered pills, each with a green check SVG icon to its left.
    - Completed Pool Balancing & Centering: The completed words area is always centered horizontally. Completed word pills are distributed equally across balanced rows with at most 3 words per row (e.g., when 10 words are completed, they are distributed across 4 rows as 3, 3, 2, 2; when 6 words, 3 and 3; when 5 words, 3 and 2). Each row uses flexbox with no wrapping, preventing awkward orphan singletons.
    - Clicking any completed word pill pops open its complete dictionary definition card (matching the light green card with green checkmark next to definition and full sentence) in a designated view area above the pills. Clicking the card again or clicking outside closes it (no X button).
    - Double-click word selection: on pop-up and modal cards, single-click dismissal is debounced (~250ms) so that double-clicking to select a word does not dismiss or close the card.
    - Completed vocabulary progress is persisted in `localStorage` and reset with the "Reiniciar respuestas" button.
- **Universal Text Selection & Copy/Paste Support**:
  - Learners must be able to select and copy text anywhere on the page without restriction (reading passage, word chips, definition cards, completed word pills, popup dictionary entries, quiz questions, options, and feedback explanations).
  - Do not apply `user-select: none;` to text-bearing elements.
  - On modal and popup cards, clicking or selecting text inside the card must NEVER accidentally dismiss or close it. Dismissing via click must ignore clicks where text is currently selected (`window.getSelection().toString().trim().length > 0`) or clicks on lookup buttons.
- **Section 3: Comprehension Questions & Neutral Radio-Free Option Styling**:
  - Heading standardized to "Comprehension" in the target language (e.g., `<span class="section-num">3</span> Comprensión` in Spanish), paired with right-aligned action hint "multiple choice" in the target language.
  - Do NOT include generic instructions like "Elige la respuesta correcta para cada pregunta...".
  - NO radio buttons (`<input type="radio">` removed completely).
  - Indented Option Alignment: The options list (`.options-list`) is indented (`padding-left: 28px;`, on mobile: `24px;`) so that the option letters (`A.`, `B.`, `C.`, `D.`) and feedback box align cleanly under the start of the question prompt text above.
  - Options must have NO background fill and NO hover background (`background: transparent;`), with tight vertical spacing between options.
  - Option letters are followed by a period (`A.`, `B.`, `C.`, `D.`) with option text positioned close to the period. When an option is selected, its option letter highlights in bold/accent color (`--stamp-blue`).
  - Contextual Inline Feedback:
    - Display the feedback box directly beneath the actively selected option, keeping its subtle background tint (`--paper-bg`).
    - Inside the feedback box, display a thick green check SVG icon (✓) for correct answers or a thick red X SVG icon (✗) for incorrect answers alongside the explanation text.
    - Do NOT include status text words like "¡Correcto!" or "Incorrecto.", and do NOT prefix explanations with option letters.
    - Keep question cards clean and neutral; do NOT color the entire question card green or red.
- **Section 4: Open Questions Section (Preguntas abiertas)**:
  - Heading standardized to "Open Questions" in the target language (e.g., `<span class="section-num">4</span> Preguntas abiertas` in Spanish, `Offene Fragen` in German, `Questions ouvertes` in French), paired with right-aligned action hint "answer and discuss" in the target language (e.g., `responder y debatir`).
  - Borderless and transparent container (remove dashed or solid outline boxes).
  - No boilerplate introductory instructions.
  - Next to each question, include a warm amber lightbulb SVG icon (`#d97706` stroke, `#fef3c7` fill) linking to Google search in a new tab: `answer this question in three sentences in <Language>, assume you are from <Country/Persona (default Germany)>: "<question>"`.
  - **Non-Breaking Icon Attachment**: The lightbulb icon must NEVER dangle alone on its own line. Always wrap the preceding word, a non-breaking space (`&nbsp;`), and the icon link inside `<span class="question-hint-wrap">word?&nbsp;<a ...>...</a></span>` with `white-space: nowrap;` so that if line-breaking occurs, the word and lightbulb wrap together to the new line.
- **Bottom Actions Bar & Embedded In-Place Reset Confirmation**:
  - Equal upper and lower padding (`padding-top: 20px; padding-bottom: 20px; border-top: 1px solid var(--ink-rule); border-bottom: 1px solid var(--ink-rule);`) so the back link and reset button are equally distant from the horizontal rule lines above and below them on both desktop and mobile.
  - **Embedded In-Place Reset Confirmation UX**: Clicking "Reiniciar respuestas" must never trigger an ugly native browser `confirm()` popup. Instead, clicking the button replaces it in-place in the button bar with an inline confirmation UI with Cancel placed first: (`¿Confirmar reinicio? [Cancelar] [Sí, reiniciar]`) that auto-reverts after 8 seconds or on cancel.
  - Clears all `localStorage` state (both multiple-choice answers and completed vocabulary).
- **Standardized Footers**:
  - Activity pages display only: `See more projects by <a href="https://tanguay.info" target="_blank" rel="noopener noreferrer">Edward</a>` (with "Edward" in plain text, never italics, without "Language Learning Activities" or bullet dot).
  - Main catalog (`index.html`) footer displays: `<a href="creators/index.html">Guía para creadores</a> • See more projects by <a href="https://tanguay.info" target="_blank" rel="noopener noreferrer">Edward</a>` (without arrows).
  - On mobile (`max-width: 680px`), items in the footer stack vertically centered.

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
- **Catalog Cards (`index.html`)**:
  - The language/level supertitle (e.g. `Español B1`) is placed directly above the activity title with tight vertical spacing (`gap: 2px; margin-bottom: 8px;`), styled in the target language's color, forming a unified headline unit.
  - Entire card is clickable (`cursor: pointer;`) to open the activity, with hover showing an intense soft shadow (`0 10px 28px rgba(45, 40, 35, 0.12)`) without border outline changes.
  - No hover effects on the title link (no underline or color change) so the user intuitively feels the entire card is clickable.
  - The "Abrir actividad →" button is omitted from the card.
  - Mobile view (`max-width: 680px`): reduced card padding, slightly smaller description font, and the language/level badge is displayed as an unbordered supertitle above the activity title.
- **Catalog Header (`index.html`)**: On mobile, the main header title ("Language Learning Activities") and subtitle ("Hojas pedagógicas para autoestudio, tándems y profesores") are centered.
- **Catalog Dropdown Filter (`index.html`)**:
  - Form controls (select dropdowns, search input, labels) use the clean standard body serif font (`"Lora", Georgia, serif`), matching the rest of the page. The dropdown includes all 11 standardized languages in the canonical order.
  - Mobile view (`max-width: 680px`): "Idioma:" and "Nivel:" labels are removed, the two dropdowns sit centered side-by-side on a single line filling 100% width (50%/50%), and the search bar extends across 100% full width.
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
