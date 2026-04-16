export function getApiBaseUrl() {
  if (typeof window === 'undefined') return '';
  const host = window.location.hostname;
  const isLocalHost = host === 'localhost' || host === '127.0.0.1';

  const explicit =
    window.API_BASE_URL ||
    window.__CLIENT_CONFIG__?.API_BASE_URL ||
    window.__APP_CONFIG__?.apiBaseUrl;

  if (explicit) {
    if (!isLocalHost) {
      return explicit;
    }

    try {
      const url = new URL(explicit, window.location.origin);
      if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
        return `${url.protocol}//${url.hostname}${url.port ? `:${url.port}` : ''}`;
      }
    } catch (_error) {}
  }

  const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
  if (isLocalHost) {
    const configuredPort = window.API_PORT;
    if (configuredPort) {
      return `${protocol}//${host}:${configuredPort}`;
    }

    if (window.location.port === '3003') {
      return `${protocol}//${host}:3003`;
    }

    return `${protocol}//${host}:3003`;
  }
  return 'https://ged-website.onrender.com';
}
