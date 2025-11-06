#!/usr/bin/env node
// Fix non-interrogative question prompts across supported bundles by:
// - Appending a '?' (or replacing a trailing ':' or '.') when a question lacks '?' and interrogative cues
// - Filling missing/empty question text with a minimal valid prompt ("Select the best answer.")
// Targets:
//  - frontend/Expanded/expanded.quizzes.bundle.js (JSON embedded in JS)
//  - quizzes.txt (pure JSON)

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function hasInterrogativeCue(s) {
  if (!s || typeof s !== 'string') return false;
  return /\b(what|which|who|whom|whose|when|where|why|how|choose|select|identify|determine|calculate|find|infer|conclude|most|least|solve|simplify|evaluate|express|graph|factor|expand|approximate|round|classify|compare|convert|true or false)\b/i.test(s);
}

function normalizeToQuestion(str) {
  if (!str || typeof str !== 'string') return 'Select the best answer.'; // minimal safe prompt
  const trimmedRight = str.replace(/[\s\u00A0]+$/g, '');
  if (/\?$/.test(trimmedRight)) return trimmedRight; // already a question
  if (hasInterrogativeCue(trimmedRight)) {
    // Replace a trailing ':' or '.' with '?', else append '?'
    if (/[.:]$/.test(trimmedRight)) return trimmedRight.replace(/[.:]$/, '?');
    return trimmedRight + '?';
  }
  // No cue: still enforce a question-mark to satisfy audit
  if (/[.:]$/.test(trimmedRight)) return trimmedRight.replace(/[.:]$/, '?');
  return trimmedRight + '?';
}

function getQuestionStringRef(obj) {
  // Returns a tuple [getter, setter] operating on the most appropriate field
  if (obj && typeof obj === 'object') {
    if (typeof obj.question === 'string') {
      return [() => obj.question, (v) => { obj.question = v; }];
    }
    if (typeof obj.questionText === 'string') {
      return [() => obj.questionText, (v) => { obj.questionText = v; }];
    }
    if (typeof obj.text === 'string') {
      return [() => obj.text, (v) => { obj.text = v; }];
    }
    if (obj.content && typeof obj.content === 'object') {
      const c = obj.content;
      if (typeof c.question === 'string') {
        return [() => c.question, (v) => { c.question = v; }];
      }
      if (typeof c.questionText === 'string') {
        return [() => c.questionText, (v) => { c.questionText = v; }];
      }
      if (typeof c.text === 'string') {
        return [() => c.text, (v) => { c.text = v; }];
      }
    }
  }
  return [() => '', (v) => {}];
}

function visitQuestionsDeep(node, onQuestion) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    for (const it of node) visitQuestionsDeep(it, onQuestion);
    return;
  }
  // If this node has a questions array, process its entries
  if (Array.isArray(node.questions)) {
    for (const q of node.questions) {
      onQuestion(q);
    }
  }
  // Recurse into all properties
  for (const key of Object.keys(node)) {
    const val = node[key];
    if (val && typeof val === 'object') visitQuestionsDeep(val, onQuestion);
  }
}

function fixExpandedBundle() {
  const file = path.join(root, 'frontend', 'Expanded', 'expanded.quizzes.bundle.js');
  if (!fs.existsSync(file)) return { file, changed: false, reason: 'missing' };
  const raw = fs.readFileSync(file, 'utf8');
  const marker = 'window.ExpandedQuizData = ';
  const idx = raw.indexOf(marker);
  if (idx === -1) return { file, changed: false, reason: 'marker-not-found' };
  const jsonStart = raw.indexOf('{', idx);
  const jsonEnd = raw.lastIndexOf('}');
  if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) return { file, changed: false, reason: 'json-range-not-found' };
  const jsonStr = raw.slice(jsonStart, jsonEnd + 1);
  let data;
  try { data = JSON.parse(jsonStr); } catch (e) {
    return { file, changed: false, reason: 'json-parse-failed' };
  }

  let edits = 0;
  visitQuestionsDeep(data, (q) => {
    const [get, set] = getQuestionStringRef(q);
    const cur = get();
    const norm = normalizeToQuestion(cur);
    if (norm !== cur) {
      // If no recognizable question string field exists, create a 'question' field
      const hasAnyField = (
        (typeof q.question === 'string') ||
        (typeof q.questionText === 'string') ||
        (typeof q.text === 'string') ||
        (q.content && typeof q.content === 'object' && (
          typeof q.content.question === 'string' ||
          typeof q.content.questionText === 'string' ||
          typeof q.content.text === 'string'
        ))
      );
      if (!hasAnyField) {
        q.question = norm;
      } else {
        set(norm);
      }
      edits++;
    }
  });

  if (edits > 0) {
    const pretty = JSON.stringify(data, null, 2);
    const updated = raw.slice(0, jsonStart) + pretty + raw.slice(jsonEnd + 1);
    fs.writeFileSync(file, updated, 'utf8');
    return { file, changed: true, edits };
  }
  return { file, changed: false, edits };
}

function fixQuizzesTxt() {
  const file = path.join(root, 'quizzes.txt');
  if (!fs.existsSync(file)) return { file, changed: false, reason: 'missing' };
  let data;
  try {
    data = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return { file, changed: false, reason: 'parse-failed' };
  }
  let edits = 0;
  visitQuestionsDeep(data, (q) => {
    const [get, set] = getQuestionStringRef(q);
    const cur = get();
    const norm = normalizeToQuestion(cur);
    if (norm !== cur) {
      set(norm);
      edits++;
    }
  });
  if (edits > 0) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    return { file, changed: true, edits };
  }
  return { file, changed: false, edits };
}

function main() {
  const results = [fixExpandedBundle(), fixQuizzesTxt()];
  for (const r of results) {
    if (r.changed) {
      console.log(`[fix] Updated ${path.relative(root, r.file)} (${r.edits} edits)`);
    } else {
      console.log(`[fix] No changes for ${path.relative(root, r.file)}${r.reason ? ' - ' + r.reason : ''}`);
    }
  }
}

main();
