const test = require('node:test');
const assert = require('node:assert/strict');

const { normalizeLatex } = require('../utils/normalizeLatex');

test('collapses macro split by \\_', () => {
    const s = String.raw`\f\_\r\_\a\_\c{1}{3} and \s\_\q\_\r\_\t{9}`;
    const t = normalizeLatex(s);
    assert.ok(t.includes(String.raw`\frac{1}{3}`));
    assert.ok(t.includes(String.raw`\sqrt{9}`));
});

test('collapses macro split by double-escaped underscores', () => {
    const s = String.raw`\\f\\_\\_\\_\\_r\\_\\_a\\_\\_c{2}{5} plus \\t\\_\\i\\_\\m\\_\\e\\_\\s`;
    const t = normalizeLatex(s);
    assert.ok(t.includes(String.raw`\frac{2}{5}`));
    assert.ok(t.includes(String.raw`\times`));
});

test('repairs naked rac', () => {
    assert.equal(normalizeLatex('rac{1}{6}'), String.raw`\frac{1}{6}`);
});

test('preserves currency symbol', () => {
    const t = normalizeLatex('He has $5 and $2.25.');
    assert.ok(t.includes(String.raw`\$5`));
    assert.ok(t.includes(String.raw`\$2.25`));
});
