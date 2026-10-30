# Language Learning Activities

Self-contained, interactive language learning worksheets and activities designed for **self-study**, **language exchange tandems**, and **online tutoring platforms** (such as [Preply](https://preply.com) and [italki](https://www.italki.com)).

Styled after clean **1970s school handouts**, each activity is a completely self-contained single-page web app featuring a curated reading passage, interactive vocabulary drag-and-drop, instant-feedback multiple-choice questions, open discussion prompts, and visual galleries.

---

## 🎯 The Methodology: 100% Learner-Centered

Traditional language lessons often require hours of unpaid preparation from tutors, or force students into generic textbook curricula. This platform flips the model:

- **Zero Teacher Prep:** Tutors and tandem partners do not need to prepare lesson plans. Tutors often teach as a side job and manage dozens of students; arriving at class with an interactive, tailored activity ready to go respects everyone's time.
- **Collaborative Win-Win Topics:** At the end of every class, student and teacher pick a topic they are both genuinely curious about for the next session (e.g., *Volcanoes of Ecuador*, *Street Food of Oaxaca*, *History of Berlin Techno*, *Argentine Cinema*).
- **50% / 50% Conversational Focus:** Class time is dedicated entirely to high-engagement live speaking and listening—not passive lecture. Platforms like Preply even measure and report this speaking ratio at the end of sessions.
- **Tutor as Real-Time Conversation Partner & Error Logger:** During class, the tutor challenges the student with in-depth "how" and "why" questions, shares personal perspectives, and keeps a running list of errors to send the student after class for dedicated review.

---

## 🛠️ Student Creator Guide: Create Activities with AI

> **No coding required!** Even though this setup uses developer tools (git, editors, and AI agents), **you do not need to write a single line of code**. The AI handles 100% of the code, styles, and logic.

### 1. Choose Your AI & Editor

| Tool | Type | Pricing | Best For |
| :--- | :--- | :--- | :--- |
| **[Google Antigravity](https://antigravity.google)** | AI Coding IDE | **~€21/mo** | **Recommended:** Built-in agent workflow, reads project skills and files automatically. |
| **[VS Code](https://code.visualstudio.com)** + **[GitHub Copilot](https://github.com/features/copilot)** | Code Editor + AI Plugin | Editor: **Free**<br>Copilot: **~€10/mo** (free student tier) | Ubiquitous industry standard; great if you already use VS Code. |
| **[Cursor](https://www.cursor.com)** | AI-first Code Editor | **Free tier** / **~€20/mo Pro** | Seamless inline AI commands and project-wide context. |
| **[Claude Code](https://claude.ai)** (Anthropic CLI) | Terminal Agent | Pay-per-token API / Claude Pro (~€20/mo) | Powerful agentic coding directly from the command line. |

---

### 2. Quick Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/edwardtanguay/language-learning-activities.git
   cd language-learning-activities
   ```

2. **Open the folder** in your AI editor (Antigravity, Cursor, or VS Code).

---

### 3. Generate an Activity in 5–10 Minutes

In your AI assistant's chat window, trigger the activity creation skill:

```text
/create-learning-activity on Argentina in Spanish B1
```

#### Personalize & Customize Your Prompts

You can steer the AI to focus on specific grammar, regional dialects, or unique vocabulary:

- **Targeted Grammar Focus:**
  ```text
  /create-learning-activity on A Road Trip Across Patagonia in Spanish B1, and use the imperfect and preterite tenses as much as possible to contrast past actions
  ```
- **Regional Slang & Culture:**
  ```text
  /create-learning-activity on Café Culture in Buenos Aires in Spanish B2, and incorporate authentic Argentine lunfardo slang and expressions
  ```
- **Professional or Academic Registers:**
  ```text
  /create-learning-activity on Renewable Energy Innovations in Germany in German B2, with formal vocabulary and passive voice constructions
  ```
- **Any Language & Level:**
  ```text
  /create-learning-activity on Visiting Montmartre in French A2
  /create-learning-activity on Tuscan Winemaking in Italian B1
  /create-learning-activity on Tokyo Street Food in Japanese B1
  ```

The AI will generate a complete, self-contained directory under `topics/<topicname>/index.html` and register it in the root `index.html` catalog.

---

### 4. Adding Images and Topic Icons (Optional but Recommended)

1. Drop your screenshots or photos into the `import-images/` folder (e.g. `volcan-cotopaxi.jpg`, `mercado-artesanal.jpg`).
   - **Topic Icon:** To give an activity an icon on the main catalog and worksheet header, save an image matching the topic directory name (e.g. `volcanesecuador.jpg`).
2. Run the parser script in your terminal:
   ```bash
   npm run pd
   ```
   This automatically organizes, renames, and moves images into `topics/<topicname>/images/` and sets topic icons in `topics/<topicname>/icon-<topicname>.<ext>`.

---

### 5. Adding Questions for Your Teacher

You can prepare custom questions and discussion topics for your teacher:

1. Open `import-text/import.dpod.txt`.
2. Find the marker for your topic, for example:
   ```text
   ## volcanesecuador

   ¿Es este un término que usarías? "su entrañable parce de Colombia"
   ¿Qué nivel de preparación física necesitas para subir al volcán Rucu Pichincha? ¿Y puedes verlo desde la ciudad de Quito?
   ```
3. Add any questions or notes you want to ask during class (any line longer than 5 characters will be recognized).
4. Run the parser script:
   ```bash
   npm run pd
   ```
   This automatically creates or updates **Section 1: Preguntas para el profesor** on your worksheet, displaying your questions in a clean bullet card.

---

### 6. Publishing to Vercel for Free

Publish your personal worksheet collection online so you and your tutor can access it anywhere:

1. Push your repository to your personal [GitHub](https://github.com) account.
2. Sign in to [Vercel](https://vercel.com) (free Hobby account).
3. Click **"Add New... > Project"** and select your `language-learning-activities` repository.
4. Leave **Framework Preset** as **Other** (it is 100% static HTML).
5. Click **Deploy**.
6. Your collection is live immediately at `https://your-project.vercel.app`! Every time you push a new activity to GitHub, Vercel updates your live site automatically.

---

## 📋 The Class Workflow

```
BEFORE CLASS (Solo Student Prep - ~15 mins)
  1. Generate activity with AI (5–10 mins)
  2. Read passage with translation assistance until comfortable
  3. Work through drag-and-drop vocabulary and multiple-choice questions
  4. Note down discussion thoughts and questions for the tutor in import-text/import.dpod.txt
  5. Run `npm run pd` and push to GitHub / Vercel

DURING CLASS (Student & Tutor - 50%/50% Conversation)
  1. Section 1 (Preguntas para el profesor): Ask the tutor your prepared questions (if added)
  2. Section 2 (Imágenes): Break the ice by discussing the pictures
  3. Section 3 (Lectura): Read aloud; tutor checks pronunciation and rhythm
  4. Section 4 (Vocabulario): Discuss nuances, collocations, and false friends
  5. Section 5 (Comprensión): Review answers; tutor asks probing "why/how" questions
  6. Section 6 (Preguntas abiertas): Open debate and storytelling
  7. Final 3 minutes: Agree on next week's topic! Tutor sends error log.
```

---

## 🧑‍🎓 Can Also Be Used Completely Solo (No Teacher Required)

Every activity can be used as a standalone self-study tool without a teacher:

1. **Embedded Vocabulary Lookup:** Section drag-and-drop includes immediate definition popups and one-click Google dictionary search queries formatted for detailed definitions and sample sentences.
2. **Instant Exercise Verification:** Multiple-choice comprehension questions offer immediate validation, detailed grammar hints, and score tracking with `localStorage` persistence.
3. **AI Study Buddies:** You can copy any sentence, question, or paragraph and paste it into modern AI assistants for instant translation, grammatical breakdown, and conversation practice:
   - [ChatGPT](https://chatgpt.com)
   - [Claude](https://claude.ai)
   - [Google Gemini](https://gemini.google.com)
   - [DeepL Translator](https://www.deepl.com/translator)
   - [Google Translate](https://translate.google.com)

---

## 👤 Made by

The project was created by Edward Tanguay.  
See more projects by [Edward](https://tanguay.info).

---

## 📄 License

Open-source educational material. Feel free to fork, adapt, and build activities for your own language learning journey!
