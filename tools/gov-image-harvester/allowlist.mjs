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
  'usgs.gov',
  'epa.gov',
  'nps.gov',
  'nih.gov',
  'ncbi.nlm.nih.gov'
];

export function isHostnameAllowed(hostname) {
  if (!hostname) return false;
  const lower = hostname.toLowerCase();
  return ALLOWLIST.some((allowed) => lower === allowed || lower.endsWith(`.${allowed}`));
}

export function assertAllowedUrl(urlLike) {
  const { hostname } = new URL(urlLike);
  if (!isHostnameAllowed(hostname)) {
    throw new Error(`URL not allowed by domain policy: ${urlLike}`);
  }
  return true;
}
