import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DEV_ROLES } from '../../src/dev/devLogin.js';
import { getApiBaseUrl } from '../../src/utils/apiBase.js';

function isDocumentDarkTheme() {
  if (typeof document === 'undefined') return false;

  const root = document.documentElement;
  const explicitTheme = root.getAttribute('data-theme');

  if (explicitTheme === 'dark') return true;
  if (explicitTheme === 'light') return false;

  return root.classList.contains('dark');
}

export function AuthScreen({ onLogin }) {
  const googleButton = useRef(null);
  const [isDarkTheme, setIsDarkTheme] = useState(isDocumentDarkTheme);
  const [devRole, setDevRole] = useState('superAdmin');
  const [devSubmitting, setDevSubmitting] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');

  // Dev login handler
  const handleDevLogin = async () => {
    try {
      setDevSubmitting(true);
      const response = await fetch(`${getApiBaseUrl()}/api/dev-login-as`, {
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
        const res = await fetch(`${getApiBaseUrl()}/api/auth/google`, {
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
    if (typeof document === 'undefined') {
      return undefined;
    }

    const root = document.documentElement;
    const syncTheme = () => setIsDarkTheme(isDocumentDarkTheme());

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    return () => observer.disconnect();
  }, []);

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

  const handleEmailAuth = async (event) => {
    event.preventDefault();
    setAuthError('');

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setAuthError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setAuthError('Please enter a password.');
      return;
    }
    if (authMode === 'register') {
      if (password.length < 6) {
        setAuthError('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setAuthError('Passwords do not match.');
        return;
      }
    }

    try {
      setAuthSubmitting(true);
      const endpoint = authMode === 'register' ? 'register' : 'login';
      const res = await fetch(`${getApiBaseUrl()}/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || 'Unable to sign in');
      }

      const { user, token } = await res.json();
      onLogin(user, token);
    } catch (error) {
      console.error('Email auth error:', error);
      setAuthError(
        error instanceof Error ? error.message : 'Unable to sign in'
      );
    } finally {
      setAuthSubmitting(false);
    }
  };

  console.log('[AuthScreen] Rendering with Gmail login');

  const shellClassName = [
    'min-h-screen flex items-center justify-center px-4 py-12 transition-colors duration-300',
    isDarkTheme
      ? 'bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#1e1b4b]'
      : 'bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-50',
  ].join(' ');

  const titleClassName = isDarkTheme
    ? 'text-3xl font-extrabold text-white tracking-tight'
    : 'text-3xl font-extrabold text-slate-900 tracking-tight';
  const subtitleClassName = isDarkTheme
    ? 'mt-2 text-slate-300'
    : 'mt-2 text-slate-700';
  const panelClassName = [
    'rounded-2xl p-6 sm:p-8 space-y-6 backdrop-blur-xl border',
    isDarkTheme
      ? 'bg-slate-900/72 border-slate-400/15 shadow-2xl shadow-black/30'
      : 'bg-white/92 border-white/70 shadow-xl shadow-slate-900/10',
  ].join(' ');
  const modeToggleClassName = [
    'flex items-center justify-center gap-1 p-1 rounded-full',
    isDarkTheme ? 'bg-slate-800/90' : 'bg-slate-100',
  ].join(' ');
  const activeModeClassName = isDarkTheme
    ? 'bg-slate-700 text-white shadow-sm'
    : 'bg-white text-slate-900 shadow-sm';
  const inactiveModeClassName = isDarkTheme
    ? 'text-slate-300 hover:text-slate-100'
    : 'text-slate-700 hover:text-slate-900';
  const labelClassName = isDarkTheme
    ? 'block text-sm font-medium text-slate-300 mb-1.5'
    : 'block text-sm font-medium text-slate-700 mb-1.5';
  const inputClassName = [
    'w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition',
    isDarkTheme
      ? 'border-slate-600 bg-slate-800/70 text-slate-100 placeholder-slate-500'
      : 'border-slate-200 bg-white text-slate-900 placeholder-slate-400',
  ].join(' ');
  const dividerLineClassName = isDarkTheme
    ? 'flex-1 h-px bg-slate-700'
    : 'flex-1 h-px bg-slate-200';
  const helperTextClassName = isDarkTheme
    ? 'text-xs text-slate-400 text-center'
    : 'text-xs text-slate-700 text-center';
  const devPanelClassName = [
    'mt-4 rounded-2xl p-4 border backdrop-blur-xl',
    isDarkTheme
      ? 'bg-slate-900/72 border-purple-700/30 shadow-2xl shadow-black/25'
      : 'bg-white/90 border-purple-200/60 shadow-lg shadow-slate-900/8',
  ].join(' ');
  const devLabelClassName = isDarkTheme
    ? 'mb-2 block text-xs font-semibold text-slate-300'
    : 'mb-2 block text-xs font-semibold text-slate-700';
  const selectClassName = [
    'dev-role-select w-1/2 rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition',
    isDarkTheme
      ? 'border-slate-600 bg-slate-800/70 text-slate-100'
      : 'border-slate-200 bg-white text-slate-900',
  ].join(' ');
  const submitButtonClassName = [
    'w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 disabled:opacity-60 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2',
    isDarkTheme ? 'focus:ring-offset-slate-900' : 'focus:ring-offset-slate-50',
  ].join(' ');
  const devButtonClassName =
    'w-1/2 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-60 transition-all';

  return (
    <div className={shellClassName}>
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className={titleClassName}>Mr. Smith's Learning Canvas</h1>
          <p className={subtitleClassName}>
            Sign in to save your progress across devices.
          </p>
        </div>

        {/* Main auth card */}
        <div className={panelClassName}>
          {/* Mode toggle */}
          <div className={modeToggleClassName}>
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                authMode === 'login'
                  ? activeModeClassName
                  : inactiveModeClassName
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                authMode === 'register'
                  ? activeModeClassName
                  : inactiveModeClassName
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Email form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div>
              <label className={labelClassName}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={inputClassName}
                placeholder="student@example.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label className={labelClassName}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={inputClassName}
                placeholder="••••••••"
                autoComplete={
                  authMode === 'register' ? 'new-password' : 'current-password'
                }
              />
            </div>
            {authMode === 'register' && (
              <div>
                <label className={labelClassName}>Confirm password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className={inputClassName}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
              </div>
            )}

            {authError && (
              <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={authSubmitting}
              className={submitButtonClassName}
            >
              {authSubmitting
                ? authMode === 'register'
                  ? 'Creating account...'
                  : 'Signing in...'
                : authMode === 'register'
                  ? 'Create account'
                  : 'Sign in'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <span className={dividerLineClassName} />
            <span className={`${helperTextClassName} uppercase tracking-wider`}>
              or
            </span>
            <span className={dividerLineClassName} />
          </div>

          {/* Google Sign-In */}
          <div ref={googleButton} className="flex justify-center" />

          <p className={helperTextClassName}>
            Admins: Sign in with Google to access your dashboard.
          </p>
        </div>

        {/* Dev Login Section */}
        <div className={devPanelClassName} data-testid="dev-login-container">
          <label className={devLabelClassName}>Dev role</label>
          <div className="flex gap-2">
            <select
              value={devRole}
              onChange={(event) => setDevRole(event.target.value)}
              className={selectClassName}
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
              className={devButtonClassName}
              data-testid="dev-login-button"
            >
              Dev Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Attach component to window.Components
if (typeof window !== 'undefined') {
  window.Components = window.Components || {};
  window.Components.AuthScreen = AuthScreen;
}
