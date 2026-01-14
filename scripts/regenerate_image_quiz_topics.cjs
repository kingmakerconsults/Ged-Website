const fs = require('fs');
const path = require('path');

// Regenerates image-based quiz topics from image metadata.
// - Removes metadata entries that point to missing images
// - Removes/updates supplemental topics and topic files
// - Generates EASY/MEDIUM/HARD variants per image with non-placeholder options

const WORKSPACE_ROOT = path.join(__dirname, '..');
const FRONTEND_PUBLIC_ROOT = path.join(WORKSPACE_ROOT, 'frontend', 'public');

const METADATA_PATH = path.join(
  WORKSPACE_ROOT,
  'backend',
  'data',
  'image_metadata_final.json'
);
const QUIZ_DATA_DIR = path.join(WORKSPACE_ROOT, 'backend', 'data', 'quizzes');
const SUPPLEMENTAL_PATH = path.join(QUIZ_DATA_DIR, 'supplemental.topics.json');

const NEW_CATEGORY_NAME = 'Image Based Practice';
const GENERATED_BY = 'image-metadata-generator-v2';

function parseSubjectsArg(argv) {
  const arg = (argv || []).find((a) => String(a).startsWith('--subjects='));
  if (!arg) return null;
  const raw = String(arg).slice('--subjects='.length);
  const parts = raw
    .split(',')
    .map((s) => String(s).trim())
    .filter(Boolean);
  if (!parts.length) return null;
  return new Set(parts);
}

const SUBJECT_FOLDERS = {
  Math: 'math',
  Science: 'science',
  'Social Studies': 'social-studies',
  RLA: 'rla',
  'Reasoning Through Language Arts (RLA)': 'rla',
};

function loadJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function saveJSON(p, data) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
}

function decodeImageRelPath(filePathFromWebRoot) {
  if (!filePathFromWebRoot || typeof filePathFromWebRoot !== 'string')
    return null;
  if (!filePathFromWebRoot.startsWith('/')) return null;
  const noQuery = filePathFromWebRoot.split('?')[0].split('#')[0];
  const rel = noQuery.replace(/^\//, '');
  try {
    return decodeURIComponent(rel);
  } catch {
    return rel;
  }
}

function imageExists(filePathFromWebRoot) {
  const rel = decodeImageRelPath(filePathFromWebRoot);
  if (!rel) return false;
  const abs = path.join(FRONTEND_PUBLIC_ROOT, rel);
  return fs.existsSync(abs);
}

function slugifyTopicPart(s) {
  return String(s || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function pickFirstNonEmpty(arr) {
  if (!Array.isArray(arr)) return null;
  for (const v of arr) {
    const s = String(v || '').trim();
    if (s) return s;
  }
  return null;
}

function truncate(s, n) {
  const str = String(s || '')
    .replace(/\s+/g, ' ')
    .trim();
  if (str.length <= n) return str;
  return str.slice(0, n - 1) + '…';
}

function joinNonEmpty(parts, sep = ' ') {
  return parts
    .map((p) => String(p || '').trim())
    .filter(Boolean)
    .join(sep);
}

function makeImageMetaStem(img) {
  const title = img.category ? String(img.category).trim() : '';
  const alt = String(img.altText || '').trim();
  const desc = String(img.detailedDescription || '').trim();
  const extracted = String(img.extractedText || '').trim();

  const lines = [];
  if (alt) lines.push(`Alt text: ${alt}`);
  if (desc) lines.push(`Description: ${truncate(desc, 260)}`);
  if (extracted) lines.push(`Text in image: ${truncate(extracted, 220)}`);

  const passage = lines.join('\n\n');
  return { title, passage };
}

function hash32(str) {
  let h = 2166136261;
  const s = String(str || '');
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle(arr, seed) {
  const out = arr.slice();
  const rand = mulberry32(seed);
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = out[i];
    out[i] = out[j];
    out[j] = tmp;
  }
  return out;
}

function buildAnswerOptions(
  correctText,
  distractors,
  correctRationale,
  distractorRationales,
  seed
) {
  const opts = [];
  opts.push({
    text: correctText,
    rationale: correctRationale,
    isCorrect: true,
  });
  for (let i = 0; i < distractors.length; i++) {
    opts.push({
      text: distractors[i],
      rationale:
        (distractorRationales && distractorRationales[i]) ||
        'This choice is not supported by the visual details provided.',
      isCorrect: false,
    });
  }
  while (opts.length < 4) {
    opts.push({
      text: 'Not enough information is shown to decide.',
      rationale: 'The visual/text provided does not support this choice.',
      isCorrect: false,
    });
  }

  const shuffled = seededShuffle(opts.slice(0, 4), seed || 1);
  // Guarantee exactly one correct
  const correctCount = shuffled.filter((o) => o.isCorrect).length;
  if (correctCount !== 1) return opts.slice(0, 4);
  return shuffled;
}

function extractColorMappings(text) {
  const t = String(text || '');
  const mappings = [];
  const re =
    /([A-Z][A-Za-z0-9&'\-\s]{1,80}?)\s+(?:are|is|shown|displayed|colored|shaded)?\s*(?:in|as)\s+(blue|red|green|yellow|orange|purple|gray|grey|black|white)\b/gi;
  let m;
  const cleanLabel = (raw) => {
    let s = String(raw || '')
      .replace(/\s+/g, ' ')
      .trim();
    if (!s) return null;
    const lower = s.toLowerCase();

    // Reject non-semantic labels often found in prose descriptions.
    if (/\b(one|another)\b/.test(lower)) return null;
    if (/\b(left|right)\b/.test(lower)) return null;
    if (/^(while|and|with)\b/.test(lower)) return null;

    // Trim trailing helper words
    s = s
      .replace(
        /\b(are|is|shown|displayed|colored|shaded|members?|countries?|regions?|areas?|states?)\b\s*$/i,
        ''
      )
      .trim();
    if (!s) return null;
    if (!/[a-z]/i.test(s)) return null;
    if (s.length < 3 || s.length > 60) return null;
    return s;
  };

  while ((m = re.exec(t)) !== null) {
    const label = cleanLabel(m[1]);
    const color = String(m[2] || '').toLowerCase();
    if (label && color) mappings.push({ label, color });
  }
  // Dedupe
  const seen = new Set();
  return mappings.filter((x) => {
    const key = `${x.label.toLowerCase()}|${x.color}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function extractYears(text) {
  const t = String(text || '');
  const years = new Set();
  const re = /\b(1[6-9]\d{2}|20\d{2})\b/g;
  let m;
  while ((m = re.exec(t)) !== null) {
    years.add(m[1]);
  }
  return Array.from(years);
}

function extractLabelYearPairs(text) {
  const t = String(text || '');
  const tokens = t
    .split(/[,;\n]+/)
    .map((x) => x.trim())
    .filter(Boolean);

  const pairs = [];
  for (let i = 0; i < tokens.length - 1; i++) {
    const label = tokens[i];
    const year = tokens[i + 1];
    if (!label || !year) continue;
    if (!/^\d{4}$/.test(year)) continue;
    if (label.length < 3 || label.length > 80) continue;
    if (!/[a-z]/i.test(label)) continue;
    // Skip obvious titles
    if (/^territorial expansion of/i.test(label)) continue;
    pairs.push({ label, year });
  }

  // Dedupe by label
  const seen = new Set();
  const out = [];
  for (const p of pairs) {
    const key = `${p.label.toLowerCase()}|${p.year}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(p);
  }
  return out;
}

function guessAcquisitionVerb(label) {
  const s = String(label || '').toLowerCase();
  if (s.includes('purchase')) return 'purchased';
  if (s.includes('annex')) return 'annexed';
  if (s.includes('cession')) return 'ceded';
  if (s.includes('treaty')) return 'acquired by treaty';
  return 'acquired';
}

function makeMcq({
  questionNumber,
  difficulty,
  imageUrl,
  passage,
  questionText,
  correct,
  distractors,
  correctRationale,
  distractorRationales,
  seed,
  subject,
}) {
  return {
    questionNumber,
    type: 'multiple-choice-text',
    difficulty,
    imageUrl,
    imageURL: imageUrl,
    content: {
      passage,
      imageURL: imageUrl,
      questionText,
    },
    answerOptions: buildAnswerOptions(
      correct,
      distractors,
      correctRationale,
      distractorRationales,
      seed
    ),
    challenge_tags: subjectDefaultTag(subject),
  };
}

function extractCandidateLabelsFromText(text) {
  const t = String(text || '');
  const raw = t
    .split(/[,;\n]+/)
    .map((x) => x.trim())
    .filter(Boolean);

  const labels = [];
  for (const r of raw) {
    const s = r.replace(/\s+/g, ' ').trim();
    if (s.length < 3 || s.length > 50) continue;
    // Must contain at least one letter
    if (!/[a-z]/i.test(s)) continue;
    // Avoid ultra-generic chart words
    if (
      /^(map|graph|chart|table|title|subtitle|percentage|percent|years?)$/i.test(
        s
      )
    )
      continue;
    labels.push(s);
  }

  // Dedupe
  const seen = new Set();
  const out = [];
  for (const s of labels) {
    const key = s.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(s);
  }
  return out;
}

function extractImageLabels(img) {
  const extracted = String(img.extractedText || '').trim();
  const labels = extractCandidateLabelsFromText(extracted);

  // Add keyword phrases (but keep them short)
  const kws = Array.isArray(img.keywords) ? img.keywords : [];
  for (const k of kws) {
    const s = String(k || '')
      .replace(/\s+/g, ' ')
      .trim();
    if (s.length < 3 || s.length > 35) continue;
    if (!/[a-z]/i.test(s)) continue;
    if (/^ged\b/i.test(s)) continue;
    if (/^(map|graph|chart|table|diagram|data interpretation)$/i.test(s))
      continue;
    labels.push(s);
  }

  // Dedupe again
  const seen = new Set();
  return labels.filter((s) => {
    const key = String(s).toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function pickDistractorsFromBank({ bank, excludeSet, correct, seed }) {
  const pool = (bank || []).filter((t) => {
    const key = String(t).toLowerCase();
    if (excludeSet && excludeSet.has(key)) return false;
    if (String(t).toLowerCase() === String(correct).toLowerCase()) return false;
    return true;
  });
  return seededShuffle(pool, seed).slice(0, 3);
}

function pickKeyTerms(img) {
  const keywords = Array.isArray(img.keywords) ? img.keywords : [];
  const cat = String(img.category || '').trim();
  const subject = String(img.subject || '').trim();
  const terms = [];
  for (const k of keywords) {
    const s = String(k || '').trim();
    if (s && !terms.includes(s)) terms.push(s);
  }
  if (cat && !terms.includes(cat)) terms.unshift(cat);
  if (subject && !terms.includes(subject)) terms.push(subject);
  return terms.slice(0, 5);
}

function pickDistinctDistractors(options, correct, seed) {
  const clean = options
    .map((o) => String(o || '').trim())
    .filter(Boolean)
    .filter((o) => o.toLowerCase() !== String(correct || '').toLowerCase());

  const unique = [];
  const seen = new Set();
  for (const o of clean) {
    const key = o.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(o);
  }
  return seededShuffle(unique, seed).slice(0, 3);
}

function subjectDefaultTag(subject) {
  const s = String(subject || '').toLowerCase();
  if (s.includes('math')) return ['math-3'];
  if (s.includes('science')) return ['science-3'];
  if (s.includes('social')) return ['social:3'];
  if (s.includes('rla') || s.includes('language')) return ['rla:3'];
  return ['general:3'];
}

function generateThreeLevelQuestions(img, startNumber, subjectTermBank) {
  const { passage } = makeImageMetaStem(img);
  const subject = String(img.subject || '').trim();
  const cat = String(img.category || 'General').trim() || 'General';
  const alt = String(img.altText || '').trim();
  const desc = String(img.detailedDescription || '').trim();
  const extracted = String(img.extractedText || '').trim();
  const imageUrl = String(img.filePath || '').trim();

  const seedA = pickFirstNonEmpty(img.questionSeeds);
  const seedB = pickFirstNonEmpty((img.questionSeeds || []).slice(1));

  const seedBase = `${imageUrl}|${cat}|${seedA || ''}|${seedB || ''}`;
  const baseSeed = hash32(seedBase);

  const keyTerms = pickKeyTerms(img);
  const colorMappings = extractColorMappings(`${desc} ${extracted}`);
  const years = extractYears(extracted);
  const labelYearPairs = extractLabelYearPairs(`${extracted}, ${desc}, ${alt}`);

  const imageLabels = extractImageLabels(img);
  const imageLabelSet = new Set(
    imageLabels.map((s) => String(s).toLowerCase())
  );

  const questions = [];
  let n = startNumber;

  // Prefer high-signal, GED-style, evidence-driven questions.
  // 1) Historical maps / timelines: label-year pairs
  if (
    (/map/i.test(cat) || subject === 'Social Studies' || subject === 'RLA') &&
    labelYearPairs.length >= 4
  ) {
    const pairs = seededShuffle(labelYearPairs, baseSeed + 1);
    const p1 = pairs[0];
    const p2 = pairs[1];
    const p3 = pairs[2];
    const yearsPool = labelYearPairs.map((p) => p.year);
    const labelsPool = labelYearPairs.map((p) => p.label);

    // Easy: year for a named event/territory
    const verb = guessAcquisitionVerb(p1.label);
    questions.push(
      makeMcq({
        questionNumber: n++,
        difficulty: 'easy',
        imageUrl,
        passage,
        questionText: `The map labels “${p1.label}” with a year. What year is shown for “${p1.label}”?`,
        correct: p1.year,
        distractors: pickDistinctDistractors(yearsPool, p1.year, baseSeed + 10),
        correctRationale: `Correct. The map labels ${p1.label} with the year ${p1.year}.`,
        distractorRationales: [
          'Incorrect. That year is used for a different labeled acquisition/event on the map.',
          'Incorrect. That year is used for a different labeled acquisition/event on the map.',
          'Incorrect. That year is used for a different labeled acquisition/event on the map.',
        ],
        seed: baseSeed + 11,
        subject,
      })
    );

    // Medium: which event/territory matches a given year
    questions.push(
      makeMcq({
        questionNumber: n++,
        difficulty: 'medium',
        imageUrl,
        passage,
        questionText: `The map shows a label with the year ${p2.year}. Which labeled item matches that year?`,
        correct: p2.label,
        distractors: pickDistinctDistractors(
          labelsPool,
          p2.label,
          baseSeed + 20
        ),
        correctRationale: `Correct. The map shows ${p2.label} labeled with ${p2.year}.`,
        distractorRationales: [
          'Incorrect. That label is paired with a different year on the map.',
          'Incorrect. That label is paired with a different year on the map.',
          'Incorrect. That label is paired with a different year on the map.',
        ],
        seed: baseSeed + 21,
        subject,
      })
    );

    // Hard: compare which happened first
    const yA = Number(p2.year);
    const yB = Number(p3.year);
    const earlier = yA <= yB ? p2 : p3;
    const later = yA <= yB ? p3 : p2;
    questions.push(
      makeMcq({
        questionNumber: n++,
        difficulty: 'hard',
        imageUrl,
        passage,
        questionText: `Which occurred earlier according to the map?`,
        correct: `${earlier.label} (${earlier.year})`,
        distractors: pickDistinctDistractors(
          [
            `${later.label} (${later.year})`,
            ...labelYearPairs.slice(0, 6).map((p) => `${p.label} (${p.year})`),
          ],
          `${earlier.label} (${earlier.year})`,
          baseSeed + 30
        ),
        correctRationale: `Correct. ${earlier.label} is labeled ${earlier.year}, which is earlier than ${later.year}.`,
        distractorRationales: [
          'Incorrect. That item is labeled with a later year on the map.',
          'Incorrect. That item is labeled with a later year on the map.',
          'Incorrect. That item is labeled with a later year on the map.',
        ],
        seed: baseSeed + 31,
        subject,
      })
    );

    return questions;
  }

  // 2) Legend color mapping questions (common for political maps)
  if (colorMappings.length >= 2) {
    const chosen = colorMappings[baseSeed % colorMappings.length];
    const labelsPool = colorMappings.map((m) => m.label);
    questions.push(
      makeMcq({
        questionNumber: n++,
        difficulty: 'easy',
        imageUrl,
        passage,
        questionText: `According to the legend/description, which group is shown in ${chosen.color}?`,
        correct: chosen.label,
        distractors: pickDistinctDistractors(
          labelsPool,
          chosen.label,
          baseSeed + 40
        ),
        correctRationale: `Correct. The description assigns ${chosen.color} to ${chosen.label}.`,
        distractorRationales: [
          `Incorrect. The description does not assign ${chosen.color} to this option.`,
          `Incorrect. The description does not assign ${chosen.color} to this option.`,
          `Incorrect. The description does not assign ${chosen.color} to this option.`,
        ],
        seed: baseSeed + 41,
        subject,
      })
    );

    // Medium: reverse mapping
    const chosen2 = colorMappings[(baseSeed + 1) % colorMappings.length];
    const colorsPool = colorMappings.map((m) => m.color);
    questions.push(
      makeMcq({
        questionNumber: n++,
        difficulty: 'medium',
        imageUrl,
        passage,
        questionText: `According to the legend/description, what color represents ${chosen2.label}?`,
        correct: chosen2.color,
        distractors: pickDistinctDistractors(
          colorsPool,
          chosen2.color,
          baseSeed + 50
        ),
        correctRationale: `Correct. ${chosen2.label} is described as ${chosen2.color}.`,
        distractorRationales: [
          'Incorrect. The legend/description assigns a different color to this group.',
          'Incorrect. The legend/description assigns a different color to this group.',
          'Incorrect. The legend/description assigns a different color to this group.',
        ],
        seed: baseSeed + 51,
        subject,
      })
    );

    // Hard: interpretation question (still anchored)
    questions.push(
      makeMcq({
        questionNumber: n++,
        difficulty: 'hard',
        imageUrl,
        passage,
        questionText: `Which statement best describes what the color-coding is used for in this visual?`,
        correct: `To distinguish different labeled groups (for example, ${chosen.label}) on the map/graphic.`,
        distractors: pickDistinctDistractors(
          [
            'To show the exact population of each country as a number.',
            'To indicate temperature changes over time in degrees.',
            'To display a step-by-step procedure in order.',
            `To separate groups like ${chosen.label} from other groups using colors.`,
          ],
          `To distinguish different labeled groups (for example, ${chosen.label}) on the map/graphic.`,
          baseSeed + 60
        ),
        correctRationale:
          'Correct. The legend/description indicates the colors correspond to categories/groups.',
        distractorRationales: [
          'Incorrect. The visual uses colors for categories, not exact population values.',
          'Incorrect. The color-coding is not described as temperatures over time.',
          'Incorrect. The visual is a categorized graphic, not an ordered procedure.',
        ],
        seed: baseSeed + 61,
        subject,
      })
    );

    return questions;
  }

  // 3) Seed-driven science diagrams (when seeds are already high-quality)
  if (
    subject === 'Science' &&
    Array.isArray(img.questionSeeds) &&
    img.questionSeeds.length
  ) {
    const seed = String(img.questionSeeds[0] || '').trim();
    if (
      /plate boundary|subduct|tectonic|convergent|divergent/i.test(
        seed + ' ' + alt + ' ' + desc
      )
    ) {
      questions.push(
        makeMcq({
          questionNumber: n++,
          difficulty: 'medium',
          imageUrl,
          passage,
          questionText: seed,
          correct:
            'A deep-ocean trench and a volcanic mountain chain can form.',
          distractors: [
            'A mid-ocean ridge forms where new crust is created.',
            'A rift valley forms where a continent is pulling apart.',
            'A hotspot island chain forms far from plate boundaries.',
          ],
          correctRationale:
            'Correct. Subduction at a convergent boundary is associated with trenches and volcanic arcs.',
          distractorRationales: [
            'Incorrect. Mid-ocean ridges are typical of divergent boundaries.',
            'Incorrect. Rift valleys are typical of divergent continental boundaries.',
            'Incorrect. Hotspots are not defined by subduction zones.',
          ],
          seed: baseSeed + 70,
          subject,
        })
      );
      return questions;
    }
  }

  // 4) General GED-quality fallback: label-identification + plausible distractors from same-subject bank
  const bank = (subjectTermBank && subjectTermBank[subject]) || [];
  const correctLabel =
    (imageLabels.length ? imageLabels[baseSeed % imageLabels.length] : null) ||
    (keyTerms.length ? keyTerms[0] : null) ||
    null;

  if (correctLabel) {
    const distractors = pickDistractorsFromBank({
      bank,
      excludeSet: imageLabelSet,
      correct: correctLabel,
      seed: baseSeed + 900,
    });

    // Ensure we always have 3 distractors (fallback to generic-but-domain options only if needed)
    const domainFallback = {
      Math: [
        'quadratic equation',
        'slope-intercept form',
        'Pythagorean theorem',
      ],
      Science: ['photosynthesis', 'mitosis', "Newton's laws"],
      'Social Studies': [
        'Industrial Revolution',
        'Bill of Rights',
        'Great Depression',
      ],
      RLA: ['main idea', 'tone', 'context clues'],
      'Reasoning Through Language Arts (RLA)': [
        'main idea',
        'tone',
        'context clues',
      ],
    };
    const fallbackPool = domainFallback[subject] || [
      'main idea',
      'data table',
      'scientific method',
    ];
    while (distractors.length < 3) {
      const candidate =
        fallbackPool[(baseSeed + distractors.length) % fallbackPool.length];
      if (
        !imageLabelSet.has(String(candidate).toLowerCase()) &&
        String(candidate).toLowerCase() !== String(correctLabel).toLowerCase()
      ) {
        distractors.push(candidate);
      } else {
        distractors.push(`Unrelated term ${distractors.length + 1}`);
      }
    }

    questions.push(
      makeMcq({
        questionNumber: n++,
        difficulty: 'easy',
        imageUrl,
        passage,
        questionText: 'Which term or label appears in the visual?',
        correct: correctLabel,
        distractors,
        correctRationale:
          'Correct. This term/label is shown in the image text/labels or metadata.',
        distractorRationales: [
          'Incorrect. This term/label is not shown in the visual.',
          'Incorrect. This term/label is not shown in the visual.',
          'Incorrect. This term/label is not shown in the visual.',
        ],
        seed: baseSeed + 901,
        subject,
      })
    );

    // Medium: year presence if any years exist
    if (years.length) {
      const y = years[baseSeed % years.length];
      const yearDistractors = pickDistinctDistractors(
        [
          '1783',
          '1803',
          '1845',
          '1848',
          '1865',
          '1914',
          '1939',
          '1945',
          '1968',
          '1989',
          '2001',
          '2010',
          ...years,
        ],
        y,
        baseSeed + 902
      );
      questions.push(
        makeMcq({
          questionNumber: n++,
          difficulty: 'medium',
          imageUrl,
          passage,
          questionText: 'Which year appears in the visual text/labels?',
          correct: y,
          distractors: yearDistractors,
          correctRationale: `Correct. The year ${y} appears in the image text/labels.`,
          distractorRationales: yearDistractors.map(
            () => 'Incorrect. That year is not shown in the image text/labels.'
          ),
          seed: baseSeed + 903,
          subject,
        })
      );
    }

    // Hard: most-supported statement using two real labels (more GED-like reasoning)
    const l1 = imageLabels.length ? imageLabels[0] : correctLabel;
    const l2 = imageLabels.length >= 2 ? imageLabels[1] : keyTerms[1] || cat;
    const dPool = pickDistractorsFromBank({
      bank,
      excludeSet: imageLabelSet,
      correct: '__none__',
      seed: baseSeed + 904,
    });
    const d1 = dPool[0] || 'Unrelated topic 1';
    const d2 = dPool[1] || 'Unrelated topic 2';
    const d3 = dPool[2] || 'Unrelated topic 3';

    const hardCorrect = `${l1} and ${l2}`;
    const hardDistractors = [
      `${l1} and ${d1}`,
      `${d2} and ${l2}`,
      `${d3} and ${d1}`,
    ];

    questions.push(
      makeMcq({
        questionNumber: n++,
        difficulty: 'hard',
        imageUrl,
        passage,
        questionText: 'Which pair of labels both appears in the visual?',
        correct: hardCorrect,
        distractors: hardDistractors,
        correctRationale:
          'Correct. Both labels are shown in the image text/labels or metadata.',
        distractorRationales: [
          'Incorrect. One of these labels is not shown in the visual.',
          'Incorrect. One of these labels is not shown in the visual.',
          'Incorrect. One or both labels are not shown in the visual.',
        ],
        seed: baseSeed + 905,
        subject,
      })
    );

    return questions;
  }

  // If we still have nothing, skip.
  return [];
}

function main() {
  const subjectFilter = parseSubjectsArg(process.argv.slice(2));
  if (subjectFilter) {
    console.log(
      `[regen] Subject filter enabled: ${Array.from(subjectFilter).join(', ')}`
    );
  }
  // 0) Load and filter metadata based on actual image existence
  const metadata = loadJSON(METADATA_PATH);

  const missing = [];
  const present = [];
  for (const m of metadata) {
    const fp = String(m.filePath || '').trim();
    if (fp && fp.startsWith('/images/') && !imageExists(fp)) {
      missing.push(m);
    } else {
      present.push(m);
    }
  }

  fs.mkdirSync(path.join(WORKSPACE_ROOT, 'reports'), { recursive: true });
  fs.writeFileSync(
    path.join(WORKSPACE_ROOT, 'reports', 'missing-images-from-metadata.json'),
    JSON.stringify(
      missing.map((m) => ({
        filePath: m.filePath,
        fileName: m.fileName,
        subject: m.subject,
        category: m.category,
      })),
      null,
      2
    )
  );

  if (missing.length > 0) {
    console.log(
      `[regen] Found ${missing.length} metadata entries with missing images. Removing them from metadata.`
    );
    saveJSON(METADATA_PATH, present);
  } else {
    console.log('[regen] No missing images found in metadata.');
  }

  // 1) Select ~50% of remaining images (optionally filtered by subject)
  const filteredPresent = subjectFilter
    ? present.filter((m) => subjectFilter.has(String(m.subject || '').trim()))
    : present;

  const selectedImages = filteredPresent.filter((_, i) => i % 2 === 0);

  // Build per-subject term banks for plausible distractors
  const subjectTermBank = {};
  for (const img of present) {
    const subj = String(img.subject || '').trim();
    if (subjectFilter && !subjectFilter.has(subj)) continue;
    if (!subj) continue;
    if (!subjectTermBank[subj]) subjectTermBank[subj] = [];
    const labels = extractImageLabels(img);
    for (const l of labels) {
      subjectTermBank[subj].push(l);
    }
  }
  // Dedupe and cap size for performance
  for (const [subj, terms] of Object.entries(subjectTermBank)) {
    const seen = new Set();
    const unique = [];
    for (const t of terms) {
      const k = String(t).toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      unique.push(t);
      if (unique.length >= 2000) break;
    }
    subjectTermBank[subj] = unique;
  }

  // 2) Group by Subject -> Category
  const organized = {};
  selectedImages.forEach((img) => {
    const subj = img.subject;
    let cat = img.category || 'General';
    if (cat === '') cat = 'General';
    if (!organized[subj]) organized[subj] = {};
    if (!organized[subj][cat]) organized[subj][cat] = [];
    organized[subj][cat].push(img);
  });

  // 3) Load supplemental topics and remove previous generator entries
  let supplementalTopics = fs.existsSync(SUPPLEMENTAL_PATH)
    ? loadJSON(SUPPLEMENTAL_PATH)
    : [];

  const beforeCount = supplementalTopics.length;
  supplementalTopics = supplementalTopics.filter((t) => {
    const catName = t && t.categoryName;
    const topicId = t && t.topic && t.topic.id;
    const isGenerated = t && t.generatedBy === GENERATED_BY;
    const looksGenerated = typeof topicId === 'string' && /_img_/.test(topicId);
    if (isGenerated) {
      if (!subjectFilter) return false;
      const subj = String(t.subjectKey || '').trim();
      return !subjectFilter.has(subj);
    }
    // If it lives under our category and matches the pattern, treat it as ours.
    if (catName === NEW_CATEGORY_NAME && looksGenerated) {
      if (!subjectFilter) return false;
      const subj = String(t.subjectKey || '').trim();
      return !subjectFilter.has(subj);
    }
    return true;
  });

  const removedCount = beforeCount - supplementalTopics.length;
  if (removedCount > 0) {
    console.log(
      `[regen] Removed ${removedCount} old generated supplemental topic entries.`
    );
  }

  // 4) Generate topics
  let topicsWritten = 0;
  let questionsWritten = 0;
  let filesDeleted = 0;

  for (const [subject, categories] of Object.entries(organized)) {
    if (subjectFilter && !subjectFilter.has(String(subject || '').trim())) {
      continue;
    }
    const folderName = SUBJECT_FOLDERS[subject];
    if (!folderName) {
      console.warn(
        `[regen] No folder mapping for subject: ${subject}, skipping.`
      );
      continue;
    }

    const subjectDir = path.join(QUIZ_DATA_DIR, folderName);
    fs.mkdirSync(subjectDir, { recursive: true });

    for (const [metaCat, images] of Object.entries(categories)) {
      const topicId = `${slugifyTopicPart(subject)}_img_${slugifyTopicPart(
        metaCat
      )}`;
      const fileName = `${topicId}.js`;
      const filePath = path.join(subjectDir, fileName);

      // Build questions: 3 per image
      let qNum = 1;
      const questions = [];
      for (const img of images) {
        // Safety: skip if missing
        if (!img.filePath || !imageExists(img.filePath)) continue;
        const generated = generateThreeLevelQuestions(
          img,
          qNum,
          subjectTermBank
        );
        questions.push(...generated);
        qNum += generated.length;
      }

      if (questions.length === 0) {
        // Delete any stale topic file if present
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          filesDeleted++;
        }
        continue;
      }

      const fileContent = `module.exports = ${JSON.stringify(
        questions,
        null,
        2
      )};\n`;
      fs.writeFileSync(filePath, fileContent, 'utf8');
      topicsWritten++;
      questionsWritten += questions.length;

      supplementalTopics.push({
        subjectKey: subject,
        subjectFolder: folderName,
        categoryName: NEW_CATEGORY_NAME,
        generatedBy: GENERATED_BY,
        topic: {
          id: topicId,
          title: `${metaCat} Visual Practice`,
          description: `Image-based practice questions for ${metaCat}.`,
          config: {
            calculator: subject === 'Math' || subject === 'Science',
            parts: [
              { name: 'Visual Practice', questionCount: questions.length },
            ],
          },
          file: `backend/data/quizzes/${folderName}/${fileName}`,
        },
      });
    }
  }

  // 5) Save supplemental
  saveJSON(SUPPLEMENTAL_PATH, supplementalTopics);

  // 6) Cleanup: delete orphaned old generated topic files
  const referencedFiles = new Set(
    supplementalTopics
      .filter((t) => {
        if (!(t && t.generatedBy === GENERATED_BY && t.topic && t.topic.file))
          return false;
        if (!subjectFilter) return true;
        const subj = String(t.subjectKey || '').trim();
        return subjectFilter.has(subj);
      })
      .map((t) => {
        // topic.file is a workspace-relative path in our generator output
        const rel = String(t.topic.file).replace(/^[\\/]+/, '');
        return path.join(WORKSPACE_ROOT, rel);
      })
  );

  const subjectDirsToClean = Array.from(
    new Set(
      Object.entries(SUBJECT_FOLDERS)
        .filter(([subj]) => {
          if (!subjectFilter) return true;
          return subjectFilter.has(String(subj || '').trim());
        })
        .map(([, folder]) => path.join(QUIZ_DATA_DIR, folder))
    )
  ).filter((p) => fs.existsSync(p));

  for (const dir of subjectDirsToClean) {
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.js') && /_img_/.test(f));
    for (const f of files) {
      const abs = path.join(dir, f);
      if (!referencedFiles.has(abs)) {
        fs.unlinkSync(abs);
        filesDeleted++;
      }
    }
  }

  console.log(
    `[regen] Done. topicsWritten=${topicsWritten} questionsWritten=${questionsWritten} filesDeleted=${filesDeleted}`
  );
}

main();
