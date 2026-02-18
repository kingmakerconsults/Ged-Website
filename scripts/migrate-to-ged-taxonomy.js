#!/usr/bin/env node
/**
 * migrate-to-ged-taxonomy.js
 *
 * Reads supplemental.topics.json and rewrites each entry with:
 *   1. categoryName  → canonical GED domain  (via gedTaxonomy.js rules)
 *   2. topic.tier    → foundations | core | test-ready | challenge
 *   3. topic.title   → descriptive title  (replaces "Quiz 7" style names)
 *
 * Usage:
 *   node scripts/migrate-to-ged-taxonomy.js [--dry-run] [--stats]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// Inline the taxonomy rules (since gedTaxonomy.js uses ESM export syntax
// tied to frontend bundler, we duplicate the mapping here for Node)
// ---------------------------------------------------------------------------

const CATEGORY_TO_DOMAIN = {
  // Math
  'Number Sense & Operations': 'Number Sense & Operations',
  'Ratios & Proportions': 'Number Sense & Operations',
  'Ratios & Proportions / Percent Applications': 'Number Sense & Operations',
  'Quantitative Problem Solving': 'Number Sense & Operations',
  'Algebra & Linear Equations': 'Algebra & Functions',
  'Algebraic Reasoning': 'Algebra & Functions',
  'Algebraic Problem Solving': 'Algebra & Functions',
  'Algebraic Expressions & Linear Equations': 'Algebra & Functions',
  'Expressions & Equations': 'Algebra & Functions',
  'Expressions and Equations': 'Algebra & Functions',
  'Algebra': 'Algebra & Functions',
  'Graphs & Functions': 'Algebra & Functions',
  'Geometry & Measurement': 'Geometry & Measurement',
  'Geometry': 'Geometry & Measurement',
  'Measurement & Geometry': 'Geometry & Measurement',
  'Data, Statistics & Probability': 'Data Analysis & Probability',
  'Data Analysis & Probability': 'Data Analysis & Probability',
  'Interactive Demos': 'Interactive Demos',
  'Interactive Tool Demos': 'Interactive Demos',
  'Tool Demos': 'Interactive Demos',
  'Demos': 'Interactive Demos',
  // Science
  'Life Science': 'Life Science',
  'Physical Science': 'Physical Science',
  'Earth & Space Science': 'Earth & Space Science',
  'Earth and Space Science': 'Earth & Space Science',
  'Scientific Practices / Data Reasoning': 'Scientific Practices',
  'Scientific Practices': 'Scientific Practices',
  'Scientific Numeracy': 'Scientific Practices',
  'Science Topics': null,
  // Social Studies
  'Civics & Government': 'Civics & Government',
  'Civil Rights movement and modern era': 'U.S. History',
  'Civil War & Reconstruction': 'U.S. History',
  'Colonial era and early United States': 'U.S. History',
  'Westward expansion / industrialization': 'U.S. History',
  'Social Studies Topics': null,
  'U.S. History': 'U.S. History',
  'Economics / Geography': 'Economics',
  'Economics': 'Economics',
  'Geography and the World': 'Geography & the World',
  'Reading Primary / Secondary Sources': 'Civics & Government',
  // RLA
  'Main Idea': 'Reading Comprehension',
  'Evidence Selection': 'Reading Comprehension',
  'Inference, Tone, and Purpose': 'Reading Comprehension',
  'Vocabulary in Context': 'Reading Comprehension',
  'Reading Comprehension': 'Reading Comprehension',
  'Reading Comprehension: Informational Texts': 'Reading Comprehension',
  'Reading Comprehension: Literary Texts': 'Reading Comprehension',
  'Reading Comprehension: Paired Passages': 'Reading Comprehension',
  'Grammar, Clarity, and Revision': 'Language & Grammar',
  'Language & Grammar': 'Language & Grammar',
  'Language & Editing': 'Language & Grammar',
  'Language': 'Language & Grammar',
  'Editing': 'Language & Grammar',
  'Editing & Revision': 'Language & Grammar',
  'Language & Writing': 'Language & Grammar',
  'Writing / Extended Response': 'Writing & Analysis',
  'Essay Writing': 'Writing & Analysis',
  'Constructed Response': 'Writing & Analysis',
  'RLA Topics': null,
  'Math Concepts': null,
  // Cross-subject
  'Image Based Practice': 'Image Based Practice',
  'Diagnostic Composites': 'Diagnostic',
};

function domainFromQuizId(id, subject) {
  if (!id) return null;
  const lower = id.toLowerCase();
  if (/_img_/.test(lower) || lower.startsWith('img_')) return 'Image Based Practice';
  if (lower.startsWith('diag_')) return 'Diagnostic';
  if (/_tool_demo/.test(lower)) return 'Interactive Demos';

  if (subject === 'Math') {
    if (/math_number_sense|math_quant_basics|math_quant_numbers|math_quant_percents|math_quant_ratios|math_quant_fractions|math_ratios/.test(lower))
      return 'Number Sense & Operations';
    if (/math_alg|math_algebra|math_graphs/.test(lower))
      return 'Algebra & Functions';
    if (/math_geom|math_geometry/.test(lower))
      return 'Geometry & Measurement';
    if (/math_data|math_quant_stats|math_quant_bar/.test(lower))
      return 'Data Analysis & Probability';
    return 'Number Sense & Operations';
  }
  if (subject === 'Science') {
    if (/sci_life|sci_ecosystem|sci_genetics|sci_biology/.test(lower))
      return 'Life Science';
    if (/sci_physical|sci_chem|sci_physics/.test(lower))
      return 'Physical Science';
    if (/sci_earth|sci_space|sci_astro/.test(lower))
      return 'Earth & Space Science';
    if (/sci_data|sci_scientific|sci_numeracy/.test(lower))
      return 'Scientific Practices';
    return 'Physical Science';
  }
  if (subject === 'Social Studies') {
    if (/ss_civics|ss_constitution|ss_bill_of_rights|ss_gov|ss_judicial|ss_executive|ss_legislative|ss_separation|ss_federalism|ss_elections|ss_lawmaking|ss_supreme_court|ss_reading_sources/.test(lower))
      return 'Civics & Government';
    if (/ss_econ/.test(lower)) return 'Economics';
    if (/ss_geo/.test(lower)) return 'Geography & the World';
    return 'U.S. History';
  }
  if (subject === 'Reasoning Through Language Arts (RLA)' || subject === 'RLA') {
    if (/rla_extended_response|rla_writing/.test(lower))
      return 'Writing & Analysis';
    if (/rla_grammar|rla_lang|rla_conventions|rla_usage/.test(lower))
      return 'Language & Grammar';
    return 'Reading Comprehension';
  }
  return null;
}

function resolveDomain(category, quizId, subject) {
  const mapped = CATEGORY_TO_DOMAIN[category];
  if (mapped) return mapped;
  if (mapped === null || !category) {
    const idDomain = domainFromQuizId(quizId, subject);
    if (idDomain) return idDomain;
  }
  const idFallback = domainFromQuizId(quizId, subject);
  if (idFallback) return idFallback;
  return category || 'General';
}

function tierFromQuizId(id) {
  if (!id) return 'core';
  const lower = id.toLowerCase();
  if (lower.startsWith('diag_')) return 'test-ready';
  if (/_tool_demo/.test(lower)) return 'foundations';
  if (/_img_/.test(lower) || lower.startsWith('img_')) return 'core';

  const setMatch = lower.match(/_set(\d+)$/);
  if (setMatch) {
    const n = parseInt(setMatch[1], 10);
    if (n === 1) return 'foundations';
    if (n === 2) return 'core';
    if (n === 3) return 'test-ready';
    return 'challenge';
  }
  const quizNumMatch = lower.match(/_quiz[_]?(\d+)$/);
  if (quizNumMatch) {
    const n = parseInt(quizNumMatch[1], 10);
    if (n <= 1) return 'foundations';
    if (n <= 2) return 'core';
    if (n <= 3) return 'test-ready';
    return 'challenge';
  }
  const numMatch = lower.match(/_(\d{1,2})$/);
  if (numMatch) {
    const n = parseInt(numMatch[1], 10);
    if (n <= 3) return 'foundations';
    if (n <= 6) return 'core';
    if (n <= 9) return 'test-ready';
    return 'challenge';
  }
  if (/basics|fundamentals|core_quiz|intro|foundation/.test(lower)) return 'foundations';
  if (/advanced|composite|mastery/.test(lower)) return 'challenge';
  return 'core';
}

// ---------------------------------------------------------------------------
// Descriptive title generation
// ---------------------------------------------------------------------------

const TITLE_LOOKUP = {
  // ── Math numbered series ──
  math_algebra: 'Algebra & Linear Equations',
  math_data: 'Data, Statistics & Probability',
  math_geometry: 'Geometry & Measurement',
  math_graphs: 'Graphs & Functions',
  math_number_sense: 'Number Sense & Operations',
  math_ratios: 'Ratios & Proportions',
  // ── Science numbered series ──
  sci_life_science: 'Life Science',
  sci_physical_science: 'Physical Science',
  sci_earth_space: 'Earth & Space Science',
  sci_data_reasoning: 'Data Reasoning & Analysis',
  // ── RLA numbered series ──
  rla_evidence: 'Evidence Selection & Analysis',
  rla_grammar: 'Grammar, Clarity & Revision',
  rla_inference: 'Inference, Tone & Purpose',
  rla_main_idea: 'Main Idea & Supporting Details',
  rla_vocabulary: 'Vocabulary in Context',
};

const TIER_LABELS = {
  'foundations': 'Foundations',
  'core': 'Core Skills',
  'test-ready': 'Test Ready',
  'challenge': 'Challenge',
};

/** Generate a descriptive title from a quiz ID + domain */
function generateTitle(id, domain, tier) {
  if (!id) return domain || 'Practice Quiz';
  const lower = id.toLowerCase();

  // Try numbered series first: match prefix_NN
  for (const [prefix, baseName] of Object.entries(TITLE_LOOKUP)) {
    const re = new RegExp(`^${prefix}_(\\d{1,2})$`);
    const m = lower.match(re);
    if (m) {
      const num = parseInt(m[1], 10);
      const tierLabel = TIER_LABELS[tier] || '';
      return `${baseName}: Practice ${num} (${tierLabel})`;
    }
  }

  // Named quizzes — use ID-derived readable name
  const readable = id
    .replace(/^(math|sci|ss|rla|social_studies|us_history|diag)_/, '')
    .replace(/_/g, ' ')
    .replace(/\b(\w)/g, (_, c) => c.toUpperCase())
    .replace(/\bQuiz\s*(\d+)/i, 'Practice $1')
    .trim();

  if (readable) {
    // Append tier label for context
    const tierLabel = TIER_LABELS[tier] || '';
    return tierLabel ? `${readable} (${tierLabel})` : readable;
  }

  return domain || 'Practice Quiz';
}

// ---------------------------------------------------------------------------
// Main migration
// ---------------------------------------------------------------------------

function migrate(dryRun = false, showStats = false) {
  const filePath = path.join(root, 'backend', 'data', 'quizzes', 'supplemental.topics.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  const entries = JSON.parse(raw);

  const stats = {
    total: entries.length,
    categoryChanges: 0,
    titleChanges: 0,
    tiersAdded: 0,
    byDomain: {},
    byTier: {},
    unchanged: 0,
  };

  const migrated = entries.map((entry, idx) => {
    const { subjectKey, categoryName, topic } = entry;
    const quizId = topic?.id || '';

    // 1. Resolve new domain
    const newDomain = resolveDomain(categoryName, quizId, subjectKey);

    // 2. Determine tier
    const tier = tierFromQuizId(quizId);

    // 3. Generate descriptive title
    const oldTitle = topic?.title || '';
    let newTitle = generateTitle(quizId, newDomain, tier);

    // Keep the old title if it's already descriptive (not "Category: Quiz N" format)
    const isGenericTitle = /:\s*Quiz\s+\d+$/i.test(oldTitle) || !oldTitle;
    if (!isGenericTitle && oldTitle) {
      // Old title is descriptive — keep it but ensure tier suffix
      newTitle = oldTitle;
    }

    // Track stats
    if (newDomain !== categoryName) stats.categoryChanges++;
    if (newTitle !== oldTitle) stats.titleChanges++;
    stats.tiersAdded++;
    stats.byDomain[newDomain] = (stats.byDomain[newDomain] || 0) + 1;
    stats.byTier[tier] = (stats.byTier[tier] || 0) + 1;
    if (newDomain === categoryName && newTitle === oldTitle) stats.unchanged++;

    return {
      ...entry,
      categoryName: newDomain,
      _previousCategory: categoryName !== newDomain ? categoryName : undefined,
      topic: {
        ...topic,
        title: newTitle,
        tier,
        _previousTitle: newTitle !== oldTitle ? oldTitle : undefined,
      },
    };
  });

  if (showStats) {
    console.log('\n=== Migration Statistics ===');
    console.log(`Total entries:      ${stats.total}`);
    console.log(`Category changes:   ${stats.categoryChanges}`);
    console.log(`Title changes:      ${stats.titleChanges}`);
    console.log(`Unchanged:          ${stats.unchanged}`);
    console.log('\nBy Domain:');
    Object.entries(stats.byDomain)
      .sort((a, b) => b[1] - a[1])
      .forEach(([d, n]) => console.log(`  ${d}: ${n}`));
    console.log('\nBy Tier:');
    Object.entries(stats.byTier)
      .sort((a, b) => b[1] - a[1])
      .forEach(([t, n]) => console.log(`  ${t}: ${n}`));
  }

  if (dryRun) {
    console.log('\n[DRY RUN] No files modified.');
    // Show first 10 changes
    const changes = migrated.filter(e => e._previousCategory);
    console.log(`\nSample category changes (${Math.min(10, changes.length)} of ${changes.length}):`);
    changes.slice(0, 10).forEach(e => {
      console.log(`  ${e.topic.id}: "${e._previousCategory}" → "${e.categoryName}"`);
    });
    const titleChanges = migrated.filter(e => e.topic._previousTitle);
    console.log(`\nSample title changes (${Math.min(10, titleChanges.length)} of ${titleChanges.length}):`);
    titleChanges.slice(0, 10).forEach(e => {
      console.log(`  ${e.topic.id}: "${e.topic._previousTitle}" → "${e.topic.title}"`);
    });
    return;
  }

  // Clean up migration tracking fields before writing
  const cleaned = migrated.map(e => {
    const out = { ...e };
    delete out._previousCategory;
    if (out.topic) {
      out.topic = { ...out.topic };
      delete out.topic._previousTitle;
    }
    return out;
  });

  // Backup original
  const backupPath = filePath.replace('.json', '.pre-reorg-backup.json');
  if (!fs.existsSync(backupPath)) {
    fs.writeFileSync(backupPath, raw, 'utf8');
    console.log(`[BACKUP] ${backupPath}`);
  }

  fs.writeFileSync(filePath, JSON.stringify(cleaned, null, 2) + '\n', 'utf8');
  console.log(`[WRITE] ${filePath}`);
  console.log(`  ${stats.categoryChanges} category changes, ${stats.titleChanges} title changes, ${stats.tiersAdded} tiers added`);
}

// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const stats = args.includes('--stats');
migrate(dryRun, stats || dryRun);
