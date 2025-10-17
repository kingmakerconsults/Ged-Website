'use strict';

const DEFAULT_HEADERS = {
    'X-DNS-Prefetch-Control': 'off',
    'X-Frame-Options': 'SAMEORIGIN',
    'Strict-Transport-Security': 'max-age=15552000; includeSubDomains',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '0',
    'Referrer-Policy': 'no-referrer',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};

function helmet(options = {}) {
    const {
        headers: customHeaders = {},
        hidePoweredBy = true
    } = options;

    const headers = { ...DEFAULT_HEADERS, ...customHeaders };

    return function helmetMiddleware(req, res, next) {
        if (hidePoweredBy) {
            res.removeHeader('X-Powered-By');
        }

        for (const [header, value] of Object.entries(headers)) {
            if (value === false || value === null || typeof value === 'undefined') {
                continue;
            }

            if (typeof value === 'function') {
                const computed = value(req, res);
                if (computed) {
                    res.setHeader(header, computed);
                }
            } else {
                res.setHeader(header, String(value));
            }
        }

        return typeof next === 'function' ? next() : undefined;
    };
}

module.exports = helmet;
