const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const QUESTION_LIKE_KEYS = new Set(['question', 'questiontext', 'prompt', 'stem']);
const JSON_EXT = '.json';

function isQuestionLikeKey(keyName) {
  return QUESTION_LIKE_KEYS.has(String(keyName || '').trim().toLowerCase());
}

function stripLeadingScenarioPrefix(value) {
  if (typeof value !== 'string' || value.length === 0) {
    return value;
  }
  return value.replace(
    /^\s*(?:(?:[A-Za-z][\w'’.:-]*\s+){0,8}scenario\s*:\s*)/i,
    ''
  );
}

function walkAndStrip(node, keyName = '', stats = { changes: 0 }) {
  if (typeof node === 'string') {
    if (!isQuestionLikeKey(keyName)) {
      return node;
    }
    const stripped = stripLeadingScenarioPrefix(node);
    if (stripped !== node) {
      stats.changes += 1;
    }
    return stripped;
  }

  if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i += 1) {
      node[i] = walkAndStrip(node[i], keyName, stats);
    }
    return node;
  }

  if (node && typeof node === 'object') {
    for (const key of Object.keys(node)) {
      node[key] = walkAndStrip(node[key], key, stats);
    }
  }

  return node;
}

function collectJsonFiles(dirPath, sink = []) {
  if (!fs.existsSync(dirPath)) {
    return sink;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      collectJsonFiles(fullPath, sink);
      continue;
    }
    if (entry.isFile() && entry.name.toLowerCase().endsWith(JSON_EXT)) {
      sink.push(fullPath);
    }
  }

  return sink;
}

function processFile(filePath) {
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    return {
      filePath,
      changed: false,
      changes: 0,
      error: `parse error: ${error.message}`,
    };
  }

  const stats = { changes: 0 };
  walkAndStrip(parsed, '', stats);

  if (stats.changes > 0) {
    fs.writeFileSync(filePath, `${JSON.stringify(parsed)}\n`, 'utf8');
  }

  return {
    filePath,
    changed: stats.changes > 0,
    changes: stats.changes,
    error: null,
  };
}

function main() {
  const scanRoots = [
    path.join(ROOT, 'public', 'quizzes'),
    path.join(ROOT, 'backend', 'quizzes'),
  ];

  const existingRoots = scanRoots.filter((p) => fs.existsSync(p));
  const jsonFiles = [];
  for (const root of existingRoots) {
    collectJsonFiles(root, jsonFiles);
  }

  let filesChanged = 0;
  let totalChanges = 0;
  let filesErrored = 0;

  console.log('Stripping leading scenario prefixes from question-like keys...');
  for (const file of jsonFiles) {
    const result = processFile(file);
    const rel = path.relative(ROOT, file);

    if (result.error) {
      filesErrored += 1;
      console.log(`- ${rel} | ERROR | ${result.error}`);
      continue;
    }

    if (result.changed) {
      filesChanged += 1;
      totalChanges += result.changes;
      console.log(`- ${rel} | changed=${result.changes}`);
    } else {
      console.log(`- ${rel} | changed=0`);
    }
  }

  console.log('');
  console.log(
    `Summary: scanned=${jsonFiles.length} changedFiles=${filesChanged} changes=${totalChanges} errors=${filesErrored}`
  );
}

main();
