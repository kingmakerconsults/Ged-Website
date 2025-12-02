/**
 * Dev-only login bypass
 * Only active in development mode on localhost
 */

const isDev =
  import.meta.env.MODE === 'development' &&
  (window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1');

export const DEV_LOGIN_ENABLED = isDev;

export async function devLoginAs(role = 'student') {
  if (!DEV_LOGIN_ENABLED) {
    console.warn('Dev login is only available in development on localhost');
    return null;
  }

  try {
    const response = await fetch('/api/dev-login-as', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Dev login failed');
    }

    const data = await response.json();
    console.log(`[DEV] Logged in as ${role}:`, data.user);
    return data;
  } catch (error) {
    console.error('[DEV] Login error:', error);
    throw error;
  }
}

export const DEV_ROLES = [
  { value: 'student', label: 'Student' },
  { value: 'instructor', label: 'Instructor' },
  { value: 'orgAdmin', label: 'Org Admin' },
  { value: 'superAdmin', label: 'Super Admin' },
];
