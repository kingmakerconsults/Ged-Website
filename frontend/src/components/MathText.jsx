/**
 * Shared MathText component.
 *
 * Renders a string that may contain inline LaTeX delimited by `\( ... \)`,
 * `\[ ... \]`, or `$ ... $` using the globally-loaded KaTeX (CDN, available
 * across the legacy app). Also decodes numeric HTML entities (e.g. `&#36;`
 * → `$`, the catalog sanitizer's currency-escape output) and strips
 * backslashes that escape currency `$` from the source data.
 *
 * Honors the catalog sanitizer contract:
 *   - `\(...\)` / `\[...\]` are sacred (never stripped).
 *   - Currency `&#36;` is decoded back to `$` for display.
 *   - Escape `\$` (frontend-side) is unescaped so e.g. `\$120` shows as `$120`.
 */

import React, { useEffect, useState } from 'react';

function decodeHtmlEntities(s) {
  if (typeof s !== 'string') return s;
  return s
    .replace(/&#(\d+);/g, (_m, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_m, n) =>
      String.fromCharCode(parseInt(n, 16))
    )
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function unescapeCurrencyDollars(s) {
  return typeof s === 'string' ? s.replace(/\\\$/g, '$') : s;
}

function renderInlineLatex(latex) {
  try {
    if (typeof window === 'undefined' || !window.katex) return null;
    return window.katex.renderToString(latex, {
      throwOnError: false,
      strict: 'ignore',
    });
  } catch {
    return null;
  }
}

export function useKatexReady() {
  const [ready, setReady] = useState(
    () => typeof window !== 'undefined' && !!window.katex
  );
  useEffect(() => {
    if (ready) return undefined;
    if (typeof window === 'undefined') return undefined;
    let alive = true;
    const tick = () => {
      if (!alive) return;
      if (window.katex) {
        setReady(true);
      } else {
        setTimeout(tick, 100);
      }
    };
    tick();
    return () => {
      alive = false;
    };
  }, [ready]);
  return ready;
}

export function MathText({ children }) {
  // Re-render once KaTeX finishes loading from the CDN.
  useKatexReady();
  if (children == null) return null;
  let text = decodeHtmlEntities(String(children));
  if (!text) return null;
  // Match \( ... \) or \[ ... \] or $...$ (single-$, non-greedy)
  const regex = /\\\(([\s\S]+?)\\\)|\\\[([\s\S]+?)\\\]|\$([^$\n]+?)\$/g;
  const parts = [];
  let lastIndex = 0;
  let m;
  let key = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > lastIndex) {
      parts.push(unescapeCurrencyDollars(text.slice(lastIndex, m.index)));
    }
    const latex = m[1] ?? m[2] ?? m[3] ?? '';
    const html = renderInlineLatex(latex);
    if (html) {
      parts.push(
        <span key={`m${key++}`} dangerouslySetInnerHTML={{ __html: html }} />
      );
    } else {
      parts.push(m[0]);
    }
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(unescapeCurrencyDollars(text.slice(lastIndex)));
  }
  return <>{parts}</>;
}

export default MathText;
