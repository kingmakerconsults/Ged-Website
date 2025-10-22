import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlPath = path.join(__dirname, '..', 'index.html');

function collectStrayTextNodes(root) {
  return Array.from(root.childNodes).filter((node) => {
    if (node.nodeType !== 3) {
      return false;
    }
    const text = (node.textContent || '').trim();
    return text.length > 100;
  });
}

test('no stray long text in header', () => {
  const html = readFileSync(htmlPath, 'utf8');
  const dom = new JSDOM(html, { runScripts: 'outside-only' });
  const doc = dom.window.document;

  const header = doc.querySelector('header, .page-header, .quiz-header') || doc.body;
  const stray = collectStrayTextNodes(header);

  assert.strictEqual(stray.length, 0);
});

test('preload payload stays hidden from layout', () => {
  const html = readFileSync(htmlPath, 'utf8');
  const dom = new JSDOM(html, { runScripts: 'outside-only' });
  const doc = dom.window.document;

  const preload = doc.getElementById('__PRELOAD__');
  assert.ok(preload);
  assert.strictEqual(preload.getAttribute('type'), 'application/json');

  doc.querySelectorAll('script').forEach((script) => script.remove());
  const bodyText = (doc.body.textContent || '').trim();
  assert.strictEqual(/"questions"\s*:/i.test(bodyText), false);
});
