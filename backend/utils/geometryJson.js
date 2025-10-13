const crypto = require('crypto');
const geometrySchema = require('../schemas/geometrySchema');

const DEFAULT_MAX_DECIMALS = parseInt(process.env.GEOMETRY_MAX_DECIMALS || '2', 10);
const SANITIZER_FEATURE_ENABLED = process.env.GEOMETRY_JSON_SANITIZER_ENABLED !== 'false';

class GeometryJsonError extends Error {
    constructor(message, options = {}) {
        super(message);
        this.name = 'GeometryJsonError';
        Object.assign(this, options);
    }
}

const sanitizeLongDecimals = (src, maxDecimals) => {
    const decimalRegex = /-?\d+\.\d{3,}/g;
    return src.replace(decimalRegex, match => {
        const asNumber = Number(match);
        if (!Number.isFinite(asNumber)) {
            return match;
        }
        const rounded = Number(asNumber.toFixed(maxDecimals));
        return rounded.toString();
    });
};

const sanitizeBrokenExponents = (src, maxDecimals) => {
    const exponentRegex = /-?\d+(?:\.\d+)?[eE][+-]?\d{3,}/g;
    return src.replace(exponentRegex, match => {
        const parsed = Number(match);
        if (Number.isFinite(parsed)) {
            return Number(parsed.toFixed(maxDecimals)).toString();
        }
        const base = match.split(/[eE]/)[0];
        const fallback = Number(base);
        if (Number.isFinite(fallback)) {
            return Number(fallback.toFixed(maxDecimals)).toString();
        }
        return match;
    });
};

const sanitizeJsonNumbers = (src, maxDecimals = DEFAULT_MAX_DECIMALS) => {
    if (!SANITIZER_FEATURE_ENABLED) {
        return src;
    }
    let sanitized = src;
    sanitized = sanitizeLongDecimals(sanitized, maxDecimals);
    sanitized = sanitizeBrokenExponents(sanitized, maxDecimals);
    sanitized = sanitized.replace(/(\d+\.\d{2})(\d+)/g, (_, head) => head);
    return sanitized;
};

const repairLooseJson = src => {
    if (typeof src !== 'string') {
        return src;
    }
    let repaired = src.trim();
    const firstBrace = repaired.indexOf('{');
    const lastBrace = repaired.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        repaired = repaired.slice(firstBrace, lastBrace + 1);
    }
    repaired = repaired.replace(/,\s*(}|])/g, '$1');
    return repaired;
};

const roundNumber = (value, maxDecimals) => {
    const factor = Math.pow(10, maxDecimals);
    return Math.round(value * factor) / factor;
};

const enforcePrecision = (value, maxDecimals) => {
    if (typeof value === 'number') {
        return roundNumber(value, maxDecimals);
    }
    if (Array.isArray(value)) {
        return value.map(item => enforcePrecision(item, maxDecimals));
    }
    if (value && typeof value === 'object') {
        const next = {};
        for (const [key, val] of Object.entries(value)) {
            next[key] = enforcePrecision(val, maxDecimals);
        }
        return next;
    }
    return value;
};

const hashPayload = text => {
    return crypto.createHash('sha256').update(text).digest('hex').slice(0, 16);
};

const validateGeometryStructure = obj => {
    const errors = [];

    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
        errors.push('Response must be a JSON object.');
        return { valid: false, errors };
    }

    if (obj.shape && typeof obj.shape === 'string') {
        const allowedShapes = geometrySchema.properties?.shape?.enum || [];
        if (!allowedShapes.includes(obj.shape)) {
            errors.push(`Shape '${obj.shape}' is not supported.`);
        }
    } else {
        errors.push('Missing or invalid "shape" property.');
    }

    if (obj.dimensions && typeof obj.dimensions === 'object' && !Array.isArray(obj.dimensions)) {
        for (const [key, value] of Object.entries(obj.dimensions)) {
            if (typeof value !== 'number' || Number.isNaN(value)) {
                errors.push(`Dimension '${key}' must be a number.`);
            }
        }
    } else {
        errors.push('Missing or invalid "dimensions" object.');
    }

    if (typeof obj.questionText !== 'string' || obj.questionText.length === 0) {
        errors.push('Missing or invalid "questionText" value.');
    }

    if (Object.prototype.hasOwnProperty.call(obj, 'answer') && typeof obj.answer !== 'number') {
        errors.push('"answer" must be a number when provided.');
    }

    if (obj.answerOptions) {
        if (!Array.isArray(obj.answerOptions)) {
            errors.push('"answerOptions" must be an array.');
        } else {
            obj.answerOptions.forEach((option, index) => {
                if (!option || typeof option !== 'object') {
                    errors.push(`Answer option at index ${index} must be an object.`);
                    return;
                }
                if (typeof option.text !== 'string') {
                    errors.push(`Answer option ${index} is missing a valid "text" field.`);
                }
                if (typeof option.isCorrect !== 'boolean') {
                    errors.push(`Answer option ${index} is missing a valid "isCorrect" field.`);
                }
                if (typeof option.rationale !== 'string') {
                    errors.push(`Answer option ${index} is missing a valid "rationale" field.`);
                }
            });
        }
    } else {
        errors.push('Missing "answerOptions" array.');
    }

    if (obj.choices) {
        if (!Array.isArray(obj.choices) || obj.choices.some(choice => typeof choice !== 'number')) {
            errors.push('"choices" must be an array of numbers when provided.');
        }
    }

    return { valid: errors.length === 0, errors };
};

const parseGeometryJson = (raw, options = {}) => {
    const featureEnabled = options.featureEnabled ?? SANITIZER_FEATURE_ENABLED;
    const maxDecimals = options.maxDecimals ?? DEFAULT_MAX_DECIMALS;
    const onStage = options.onStage;

    let stage = 'direct-parse';
    const hash = hashPayload(raw);

    const attemptParse = text => {
        try {
            return JSON.parse(text);
        } catch (error) {
            return undefined;
        }
    };

    let parsed = attemptParse(raw);

    if (!parsed && featureEnabled) {
        stage = 'sanitized-parse';
        const sanitized = sanitizeJsonNumbers(raw, maxDecimals);
        parsed = attemptParse(sanitized);
        if (!parsed) {
            stage = 'repaired-parse';
            const repaired = repairLooseJson(sanitized);
            parsed = attemptParse(repaired);
        }
    }

    if (!parsed) {
        onStage?.('parse-failed', { hash });
        throw new GeometryJsonError('Failed to parse geometry JSON response.', {
            needRegen: true,
            hash,
            stage: 'parse-failed'
        });
    }

    const normalized = enforcePrecision(parsed, maxDecimals);

    const validationResult = validateGeometryStructure(normalized);
    if (!validationResult.valid) {
        onStage?.(stage, { hash, schemaErrors: validationResult.errors });
        throw new GeometryJsonError('Geometry JSON failed schema validation.', {
            needRegen: true,
            hash,
            stage,
            schemaErrors: validationResult.errors
        });
    }

    onStage?.(stage, { hash });

    return {
        value: normalized,
        stage,
        hash
    };
};

module.exports = {
    GeometryJsonError,
    parseGeometryJson,
    sanitizeJsonNumbers,
    repairLooseJson,
    enforcePrecision,
    SANITIZER_FEATURE_ENABLED,
    DEFAULT_MAX_DECIMALS
};
