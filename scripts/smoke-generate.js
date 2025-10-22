#!/usr/bin/env node
import path from 'node:path';
import process from 'node:process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const Module = require('module');
const stubDir = path.join(process.cwd(), 'scripts', 'stubs');
if (typeof process.env.NODE_PATH === 'string') {
  if (!process.env.NODE_PATH.split(path.delimiter).includes(stubDir)) {
    process.env.NODE_PATH = [stubDir, process.env.NODE_PATH].filter(Boolean).join(path.delimiter);
    Module._initPaths();
  }
} else {
  process.env.NODE_PATH = stubDir;
  Module._initPaths();
}

const { generateSocialStudiesItems, resetImageState } = require('../backend/src/socialStudies/generator');
const { resetState: resetImageBankState } = require('../backend/src/socialStudies/imageBank');

const DEFAULT_COUNT = 3;

function parseArgs(argv) {
  const options = { count: DEFAULT_COUNT };
  for (const arg of argv.slice(2)) {
    if (arg.startsWith('--count=')) {
      const value = Number(arg.split('=')[1]);
      if (Number.isFinite(value) && value > 0) {
        options.count = Math.floor(value);
      }
    }
  }
  return options;
}

function extractSection(prompt, label) {
  const rx = new RegExp(`${label}:(.*)`, 'i');
  const match = prompt.match(rx);
  if (!match) return '';
  return match[1].trim();
}

function extractKeywords(prompt) {
  const line = extractSection(prompt, 'Keywords');
  if (!line) return [];
  return line
    .split(',')
    .map((word) => word.trim())
    .filter(Boolean);
}

function extractWords(prompt) {
  const words = new Set();
  const addWords = (text) => {
    if (!text) return;
    const matches = text.toLowerCase().match(/[a-z][a-z0-9\-]{2,}/g);
    if (!matches) return;
    matches.forEach((w) => words.add(w));
  };
  extractKeywords(prompt).forEach((kw) => addWords(kw));
  addWords(extractSection(prompt, 'Alt text'));
  addWords(extractSection(prompt, 'Description'));
  return Array.from(words);
}

function chooseAnchors(typeLine = '') {
  const normalized = typeLine.toLowerCase();
  if (normalized.includes('map')) {
    return { label: 'map', anchors: ['legend', 'compass'] };
  }
  if (normalized.includes('chart') || normalized.includes('graph')) {
    return { label: 'chart', anchors: ['legend', 'axis'] };
  }
  if (normalized.includes('table')) {
    return { label: 'table', anchors: ['table', 'column'] };
  }
  if (normalized.includes('timeline')) {
    return { label: 'timeline', anchors: ['legend', 'timeline'] };
  }
  return { label: 'image', anchors: ['legend', 'labels'] };
}

function buildStubItem(promptText) {
  const typeLine = extractSection(promptText, 'Image type');
  const { label, anchors } = chooseAnchors(typeLine);
  const words = extractWords(promptText);
  if (words.length < 2) {
    return null;
  }
  const focus = words[0];
  const target = words[1] || focus;
  const extra = words[2] || `${focus}-trend`;
  const [anchorA, anchorB] = anchors;

  const stem = `According to the ${label} ${anchorA} and ${anchorB}, which ${focus} best matches the ${target}?`;
  const stemWordCount = stem.trim().split(/\s+/).filter(Boolean).length;
  if (stemWordCount > 35) {
    return null;
  }

  const answerOptions = [
    {
      text: `It highlights the ${focus} near the ${target}.`,
      isCorrect: true,
      rationale: `The ${anchorA} points to the ${focus}, and the ${anchorB} labels align with the ${target}.`
    },
    {
      text: `It shows the ${extra} away from the ${target}.`,
      isCorrect: false,
      rationale: `The ${anchorA} never mentions the ${extra}; it emphasizes the ${focus}.`
    },
    {
      text: `It describes background context without using the ${anchorA}.`,
      isCorrect: false,
      rationale: `That choice ignores the ${anchorA} and ${anchorB} evidence in the ${label}.`
    },
    {
      text: `It focuses on unrelated details instead of the ${focus}.`,
      isCorrect: false,
      rationale: `The ${anchorB} text disproves that option because it names the ${focus}.`
    }
  ];

  const solution = `The ${anchorA} highlights the ${focus} category. The ${anchorB} confirms it aligns with the ${target}, so that option matches the visual evidence.`;

  return {
    questionText: stem,
    answerOptions,
    solution
  };
}

async function stubGenerate(subject, prompt) {
  const userPrompt = typeof prompt === 'string' ? prompt : prompt?.user || '';
  const item = buildStubItem(userPrompt);
  if (!item) {
    return { items: [] };
  }
  return { items: [item], model: 'stub' };
}

async function main() {
  const options = parseArgs(process.argv);
  try {
    resetImageState?.();
    resetImageBankState?.();
    const items = await generateSocialStudiesItems({
      count: options.count,
      allowExternalBlurbs: false,
      generateWithFallback: stubGenerate
    });
    console.log(`Smoke generated ${items.length} social studies items.`);
    items.forEach((item, index) => {
      console.log(`\n[Item ${index + 1}] ${item.questionText}`);
      item.answerOptions.forEach((opt, idx) => {
        const label = String.fromCharCode(65 + idx);
        console.log(`  ${label}. ${opt.text}${opt.isCorrect ? ' (correct)' : ''}`);
      });
    });
  } catch (err) {
    console.error('Smoke generation failed:', err?.message || err);
    process.exitCode = 1;
  }
}

main();
