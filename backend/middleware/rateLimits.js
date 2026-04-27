/**
 * Phase 1.1 — rate limiting for auth + join endpoints.
 *
 * "Do No Harm" tuning: limits are deliberately generous so legitimate retries
 * (typos, slow networks, family computers) are not blocked. Tighten only after
 * observing real traffic.
 *
 * All limiters honor the FEATURE_RATE_LIMITING flag. When the flag is off they
 * are no-ops (used during initial rollout / debugging).
 *
 * Rate-limit responses use 429 with a JSON body, matching the rest of the API.
 */

const rateLimit = require('express-rate-limit');
const { isEnabled } = require('../src/featureFlags');

function noopMiddleware(_req, _res, next) { next(); }

function _maybeFlagged(limiter) {
  return function (req, res, next) {
    if (!isEnabled('RATE_LIMITING')) return next();
    return limiter(req, res, next);
  };
}

function _make({ windowMs, max, message }) {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: message || 'Too many requests. Please slow down and try again shortly.' },
    // Skip for trusted internal health checks if any.
    skip: (req) => req.path === '/healthz' || req.path === '/api/healthz',
  });
}

// Login: 20 attempts per 5 minutes per IP. Generous enough for forgetful users
// but stops a credential-stuffing bot cold.
const loginLimiter = _maybeFlagged(_make({
  windowMs: 5 * 60 * 1000,
  max: 20,
  message: 'Too many login attempts. Please wait a few minutes and try again.',
}));

// Registration: 10 new accounts per hour per IP.
const registerLimiter = _maybeFlagged(_make({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: 'Too many account registrations from this network. Please try again later.',
}));

// Org join code attempts: 15 attempts per 15 minutes per IP. Codes are short
// (4-digit pins in some seeds) so brute force protection matters here.
const orgJoinLimiter = _maybeFlagged(_make({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: 'Too many organization join attempts. Please wait and try again.',
}));

// Password reset (Phase 1.5, currently flag-gated): 5 per hour per IP.
const passwordResetLimiter = _maybeFlagged(_make({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: 'Too many password reset requests. Please wait an hour and try again.',
}));

// Generic /api limiter — extremely loose, just to catch runaway clients.
// 600 requests / 5 min per IP. Most users won't come close.
const apiLimiter = _maybeFlagged(_make({
  windowMs: 5 * 60 * 1000,
  max: 600,
  message: 'Request rate too high. Please slow down.',
}));

module.exports = {
  loginLimiter,
  registerLimiter,
  orgJoinLimiter,
  passwordResetLimiter,
  apiLimiter,
  noopMiddleware,
};
