import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DEV_ROLES } from '../../src/dev/devLogin.js';
import { getApiBaseUrl } from '../../src/utils/apiBase.js';

export function AuthScreen({ onLogin }) {
  const googleButton = useRef(null);
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

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-50 dark:from-[#0b1120] dark:via-[#0f172a] dark:to-[#1e1b4b]">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Mr. Smith's Learning Canvas
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Sign in to save your progress across devices.
          </p>
        </div>

        {/* Main auth card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
          {/* Mode toggle */}
          <div className="flex items-center justify-center gap-1 p-1 rounded-full bg-slate-100 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                authMode === 'login'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                authMode === 'register'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Email form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800/50 px-4 py-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                placeholder="student@example.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800/50 px-4 py-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                placeholder="••••••••"
                autoComplete={
                  authMode === 'register' ? 'new-password' : 'current-password'
                }
              />
            </div>
            {authMode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Confirm password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800/50 px-4 py-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
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
              className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 disabled:opacity-60 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
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
            <span className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            <span className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              or
            </span>
            <span className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
          </div>

          {/* Google Sign-In */}
          <div ref={googleButton} className="flex justify-center" />

          <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
            Admins: Sign in with Google to access your dashboard.
          </p>
        </div>

        {/* Dev Login Section */}
        <div
          className="mt-4 glass-card rounded-2xl p-4 border border-purple-200/50 dark:border-purple-700/30"
          data-testid="dev-login-container"
        >
          <label className="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-300">
            Dev role
          </label>
          <div className="flex gap-2">
            <select
              value={devRole}
              onChange={(event) => setDevRole(event.target.value)}
              className="dev-role-select w-1/2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800/50 px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
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
              className="w-1/2 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-60 transition-all"
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
