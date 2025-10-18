#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fetchHtml, extractPageInfo, setTemporaryAllowedDomains, fetchSitemap } from './crawler.mjs';
import { downloadAndNormalize, createSha1, decideFileName, writeImage } from './image-pipeline.mjs';
import { loadMetadata, buildIndexes, upsertEntry, saveMetadata } from './metadata.mjs';
import crypto from 'node:crypto';
import { XMLParser } from 'fast-xml-parser';

const WIKI_API = 'https://en.wikipedia.org/w/api.php';
const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';

async function fetchJson(url, params = {}) {
  const u = new URL(url);
  Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v));
  const res = await fetch(u, {
    headers: { 'User-Agent': 'GED-Harvester/1.0 (contact: admin@example.com)' }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${u}`);
  return res.json();
}

const SUBJECT_CONFIG = {
  Science: {
    folder: 'Science',
    allowedDomains: new Set(['nasa.gov', 'climate.nasa.gov', 'noaa.gov', 'nhc.noaa.gov', 'usgs.gov', 'epa.gov', 'nih.gov', 'ncbi.nlm.nih.gov']),
    sitemaps: [
      'https://www.nasa.gov/sitemap.xml',
      'https://climate.nasa.gov/sitemap.xml',
      'https://www.noaa.gov/sitemap.xml',
      'https://www.usgs.gov/sitemap.xml',
      'https://www.epa.gov/sitemap.xml',
      'https://www.nih.gov/sitemap.xml'
    ]
  },
  'Science Wikipedia': {
    folder: 'Science',
    allowedDomains: new Set(['wikipedia.org', 'wikimedia.org']),
    sitemaps: []
  },
  'Social Studies': {
    folder: 'Social Studies',
    allowedDomains: new Set([
      'loc.gov',
      'libraryofcongress.gov',
      'archives.gov',
      'census.gov',
      'bls.gov',
      'nps.gov',
      'data.gov',
      'carto.com',
      'nationalgeographic.com',
      'education.nationalgeographic.org',
      'pewresearch.org',
      'datacommons.org',
      'statista.com',
      'ourworldindata.org',
      'worldbank.org',
      'imf.org',
      'cia.gov',
      'un.org',
      'who.int',
      'data.oecd.org',
      'oecd.org',
      'britannica.com',
      'reuters.com',
      'graphics.reuters.com',
      'pbs.org',
      'pbslearningmedia.org',
      'smithsonianmag.com',
      'history.com',
      'teachinghistory.org',
      'ed.gov',
      'opendata.arcgis.com'
    ]),
    sitemaps: [
      'https://www.loc.gov/sitemap.xml',
      'https://www.archives.gov/sitemap.xml',
      'https://www.census.gov/sitemap.xml',
      'https://www.bls.gov/sitemap.xml',
      'https://www.nps.gov/sitemap.xml',
      'https://www.data.gov/sitemap.xml'
    ]
  },
  'Social Studies Wikipedia': {
    folder: 'Social Studies',
    allowedDomains: new Set(['wikipedia.org', 'wikimedia.org']),
    sitemaps: []
  },
  Math: {
    folder: 'Math',
    allowedDomains: new Set([
      'khanacademy.org',
      'mathisfun.com',
      'mathworld.wolfram.com',
      'purplemath.com',
      'desmos.com',
      'openstax.org',
      'nctm.org',
      'ams.org',
      'statisticshowto.com',
      'education.nationalgeographic.org',
      'ourworldindata.org',
      'worldbank.org',
      'datacommons.org',
      'statista.com',
      'pbslearningmedia.org',
      'history.com',
      'opendata.arcgis.com',
      'census.gov',
      'bls.gov',
      'bea.gov',
      'fred.stlouisfed.org'
    ]),
    sitemaps: [
      'https://www.khanacademy.org/sitemap.xml',
      'https://www.mathisfun.com/sitemap.xml',
      'https://mathworld.wolfram.com/sitemap_index.xml',
      'https://www.purplemath.com/sitemap.xml',
      'https://www.desmos.com/sitemap.xml',
      'https://openstax.org/sitemap.xml',
      'https://www.nctm.org/sitemap.xml',
      'https://www.ams.org/sitemap.xml',
      'https://www.statisticshowto.com/sitemap_index.xml',
      'https://fred.stlouisfed.org/sitemap.xml'
    ]
  }
};

const METADATA_PATH = path.resolve('image_metadata_final.json');
const STATE_PATH = path.resolve('tools/gov-image-harvester/.crawl-state.json');
const MAX_SEED_PER_SITEMAP = 80;
const MAX_PAGES = 300;
const MAX_IMAGES_PER_SEED = 3;

const DEFAULT_SITEMAP_PATHS = ['/sitemap.xml', '/sitemap_index.xml'];

const xmlParser = new XMLParser({ ignoreAttributes: false, trimValues: true });

const apiImageCache = new Map();

function cleanCommonsText(value) {
  if (!value) return '';
  return value
    .replace(/<\/?[a-z][^>]*>/gi, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchWikipediaTitlesByTopics(topics, limit = 50) {
  if (!topics || topics.length === 0) return [];
  const q = topics.join(' ');
  const titles = [];
  let sroffset = 0;

  while (titles.length < limit) {
    const data = await fetchJson(WIKI_API, {
      action: 'query',
      list: 'search',
      srsearch: q,
      srlimit: Math.min(50, limit - titles.length),
      sroffset,
      format: 'json',
      origin: '*'
    });
    const batch = (data?.query?.search || []).map((s) => s.title);
    titles.push(...batch);
    if (!data?.continue?.sroffset || batch.length === 0) break;
    sroffset = data.continue.sroffset;
    await new Promise((r) => setTimeout(r, 200));
  }
  return Array.from(new Set(titles)).slice(0, limit);
}

async function fetchCommonsImagesForTitles(titles, limit = 150, onlyTypes = [], filenameContains = []) {
  const results = [];
  const typeMatchers = (onlyTypes || []).map((s) => s.toLowerCase());
  const nameMatchers = (filenameContains || []).map((s) => s.toLowerCase());

  for (const title of titles) {
    if (results.length >= limit) break;

    const page = await fetchJson(WIKI_API, {
      action: 'query',
      prop: 'images',
      titles: title,
      imlimit: 'max',
      format: 'json',
      origin: '*'
    });

    const pages = page?.query?.pages ? Object.values(page.query.pages) : [];
    const images = (pages[0]?.images || [])
      .map((img) => img?.title)
      .filter(Boolean);
    if (images.length === 0) continue;

    const chunkSize = 50;
    for (let i = 0; i < images.length && results.length < limit; i += chunkSize) {
      const batch = images.slice(i, i + chunkSize);
      const data = await fetchJson(COMMONS_API, {
        action: 'query',
        prop: 'imageinfo',
        titles: batch.join('|'),
        iiprop: 'url|mime|size|extmetadata',
        iiurlwidth: 1600,
        format: 'json',
        origin: '*'
      });

      const pages2 = data?.query?.pages ? Object.values(data.query.pages) : [];
      for (const p of pages2) {
        const ii = Array.isArray(p?.imageinfo) ? p.imageinfo[0] : null;
        if (!ii?.url) continue;

        const fileTitle = (p.title || '').toLowerCase();
        const mime = (ii.mime || '').toLowerCase();
        const lic = ii.extmetadata?.LicenseShortName?.value || '';
        const objectName = cleanCommonsText(ii.extmetadata?.ObjectName?.value || '');
        const description = cleanCommonsText(ii.extmetadata?.ImageDescription?.value || objectName);
        const credit = cleanCommonsText(ii.extmetadata?.Credit?.value || '');
        const licenseUrl = cleanCommonsText(ii.extmetadata?.LicenseUrl?.value || '');

        if (nameMatchers.length && !nameMatchers.some((k) => fileTitle.includes(k))) continue;

        if (typeMatchers.length) {
          const metaName = (objectName || description || '').toLowerCase();
          const hit = typeMatchers.some(
            (t) =>
              fileTitle.includes(t) ||
              metaName.includes(t) ||
              (mime.includes('svg') && (t === 'chart' || t === 'diagram'))
          );
          if (!hit) continue;
        }

        const commonsTitle = (p.title || '').replace(/ /g, '_');
        const commonsPage = commonsTitle
          ? `https://commons.wikimedia.org/wiki/${encodeURI(commonsTitle)}`
          : '';

        results.push({
          url: ii.url,
          width: ii.width,
          height: ii.height,
          mime,
          license: lic,
          licenseUrl,
          credit,
          description,
          sourcePage: title,
          filename: p.title,
          commonsPage
        });

        if (results.length >= limit) break;
      }

      await new Promise((r) => setTimeout(r, 200));
    }
  }

  return results;
}

async function discoverSitemapsForDomain(domain) {
  const tried = [];
  const found = new Set();

  const d = String(domain).trim().replace(/^https?:\/\//, '');
  const candidates = [
    `https://${d}${DEFAULT_SITEMAP_PATHS[0]}`,
    `https://${d}${DEFAULT_SITEMAP_PATHS[1]}`,
    `https://www.${d}${DEFAULT_SITEMAP_PATHS[0]}`,
    `https://www.${d}${DEFAULT_SITEMAP_PATHS[1]}`
  ];

  for (const url of candidates) {
    tried.push(url);
    try {
      const { html } = await fetchHtml(url);
      if (html && html.trim().length) found.add(url);
    } catch {}
  }

  for (const robots of [`https://${d}/robots.txt`, `https://www.${d}/robots.txt`]) {
    tried.push(robots);
    try {
      const { html } = await fetchHtml(robots);
      if (html) {
        const lines = html.split(/\r?\n/);
        for (const line of lines) {
          const m = line.match(/^\s*Sitemap:\s*(\S+)/i);
          if (m) {
            const u = m[1].trim();
            const resolved = u.startsWith('//') ? `https:${u}` : u;
            try {
              new URL(resolved);
              found.add(resolved);
            } catch {}
          }
        }
      }
    } catch {}
  }
  return { tried, sitemaps: [...found] };
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token.startsWith('--')) {
      const key = token.slice(2);
      if (['subject', 'topics', 'limit', 'domains'].includes(key)) {
        args[key] = argv[i + 1];
        i += 1;
      } else if (key === 'only-types') {
        args.onlyTypes = argv[i + 1];
        i += 1;
      } else if (key === 'filename-contains') {
        args.filenameContains = argv[i + 1];
        i += 1;
      } else if (key === 'dry') {
        args.dry = true;
      }
    }
  }
  return args;
}

function canonicalizeUrl(urlLike) {
  const url = new URL(urlLike);
  url.hash = '';
  if (url.searchParams) {
    url.searchParams.sort();
  }
  return url.toString();
}

async function loadState() {
  try {
    const raw = await fs.readFile(STATE_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return { subjects: {}, sha1: {}, sources: {} };
    }
    throw err;
  }
}

async function saveState(state, dryRun) {
  if (dryRun) return;
  await fs.mkdir(path.dirname(STATE_PATH), { recursive: true });
  await fs.writeFile(STATE_PATH, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
}

function ensureSubjectState(state, subject) {
  if (!state.subjects[subject]) {
    state.subjects[subject] = { visitedPages: {}, sourceUrls: {} };
  }
  return state.subjects[subject];
}

function normalizeUrlLike(u) {
  if (!u) return '';
  let s = String(u).trim();
  if (!s) return '';
  if (s.startsWith('//')) s = 'https:' + s;
  s = s.replace(/\s+/g, '');
  return s;
}

function filterByTopics(urls, topics) {
  if (!topics || topics.length === 0) {
    return urls;
  }
  const lowerTopics = topics.map((t) => t.toLowerCase());
  return urls.filter((item) => {
    const target = item.loc.toLowerCase();
    return lowerTopics.some((topic) => target.includes(topic));
  });
}

function shouldAcceptHost(subject, hostname) {
  return isAllowedHost(subject, hostname, SUBJECT_CONFIG[subject]);
}

async function collectSeedUrls(subject, topics, limit, opts = {}) {
  const config = SUBJECT_CONFIG[subject];
  const onlyTypes = (opts.onlyTypes || []).map((s) => s.toLowerCase());
  const filenameContains = (opts.filenameContains || []).map((s) => s.toLowerCase());

  if (!config?.sitemaps || config.sitemaps.length === 0) {
    if (!topics || topics.length === 0) {
      console.warn(`[WARN] Subject "${subject}" has no sitemaps and no topics; nothing to do.`);
      return [];
    }
    console.log(`[INFO] Using MediaWiki API provider for "${subject}" (no sitemaps).`);
    apiImageCache.clear();
    const titles = await fetchWikipediaTitlesByTopics(topics, Math.min(limit * 2, 200));
    if (titles.length === 0) return [];
    const images = await fetchCommonsImagesForTitles(titles, limit, onlyTypes, filenameContains);
    for (const image of images) {
      apiImageCache.set(image.url, image);
    }
    return images.map((x) => x.url);
  }

  // EXISTING SITEMAP LOGIC (unchanged)
  const seeds = new Set();
  for (const sitemapUrl of config.sitemaps) {
    if (seeds.size > MAX_PAGES) break;
    try {
      const xml = await fetchSitemap(sitemapUrl);
      const parsed = xmlParser.parse(xml);
      let urls = [];
      if (parsed.urlset?.url) {
        urls = Array.isArray(parsed.urlset.url) ? parsed.urlset.url : [parsed.urlset.url];
      } else if (parsed.sitemapindex?.sitemap) {
        const nested = Array.isArray(parsed.sitemapindex.sitemap) ? parsed.sitemapindex.sitemap : [parsed.sitemapindex.sitemap];
        const limitedNested = nested.slice(0, 5);
        for (const child of limitedNested) {
          const childLoc = child.loc;
          if (!childLoc) continue;
          try {
            const childXml = await fetchSitemap(childLoc);
            const childParsed = xmlParser.parse(childXml);
            const childUrls = childParsed.urlset?.url || [];
            const normalized = Array.isArray(childUrls) ? childUrls : [childUrls];
            for (const entry of normalized) {
              if (entry?.loc) {
                urls.push(entry);
              }
            }
          } catch (error) {
            // ignore nested errors but continue
          }
        }
      }
      const filtered = filterByTopics(
        urls
          .map((entry) => ({
            loc: entry?.loc,
            lastmod: entry?.lastmod || ''
          }))
          .filter((entry) => entry.loc && shouldAcceptHost(subject, new URL(entry.loc).hostname)),
        topics
      ).slice(0, MAX_SEED_PER_SITEMAP);
      for (const entry of filtered) {
        if (seeds.size >= MAX_PAGES) break;
        seeds.add(entry.loc);
      }
    } catch (error) {
      console.warn(`[WARN] Skipping failed sitemap: ${sitemapUrl}`);
      if (error?.message) {
        console.warn(`  Reason: ${error.message}`);
      }
      continue;
    }
  }
  if (topics && topics.length > 0) {
    return Array.from(seeds).slice(0, limit * 4);
  }
  return Array.from(seeds).slice(0, limit * 3);
}

function generateAltText(image, pageInfo, dominantType) {
  const baseText = image.caption || image.alt || pageInfo.title;
  const prefix = dominantType ? dominantType.charAt(0).toUpperCase() + dominantType.slice(1) : 'Image';
  let candidate = baseText ? baseText : `${prefix} from ${new URL(image.srcAbs).hostname}`;
  candidate = candidate.replace(/\s+/g, ' ').trim();
  if (!candidate.toLowerCase().startsWith(prefix.toLowerCase())) {
    candidate = `${prefix}: ${candidate}`;
  }
  const words = candidate.split(/\s+/);
  if (words.length > 22) {
    candidate = words.slice(0, 22).join(' ');
  }
  return candidate;
}

function summarizeContext(context, sentencesNeeded = 2) {
  if (!context) return [];
  const sentences = context
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return sentences.slice(0, sentencesNeeded);
}

function generateDetailedDescription(image, pageInfo, dominantType) {
  const sentences = [];
  const prefix = dominantType ? dominantType : 'image';
  if (image.caption) {
    sentences.push(image.caption.trim());
  }
  if (image.alt && (!image.caption || sentences.length < 2)) {
    sentences.push(image.alt.trim());
  }
  const contextSentences = summarizeContext(image.context, 2 - sentences.length);
  sentences.push(...contextSentences);
  if (sentences.length < 2) {
    const fallback = `${prefix.charAt(0).toUpperCase() + prefix.slice(1)} related to ${pageInfo.title || 'the topic'} with explanatory details.`;
    sentences.push(fallback);
  }
  while (sentences.length < 2) {
    sentences.push('The description provides context for quiz creation.');
  }
  return sentences.slice(0, 4).join(' ');
}

const REQUIRED_KEYWORDS = ['education', 'historical', 'economic', 'timeline'];

function buildMetaText(image, pageInfo) {
  return [image.caption, image.alt, image.context, pageInfo.title]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

function inferDominantType(image, pageInfo) {
  const metaText = buildMetaText(image, pageInfo);
  let type = 'photo';
  if (/cartoon|caricature/.test(metaText)) type = 'cartoon';
  else if (/map|atlas|projection/.test(metaText)) type = 'map';
  else if (/chart|graph|plot|trend|line|bar|pie/.test(metaText)) type = 'chart';
  else if (/timeline|sequence/.test(metaText)) type = 'timeline';
  return { dominantType: type, metaText };
}

function generateKeywords(image, pageInfo, dominantType, metaText) {
  const tokens = metaText
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2);
  const keywordOrder = [];
  const seen = new Set();
  if (dominantType && dominantType !== 'photo') {
    keywordOrder.push(dominantType);
  }
  keywordOrder.push(...REQUIRED_KEYWORDS);
  for (const token of tokens) {
    keywordOrder.push(token);
  }
  const keywords = [];
  for (const token of keywordOrder) {
    if (!token) continue;
    if (seen.has(token)) continue;
    seen.add(token);
    keywords.push(token);
    if (keywords.length >= 12) break;
  }
  if (keywords.length === 0) {
    keywords.push('education');
  }
  return keywords;
}

function ensureLicense(pageInfo, hostname, subject) {
  const lowerHost = hostname.toLowerCase();
  let license = 'Public Domain or CC-BY';
  if (lowerHost.endsWith('.gov')) {
    license = 'Public Domain (US Federal)';
  } else if (lowerHost.endsWith('.edu')) {
    license = 'Educational use permitted';
  }
  if (subject !== 'Social Studies' && license === 'Public Domain or CC-BY') {
    license = 'Public Domain (US Federal)';
  }
  let licenseNote = pageInfo.licenseNote || '';
  if (lowerHost.includes('statista.com')) {
    licenseNote = licenseNote ? `${licenseNote}; Verify Statista licensing before use.` : 'Verify Statista licensing before use.';
  }
  if (lowerHost.includes('reuters.com')) {
    licenseNote = licenseNote ? `${licenseNote}; Credit Reuters Graphics when used.` : 'Credit Reuters Graphics when used.';
  }
  return {
    license,
    licenseNote
  };
}

function isAllowedHost(subject, hostname, config) {
  if (!hostname) return false;
  const subj = SUBJECT_CONFIG[subject];
  if (!subj) return false;
  const cfg = config || subj;
  const lower = hostname.toLowerCase();
  const noWww = lower.replace(/^www\./, '');

  let baseAllowed = false;
  if (subj.allowedDomains && subj.allowedDomains.size > 0) {
    for (const allowed of subj.allowedDomains) {
      const normAllowed = allowed.toLowerCase();
      if (lower === normAllowed || lower.endsWith(`.${normAllowed}`)) {
        baseAllowed = true;
        break;
      }
    }
  }

  let cliAllowed = false;
  if (cfg?.cliAllowedDomains && cfg.cliAllowedDomains.size > 0) {
    for (const allowed of cfg.cliAllowedDomains) {
      const norm = allowed.toLowerCase();
      if (!norm) continue;
      if (lower === norm || lower.endsWith(`.${norm}`) || noWww === norm) {
        cliAllowed = true;
        break;
      }
    }
  }

  return baseAllowed || cliAllowed;
}

async function main() {
  const argv = parseArgs(process.argv.slice(2));
  const subject = argv.subject;
  if (!subject || !SUBJECT_CONFIG[subject]) {
    console.error('Usage: node tools/gov-image-harvester/index.mjs --subject <Science|"Social Studies"|Math> [--topics "..." --limit N --dry]');
    process.exitCode = 1;
    return;
  }
  const topics = argv.topics ? argv.topics.split(',').map((t) => t.trim()).filter(Boolean) : [];
  const limit = argv.limit ? Math.max(1, parseInt(argv.limit, 10)) : 40;
  const onlyTypes = argv.onlyTypes ? argv.onlyTypes.split(',').map((t) => t.trim()).filter(Boolean) : [];
  const filenameContains = argv.filenameContains
    ? argv.filenameContains.split(',').map((t) => t.trim()).filter(Boolean)
    : [];
  const dryRun = Boolean(argv.dry);
  const subjectCfg = SUBJECT_CONFIG[subject];
  const config = subjectCfg;

  const cliDomains = Array.from(
    new Set(
      (argv.domains ? String(argv.domains).split(',') : [])
        .map((s) => s.trim())
        .filter(Boolean)
    )
  );

  const tmpAllowed = new Set();
  const normalizeCliDomain = (value) => {
    if (!value) return '';
    let d = String(value).trim();
    if (!d) return '';
    d = d.replace(/^https?:\/\//, '');
    d = d.replace(/#.*/, '');
    d = d.replace(/\/.*$/, '');
    d = d.replace(/:\\d+$/, '');
    return d.toLowerCase();
  };

  for (const dom of cliDomains) {
    const normalized = normalizeCliDomain(dom);
    if (!normalized) continue;
    tmpAllowed.add(normalized);
    tmpAllowed.add(normalized.replace(/^www\./, ''));
  }

  setTemporaryAllowedDomains(tmpAllowed);

  let discovered = [];
  if (cliDomains.length) {
    for (const dom of cliDomains) {
      const { tried, sitemaps } = await discoverSitemapsForDomain(dom);
      if (sitemaps.length) {
        console.log(`[info] ${dom}: using ${sitemaps.length} sitemap(s)`);
        discovered.push(...sitemaps);
      } else {
        console.warn(`[WARN] No sitemap found for ${dom} (tried: ${tried.join(', ')})`);
      }
    }
  }

  const defaultSitemaps = subjectCfg?.sitemaps ? [...subjectCfg.sitemaps] : [];
  const allSitemaps = [...new Set([...(discovered || []), ...defaultSitemaps])];

  config.sitemaps = allSitemaps;
  config.cliAllowedDomains = tmpAllowed;

  const metadataEntries = await loadMetadata(METADATA_PATH);
  const metadataIndexes = buildIndexes(metadataEntries);
  const state = await loadState();
  state.sha1 = state.sha1 || {};
  state.subjects = state.subjects || {};
  const subjectState = ensureSubjectState(state, subject);

  const seeds = await collectSeedUrls(subject, topics, limit, { onlyTypes, filenameContains });

  const usingMediaWikiProvider = !config.sitemaps || config.sitemaps.length === 0;

  let saved = 0;
  let duplicates = 0;
  let errors = 0;

  const acceptedPerPage = new Map(); // canonicalSource -> { count, entries: [], groupId }

  if (usingMediaWikiProvider) {
    for (const imageUrl of seeds) {
      if (saved >= limit) break;
      const metadata = apiImageCache.get(imageUrl);
      if (!metadata) continue;
      const host = new URL(imageUrl).hostname;
      if (!isAllowedHost(subject, host, config)) continue;
      try {
        const imageCanonical = canonicalizeUrl(imageUrl);
        if (subjectState.sourceUrls[imageCanonical]) {
          duplicates += 1;
          continue;
        }
        const { buffer, width: dlWidth, height: dlHeight } = await downloadAndNormalize(imageUrl);
        const sha1 = createSha1(buffer);
        if (metadataIndexes.bySha.has(sha1) || state.sha1[sha1]) {
          duplicates += 1;
          continue;
        }

        const description = metadata.description || metadata.sourcePage || metadata.filename || '';
        const credit = metadata.credit ? ` ${metadata.credit}` : '';
        const cleanDescription = cleanCommonsText(`${description}${credit}`.trim());
        const imageForMeta = {
          srcAbs: imageUrl,
          alt: cleanDescription || metadata.sourcePage || metadata.filename || '',
          caption: cleanDescription,
          context: cleanDescription
        };
        const pageTitle = metadata.sourcePage || metadata.filename || 'Wikimedia Commons Image';
        const pageInfo = {
          title: pageTitle,
          images: [imageForMeta],
          published: '',
          licenseNote: metadata.licenseUrl ? `License details: ${metadata.licenseUrl}` : ''
        };
        const { dominantType, metaText } = inferDominantType(imageForMeta, pageInfo);
        const altText = generateAltText(imageForMeta, pageInfo, dominantType);
        const detailedDescription = generateDetailedDescription(imageForMeta, pageInfo, dominantType);
        const keywords = generateKeywords(imageForMeta, pageInfo, dominantType, metaText);
        const targetDir = path.resolve('frontend', 'Images', SUBJECT_CONFIG[subject].folder);
        const fileName = await decideFileName(
          {
            sourceTitle: pageInfo.title,
            alt: imageForMeta.alt,
            pageTitle: pageInfo.title,
            sha1
          },
          targetDir
        );
        const filePathFs = path.join(targetDir, fileName);
        const filePathMeta = path.posix.join('/frontend/Images', SUBJECT_CONFIG[subject].folder, fileName);
        const licenseLines = [];
        if (metadata.licenseUrl) {
          licenseLines.push(`License: ${metadata.licenseUrl}`);
        }
        if (metadata.credit) {
          licenseLines.push(`Credit: ${metadata.credit}`);
        }
        if (metadata.commonsPage) {
          licenseLines.push(`Source: ${metadata.commonsPage}`);
        }
        const licenseNote = licenseLines.length
          ? licenseLines.join(' | ')
          : 'Refer to Wikimedia Commons for licensing and attribution.';
        const sourceUrl = metadata.commonsPage || imageUrl;
        const canonicalSource = canonicalizeUrl(sourceUrl);
        let record = acceptedPerPage.get(canonicalSource);
        if (!record) {
          record = { count: 0, entries: [], groupId: null };
          acceptedPerPage.set(canonicalSource, record);
        }
        const previousCount = record.count;
        record.count += 1;

        const metadataEntry = {
          id: crypto.randomUUID(),
          subject,
          fileName,
          filePath: filePathMeta,
          width: dlWidth || metadata.width,
          height: dlHeight || metadata.height,
          dominantType,
          altText,
          detailedDescription,
          keywords,
          sourceUrl,
          sourceDomain: host.toLowerCase(),
          sourceTitle: pageInfo.title || '',
          sourcePublished: '',
          license: metadata.license || 'See Wikimedia Commons for license details',
          licenseNote,
          educationalUse: 'instructional',
          sha1,
          collectedAt: new Date().toISOString()
        };

        record.entries.push(metadataEntry);

        if (record.count > 1) {
          if (!record.groupId) {
            record.groupId = `${new URL(sourceUrl).hostname}:${new URL(sourceUrl).pathname}`;
          }
          metadataEntry.groupId = record.groupId;
          if (previousCount === 1 && record.entries.length >= 2) {
            record.entries[0].groupId = record.groupId;
          }
        }

        if (!dryRun) {
          await writeImage(buffer, filePathFs, dryRun);
          if (!record.groupId) {
            delete metadataEntry.groupId;
          }
          upsertEntry(metadataEntries, metadataIndexes, metadataEntry);
          if (record.groupId && previousCount === 1 && record.entries.length >= 2) {
            upsertEntry(metadataEntries, metadataIndexes, record.entries[0]);
          }
          state.sha1[sha1] = true;
          subjectState.sourceUrls[imageCanonical] = true;
          subjectState.visitedPages[canonicalSource] = Date.now();
        }

        const logWidth = dlWidth || metadata.width || '?';
        const logHeight = dlHeight || metadata.height || '?';
        console.log(`[+] ${subject} ${filePathMeta} (${logWidth}x${logHeight}) ${host} sha1=${sha1.slice(0, 10)}`);
        saved += 1;
      } catch (imageErr) {
        errors += 1;
        console.error(`  [!] Image error for ${imageUrl}: ${imageErr.message}`);
      }
    }
  } else {
    for (const pageUrl of seeds) {
      if (saved >= limit) break;
      const host = new URL(pageUrl).hostname;
      if (!isAllowedHost(subject, host, config)) continue;
      if (subjectState.visitedPages[pageUrl] && !topics.length) {
        continue;
      }
      try {
        const { html, finalUrl, inlineCandidates } = await fetchHtml(pageUrl);
        const pageInfo = extractPageInfo(html, finalUrl, inlineCandidates);
        const canonicalSource = canonicalizeUrl(finalUrl);
        if (subjectState.visitedPages[canonicalSource] && !topics.length) {
          subjectState.visitedPages[pageUrl] = Date.now();
          subjectState.visitedPages[canonicalSource] = Date.now();
          continue;
        }
        const candidateImages = pageInfo.images.filter((img) => {
          const imgHost = new URL(img.srcAbs).hostname;
          return isAllowedHost(subject, imgHost, config);
        });
        console.log(`[crawl] Extracted ${candidateImages.length} images from ${finalUrl}`);
        if (candidateImages.length === 0) {
          subjectState.visitedPages[pageUrl] = Date.now();
          subjectState.visitedPages[canonicalSource] = Date.now();
          continue;
        }
        let perSeedCount = 0;
        for (const image of candidateImages) {
          if (saved >= limit) break;
          if (perSeedCount >= MAX_IMAGES_PER_SEED) break;
          try {
            const imageCanonical = canonicalizeUrl(image.srcAbs);
            if (subjectState.sourceUrls[imageCanonical]) {
              duplicates += 1;
              continue;
            }
            const { dominantType, metaText } = inferDominantType(image, pageInfo);
            const { buffer, width, height } = await downloadAndNormalize(image.srcAbs);
            const sha1 = createSha1(buffer);
            if (metadataIndexes.bySha.has(sha1) || state.sha1[sha1]) {
              duplicates += 1;
              continue;
            }
            const imageHost = new URL(image.srcAbs).hostname.toLowerCase();
            const targetDir = path.resolve('frontend', 'Images', SUBJECT_CONFIG[subject].folder);
            const fileName = await decideFileName(
              {
                sourceTitle: pageInfo.title,
                alt: image.alt,
                pageTitle: pageInfo.title,
                sha1
              },
              targetDir
            );
            const filePathFs = path.join(targetDir, fileName);
            const filePathMeta = path.posix.join('/frontend/Images', SUBJECT_CONFIG[subject].folder, fileName);
            const altText = generateAltText(image, pageInfo, dominantType);
            const detailedDescription = generateDetailedDescription(image, pageInfo, dominantType);
            const keywords = generateKeywords(image, pageInfo, dominantType, metaText);
            const { license, licenseNote } = ensureLicense(pageInfo, imageHost, subject);

            let record = acceptedPerPage.get(canonicalSource);
            if (!record) {
              record = { count: 0, entries: [], groupId: null };
              acceptedPerPage.set(canonicalSource, record);
            }
            const previousCount = record.count;
            record.count += 1;

            const metadataEntry = {
              id: crypto.randomUUID(),
              subject,
              fileName,
              filePath: filePathMeta,
              width,
              height,
              dominantType,
              altText,
              detailedDescription,
              keywords,
              sourceUrl: canonicalSource,
              sourceDomain: imageHost,
              sourceTitle: pageInfo.title || '',
              sourcePublished: pageInfo.published || '',
              license,
              licenseNote,
              educationalUse: 'instructional',
              sha1,
              collectedAt: new Date().toISOString()
            };

            record.entries.push(metadataEntry);

            if (record.count > 1) {
              if (!record.groupId) {
                record.groupId = `${new URL(canonicalSource).hostname}:${new URL(canonicalSource).pathname}`;
              }
              metadataEntry.groupId = record.groupId;
              if (previousCount === 1 && record.entries.length >= 2) {
                record.entries[0].groupId = record.groupId;
              }
            }

            if (!dryRun) {
              await writeImage(buffer, filePathFs, dryRun);
              if (!record.groupId) {
                delete metadataEntry.groupId;
              }
              upsertEntry(metadataEntries, metadataIndexes, metadataEntry);
              if (record.groupId && previousCount === 1 && record.entries.length >= 2) {
                upsertEntry(metadataEntries, metadataIndexes, record.entries[0]);
              }
              state.sha1[sha1] = true;
              subjectState.sourceUrls[imageCanonical] = true;
            }

            console.log(`[+] ${subject} ${filePathMeta} (${width}x${height}) ${host} sha1=${sha1.slice(0, 10)}`);
            saved += 1;
            perSeedCount += 1;
          } catch (imageErr) {
            errors += 1;
            console.error(`  [!] Image error for ${image.srcAbs}: ${imageErr.message}`);
          }
        }
        subjectState.visitedPages[pageUrl] = Date.now();
        subjectState.visitedPages[canonicalSource] = Date.now();
      } catch (err) {
        errors += 1;
        console.warn(`[WARN] Failed to process ${pageUrl}: ${err.message}. Skipping.`);
        continue;
      }
    }
  }

  if (!dryRun) {
    await saveMetadata(METADATA_PATH, metadataEntries);
    await saveState(state, dryRun);
  }

  console.log(`Saved ${saved} new images, skipped ${duplicates} duplicates, ${errors} errors.`);

}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
