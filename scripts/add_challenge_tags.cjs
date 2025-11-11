#!/usr/bin/env node
/**
 * ADD CHALLENGE TAGS TO EXTRACTED QUIZZES
 *
 * Automatically adds appropriate challenge_tags to questions based on:
 * - Subject (math, science, rla, social studies)
 * - Topic/category keywords
 * - Question content analysis
 */

const fs = require('fs');
const path = require('path');

const BACKEND_QUIZZES = path.join(
  __dirname,
  '..',
  'backend',
  'data',
  'quizzes'
);
const FOLDERS = ['math', 'science', 'social-studies', 'rla'];

// Challenge tag mapping based on subject and topic patterns
const TAG_PATTERNS = {
  math: {
    // math-1: Basic arithmetic, fractions, decimals, percentages
    'math-1': [
      'quant_basics',
      'fractions',
      'decimals',
      'percents',
      'ratios',
      'number',
    ],
    // math-2: Word problems and real-world applications
    'math-2': ['word_problem', 'real_world', 'application'],
    // math-3: Pre-algebra (expressions, equations, inequalities)
    'math-3': ['alg_expressions', 'equations', 'inequalities', 'algebra'],
    // math-4: Graphing and functions
    'math-4': ['graphing', 'functions', 'coordinate', 'linear'],
    // math-5: Geometry (shapes, area, volume, angles)
    'math-5': [
      'geom',
      'geometry',
      'area',
      'volume',
      'perimeter',
      'angle',
      'triangle',
    ],
    // math-6: Statistics and probability
    'math-6': ['stats', 'probability', 'statistics', 'data', 'mean', 'median'],
    // math-7: Advanced algebra and quadratics
    'math-7': ['quadratic', 'polynomial', 'advanced'],
    // math-8: Mixed/comprehensive problems
    'math-8': ['comprehensive', 'mixed', 'review'],
  },
  science: {
    // science-1: Physical science (matter, energy, forces)
    'science-1': ['physical', 'physics', 'motion', 'force', 'energy', 'matter'],
    // science-2: Chemistry basics
    'science-2': ['chemistry', 'chemical', 'reaction', 'element', 'compound'],
    // science-3: Life science (cells, organisms, ecosystems)
    'science-3': [
      'life',
      'biology',
      'cell',
      'organism',
      'ecosystem',
      'genetics',
      'heredity',
    ],
    // science-4: Earth and space science
    'science-4': ['earth', 'space', 'geology', 'weather', 'climate', 'planet'],
    // science-5: Scientific practices and inquiry
    'science-5': [
      'scientific',
      'method',
      'experiment',
      'hypothesis',
      'practice',
    ],
    // science-6: Data interpretation and reasoning
    'science-6': ['data', 'reasoning', 'analysis', 'interpretation', 'graph'],
  },
  rla: {
    // rla-1: Reading comprehension and main ideas
    'rla-1': ['main_idea', 'comprehension', 'central_idea', 'summary'],
    // rla-2: Supporting details and evidence
    'rla-2': ['details', 'evidence', 'support', 'inference'],
    // rla-3: Author's purpose and tone
    'rla-3': ['purpose', 'tone', 'author', 'perspective', 'point_of_view'],
    // rla-4: Text structure and organization
    'rla-4': ['structure', 'organization', 'text_features'],
    // rla-5: Literary analysis and interpretation
    'rla-5': ['literary', 'analysis', 'interpretation', 'theme', 'character'],
    // rla-6: Grammar and language conventions
    'rla-6': ['grammar', 'conventions', 'mechanics', 'usage'],
    // rla-7: Extended response and essay writing
    'rla-7': ['extended_response', 'essay', 'writing', 'argument'],
  },
  'social-studies': {
    // social-1: U.S. History
    'social-1': [
      'us_hist',
      'american_history',
      'revolution',
      'civil_war',
      'westward',
    ],
    // social-2: World history and cultures
    'social-2': ['world_hist', 'ancient', 'medieval', 'culture'],
    // social-3: Civics and government
    'social-3': [
      'civics',
      'government',
      'constitution',
      'legislative',
      'executive',
      'judicial',
    ],
    // social-4: Economics
    'social-4': ['econ', 'economic', 'supply', 'demand', 'market'],
    // social-5: Geography
    'social-5': ['geo', 'geography', 'map', 'region', 'location'],
    // social-6: Social studies skills (documents, analysis)
    'social-6': ['reading_sources', 'document', 'analysis', 'interpretation'],
  },
};

function log(msg, indent = 0) {
  console.log('  '.repeat(indent) + msg);
}

function determineChallengeTags(quizId, subject, questions) {
  const tags = new Set();
  const subjectKey =
    subject === 'Social Studies' ? 'social-studies' : subject.toLowerCase();
  const patterns = TAG_PATTERNS[subjectKey];

  if (!patterns) return [];

  // Check quiz ID for pattern matches
  const idLower = quizId.toLowerCase();
  for (const [tag, keywords] of Object.entries(patterns)) {
    if (keywords.some((kw) => idLower.includes(kw))) {
      tags.add(tag);
    }
  }

  // If no tags from ID, analyze question content
  if (tags.size === 0 && questions.length > 0) {
    const allText = questions
      .map((q) => `${q.question || ''} ${q.passage || ''}`.toLowerCase())
      .join(' ');

    for (const [tag, keywords] of Object.entries(patterns)) {
      if (keywords.some((kw) => allText.includes(kw))) {
        tags.add(tag);
        break; // Just add first matching tag
      }
    }
  }

  // Default fallback: first tag for the subject
  if (tags.size === 0) {
    const firstTag = Object.keys(patterns)[0];
    tags.add(firstTag);
  }

  return Array.from(tags);
}

function addTagsToFile(filepath, subject) {
  try {
    const questions = require(filepath);
    if (!Array.isArray(questions) || questions.length === 0) return null;

    // Determine appropriate tags
    const filename = path.basename(filepath, '.js');
    const fileTags = determineChallengeTags(filename, subject, questions);

    let questionsUpdated = 0;

    // Add tags to questions that don't have them
    const updated = questions.map((q) => {
      // Skip if question already has tags
      if (
        q.challenge_tags &&
        Array.isArray(q.challenge_tags) &&
        q.challenge_tags.length > 0
      ) {
        return q;
      }

      questionsUpdated++;
      return {
        ...q,
        challenge_tags: fileTags,
      };
    });

    if (questionsUpdated === 0)
      return { skipped: true, count: questions.length };

    // Write back to file
    const content = fs.readFileSync(filepath, 'utf8');
    const header = content.split('module.exports')[0];
    const newContent = `${header}module.exports = ${JSON.stringify(
      updated,
      null,
      2
    )};\n`;

    fs.writeFileSync(filepath, newContent, 'utf8');

    return { added: true, count: questionsUpdated, tags: fileTags };
  } catch (err) {
    return { error: err.message };
  }
}

function getSubjectName(folder) {
  const map = {
    math: 'Math',
    science: 'Science',
    'social-studies': 'Social Studies',
    rla: 'RLA',
  };
  return map[folder] || folder;
}

function main() {
  log('🏷️  Adding challenge_tags to extracted quizzes...\n');

  const results = {
    added: 0,
    skipped: 0,
    errors: 0,
    totalQuestions: 0,
  };

  const details = [];

  FOLDERS.forEach((folder) => {
    const dir = path.join(BACKEND_QUIZZES, folder);
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));
    const subject = getSubjectName(folder);

    log(`Processing ${folder}/ (${files.length} files)...`);

    files.forEach((file) => {
      const filepath = path.join(dir, file);
      const result = addTagsToFile(filepath, subject);

      if (!result) return;

      if (result.error) {
        results.errors++;
        details.push({ file, error: result.error });
      } else if (result.skipped) {
        results.skipped++;
      } else if (result.added) {
        results.added++;
        results.totalQuestions += result.count;
        details.push({ file, count: result.count, tags: result.tags });
      }
    });
  });

  log(`\n📊 Results:`);
  log(`Files updated: ${results.added}`, 1);
  log(`Files skipped (already have tags): ${results.skipped}`, 1);
  log(`Errors: ${results.errors}`, 1);
  log(`Total questions tagged: ${results.totalQuestions}`, 1);

  if (details.length > 0 && details[0].tags) {
    log(`\n📋 Sample tagged files (first 10):`, 1);
    details
      .filter((d) => d.tags)
      .slice(0, 10)
      .forEach((d) => {
        log(`${d.file}: ${d.count}Q → [${d.tags.join(', ')}]`, 2);
      });
    if (details.filter((d) => d.tags).length > 10) {
      log(`... and ${details.filter((d) => d.tags).length - 10} more`, 2);
    }
  }

  if (results.errors > 0) {
    log(`\n⚠️  Errors (${results.errors}):`, 1);
    details
      .filter((d) => d.error)
      .forEach((d) => {
        log(`${d.file}: ${d.error}`, 2);
      });
  }

  log(`\n✅ Challenge tags added!`);
  log(`\n🔄 Next: Restart backend to load updated data`, 1);
}

main();
