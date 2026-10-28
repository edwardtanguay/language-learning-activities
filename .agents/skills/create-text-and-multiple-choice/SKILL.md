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
  The header stamp badge (`.stamp-badge`) displaying `[Language] [Level]` (e.g. `Español B1`) uses `border: 3px solid var(--lang-color); color: var(--lang-color); font-size: 18px; font-weight: 800; transform: rotate(-2deg);` to look like a prominent colored ink stamp.
- **Paper on Desk Aesthetic**:
  - The main container (`.handout-sheet`) has a soft blurred drop-shadow (`box-shadow: 0 12px 38px rgba(45, 40, 35, 0.08), 0 3px 10px rgba(45, 40, 35, 0.04)`) and a delicate warm border (`1px solid #e8e2d5`), giving the look of a sheet of paper on a desk.
- **No Harsh Black Outlines & Borderless Cards**:
  - Do not use dark or black solid borders (which evoke death notices in certain cultures).
  - Glossary boxes, question cards, and clickable option choices must have no borders (`border: none;`), relying on soft parchment background fills (`--paper-bg`), subtle shadows, and tinted feedback states.
- **Typography & Mobile Optimization**:
  - Monospace / Typewriter font stack: `"Courier New", Courier, "Courier Prime", monospace` for headers, instructions, numbers, and buttons.
  - Clean readable serif/sans for long reading passages: `Georgia, "Times New Roman", serif` or clean typewriter.
  - On mobile (`max-width: 680px`), use tight line-heights (`1.15`–`1.25`), reduced letter-spacing (`0` to `-0.2px`), and scaled heading sizes (`21px` for title, `15px` for section titles) so multi-line titles read cohesively and headings fit on one line more often.
- **Title Area & Content Overview**:
  - Unboxed title header (`border: none;`).
  - Contains the activity title (`<h1>`), the prominent tilted stamp badge, and directly beneath them a concise 1–2 sentence description of the content in the target language (italicized serif text, `font-size: 16px; color: var(--ink-muted); margin: 18px 0; line-height: 1.5;` with balanced vertical spacing having as much padding/margin below as above) before the instructions box.
  - Do NOT include generic subtitle slogans, student name/date fill-in lines, or metadata tag lists.
- **Plain Large Section Letters and Numbers (No Dark Inverted Boxes)**:
  - Section letters followed by a period inside the section number span (`<span class="section-num">A.</span>`, `B.`, `C.`, `D.`) and quiz question numbers (1, 2, 3...) must be rendered as plain large text in the text color (`--ink-main`), never white text inside black/dark boxes.
- **No Word Count Indicators**:
  - Do NOT include `~400 palabras` or word count badges anywhere on the worksheet.
- **Top-Alignment for Checkboxes, Radios, and Icons**:
  - When an icon, radio button, or checkbox on the left is paired with text on the right that may wrap into multiple lines, always top-align both (`align-items: flex-start;`). Never center vertically (`align-items: center;`), ensuring the control or icon stays cleanly aligned with the first line of text.
- **Dual Navigation & Discrete Reset**:
  - Include the back link (`← Índice de Actividades`) both at the top utility bar and in the bottom actions bar.
  - Do NOT include bulky score counters (e.g. remove "Score: X / Y"). Include a discrete reset button in the target language (e.g., "↺ Reiniciar respuestas" in Spanish) in the bottom actions bar to clear both multiple-choice and vocabulary states in `localStorage`.
  - Both desktop and mobile: set equal upper and lower padding on the bottom actions bar (`padding-top: 20px; padding-bottom: 20px; border-top: 1px solid var(--ink-rule); border-bottom: 1px solid var(--ink-rule);`) so the navigation texts are equally distant from the dividing lines above and below.
  - On mobile screens (`max-width: 680px`), center navigation and reset controls horizontally and vertically within their containers (`.utility-bar { justify-content: center; }` and `.bottom-actions-bar { flex-direction: column; align-items: center; justify-content: center; }`).
- **Standardized Footer**:
  - At the very bottom of the worksheet: `Language Learning Activities • See more projects by <a href="https://tanguay.info" target="_blank" rel="noopener noreferrer"><em>Edward</em></a>`
  - On mobile screens, stack and horizontally center the brand and author links with the bullet dot hidden (`display: none;`).
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
     - **• Before Class / Antes de la clase**: Student and teacher familiarize themselves with the text as much as they want.
     - **• In Class / En clase**: (1) Reading aloud with correction • (2) Exercises together • (3) Discussion questions (teacher answers first).
     - Keep phrasing concise, bulleted, and inline rather than multi-sentence lists so it can be read in seconds.
4. **Section A: Reading Passage**:
   - Authentic, engaging reading passage written at the designated proficiency level in the target language.
   - Text length must always be approximately 400 words (do NOT display the word count anywhere).
   - Divided into logical paragraphs or subsections with clear subtitles.
5. **Section B: Key Vocabulary (Vocabulario Clave) Drag & Drop Exercise**:
   - Positioned immediately following Section A (the reading text).
   - Title standardized to "Key Vocabulary" translated into the target language with period (e.g., `<span class="section-num">B.</span> Vocabulario Clave`).
   - Features the 10 hardest words from the text. Each word must be strictly ONE standard single word in the target language (e.g., "decenas", "calurosa", "nevados", "cálido"), avoiding multi-word phrases or broad international terms like "Biodiversidad".
   - Top area: flex pool of waiting draggable/clickable word chips (`.vocab-pool`) with transparent background and no label (do NOT include "Palabras para arrastrar o tocar:").
   - Middle area: active target definition cards in shuffled order (`.vocab-targets`). Cards show definition only with NO placeholder prompt ("Toca o arrastra aquí...").
   - Square Corners & Narrow Padding: All pills (waiting chips `.vocab-chip` and completed pills `.vocab-completed-pill`) and definition cards have square corners (`border-radius: 0;`) with narrower padding.
   - Compact Mobile View: Ultra-compact single column layout on mobile screens (~6px 10px padding, 13.5px font size, 6px gap) so all 10 definitions fit on screen without extensive scrolling.
   - Supports mouse drag-and-drop, touch drag, and tap-to-select (tap a word chip, then tap a definition) for smooth mobile support.
   - Wrong drop: sticks to the card, shows a red X SVG icon and a contextual hint in the target language explaining the word's true meaning. The entire page is dimmed/disabled via an overlay until the user clicks anywhere on the box, which returns the word chip to the waiting pool.
   - Correct drop: creates a complete boxed dictionary entry for that word (word, part of speech, definition, and quote from the text highlighting the word). Dims/disables the page until the user clicks anywhere on the box, which removes the definition card and moves the word to the completed words section.
   - Completed words section: no title; displays completed words in a flex row of square-cornered pills, each with a green check SVG icon to its left.
   - Clicking any completed word pill pops open its complete dictionary definition card in a designated view area above the pills until clicked again to close.
   - Persists completed vocabulary in `localStorage` and resets on "Reiniciar respuestas".
6. **Section C: Interactive Multiple-Choice Comprehension Quiz**:
   - 4–6 questions (numbered 1, 2, 3...) testing reading comprehension, grammar in context, and vocabulary.
   - Large plain question numbers (no background boxes).
   - Borderless question cards.
   - Do NOT include generic instructions like "Elige la respuesta correcta para cada pregunta...".
   - Options have NO background fill and NO hover background (`background: transparent;`), with tight vertical spacing between options.
   - Radio button circle remains alongside the option letter, vertically centered with the first line of text across all browsers.
   - Option letters are followed by a period (`A.`, `B.`, `C.`, `D.`) with option text positioned close to the period.
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
7. **Section D: Discussion Questions Section**:
   - Section heading lettered as Section D and standardized to "Discussion Questions" translated into the target language (e.g., "Preguntas de discusión" in Spanish, "Diskussionsfragen" in German, "Questions de discussion" in French), avoiding platform-specific brand names like Preply or Tandem.
   - Borderless and transparent container (no dashed or solid outline boxes).
   - Do NOT include boilerplate introductory instructions.
   - 4–5 open-ended conversation questions in the target language designed for practice with tutors, exchange partners, or self-reflection.
8. **Bottom Actions & Navigation Bar**:
   - Matching back link to catalog (`← Índice de Actividades`).
   - Discrete reset button with icon in the target language (e.g., "↺ Reiniciar respuestas") to clear both multiple-choice answers and completed vocabulary from `localStorage`.
   - Equal upper and lower padding (`padding-top: 20px; padding-bottom: 20px; border-top: 1px solid var(--ink-rule); border-bottom: 1px solid var(--ink-rule);`) so controls are equally distant from dividing lines above and below on both desktop and mobile.
   - On mobile screens, both controls are centered horizontally and vertically.
9. **Standardized Footer**:
   - `Language Learning Activities • See more projects by <a href="https://tanguay.info" target="_blank" rel="noopener noreferrer"><em>Edward</em></a>`
   - On mobile, brand and author links are stacked and centered with the bullet dot hidden.

---

## 5. Register in Main Catalog (`index.html`)

After creating `topics/<topic-slug>/index.html`:
1. Read the root `index.html`.
2. Add the new activity to the catalog list with:
   - Target Language badge using `<span class="badge-lang lang-<code">Language Name</span>`
   - `data-lang="<code> <language>"` attribute on `<article class="activity-card">`
   - Topic Title
   - Level badge (e.g., `<span class="badge-level">Intermediate (B1)</span>`)
   - Brief 1-sentence description
   - Direct link to `topics/<topic-slug>/index.html`
3. Maintain tidy chronological or categorical sorting.
