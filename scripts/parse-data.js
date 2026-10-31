const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const TOPICS_DIR = path.join(ROOT_DIR, 'topics');
const IMPORT_IMAGES_DIR = path.join(ROOT_DIR, 'import-images');
const LEGACY_IMAGEPARSE_DIR = path.join(ROOT_DIR, 'imageparse');
const IMPORT_TEXT_DIR = path.join(ROOT_DIR, 'import-text');
const IMPORT_DPOD_PATH = path.join(IMPORT_TEXT_DIR, 'import.dpod.txt');
const SUPPORTED_EXTS = new Set(['.jpg', '.png', '.gif']);

const SECTION_QUESTIONS_I18N = {
  es: {
    sectionTitle: 'Preguntas para el profesor',
    actionHint: 'revisar en clase',
    jumpTitle: 'Ir a Sección {N}: Preguntas para el profesor',
    topTitle: 'Volver al inicio'
  },
  en: {
    sectionTitle: 'Questions for the Teacher',
    actionHint: 'discuss in class',
    jumpTitle: 'Go to Section {N}: Questions for the Teacher',
    topTitle: 'Back to top'
  },
  de: {
    sectionTitle: 'Fragen an die Lehrkraft',
    actionHint: 'im Unterricht besprechen',
    jumpTitle: 'Zu Abschnitt {N}: Fragen an die Lehrkraft',
    topTitle: 'Nach oben'
  },
  fr: {
    sectionTitle: 'Questions pour le professeur',
    actionHint: 'à aborder en cours',
    jumpTitle: 'Aller à la section {N} : Questions pour le professeur',
    topTitle: 'Retour en haut'
  },
  it: {
    sectionTitle: "Domande per l'insegnante",
    actionHint: 'da discutere a lezione',
    jumpTitle: "Vai alla sezione {N}: Domande per l'insegnante",
    topTitle: 'Torna su'
  },
  nl: {
    sectionTitle: 'Vragen voor de docent',
    actionHint: 'bespreken in de les',
    jumpTitle: 'Ga naar sectie {N}: Vragen voor de docent',
    topTitle: 'Terug naar boven'
  },
  pl: {
    sectionTitle: 'Pytania do nauczyciela',
    actionHint: 'do omówienia na lekcji',
    jumpTitle: 'Przejdź do sekcji {N}: Pytania do nauczyciela',
    topTitle: 'Powrót na górę'
  },
  ru: {
    sectionTitle: 'Вопросы к преподавателю',
    actionHint: 'обсудить на уроке',
    jumpTitle: 'Перейти к разделу {N}: Вопросы к преподавателю',
    topTitle: 'Наверх'
  },
  el: {
    sectionTitle: 'Ερωτήσεις για τον καθηγητή',
    actionHint: 'συζήτηση στο μάθημα',
    jumpTitle: 'Μετάβαση στην ενότητα {N}: Ερωτήσεις για τον καθηγητή',
    topTitle: 'Επιστροφή στην κορυφή'
  },
  is: {
    sectionTitle: 'Spurningar til kennarans',
    actionHint: 'ræða í tíma',
    jumpTitle: 'Fara í kafla {N}: Spurningar til kennarans',
    topTitle: 'Fara efst'
  },
  da: {
    sectionTitle: 'Spørgsmål til læreren',
    actionHint: 'gennemgås i timen',
    jumpTitle: 'Gå til afsnit {N}: Spørgsmål til læreren',
    topTitle: 'Tilbage til toppen'
  }
};

const SECTION_IMAGES_I18N = {
  es: {
    sectionTitle: 'Imágenes',
    actionHint: 'clic para ampliar',
    jumpTitle: 'Ir a Sección {N}: Imágenes',
    topTitle: 'Volver al inicio'
  },
  en: {
    sectionTitle: 'Images',
    actionHint: 'click to enlarge',
    jumpTitle: 'Go to Section {N}: Images',
    topTitle: 'Back to top'
  },
  de: {
    sectionTitle: 'Bilder',
    actionHint: 'zum Vergrößern klicken',
    jumpTitle: 'Zu Abschnitt {N}: Bilder',
    topTitle: 'Nach oben'
  },
  fr: {
    sectionTitle: 'Images',
    actionHint: 'cliquer pour agrandir',
    jumpTitle: 'Aller à la section {N} : Images',
    topTitle: 'Retour en haut'
  },
  it: {
    sectionTitle: 'Immagini',
    actionHint: 'clicca per ingrandire',
    jumpTitle: 'Vai alla sezione {N}: Immagini',
    topTitle: 'Torna su'
  },
  nl: {
    sectionTitle: 'Afbeeldingen',
    actionHint: 'klik om te vergroten',
    jumpTitle: 'Ga naar sectie {N}: Afbeeldingen',
    topTitle: 'Terug naar boven'
  },
  pl: {
    sectionTitle: 'Obrazy',
    actionHint: 'kliknij, aby powiększyć',
    jumpTitle: 'Przejdź do sekcji {N}: Obrazy',
    topTitle: 'Powrót na górę'
  },
  ru: {
    sectionTitle: 'Изображения',
    actionHint: 'нажмите для увеличения',
    jumpTitle: 'Перейти к разделу {N}: Изображения',
    topTitle: 'Наверх'
  },
  el: {
    sectionTitle: 'Εικόνες',
    actionHint: 'κλικ για μεγέθυνση',
    jumpTitle: 'Μετάβαση στην ενότητα {N}: Εικόνες',
    topTitle: 'Επιστροφή στην κορυφή'
  },
  is: {
    sectionTitle: 'Myndir',
    actionHint: 'smelltu til að stækka',
    jumpTitle: 'Fara í kafla {N}: Myndir',
    topTitle: 'Fara efst'
  },
  da: {
    sectionTitle: 'Billeder',
    actionHint: 'klik for at forstørre',
    jumpTitle: 'Gå til afsnit {N}: Billeder',
    topTitle: 'Tilbage til toppen'
  }
};

const SECTION_READING_I18N = {
  es: 'Lectura',
  en: 'Reading',
  de: 'Lesetext',
  fr: 'Lecture',
  it: 'Lettura',
  nl: 'Lezing',
  pl: 'Czytanie',
  ru: 'Чтение',
  el: 'Ανάγνωση',
  is: 'Lestur',
  da: 'Læsning'
};

const SECTION_VOCAB_I18N = {
  es: 'Vocabulario',
  en: 'Vocabulary',
  de: 'Wortschatz',
  fr: 'Vocabulaire',
  it: 'Vocabolario',
  nl: 'Woordenschat',
  pl: 'Słownictwo',
  ru: 'Словарь',
  el: 'Λεξιλόγιο',
  is: 'Orðaforði',
  da: 'Ordforråd'
};

const SECTION_QUIZ_I18N = {
  es: 'Comprensión',
  en: 'Comprehension',
  de: 'Verständnis',
  fr: 'Compréhension',
  it: 'Comprensione',
  nl: 'Begrip',
  pl: 'Zrozumienie',
  ru: 'Понимание',
  el: 'Κατανόηση',
  is: 'Skilningur',
  da: 'Forståelse'
};


const SECTION_INSTRUCTIONS_LABEL_I18N = {
  es: 'INSTRUCCIONES',
  en: 'INSTRUCTIONS',
  de: 'ANLEITUNG',
  fr: 'CONSIGNES',
  it: 'ISTRUZIONI',
  nl: 'INSTRUCTIES',
  pl: 'INSTRUKCJE',
  ru: 'ИНСТРУКЦИИ',
  el: 'ΟΔΗΓΙΕΣ',
  is: 'LEIÐBEININGAR',
  da: 'INSTRUKTIONER'
};

const SECTION_INSTRUCTIONS_TEXT_I18N = {
  questions: {
    es: 'Estas son preguntas generales sobre el texto que tengas y que puedes aclarar con tu profesor aquí antes de leer el texto en voz alta.',
    en: 'These are general questions about the text that the student has which can be cleared up here before reading the text aloud.',
    de: 'Dies sind allgemeine Fragen zum Text, die vor dem lauten Vorlesen mit der Lehrkraft geklärt werden können.'
  },
  images: {
    es: 'Estas son imágenes sobre conceptos que aparecen en el texto. Míralas junto con tu profesor: hazle preguntas sobre lo que ves y él te explicará cada detalle y contexto.',
    en: 'These are images of concepts that come up in the text. Look through them with your tutor, ask questions, and your tutor will explain the details and context.',
    de: 'Dies sind Bilder zu Konzepten aus dem Text. Schau sie dir mit deiner Lehrkraft an, stelle Fragen dazu und lasse dir die Hintergründe erklären.'
  }
};

const SECTION_DISCUSS_I18N = {
  es: 'Preguntas',
  en: 'Questions',
  de: 'Fragen',
  fr: 'Questions',
  it: 'Domande',
  nl: 'Vragen',
  pl: 'Pytania',
  ru: 'Вопросы',
  el: 'Ερωτήσεις',
  is: 'Spurningar',
  da: 'Spørgsmål'
};

function normalize(str) {
  return String(str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function stripTags(html) {
  return String(html || '').replace(/<[^>]*>/g, '').trim();
}

function formatImageTitle(rawName) {
  return String(rawName || '')
    .normalize('NFC')
    .split(/[_\s-]+/)
    .filter(Boolean)
    .join(' ');
}

function cleanImageSlug(rawName) {
  return normalize(rawName).replace(/[_\s-]+/g, '');
}

function ensureNoHyphenTopicDirs() {
  if (!fs.existsSync(TOPICS_DIR)) return;
  const entries = fs.readdirSync(TOPICS_DIR, { withFileTypes: true });
  const rootIndexPath = path.join(ROOT_DIR, 'index.html');
  let rootIndexHtml = fs.existsSync(rootIndexPath) ? fs.readFileSync(rootIndexPath, 'utf8') : '';
  let rootIndexChanged = false;

  for (const entry of entries) {
    if (entry.isDirectory() && entry.name.includes('-')) {
      const oldName = entry.name;
      const oldPath = path.join(TOPICS_DIR, oldName);
      const oldIndexPath = path.join(oldPath, 'index.html');
      if (fs.existsSync(oldIndexPath)) {
        const oldHtml = fs.readFileSync(oldIndexPath, 'utf8');
        if (oldHtml.includes('data-redirect-page="true"')) {
          continue;
        }
      }
      const newName = oldName.replace(/-/g, '');
      const newPath = path.join(TOPICS_DIR, newName);
      if (!fs.existsSync(newPath)) {
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed activity folder: topics/${oldName} -> topics/${newName}`);
        if (rootIndexHtml.includes(`topics/${oldName}/`)) {
          rootIndexHtml = rootIndexHtml.split(`topics/${oldName}/`).join(`topics/${newName}/`);
          rootIndexChanged = true;
        }
      }
    }
  }

  if (rootIndexChanged) {
    fs.writeFileSync(rootIndexPath, rootIndexHtml, 'utf8');
    console.log('Updated topic links in root index.html');
  }
}

function ensureImportImagesDir() {
  if (fs.existsSync(LEGACY_IMAGEPARSE_DIR) && !fs.existsSync(IMPORT_IMAGES_DIR)) {
    fs.renameSync(LEGACY_IMAGEPARSE_DIR, IMPORT_IMAGES_DIR);
    console.log('Renamed folder: imageparse -> import-images');
  } else if (!fs.existsSync(IMPORT_IMAGES_DIR)) {
    fs.mkdirSync(IMPORT_IMAGES_DIR, { recursive: true });
  }
}

function getCatalogTopicOrder() {
  const rootIndexPath = path.join(ROOT_DIR, 'index.html');
  if (!fs.existsSync(rootIndexPath)) return [];
  const html = fs.readFileSync(rootIndexPath, 'utf8');
  const matches = Array.from(html.matchAll(/topics\/([a-zA-Z0-9]+)\/index\.html/g), m => m[1].toLowerCase());
  return [...new Set(matches)];
}

function loadActivities() {
  if (!fs.existsSync(TOPICS_DIR)) return [];
  const entries = fs.readdirSync(TOPICS_DIR, { withFileTypes: true });
  const activities = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const folderName = entry.name;
    const folderPath = path.join(TOPICS_DIR, folderName);
    const indexPath = path.join(folderPath, 'index.html');
    if (!fs.existsSync(indexPath)) continue;

    const html = fs.readFileSync(indexPath, 'utf8');
    if (html.includes('data-redirect-page="true"')) continue;
    const langMatch = html.match(/<html[^>]*\blang=["']([^"']+)["']/i);
    const lang = langMatch ? langMatch[1].toLowerCase().trim() : 'es';

    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const title = h1Match ? stripTags(h1Match[1]) : folderName;

    const folderStat = fs.statSync(folderPath);
    const indexStat = fs.statSync(indexPath);
    const timestamp = folderStat.birthtimeMs || folderStat.mtimeMs || indexStat.mtimeMs;

    // Check for topic icon in topic folder
    let iconFile = null;
    for (const ext of ['.jpg', '.png', '.gif']) {
      const candidate = `icon-${folderName}${ext}`;
      if (fs.existsSync(path.join(folderPath, candidate))) {
        iconFile = candidate;
        break;
      }
    }

    const recordedTitles = {};
    const existingImgAltMatches = html.matchAll(/<img\s+src="images\/([^"]+)"\s+alt="([^"]+)"/g);
    for (const m of existingImgAltMatches) {
      const imgFile = m[1];
      const existingAlt = m[2]
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .normalize('NFC')
        .trim();
      if (existingAlt) {
        recordedTitles[imgFile] = existingAlt;
      }
    }

    activities.push({
      folderName,
      folderPath,
      indexPath,
      lang,
      title,
      normTitle: normalize(title),
      normFolder: normalize(folderName),
      timestamp,
      mtimeMs: folderStat.mtimeMs,
      iconFile,
      recordedTitles
    });
  }

  // Sort activities by catalog order first, then timestamp
  const catalogOrder = getCatalogTopicOrder();
  activities.sort((a, b) => {
    const idxA = catalogOrder.indexOf(a.folderName.toLowerCase());
    const idxB = catalogOrder.indexOf(b.folderName.toLowerCase());
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    if (b.timestamp !== a.timestamp) return b.timestamp - a.timestamp;
    return b.mtimeMs - a.mtimeMs;
  });

  return activities;
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function findMatchingActivity(identifier, activities) {
  const normId = normalize(identifier);
  if (!normId) return null;

  let matches = activities.filter(
    act => act.normTitle.includes(normId) || act.normFolder.includes(normId)
  );

  if (matches.length === 0 && (normId === 'los' || normId === 'las')) {
    const altId = normId === 'los' ? 'las' : 'los';
    matches = activities.filter(
      act => act.normTitle.includes(altId) || act.normFolder.includes(altId)
    );
  }

  if (matches.length === 0) {
    if (normId === 'como') {
      matches = activities.filter(act => act.normFolder.includes('colombia'));
    } else {
      matches = activities.filter(act => {
        const folderPrefix = act.normFolder.slice(0, normId.length);
        const titlePrefix = act.normTitle.slice(0, normId.length);
        return levenshtein(normId, folderPrefix) <= 1 || levenshtein(normId, titlePrefix) <= 1;
      });
    }
  }

  if (matches.length === 0) return null;
  return matches[0];
}

function processImportImagesFolder(activities) {
  ensureImportImagesDir();
  const files = fs.readdirSync(IMPORT_IMAGES_DIR, { withFileTypes: true });
  let processedCount = 0;

  for (const fileEntry of files) {
    if (!fileEntry.isFile()) continue;
    const fileName = fileEntry.name;
    const ext = path.extname(fileName).toLowerCase();

    if (!SUPPORTED_EXTS.has(ext)) {
      console.warn(`Skipping "${fileName}": unsupported extension "${ext}" (only .jpg, .png, .gif are supported).`);
      continue;
    }

    const baseName = fileName.slice(0, fileName.length - ext.length);
    const srcPath = path.join(IMPORT_IMAGES_DIR, fileName);

    // 1. Check if filename matches an activity folder name directly (Topic Icon)
    const matchedIconActivity = activities.find(
      act => act.folderName.toLowerCase() === baseName.toLowerCase() ||
             act.normFolder === normalize(baseName)
    );

    if (matchedIconActivity) {
      const destIconName = `icon-${matchedIconActivity.folderName}${ext}`;
      const destPath = path.join(matchedIconActivity.folderPath, destIconName);
      fs.copyFileSync(srcPath, destPath);
      fs.unlinkSync(srcPath);
      matchedIconActivity.iconFile = destIconName;
      processedCount++;
      console.log(`Parsed topic icon: ${fileName} -> topics/${matchedIconActivity.folderName}/${destIconName}`);
      continue;
    }

    // 2. Otherwise handle as gallery image: <identifier>-<imagename>.<ext>
    let identifier = '';
    let imageNameWithoutId = '';
    const matchSep = baseName.match(/^([a-zA-Z0-9]+)[-_\s](.+)$/);

    if (matchSep) {
      identifier = matchSep[1];
      imageNameWithoutId = matchSep[2].normalize('NFC');
    } else {
      const dashIndex = baseName.indexOf('-');
      if (dashIndex <= 0 || dashIndex === baseName.length - 1) {
        console.warn(`Skipping "${fileName}": filename must match topic name or format "<identifier>-<imagename>${ext}".`);
        continue;
      }
      identifier = baseName.slice(0, dashIndex);
      imageNameWithoutId = baseName.slice(dashIndex + 1).normalize('NFC');
    }

    const matchedActivity = findMatchingActivity(identifier, activities);
    if (!matchedActivity) {
      console.warn(`Skipping "${fileName}": no activity found matching "${identifier}".`);
      continue;
    }

    const slug = cleanImageSlug(imageNameWithoutId);
    const recordedTitle = formatImageTitle(imageNameWithoutId);
    const newFileName = `${matchedActivity.lang}-${matchedActivity.folderName}-${slug}${ext}`.toLowerCase();
    const targetImagesDir = path.join(matchedActivity.folderPath, 'images');
    fs.mkdirSync(targetImagesDir, { recursive: true });

    const destPath = path.join(targetImagesDir, newFileName);
    fs.copyFileSync(srcPath, destPath);
    fs.unlinkSync(srcPath);
    matchedActivity.recordedTitles[newFileName] = recordedTitle;
    processedCount++;

    console.log(`Parsed image: ${fileName} -> topics/${matchedActivity.folderName}/images/${newFileName} ("${recordedTitle}")`);
  }

  if (processedCount === 0) {
    console.log('No new matching images to process in /import-images.');
  }
}

function parseAndSyncImportTextDpod(activities) {
  if (!fs.existsSync(IMPORT_TEXT_DIR)) {
    fs.mkdirSync(IMPORT_TEXT_DIR, { recursive: true });
  }

  const rawTopicQuestions = {};
  if (fs.existsSync(IMPORT_DPOD_PATH)) {
    const content = fs.readFileSync(IMPORT_DPOD_PATH, 'utf8');
    const lines = content.split(/\r?\n/);
    let currentTopic = null;

    for (const rawLine of lines) {
      const line = rawLine.trim();
      const topicMatch = line.match(/^##\s+([a-zA-Z0-9_\-]+)/);
      if (topicMatch) {
        currentTopic = topicMatch[1].toLowerCase().replace(/[^a-z0-9]/g, '');
        if (!rawTopicQuestions[currentTopic]) {
          rawTopicQuestions[currentTopic] = [];
        }
      } else if (currentTopic) {
        if (line.length > 5) {
          rawTopicQuestions[currentTopic].push(line);
        }
      }
    }
  }

  // Rescan activities in most recent first order and rewrite import.dpod.txt
  const blocks = [];
  for (const activity of activities) {
    const folder = activity.folderName;
    const questions = rawTopicQuestions[folder] || [];
    if (questions.length > 0) {
      blocks.push(`## ${folder}\n\n${questions.join('\n')}`);
    } else {
      blocks.push(`## ${folder}\n`);
    }
  }

  const newDpodContent = blocks.join('\n\n') + '\n';
  fs.writeFileSync(IMPORT_DPOD_PATH, newDpodContent, 'utf8');
  console.log('Synced import-text/import.dpod.txt with all current topics.');

  return rawTopicQuestions;
}

const SECTION_QUESTIONS_CSS = `
    /* =========================================================
       SECTION 1: QUESTIONS FOR TEACHER
       ========================================================= */
    .teacher-questions-section {
      margin-top: 14px;
      margin-bottom: 28px;
    }

    .teacher-questions-card {
      background: var(--paper-sheet);
      border: 1px solid var(--ink-rule);
      border-radius: 3px;
      padding: 18px 24px;
      box-shadow: 0 2px 6px rgba(45, 40, 35, 0.04);
    }

    .teacher-questions-list {
      list-style-type: disc;
      padding-left: 22px;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .teacher-questions-list li {
      font-family: var(--font-body);
      font-size: 16.5px;
      line-height: 1.6;
      color: var(--ink-main);
    }
`;

const PROFILE_ZOOM_BTN_SVG = `<svg viewBox="0 0 20 20" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"></circle><line x1="13" y1="13" x2="18" y2="18"></line><line x1="8.5" y1="6" x2="8.5" y2="11"></line><line x1="6" y1="8.5" x2="11" y2="8.5"></line></svg>`;

const TOPIC_HEADER_ICON_CSS = `
    /* Topic Header Icon & Clickable Navigation */
    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 4px;
      margin-bottom: 0;
      border-bottom: none;
      flex-wrap: nowrap;
      gap: 20px;
    }

    .topic-header-icon-wrap {
      position: relative;
      flex-shrink: 0;
      width: 68px;
      height: 68px;
      border: 1px solid var(--ink-rule);
      border-radius: 3px;
      overflow: hidden;
      background: var(--paper-sheet);
      box-shadow: 0 1px 4px rgba(45, 40, 35, 0.06);
      margin-right: 0;
      cursor: pointer;
      transition: transform 0.12s ease, box-shadow 0.12s ease;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }

    .topic-header-icon-wrap:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 10px rgba(45, 40, 35, 0.12);
    }

    .topic-header-icon-wrap:active {
      transform: scale(0.97);
    }

    .topic-header-icon {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .profile-zoom-btn {
      position: absolute;
      right: 4px;
      bottom: 4px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: rgba(20, 18, 16, 0.76);
      color: #fffdf9;
      border: 1px solid rgba(255, 255, 255, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
      transition: opacity 0.18s ease, transform 0.15s ease, background 0.15s ease;
      z-index: 2;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }

    .profile-zoom-btn:hover {
      background: rgba(20, 18, 16, 0.95);
      transform: scale(1.12);
      border-color: rgba(255, 255, 255, 0.65);
    }

    .profile-zoom-btn:active {
      transform: scale(0.94);
    }

    .profile-zoom-btn svg {
      display: block;
      pointer-events: none;
    }

    @media (hover: hover) {
      .profile-zoom-btn {
        opacity: 0;
        pointer-events: none;
      }
      .topic-header-icon-wrap:hover .profile-zoom-btn,
      .activity-card-icon-wrap:hover .profile-zoom-btn {
        opacity: 1;
        pointer-events: auto;
      }
    }

    @media (hover: none) {
      .profile-zoom-btn {
        opacity: 0.85;
        pointer-events: auto;
      }
    }

    .handout-title-group h1 {
      font-size: 26px;
      letter-spacing: -0.3px;
      line-height: 1.15;
      text-transform: none;
      font-family: var(--font-body);
      font-weight: 700;
      color: var(--ink-main);
      margin-bottom: 0;
      cursor: pointer;
      display: inline-block;
      transition: opacity 0.15s ease;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }

    .handout-title-group h1:hover {
      opacity: 0.82;
    }

    @media (max-width: 680px) {
      .header-top {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 12px;
      }
      .topic-header-icon-wrap {
        width: 56px;
        height: 56px;
        margin: 0;
      }
      .profile-zoom-btn {
        width: 19px;
        height: 19px;
        right: 3px;
        bottom: 3px;
      }
      .profile-zoom-btn svg {
        width: 10px;
        height: 10px;
      }
      .handout-title-group {
        flex: 0 1 auto;
        min-width: 0;
        text-align: left;
      }
      .handout-title-group h1 {
        font-size: 20px;
        line-height: 1.15;
        letter-spacing: -0.2px;
        text-align: left;
      }
      .stamp-badge {
        width: 100%;
        margin: 4px auto 0 auto;
        order: 3;
        text-align: center;
      }
    }
`;

const SECTION_IMAGES_CSS = `
    /* =========================================================
       IMAGES & FULLSCREEN LIGHTBOX
       ========================================================= */
    .images-section {
      margin-top: 18px;
      margin-bottom: 24px;
    }

    .images-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      align-items: center;
      justify-content: center;
    }

    .image-thumb-wrap {
      background: var(--paper-sheet);
      border: 1px solid var(--ink-rule);
      padding: 4px;
      border-radius: 2px;
      box-shadow: 0 2px 6px rgba(45, 40, 35, 0.06);
      cursor: zoom-in;
      transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s;
      display: inline-flex;
      position: relative;
      overflow: hidden;
    }

    .image-thumb-wrap:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(45, 40, 35, 0.12);
      border-color: var(--stamp-blue);
    }

    .image-thumb {
      height: 150px;
      width: auto;
      max-width: 100%;
      object-fit: cover;
      display: block;
      border-radius: 1px;
    }

    .image-thumb-title {
      position: absolute;
      bottom: 4px;
      left: 4px;
      right: 4px;
      background: rgba(244, 239, 228, 0.92);
      border-top: 1px solid rgba(138, 128, 112, 0.3);
      color: var(--ink-main);
      font-family: var(--font-typewriter);
      font-size: 12px;
      font-weight: 700;
      text-align: center;
      padding: 4px 6px;
      line-height: 1.2;
      pointer-events: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      box-sizing: border-box;
      backdrop-filter: blur(2px);
    }

    /* Thumbnail Question/Statement Badges */
    .image-thumb-questions {
      position: absolute;
      top: 8px;
      right: 8px;
      display: flex;
      align-items: center;
      gap: 4px;
      pointer-events: none;
      z-index: 2;
    }

    .image-thumb-q-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
      pointer-events: none;
    }

    .image-thumb-q-badge svg {
      width: 20px;
      height: 20px;
      display: block;
      pointer-events: none;
    }

    .image-lightbox-overlay {
      display: none;
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(24, 22, 20, 0.9);
      z-index: 10000;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      cursor: zoom-out;
      touch-action: none;
    }

    .image-lightbox-overlay.active {
      display: flex;
    }

    .image-lightbox-overlay.is-zoomed {
      cursor: grab;
    }

    .image-lightbox-overlay.is-panning {
      cursor: grabbing;
    }

    .image-lightbox-stage {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-end;
      max-width: 94vw;
      max-height: 92vh;
      position: relative;
    }

    .image-lightbox-img-wrap {
      position: relative;
      display: inline-block;
      line-height: 0;
      max-width: 94vw;
      max-height: 86vh;
    }

    .image-lightbox-img {
      max-width: 94vw;
      max-height: 86vh;
      width: auto;
      height: auto;
      object-fit: contain;
      box-shadow: 0 12px 42px rgba(0, 0, 0, 0.5);
      border-radius: 2px;
      transform-origin: center center;
      will-change: transform;
      user-select: none;
      -webkit-user-drag: none;
      display: block;
      cursor: pointer;
    }

    /* Lightbox Questions List Overlay in lower-left */
    .image-lightbox-questions {
      position: absolute;
      bottom: 12px;
      left: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      max-width: calc(100% - 24px);
      z-index: 5;
      pointer-events: auto;
      transition: opacity 0.2s ease;
    }

    .image-lightbox-overlay.is-zoomed .image-lightbox-questions {
      opacity: 0;
      pointer-events: none;
    }

    .image-lightbox-q-pill {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      background: rgba(24, 22, 20, 0.82);
      color: #fffdf9;
      border: 1px solid rgba(255, 255, 255, 0.22);
      border-radius: 4px;
      padding: 6px 10px;
      font-family: var(--font-body);
      font-size: 14px;
      line-height: 1.4;
      text-align: left;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(4px);
      cursor: text;
      user-select: text;
      -webkit-user-select: text;
      max-width: fit-content;
    }

    .image-lightbox-q-icon {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-top: 2px;
      line-height: 1;
      filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.5));
    }

    .image-lightbox-q-icon svg {
      width: 16px;
      height: 16px;
      display: block;
    }

    .image-lightbox-q-text {
      flex: 1;
      min-width: 0;
    }

    .image-lightbox-q-pill::selection,
    .image-lightbox-q-text::selection {
      background: var(--highlight);
      color: var(--ink-main);
    }

    .image-lightbox-caption {
      margin-top: 10px;
      font-family: var(--font-typewriter);
      font-size: 15px;
      font-weight: 700;
      text-transform: none;
      letter-spacing: 0.5px;
      color: var(--ink-main);
      background: rgba(244, 239, 228, 0.92);
      border: 1px solid rgba(138, 128, 112, 0.3);
      border-radius: 3px;
      padding: 6px 14px;
      text-align: right;
      align-self: flex-end;
      line-height: 1.2;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(2px);
      transition: opacity 0.2s ease;
      pointer-events: auto;
      cursor: text;
      user-select: text;
      -webkit-user-select: text;
    }

    .image-lightbox-caption::selection {
      background: var(--highlight);
      color: var(--ink-main);
    }

    .image-lightbox-overlay.is-zoomed .image-lightbox-caption {
      opacity: 0;
      pointer-events: none;
    }
`;

const SECTION_LIGHTBOX_HTML = `
  <!-- Fullscreen Image Lightbox -->
  <div class="image-lightbox-overlay" id="image-lightbox" onclick="handleLightboxClick(event)">
    <div class="image-lightbox-stage" id="image-lightbox-stage">
      <div class="image-lightbox-img-wrap" id="image-lightbox-img-wrap">
        <img src="" alt="" class="image-lightbox-img" id="image-lightbox-img">
        <div class="image-lightbox-questions" id="image-lightbox-questions"></div>
      </div>
      <div class="image-lightbox-caption" id="image-lightbox-caption"></div>
    </div>
  </div>`;

const SECTION_LIGHTBOX_JS = `
    // =========================================================
    // IMAGE LIGHTBOX (DESKTOP & MOBILE PINCH-ZOOM)
    // =========================================================
    let lbScale = 1;
    let lbTranslateX = 0;
    let lbTranslateY = 0;
    let lbPinchStartDist = 0;
    let lbPinchStartScale = 1;
    let lbPanStartX = 0;
    let lbPanStartY = 0;
    let lbLastTouchX = 0;
    let lbLastTouchY = 0;
    let lbMouseDown = false;
    let lbSelectingCaption = false;
    let lbLastMouseX = 0;
    let lbLastMouseY = 0;
    let lbGestureMoved = false;
    let lbIgnoreNextClick = false;
    const LB_MAX_SCALE = 50;

    function applyLightboxTransform() {
      const overlay = document.getElementById('image-lightbox');
      const img = document.getElementById('image-lightbox-img');
      if (img) {
        img.style.transform = \`translate3d(\${lbTranslateX}px, \${lbTranslateY}px, 0) scale(\${lbScale})\`;
      }
      if (overlay) {
        overlay.classList.toggle('is-zoomed', lbScale > 1.01);
      }
    }

    function openImageLightbox(src, alt, questionsJson) {
      const overlay = document.getElementById('image-lightbox');
      const img = document.getElementById('image-lightbox-img');
      const caption = document.getElementById('image-lightbox-caption');
      const questionsContainer = document.getElementById('image-lightbox-questions');
      if (!overlay || !img) return;
      img.src = src;
      img.alt = alt || '';
      if (caption) {
        caption.textContent = alt || '';
      }
      if (questionsContainer) {
        questionsContainer.innerHTML = '';
        let qList = [];
        try {
          if (Array.isArray(questionsJson)) qList = questionsJson;
          else if (typeof questionsJson === 'string' && questionsJson) qList = JSON.parse(questionsJson);
        } catch (e) {}
        if (qList && qList.length > 0) {
          const pillBubbleSvg = '<svg viewBox="0 0 20 20" width="16" height="16" fill="rgba(20, 18, 16, 0.88)" stroke="#ffffff" stroke-width="1.25" stroke-linejoin="round" aria-hidden="true"><path d="M10 2.5c-4.418 0-8 3.134-8 7 0 1.434.493 2.767 1.338 3.877L2 16.5l3.917-.98A8.841 8.841 0 0010 16.5c4.418 0 8-3.134 8-7s-3.582-7-8-7z"/></svg>';
          qList.forEach(q => {
            const pill = document.createElement('div');
            pill.className = 'image-lightbox-q-pill';

            const iconSpan = document.createElement('span');
            iconSpan.className = 'image-lightbox-q-icon';
            iconSpan.innerHTML = pillBubbleSvg;

            const textSpan = document.createElement('span');
            textSpan.className = 'image-lightbox-q-text';
            textSpan.textContent = q;

            pill.appendChild(iconSpan);
            pill.appendChild(textSpan);
            questionsContainer.appendChild(pill);
          });
          questionsContainer.style.display = 'flex';
        } else {
          questionsContainer.style.display = 'none';
        }
      }
      lbScale = 1;
      lbTranslateX = 0;
      lbTranslateY = 0;
      lbMouseDown = false;
      lbSelectingCaption = false;
      lbGestureMoved = false;
      lbIgnoreNextClick = false;
      overlay.classList.remove('is-zoomed', 'is-panning');
      applyLightboxTransform();
      overlay.classList.add('active');
    }

    function closeImageLightbox() {
      const overlay = document.getElementById('image-lightbox');
      const img = document.getElementById('image-lightbox-img');
      const caption = document.getElementById('image-lightbox-caption');
      const questionsContainer = document.getElementById('image-lightbox-questions');
      if (!overlay) return;
      if (window.getSelection) {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0 && caption && caption.contains(sel.anchorNode)) {
          sel.removeAllRanges();
        }
      }
      overlay.classList.remove('active', 'is-zoomed', 'is-panning');
      if (img) {
        img.src = '';
        img.style.transform = '';
      }
      if (caption) {
        caption.textContent = '';
      }
      if (questionsContainer) {
        questionsContainer.innerHTML = '';
      }
      lbScale = 1;
      lbTranslateX = 0;
      lbTranslateY = 0;
      lbMouseDown = false;
      lbSelectingCaption = false;
    }

    function handleLightboxClick(e) {
      if (lbIgnoreNextClick) {
        lbIgnoreNextClick = false;
        return;
      }
      if (e && e.target && (e.target.closest('.image-lightbox-caption') || e.target.closest('.image-lightbox-questions'))) {
        return;
      }
      const isImgClick = e && e.target && (e.target.id === 'image-lightbox-img' || e.target.closest('#image-lightbox-img'));
      if (isImgClick) {
        const questionsContainer = document.getElementById('image-lightbox-questions');
        const hasQuestions = questionsContainer && questionsContainer.children.length > 0;
        if (hasQuestions) {
          questionsContainer.style.display = questionsContainer.style.display === 'none' ? 'flex' : 'none';
        } else {
          closeImageLightbox();
        }
        return;
      }
      closeImageLightbox();
    }

    function dismissActiveVocabModal() {
      const detailArea = document.getElementById('vocab-completed-detail');
      if (detailArea && detailArea.getAttribute('data-active-word')) {
        detailArea.innerHTML = '';
        detailArea.removeAttribute('data-active-word');
        return true;
      }
      if (typeof activeModalCard !== 'undefined' && activeModalCard) {
        if (activeModalCard.id === 'active-hint-modal') {
          hideModal();
          return true;
        } else if (activeModalCard.classList.contains('state-wrong')) {
          if (typeof dismissWrongState === 'function') dismissWrongState(activeModalCard);
          else hideModal();
          return true;
        } else if (activeModalCard.classList.contains('state-correct')) {
          const targetKey = activeModalCard.getAttribute('data-target-key');
          if (typeof dismissCorrectState === 'function') dismissCorrectState(targetKey);
          else hideModal();
          return true;
        } else {
          hideModal();
          return true;
        }
      }
      const existingHint = document.getElementById('active-hint-modal');
      if (existingHint) {
        hideModal();
        return true;
      }
      return false;
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        const overlay = document.getElementById('image-lightbox');
        if (overlay && overlay.classList.contains('active')) {
          closeImageLightbox();
          return;
        }
        if (typeof dismissActiveVocabModal === 'function') {
          dismissActiveVocabModal();
        }
      }
    });

    (function setupLightboxTouchZoom() {
      document.addEventListener('DOMContentLoaded', () => {
        const overlay = document.getElementById('image-lightbox');
        if (!overlay) return;

        overlay.addEventListener('wheel', (e) => {
          if (!overlay.classList.contains('active')) return;
          e.preventDefault();
          const zoomFactor = Math.exp(-e.deltaY * 0.0022);
          const newScale = Math.min(Math.max(1, lbScale * zoomFactor), LB_MAX_SCALE);

          if (newScale > 1.005) {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const offsetX = e.clientX - cx;
            const offsetY = e.clientY - cy;
            const ratio = newScale / lbScale;
            lbTranslateX = offsetX - (offsetX - lbTranslateX) * ratio;
            lbTranslateY = offsetY - (offsetY - lbTranslateY) * ratio;
            lbScale = newScale;
          } else {
            lbScale = 1;
            lbTranslateX = 0;
            lbTranslateY = 0;
          }
          applyLightboxTransform();
        }, { passive: false });

        overlay.addEventListener('touchstart', (e) => {
          if (!overlay.classList.contains('active')) return;
          if (e.touches.length === 2) {
            e.preventDefault();
            lbGestureMoved = false;
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            lbPinchStartDist = Math.hypot(dx, dy);
            lbPinchStartScale = lbScale;
            lbLastTouchX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            lbLastTouchY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
          } else if (e.touches.length === 1) {
            lbPanStartX = e.touches[0].clientX;
            lbPanStartY = e.touches[0].clientY;
            lbLastTouchX = e.touches[0].clientX;
            lbLastTouchY = e.touches[0].clientY;
            lbGestureMoved = false;
          }
        }, { passive: false });

        overlay.addEventListener('touchmove', (e) => {
          if (!overlay.classList.contains('active')) return;
          if (e.touches.length === 2 && lbPinchStartDist > 0) {
            e.preventDefault();
            lbGestureMoved = true;
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const dist = Math.hypot(dx, dy);
            lbScale = Math.min(Math.max(1, lbPinchStartScale * (dist / lbPinchStartDist)), LB_MAX_SCALE);

            const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
            if (lbScale > 1) {
              lbTranslateX += (midX - lbLastTouchX);
              lbTranslateY += (midY - lbLastTouchY);
            } else {
              lbTranslateX = 0;
              lbTranslateY = 0;
            }
            lbLastTouchX = midX;
            lbLastTouchY = midY;
            applyLightboxTransform();
          } else if (e.touches.length === 1) {
            const curX = e.touches[0].clientX;
            const curY = e.touches[0].clientY;
            if (Math.hypot(curX - lbPanStartX, curY - lbPanStartY) > 8) {
              lbGestureMoved = true;
            }
            if (lbScale > 1 && lbGestureMoved) {
              e.preventDefault();
              lbTranslateX += (curX - lbLastTouchX);
              lbTranslateY += (curY - lbLastTouchY);
              lbLastTouchX = curX;
              lbLastTouchY = curY;
              applyLightboxTransform();
            }
          }
        }, { passive: false });

        overlay.addEventListener('touchend', (e) => {
          if (e.touches.length < 2) {
            lbPinchStartDist = 0;
          }
          if (e.touches.length === 1) {
            lbLastTouchX = e.touches[0].clientX;
            lbLastTouchY = e.touches[0].clientY;
          }
          if (e.touches.length === 0) {
            if (lbScale <= 1.02) {
              lbScale = 1;
              lbTranslateX = 0;
              lbTranslateY = 0;
              applyLightboxTransform();
            }
            if (lbGestureMoved) {
              lbIgnoreNextClick = true;
              setTimeout(() => { lbIgnoreNextClick = false; }, 350);
            }
          }
        });
      });
    })();
`;

function buildSectionQuestionsHtml(activity, questions, sectionNum) {
  const i18n = SECTION_QUESTIONS_I18N[activity.lang] || SECTION_QUESTIONS_I18N.es;
  const num = sectionNum || 1;
  const listItems = questions
    .map(q => {
      const safeQ = q.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `          <li>${safeQ}</li>`;
    })
    .join('\n');

  const instructionsLabel = SECTION_INSTRUCTIONS_LABEL_I18N[activity.lang] || SECTION_INSTRUCTIONS_LABEL_I18N.es;
  const instructionsText = (SECTION_INSTRUCTIONS_TEXT_I18N.questions && SECTION_INSTRUCTIONS_TEXT_I18N.questions[activity.lang]) || SECTION_INSTRUCTIONS_TEXT_I18N.questions.es;

  return `    <!-- SECTION ${num}: QUESTIONS FOR TEACHER -->
    <h2 class="section-title" id="seccion-${num}">
      <a href="#top" class="section-title-link" onclick="scrollToTop(event)" title="${i18n.topTitle}">
        <span class="section-num">${num}</span> ${i18n.sectionTitle}
      </a>
      <button type="button" class="section-instructions-tab" onclick="toggleSectionInstructions(this)" aria-expanded="false" title="Clic para ver o cerrar las instrucciones">${instructionsLabel}</button>
    </h2>
    <div class="section-instructions-box" onclick="toggleSectionInstructions(this)" role="region" aria-expanded="false" tabindex="0">
      <div class="section-instructions-content">
        <div class="section-instructions-inner">
          <p>${instructionsText}</p>
        </div>
      </div>
    </div>

    <section class="teacher-questions-section" id="teacher-questions-section">
      <div class="teacher-questions-card">
        <ul class="teacher-questions-list">
${listItems}
        </ul>
      </div>
    </section>`;
}

function matchQuestionsToImages(rawQuestions, imageFiles, activity) {
  const teacherQuestions = [];
  const imageQuestions = {}; // file -> array of questions
  for (const file of imageFiles) {
    imageQuestions[file] = [];
  }

  for (const rawLine of rawQuestions) {
    const colonIdx = rawLine.indexOf(':');
    if (colonIdx > 0) {
      const prefix = rawLine.slice(0, colonIdx).trim();
      const questionText = rawLine.slice(colonIdx + 1).trim();
      const normPrefix = normalize(prefix);

      // Find matching image file
      let matchedFile = null;
      for (const file of imageFiles) {
        const ext = path.extname(file);
        const base = file.slice(0, file.length - ext.length);
        const actPrefix = `${activity.lang}-${activity.folderName}-`;
        const rawSlug = base.startsWith(actPrefix) ? base.slice(actPrefix.length) : base;
        const title = (activity.recordedTitles && activity.recordedTitles[file]) || formatImageTitle(rawSlug);

        const normTitle = normalize(title);
        const normFile = normalize(file);

        if (normTitle.includes(normPrefix) || normFile.includes(normPrefix)) {
          matchedFile = file;
          break;
        }
      }

      if (matchedFile) {
        imageQuestions[matchedFile].push(questionText);
        continue;
      }
    }

    teacherQuestions.push(rawLine);
  }

  return { teacherQuestions, imageQuestions };
}

function buildSectionImagesHtml(activity, imageFiles, imageQuestionsMap, sectionNum) {
  const i18n = SECTION_IMAGES_I18N[activity.lang] || SECTION_IMAGES_I18N.es;
  const thumbsHtml = imageFiles
    .map(file => {
      const ext = path.extname(file);
      const base = file.slice(0, file.length - ext.length);
      const prefix = `${activity.lang}-${activity.folderName}-`;
      const rawSlug = base.startsWith(prefix) ? base.slice(prefix.length) : base;
      const recordedTitle =
        (activity.recordedTitles && activity.recordedTitles[file]) ||
        formatImageTitle(rawSlug);
      const safeAlt = recordedTitle.replace(/"/g, '&quot;').replace(/'/g, '&#39;');

      const qList = (imageQuestionsMap && imageQuestionsMap[file]) || [];
      const safeQuestionsJson = JSON.stringify(qList).replace(/"/g, '&quot;').replace(/'/g, '&#39;');

      let qBadgesHtml = '';
      if (qList.length > 0) {
        const bubbleSvg = '<svg viewBox="0 0 20 20" width="20" height="20" fill="rgba(20, 18, 16, 0.88)" stroke="#ffffff" stroke-width="1.25" stroke-linejoin="round" aria-hidden="true"><path d="M10 2.5c-4.418 0-8 3.134-8 7 0 1.434.493 2.767 1.338 3.877L2 16.5l3.917-.98A8.841 8.841 0 0010 16.5c4.418 0 8-3.134 8-7s-3.582-7-8-7z"/></svg>';
        const badges = qList.map(() => `<span class="image-thumb-q-badge">${bubbleSvg}</span>`).join('');
        qBadgesHtml = `\n          <div class="image-thumb-questions">${badges}</div>`;
      }

      return `        <div class="image-thumb-wrap" onclick="openImageLightbox('images/${file}', '${safeAlt}', '${safeQuestionsJson}')">\n          <img src="images/${file}" alt="${safeAlt}" class="image-thumb" loading="lazy">\n          <div class="image-thumb-title">${safeAlt}</div>${qBadgesHtml}\n        </div>`;
    })
    .join('\n');

  const instructionsLabel = SECTION_INSTRUCTIONS_LABEL_I18N[activity.lang] || SECTION_INSTRUCTIONS_LABEL_I18N.es;
  const instructionsText = (SECTION_INSTRUCTIONS_TEXT_I18N.images && SECTION_INSTRUCTIONS_TEXT_I18N.images[activity.lang]) || SECTION_INSTRUCTIONS_TEXT_I18N.images.es;

  return `    <!-- SECTION ${sectionNum}: IMAGES -->
    <h2 class="section-title" id="seccion-${sectionNum}">
      <a href="#top" class="section-title-link" onclick="scrollToTop(event)" title="${i18n.topTitle}">
        <span class="section-num">${sectionNum}</span> ${i18n.sectionTitle}
      </a>
      <button type="button" class="section-instructions-tab" onclick="toggleSectionInstructions(this)" aria-expanded="false" title="Clic para ver o cerrar las instrucciones">${instructionsLabel}</button>
    </h2>
    <div class="section-instructions-box" onclick="toggleSectionInstructions(this)" role="region" aria-expanded="false" tabindex="0">
      <div class="section-instructions-content">
        <div class="section-instructions-inner">
          <p>${instructionsText}</p>
        </div>
      </div>
    </div>

    <section class="images-section" id="images-section">
      <div class="images-grid">
${thumbsHtml}
      </div>
    </section>`;
}

function ensureLightboxAssets(html) {
  let out = html;
  if (!out.includes('.image-thumb-title') || !out.includes('rgba(244, 239, 228, 0.92)') || !out.includes('.image-lightbox-caption {\n      margin-top: 10px;\n      font-family: var(--font-typewriter);\n      font-size: 15px;\n      font-weight: 700;\n      text-transform: none;\n      letter-spacing: 0.5px;\n      color: var(--ink-main);') || !out.includes('.image-lightbox-q-icon') || !out.includes('cursor: pointer;')) {
    const imagesCssRegex = /\/\* =========================================================\s*(?:SECTION \d+:\s*)?IMAGES & FULLSCREEN LIGHTBOX[\s\S]*?\.image-lightbox-overlay\.is-zoomed\s+\.image-lightbox-caption\s*\{[^}]*pointer-events:\s*none;\s*\}/;
    if (imagesCssRegex.test(out)) {
      out = out.replace(imagesCssRegex, SECTION_IMAGES_CSS.trim());
    } else if (!out.includes('.image-lightbox-overlay')) {
      out = out.replace('</style>', `${SECTION_IMAGES_CSS}  </style>`);
    } else {
      out = out.replace('</style>', `${SECTION_IMAGES_CSS}  </style>`);
    }
  }
  if (!out.includes('id="image-lightbox-questions"') || out.includes('id="image-lightbox-caption"></div>\n    </div>\n  </div>\n  </div>') || out.includes('<!-- Fullscreen Image Lightbox -->\n  <!-- Fullscreen Image Lightbox -->')) {
    const lightboxHtmlRegex = /(?:[ \t]*<!-- Fullscreen Image Lightbox -->\s*)+<div class="image-lightbox-overlay" id="image-lightbox"[\s\S]*?id="image-lightbox-caption"><\/div>\s*<\/div>\s*<\/div>(?:\s*<\/div>)?/;
    if (lightboxHtmlRegex.test(out)) {
      out = out.replace(lightboxHtmlRegex, SECTION_LIGHTBOX_HTML.trim());
    } else if (out.includes('id="image-lightbox"')) {
      out = out.replace(
        /<div class="image-lightbox-overlay" id="image-lightbox"[^>]*>[\s\S]*?id="image-lightbox-caption"><\/div>\s*<\/div>\s*<\/div>(?:\s*<\/div>)?/,
        SECTION_LIGHTBOX_HTML.trim()
      );
    } else {
      out = out.replace(
        /(<div class="vocab-dim-overlay"[^>]*><\/div>)/,
        `$1\n${SECTION_LIGHTBOX_HTML}`
      );
    }
  }
  if (!out.includes('isImgClick')) {
    const lightboxJsRegex = /\/\/\s*=========================================================\s*\r?\n\s*\/\/\s*(?:SECTION \d+:\s*)?IMAGE LIGHTBOX[\s\S]*?setupLightboxTouchZoom\(\)[\s\S]*?\}\)\(\);/;
    if (lightboxJsRegex.test(out)) {
      out = out.replace(lightboxJsRegex, SECTION_LIGHTBOX_JS.trim());
    } else {
      out = out.replace('</script>', `${SECTION_LIGHTBOX_JS}\n  </script>`);
    }
  }
  return out;
}

function updateAllSectionHeadings(html, nums) {
  return html.replace(/<h2 class="section-title"[^>]*>[\s\S]*?<\/h2>/g, (headingHtml) => {
    // 1. Questions for teacher
    if (headingHtml.includes('Preguntas para el profesor') || headingHtml.includes('Questions for the Teacher') || headingHtml.includes('revisar en clase')) {
      if (!nums.questionsNum) return headingHtml;
      return headingHtml
        .replace(/id="seccion-\d+"/, `id="seccion-${nums.questionsNum}"`)
        .replace(/<span class="section-num">\d+<\/span>/, `<span class="section-num">${nums.questionsNum}</span>`);
    }

    // 2. Images
    if (headingHtml.includes('Imágenes') || headingHtml.includes('Images') || headingHtml.includes('clic para ampliar') || headingHtml.includes('click to enlarge')) {
      if (!nums.imagesNum) return headingHtml;
      return headingHtml
        .replace(/id="seccion-\d+"/, `id="seccion-${nums.imagesNum}"`)
        .replace(/<span class="section-num">\d+<\/span>/, `<span class="section-num">${nums.imagesNum}</span>`);
    }

    // 3. Reading
    if (headingHtml.includes('leer en voz alta') || headingHtml.includes('read aloud') || headingHtml.includes('Lectura') || headingHtml.includes('Reading')) {
      return headingHtml
        .replace(/id="seccion-\d+"/, `id="seccion-${nums.readingNum}"`)
        .replace(/<span class="section-num">\d+<\/span>/, `<span class="section-num">${nums.readingNum}</span>`);
    }

    // 4. Vocabulary
    if (headingHtml.includes('arrastrar y soltar') || headingHtml.includes('drag and drop') || headingHtml.includes('Vocabulario') || headingHtml.includes('Vocabulary')) {
      return headingHtml
        .replace(/id="seccion-\d+"/, `id="seccion-${nums.vocabNum}"`)
        .replace(/<span class="section-num">\d+<\/span>/, `<span class="section-num">${nums.vocabNum}</span>`);
    }

    // 5. Quiz / Comprehension
    if (headingHtml.includes('opción múltiple') || headingHtml.includes('multiple choice') || headingHtml.includes('Comprensión') || headingHtml.includes('Comprehension')) {
      return headingHtml
        .replace(/id="seccion-\d+"/, `id="seccion-${nums.quizNum}"`)
        .replace(/<span class="section-num">\d+<\/span>/, `<span class="section-num">${nums.quizNum}</span>`);
    }

    // 6. Discussion / Open Questions
    if (headingHtml.includes('responder y debatir') || headingHtml.includes('answer and discuss') || headingHtml.includes('abiertas')) {
      return headingHtml
        .replace(/id="seccion-\d+"/, `id="seccion-${nums.discussNum}"`)
        .replace(/<span class="section-num">\d+<\/span>/, `<span class="section-num">${nums.discussNum}</span>`);
    }

    return headingHtml;
  });
}

function updateActivityHtml(activity, rawQuestions, imageFiles) {
  const originalHtml = fs.readFileSync(activity.indexPath, 'utf8');
  let html = originalHtml;

  // Split raw questions between matched image questions and general teacher questions
  const { teacherQuestions, imageQuestions } = matchQuestionsToImages(rawQuestions, imageFiles, activity);
  const questions = teacherQuestions;

  const hasQuestions = questions && questions.length > 0;
  const hasImages = imageFiles && imageFiles.length > 0;

  // 1. Topic Header Icon synchronization & Clickable Header Navigation
  if (activity.iconFile) {
    if (!html.includes('.topic-header-icon-wrap')) {
      html = html.replace('</style>', `${TOPIC_HEADER_ICON_CSS}  </style>`);
    } else {
      html = html.replace(
        /\/\* Topic Header Icon[\s\S]*?(?=\s*<\/style>)/,
        TOPIC_HEADER_ICON_CSS.trim()
      );
    }
    const safeTitle = activity.title.replace(/"/g, '&quot;');
    const zoomBtn = `<button type="button" class="profile-zoom-btn" onclick="event.stopPropagation(); openImageLightbox('${activity.iconFile}', '${safeTitle}');" title="Ampliar imagen" aria-label="Ampliar imagen">\n            ${PROFILE_ZOOM_BTN_SVG}\n          </button>`;
    const iconTag = `<div class="topic-header-icon-wrap" onclick="handleBackNavigation(event, '../../index.html')" title="Volver a Índice de Actividades">\n          <img src="${activity.iconFile}" alt="${safeTitle}" class="topic-header-icon">\n          ${zoomBtn}\n        </div>`;
    // Clean out existing icon
    html = html.replace(/\s*<div class="topic-header-icon-wrap"[^>]*>[\s\S]*?<\/div>/g, '');
    // Insert icon on far left right after <div class="header-top">
    html = html.replace(
      /(<div class="header-top"[^>]*>)/,
      `$1\n        ${iconTag}`
    );
  } else {
    html = html.replace(/\s*<div class="topic-header-icon-wrap"[^>]*>[\s\S]*?<\/div>/g, '');
  }

  // Ensure title in header is wrapped with clickable back navigation
  html = html.replace(
    /(<div class="handout-title-group"[^>]*>)\s*<h1[^>]*>([\s\S]*?)<\/h1>/i,
    `$1\n          <h1 onclick="handleBackNavigation(event, '../../index.html')" title="Volver a Índice de Actividades">$2</h1>`
  );

  // 2. CSS synchronization
  if (hasQuestions && !html.includes('.teacher-questions-card')) {
    html = html.replace('</style>', `${SECTION_QUESTIONS_CSS}  </style>`);
  }
  if (hasImages || activity.iconFile) {
    html = ensureLightboxAssets(html);
  }

  // 3. Strip any existing Questions and Images sections so core sections (Reading, Vocab, Quiz, Discuss) can be cleanly placed
  const questionsSectionRegex = /(?:[ \t]*<!--[ \t]*(?:SECTION|Section)[ \t]*\d+:[ \t]*(?:QUESTIONS FOR TEACHER|Questions)[^\r\n]*-->\s*)*<h2 class="section-title"[^>]*>(?:(?!<\/h2>)[\s\S])*?(?:Preguntas para el profesor|Questions for the Teacher|revisar en clase)[\s\S]*?<\/h2>\s*(?:<div class="section-instructions-box"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*)?<section class="teacher-questions-section"[^>]*>[\s\S]*?<\/section>\s*/i;
  html = html.replace(questionsSectionRegex, '');

  const imagesSectionRegex = /(?:[ \t]*<!--[ \t]*(?:SECTION|Section)[ \t]*\d+:[ \t]*IMAGES[^\r\n]*-->\s*)*<h2 class="section-title"[^>]*>(?:(?!<\/h2>)[\s\S])*?(?:Imágenes|Images|clic para ampliar|click to enlarge)[\s\S]*?<\/h2>\s*(?:<div class="section-instructions-box"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*)?<section class="images-section"[^>]*>[\s\S]*?<\/section>\s*/i;
  const legacyImagesRegex = /[ \t]*<!-- Section 5: Images -->[\s\S]*?<\/section>\s*/i;
  html = html.replace(imagesSectionRegex, '');
  html = html.replace(legacyImagesRegex, '');

  // Extract vocab section if present
  let vocabBlock = '';
  const vocabRegex = /(?:[ \t]*<!--[ \t]*(?:SECTION|Section)[ \t]*\d+:[ \t]*Vocab[^\r\n]*-->\s*)?(?:<section class="vocab-section">[\s\S]*?<\/section>|<h2 class="section-title"[^>]*>(?:(?!<\/h2>)[\s\S])*?(?:Vocabulario|Vocabulary|Wortschatz)[\s\S]*?(?=(?:<!--[ \t]*(?:SECTION|Section)[ \t]*\d+:[ \t]*(?:READING|Reading)|<h2 class="section-title"[^>]*>(?:(?!<\/h2>)[\s\S])*?(?:Lectura|Reading|Lesetext))))/i;

  const vocabMatch = html.match(vocabRegex);
  if (vocabMatch) {
    vocabBlock = vocabMatch[0].trim();
    html = html.replace(vocabRegex, '');
  }

  // 4. Calculate section numbering according to new order:
  // 1. Imágenes (if present)
  // 2. Vocabulario
  // 3. Preguntas para el profesor (if present)
  // 4. Lectura
  // 5. Comprensión
  // 6. Preguntas abiertas
  let currentNum = 1;
  let imagesNum = null;
  let vocabNum = null;
  let questionsNum = null;

  if (hasImages) {
    imagesNum = currentNum++;
  }
  vocabNum = currentNum++;
  if (hasQuestions) {
    questionsNum = currentNum++;
  }

  const readingNum = currentNum++;
  const quizNum = currentNum++;
  const discussNum = currentNum++;
  const totalSections = discussNum;

  // 5. Update Jump Navigation
  const jumpLinks = [];
  const qI18n = SECTION_QUESTIONS_I18N[activity.lang] || SECTION_QUESTIONS_I18N.es;
  const imgI18n = SECTION_IMAGES_I18N[activity.lang] || SECTION_IMAGES_I18N.es;
  const readingTitle = SECTION_READING_I18N[activity.lang] || SECTION_READING_I18N.es;
  const vocabTitle = SECTION_VOCAB_I18N[activity.lang] || SECTION_VOCAB_I18N.es;
  const quizTitle = SECTION_QUIZ_I18N[activity.lang] || SECTION_QUIZ_I18N.es;
  const discussTitle = SECTION_DISCUSS_I18N[activity.lang] || SECTION_DISCUSS_I18N.es;

  if (hasImages) {
    jumpLinks.push(`<a href="#seccion-${imagesNum}" class="jump-num" title="${imgI18n.jumpTitle.replace('{N}', imagesNum)}">${imagesNum}</a>`);
  }
  jumpLinks.push(`<a href="#seccion-${vocabNum}" class="jump-num" title="Ir a Sección ${vocabNum}: ${vocabTitle}">${vocabNum}</a>`);
  if (hasQuestions) {
    jumpLinks.push(`<a href="#seccion-${questionsNum}" class="jump-num" title="${qI18n.jumpTitle.replace('{N}', questionsNum)}">${questionsNum}</a>`);
  }
  jumpLinks.push(`<a href="#seccion-${readingNum}" class="jump-num" title="Ir a Sección ${readingNum}: ${readingTitle}">${readingNum}</a>`);
  jumpLinks.push(`<a href="#seccion-${quizNum}" class="jump-num" title="Ir a Sección ${quizNum}: ${quizTitle}">${quizNum}</a>`);
  jumpLinks.push(`<a href="#seccion-${discussNum}" class="jump-num" title="Ir a Sección ${discussNum}: ${discussTitle}">${discussNum}</a>`);

  const jumpNavHtml = `<nav class="jump-nav" aria-label="Navegación de secciones">\n        ${jumpLinks.join('\n        ')}\n      </nav>`;
  html = html.replace(/<nav class="jump-nav"[^>]*>[\s\S]*?<\/nav>/i, jumpNavHtml);

  // 6. Build and inject prefix blocks before Reading:
  // Order: Images -> Vocab -> Questions
  let prefixBlocks = '';
  if (hasImages) {
    prefixBlocks += buildSectionImagesHtml(activity, imageFiles, imageQuestions, imagesNum) + '\n\n';
  }
  if (vocabBlock) {
    prefixBlocks += vocabBlock + '\n\n';
  }
  if (hasQuestions) {
    prefixBlocks += buildSectionQuestionsHtml(activity, questions, questionsNum) + '\n\n';
  }

  // Find the start of Reading section (e.g. <!-- SECTION ...: READING or <h2 class="section-title" id="seccion-...)
  const readingMarkerRegex = /(?:<!--[ \t]*(?:SECTION|Section)[ \t]*\d+:[ \t]*(?:READING|Reading)[^\r\n]*-->\s*)?(?:<section[^>]*>\s*)?<h2 class="section-title"[^>]*>(?:(?!<\/h2>)[\s\S])*?(?:Lectura|Reading|Lesetext)[\s\S]*?<\/h2>/i;
  if (prefixBlocks) {
    const match = html.match(readingMarkerRegex);
    if (match) {
      const idx = match.index;
      html = html.slice(0, idx) + prefixBlocks + html.slice(idx);
    } else {
      html = html.replace(/(<\/header>\s*)/, `$1\n${prefixBlocks}`);
    }
  }

  // Collapse excessive consecutive blank lines
  html = html.replace(/\n([ \t]*\n){2,}/g, '\n\n');

  // 7. Update all section headings accurately
  html = updateAllSectionHeadings(html, {
    questionsNum,
    imagesNum,
    readingNum,
    vocabNum,
    quizNum,
    discussNum
  });

  // Ensure dismissActiveVocabModal and Escape listener are in every activity script
  if (!html.includes('dismissActiveVocabModal')) {
    const dismissVocabJs = `
    function dismissActiveVocabModal() {
      const detailArea = document.getElementById('vocab-completed-detail');
      if (detailArea && detailArea.getAttribute('data-active-word')) {
        detailArea.innerHTML = '';
        detailArea.removeAttribute('data-active-word');
        return true;
      }
      if (typeof activeModalCard !== 'undefined' && activeModalCard) {
        if (activeModalCard.id === 'active-hint-modal') {
          hideModal();
          return true;
        } else if (activeModalCard.classList.contains('state-wrong')) {
          if (typeof dismissWrongState === 'function') dismissWrongState(activeModalCard);
          else hideModal();
          return true;
        } else if (activeModalCard.classList.contains('state-correct')) {
          const targetKey = activeModalCard.getAttribute('data-target-key');
          if (typeof dismissCorrectState === 'function') dismissCorrectState(targetKey);
          else hideModal();
          return true;
        } else {
          hideModal();
          return true;
        }
      }
      const existingHint = document.getElementById('active-hint-modal');
      if (existingHint) {
        hideModal();
        return true;
      }
      return false;
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        const overlay = document.getElementById('image-lightbox');
        if (overlay && overlay.classList.contains('active')) {
          if (typeof closeImageLightbox === 'function') closeImageLightbox();
          return;
        }
        if (typeof dismissActiveVocabModal === 'function') {
          dismissActiveVocabModal();
        }
      }
    });
`;
    html = html.replace('</script>', `${dismissVocabJs}\n  </script>`);
  }

  // 8. Update sticky jump nav logic for dynamic last section href
  html = html.replace(
    /stickyLinks\.some\([^)]*=== ['"]#seccion-\d+['"]\)/g,
    `stickyLinks.some(l => l.getAttribute('href') === stickyLinks[stickyLinks.length - 1]?.getAttribute('href'))`
  );
  html = html.replace(
    /activeHref = ['"]#seccion-\d+['"];/g,
    `activeHref = stickyLinks[stickyLinks.length - 1]?.getAttribute('href');`
  );
  html = html.replace(
    /if \(href === '#seccion-1' \|\| href === '#seccion-\d+'\)/g,
    `const lastHref = stickyLinks[stickyLinks.length - 1]?.getAttribute('href');\n        if (href === '#seccion-1' || (lastHref && href === lastHref))`
  );

  // 9. Ensure handleBackNavigation navigates to main menu on desktop as well
  html = html.replace(
    /function handleBackNavigation\(e,\s*url\)\s*\{[\s\S]*?return true;\s*\}/,
    `function handleBackNavigation(e, url) {\n      if (window.getSelection && window.getSelection().toString().trim().length > 0) return true;\n      const targetUrl = url || '../../index.html';\n      if (window.innerWidth <= 680) {\n        if (e) e.preventDefault();\n        captureOutgoingActivity('backward');\n        window.location.href = targetUrl;\n        return false;\n      }\n      window.location.href = targetUrl;\n      return false;\n    }`
  );

  if (html !== originalHtml) {
    fs.writeFileSync(activity.indexPath, html, 'utf8');
    console.log(
      `Updated topics/${activity.folderName}/index.html (Sections: ${totalSections}, Questions: ${hasQuestions ? questions.length : 0}, Images: ${hasImages ? imageFiles.length : 0}, Icon: ${activity.iconFile ? 'yes' : 'no'}).`
    );
  }
}

function updateCatalogHtmlForIcons(activities) {
  const rootIndexPath = path.join(ROOT_DIR, 'index.html');
  if (!fs.existsSync(rootIndexPath)) return;

  const originalHtml = fs.readFileSync(rootIndexPath, 'utf8');
  let html = originalHtml;

  for (const activity of activities) {
    const cardRegex = new RegExp(
      `(<article class="activity-card(?:\\s+has-icon)?"[^>]*onclick="openCard\\('topics\\/${activity.folderName}\\/index\\.html'[^>]*>)([\\s\\S]*?)(<\\/article>)`,
      'i'
    );
    const cardMatch = html.match(cardRegex);
    if (!cardMatch) continue;

    let openingTag = cardMatch[1];
    let innerContent = cardMatch[2];

    // Strip any existing .activity-card-icon-wrap
    let cleanBody = innerContent.replace(/\s*<div class="activity-card-icon-wrap"[^>]*>[\s\S]*?<\/div>/g, '').trim();

    // If wrapped in <div class="activity-card-body"> ... </div>, unwrap it cleanly
    if (cleanBody.startsWith('<div class="activity-card-body">') && cleanBody.endsWith('</div>')) {
      cleanBody = cleanBody.slice('<div class="activity-card-body">'.length, -'</div>'.length).trim();
    }

    if (activity.iconFile) {
      if (!openingTag.includes('has-icon')) {
        openingTag = openingTag.replace('class="activity-card', 'class="activity-card has-icon');
      }
      const safeTitle = activity.title.replace(/"/g, '&quot;');
      const iconPath = `topics/${activity.folderName}/${activity.iconFile}`;
      const zoomBtn = `<button type="button" class="profile-zoom-btn" onclick="event.stopPropagation(); openImageLightbox('${iconPath}', '${safeTitle}');" title="Ampliar imagen" aria-label="Ampliar imagen">\n            ${PROFILE_ZOOM_BTN_SVG}\n          </button>`;
      const iconWrap = `<div class="activity-card-icon-wrap">\n          <img src="${iconPath}" alt="${safeTitle}" class="activity-card-icon" loading="lazy">\n          ${zoomBtn}\n        </div>`;

      innerContent = `\n        ${iconWrap}\n        <div class="activity-card-body">\n          ${cleanBody}\n        </div>\n      `;
    } else {
      openingTag = openingTag.replace(' has-icon', '');
      innerContent = `\n        ${cleanBody}\n      `;
    }

    html = html.replace(cardRegex, `${openingTag}${innerContent}$3`);
  }

  if (html !== originalHtml) {
    fs.writeFileSync(rootIndexPath, html, 'utf8');
    console.log('Updated topic icons in root index.html.');
  }
}

function getTopicImageFiles(activity) {
  const imagesDir = path.join(activity.folderPath, 'images');
  if (!fs.existsSync(imagesDir)) return [];

  const rawFiles = fs
    .readdirSync(imagesDir)
    .filter(f => SUPPORTED_EXTS.has(path.extname(f).toLowerCase()));

  const prefix = `${activity.lang}-${activity.folderName}-`;
  const imageFiles = [];

  for (const file of rawFiles) {
    const ext = path.extname(file);
    const base = file.slice(0, file.length - ext.length);
    if (base.startsWith(prefix)) {
      const rawSlug = base.slice(prefix.length).normalize('NFC');
      const cleanedSlug = cleanImageSlug(rawSlug);
      if (cleanedSlug && (cleanedSlug !== rawSlug || file !== `${prefix}${cleanedSlug}${ext.toLowerCase()}`)) {
        const newFile = `${prefix}${cleanedSlug}${ext}`.toLowerCase();
        const oldPath = path.join(imagesDir, file);
        const newPath = path.join(imagesDir, newFile);
        if (oldPath.toLowerCase() === newPath.toLowerCase() || !fs.existsSync(newPath)) {
          fs.renameSync(oldPath, newPath);
        } else {
          fs.unlinkSync(oldPath);
        }
        if (!activity.recordedTitles[newFile] || (/[^\u0000-\u007F]/.test(rawSlug) && !/[^\u0000-\u007F]/.test(activity.recordedTitles[newFile]))) {
          activity.recordedTitles[newFile] = formatImageTitle(rawSlug);
        }
        imageFiles.push(newFile);
        continue;
      }
    }
    imageFiles.push(file);
  }

  imageFiles.sort((a, b) => a.localeCompare(b));
  return imageFiles;
}

function main() {
  ensureNoHyphenTopicDirs();
  ensureImportImagesDir();

  const activities = loadActivities();
  processImportImagesFolder(activities);

  const topicQuestions = parseAndSyncImportTextDpod(activities);

  for (const activity of activities) {
    const imageFiles = getTopicImageFiles(activity);
    const questions = topicQuestions[activity.folderName] || [];
    updateActivityHtml(activity, questions, imageFiles);
  }

  updateCatalogHtmlForIcons(activities);
}

main();
