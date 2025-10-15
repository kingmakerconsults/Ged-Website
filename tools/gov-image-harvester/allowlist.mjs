export const ALLOWLIST = [
  'nasa.gov',
  'noaa.gov',
  'nhc.noaa.gov',
  'climate.nasa.gov',
  'data.gov',
  'bls.gov',
  'census.gov',
  'archives.gov',
  'loc.gov',
  'libraryofcongress.gov', // maps, archives mirror
  'usgs.gov',
  'epa.gov',
  'nps.gov',
  'nih.gov',
  'ncbi.nlm.nih.gov',
  'carto.com', // maps, open data
  'nationalgeographic.com', // maps, infographics
  'pewresearch.org', // data, charts
  'statista.com', // infographics, data
  'ourworldindata.org', // global development charts
  'worldbank.org', // development data visuals
  'imf.org', // economic charts
  'cia.gov', // factbook maps
  'un.org', // international maps, infographics
  'who.int', // global health maps
  'data.oecd.org', // economic charts
  'oecd.org', // economic organization insights
  'britannica.com', // reference maps, diagrams
  'reuters.com', // news graphics
  'graphics.reuters.com', // detailed news graphics
  'pbs.org', // education visuals
  'smithsonianmag.com', // historical infographics
  'teachinghistory.org', // educator visuals
  'ed.gov', // education resources
  'education.nationalgeographic.org', // classroom assets
  'opendata.arcgis.com' // hosted government data maps
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
