import React, { useEffect, useRef } from 'react';

/**
 * Tiny KaTeX-rendered math span. Falls back to plain text if the global
 * window.katex isn't loaded yet. Used by the geometry tool sub-panels.
 */
export default function KaTeXSpan({ tex, display = false, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === 'undefined' || !window.katex) {
      el.textContent = tex;
      return;
    }
    try {
      window.katex.render(tex, el, { throwOnError: false, displayMode: display });
    } catch {
      el.textContent = tex;
    }
  }, [tex, display]);
  return <span ref={ref} className={className} />;
}
