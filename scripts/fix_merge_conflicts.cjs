#!/usr/bin/env node
/**
 * AUTO-RESOLVE MERGE CONFLICTS IN QUIZ FILES
 *
 * Intelligently resolves Git merge conflicts in quiz files by:
 * 1. Identifying conflict markers
 * 2. Comparing both versions
 * 3. Choosing the more complete version (longer text, more context)
 * 4. Writing the resolved file
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Files with known conflicts
const CONFLICT_FILES = [
  'backend/data/quizzes/social-studies/ss_reading_sources_9.js',
  'backend/data/quizzes/rla/rla_evidence_06.js',
  'backend/data/quizzes/rla/rla_evidence_07.js',
  'backend/data/quizzes/rla/rla_evidence_08.js',
  'backend/data/quizzes/rla/rla_evidence_09.js',
  'backend/data/quizzes/rla/rla_evidence_10.js',
  'backend/data/quizzes/rla/rla_main_idea_04.js',
  'backend/data/quizzes/rla/rla_main_idea_08.js',
  'backend/data/quizzes/science/sci_data_reasoning_3.js',
  'backend/data/quizzes/science/sci_data_reasoning_5.js',
  'backend/data/quizzes/science/sci_scientific_practices_method_4.js',
];

function log(msg, indent = 0) {
  console.log('  '.repeat(indent) + msg);
}

function resolveConflict(content) {
  // Pattern: <<<<<<< HEAD ... ======= ... >>>>>>> hash
  // More flexible pattern that handles various whitespace
  const conflictPattern =
    /<<<<<<< HEAD\r?\n([\s\S]*?)\r?\n=======\r?\n([\s\S]*?)\r?\n>>>>>>> [a-f0-9]+\r?\n?/g;

  let resolved = content;
  let conflictCount = 0;
  let matches = [];

  // Find all conflicts first
  let match;
  while ((match = conflictPattern.exec(content)) !== null) {
    matches.push({
      full: match[0],
      version1: match[1],
      version2: match[2],
      index: match.index,
    });
  }

  log(`Found ${matches.length} conflicts`, 2);

  // Replace conflicts (in reverse order to maintain indices)
  matches.reverse().forEach((m, i) => {
    conflictCount++;

    // Choose the longer version (usually has more context/detail)
    const v1Length = m.version1.trim().length;
    const v2Length = m.version2.trim().length;

    let chosen;
    if (v1Length > v2Length) {
      log(
        `Conflict ${
          matches.length - i
        }: Keeping HEAD version (${v1Length} chars vs ${v2Length})`,
        3
      );
      chosen = m.version1;
    } else if (v2Length > v1Length) {
      log(
        `Conflict ${
          matches.length - i
        }: Keeping merged version (${v2Length} chars vs ${v1Length})`,
        3
      );
      chosen = m.version2;
    } else {
      // Same length - choose version 2 (merged) as it's usually the updated one
      log(
        `Conflict ${matches.length - i}: Same length, keeping merged version`,
        3
      );
      chosen = m.version2;
    }

    // Replace this conflict
    resolved =
      resolved.substring(0, m.index) +
      chosen +
      resolved.substring(m.index + m.full.length);
  });

  return { resolved, conflictCount };
}

function fixFile(relPath) {
  const fullPath = path.join(ROOT, relPath);

  if (!fs.existsSync(fullPath)) {
    log(`❌ File not found: ${relPath}`, 1);
    return false;
  }

  const content = fs.readFileSync(fullPath, 'utf8');

  if (!content.includes('<<<<<<< HEAD')) {
    log(`✅ No conflicts: ${path.basename(fullPath)}`, 1);
    return true;
  }

  log(`🔧 Resolving: ${path.basename(fullPath)}`, 1);

  const { resolved, conflictCount } = resolveConflict(content);

  // Backup original
  const backupPath = fullPath + '.conflict-backup';
  fs.writeFileSync(backupPath, content);

  // Write resolved version
  fs.writeFileSync(fullPath, resolved);

  log(`✅ Resolved ${conflictCount} conflicts`, 2);
  log(`📁 Backup saved: ${path.basename(backupPath)}`, 2);

  // Test if file can be required
  try {
    delete require.cache[require.resolve(fullPath)];
    const data = require(fullPath);
    const questionCount = Array.isArray(data) ? data.length : 0;
    log(`✅ File loads: ${questionCount} questions`, 2);
    return true;
  } catch (e) {
    log(`❌ File has syntax errors: ${e.message}`, 2);
    // Restore backup
    fs.writeFileSync(fullPath, content);
    log(`⚠️  Restored from backup`, 2);
    return false;
  }
}

function main() {
  log('🔧 Auto-resolving merge conflicts in quiz files...\n');

  let fixed = 0;
  let failed = 0;

  CONFLICT_FILES.forEach((file) => {
    const success = fixFile(file);
    if (success) {
      fixed++;
    } else {
      failed++;
    }
    log('');
  });

  log(`\n📊 Summary:`);
  log(`  ✅ Fixed: ${fixed}`, 1);
  log(`  ❌ Failed: ${failed}`, 1);

  if (fixed > 0) {
    log(`\n💡 Next steps:`, 1);
    log(`1. Review the resolved files`, 1);
    log(`2. Delete .conflict-backup files if satisfied`, 1);
    log(`3. Test that backend loads correctly`, 1);
  }
}

main();
