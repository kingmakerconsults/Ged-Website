/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const IMAGE_ROOT = path.join(ROOT, 'frontend', 'public', 'images');
const META_PATH = path.join(ROOT, 'backend', 'image_metadata_final.json');
const REPORTS_DIR = path.join(ROOT, 'reports');
const BASE_REPORT_PATH = path.join(REPORTS_DIR, 'image_metadata_audit.json');
const QUALITY_REPORT_PATH = path.join(
  REPORTS_DIR,
  'image_metadata_quality_audit.json'
);
const QUALITY_MARKDOWN_PATH = path.join(
  REPORTS_DIR,
  'image_metadata_quality_audit.md'
);

const GENERIC_ALT_PATTERNS = [
  /^an?\s+(image|picture|graphic|illustration|visual)\b/i,
  /^an?\s+(chart|graph|table|diagram|map|photo|document)\b[.!]?$/i,
  /^image showing\b/i,
  /^graphic showing\b/i,
];

const GENERIC_DESCRIPTION_PATTERNS = [
  /^this is\s+(an?|the)\s+/i,
  /^the image contains\b/i,
  /^the image shows\b/i,
  /^the image illustrates\b/i,
  /various data/i,
  /visually represent(s|ing)? the data/i,
  /different categories/i,
];

const GENERIC_SEED_PATTERNS = [
  /^what is shown in the image\??$/i,
  /^what does the image show\??$/i,
  /^identify the image\b/i,
  /^describe the image\b/i,
  /^which statement is supported by the image\??$/i,
];

const GENERIC_DIRECTIVE_PATTERNS = [
  /^use for questions\.?$/i,
  /^use for easy questions\.?$/i,
  /^use for medium questions\.?$/i,
  /^use for image questions\.?$/i,
  /^use for data questions\.?$/i,
];

const IMAGE_TYPE_RULES = {
  chart: {
    riskWeight: 28,
    markers: [
      'chart',
      'graph',
      'plot',
      'bar',
      'line',
      'scatter',
      'histogram',
      'pie',
    ],
    structureTerms: [
      'axis',
      'axes',
      'x-axis',
      'y-axis',
      'bar',
      'line',
      'slice',
      'legend',
      'category',
      'categories',
      'scale',
      'title',
      'label',
      'labels',
      'percentage',
      'percent',
      'data point',
      'trend',
      'series',
      'horizontal',
      'vertical',
    ],
    actionTerms: [
      'compare',
      'calculate',
      'identify',
      'interpret',
      'analyze',
      'estimate',
      'find',
    ],
    extractedTextRecommended: true,
  },
  table: {
    riskWeight: 26,
    markers: ['table', 'grid', 'spreadsheet', 'matrix'],
    structureTerms: [
      'table',
      'row',
      'rows',
      'column',
      'columns',
      'header',
      'headers',
      'cell',
      'cells',
      'value',
      'values',
      'label',
      'labels',
      'unit',
      'units',
    ],
    actionTerms: [
      'compare',
      'calculate',
      'identify',
      'locate',
      'find',
      'summarize',
      'analyze',
    ],
    extractedTextRecommended: true,
  },
  map: {
    riskWeight: 27,
    markers: [
      'map',
      'atlas',
      'geography',
      'route',
      'territory',
      'historical-map',
    ],
    structureTerms: [
      'map',
      'region',
      'regions',
      'state',
      'states',
      'country',
      'countries',
      'border',
      'borders',
      'boundary',
      'boundaries',
      'legend',
      'key',
      'compass',
      'label',
      'labels',
      'route',
      'routes',
      'shaded',
      'location',
      'locations',
    ],
    actionTerms: [
      'locate',
      'identify',
      'compare',
      'trace',
      'interpret',
      'analyze',
    ],
    extractedTextRecommended: true,
  },
  diagram: {
    riskWeight: 24,
    markers: [
      'diagram',
      'schema',
      'schematic',
      'cycle',
      'process',
      'cross-section',
      'model',
    ],
    structureTerms: [
      'diagram',
      'label',
      'labels',
      'arrow',
      'arrows',
      'part',
      'parts',
      'section',
      'sections',
      'layer',
      'layers',
      'process',
      'stage',
      'stages',
      'input',
      'output',
      'structure',
      'cycle',
    ],
    actionTerms: [
      'identify',
      'label',
      'trace',
      'explain',
      'compare',
      'sequence',
    ],
    extractedTextRecommended: true,
  },
  document: {
    riskWeight: 27,
    markers: [
      'document',
      'article',
      'newspaper',
      'letter',
      'poster',
      'flyer',
      'form',
      'excerpt',
    ],
    structureTerms: [
      'document',
      'headline',
      'title',
      'caption',
      'date',
      'source',
      'paragraph',
      'paragraphs',
      'column',
      'columns',
      'excerpt',
      'form',
      'signature',
      'stamp',
      'seal',
      'label',
      'labels',
    ],
    actionTerms: [
      'identify',
      'cite',
      'compare',
      'summarize',
      'analyze',
      'locate',
    ],
    extractedTextRecommended: true,
  },
  cartoon: {
    riskWeight: 26,
    markers: ['cartoon', 'comic', 'caricature'],
    structureTerms: [
      'cartoon',
      'speech bubble',
      'speech bubbles',
      'caption',
      'label',
      'labels',
      'figure',
      'figures',
      'symbol',
      'symbols',
      'scene',
      'panel',
      'panels',
      'sign',
      'signs',
    ],
    actionTerms: ['interpret', 'identify', 'analyze', 'compare', 'infer'],
    extractedTextRecommended: true,
  },
  photo: {
    riskWeight: 10,
    markers: ['photo', 'photograph', 'portrait', 'image', 'microscope'],
    structureTerms: [
      'photo',
      'photograph',
      'person',
      'people',
      'object',
      'objects',
      'foreground',
      'background',
      'setting',
      'scene',
      'action',
      'building',
      'landscape',
    ],
    actionTerms: ['identify', 'observe', 'compare', 'describe'],
    extractedTextRecommended: false,
  },
  illustration: {
    riskWeight: 18,
    markers: ['illustration', 'drawing', 'icon', 'visual'],
    structureTerms: [
      'illustration',
      'drawing',
      'label',
      'labels',
      'figure',
      'figures',
      'shape',
      'shapes',
      'symbol',
      'symbols',
      'section',
      'sections',
    ],
    actionTerms: ['identify', 'compare', 'describe', 'interpret'],
    extractedTextRecommended: false,
  },
};

function isImageFile(name) {
  return /\.(png|jpe?g|gif|webp|svg)$/i.test(name);
}

function normSubject(s) {
  s = String(s || '').trim();
  if (!s) return '';
  const map = {
    rla: 'RLA',
    'reasoning through language arts (rla)': 'RLA',
    'social studies': 'Social Studies',
    science: 'Science',
    math: 'Math',
  };
  return map[s.toLowerCase()] || s;
}

function makeKey(subject, fileName) {
  return `${normSubject(subject).toLowerCase()}|${String(fileName || '').toLowerCase()}`;
}

function listDiskImages() {
  const out = [];
  const subjects = fs.readdirSync(IMAGE_ROOT, { withFileTypes: true });
  for (const ent of subjects) {
    if (!ent.isDirectory()) continue;
    const subject = normSubject(ent.name);
    const dir = path.join(IMAGE_ROOT, ent.name);
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const f of files) {
      if (!f.isFile()) continue;
      if (!isImageFile(f.name)) continue;
      out.push({ subject, fileName: f.name, abs: path.join(dir, f.name) });
    }
  }
  return out;
}

function isIncomplete(entry) {
  return (
    !entry ||
    typeof entry !== 'object' ||
    !entry.altText ||
    !entry.detailedDescription ||
    !Array.isArray(entry.keywords) ||
    entry.keywords.length < 3
  );
}

function normalizeWhitespace(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeArray(values) {
  if (!Array.isArray(values)) return [];
  const seen = new Set();
  const out = [];
  for (const value of values) {
    const normalized = normalizeWhitespace(value);
    if (!normalized) continue;
    const key = normalized.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(normalized);
  }
  return out;
}

function safeLower(value) {
  return normalizeWhitespace(value).toLowerCase();
}

function tokenize(value) {
  return safeLower(value)
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length >= 4);
}

function countSentences(value) {
  return normalizeWhitespace(value)
    .split(/[.!?]+/)
    .map((part) => part.trim())
    .filter(Boolean).length;
}

function countMatches(text, terms) {
  const lowered = safeLower(text);
  let count = 0;
  for (const term of terms) {
    if (lowered.includes(String(term).toLowerCase())) count++;
  }
  return count;
}

function excerpt(value, maxLength = 160) {
  const normalized = normalizeWhitespace(value);
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, Math.max(0, maxLength - 3))}...`;
}

function detectImageType(entry) {
  const haystack = [
    entry.category,
    entry.fileName,
    entry.filePath,
    entry.altText,
    entry.detailedDescription,
    ...(Array.isArray(entry.visualElements) ? entry.visualElements : []),
    ...(Array.isArray(entry.keywords) ? entry.keywords : []),
  ]
    .map(safeLower)
    .join(' ');

  const orderedTypes = [
    'cartoon',
    'map',
    'chart',
    'table',
    'document',
    'diagram',
    'photo',
    'illustration',
  ];

  let bestType = 'illustration';
  let bestScore = -1;
  for (const type of orderedTypes) {
    const rule = IMAGE_TYPE_RULES[type];
    const score = rule.markers.reduce(
      (sum, marker) => sum + (haystack.includes(marker) ? 1 : 0),
      0
    );
    if (score > bestScore) {
      bestScore = score;
      bestType = type;
    }
  }

  return bestScore <= 0 ? 'illustration' : bestType;
}

function containsGenericPattern(value, patterns) {
  const normalized = normalizeWhitespace(value);
  return patterns.some((pattern) => pattern.test(normalized));
}

function buildTokenSet(entry) {
  const contentTokens = new Set();
  const sources = [
    entry.altText,
    entry.detailedDescription,
    entry.extractedText,
    ...(Array.isArray(entry.visualElements) ? entry.visualElements : []),
    ...(Array.isArray(entry.keywords) ? entry.keywords : []),
  ];
  for (const source of sources) {
    for (const token of tokenize(source)) {
      contentTokens.add(token);
    }
  }
  return contentTokens;
}

function pushIssue(issues, severity, code, message) {
  issues.push({ severity, code, message });
}

function severityWeight(severity) {
  if (severity === 'critical') return 25;
  if (severity === 'high') return 16;
  if (severity === 'medium') return 9;
  return 4;
}

function priorityBand(priorityScore) {
  if (priorityScore >= 55) return 'urgent';
  if (priorityScore >= 38) return 'high';
  if (priorityScore >= 22) return 'medium';
  return 'low';
}

function buildFieldStats(entry) {
  return {
    altTextLength: normalizeWhitespace(entry.altText).length,
    descriptionLength: normalizeWhitespace(entry.detailedDescription).length,
    descriptionSentences: countSentences(entry.detailedDescription),
    extractedTextLength: normalizeWhitespace(entry.extractedText).length,
    visualElementCount: normalizeArray(entry.visualElements).length,
    keywordCount: normalizeArray(entry.keywords).length,
    questionSeedCount: normalizeArray(entry.questionSeeds).length,
    usageDirectiveLength: normalizeWhitespace(entry.usageDirectives).length,
  };
}

function auditEntry(entry, duplicateTracker) {
  const normalizedEntry = {
    ...entry,
    subject: normSubject(entry.subject),
    altText: normalizeWhitespace(entry.altText),
    detailedDescription: normalizeWhitespace(entry.detailedDescription),
    extractedText: normalizeWhitespace(entry.extractedText),
    visualElements: normalizeArray(entry.visualElements),
    keywords: normalizeArray(entry.keywords),
    questionSeeds: normalizeArray(entry.questionSeeds),
    usageDirectives: normalizeWhitespace(entry.usageDirectives),
  };

  const imageType = detectImageType(normalizedEntry);
  const rule = IMAGE_TYPE_RULES[imageType] || IMAGE_TYPE_RULES.illustration;
  const fieldStats = buildFieldStats(normalizedEntry);
  const issues = [];
  const descriptionCorpus = [
    normalizedEntry.altText,
    normalizedEntry.detailedDescription,
    normalizedEntry.extractedText,
    normalizedEntry.visualElements.join(' '),
    normalizedEntry.keywords.join(' '),
  ].join(' ');

  if (fieldStats.altTextLength < 30) {
    pushIssue(
      issues,
      imageType === 'photo' ? 'medium' : 'high',
      'short-alt-text',
      'Alt text is too short to anchor question generation reliably.'
    );
  } else if (fieldStats.altTextLength > 125) {
    pushIssue(
      issues,
      'low',
      'alt-text-too-long',
      'Alt text is longer than the stated target and may stop being literal.'
    );
  }

  if (containsGenericPattern(normalizedEntry.altText, GENERIC_ALT_PATTERNS)) {
    pushIssue(
      issues,
      'high',
      'generic-alt-text',
      'Alt text uses a generic opener instead of literal image-specific wording.'
    );
  }

  if (fieldStats.descriptionLength < 120) {
    pushIssue(
      issues,
      imageType === 'photo' ? 'medium' : 'high',
      'short-description',
      'Detailed description is too short for a dense image record.'
    );
  }

  if (fieldStats.descriptionSentences < 2) {
    pushIssue(
      issues,
      'high',
      'too-few-description-sentences',
      'Detailed description should usually contain 2 to 4 sentences.'
    );
  } else if (fieldStats.descriptionSentences > 4) {
    pushIssue(
      issues,
      'low',
      'too-many-description-sentences',
      'Detailed description is longer than the preferred 2 to 4 sentence range.'
    );
  }

  if (
    containsGenericPattern(
      normalizedEntry.detailedDescription,
      GENERIC_DESCRIPTION_PATTERNS
    )
  ) {
    pushIssue(
      issues,
      'medium',
      'generic-description-language',
      'Detailed description leans on generic phrasing that often hides missing visual detail.'
    );
  }

  if (countMatches(descriptionCorpus, rule.structureTerms) < 2) {
    pushIssue(
      issues,
      imageType === 'photo' ? 'medium' : 'high',
      'missing-structural-detail',
      `Description does not mention enough ${imageType}-specific structure.`
    );
  }

  if (fieldStats.visualElementCount < 3) {
    pushIssue(
      issues,
      imageType === 'photo' ? 'low' : 'medium',
      'few-visual-elements',
      'Visual elements list is too thin to support retrieval and prompt grounding.'
    );
  }

  if (fieldStats.keywordCount < 6) {
    pushIssue(
      issues,
      'high',
      'few-keywords',
      'Keywords list is shorter than the target range for search and ranking.'
    );
  } else if (fieldStats.keywordCount > 15) {
    pushIssue(
      issues,
      'low',
      'many-keywords',
      'Keywords list is longer than the target range and may include filler terms.'
    );
  }

  if (fieldStats.questionSeedCount < 2) {
    pushIssue(
      issues,
      imageType === 'photo' ? 'medium' : 'high',
      'few-question-seeds',
      'Question seeds are missing or too sparse for controlled generation.'
    );
  }

  const contentTokens = buildTokenSet(normalizedEntry);
  let groundedSeedCount = 0;
  for (const seed of normalizedEntry.questionSeeds) {
    if (containsGenericPattern(seed, GENERIC_SEED_PATTERNS)) {
      pushIssue(
        issues,
        'medium',
        'generic-question-seed',
        `Question seed is too generic: "${excerpt(seed, 90)}"`
      );
      continue;
    }
    const tokens = tokenize(seed);
    if (tokens.some((token) => contentTokens.has(token))) groundedSeedCount++;
  }

  if (
    normalizedEntry.questionSeeds.length > 0 &&
    groundedSeedCount < Math.ceil(normalizedEntry.questionSeeds.length / 2)
  ) {
    pushIssue(
      issues,
      'medium',
      'weak-question-grounding',
      'Most question seeds do not reuse concrete labels or concepts from the image record.'
    );
  }

  if (!normalizedEntry.usageDirectives) {
    pushIssue(
      issues,
      'high',
      'missing-usage-directives',
      'Usage directives are empty, so generators are not told how to stay grounded.'
    );
  } else {
    if (fieldStats.usageDirectiveLength < 45) {
      pushIssue(
        issues,
        'medium',
        'short-usage-directives',
        'Usage directives are too short to meaningfully constrain question generation.'
      );
    }
    if (
      containsGenericPattern(
        normalizedEntry.usageDirectives,
        GENERIC_DIRECTIVE_PATTERNS
      )
    ) {
      pushIssue(
        issues,
        'medium',
        'generic-usage-directives',
        'Usage directives are generic and do not name allowed question moves.'
      );
    }
    if (countMatches(normalizedEntry.usageDirectives, rule.actionTerms) < 1) {
      pushIssue(
        issues,
        imageType === 'photo' ? 'low' : 'medium',
        'missing-allowed-actions',
        `Usage directives do not name obvious ${imageType}-appropriate question actions.`
      );
    }
  }

  if (
    rule.extractedTextRecommended &&
    fieldStats.extractedTextLength < 8 &&
    countMatches(descriptionCorpus, [
      'label',
      'labels',
      'title',
      'legend',
      'caption',
      'speech bubble',
      'header',
    ]) >= 1
  ) {
    pushIssue(
      issues,
      'high',
      'missing-extracted-text',
      'Image appears text-bearing, but extractedText is empty or too short.'
    );
  }

  if (fieldStats.extractedTextLength > 240) {
    pushIssue(
      issues,
      'low',
      'long-extracted-text',
      'Extracted text is longer than the preferred short-label range.'
    );
  }

  const duplicateKey = `${safeLower(normalizedEntry.altText)}||${safeLower(
    normalizedEntry.detailedDescription
  )}`;
  if (normalizedEntry.altText && normalizedEntry.detailedDescription) {
    if (!duplicateTracker.has(duplicateKey))
      duplicateTracker.set(duplicateKey, []);
    duplicateTracker.get(duplicateKey).push({
      subject: normalizedEntry.subject,
      fileName: normalizedEntry.fileName,
      filePath: normalizedEntry.filePath || '',
    });
  }

  const score = Math.max(
    0,
    100 - issues.reduce((sum, issue) => sum + severityWeight(issue.severity), 0)
  );
  const priorityScore = Math.min(
    100,
    Math.max(0, 100 - score + rule.riskWeight)
  );

  return {
    subject: normalizedEntry.subject,
    fileName: normalizedEntry.fileName,
    filePath:
      normalizedEntry.filePath ||
      `/images/${encodeURIComponent(normalizedEntry.subject)}/${encodeURIComponent(
        normalizedEntry.fileName || ''
      )}`.replace(/%2F/g, '/'),
    category: normalizeWhitespace(normalizedEntry.category),
    imageType,
    score,
    priorityScore,
    priorityBand: priorityBand(priorityScore),
    issueCount: issues.length,
    issues,
    fieldStats,
    excerpts: {
      altText: excerpt(normalizedEntry.altText, 140),
      detailedDescription: excerpt(normalizedEntry.detailedDescription, 220),
      usageDirectives: excerpt(normalizedEntry.usageDirectives, 180),
    },
  };
}

function summarizeQualityAudits(audits, duplicateGroups) {
  const summary = {
    totalEntries: audits.length,
    flaggedEntries: 0,
    urgent: 0,
    high: 0,
    medium: 0,
    low: 0,
    averageScore: 0,
    averagePriorityScore: 0,
    bySubject: {},
    byImageType: {},
    issueCodes: {},
    duplicateGroups: duplicateGroups.length,
  };

  let scoreTotal = 0;
  let priorityTotal = 0;
  for (const audit of audits) {
    scoreTotal += audit.score;
    priorityTotal += audit.priorityScore;

    if (audit.issueCount > 0) summary.flaggedEntries += 1;
    summary[audit.priorityBand] += 1;

    if (!summary.bySubject[audit.subject]) {
      summary.bySubject[audit.subject] = {
        total: 0,
        flagged: 0,
        averageScore: 0,
      };
    }
    if (!summary.byImageType[audit.imageType]) {
      summary.byImageType[audit.imageType] = {
        total: 0,
        flagged: 0,
        averageScore: 0,
      };
    }

    summary.bySubject[audit.subject].total += 1;
    summary.byImageType[audit.imageType].total += 1;
    summary.bySubject[audit.subject].averageScore += audit.score;
    summary.byImageType[audit.imageType].averageScore += audit.score;

    if (audit.issueCount > 0) {
      summary.bySubject[audit.subject].flagged += 1;
      summary.byImageType[audit.imageType].flagged += 1;
    }

    for (const issue of audit.issues) {
      summary.issueCodes[issue.code] =
        (summary.issueCodes[issue.code] || 0) + 1;
    }
  }

  summary.averageScore = audits.length
    ? Number((scoreTotal / audits.length).toFixed(2))
    : 0;
  summary.averagePriorityScore = audits.length
    ? Number((priorityTotal / audits.length).toFixed(2))
    : 0;

  for (const bucket of Object.values(summary.bySubject)) {
    bucket.averageScore = bucket.total
      ? Number((bucket.averageScore / bucket.total).toFixed(2))
      : 0;
  }
  for (const bucket of Object.values(summary.byImageType)) {
    bucket.averageScore = bucket.total
      ? Number((bucket.averageScore / bucket.total).toFixed(2))
      : 0;
  }

  return summary;
}

function buildMarkdownReport(summary, priorityQueue, duplicateGroups) {
  const lines = [];
  lines.push('# Image Metadata Quality Audit');
  lines.push('');
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push(`- Total entries: ${summary.totalEntries}`);
  lines.push(`- Flagged entries: ${summary.flaggedEntries}`);
  lines.push(`- Average score: ${summary.averageScore}`);
  lines.push(`- Average priority score: ${summary.averagePriorityScore}`);
  lines.push(`- Urgent: ${summary.urgent}`);
  lines.push(`- High: ${summary.high}`);
  lines.push(`- Medium: ${summary.medium}`);
  lines.push(`- Low: ${summary.low}`);
  lines.push(`- Duplicate groups: ${summary.duplicateGroups}`);
  lines.push('');
  lines.push('## By Subject');
  lines.push('');
  for (const [subject, bucket] of Object.entries(summary.bySubject).sort(
    (a, b) => {
      return b[1].flagged - a[1].flagged || a[0].localeCompare(b[0]);
    }
  )) {
    lines.push(
      `- ${subject}: ${bucket.flagged}/${bucket.total} flagged, average score ${bucket.averageScore}`
    );
  }
  lines.push('');
  lines.push('## By Image Type');
  lines.push('');
  for (const [imageType, bucket] of Object.entries(summary.byImageType).sort(
    (a, b) => {
      return b[1].flagged - a[1].flagged || a[0].localeCompare(b[0]);
    }
  )) {
    lines.push(
      `- ${imageType}: ${bucket.flagged}/${bucket.total} flagged, average score ${bucket.averageScore}`
    );
  }
  lines.push('');
  lines.push('## Top Issue Codes');
  lines.push('');
  for (const [code, count] of Object.entries(summary.issueCodes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)) {
    lines.push(`- ${code}: ${count}`);
  }
  lines.push('');
  lines.push('## Priority Queue');
  lines.push('');
  for (const entry of priorityQueue.slice(0, 50)) {
    const issueList = entry.issues
      .slice(0, 3)
      .map((issue) => `${issue.code} (${issue.severity})`)
      .join(', ');
    lines.push(
      `- [${entry.priorityBand}] ${entry.subject}/${entry.fileName} | ${entry.imageType} | score ${entry.score} | priority ${entry.priorityScore} | ${issueList}`
    );
  }

  if (duplicateGroups.length > 0) {
    lines.push('');
    lines.push('## Duplicate Metadata Groups');
    lines.push('');
    for (const group of duplicateGroups.slice(0, 25)) {
      const members = group.entries
        .map((entry) => `${entry.subject}/${entry.fileName}`)
        .join(', ');
      lines.push(`- ${members}`);
    }
  }

  lines.push('');
  lines.push('## Next Steps');
  lines.push('');
  lines.push(
    '- Re-run targeted metadata generation with --refresh --from-audit on the priority queue.'
  );
  lines.push(
    '- Manually vet the urgent chart, table, map, diagram, document, and cartoon entries first.'
  );
  lines.push(
    '- Re-run this audit after each metadata batch to measure score changes.'
  );
  lines.push('');
  return `${lines.join('\n')}\n`;
}

function main() {
  if (!fs.existsSync(META_PATH)) {
    console.error('Metadata file not found:', META_PATH);
    process.exit(1);
  }

  const meta = JSON.parse(fs.readFileSync(META_PATH, 'utf8'));
  if (!Array.isArray(meta)) {
    console.error('Metadata is not an array.');
    process.exit(1);
  }

  const disk = listDiskImages();

  const diskKeys = new Set(disk.map((f) => makeKey(f.subject, f.fileName)));
  const metaKeys = new Set(meta.map((m) => makeKey(m.subject, m.fileName)));

  const missingMetadataForFiles = disk
    .filter((f) => !metaKeys.has(makeKey(f.subject, f.fileName)))
    .map((f) => ({ subject: f.subject, fileName: f.fileName }));

  const metadataEntriesMissingFiles = meta
    .filter((m) => !diskKeys.has(makeKey(m.subject, m.fileName)))
    .map((m) => ({
      subject: normSubject(m.subject),
      fileName: String(m.fileName || ''),
    }));

  const incompleteMetadataEntries = meta
    .filter((m) => isIncomplete(m))
    .map((m) => ({
      subject: normSubject(m.subject),
      fileName: String(m.fileName || ''),
    }));

  const summary = {
    imageFilesOnDisk: disk.length,
    metadataEntries: meta.length,
    missingMetadataForFiles: missingMetadataForFiles.length,
    metadataEntriesMissingFiles: metadataEntriesMissingFiles.length,
    incompleteMetadataEntries: incompleteMetadataEntries.length,
  };

  const duplicateTracker = new Map();
  const qualityAudits = meta.map((entry) =>
    auditEntry(entry, duplicateTracker)
  );
  const duplicateGroups = Array.from(duplicateTracker.entries())
    .filter(([key, entries]) => key !== '||' && entries.length > 1)
    .map(([, entries]) => ({ entries }))
    .sort((a, b) => b.entries.length - a.entries.length);

  const duplicatesByMember = new Map();
  for (const group of duplicateGroups) {
    for (const entry of group.entries) {
      duplicatesByMember.set(
        makeKey(entry.subject, entry.fileName),
        group.entries
      );
    }
  }

  for (const audit of qualityAudits) {
    const duplicates = duplicatesByMember.get(
      makeKey(audit.subject, audit.fileName)
    );
    if (duplicates && duplicates.length > 1) {
      audit.issues.push({
        severity: 'medium',
        code: 'duplicate-metadata',
        message: `Metadata matches ${duplicates.length - 1} other record(s).`,
      });
      audit.issueCount = audit.issues.length;
      audit.score = Math.max(0, audit.score - severityWeight('medium'));
      audit.priorityScore = Math.min(
        100,
        Math.max(
          0,
          100 -
            audit.score +
            (IMAGE_TYPE_RULES[audit.imageType] || IMAGE_TYPE_RULES.illustration)
              .riskWeight
        )
      );
      audit.priorityBand = priorityBand(audit.priorityScore);
    }
  }

  const priorityQueue = qualityAudits
    .filter((audit) => audit.issueCount > 0)
    .sort((a, b) => {
      if (b.priorityScore !== a.priorityScore)
        return b.priorityScore - a.priorityScore;
      if (a.score !== b.score) return a.score - b.score;
      return `${a.subject}/${a.fileName}`.localeCompare(
        `${b.subject}/${b.fileName}`
      );
    });

  const qualitySummary = summarizeQualityAudits(qualityAudits, duplicateGroups);
  const qualityReport = {
    generatedAt: new Date().toISOString(),
    source: {
      metadataPath: path.relative(ROOT, META_PATH).replace(/\\/g, '/'),
      imageRoot: path.relative(ROOT, IMAGE_ROOT).replace(/\\/g, '/'),
    },
    thresholds: {
      passingScore: 80,
      urgentPriorityScore: 55,
      highPriorityScore: 38,
      mediumPriorityScore: 22,
    },
    summary: qualitySummary,
    priorityQueue,
    duplicateGroups,
    entries: qualityAudits,
  };

  fs.mkdirSync(REPORTS_DIR, { recursive: true });
  fs.writeFileSync(
    BASE_REPORT_PATH,
    JSON.stringify(
      {
        summary,
        missingMetadataForFiles,
        metadataEntriesMissingFiles,
        incompleteMetadataEntries,
      },
      null,
      2
    )
  );
  fs.writeFileSync(QUALITY_REPORT_PATH, JSON.stringify(qualityReport, null, 2));
  fs.writeFileSync(
    QUALITY_MARKDOWN_PATH,
    buildMarkdownReport(qualitySummary, priorityQueue, duplicateGroups)
  );

  console.log(JSON.stringify(summary, null, 2));
  console.log(
    JSON.stringify(
      {
        qualitySummary: {
          totalEntries: qualitySummary.totalEntries,
          flaggedEntries: qualitySummary.flaggedEntries,
          urgent: qualitySummary.urgent,
          high: qualitySummary.high,
          medium: qualitySummary.medium,
          low: qualitySummary.low,
          averageScore: qualitySummary.averageScore,
          averagePriorityScore: qualitySummary.averagePriorityScore,
          duplicateGroups: qualitySummary.duplicateGroups,
        },
        qualityReport: path
          .relative(ROOT, QUALITY_REPORT_PATH)
          .replace(/\\/g, '/'),
        qualityMarkdown: path
          .relative(ROOT, QUALITY_MARKDOWN_PATH)
          .replace(/\\/g, '/'),
      },
      null,
      2
    )
  );
}

main();
