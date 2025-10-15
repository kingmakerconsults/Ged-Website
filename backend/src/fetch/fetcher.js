const { APPROVED_DOMAINS } = require('./allowlist');
const { URL } = require('url');
let undici;
try {
  undici = require('undici');
} catch (err) {
  if (typeof fetch === 'function' && typeof AbortController === 'function') {
    undici = {
      fetch: (...args) => fetch(...args),
      AbortController
    };
  } else {
    throw err;
  }
}
let JSDOM;
try {
  ({ JSDOM } = require('jsdom'));
} catch (err) {
  JSDOM = null;
}

const CACHE = new Map();
const TTL_MS = 6 * 60 * 60 * 1000; // 6h
function cacheGet(k){ const v=CACHE.get(k); if(!v) return null; if(Date.now()>v.exp){CACHE.delete(k); return null;} return v.val; }
function cacheSet(k,val){ if(CACHE.size>200) CACHE.delete(CACHE.keys().next().value); CACHE.set(k,{val,exp:Date.now()+TTL_MS}); }

function isApproved(urlStr){
  try { const u = new URL(urlStr); return APPROVED_DOMAINS.includes(u.hostname); }
  catch { return false; }
}

function stripTags(html = '') {
  return html.replace(/<[^>]*>/g, ' ');
}

function extractWithFallback(html) {
  if (JSDOM) {
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const title = (doc.querySelector('h1')?.textContent || doc.title || '').trim();
    doc.querySelectorAll('script,style,nav,header,footer,form').forEach(n=>n.remove());
    const paras = Array.from(doc.querySelectorAll('p')).map(p=>p.textContent.trim()).filter(Boolean);
    const tables = Array.from(doc.querySelectorAll('table')).slice(0,2).map(t=>t.outerHTML);
    return { title, text: paras.join('\n\n'), tables };
  }

  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<form[\s\S]*?<\/form>/gi, '');

  const titleMatch = cleaned.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || cleaned.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? stripTags(titleMatch[1]).trim() : '';

  const paras = [];
  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let match;
  while ((match = pRegex.exec(cleaned)) && paras.length < 200) {
    const text = stripTags(match[1]).replace(/\s+/g, ' ').trim();
    if (text) paras.push(text);
  }

  const tables = [];
  const tableRegex = /<table[\s\S]*?<\/table>/gi;
  while ((match = tableRegex.exec(cleaned)) && tables.length < 2) {
    tables.push(match[0]);
  }

  return { title, text: paras.join('\n\n'), tables };
}

async function fetchApproved(urlStr, timeoutMs=8000, maxBytes=400_000){
  if(!isApproved(urlStr)) throw new Error('Domain not approved');
  const key = `GET:${urlStr}`;
  const hit = cacheGet(key); if(hit) return hit;

  const AbortCtrl = undici.AbortController || AbortController;
  const ac = new AbortCtrl();
  const id = setTimeout(()=>ac.abort(), timeoutMs);
  const res = await undici.fetch(urlStr, { signal: ac.signal });
  clearTimeout(id);
  if(!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if(buf.byteLength>maxBytes) throw new Error('Response too large');

  const html = buf.toString('utf8');
  const { title, text, tables } = extractWithFallback(html);

  const result = { url: urlStr, title, text, tables, fetchedAt: new Date().toISOString() };
  cacheSet(key, result);
  return result;
}

module.exports = { fetchApproved, isApproved };
