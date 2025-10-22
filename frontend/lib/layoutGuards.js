const HEADER_SELECTOR = '.page-header, header, .quiz-header';
export const STRAY_TEXT_THRESHOLD = 100;
const MAX_QUIZ_TITLE_LENGTH = 140;
export const PRELOAD_ELEMENT_ID = '__PRELOAD__';

function toFallbackString(fallback) {
  if (typeof fallback === 'string' && fallback.trim()) {
    return fallback.trim();
  }
  return 'Practice Quiz';
}

function collapseWhitespace(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function looksLikeSerializedJson(text) {
  if (!text) return false;
  const trimmed = text.trim();
  if (!trimmed) return false;
  if (/^[\[{]/.test(trimmed) && /"questions"|"items"|"subject"/i.test(trimmed)) {
    return true;
  }
  return false;
}

export function sanitizeQuizTitle(rawTitle, fallbackTitle = 'Practice Quiz') {
  const fallback = toFallbackString(fallbackTitle);
  if (typeof rawTitle !== 'string') {
    return fallback;
  }

  const collapsed = collapseWhitespace(rawTitle);
  if (!collapsed) {
    return fallback;
  }

  if (looksLikeSerializedJson(collapsed) || /<[^>]+>/.test(collapsed)) {
    return fallback;
  }

  if (collapsed.length > MAX_QUIZ_TITLE_LENGTH) {
    return `${collapsed.slice(0, MAX_QUIZ_TITLE_LENGTH).trimEnd()}…`;
  }

  return collapsed;
}

export function ensurePreloadElement(doc = (typeof document !== 'undefined' ? document : null)) {
  if (!doc) return null;
  let el = doc.getElementById(PRELOAD_ELEMENT_ID);
  if (!el) {
    el = doc.createElement('script');
    el.id = PRELOAD_ELEMENT_ID;
    el.type = 'application/json';
    el.textContent = '{}';
    const target = doc.body || doc.head || doc.documentElement;
    target?.appendChild(el);
  } else {
    el.type = 'application/json';
    if (!el.textContent || !el.textContent.trim()) {
      el.textContent = '{}';
    }
  }
  return el;
}

export function setPreloadState(state, doc = (typeof document !== 'undefined' ? document : null)) {
  const el = ensurePreloadElement(doc);
  if (!el) return;
  try {
    el.textContent = JSON.stringify(state || {});
  } catch (error) {
    console.warn('[preload] Failed to serialize state payload:', error);
    el.textContent = '{}';
  }
}

export function getPreloadState(doc = (typeof document !== 'undefined' ? document : null)) {
  const el = doc ? doc.getElementById(PRELOAD_ELEMENT_ID) : null;
  if (!el) {
    return {};
  }
  const raw = el.textContent || '{}';
  try {
    const parsed = JSON.parse(raw || '{}');
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (error) {
    console.warn('[preload] Failed to parse state payload:', error);
    return {};
  }
}

export function cleanHeaderLeak(doc = (typeof document !== 'undefined' ? document : null)) {
  if (!doc) return [];
  const header = doc.querySelector(HEADER_SELECTOR);
  if (!header) return [];

  const NodeCtor = doc.defaultView?.Node || globalThis.Node;
  const textNodeType = NodeCtor ? NodeCtor.TEXT_NODE : 3;
  const removed = [];

  for (const node of Array.from(header.childNodes)) {
    if (node.nodeType !== textNodeType) {
      continue;
    }
    const text = collapseWhitespace(node.textContent || '');
    if (text.length > STRAY_TEXT_THRESHOLD) {
      removed.push(node);
    }
  }

  removed.forEach((node) => node.parentNode?.removeChild(node));
  return removed;
}

export function scheduleHeaderLeakCleanup(doc = (typeof document !== 'undefined' ? document : null)) {
  if (!doc) return;
  const runCleanup = () => cleanHeaderLeak(doc);

  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', runCleanup, { once: true });
  } else {
    runCleanup();
  }

  const MutationObserverCtor = doc.defaultView?.MutationObserver || globalThis.MutationObserver;
  if (!MutationObserverCtor) {
    return;
  }

  const root = doc.body || doc.documentElement;
  if (!root) {
    return;
  }

  const observer = new MutationObserverCtor(() => {
    runCleanup();
  });

  observer.observe(root, { childList: true, subtree: true });

  const timeout = doc.defaultView?.setTimeout || globalThis.setTimeout;
  timeout?.(() => observer.disconnect(), 4000);
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  if (typeof window.sanitizeQuizTitle !== 'function') {
    window.sanitizeQuizTitle = (rawTitle, fallbackTitle) => sanitizeQuizTitle(rawTitle, fallbackTitle);
  }
  window.getPreloadState = () => getPreloadState(document);
  window.setPreloadState = (state) => setPreloadState(state, document);
  window.cleanHeaderLeak = () => cleanHeaderLeak(document);
  ensurePreloadElement(document);
  scheduleHeaderLeakCleanup(document);
}

export default {
  sanitizeQuizTitle,
  cleanHeaderLeak,
  scheduleHeaderLeakCleanup,
  ensurePreloadElement,
  setPreloadState,
  getPreloadState,
};
