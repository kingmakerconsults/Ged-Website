import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'node:test';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('index.html pre-React content', () => {
  it('has no stray text or UL elements outside #root', () => {
    const indexPath = path.join(__dirname, '..', 'index.html');
    const html = fs.readFileSync(indexPath, 'utf8');
    const dom = new JSDOM(html);
    const { document } = dom.window;
    const root = document.getElementById('root');

    assert.ok(root, 'Expected #root to be present');

    const strayNodes = [];
    for (const node of document.body.childNodes) {
      if (node === root) {
        continue;
      }
      if (node.nodeType === dom.window.Node.COMMENT_NODE) {
        continue;
      }
      if (node.nodeType === dom.window.Node.ELEMENT_NODE && node.nodeName === 'SCRIPT') {
        continue;
      }
      if (node.nodeType === dom.window.Node.TEXT_NODE && node.textContent.trim().length === 0) {
        continue;
      }
      strayNodes.push(node);
    }

    assert.strictEqual(
      strayNodes.length,
      0,
      'Expected no stray nodes outside #root before React mounts'
    );
  });
});
