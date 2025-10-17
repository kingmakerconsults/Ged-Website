'use strict';

const DEFAULT_STATUS_CODE = 429;

function normalizeOptions(options = {}) {
  return {
    windowMs: typeof options.windowMs === 'number' && options.windowMs > 0 ? options.windowMs : 15 * 60 * 1000,
    max: typeof options.max === 'number' && options.max >= 0 ? options.max : 5,
    statusCode: typeof options.statusCode === 'number' ? options.statusCode : DEFAULT_STATUS_CODE,
    message: options.message !== undefined ? options.message : 'Too many requests, please try again later.',
    standardHeaders: options.standardHeaders !== undefined ? options.standardHeaders : false,
    legacyHeaders: options.legacyHeaders !== undefined ? options.legacyHeaders : true
  };
}

function formatResetTime(startTime, windowMs) {
  const resetMs = startTime + windowMs - Date.now();
  return resetMs > 0 ? Math.ceil(resetMs / 1000) : 0;
}

function rateLimit(options) {
  const config = normalizeOptions(options);
  const hits = new Map();

  const resetInterval = setInterval(() => {
    hits.clear();
  }, config.windowMs);

  if (typeof resetInterval.unref === 'function') {
    resetInterval.unref();
  }

  const middleware = function rateLimitMiddleware(req, res, next) {
    const key = (req.ip || req.connection?.remoteAddress || req.socket?.remoteAddress || 'unknown').toString();
    const now = Date.now();
    let entry = hits.get(key);

    if (!entry || now - entry.startTime >= config.windowMs) {
      entry = { count: 0, startTime: now };
      hits.set(key, entry);
    }

    entry.count += 1;
    const remaining = Math.max(config.max - entry.count, 0);

    if (config.standardHeaders) {
      res.setHeader('RateLimit-Limit', config.max);
      res.setHeader('RateLimit-Remaining', remaining < 0 ? 0 : remaining);
      res.setHeader('RateLimit-Reset', formatResetTime(entry.startTime, config.windowMs));
    }

    if (config.legacyHeaders) {
      res.setHeader('X-RateLimit-Limit', config.max);
      res.setHeader('X-RateLimit-Remaining', remaining < 0 ? 0 : remaining);
      res.setHeader('X-RateLimit-Reset', formatResetTime(entry.startTime, config.windowMs));
    }

    if (entry.count > config.max) {
      const body = typeof config.message === 'function' ? config.message(req, res) : config.message;
      if (res.headersSent) {
        return;
      }
      if (typeof body === 'object') {
        res.status(config.statusCode).json(body);
      } else {
        res.status(config.statusCode).send(body);
      }
      return;
    }

    next();
  };

  middleware.resetKey = function resetKey(key) {
    hits.delete(key);
  };

  middleware.resetAll = function resetAll() {
    hits.clear();
  };

  return middleware;
}

module.exports = rateLimit;
module.exports.default = rateLimit;
module.exports.rateLimit = rateLimit;
