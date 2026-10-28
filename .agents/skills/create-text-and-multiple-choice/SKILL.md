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
- **Typography**:
  - Monospace / Typewriter font stack: `"Courier New", Courier, "Courier Prime", monospace` for headers, metadata tags, instructions, and buttons.
  - Clean readable serif/sans for long reading passages: `Georgia, "Times New Roman", serif` or clean typewriter for authentic feel.
- **Header Box**:
  - Resembles a physical worksheet header with stamped boxes: `ACTIVITY / HOJA DE TRABAJO`, `LEVEL`, `LANGUAGE`, `STUDENT / TANDEM NAME: ___________`, `DATE: ___________`.
- **Responsive Layout**:
  - Desktop & Tablet (Landscape): Generous margins, clean side-by-side or balanced layout (reading passage + vocabulary margin, followed by quiz).
  - Mobile (Portrait): Single-column stack with comfortable padding and touch-friendly buttons.

---

## 4. Activity Content Structure

Each activity file should include the following sections:

1. **Top Navigation**:
   - Link back to main activities catalog (`<a href="../../index.html">&larr; Back to Activity Catalog</a>`).
2. **Worksheet Header**:
   - Title, metadata stamp (language, level, topic, handout ID).
   - "Name / Date" blanks for that authentic school handout feel.
3. **Introduction / Context**:
   - 1–2 sentences explaining the goal of the handout and cultural context.
4. **Reading Passage**:
   - Authentic, engaging reading passage written at the designated proficiency level in the target language.
   - Divided into logical paragraphs or subsections with clear subtitles.
5. **Vocabulary & Cultural Notes (Glossary)**:
   - Key terms, idiomatic phrases, and cultural explanations with translations and contextual usage notes.
6. **Interactive Multiple-Choice Comprehension Quiz**:
   - 4–6 questions testing reading comprehension, grammar in context, and vocabulary.
   - Each question has 3–4 plausible options.
   - Interactive feedback:
     - Selecting an option immediately shows whether it is correct or incorrect.
     - Explanatory note appears explaining *why* the answer is correct in simple terms.
     - Live score tracker (e.g., "Score: 4 / 5").
   - **Progress Persistence**:
     - User selections and scores are saved in `localStorage` with a unique key (e.g., `activity_<topic-slug>`).
     - Include a visible **"Reset Worksheet"** or **"Clear Answers"** button so learners can repeat the exercise.
7. **Tandem / Preply Tutor Discussion Section**:
   - 4–5 open-ended conversation questions in the target language designed for:
     - Practice with an online tutor (e.g., Preply, iTalki).
     - Language exchange tandem partners.
     - Speaking or writing self-reflection.
8. **Print Button**:
   - A clean "Print / Save PDF" link trigger (`window.print()`) styled neatly. Include `@media print` styles that hide web buttons.

---

## 5. Register in Main Catalog (`index.html`)

After creating `topics/<topic-slug>/index.html`:
1. Read the root `index.html`.
2. Add the new activity to the catalog list/table with:
   - Target Language & flag/icon
   - Topic Title
   - Level (e.g., "Intermediate (B1)")
   - Brief 1-sentence description
   - Direct link to `topics/<topic-slug>/`
3. Maintain tidy chronological or categorical sorting.
