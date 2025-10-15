import { fetch } from 'undici';
import PQueue from 'p-queue';
import robotsParser from 'robots-parser';
import { JSDOM } from 'jsdom';
import { isHostnameAllowed } from './allowlist.mjs';

const USER_AGENT = 'GedGovHarvester/1.0 (+https://example.com)';
const MAX_RETRIES = 4;
const BASE_BACKOFF_MS = 600;

const robotsCache = new Map();
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
  const { hostname, origin } = new URL(urlLike);
  if (!isHostnameAllowed(hostname)) {
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
  const target = new URL(url);
  if (!isHostnameAllowed(target.hostname)) {
    throw new Error(`Domain not allowed: ${target.hostname}`);
  }
  const robots = await getRobots(url);
  if (robots && !isPathAllowed(robots, url)) {
    throw new Error(`Robots disallow ${url}`);
  }
  await sleep(addJitter(50));
  const response = await queue.add(() => fetchWithRetry(url, { timeout: timeoutMs }));
  const html = await response.text();
  const finalUrl = response.url ?? url;
  return { html, finalUrl };
}

const SCORE_KEYWORDS = ['map', 'graph', 'chart', 'diagram', 'table', 'census', 'hurricane', 'inflation', 'gdp', 'population', 'timeline'];
const BAD_CLASSES = ['logo', 'icon', 'sprite', 'banner', 'decorative', 'advertisement', 'social', 'avatar'];

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
  if (candidate.width && candidate.width >= 600) score += 1;
  if (candidate.height && candidate.height >= 400) score += 1;
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

export function extractPageInfo(html, baseUrl) {
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
    seen.add(abs);
    const caption = textContent(figure.querySelector('figcaption'));
    const alt = img.getAttribute('alt') ? img.getAttribute('alt').trim() : '';
    const width = parseInt(img.getAttribute('width'), 10) || undefined;
    const height = parseInt(img.getAttribute('height'), 10) || undefined;
    const classNames = new Set((img.getAttribute('class') || '').toLowerCase().split(/\s+/).filter(Boolean));
    const context = collectSurroundingText(figure) || collectSurroundingText(img);
    images.push({
      srcAbs: abs,
      alt,
      caption,
      width,
      height,
      classNames,
      context,
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
    seen.add(abs);
    const width = parseInt(img.getAttribute('width'), 10) || undefined;
    const height = parseInt(img.getAttribute('height'), 10) || undefined;
    const classNames = new Set((img.getAttribute('class') || '').toLowerCase().split(/\s+/).filter(Boolean));
    const alt = img.getAttribute('alt') ? img.getAttribute('alt').trim() : '';
    const caption = '';
    const context = collectSurroundingText(img);
    images.push({
      srcAbs: abs,
      alt,
      caption,
      width,
      height,
      classNames,
      context,
      score: 0,
      rel: img.getAttribute('rel') || ''
    });
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
