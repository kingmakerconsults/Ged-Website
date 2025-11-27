import React from 'react';
import { formatFractions } from '../../utils/textUtils.js';

// Local safeHtml wrapper to preserve original behavior
const safeHtml = (html) => ({ __html: typeof html === 'string' ? html : '' });

export function MathText({ text, className, subject }) {
  if (typeof text !== 'string' || text.trim() === '') {
    return <span className={className}></span>;
  }

  // 1. Sanitize currency to prevent KaTeX conflicts
  // Replace $50.00 with <span class="currency">$50.00</span>
  let processedText = text.replace(
    /(\$[\d,]+(\.\d{2})?)/g,
    '<span class="currency">$1</span>'
  );

  // 2. Split by LaTeX delimiters \( ... \)
  const parts = processedText.split(/\\\(|\\\)/);

  const renderedParts = parts.map((part, index) => {
    // Odd indices are math (content between \( and \))
    if (index % 2 === 1) {
      try {
        if (window.katex) {
          return window.katex.renderToString(part, {
            throwOnError: false,
            displayMode: false,
          });
        } else {
          return `<span class="math-fallback">${part}</span>`;
        }
      } catch (e) {
        console.error('KaTeX error:', e);
        return part;
      }
    } else {
      // Text part
      let html = part;

      // Use DOMPurify if available
      const san =
        typeof window !== 'undefined' &&
        window.DOMPurify &&
        window.DOMPurify.sanitize
          ? window.DOMPurify.sanitize
          : (v) => v;

      html = san(html);

      // Apply fraction formatting (e.g. 1/2 -> ½) if it's not LaTeX
      return formatFractions(html);
    }
  });

  const finalHtml = renderedParts.join('');

  return (
    <span className={className} dangerouslySetInnerHTML={safeHtml(finalHtml)} />
  );
}

if (typeof window !== 'undefined') {
  window.Components = window.Components || {};
  window.Components.MathText = MathText;
}
