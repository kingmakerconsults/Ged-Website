export const ALLOWLIST = [
  // === Government & Intergovernmental Organizations (IGOs) ===
  'nasa.gov', 'noaa.gov', 'usgs.gov', 'epa.gov', 'nih.gov', 'cdc.gov',
  'data.gov', 'bls.gov', 'census.gov', 'archives.gov', 'loc.gov', 'nps.gov',
  'un.org', 'who.int', 'worldbank.org', 'imf.org', 'oecd.org', 'bea.gov',
  'fred.stlouisfed.org',

  // === Museums, Archives & Cultural Institutions ===
  'si.edu', 'smithsonianmag.com', 'amnh.org', 'fieldmuseum.org', 'gilderlehrman.org',

  // === Academic, University & Research Institutions ===
  'mit.edu', 'stanford.edu', 'harvard.edu', 'pewresearch.org',
  'ourworldindata.org', 'science.org', 'nature.com', 'openstax.org',
  'nctm.org', 'ams.org',

  // === Reputable News & Reference ===
  'nationalgeographic.com', 'scientificamerican.com', 'history.com', 'pbs.org',
  'reuters.com', 'apnews.com', 'britannica.com',

  // === Math & Data Visualization Tools/Resources ===
  'khanacademy.org', 'mathworld.wolfram.com', 'purplemath.com', 'desmos.com',
  'mathisfun.com', 'statisticshowto.com', 'carto.com', 'opendata.arcgis.com',
  'arcgis.com', 'geogebra.org'
];

const ALWAYS_TRUSTED_TLDS = ['.gov', '.edu'];

const EDUCATIONAL_ORG_DOMAINS = new Set([
  'pewresearch.org',
  'ourworldindata.org',
  'worldbank.org',
  'un.org',
  'pbs.org',
  'teachinghistory.org',
  'education.nationalgeographic.org',
  'data.oecd.org',
  'oecd.org'
]);

const EDUCATIONAL_MISC_DOMAINS = new Set([
  'who.int',
  'imf.org'
]);

function toRegistrableDomain(hostname) {
  const parts = hostname.split('.').filter(Boolean);
  if (parts.length <= 2) {
    return hostname;
  }
  return parts.slice(-2).join('.');
}

export function isHostnameAllowed(hostname) {
  if (!hostname) return false;
  const lower = hostname.toLowerCase();
  if (ALLOWLIST.some((allowed) => lower === allowed || lower.endsWith(`.${allowed}`))) {
    return true;
  }

  const registrable = toRegistrableDomain(lower);

  if (ALWAYS_TRUSTED_TLDS.some((tld) => registrable.endsWith(tld))) {
    if (registrable.endsWith('.org')) {
      return EDUCATIONAL_ORG_DOMAINS.has(registrable);
    }
    return true;
  }

  if (EDUCATIONAL_MISC_DOMAINS.has(registrable)) {
    return true;
  }

  if (registrable.endsWith('.org')) {
    return ALLOWLIST.some((allowed) => allowed === registrable || allowed.endsWith(`.${registrable}`));
  }

  return false;
}

export function assertAllowedUrl(urlLike) {
  const { hostname } = new URL(urlLike);
  if (!isHostnameAllowed(hostname)) {
    throw new Error(`URL not allowed by domain policy: ${urlLike}`);
  }
  return true;
}
