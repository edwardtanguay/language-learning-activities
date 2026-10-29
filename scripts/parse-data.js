const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const TOPICS_DIR = path.join(ROOT_DIR, 'topics');
const IMAGEPARSE_DIR = path.join(ROOT_DIR, 'imageparse');
const SUPPORTED_EXTS = new Set(['.jpg', '.png', '.gif']);

const SECTION_5_I18N = {
  es: {
    sectionTitle: 'Imágenes',
    actionHint: 'clic para ampliar',
    jumpTitle: 'Ir a Sección 5: Imágenes',
    topTitle: 'Volver al inicio'
  },
  en: {
    sectionTitle: 'Images',
    actionHint: 'click to enlarge',
    jumpTitle: 'Go to Section 5: Images',
    topTitle: 'Back to top'
  },
  de: {
    sectionTitle: 'Bilder',
    actionHint: 'zum Vergrößern klicken',
    jumpTitle: 'Zu Abschnitt 5: Bilder',
    topTitle: 'Nach oben'
  },
  fr: {
    sectionTitle: 'Images',
    actionHint: 'cliquer pour agrandir',
    jumpTitle: 'Aller à la section 5 : Images',
    topTitle: 'Retour en haut'
  },
  it: {
    sectionTitle: 'Immagini',
    actionHint: 'clicca per ingrandire',
    jumpTitle: 'Vai alla sezione 5: Immagini',
    topTitle: 'Torna su'
  },
  nl: {
    sectionTitle: 'Afbeeldingen',
    actionHint: 'klik om te vergroten',
    jumpTitle: 'Ga naar sectie 5: Afbeeldingen',
    topTitle: 'Terug naar boven'
  },
  pl: {
    sectionTitle: 'Obrazy',
    actionHint: 'kliknij, aby powiększyć',
    jumpTitle: 'Przejdź do sekcji 5: Obrazy',
    topTitle: 'Powrót na górę'
  },
  ru: {
    sectionTitle: 'Изображения',
    actionHint: 'нажмите для увеличения',
    jumpTitle: 'Перейти к разделу 5: Изображения',
    topTitle: 'Наверх'
  },
  el: {
    sectionTitle: 'Εικόνες',
    actionHint: 'κλικ για μεγέθυνση',
    jumpTitle: 'Μετάβαση στην ενότητα 5: Εικόνες',
    topTitle: 'Επιστροφή στην κορυφή'
  },
  is: {
    sectionTitle: 'Myndir',
    actionHint: 'smelltu til að stækka',
    jumpTitle: 'Fara í kafla 5: Myndir',
    topTitle: 'Fara efst'
  },
  da: {
    sectionTitle: 'Billeder',
    actionHint: 'klik for at forstørre',
    jumpTitle: 'Gå til afsnit 5: Billeder',
    topTitle: 'Tilbage til toppen'
  }
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
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function cleanImageSlug(rawName) {
  return String(rawName || '')
    .replace(/[_\s-]+/g, '')
    .toLowerCase();
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

    const recordedTitles = {};
    const existingImgAltMatches = html.matchAll(/<img\s+src="images\/([^"]+)"\s+alt="([^"]+)"/g);
    for (const m of existingImgAltMatches) {
      const imgFile = m[1];
      const existingAlt = m[2]
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();
      const ext = path.extname(imgFile);
      const base = imgFile.slice(0, imgFile.length - ext.length);
      const prefix = `${lang}-${folderName}-`;
      const rawSlug = base.startsWith(prefix) ? base.slice(prefix.length) : base;
      if (existingAlt && existingAlt !== rawSlug) {
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
      recordedTitles
    });
  }

  return activities;
}

function findMatchingActivity(identifier, activities) {
  const normId = normalize(identifier);
  if (!normId) return null;

  let matches = activities.filter(
    act => act.normTitle.includes(normId) || act.normFolder.includes(normId)
  );

  // Fallback for Spanish article variants (e.g. "los" vs "las")
  if (matches.length === 0 && (normId === 'los' || normId === 'las')) {
    const altId = normId === 'los' ? 'las' : 'los';
    matches = activities.filter(
      act => act.normTitle.includes(altId) || act.normFolder.includes(altId)
    );
  }

  if (matches.length === 0) return null;

  // Sort by most recent first
  matches.sort((a, b) => {
    if (b.timestamp !== a.timestamp) return b.timestamp - a.timestamp;
    return b.mtimeMs - a.mtimeMs;
  });

  return matches[0];
}

function processImageParseFolder(activities) {
  if (!fs.existsSync(IMAGEPARSE_DIR)) {
    console.log('No /imageparse folder found. Creating empty /imageparse directory.');
    fs.mkdirSync(IMAGEPARSE_DIR, { recursive: true });
    return;
  }

  const files = fs.readdirSync(IMAGEPARSE_DIR, { withFileTypes: true });
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
    const dashIndex = baseName.indexOf('-');
    if (dashIndex <= 0 || dashIndex === baseName.length - 1) {
      console.warn(`Skipping "${fileName}": filename must be in format "<identifier>-<imagename>${ext}".`);
      continue;
    }

    const identifier = baseName.slice(0, dashIndex);
    const imageNameWithoutId = baseName.slice(dashIndex + 1);

    const matchedActivity = findMatchingActivity(identifier, activities);
    if (!matchedActivity) {
      console.warn(`Skipping "${fileName}": no activity found matching "${identifier}".`);
      continue;
    }

    const slug = cleanImageSlug(imageNameWithoutId);
    const recordedTitle = formatImageTitle(imageNameWithoutId);
    const newFileName = `${matchedActivity.lang}-${matchedActivity.folderName}-${slug}${ext}`;
    const targetImagesDir = path.join(matchedActivity.folderPath, 'images');
    fs.mkdirSync(targetImagesDir, { recursive: true });

    const srcPath = path.join(IMAGEPARSE_DIR, fileName);
    const destPath = path.join(targetImagesDir, newFileName);

    fs.copyFileSync(srcPath, destPath);
    fs.unlinkSync(srcPath);
    matchedActivity.recordedTitles[newFileName] = recordedTitle;
    processedCount++;

    console.log(`Parsed image: ${fileName} -> topics/${matchedActivity.folderName}/images/${newFileName} ("${recordedTitle}")`);
  }

  if (processedCount === 0) {
    console.log('No new matching images to process in /imageparse.');
  }
}

function buildSection5Html(activity, imageFiles) {
  const i18n = SECTION_5_I18N[activity.lang] || SECTION_5_I18N.es;
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
      return `        <div class="image-thumb-wrap" onclick="openImageLightbox('images/${file}', '${safeAlt}')">\n          <img src="images/${file}" alt="${safeAlt}" class="image-thumb" loading="lazy">\n        </div>`;
    })
    .join('\n');

  return `    <!-- Section 5: Images -->
    <h2 class="section-title" id="seccion-5">
      <a href="#top" class="section-title-link" onclick="scrollToTop(event)" title="${i18n.topTitle}"><span class="section-num">5</span> ${i18n.sectionTitle}</a>
      <span class="section-action-hint">${i18n.actionHint}</span>
    </h2>

    <section class="images-section" id="images-section">
      <div class="images-grid">
${thumbsHtml}
      </div>
    </section>`;
}

const SECTION_5_CSS = `
    /* =========================================================
       SECTION 5: IMAGES & FULLSCREEN LIGHTBOX
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
    }

    .image-lightbox-caption {
      margin-top: 8px;
      font-family: var(--font-typewriter);
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: rgba(255, 253, 249, 0.88);
      text-align: right;
      align-self: flex-end;
      line-height: 1.2;
      transition: opacity 0.2s ease;
      pointer-events: auto;
      cursor: text;
      user-select: text;
      -webkit-user-select: text;
      padding: 2px 4px;
      border-radius: 2px;
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

const SECTION_5_LIGHTBOX_HTML = `
  <!-- Fullscreen Image Lightbox -->
  <div class="image-lightbox-overlay" id="image-lightbox" onclick="handleLightboxClick(event)">
    <div class="image-lightbox-stage" id="image-lightbox-stage">
      <img src="" alt="" class="image-lightbox-img" id="image-lightbox-img">
      <div class="image-lightbox-caption" id="image-lightbox-caption"></div>
    </div>
  </div>`;

const SECTION_5_JS = `
    // =========================================================
    // SECTION 5: IMAGE LIGHTBOX (DESKTOP & MOBILE PINCH-ZOOM)
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

    function openImageLightbox(src, alt) {
      const overlay = document.getElementById('image-lightbox');
      const img = document.getElementById('image-lightbox-img');
      const caption = document.getElementById('image-lightbox-caption');
      if (!overlay || !img) return;
      img.src = src;
      img.alt = alt || '';
      if (caption) {
        caption.textContent = alt || '';
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
      if (e && e.target && e.target.closest('.image-lightbox-caption')) {
        return;
      }
      closeImageLightbox();
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const overlay = document.getElementById('image-lightbox');
        if (overlay && overlay.classList.contains('active')) {
          closeImageLightbox();
        }
      }
    });

    (function setupLightboxTouchZoom() {
      document.addEventListener('DOMContentLoaded', () => {
        const overlay = document.getElementById('image-lightbox');
        if (!overlay) return;

        // Desktop mouse wheel / trackpad zoom toward cursor (unlimited / up to 50x)
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

        // Desktop click-and-drag pan when zoomed in (or caption text selection)
        overlay.addEventListener('mousedown', (e) => {
          if (e.button !== 0 || !overlay.classList.contains('active')) return;
          if (e.target && e.target.closest('.image-lightbox-caption')) {
            lbSelectingCaption = true;
            lbPanStartX = e.clientX;
            lbPanStartY = e.clientY;
            return;
          }
          lbSelectingCaption = false;
          lbMouseDown = true;
          lbGestureMoved = false;
          lbPanStartX = e.clientX;
          lbPanStartY = e.clientY;
          lbLastMouseX = e.clientX;
          lbLastMouseY = e.clientY;
          if (lbScale > 1.01) {
            overlay.classList.add('is-panning');
          }
        });

        window.addEventListener('mousemove', (e) => {
          if (!lbMouseDown) return;
          const curX = e.clientX;
          const curY = e.clientY;
          if (Math.hypot(curX - lbPanStartX, curY - lbPanStartY) > 5) {
            lbGestureMoved = true;
          }
          if (lbScale > 1.01 && lbGestureMoved) {
            e.preventDefault();
            lbTranslateX += (curX - lbLastMouseX);
            lbTranslateY += (curY - lbLastMouseY);
            lbLastMouseX = curX;
            lbLastMouseY = curY;
            applyLightboxTransform();
          }
        });

        window.addEventListener('mouseup', (e) => {
          if (lbSelectingCaption) {
            lbSelectingCaption = false;
            lbIgnoreNextClick = true;
            setTimeout(() => { lbIgnoreNextClick = false; }, 250);
            return;
          }
          if (
            overlay.classList.contains('active') &&
            window.getSelection &&
            window.getSelection().toString().trim().length > 0 &&
            Math.hypot(e.clientX - lbPanStartX, e.clientY - lbPanStartY) > 4
          ) {
            lbIgnoreNextClick = true;
            setTimeout(() => { lbIgnoreNextClick = false; }, 250);
          }
          if (!lbMouseDown) return;
          lbMouseDown = false;
          overlay.classList.remove('is-panning');
          if (lbGestureMoved) {
            lbIgnoreNextClick = true;
            setTimeout(() => { lbIgnoreNextClick = false; }, 250);
          }
        });

        overlay.addEventListener('touchstart', (e) => {
          if (e.target && e.target.closest('.image-lightbox-caption')) {
            lbSelectingCaption = true;
            return;
          }
          lbSelectingCaption = false;
          if (e.touches.length === 2) {
            lbGestureMoved = true;
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            lbPinchStartDist = Math.hypot(dx, dy);
            lbPinchStartScale = lbScale;
            lbLastTouchX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            lbLastTouchY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
          } else if (e.touches.length === 1) {
            lbGestureMoved = false;
            lbPanStartX = e.touches[0].clientX;
            lbPanStartY = e.touches[0].clientY;
            lbLastTouchX = e.touches[0].clientX;
            lbLastTouchY = e.touches[0].clientY;
          }
        }, { passive: true });

        overlay.addEventListener('touchmove', (e) => {
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

function ensureLightboxAssets(html) {
  let out = html;
  if (!out.includes('.image-lightbox-overlay')) {
    out = out.replace('</style>', `${SECTION_5_CSS}  </style>`);
  }
  if (!out.includes('id="image-lightbox"')) {
    out = out.replace(
      /(<div class="vocab-dim-overlay"[^>]*><\/div>)/,
      `$1\n${SECTION_5_LIGHTBOX_HTML}`
    );
  } else if (!out.includes('id="image-lightbox-caption"')) {
    out = out.replace(
      /<div class="image-lightbox-overlay" id="image-lightbox"[^>]*>[\s\S]*?<\/div>/,
      SECTION_5_LIGHTBOX_HTML.trim()
    );
  }
  if (!out.includes('function openImageLightbox')) {
    out = out.replace('</script>', `${SECTION_5_JS}\n  </script>`);
  }
  return out;
}

function updateActivityHtmlForImages(activity) {
  const imagesDir = path.join(activity.folderPath, 'images');
  let imageFiles = [];
  if (fs.existsSync(imagesDir)) {
    const rawFiles = fs
      .readdirSync(imagesDir)
      .filter(f => SUPPORTED_EXTS.has(path.extname(f).toLowerCase()));

    const prefix = `${activity.lang}-${activity.folderName}-`;
    for (const file of rawFiles) {
      const ext = path.extname(file);
      const base = file.slice(0, file.length - ext.length);
      if (base.startsWith(prefix)) {
        const rawSlug = base.slice(prefix.length);
        const cleanedSlug = cleanImageSlug(rawSlug);
        if (cleanedSlug && cleanedSlug !== rawSlug) {
          const newFile = `${prefix}${cleanedSlug}${ext.toLowerCase()}`;
          const oldPath = path.join(imagesDir, file);
          const newPath = path.join(imagesDir, newFile);
          if (!fs.existsSync(newPath)) {
            fs.renameSync(oldPath, newPath);
          } else {
            fs.unlinkSync(oldPath);
          }
          activity.recordedTitles[newFile] = formatImageTitle(rawSlug);
          imageFiles.push(newFile);
          continue;
        }
      }
      imageFiles.push(file);
    }
    imageFiles.sort((a, b) => a.localeCompare(b));
  }

  const originalHtml = fs.readFileSync(activity.indexPath, 'utf8');
  let html = originalHtml;
  const i18n = SECTION_5_I18N[activity.lang] || SECTION_5_I18N.es;

  // Check if any previously referenced images in Section 5 were deleted from /images
  const existingImgMatches = Array.from(
    originalHtml.matchAll(/<img\s+src="images\/([^"]+)"/g),
    m => m[1]
  );
  const currentImgSet = new Set(imageFiles);
  for (const oldImg of existingImgMatches) {
    if (!currentImgSet.has(oldImg)) {
      console.log(
        `Removed deleted image from topics/${activity.folderName}/index.html: images/${oldImg}`
      );
    }
  }

  const section5Regex = /[ \t]*<!-- Section 5: Images -->[\s\S]*?<\/section>\s*/;
  const jump5Regex = /\s*<a href="#seccion-5"[^>]*>5<\/a>/g;

  if (imageFiles.length > 0) {
    html = ensureLightboxAssets(html);

    // 1. Ensure jump link 5 is in .jump-nav
    if (!html.includes('href="#seccion-5"')) {
      html = html.replace(
        /(<a href="#seccion-4"[^>]*>4<\/a>)/,
        `$1\n        <a href="#seccion-5" class="jump-num" title="${i18n.jumpTitle}">5</a>`
      );
    }

    // 2. Insert or update Section 5 HTML
    const section5Block = buildSection5Html(activity, imageFiles) + '\n\n';
    if (section5Regex.test(html)) {
      html = html.replace(section5Regex, section5Block);
    } else {
      const bottomBarMarker = '    <!-- Bottom Actions / Navigation -->';
      if (html.includes(bottomBarMarker)) {
        html = html.replace(bottomBarMarker, `${section5Block}${bottomBarMarker}`);
      } else {
        html = html.replace(
          /([ \t]*<div class="bottom-actions-bar">)/,
          `${section5Block}$1`
        );
      }
    }
  } else {
    // Remove jump link 5 and Section 5 if no images exist
    html = html.replace(jump5Regex, '');
    html = html.replace(section5Regex, '');
  }

  if (html !== originalHtml) {
    fs.writeFileSync(activity.indexPath, html, 'utf8');
    console.log(
      `Updated Section 5 in topics/${activity.folderName}/index.html (${imageFiles.length} image${imageFiles.length === 1 ? '' : 's'}).`
    );
  }
}

function main() {
  ensureNoHyphenTopicDirs();
  const activities = loadActivities();
  processImageParseFolder(activities);
  for (const activity of activities) {
    updateActivityHtmlForImages(activity);
  }
}

main();
