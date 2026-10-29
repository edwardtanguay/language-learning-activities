---
name: create-text-and-multiple-choice
description: Create a self-contained language learning activity with a reading text, vocabulary notes, interactive multiple-choice questions, and tutor/tandem prompts in the 1970s school handout style.
---

# Create Text and Multiple-Choice Activity

This skill creates a self-contained language learning activity page inside `topics/<topic-slug>/index.html` and registers it in the main catalog (`index.html`).

## 1. Gather Required Information

Before creating the activity, check if the user has provided all necessary parameters:
1. **Topic**: The theme or subject matter (e.g., "Regions of Ecuador", "Ordering Tapas in Madrid", "Job Interview in Berlin").
2. **Target Language**: The language being learned (e.g., Spanish, German, French, Japanese).
3. **Regional Dialect / Style (optional but recommended)**: e.g., Latin American Spanish, Peninsular Spanish, Swiss German, Brazilian Portuguese.
4. **Proficiency Level**: Explain levels clearly with everyday terms because some users do not know CEFR codes:
   - **Beginner (A1–A2)**: Simple sentences, core daily vocabulary, present tense, high-frequency structures.
   - **Intermediate (B1–B2)**: Connected paragraphs, past/future/subjunctive tenses, real-world scenarios, nuanced opinions.
   - **Advanced (C1–C2)**: Complex idiomatic expressions, cultural nuances, professional or literary phrasing.
5. **Number of Questions**: Default to 4–6 multiple-choice questions unless specified.

> **Rule**: If any required information (Topic, Target Language, or Level) is missing from the user's prompt, use the `ask_question` tool to ask the user. When asking about the level, always include descriptive labels (Beginner, Intermediate, Advanced) alongside any CEFR letters.

---

## 2. Directory and File Conventions

- Determine a URL-friendly, SEO-friendly kebab-case directory name under `topics/` (e.g., `topics/regions-of-ecuador/`).
- Inside that directory, create a single **self-contained** `index.html`.
- **CRITICAL**: The activity must be **100% self-contained**:
  - All HTML, CSS, and JavaScript must reside within `index.html`.
  - No relative imports of local external CSS or JS files (so the file can be emailed or shared directly and opened offline).
  - Web fonts from Google Fonts or standard system fonts are permitted.
  - If images/audio are needed, use absolute web URLs on the live domain, never relative local files.

---

## 3. Visual Aesthetic: 1970s School Handout

Follow the project design philosophy defined in `AGENTS.md`:
- **Concept**: A clean, nostalgic, mimeograph / typewriter school handout.
- **Tone**: Focused on language learning, clean, authentic, and calm. Not flashy or neon.
- **Palette**:
  - Paper background: warm off-white / parchment (e.g., `#fbf8f1` or `#f7f4ea`).
  - Text & rules: deep ink charcoal / soft black (e.g., `#1f1e1d` or `#2a2825`).
  - Borders & accents: typewriter rules, mimeograph blue/sepia tones (e.g., `#2c4a6f` for mimeograph ink or `#5c4d3c` for warm ink).
- **Standardized Language Color System**:
  Every activity defines `--lang-color` in `:root` matching its target language:
  - English (`en`): `#9333ea`
  - German (`de`): `#7e4402`
  - French (`fr`): `#333388`
  - Spanish (`es`): `#be185d`
  - Italian (`it`): `#194d19`
  - Dutch (`nl`): `#d97706`
  - Polish (`pl`): `#b8b8b8`
  - Russian (`ru`): `#3f3f46`
  - Greek (`el`): `#0d9488`
  - Icelandic (`is`): `#06b6d4`
  - Danish (`da`): `#ff1493`
  The header stamp badge (`.stamp-badge`) displaying `[Language] [Level]` (e.g. `Español B1`) uses `border: 3px solid var(--lang-color); color: var(--lang-color); font-size: 18px; font-weight: 800; transform: rotate(-2deg);` to look like a prominent colored ink stamp. On mobile (`max-width: 680px`), the stamp badge is centered horizontally in the middle (`margin: 4px auto 0 auto; align-self: center;`), and the main title (`.handout-title-group h1`), subtitle (`.handout-subtitle`), and instructions heading (`.instructions-heading`) are also centered.
- **Paper on Desk Aesthetic**:
  - The main container (`.handout-sheet`) has a soft blurred drop-shadow (`box-shadow: 0 12px 38px rgba(45, 40, 35, 0.08), 0 3px 10px rgba(45, 40, 35, 0.04)`) and a delicate warm border (`1px solid #e8e2d5`), giving the look of a sheet of paper on a desk.
- **No Harsh Black Outlines & Borderless Cards**:
  - Do not use dark or black solid borders (which evoke death notices in certain cultures).
  - Glossary boxes, question cards, and clickable option choices must have no borders (`border: none;`), relying on soft parchment background fills (`--paper-bg`), subtle shadows, and tinted feedback states.
- **Typography & Mobile Optimization**:
  - Monospace / Typewriter font stack: `"Courier New", Courier, "Courier Prime", monospace` for headers, instructions, numbers, and buttons.
  - Clean readable serif/sans for long reading passages: `Georgia, "Times New Roman", serif` or clean typewriter.
  - Subsection titles under reading passages use the serif body font with standard capitalization (`text-transform: none; font-weight: 700;`) so learners can distinguish uppercase from lowercase letters.
  - On mobile (`max-width: 680px`), use tight line-heights (`1.15`–`1.25`), reduced letter-spacing (`0` to `-0.2px`), and scaled heading sizes (`21px` for title, `15px` for section titles) so multi-line titles read cohesively and headings fit on one line more often.
- **Title Area & Content Overview**:
  - Unboxed title header (`border: none;`).
  - Contains the activity title (`<h1>`), the prominent tilted stamp badge, and directly beneath them a concise 1–2 sentence description of the content in the target language (italicized serif text, `font-size: 16px; color: var(--ink-muted); margin: 18px 0; line-height: 1.5;` with balanced vertical spacing having as much padding/margin below as above) before the instructions box.
  - Do NOT include generic subtitle slogans, student name/date fill-in lines, or metadata tag lists.
- **Circular Section Numbers & Right-Side Action Hints**:
  - Main sections across the worksheet are designated with clean numbers without periods, placed inside a light gray/warm-parchment circle (`<span class="section-num">1</span>`, `2`, `3`, `4`) — e.g., `<span class="section-num">1</span> Lectura`, `<span class="section-num">2</span> Vocabulario`, `<span class="section-num">3</span> Comprensión`, `<span class="section-num">4</span> Preguntas abiertas`. Circular badge is styled cleanly (~32px diameter, background `#e6e0d2`, dark charcoal number centered). Questions nested inside Section 3 are clearly numbered 1, 2, 3... without ambiguity.
  - On the right side of each section heading line, include an action hint written in small letters with subtle opacity (`.section-action-hint`, e.g. `font-size: 13px; color: var(--ink-muted); opacity: 0.65; font-family: var(--font-typewriter);`) translated into the worksheet's target language:
    - Section 1: "read aloud" (in Spanish: `leer en voz alta`)
    - Section 2: "drag and drop" (in Spanish: `arrastrar y soltar`)
    - Section 3: "multiple choice" (in Spanish: `opción múltiple`)
    - Section 4: "answer and discuss" (in Spanish: `responder y debatir`)
- **No Word Count Indicators**:
  - Do NOT include `~400 palabras` or word count badges anywhere on the worksheet.
- **Top-Alignment for Checkboxes, Radios, and Icons**:
  - When an icon, radio button, or checkbox on the left is paired with text on the right that may wrap into multiple lines, always top-align both (`align-items: flex-start;`). Never center vertically (`align-items: center;`), ensuring the control or icon stays cleanly aligned with the first line of text.
- **Universal Text Selection & Copy/Paste Support**:
  - All text across the worksheet must be freely selectable and copyable by the learner (reading passage, word chips, definition cards, completed word pills, popup dictionary entries, quiz questions, options, and feedback explanations).
  - Never apply `user-select: none;` to text elements.
  - Interactive popup/modal cards (dictionary definitions, wrong-drop hint banners) must never accidentally dismiss or close when a learner clicks or highlights text to copy. Dismissing via click must ignore clicks where text is currently selected (`window.getSelection().toString().trim().length > 0`) or clicks on lookup buttons. Single-click dismissals are debounced (~250ms) so that double-clicking to select a word does not dismiss the card.
  - Text selection on quiz option labels must never toggle radio buttons.
- **Dual Navigation & Embedded In-Place Reset Confirmation**:
  - Include the back link (`← Índice de Actividades`) both at the top utility bar and in the bottom actions bar.
  - Do NOT include bulky score counters (e.g. remove "Score: X / Y"). Include a discrete reset button in the target language (e.g., "↺ Reiniciar respuestas" in Spanish) in the bottom actions bar to clear both multiple-choice and vocabulary states in `localStorage`.
  - **Embedded In-Place Reset Confirmation UX**: Never use a native browser `confirm()` popup. Clicking "Reiniciar respuestas" replaces the button in-place with an inline confirmation UI with Cancel first: (`¿Confirmar reinicio? [Cancelar] [Sí, reiniciar]`) that auto-reverts after 8 seconds or upon clicking Cancel.
  - Both desktop and mobile: set equal upper and lower padding on the bottom actions bar (`padding-top: 20px; padding-bottom: 20px; border-top: 1px solid var(--ink-rule); border-bottom: 1px solid var(--ink-rule);`) so the navigation texts are equally distant from the dividing lines above and below.
  - On mobile screens (`max-width: 680px`), center navigation and reset controls horizontally and vertically within their containers (`.utility-bar { justify-content: center; }` and `.bottom-actions-bar { flex-direction: column; align-items: center; justify-content: center; }`).
- **Standardized Footers**:
  - At the bottom of individual activity worksheets, display only: `See more projects by <a href="https://tanguay.info" target="_blank" rel="noopener noreferrer">Edward</a>` (with "Edward" in plain text, never italics, without "Language Learning Activities" or bullet dot).
  - Main catalog (`index.html`) footer displays: `<a href="creators/index.html">Guía para creadores</a> • See more projects by <a href="https://tanguay.info" target="_blank" rel="noopener noreferrer">Edward</a>` (without arrows).
  - On mobile screens (`max-width: 680px`), footer items stack vertically centered.
- **Responsive Layout**:
  - Desktop & Tablet (Landscape): Generous margins, clean side-by-side or balanced layout.
  - Mobile (Portrait): Single-column stack with comfortable padding, tight line spacing, and touch-friendly controls.

---

## 4. Activity Content Structure

Each activity file should include the following sections:

1. **Top Navigation**:
   - Link back to main activities catalog (`<a href="../../index.html" class="back-link">...</a>`) with a thick arrow (SVG or bold glyph) and clean label without "(Home)".
   - Do NOT include a print button.
2. **Worksheet Header**:
   - Title (`<h1>`), enlarged tilted stamp badge (`[Language] [Level]`), and concise 1–2 sentence content overview in the target language with balanced top and bottom spacing.
3. **Structured Instructions Callout Box**:
   - Outlines the lesson plan concisely in the target language under the heading **INSTRUCCIONES**:
     - **Antes de la clase / Before Class**: No bullet dot in front of the label. Capitalized label (`Antes de la clase:`) followed by an all-lowercase description (e.g., `estudiante y profesor se familiarizan con el texto lo que deseen`, without trailing period).
     - **En clase / In Class**: No bullet dot in front of the label. Capitalized label (`En clase:`) followed by an all-lowercase comma-separated list: `(1) lectura en voz alta con corrección, (2) ejercicios juntos, (3) preguntas de discusión juntos`.
     - Keep phrasing concise, inline, and readable in seconds.
4. **Section 1: Reading Passage (Lectura)**:
   - Titled "Lectura" in the target language without period (e.g., `<span class="section-num">1</span> Lectura`), with right-aligned action hint "read aloud" in the target language.
   - Authentic, engaging reading passage written at the designated proficiency level in the target language.
   - Text length must always be approximately 400 words (do NOT display the word count anywhere).
   - Natural left alignment (`text-align: left;`) with automatic hyphenation disabled (`hyphens: none;`) to prevent words from splitting across line ends (e.g., no "plane-" and "ta.").
   - Subtle In-Text Vocabulary Highlighting: The 10 vocabulary words featured in Section 2 are subtly styled when they appear in the reading passage (`.vocab-in-text`, e.g. `background-color: rgba(242, 233, 203, 0.55); padding: 0 2px; border-radius: 2px;`) just enough to notice them as special without disrupting reading flow. Do NOT use underlines or dotted borders, as they make words look too much like clickable links.
   - Paragraphs and subsection cards must NOT have vertical lines on the left (clean unbordered text).
   - Divided into logical paragraphs or subsections. Subsection titles use the serif body font with standard capitalization (`text-transform: none; font-weight: 700;`) without numbers (e.g., `<h3>La Costa (Región Litoral)</h3>`).
5. **Section 2: Vocabulary (Vocabulario) Drag & Drop & Hint Exercise**:
   - Positioned immediately following Section 1 (the reading text).
   - Title standardized to "Vocabulary" translated into the target language without period (e.g., `<span class="section-num">2</span> Vocabulario`), with right-aligned action hint "drag and drop" in the target language.
   - Features the 10 hardest words from the text. Each word must be strictly ONE standard single word in the target language (e.g., "decenas", "calurosa", "nevados", "cálido"), avoiding multi-word phrases or broad international terms like "Biodiversidad".
   - Top area: flex pool of waiting word chips (`.vocab-pool`). Styled identical to completed word pills below (same typewriter font, 13px font size, ink-main color, parchment sheet background, 3px 8px padding, square corners, without green checkmark).
   - Waiting Pool Dynamic Restructuring: When words are placed and removed, dynamically restructure remaining chips. When 6 or more words remain, divide evenly across two centered rows (`Math.ceil(N/2)` and `Math.floor(N/2)`). When 5 or fewer words remain, place on a single centered row.
   - Middle area: active target definition cards in shuffled order (`.vocab-targets`). Cards show definition only with NO placeholder prompt ("Toca o arrastra aquí...").
   - Square Corners & Narrow Padding: All pills (waiting chips `.vocab-chip` and completed pills `.vocab-completed-pill`) and definition cards have square corners (`border-radius: 0;`).
   - Compact Mobile View: Ultra-compact single column layout on mobile screens (~6px 10px padding, 13.5px font size, 6px gap) so all 10 definitions fit on screen without extensive scrolling.
   - Supports mouse drag-and-drop, touch drag, and tap-to-select for smooth mobile support.
   - Equal Popup Padding: In all popups and modals (hint popup modal, wrong-drop state card, and correct-drop dictionary card), padding is uniform on all four sides (top, bottom, left, and right: 18px).
   - Word chip click on top: clicking a waiting chip opens a hint popup displaying the word title with a lookup icon next to it, followed by a warm amber lightbulb SVG icon (`#d97706`) and the hint text in the target language (hint helps without making the answer obvious, no trailing punctuation, no repeating word prefix).
   - Lookup icon: next to the word at the top, a magnifying glass lookup button opens a new tab and searches Google: `give me the definition of the word "<word>" in <language>, and the translation of the word in English, and then three example sentences with that word, for each example, once in <language> and once in English`.
   - Wrong drop panel:
     - Very light red background (`#fdf6f6` with border `#f5cfcf`).
     - Red X SVG icon placed next to the wrong definition (starts with lowercase and ends with no punctuation).
     - Below that: a warm amber lightbulb SVG icon (`#d97706`) next to the hint text (no trailing punctuation, without repeating the word twice).
     - To the right of the word title at the top, a lookup icon.
     - No X close button in the upper right. Text is fully selectable to copy, but clicking the box anywhere (without text selected) closes it and returns the chip to the waiting pool.
   - Correct drop: creates a complete boxed dictionary entry with a very light green background (`#f4faf4` with border `#cce8ce`), green checkmark SVG next to the definition, word, part of speech, lookup icon, and full complete sentence from the reading text without ellipsis (`...`). Elevated in-place on the definition card with page dimmed. Clicking anywhere on the card or outside dismisses it (no X button), removing the card and moving the chip to completed words.
   - Completed words section: no title; displays completed words in square-cornered pills, each with a green check SVG icon to its left.
   - Completed Pool Balancing & Centering: The completed words area is always centered horizontally. Completed word pills are distributed equally across balanced rows with at most 3 words per row (e.g., when 10 words are completed, they are distributed across 4 rows as 3, 3, 2, 2; when 6 words, 3 and 3; when 5 words, 3 and 2). Each row uses flexbox with no wrapping, preventing awkward orphan singletons.
   - Clicking any completed word pill pops open its complete dictionary definition card in a designated view area above the pills. Clicking the card again or clicking outside closes it (no X button).
   - Double-click word selection: on pop-up and modal cards, single-click dismissal is debounced (~250ms) so that double-clicking to select a word does not dismiss or close the card.
   - Persists completed vocabulary in `localStorage` and resets on "Reiniciar respuestas".
6. **Section 3: Interactive Comprehension Questions**:
   - Heading standardized to "Comprehension" in the target language without period (e.g., `<span class="section-num">3</span> Comprensión`), with right-aligned action hint "multiple choice" in the target language.
   - 4–6 questions (numbered 1, 2, 3...) testing reading comprehension, grammar in context, and vocabulary.
   - Large plain question numbers (no background boxes).
   - Borderless question cards.
   - Do NOT include generic instructions like "Elige la respuesta correcta para cada pregunta...".
   - NO radio buttons (`<input type="radio">` removed completely).
   - Indented Option Alignment: The options list (`.options-list`) is indented (`padding-left: 28px;`, on mobile: `24px;`) so that option letters (`A.`, `B.`, `C.`, `D.`) and feedback align directly under the start of the question prompt text above.
   - Options have NO background fill and NO hover background (`background: transparent;`), with tight vertical spacing between options.
   - Option letters are followed by a period (`A.`, `B.`, `C.`, `D.`) with option text positioned close to the period. When an option is selected, its option letter highlights in bold/accent color (`--stamp-blue`).
   - Contextual Inline Feedback:
     - Selecting an option immediately displays its feedback box directly beneath that selected option (inside the option wrapper), rather than at the bottom of the question card.
     - Only show feedback beneath the actively selected option (switching to another option moves the feedback).
     - Display a thick green check SVG icon (✓) for correct answers or a thick red X SVG icon (✗) for incorrect answers alongside the explanation text.
     - Do NOT include status text words like "¡Correcto!" or "Incorrecto.", and do NOT prefix explanations with option letters.
     - Provide a distinct explanation text for each answer choice (both right and wrong), explaining specifically why that option is correct or incorrect.
     - Allow the user to keep selecting other options even after answering, so they can explore all options and learn why alternatives were incorrect.
     - Keep question cards clean and neutral; do NOT color the entire question card green or red.
   - Progress Persistence:
     - User selections are saved in `localStorage` with a unique key (e.g., `activity_<topic-slug>`).
7. **Section 4: Open Questions Section (Preguntas abiertas)**:
   - Section heading standardized to "Open Questions" translated into the target language without period (e.g., `<span class="section-num">4</span> Preguntas abiertas` in Spanish, `Offene Fragen` in German, `Questions ouvertes` in French), with right-aligned action hint "answer and discuss" in the target language (e.g. `responder y debatir`).
   - Borderless and transparent container (no dashed or solid outline boxes).
   - Do NOT include boilerplate introductory instructions.
   - 4–5 open-ended conversation questions in the target language designed for practice with tutors, exchange partners, or self-reflection.
   - Next to each discussion question, include a warm amber lightbulb SVG icon (`#d97706` stroke, `#fef3c7` fill) linking to Google search in a new tab: `answer this question in three sentences in <Language>, assume you are from <Country/Persona (default Germany)>: "<question>"`.
   - **Non-Breaking Icon Attachment**: The lightbulb icon must NEVER dangle alone on its own line. Always wrap the preceding word, a non-breaking space (`&nbsp;`), and the icon link inside `<span class="question-hint-wrap">word?&nbsp;<a ...>...</a></span>` with `white-space: nowrap;` so that if line-breaking occurs, the word and lightbulb wrap together to the new line.
8. **Bottom Actions & Navigation Bar**:
   - Matching back link to catalog (`← Índice de Actividades`).
   - **Embedded In-Place Reset Confirmation UX**: Clicking "Reiniciar respuestas" must never trigger an ugly native browser `confirm()` popup. Instead, clicking the button replaces it in-place in the button bar with an inline confirmation UI with Cancel first: (`¿Confirmar reinicio? [Cancelar] [Sí, reiniciar]`) that auto-reverts after 8 seconds or on cancel.
   - Clears both multiple-choice answers and completed vocabulary from `localStorage`.
   - Equal upper and lower padding (`padding-top: 20px; padding-bottom: 20px; border-top: 1px solid var(--ink-rule); border-bottom: 1px solid var(--ink-rule);`) so controls are equally distant from dividing lines above and below on both desktop and mobile.
   - On mobile screens, both controls are centered horizontally and vertically.
9. **Standardized Footer**:
   - Individual activity worksheets display: `See more projects by <a href="https://tanguay.info" target="_blank" rel="noopener noreferrer">Edward</a>` (with "Edward" in plain text, never italics, without "Language Learning Activities" or bullet dot).
   - On mobile screens (`max-width: 680px`), centered.

---

## 5. Register in Main Catalog (`index.html`)

After creating `topics/<topic-slug>/index.html`:
1. Read the root `index.html`.
2. Add the new activity to the catalog list with:
   - `<article class="activity-card" data-lang="<code> <language>" data-level="<level>" data-topic="..." onclick="openCard('topics/<topic-slug>/index.html', event)">`
   - **Desktop**: Language and level displayed as a boxed stamp badge on the right side of the activity title row (`display: flex; justify-content: space-between; align-items: flex-start;`): `<span class="badge-lang lang-<code>">Language Level</span>` (e.g., `<span class="badge-lang lang-es">Español B1</span>`).
   - **Mobile view (`max-width: 680px`)**: Language and level displayed as an unbordered supertitle directly above the activity title with tight vertical spacing (`gap: 1px; margin-bottom: 8px; line-height: 1.1;`).
   - Card has `cursor: pointer;` and intense hover shadow without border outline changes.
   - Title link has `pointer-events: none;` and no hover underline or color change so learners intuitively feel the entire card panel is clickable.
   - The "Abrir actividad →" button is omitted from the card.
   - Mobile view (`max-width: 680px`): reduced card padding, slightly smaller description font.
   - Catalog dropdown filter controls use standard body serif font (`"Lora", Georgia, serif`). On mobile (`max-width: 680px`), "Idioma:" and "Nivel:" labels are removed, dropdowns sit centered together on one line (50%/50%), and the search bar extends across full width.
   - Catalog footer displays: `<a href="creators/index.html">Guía para creadores</a> • See more projects by <a href="https://tanguay.info" target="_blank" rel="noopener noreferrer">Edward</a>` (without arrows).
3. Maintain tidy chronological or categorical sorting.
