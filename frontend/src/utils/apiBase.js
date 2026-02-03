export function getApiBaseUrl() {
  if (typeof window === 'undefined') return '';
  const explicit =
    window.API_BASE_URL ||
    window.__CLIENT_CONFIG__?.API_BASE_URL ||
    window.__APP_CONFIG__?.apiBaseUrl;
  if (explicit) return explicit;
  const host = window.location.hostname;
  const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
  if (host === 'localhost' || host === '127.0.0.1') {
    const port = window.API_PORT || 3002;
    return `${protocol}//localhost:${port}`;
  }
  return 'https://ged-website.onrender.com';
}
