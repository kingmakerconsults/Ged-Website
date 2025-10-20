import assert from 'node:assert/strict';

function escapeHtml(value) {
  if (typeof value !== 'string') {
    return '';
  }
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function lintAndRepairMath(text) {
  if (typeof text !== 'string') {
    return '';
  }

  let working = text.replace(/\r\n?/g, '\n');
  working = working.replace(/\$\$([\s\S]+?)\$\$/g, (_, inner) => `$$${inner}$$`);
  working = working.replace(/\$([\s\S]+?)\$/g, (_, inner) => `$${inner}$`);
  working = working.replace(/\\\(([\s\S]+?)\\\)/g, (_, inner) => `\\(${inner}\\)`);
  working = working.replace(/\\\[([\s\S]+?)\\\]/g, (_, inner) => `\\[${inner}\\]`);
  working = working.replace(/\\dfrac\s*\{([^}]+)\}\s*\{([^}]+)\}/gi, (_m, a, b) => `\\frac{${a}}{${b}}`);
  working = working.replace(/[\/\^\u2191]\s*frac\s*\{([^}]+)\}\s*\{([^}]+)\}/gi, (_m, a, b) => `\\frac{${a}}{${b}}`);
  working = working.replace(/\^\s*rac\s*\{([^}]+)\}\s*\{([^}]+)\}/gi, (_m, a, b) => `\\frac{${a}}{${b}}`);
  working = working.replace(/\u2191\s*rac\s*\{([^}]+)\}\s*\{([^}]+)\}/gi, (_m, a, b) => `\\frac{${a}}{${b}}`);
  working = working.replace(/\\left\s*\(/g, '(');
  working = working.replace(/\\right\s*\)/g, ')');
  working = working.replace(/\(\s*\\frac\{([^}]+)\}\{([^}]+)\}\s*\)/g, (_m, a, b) => `\\(\\frac{${a}}{${b}}\\)`);
  working = working.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, (_m, a, b) => `\\(\\frac{${a}}{${b}}\\)`);
  working = working.replace(/(^|[^&])\$(?!\d)/g, (_, prefix) => `${prefix}&#36;`);
  working = working.replace(/&#36;(\s*\d[\d.,]*)/g, (_m, amount) => `$${amount}`);
  return working;
}

function toPlainFractions(input) {
  if (input == null) {
    return '';
  }
  let text = String(input);
  text = text.replace(/\\\(\s*\\frac/gi, '\\frac')
    .replace(/\\\)\s*/g, '')
    .replace(/\\\[\s*\\frac/gi, '\\frac')
    .replace(/\\\]\s*/g, '');
  text = text.replace(/\\\\/g, '\\');
  return text.replace(/\\frac\s*\{\s*([+-]?\d+)\s*\}\s*\{\s*([+-]?\d+)\s*\}/gi, (_m, a, b) => `${a}/${b}`);
}

function renderLatexToHtml(latex) {
  return escapeHtml(toPlainFractions(latex));
}

function renderStem(text) {
  if (typeof text !== 'string') {
    return '';
  }

  const segments = [];
  const mathPattern = /\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\$([^$\d][\s\S]*?)\$|\\\(([\s\S]+?)\\\)/g;
  let lastIndex = 0;
  let match;

  while ((match = mathPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push(escapeHtml(text.slice(lastIndex, match.index)));
    }

    const latex = match[1] ?? match[2] ?? match[3] ?? match[4] ?? '';
    segments.push(renderLatexToHtml(latex.trim()));
    lastIndex = mathPattern.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push(escapeHtml(text.slice(lastIndex)));
  }

  return segments.join('');
}

export function pipeline(input) {
  return renderStem(lintAndRepairMath(input));
}

const isMain = (() => {
  if (!process.argv[1]) return false;
  try {
    return import.meta.url === new URL(process.argv[1], 'file://').href;
  } catch (err) {
    return false;
  }
})();

if (isMain) {
  const cases = [
    { input: '/frac{2}{3}x - 7 = 5', includes: ['2/3'], excludes: ['\\frac'] },
    { input: '^rac{1}{2}', includes: ['1/2'], excludes: ['\\frac'] },
    { input: '\\dfrac{a}{b}', includes: ['\\frac{a}{b}'] },
    { input: '\\left(\\frac{a}{b}\\right)', includes: ['\\frac{a}{b}'], excludes: ['\\left'] },
    { input: '$12', includes: ['$12'] },
    { input: '$ 12.50', includes: ['$ 12.50'] },
    { input: 'What is \\(\\frac{2}{3}\\)x?', includes: ['2/3'], excludes: ['\\frac'] }
  ];

  for (const testCase of cases) {
    const html = pipeline(testCase.input);
    assert.doesNotMatch(html, /<span class=\"katex\">/);
    (testCase.includes || []).forEach(expected => {
      assert.ok(html.includes(expected), `Expected "${expected}" in ${html}`);
    });
    (testCase.excludes || []).forEach(unexpected => {
      assert.ok(!html.includes(unexpected), `Did not expect "${unexpected}" in ${html}`);
    });
  }

  console.log('Math rendering pipeline cases passed.');
}
