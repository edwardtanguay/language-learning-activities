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
- **Roll-Out / Roll-Up Instructions Callout**:
  - Initial state displays as a clean, full-width parchment highlight bar (`var(--highlight)`) with **INSTRUCCIONES** centered in bold typewriter uppercase (`.instructions-heading`).
  - Clicking anywhere on the bar smoothly "rolls out" the instructions downwards (`grid-template-rows: 0fr -> 1fr`, CSS transition) to reveal the workflow lines:
    - **Antes de la clase / Before Class**: No bullet dot in front of the label. The label is capitalized (`Antes de la clase:`) followed by an all-lowercase description (e.g., `estudiante y profesor se familiarizan con el texto lo que deseen`, without trailing period).
    - **En clase / In Class**: No bullet dot in front of the label. The label is capitalized (`En clase:`) followed by an all-lowercase comma-separated list: `(1) lectura en voz alta con corrección, (2) ejercicios juntos, (3) preguntas de discusión juntos`.
    - Keep phrasing concise, inline, and readable in seconds.
  - Clicking anywhere on the instructions box rolls it back up into the compact initial bar with centered **INSTRUCCIONES**. Preserves universal text selection so selecting text to copy does not collapse the box.
- **Header, Top Utility Bar, Jump Links & Title on Mobile**:
  - **Worksheet Header & Stamp Alignment**: Regardless of title length, always anchor the language/level stamp badge (`.stamp-badge`) on the right (`.header-top { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: nowrap; gap: 20px; }`, `.stamp-badge { flex-shrink: 0; }`). If the title is long, break the title onto multiple lines (`.handout-title-group { flex: 1; min-width: 0; }`) with tight line spacing (`.handout-title-group h1 { line-height: 1.1; }`) so it holds together cohesively as one unified title without ever pushing the stamp badge down.
  - The top utility bar has generous top padding (desktop: `padding-top: 14px;`, mobile: `padding: 24px 0 14px 0;`) so "Índice de Actividades" has comfortable space from the top of the page.
  - On mobile (`max-width: 680px`), `body` has `padding: 0 8px 12px 8px;` and `.utility-bar` has `justify-content: center; align-items: center; margin: 0 auto; padding: 24px 0 14px 0;` with `.back-link { line-height: 1; display: inline-flex; align-items: center; }` so "Índice de Actividades" is centered both horizontally and vertically in the space above the handout sheet.
  - On mobile (`max-width: 680px`), the stamp badge (`.stamp-badge`) is centered horizontally in the middle (`margin: 4px auto 0 auto; align-self: center;`), and the main title (`.handout-title-group h1`) and subtitle (`.handout-subtitle`) are centered.
  - **Centered Jump Links (1, 2, 3, 4)**: Positioned directly under the subtitle and before the Instructions toggle, a centered navigation bar (`.jump-nav`) displays four round numbers `1`, `2`, `3`, `4` inside circular badges (~32px diameter, background `#e6e0d2`, dark charcoal number centered) that smoothly scroll to `#seccion-1`, `#seccion-2`, `#seccion-3`, and `#seccion-4`.
  - The instructions callout heading (`.instructions-heading`, e.g. **INSTRUCCIONES**) is centered on both desktop and mobile when expanded.
- **Mobile Page Whoosh Transitions (`max-width: 680px`)**:
  - When tapping an activity card in the catalog (`index.html`), the catalog sheet smoothly whooshes out to the left (`0 -> -105vw`) **simultaneously** as the activity page whooshes in from the right (`105vw -> 0`) at 100% full opacity (never fading to `opacity: 0`), while the dotted desk background stays stationary underneath.
  - When tapping "Índice de Actividades" (back link) on an activity page, the activity page smoothly whooshes out to the right (`0 -> 105vw`) **simultaneously** as the catalog sheet whooshes in from the left (`-105vw -> 0`) at 100% full opacity across the stationary dotted desk background.
  - Coordinated via `sessionStorage` (`nav-direction: forward/backward`, plus outgoing page snapshot in a fixed Shadow DOM overlay on the destination page) with a 0.3s cubic-bezier curve, cleaning up animation classes on completion.
  - Desktop retains standard instant navigation without sliding transitions.
- **Section Numbering, Title Link to Top & Right-Side Action Hints**:
  - Main sections across the worksheet are designated with clean numbers (1, 2, 3, 4) without periods, placed inside a light gray/warm-parchment circle (`<span class="section-num">1</span>`, `2`, `3`, `4`) — e.g., `<span class="section-num">1</span> Lectura`, `<span class="section-num">2</span> Vocabulario`, `<span class="section-num">3</span> Comprensión`, `<span class="section-num">4</span> <span>Preguntas<span class="hide-mobile"> abiertas</span></span>`. Circular badge is styled cleanly (~32px diameter, background `#e6e0d2`, dark charcoal number centered). Questions nested inside Section 3 are clearly numbered 1, 2, 3... without ambiguity.
  - **Title Link Back to Top**: The section title and number are wrapped in `<a href="#top" class="section-title-link" onclick="scrollToTop(event)" title="Volver al inicio">`, allowing learners to click any section header to smoothly scroll all the way back to the very top (pixel 0) of the page so the top utility bar and "Índice de Actividades" link remain fully visible, without adding `#top` to the URL bar (`text-decoration: none; color: inherit; cursor: pointer;`).
  - On the right side of each section heading line, include an action hint written in small letters with subtle opacity (`.section-action-hint`, e.g. `font-size: 13px; color: var(--ink-muted); opacity: 0.65; font-family: var(--font-typewriter);`) translated into the worksheet's target language:
    - Section 1: "read aloud" (in Spanish: `leer en voz alta`)
    - Section 2: "drag and drop" (in Spanish: `arrastrar y soltar`)
    - Section 3: "multiple choice" (in Spanish: `opción múltiple`)
    - Section 4: "answer and discuss" (in Spanish: `responder y debatir`)
  - On mobile (`max-width: 680px`), `.section-title` uses `flex-wrap: nowrap;` and Section 4 hides the word "abiertas" (`<span class="hide-mobile"> abiertas</span>`, or equivalent modifier in other languages) so it displays just "Preguntas" and keeps the right-side action hint (`responder y debatir`) on the same single line.
- **Section 1: Reading Passage (Lectura)**:
  - Titled "Lectura" in the target language (without "Texto de" or period), paired with right-aligned action hint "read aloud" in the target language.
  - The reading text should always be approximately 400 words in length, divided into logical paragraphs or subsections.
  - Natural left alignment (`text-align: left;`) with automatic hyphenation disabled (`hyphens: none;`) to prevent words from splitting across line ends (e.g., no "plane-" and "ta.").
  - Subtle In-Text Vocabulary Highlighting: The 10 vocabulary words featured in Section 2 are subtly styled when they appear in the reading passage (`.vocab-in-text`, e.g. `background-color: rgba(242, 233, 203, 0.55); padding: 0 2px; border-radius: 2px; cursor: pointer;`) just enough to notice them as special without disrupting reading flow. Do NOT use underlines or dotted borders, as they make words look too much like clickable links. Clicking any highlighted vocabulary word in the text opens the hint modal (showing the word, Google lookup icon, and hint text), matching the popup that opens when clicking a waiting word chip.
  - Do NOT include word count indicators (such as `~400 palabras`) anywhere in section titles, subtitles, or headers.
  - Paragraphs and subsection cards must NOT have vertical border lines on the left (clean unbordered text).
  - Subsection titles (e.g., `La Costa (Región Litoral)`) must use a normal font (`var(--font-body)`, serif) with standard capitalization (`text-transform: none; font-weight: 700;`) so learners can clearly distinguish uppercase and lowercase letters. Numbers must NOT be included in subsection titles.
- **Section 2: Vocabulary (Vocabulario) Drag & Drop & Hint Exercise**:
  - Positioned immediately following Section 1 (the reading text).
  - Titled "Vocabulary" translated into the target language (e.g., `<span class="section-num">2</span> Vocabulario` in Spanish, without "Clave" or period), paired with right-aligned action hint "drag and drop" in the target language.
  - Features the 10 hardest words from the text.
  - **No English Cognates**: Each of the 10 vocabulary words must be strictly ONE standard single word in the target language and MUST NOT be an obvious cognate or look obviously similar to an English word. For example, do NOT pick words like `esmeraldas` (obviously "emeralds"), `ritmos` (too close to "rhythm"), `coloridos` ("colorful"), `emblemático` ("emblematic"), `imponente` ("imposing"), `islotes` ("islets"), or `biodiversidad` ("biodiversity"). Instead, pick genuine non-cognate words whose meaning is not obvious to an English speaker, such as `laderas` ("slopes"), `cosecha` ("harvest"), `llanuras` ("plains"), `faldas` ("foothills"), `mariscos` ("seafood"), `caudalosos` ("high-volume/mighty"), `maduros` ("ripe"), `dorada` ("golden"), `acogedora` ("welcoming"), or `decenas` ("dozens").
  - Layout & Interaction:
    - Top: waiting word chips in `.vocab-pool`. Styled identical to completed word pills below (same typewriter font, 13px font size, ink-main color, parchment sheet background, 3px 8px padding, square corners, without green checkmark).
    - Top & Completed Pool Row Balancing: Both the top waiting words pool (`.vocab-pool`) and the bottom completed words pool (`.vocab-completed-pool`) must distribute buttons into centered non-wrapping rows (`flex-wrap: nowrap;`) with as equal a number of buttons per row as possible (`Math.floor(total / numRows)` and `total % numRows`, so row counts differ by at most 1). Dynamically increase `numRows` whenever any row's `scrollWidth` exceeds the container's `clientWidth` so buttons never wrap into uneven orphan lines (such as `4, 1, 4, 1` on mobile, instead rendering balanced rows like `4, 3, 3` or `3, 3, 2, 2`). Re-evaluate on font load and window resize.
    - Below: active target definition cards in shuffled order (`.vocab-targets`). Cards contain only the definition text, with NO placeholder prompt like "Toca o arrastra aquí...".
    - Pill & Card Styling: All pills (waiting word chips `.vocab-chip` and completed word pills `.vocab-completed-pill`) and target cards must be square-cornered (`border-radius: 0;`).
    - Compact Mobile Layout: Ultra-compact styling (tight gap, ~6px 10px card padding, 12.5px definition font) ensuring all 10 definitions are visible and accessible without cumbersome scrolling.
    - Fully responsive: supports mouse drag, touch drag, and tap-to-select for seamless mobile usability.
    - Word Dragging & Active Drop Targets:
      - While a word is being dragged (both desktop and mobile), the word chip is visually hidden from the waiting pool (`opacity: 0; visibility: hidden;`) without collapsing other chips, giving clear feedback that it has been picked up.
      - When a dragged word is dropped onto a definition card and the modal opens (correct or wrong), the word MUST remain hidden in its slot in the top waiting pool (`opacity: 0; visibility: hidden;`)—it must NEVER pop back into the top group upon drop. If the match was **correct**, the word never returns to the top pool (when the green modal is clicked away, the top rows re-balance without it and the word moves to the completed pool below). Only if the match was **wrong** and **after** clicking the red modal away does the word return to the top waiting pool (or immediately if dropped outside any definition card).
      - On desktop mouse drag, a custom floating word avatar (`.vocab-drag-avatar`) smoothly follows the cursor so the dragged word is always visible.
      - While dragging, definition target cards are given an active selectable appearance with a subtle clockwise-moving dashed outline ("marching ants" dots sliding around the border edge) while retaining their neutral background without abrupt background color flashes, giving a clear sense that time is passing until the user drops the word.
      - **Mobile 2x Floating Avatar**: During touch drag on mobile screens, a floating clone avatar (`.vocab-touch-avatar`) is displayed 2x larger than standard text, elevated and offset above the learner's finger (`transform: translate(-50%, -100%);`) so the finger never obscures the dragged word.
    - Equal Popup Padding: In all popups and modals (hint popup modal, wrong-drop state card, and correct-drop dictionary card), padding is uniform on all four sides (top, bottom, left, and right: 18px).
    - Word chip click on top: clicking a waiting chip opens a hint popup displaying the word title with a lookup icon next to it, followed by a warm amber lightbulb SVG icon (`#d97706`) and the hint text in the target language (hint helps without making the answer obvious, no trailing punctuation, no repeating word prefix).
    - **Instant Hint Modal Dismissal**: Clicking anywhere on the hint modal or its overlay immediately closes it without delay (no 250ms debounce pause).
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
    - **Instant Popup Dismissal**: On dictionary, correct-drop, and wrong-drop pop-up cards, single-click dismissal is immediate (0ms delay, no 250ms debounce pause), matching the hint modal. If the learner has highlighted/selected text to copy, clicking that selection does not dismiss the card.
    - Clean completion: when all vocabulary words have been matched, do not display any completion message (such as "¡Todas las palabras han sido emparejadas con éxito!"); the top waiting words pool area collapses cleanly (`display: none;`) without leaving awkward empty space above the completed words.
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
  - Option letters are followed by a period (`A.`, `B.`, `C.`, `D.`) with option text positioned close to the period. When an option is selected, its option letter highlights in bold/accent color (`--stamp-blue`). Clicking an already-selected option again deselects it and closes its feedback box.
  - Contextual Inline Feedback:
    - Display the feedback box directly beneath the actively selected option, keeping its subtle background tint (`--paper-bg`).
    - Inside the feedback box, display a thick green check SVG icon (✓) for correct answers or a thick red X SVG icon (✗) for incorrect answers alongside the explanation text.
    - Do NOT include status text words like "¡Correcto!" or "Incorrecto.", and do NOT prefix explanations with option letters.
    - Keep question cards clean and neutral; do NOT color the entire question card green or red.
- **Section 4: Open Questions Section (Preguntas abiertas)**:
  - Heading standardized to "Open Questions" in the target language on desktop (e.g., `<span class="section-num">4</span> <span>Preguntas<span class="hide-mobile"> abiertas</span></span>` in Spanish, `<span><span class="hide-mobile">Offene </span>Fragen</span>` in German, `<span>Questions<span class="hide-mobile"> ouvertes</span></span>` in French), paired with right-aligned action hint "answer and discuss" in the target language (e.g., `responder y debatir`). On mobile (`max-width: 680px`), `.hide-mobile` is hidden (`display: none;`) so Section 4 displays just "Preguntas" (or equivalent single word) and "responder y debatir" stays on the same line.
  - Borderless and transparent container (remove dashed or solid outline boxes).
  - No boilerplate introductory instructions.
  - Next to each question, include a warm amber lightbulb SVG icon (`#d97706` stroke, `#fef3c7` fill) linking to Google search in a new tab: `answer this question in three sentences in <Language>, assume you are from <Country/Persona (default Germany)>: "<question>"`.
  - **Non-Breaking Icon Attachment**: The lightbulb icon must NEVER dangle alone on its own line. Always wrap the preceding word, a non-breaking space (`&nbsp;`), and the icon link inside `<span class="question-hint-wrap">word?&nbsp;<a ...>...</a></span>` with `white-space: nowrap;` so that if line-breaking occurs, the word and lightbulb wrap together to the new line.
- **Bottom Actions Bar & Embedded In-Place Reset Confirmation**:
  - The reset container is placed on the left and the back link ("Índice de Actividades") is placed on the right (stacked vertically with reset first on mobile).
  - Equal upper and lower padding (`padding-top: 20px; padding-bottom: 20px; border-top: 1px solid var(--ink-rule); border-bottom: 1px solid var(--ink-rule);`) and zero vertical button padding on mobile (`.bottom-actions-bar .reset-answers-btn { padding: 0 10px; }`, `.back-link { line-height: 1; }`) so the back link ("Índice de Actividades") and reset button are equally distant from the horizontal rule lines above and below them on both desktop and mobile.
  - **Embedded In-Place Reset Confirmation UX**: Clicking "Reiniciar respuestas" must never trigger an ugly native browser `confirm()` popup. Instead, clicking the button replaces it in-place in the button bar with an inline confirmation UI with Cancel placed first: (`¿Confirmar reinicio? [Cancelar] [Sí, reiniciar]`) that auto-reverts after 8 seconds or on cancel. Both "Cancelar" and "Sí, reiniciar" buttons feature comfortable top padding inside the buttons (`padding: 6px 10px 4px 10px;`) for optimal visual balance.
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
  - **Desktop**: The language/level badge (e.g. `Español B1`) is displayed as a boxed stamp badge on the right side of the activity title row (`display: flex; justify-content: space-between; align-items: flex-start;`), styled with a square-cornered border in the target language's color, Courier Prime font, and subtle background tint (`rgba(..., 0.08)`).
  - **Mobile view (`max-width: 680px`)**: The language/level badge is displayed as an unbordered supertitle placed directly above the activity title with tight vertical spacing (`gap: 1px; margin-bottom: 4px; line-height: 1.1;`), styled in the target language's color, forming a unified headline unit.
  - Entire card is clickable (`cursor: pointer;`) to open the activity, with hover showing an intense soft shadow (`0 10px 28px rgba(45, 40, 35, 0.12)`) without border outline changes.
  - Title link has `pointer-events: none;` and no hover effects (no underline or color change) so the user intuitively feels the entire card panel is clickable.
  - Activity title uses tight line height (`line-height: 1.05;`) on both desktop and mobile so multi-line titles hold together cohesively as a single unit.
  - The "Abrir actividad →" button is omitted from the card.
- **Catalog Header (`index.html`)**: On mobile, the main header title ("Language Learning Activities") and subtitle ("Hojas pedagógicas para autoestudio, tándems y profesores") are centered. The subtitle uses `text-wrap: balance; max-width: 270px; margin-left: auto; margin-right: auto;` and non-breaking spaces (`tándems&nbsp;y&nbsp;profesores`) so it breaks evenly near the middle and never leaves a single word alone on the second line.
- **Catalog Dropdown Filter & Search (`index.html`)**:
  - Form controls (select dropdowns, search input, labels) use the clean standard body serif font (`"Lora", Georgia, serif`), matching the rest of the page. The dropdown includes all 11 standardized languages in the canonical order.
  - Search box clear ("X") button: When there is text inside `#search-input`, display an "X" button (`.search-clear-btn`) on the far right inside the search box that clears the input, re-filters the catalog, and focuses the input.
  - Mobile view (`max-width: 680px`): "Idioma:" and "Nivel:" labels are removed, the two dropdowns sit centered side-by-side on a single line filling 100% width (50%/50%) with a slightly smaller font (`font-size: 12.5px; padding: 5px 4px;`) so full labels like "Todos los idiomas" fit completely on mobile screens, and the search bar extends across 100% full width.
- **Activity Pages (`topics/<slug>/index.html`)**: The header stamp badge (`.stamp-badge`) and language metadata tags use the designated language color (e.g., `#be185d` for Spanish) to resemble an authentic colored ink stamp, while preserving the calm mimeograph ink aesthetic for the rest of the worksheet.

## Pedagogical Guidelines

- **Proficiency & Regional Style**: Tailor vocabulary, grammar, and cultural context to the learner's specified CEFR level (A1–C2) and target dialect (e.g., Latin American Spanish).
- **Comprehension Checks**: Test reading comprehension and grammar in context with immediate feedback and concise explanations.
- **Discussion & Tutor Prompts**:
  - Use open-ended "how" and "why" prompts that encourage deep language production.
  - Avoid simple yes/no or one-word answers.
  - Prompt learners to explain reasons, give examples, and describe scenarios in detail.

## Agent Execution Rules

- **Use `/grill-me` by Default When Running Skills**: Whenever any skill in `.agents/skills/` runs, always begin with a `/grill-me` style interactive interview (asking one question at a time via the `ask_question` tool, with a `(Recommended)` option placed first) to clarify any missing parameters, subtopics/angles, regional dialect, or persona before generating the activity.
- **No Browser Testing**: Do not launch browser subagents or open browser tabs to verify activities. Users test them manually.
- **Follow Skill Definitions**: Follow the relevant skill file in `.agents/skills/` for layout, structure, and metadata standards.
