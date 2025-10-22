import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import {
  cleanHeaderLeak,
  STRAY_TEXT_THRESHOLD,
  setPreloadState,
} from '../lib/layoutGuards.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlPath = path.resolve(__dirname, '..', 'index.html');

test('removes stray text nodes from headers', () => {
  const html = readFileSync(htmlPath, 'utf8');
  const dom = new JSDOM(html, { runScripts: 'outside-only' });
  const { document, Node } = dom.window;
  const header = document.createElement('header');
  header.className = 'page-header';
  document.body.prepend(header);

  const strayText = 'x'.repeat(STRAY_TEXT_THRESHOLD + 25);
  header.appendChild(document.createTextNode(strayText));
  header.appendChild(document.createTextNode('Exam Title'));

  const removed = cleanHeaderLeak(document);
  assert.strictEqual(removed.length, 1);

  const leftover = Array.from(header.childNodes).filter(
    (node) => node.nodeType === Node.TEXT_NODE && (node.textContent || '').trim().length > STRAY_TEXT_THRESHOLD,
  );
  assert.strictEqual(leftover.length, 0);
});

test('keeps preload JSON invisible in the document flow', () => {
  const dom = new JSDOM('<!doctype html><body><script id="__PRELOAD__" type="application/json"></script></body>', {
    runScripts: 'outside-only',
  });
  const { document } = dom.window;

  setPreloadState({ ok: true, data: Array(120).fill('x') }, document);

  const script = document.getElementById('__PRELOAD__');
  assert.ok(script);

  const visibleText = (document.body.innerText || '').trim();
  assert.strictEqual(visibleText, '');

  const parsed = JSON.parse(script.textContent || '{}');
  assert.strictEqual(parsed.ok, true);
  assert.ok(Array.isArray(parsed.data));
});
