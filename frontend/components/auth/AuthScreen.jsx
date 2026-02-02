import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DEV_ROLES } from '../../src/dev/devLogin.js';

// Resolve API base robustly: prefer explicit config; on localhost default to backend port 3002
const API_BASE_URL = (() => {
  if (typeof window === 'undefined') return '';
  const explicit =
    window.API_BASE_URL || window.__CLIENT_CONFIG__?.API_BASE_URL;
  if (explicit) return explicit;
  const host = window.location.hostname;
  const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
  if (host === 'localhost' || host === '127.0.0.1') {
    const port = window.API_PORT || 3002;
    return `${protocol}//localhost:${port}`;
  }
  return window.location.origin;
})();

export function AuthScreen({ onLogin }) {
  const googleButton = useRef(null);
  const [devRole, setDevRole] = useState('superAdmin');
  const [devSubmitting, setDevSubmitting] = useState(false);

  // Dev login handler
  const handleDevLogin = async () => {
    try {
      setDevSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/api/dev-login-as`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: devRole }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Dev login failed');
      }

      const { user, token } = await response.json();
      onLogin(user, token);
    } catch (error) {
      console.error('Dev login error:', error);
      alert(error instanceof Error ? error.message : 'Dev login failed');
    } finally {
      setDevSubmitting(false);
    }
  };

  const handleCredentialResponse = useCallback(
    async (response) => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ credential: response.credential }),
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `Server responded with ${res.status}`);
        }

        const { user, token } = await res.json();
        onLogin(user, token);
      } catch (error) {
        console.error('Login Error:', error);
      }
    },
    [onLogin]
  );

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google && google.accounts.id && googleButton.current) {
        google.accounts.id.initialize({
          client_id:
            '828659988606-p9ct562f068p1778im2ck2o5iga89i7m.apps.googleusercontent.com',
          callback: handleCredentialResponse,
        });
        google.accounts.id.renderButton(googleButton.current, {
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
        });
      }
    };
    script.onerror = () => {
      console.error('Google Sign-In script failed to load.');
    };

    document.body.appendChild(script);

    return () => {
      const goggleScript = document.querySelector(
        'script[src="https://accounts.google.com/gsi/client"]'
      );
      if (goggleScript) {
        document.body.removeChild(goggleScript);
      }
    };
  }, [handleCredentialResponse]);

  console.log('[AuthScreen] Rendering with Gmail login');

  return (
    <>
      <div className="text-center max-w-md mx-auto">
        <h2 className="text-3xl font-extrabold text-black dark:text-slate-100 mb-2">
          Welcome!
        </h2>
        <p className="text-black dark:text-slate-300 mb-6">
          Sign in to save your progress across devices.
        </p>

        {/* Dev Login Section */}
        <div
          className="mt-4 w-full mb-6 p-4 border border-purple-200 dark:border-purple-700 rounded-lg bg-purple-50 dark:bg-purple-900/20"
          data-testid="dev-login-container"
        >
          <label className="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-300">
            Dev role
          </label>
          <div className="flex gap-2">
            <select
              value={devRole}
              onChange={(event) => setDevRole(event.target.value)}
              className="dev-role-select w-1/2 rounded-lg border border-slate-300 px-3 py-2 text-sm text-black shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-purple-400 dark:focus:ring-purple-500"
            >
              {DEV_ROLES.map((roleOption) => (
                <option key={roleOption.value} value={roleOption.value}>
                  {roleOption.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleDevLogin}
              disabled={devSubmitting}
              className="w-1/2 rounded-lg bg-purple-600 py-3 text-base font-bold text-white shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:opacity-60"
              data-testid="dev-login-button"
              style={{ minHeight: '48px' }}
            >
              🚀 DEV LOGIN 🚀
            </button>
          </div>
        </div>

        <div className="my-6 flex items-center justify-center gap-3 text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
          <span className="h-px w-12 bg-slate-200" aria-hidden="true"></span>
          <span>Sign in</span>
          <span className="h-px w-12 bg-slate-200" aria-hidden="true"></span>
        </div>

        <div ref={googleButton} className="flex justify-center mt-4"></div>

        <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">
          Admins: Sign in with Google to access your dashboard.
        </p>
      </div>
    </>
  );
}

// Attach component to window.Components
if (typeof window !== 'undefined') {
  window.Components = window.Components || {};
  window.Components.AuthScreen = AuthScreen;
}
