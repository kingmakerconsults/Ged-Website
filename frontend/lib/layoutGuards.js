const HEADER_SELECTOR = '.page-header, header, .quiz-header';
export const STRAY_TEXT_THRESHOLD = 100;
const MAX_QUIZ_TITLE_LENGTH = 140;
export const PRELOAD_ELEMENT_ID = '__PRELOAD__';
export const APP_ROOT_ID = 'root';

const DEFAULT_NODE_TYPES = {
  TEXT: 3,
  COMMENT: 8,
};

const DEV_MODE = (() => {
  if (typeof process !== 'undefined' && process?.env?.NODE_ENV) {
    return process.env.NODE_ENV !== 'production';
  }
  if (typeof window !== 'undefined') {
    const host = window.location?.hostname || '';
    return host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0';
  }
  return false;
})();

function toFallbackString(fallback) {
  if (typeof fallback === 'string' && fallback.trim()) {
    return fallback.trim();
  }
  return 'Practice Quiz';
}

function collapseWhitespace(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function getNodeConstants(doc) {
  const NodeCtor = doc?.defaultView?.Node || globalThis.Node;
  if (!NodeCtor) {
    return DEFAULT_NODE_TYPES;
  }
  return {
    TEXT: NodeCtor.TEXT_NODE,
    COMMENT: NodeCtor.COMMENT_NODE,
  };
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
    const target = doc.head || doc.body || doc.documentElement;
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

function pruneLongTextNodes(root, doc) {
  if (!root || !doc) return [];
  const { TEXT } = getNodeConstants(doc);
  const removed = [];

  for (const node of Array.from(root.childNodes)) {
    if (node.nodeType !== TEXT) {
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

export function cleanHeaderLeak(doc = (typeof document !== 'undefined' ? document : null)) {
  if (!doc) return [];
  const header = doc.querySelector(HEADER_SELECTOR);
  if (!header) return [];
  return pruneLongTextNodes(header, doc);
}

export function scheduleHeaderLeakCleanup(doc = (typeof document !== 'undefined' ? document : null)) {
  if (!doc) return;
  const runCleanup = () => {
    lockdownDom(doc);
    cleanHeaderLeak(doc);
  };

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

export function appendSafeText(parent, text) {
  if (!parent) return;
  const doc = parent.ownerDocument || (typeof document !== 'undefined' ? document : null);
  if (!doc) return;
  const node = doc.createTextNode(String(text ?? ''));
  parent.appendChild(node);
}

export function setSafeText(target, text) {
  if (!target) return;
  while (target.firstChild) {
    target.removeChild(target.firstChild);
  }
  if (text == null || text === '') {
    return;
  }
  appendSafeText(target, text);
}

export const logToPage = (...args) => {
  if (!DEV_MODE) return;
  const doc = typeof document !== 'undefined' ? document : null;
  if (!doc) {
    console.debug('[logToPage]', ...args);
    return;
  }

  let details = doc.getElementById('__DEV_LOG__');
  if (!details) {
    details = doc.createElement('details');
    details.id = '__DEV_LOG__';
    details.style.display = 'none';
    const summary = doc.createElement('summary');
    setSafeText(summary, 'Debug Log');
    details.appendChild(summary);
    doc.body?.appendChild(details);
  }

  const entry = doc.createElement('pre');
  entry.style.margin = '0';
  appendSafeText(entry, args.map((arg) => {
    if (typeof arg === 'string') {
      return arg;
    }
    try {
      return JSON.stringify(arg, null, 2);
    } catch (error) {
      return String(arg);
    }
  }).join(' '));
  details.appendChild(entry);
};

export function lockdownDom(doc = (typeof document !== 'undefined' ? document : null)) {
  if (!doc) return;
  const appRoot = doc.getElementById(APP_ROOT_ID);
  const { COMMENT } = getNodeConstants(doc);

  if (appRoot) {
    for (const node of Array.from(doc.body.childNodes)) {
      if (node === appRoot || node.nodeType === COMMENT) {
        continue;
      }
      if (node.nodeType === 1 && node.nodeName === 'SCRIPT') {
        continue;
      }
      doc.body.removeChild(node);
    }
  }

  pruneLongTextNodes(appRoot, doc);

  const header = doc.querySelector(HEADER_SELECTOR) || appRoot?.parentElement || appRoot;
  pruneLongTextNodes(header, doc);
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  if (typeof window.sanitizeQuizTitle !== 'function') {
    window.sanitizeQuizTitle = (rawTitle, fallbackTitle) => sanitizeQuizTitle(rawTitle, fallbackTitle);
  }
  window.getPreloadState = () => getPreloadState(document);
  window.setPreloadState = (state) => setPreloadState(state, document);
  window.cleanHeaderLeak = () => cleanHeaderLeak(document);
  window.SafeDOM = Object.assign({}, window.SafeDOM, {
    appendSafeText: (parent, text) => appendSafeText(parent, text),
    setSafeText: (target, text) => setSafeText(target, text),
    logToPage: (...args) => logToPage(...args),
  });
  lockdownDom(document);
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
  appendSafeText,
  setSafeText,
  logToPage,
  lockdownDom,
};
