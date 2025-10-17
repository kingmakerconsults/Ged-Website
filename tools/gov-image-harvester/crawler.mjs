import { fetch } from 'undici';
import PQueue from 'p-queue';
import robotsParser from 'robots-parser';
import { JSDOM } from 'jsdom';
import { XMLParser } from 'fast-xml-parser';
import { IMAGE_KEYWORDS } from './image-pipeline.mjs';
import { isHostnameAllowed } from './allowlist.mjs';

const USER_AGENT = 'GedGovHarvester/1.0 (+https://example.com)';
const MAX_RETRIES = 4;
const BASE_BACKOFF_MS = 600;

const robotsCache = new Map();
const temporaryAllowedDomains = new Set();
const sitemapParser = new XMLParser({ ignoreAttributes: false, trimValues: true });
const queue = new PQueue({
  concurrency: 3,
  intervalCap: 6,
  interval: 1000,
  carryoverConcurrencyCount: true
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function addJitter(ms) {
  const jitter = Math.random() * 200;
  return ms + jitter;
}

function safeURL(u) {
  const s = String(u ?? '').trim();
  const fixed = s.startsWith('//') ? `https:${s}` : s.replace(/\s+/g, '');
  return new URL(fixed);
}

function normalizeTemporaryDomain(value) {
  if (!value) return '';
  let d = String(value).trim().toLowerCase();
  if (!d) return '';
  d = d.replace(/^https?:\/\//, '');
  d = d.replace(/#.*/, '');
  d = d.replace(/\/.*$/, '');
  d = d.replace(/:\\d+$/, '');
  return d;
}

export function setTemporaryAllowedDomains(domains = []) {
  temporaryAllowedDomains.clear();
  if (!domains) return;
  for (const entry of domains) {
    const normalized = normalizeTemporaryDomain(entry);
    if (!normalized) continue;
    temporaryAllowedDomains.add(normalized);
    temporaryAllowedDomains.add(normalized.replace(/^www\./, ''));
  }
}

function isTemporarilyAllowed(hostname) {
  if (!hostname) return false;
  const lower = hostname.toLowerCase();
  for (const allowed of temporaryAllowedDomains) {
    if (!allowed) continue;
    if (lower === allowed || lower.endsWith(`.${allowed}`)) {
      return true;
    }
  }
  return false;
}

function normalizeSitemapLocation(loc, baseUrl) {
  if (!loc) return '';
  let candidate = String(loc).trim();
  if (!candidate) return '';
  const match = candidate.match(/https?:\/\/[^\s"'>]+/i);
  if (match) {
    candidate = match[0];
  }
  try {
    return new URL(candidate, baseUrl).toString();
  } catch (err) {
    return '';
  }
}

export function parseSitemap(xml, baseUrl) {
  if (!xml) return [];
  let parsed;
  try {
    parsed = sitemapParser.parse(xml);
  } catch (err) {
    return [];
  }
  const entries = [];
  if (parsed?.urlset?.url) {
    const urls = Array.isArray(parsed.urlset.url) ? parsed.urlset.url : [parsed.urlset.url];
    for (const entry of urls) {
      if (!entry) continue;
      const normalized = normalizeSitemapLocation(entry.loc, baseUrl);
      if (!normalized) continue;
      entries.push({
        loc: normalized,
        lastmod: entry.lastmod || '',
        isIndex: false
      });
    }
  }
  if (parsed?.sitemapindex?.sitemap) {
    const nested = Array.isArray(parsed.sitemapindex.sitemap)
      ? parsed.sitemapindex.sitemap
      : [parsed.sitemapindex.sitemap];
    for (const entry of nested) {
      if (!entry) continue;
      const normalized = normalizeSitemapLocation(entry.loc, baseUrl);
      if (!normalized) continue;
      entries.push({
        loc: normalized,
        lastmod: entry.lastmod || '',
        isIndex: true
      });
    }
  }
  return entries;
}

export async function fetchSitemap(urlLike) {
  const { html } = await fetchHtml(urlLike);
  return html;
}

export async function collectAllSitemaps(url, depth = 0, maxDepth = 2, seen = new Set()) {
  if (depth > maxDepth) return [];
  let safe;
  try {
    safe = safeURL(url);
  } catch (err) {
    return [];
  }
  const absoluteUrl = safe.toString();
  if (seen.has(absoluteUrl)) {
    return [];
  }
  seen.add(absoluteUrl);
  let xml;
  try {
    xml = await fetchSitemap(absoluteUrl);
  } catch (err) {
    console.warn(`[WARN] Failed to fetch sitemap: ${absoluteUrl}. ${err.message}`);
    return [];
  }
  const entries = parseSitemap(xml, absoluteUrl);
  const results = [];
  const unique = new Set();
  const pushEntry = (entry) => {
    if (!entry?.loc) return;
    if (unique.has(entry.loc)) return;
    unique.add(entry.loc);
    results.push(entry);
  };
  for (const entry of entries) {
    pushEntry(entry);
  }
  for (const entry of entries) {
    const loc = entry?.loc;
    if (!loc) continue;
    const shouldRecurse = entry.isIndex || /\.xml($|[?#])/i.test(loc);
    if (!shouldRecurse) continue;
    const nested = await collectAllSitemaps(loc, depth + 1, maxDepth, seen);
    for (const child of nested) {
      pushEntry(child);
    }
  }
  return results;
}

async function fetchWithRetry(url, options = {}, attempt = 1) {
  const controller = new AbortController();
  const timeout = options.timeout ?? 10000;
  const timeoutHandle = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      redirect: 'follow',
      headers: {
        'user-agent': USER_AGENT,
        ...options.headers
      },
      signal: controller.signal
    });

    if ((response.status >= 500 || response.status === 429) && attempt < MAX_RETRIES) {
      const delay = addJitter(BASE_BACKOFF_MS * 2 ** (attempt - 1));
      await sleep(delay);
      return fetchWithRetry(url, options, attempt + 1);
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} for ${url}`);
    }

    return response;
  } catch (err) {
    if (attempt < MAX_RETRIES) {
      const delay = addJitter(BASE_BACKOFF_MS * 2 ** (attempt - 1));
      await sleep(delay);
      return fetchWithRetry(url, options, attempt + 1);
    }
    throw err;
  } finally {
    clearTimeout(timeoutHandle);
  }
}

export async function getRobots(urlLike) {
  const target = safeURL(urlLike);
  const { hostname, origin } = target;
  if (!isHostnameAllowed(hostname) && !isTemporarilyAllowed(hostname)) {
    throw new Error(`Robots check failed: domain not allowed (${hostname})`);
  }
  if (robotsCache.has(hostname)) {
    return robotsCache.get(hostname);
  }
  const robotsUrl = `${origin}/robots.txt`;
  try {
    const res = await queue.add(() => fetchWithRetry(robotsUrl, { timeout: 8000 }));
    const text = await res.text();
    const parser = robotsParser(robotsUrl, text);
    robotsCache.set(hostname, parser);
    return parser;
  } catch (error) {
    // Assume allow-all if robots fetch fails
    const parser = robotsParser(robotsUrl, '');
    robotsCache.set(hostname, parser);
    return parser;
  }
}

function isPathAllowed(parser, url) {
  try {
    return parser.isAllowed(url, USER_AGENT);
  } catch (err) {
    return true;
  }
}

export async function fetchHtml(url, timeoutMs = 10000) {
  const target = safeURL(url);
  if (!isHostnameAllowed(target.hostname) && !isTemporarilyAllowed(target.hostname)) {
    throw new Error(`Domain not allowed: ${target.hostname}`);
  }
  const targetUrl = target.toString();
  let robots;
  try {
    robots = await getRobots(targetUrl);
  } catch (err) {
    const robotError = new Error(`Robots unavailable for ${target.hostname}: ${err.message}`);
    robotError.code = 'ROBOTS_UNAVAILABLE';
    throw robotError;
  }
  if (robots && !isPathAllowed(robots, targetUrl)) {
    const disallowError = new Error(`Robots disallow ${targetUrl}`);
    disallowError.code = 'ROBOTS_DISALLOWED';
    throw disallowError;
  }
  await sleep(addJitter(50));
  const response = await queue.add(() => fetchWithRetry(targetUrl, { timeout: timeoutMs }));
  const html = await response.text();
  const finalUrl = response.url ?? targetUrl;
  const inlineCandidates = extractInlineImageCandidatesFromHtml(html, finalUrl);
  return { html, finalUrl, inlineCandidates };
}

function extractInlineImageCandidatesFromHtml(html, baseUrl) {
  if (!html || typeof html !== 'string') return [];
  if (!/<img|data-chart|map-figure|infographic/i.test(html)) return [];
  let document;
  try {
    const dom = new JSDOM(html);
    document = dom.window.document;
  } catch (err) {
    return [];
  }
  const seen = new Set();
  const results = [];

  const tryPush = (rawUrl, alt = '', className = '') => {
    if (!rawUrl) return;
    const candidateText = `${rawUrl} ${alt} ${className}`;
    if (!IMAGE_KEYWORDS.test(candidateText)) return;
    const match = rawUrl.match(/https?:\/\/[^\s"'>]+/i);
    const normalized = match ? match[0] : rawUrl;
    const abs = resolveUrl(baseUrl, normalized);
    if (!abs || seen.has(abs)) return;
    seen.add(abs);
    results.push({ url: abs, alt: alt?.trim?.() || '' });
  };

  const dataAttributes = [
    'src',
    'data-src',
    'data-original',
    'data-url',
    'data-image',
    'data-infographic',
    'data-chart',
    'data-map'
  ];

  const imgElements = Array.from(document.querySelectorAll('img'));
  for (const img of imgElements) {
    const alt = img.getAttribute('alt') || '';
    const className = img.getAttribute('class') || '';
    for (const attr of dataAttributes) {
      const value = img.getAttribute(attr);
      if (!value) continue;
      tryPush(value, alt, className);
    }
    if (img.dataset) {
      for (const value of Object.values(img.dataset)) {
        tryPush(value, alt, className);
      }
    }
  }

  const specialSelectors = '[data-chart], [data-map], [data-graph], [data-infographic], map-figure, infographic';
  const specialElements = Array.from(document.querySelectorAll(specialSelectors));
  for (const node of specialElements) {
    for (const attr of dataAttributes) {
      const value = node.getAttribute?.(attr);
      if (!value) continue;
      tryPush(value, '', '');
    }
  }

  return results;
}

const CATEGORY_SCORE = {
  'loc.gov': 1,
  'archives.gov': 0.95,
  'nationalgeographic.com': 0.9,
  'pewresearch.org': 0.9,
  'ourworldindata.org': 0.9,
  'cia.gov': 0.85,
  'un.org': 0.85,
  'pbs.org': 0.8,
  'smithsonianmag.com': 0.8
};

const SCORE_KEYWORDS = [
  'map',
  'graph',
  'chart',
  'diagram',
  'table',
  'census',
  'hurricane',
  'inflation',
  'gdp',
  'population',
  'timeline',
  'fraction',
  'algebra',
  'geometry',
  'equation',
  'slope',
  'histogram',
  'boxplot',
  'scatter',
  'probability',
  'mean',
  'median',
  'mode',
  'standard deviation'
];
const BONUS_KEYWORDS = [
  'map',
  'chart',
  'graph',
  'timeline',
  'infographic',
  'cartoon',
  'diagram',
  'equation',
  'function',
  'parabola',
  'linear',
  'pie chart',
  'bar chart',
  'box plot'
];
const BAD_CLASSES = ['logo', 'icon', 'sprite', 'banner', 'decorative', 'advertisement', 'social', 'avatar'];
const WATERMARK_PATTERN = /(shutterstock|alamy|getty)/i;

function toRegistrableDomain(hostname) {
  const parts = hostname.split('.').filter(Boolean);
  if (parts.length <= 2) {
    return hostname;
  }
  return parts.slice(-2).join('.');
}

function resolveUrl(baseUrl, relative) {
  try {
    return new URL(relative, baseUrl).toString();
  } catch (err) {
    return null;
  }
}

function textContent(node) {
  return node ? node.textContent.trim().replace(/\s+/g, ' ') : '';
}

function scoreCandidate(candidate) {
  let score = 0;
  if (candidate.alt && candidate.alt.split(/\s+/).length >= 6) score += 3;
  if (candidate.caption && candidate.caption.split(/\s+/).length >= 6) score += 3;
  const lcSrc = candidate.srcAbs.toLowerCase();
  if (BAD_CLASSES.some((bad) => candidate.classNames.has(bad))) score -= 5;
  for (const keyword of SCORE_KEYWORDS) {
    if (lcSrc.includes(keyword) || candidate.alt.toLowerCase().includes(keyword) || candidate.caption.toLowerCase().includes(keyword)) {
      score += 2;
    }
  }
  for (const keyword of BONUS_KEYWORDS) {
    if (candidate.fileName.includes(keyword) || candidate.caption.toLowerCase().includes(keyword)) {
      score += 0.2;
      break;
    }
  }
  if (candidate.width && candidate.width >= 600) score += 1;
  if (candidate.height && candidate.height >= 400) score += 1;
  const categoryDomain = candidate.registrableDomain;
  if (CATEGORY_SCORE[categoryDomain]) {
    score += CATEGORY_SCORE[categoryDomain];
  } else if (CATEGORY_SCORE[candidate.hostname]) {
    score += CATEGORY_SCORE[candidate.hostname];
  }
  return score;
}

function extractPublishedDate(document) {
  const metaSelectors = [
    'meta[property="article:published_time"]',
    'meta[name="pubdate"]',
    'meta[name="publish-date"]',
    'meta[name="date"]',
    'meta[property="og:pubdate"]',
    'meta[name="dcterms.date"]'
  ];
  for (const selector of metaSelectors) {
    const el = document.querySelector(selector);
    const content = el?.getAttribute('content');
    if (content) {
      return content.trim();
    }
  }
  const timeEl = document.querySelector('time[datetime]');
  if (timeEl) {
    return timeEl.getAttribute('datetime');
  }
  return '';
}

function collectSurroundingText(img) {
  const blocks = [];
  let node = img.parentElement;
  let depth = 0;
  while (node && depth < 3) {
    const paragraphs = node.querySelectorAll('p');
    for (const p of paragraphs) {
      const text = textContent(p);
      if (text.length) {
        blocks.push(text);
      }
    }
    node = node.parentElement;
    depth += 1;
  }
  return blocks.slice(0, 5).join('\n');
}

export function extractPageInfo(html, baseUrl, inlineCandidates = []) {
  const dom = new JSDOM(html);
  const { document } = dom.window;
  const title = textContent(document.querySelector('title'));
  const published = extractPublishedDate(document);
  const images = [];
  const seen = new Set();

  const figureEls = Array.from(document.querySelectorAll('figure'));
  for (const figure of figureEls) {
    const img = figure.querySelector('img');
    if (!img) continue;
    const src = img.getAttribute('src') || img.getAttribute('data-src');
    if (!src) continue;
    const abs = resolveUrl(baseUrl, src);
    if (!abs || seen.has(abs)) continue;
    if (WATERMARK_PATTERN.test(abs)) continue;
    const { hostname } = new URL(abs);
    if (!isHostnameAllowed(hostname)) continue;
    seen.add(abs);
    const caption = textContent(figure.querySelector('figcaption'));
    const alt = img.getAttribute('alt') ? img.getAttribute('alt').trim() : '';
    const width = parseInt(img.getAttribute('width'), 10) || undefined;
    const height = parseInt(img.getAttribute('height'), 10) || undefined;
    if ((width && width < 400) || (height && height < 400)) continue;
    const classNames = new Set((img.getAttribute('class') || '').toLowerCase().split(/\s+/).filter(Boolean));
    const context = collectSurroundingText(figure) || collectSurroundingText(img);
    const pathname = new URL(abs).pathname;
    const fileName = pathname ? pathname.split('/').pop()?.toLowerCase() ?? '' : '';
    const registrableDomain = toRegistrableDomain(hostname.toLowerCase());
    images.push({
      srcAbs: abs,
      alt,
      caption,
      width,
      height,
      classNames,
      context,
      hostname: hostname.toLowerCase(),
      registrableDomain,
      fileName,
      score: 0,
      rel: img.getAttribute('rel') || ''
    });
  }

  const imgEls = Array.from(document.querySelectorAll('img')); // fallback non-figure
  for (const img of imgEls) {
    const src = img.getAttribute('src') || img.getAttribute('data-src');
    if (!src) continue;
    const abs = resolveUrl(baseUrl, src);
    if (!abs || seen.has(abs)) continue;
    if (WATERMARK_PATTERN.test(abs)) continue;
    const { hostname } = new URL(abs);
    if (!isHostnameAllowed(hostname)) continue;
    seen.add(abs);
    const width = parseInt(img.getAttribute('width'), 10) || undefined;
    const height = parseInt(img.getAttribute('height'), 10) || undefined;
    if ((width && width < 400) || (height && height < 400)) continue;
    const classNames = new Set((img.getAttribute('class') || '').toLowerCase().split(/\s+/).filter(Boolean));
    const alt = img.getAttribute('alt') ? img.getAttribute('alt').trim() : '';
    const caption = '';
    const context = collectSurroundingText(img);
    const pathname = new URL(abs).pathname;
    const fileName = pathname ? pathname.split('/').pop()?.toLowerCase() ?? '' : '';
    const registrableDomain = toRegistrableDomain(hostname.toLowerCase());
    images.push({
      srcAbs: abs,
      alt,
      caption,
      width,
      height,
      classNames,
      context,
      hostname: hostname.toLowerCase(),
      registrableDomain,
      fileName,
      score: 0,
      rel: img.getAttribute('rel') || ''
    });
  }

  if (inlineCandidates && inlineCandidates.length) {
    for (const candidate of inlineCandidates) {
      if (!candidate?.url || seen.has(candidate.url)) continue;
      let hostname;
      try {
        ({ hostname } = new URL(candidate.url));
      } catch (err) {
        continue;
      }
      if (!isHostnameAllowed(hostname)) continue;
      seen.add(candidate.url);
      const registrableDomain = toRegistrableDomain(hostname.toLowerCase());
      const pathname = new URL(candidate.url).pathname;
      const fileName = pathname ? pathname.split('/').pop()?.toLowerCase() ?? '' : '';
      images.push({
        srcAbs: candidate.url,
        alt: candidate.alt || '',
        caption: '',
        width: undefined,
        height: undefined,
        classNames: new Set(),
        context: '',
        hostname: hostname.toLowerCase(),
        registrableDomain,
        fileName,
        score: 0,
        rel: ''
      });
    }
  }

  const scored = images
    .filter((candidate) => !candidate.rel.toLowerCase().includes('nofollow'))
    .map((candidate) => ({ ...candidate, score: scoreCandidate(candidate) }))
    .sort((a, b) => b.score - a.score);

  return {
    title,
    published,
    images: scored
  };
}
