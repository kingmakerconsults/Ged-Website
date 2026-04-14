const fs = require('fs');
const path = require('path');

const {
  SCIENCE_CURATED_IMAGE_BANK,
} = require('../../data/scienceCuratedImageBank');
const {
  SOCIAL_STUDIES_IMAGE_QUESTION_BANK,
} = require('../../data/socialStudiesImageQuestionBank');
const {
  SOCIAL_STUDIES_IMAGE_QUESTION_SETS,
} = require('../../data/socialStudiesImageQuestionSets');

function readJsonSafe(filePath) {
  try {
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function normalizeImageSubject(rawSubject) {
  const subject = String(rawSubject || '')
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!subject) return '';
  if (/^social\s*studies$/i.test(subject)) return 'Social Studies';
  if (/^reasoning through language arts(?: \(rla\))?$/i.test(subject)) {
    return 'RLA';
  }
  if (/^rla$/i.test(subject)) return 'RLA';
  if (/^science$/i.test(subject)) return 'Science';
  if (/^math$/i.test(subject)) return 'Math';
  return subject;
}

function canonicalizeImageAssetPath(rawPath) {
  if (!rawPath || typeof rawPath !== 'string') return '';
  let clean = rawPath.split(/[?#]/, 1)[0].trim().replace(/\\/g, '/');
  if (!clean) return '';

  const publicMarker = '/frontend/public/';
  const publicMarkerIndex = clean.toLowerCase().indexOf(publicMarker);
  if (publicMarkerIndex >= 0) {
    clean = clean.slice(publicMarkerIndex + publicMarker.length);
  }

  clean = clean.replace(/^\/?frontend\//i, '');
  clean = clean.replace(/^\/+/, '');
  clean = `/${clean}`;

  let decoded = clean;
  try {
    decoded = decodeURIComponent(clean);
  } catch {}

  const segments = decoded
    .replace(/\\/g, '/')
    .split('/')
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment));

  return segments.length ? `/${segments.join('/')}` : '';
}

function decodeImageAssetPath(rawPath) {
  const canonical = canonicalizeImageAssetPath(rawPath);
  if (!canonical) return '';
  try {
    return decodeURIComponent(canonical);
  } catch {
    return canonical;
  }
}

function getImagePathAliases(rawPath) {
  const aliases = new Set();
  const trimmed =
    typeof rawPath === 'string' ? rawPath.trim().replace(/\\/g, '/') : '';
  const canonical = canonicalizeImageAssetPath(rawPath);
  const decoded = decodeImageAssetPath(rawPath);

  const addAlias = (value) => {
    const normalized = String(value || '')
      .trim()
      .replace(/\\/g, '/');
    if (!normalized) return;
    aliases.add(normalized);
    aliases.add(normalized.replace(/^\/+/, ''));
  };

  addAlias(trimmed);
  addAlias(trimmed.replace(/^\/?frontend/i, ''));
  addAlias(canonical);
  addAlias(decoded);

  return Array.from(aliases);
}

function inferSubjectFromPath(filePath) {
  const decodedPath = decodeImageAssetPath(filePath).toLowerCase();
  if (decodedPath.includes('/images/social studies/')) return 'Social Studies';
  if (decodedPath.includes('/images/science/')) return 'Science';
  if (decodedPath.includes('/images/math/')) return 'Math';
  if (decodedPath.includes('/images/rla/')) return 'RLA';
  return '';
}

function buildImagePathFromParts(subject, fileName) {
  const normalizedSubject = normalizeImageSubject(subject || 'Misc');
  const normalizedFileName = String(fileName || '').trim();
  if (!normalizedFileName) return '';
  return canonicalizeImageAssetPath(
    `/images/${normalizedSubject}/${normalizedFileName}`
  );
}

function uniqueStrings(values = []) {
  const seen = new Set();
  const output = [];

  for (const value of values) {
    const normalized = String(value || '').trim();
    if (!normalized) continue;
    const key = normalized.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    output.push(normalized);
  }

  return output;
}

function cloneQuestions(questions = []) {
  return questions.map((question) => ({
    ...question,
    answerOptions: Array.isArray(question?.answerOptions)
      ? question.answerOptions.map((option) => ({ ...option }))
      : [],
  }));
}

function pickPrimaryText(primary, fallback) {
  const preferred = String(primary || '').trim();
  if (preferred) return preferred;
  return String(fallback || '').trim();
}

function mergeStringArrays(primary, secondary) {
  return uniqueStrings([
    ...(Array.isArray(primary) ? primary : []),
    ...(Array.isArray(secondary) ? secondary : []),
  ]);
}

function normalizeCatalogEntry(entry = {}, subjectHint = '') {
  const normalizedSubject = normalizeImageSubject(
    entry.subject || subjectHint || ''
  );
  const filePath =
    canonicalizeImageAssetPath(
      entry.filePath || entry.src || entry.path || ''
    ) || buildImagePathFromParts(normalizedSubject, entry.fileName);
  const fileName = String(
    entry.fileName ||
      (filePath ? path.posix.basename(decodeImageAssetPath(filePath)) : '')
  ).trim();

  return {
    ...entry,
    filePath,
    fileName,
    subject: normalizeImageSubject(
      normalizedSubject || inferSubjectFromPath(filePath)
    ),
    category: String(entry.category || '').trim(),
    altText: String(entry.altText || '').trim(),
    detailedDescription: String(entry.detailedDescription || '').trim(),
    extractedText: String(entry.extractedText || '').trim(),
    usageDirectives: String(entry.usageDirectives || '').trim(),
    visualElements: mergeStringArrays(entry.visualElements, []),
    keywords: mergeStringArrays(entry.keywords, []),
    questionSeeds: mergeStringArrays(entry.questionSeeds, []),
    subjectAreas: mergeStringArrays(entry.subjectAreas, []),
    topicTags: mergeStringArrays(entry.topicTags, []),
    stimulusTypes: mergeStringArrays(entry.stimulusTypes, []),
    relatedSkills: mergeStringArrays(entry.relatedSkills, []),
    reasoningModes: mergeStringArrays(entry.reasoningModes, []),
    allowedQuestionMoves: mergeStringArrays(entry.allowedQuestionMoves, []),
    forbiddenInferences: mergeStringArrays(entry.forbiddenInferences, []),
    toolsAllowed: mergeStringArrays(entry.toolsAllowed, []),
    __metadataSources: mergeStringArrays(entry.__metadataSources, []),
  };
}

function mergeCatalogEntry(base = {}, incoming = {}) {
  const merged = {
    ...base,
    ...incoming,
    filePath: incoming.filePath || base.filePath || '',
    fileName: incoming.fileName || base.fileName || '',
    subject: normalizeImageSubject(
      base.subject ||
        incoming.subject ||
        inferSubjectFromPath(incoming.filePath)
    ),
    category: pickPrimaryText(base.category, incoming.category),
    altText: pickPrimaryText(base.altText, incoming.altText),
    detailedDescription: pickPrimaryText(
      base.detailedDescription,
      incoming.detailedDescription
    ),
    extractedText: pickPrimaryText(base.extractedText, incoming.extractedText),
    usageDirectives: pickPrimaryText(
      base.usageDirectives,
      incoming.usageDirectives
    ),
    visualElements: mergeStringArrays(
      base.visualElements,
      incoming.visualElements
    ),
    keywords: mergeStringArrays(base.keywords, incoming.keywords),
    questionSeeds: mergeStringArrays(
      base.questionSeeds,
      incoming.questionSeeds
    ),
    subjectAreas: mergeStringArrays(base.subjectAreas, incoming.subjectAreas),
    topicTags: mergeStringArrays(base.topicTags, incoming.topicTags),
    stimulusTypes: mergeStringArrays(
      base.stimulusTypes,
      incoming.stimulusTypes
    ),
    relatedSkills: mergeStringArrays(
      base.relatedSkills,
      incoming.relatedSkills
    ),
    reasoningModes: mergeStringArrays(
      base.reasoningModes,
      incoming.reasoningModes
    ),
    allowedQuestionMoves: mergeStringArrays(
      base.allowedQuestionMoves,
      incoming.allowedQuestionMoves
    ),
    forbiddenInferences: mergeStringArrays(
      base.forbiddenInferences,
      incoming.forbiddenInferences
    ),
    toolsAllowed: mergeStringArrays(base.toolsAllowed, incoming.toolsAllowed),
    __metadataSources: mergeStringArrays(
      base.__metadataSources,
      incoming.__metadataSources
    ),
  };

  if (base.questions) merged.questions = cloneQuestions(base.questions);
  if (!merged.questions && incoming.questions) {
    merged.questions = cloneQuestions(incoming.questions);
  }

  if (merged.qualityRank == null && incoming.qualityRank != null) {
    merged.qualityRank = incoming.qualityRank;
  }
  if (merged.width == null && incoming.width != null)
    merged.width = incoming.width;
  if (merged.height == null && incoming.height != null) {
    merged.height = incoming.height;
  }
  if (!merged.id && incoming.id) merged.id = incoming.id;
  if (!merged.sourceUrl && incoming.sourceUrl)
    merged.sourceUrl = incoming.sourceUrl;
  if (!merged.sourceTitle && incoming.sourceTitle) {
    merged.sourceTitle = incoming.sourceTitle;
  }
  if (!merged.sourcePublished && incoming.sourcePublished) {
    merged.sourcePublished = incoming.sourcePublished;
  }
  if (!merged.license && incoming.license) merged.license = incoming.license;
  if (!merged.collectedAt && incoming.collectedAt) {
    merged.collectedAt = incoming.collectedAt;
  }

  if (base.metadataQuality || incoming.metadataQuality) {
    merged.metadataQuality = {
      ...(incoming.metadataQuality &&
      typeof incoming.metadataQuality === 'object'
        ? incoming.metadataQuality
        : {}),
      ...(base.metadataQuality && typeof base.metadataQuality === 'object'
        ? base.metadataQuality
        : {}),
    };
  }

  return merged;
}

function applyOverlayEntry(
  map,
  rawPath,
  overlay,
  sourceLabel,
  subjectHint = ''
) {
  const filePath = canonicalizeImageAssetPath(rawPath);
  if (!filePath) return;

  const existing =
    map.get(filePath) || normalizeCatalogEntry({ filePath }, subjectHint);
  const normalizedOverlay = normalizeCatalogEntry(
    {
      filePath,
      subject: subjectHint || existing.subject,
      category: overlay?.category,
      questionSeeds: overlay?.questionSeeds,
      usageDirectives: overlay?.usageDirectives,
      subjectAreas: overlay?.subjectAreas,
      topicTags: overlay?.topicTags,
      stimulusTypes: overlay?.stimulusTypes,
      relatedSkills: overlay?.relatedSkills,
      reasoningModes: overlay?.reasoningModes,
      allowedQuestionMoves: overlay?.allowedQuestionMoves,
      forbiddenInferences: overlay?.forbiddenInferences,
      toolsAllowed: overlay?.toolsAllowed,
      qualityRank: overlay?.qualityRank,
      questions: overlay?.questions,
      __metadataSources: [sourceLabel],
    },
    subjectHint
  );

  const merged = mergeCatalogEntry(existing, normalizedOverlay);

  merged.questionSeeds = mergeStringArrays(
    normalizedOverlay.questionSeeds,
    existing.questionSeeds
  );
  merged.usageDirectives = pickPrimaryText(
    normalizedOverlay.usageDirectives,
    existing.usageDirectives
  );
  merged.subjectAreas = mergeStringArrays(
    normalizedOverlay.subjectAreas,
    existing.subjectAreas
  );
  merged.topicTags = mergeStringArrays(
    normalizedOverlay.topicTags,
    existing.topicTags
  );
  merged.stimulusTypes = mergeStringArrays(
    normalizedOverlay.stimulusTypes,
    existing.stimulusTypes
  );
  merged.relatedSkills = mergeStringArrays(
    normalizedOverlay.relatedSkills,
    existing.relatedSkills
  );
  merged.reasoningModes = mergeStringArrays(
    normalizedOverlay.reasoningModes,
    existing.reasoningModes
  );
  merged.allowedQuestionMoves = mergeStringArrays(
    normalizedOverlay.allowedQuestionMoves,
    existing.allowedQuestionMoves
  );
  merged.forbiddenInferences = mergeStringArrays(
    normalizedOverlay.forbiddenInferences,
    existing.forbiddenInferences
  );
  merged.toolsAllowed = mergeStringArrays(
    normalizedOverlay.toolsAllowed,
    existing.toolsAllowed
  );

  if (
    Array.isArray(overlay?.questions) &&
    overlay.questions.length &&
    !Array.isArray(existing.questions)
  ) {
    merged.questions = cloneQuestions(overlay.questions);
  }

  if (normalizedOverlay.qualityRank != null) {
    merged.qualityRank = normalizedOverlay.qualityRank;
  }

  map.set(filePath, merged);
}

function computeGroundingStrength(entry) {
  let score = 0;
  if (entry.altText) score += 1;
  if (entry.detailedDescription) score += 2;
  if (entry.extractedText) score += 1;
  if (Array.isArray(entry.keywords) && entry.keywords.length) score += 1;
  if (Array.isArray(entry.questionSeeds) && entry.questionSeeds.length) {
    score += Math.min(3, entry.questionSeeds.length);
  }
  if (entry.usageDirectives) score += 2;
  if (Array.isArray(entry.questions) && entry.questions.length) score += 4;
  if (Array.isArray(entry.subjectAreas) && entry.subjectAreas.length)
    score += 1;
  if (Array.isArray(entry.topicTags) && entry.topicTags.length) score += 1;
  if (Array.isArray(entry.stimulusTypes) && entry.stimulusTypes.length) {
    score += 1;
  }
  if (entry.qualityRank != null) score += 1;
  return score;
}

function finalizeEntry(entry, assetExists) {
  const finalized = normalizeCatalogEntry(entry, entry.subject);
  if (typeof assetExists === 'function') {
    finalized.__exists = assetExists(finalized.filePath);
  } else if (finalized.__exists == null) {
    finalized.__exists = true;
  }

  finalized.__groundingStrength = computeGroundingStrength(finalized);
  finalized.__metadataSources = mergeStringArrays(
    finalized.__metadataSources,
    []
  );

  return finalized;
}

function loadMergedImageMetadata({ backendDir, assetExists } = {}) {
  const resolvedBackendDir = backendDir || path.resolve(__dirname, '..', '..');
  const canonicalPath = path.join(
    resolvedBackendDir,
    'image_metadata_final.json'
  );
  const secondaryPath = path.join(
    resolvedBackendDir,
    'data',
    'image_metadata_final.json'
  );

  const map = new Map();

  for (const item of readJsonSafe(canonicalPath)) {
    const normalized = normalizeCatalogEntry(
      { ...item, __metadataSources: ['canonical-json'] },
      item?.subject
    );
    if (!normalized.filePath) continue;
    map.set(normalized.filePath, normalized);
  }

  for (const item of readJsonSafe(secondaryPath)) {
    const normalized = normalizeCatalogEntry(
      { ...item, __metadataSources: ['secondary-json'] },
      item?.subject
    );
    if (!normalized.filePath) continue;
    const existing = map.get(normalized.filePath);
    map.set(
      normalized.filePath,
      existing ? mergeCatalogEntry(existing, normalized) : normalized
    );
  }

  for (const [filePath, overlay] of Object.entries(
    SCIENCE_CURATED_IMAGE_BANK || {}
  )) {
    applyOverlayEntry(
      map,
      filePath,
      overlay,
      'science-curated-bank',
      'Science'
    );
  }

  for (const [filePath, overlay] of Object.entries(
    SOCIAL_STUDIES_IMAGE_QUESTION_BANK || {}
  )) {
    applyOverlayEntry(
      map,
      filePath,
      overlay,
      'social-studies-question-bank',
      'Social Studies'
    );
  }

  for (const [filePath, overlay] of Object.entries(
    SOCIAL_STUDIES_IMAGE_QUESTION_SETS || {}
  )) {
    applyOverlayEntry(
      map,
      filePath,
      overlay,
      'social-studies-question-set',
      'Social Studies'
    );
  }

  return Array.from(map.values())
    .map((entry) => finalizeEntry(entry, assetExists))
    .sort((left, right) => {
      const leftSubject = String(left.subject || '').toLowerCase();
      const rightSubject = String(right.subject || '').toLowerCase();
      if (leftSubject < rightSubject) return -1;
      if (leftSubject > rightSubject) return 1;
      return String(left.fileName || '').localeCompare(
        String(right.fileName || '')
      );
    });
}

function buildImageMetadataMap(items = []) {
  const byPath = new Map();
  for (const item of items) {
    if (!item || typeof item !== 'object') continue;
    const rawPath = item.filePath || item.src || item.path;
    for (const alias of getImagePathAliases(rawPath)) {
      byPath.set(alias, item);
    }
  }
  return byPath;
}

module.exports = {
  buildImageMetadataMap,
  canonicalizeImageAssetPath,
  decodeImageAssetPath,
  getImagePathAliases,
  loadMergedImageMetadata,
  normalizeImageSubject,
};
