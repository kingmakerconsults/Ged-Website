const crypto = require('crypto');
const geometrySchema = require('../schemas/geometrySchema');
const SUPPORTED_SHAPES = geometrySchema.SUPPORTED_SHAPES || [];

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

const ensureNumber = value => typeof value === 'number' && Number.isFinite(value);

const validatePoint = point => {
    return point && ensureNumber(point.x) && ensureNumber(point.y);
};

const validatePointArray = (points, errors, path) => {
    if (!Array.isArray(points) || points.length === 0) {
        errors.push(`${path} must be a non-empty array.`);
        return;
    }
    points.forEach((pt, index) => {
        if (!validatePoint(pt)) {
            errors.push(`${path}[${index}] must provide numeric x and y values.`);
        }
    });
};

const validateGeometryStructure = obj => {
    const errors = [];

    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
        errors.push('Response must be a JSON object.');
        return { valid: false, errors };
    }

    if (typeof obj.question !== 'string' || obj.question.trim().length === 0) {
        errors.push('Missing or invalid "question" value.');
    }

    if (!Array.isArray(obj.choices) || obj.choices.length < 2 || obj.choices.some(choice => typeof choice !== 'string')) {
        errors.push('"choices" must be an array of at least two strings.');
    }

    if (!ensureNumber(obj.answerIndex) || Math.floor(obj.answerIndex) !== obj.answerIndex) {
        errors.push('"answerIndex" must be an integer.');
    } else if (Array.isArray(obj.choices) && (obj.answerIndex < 0 || obj.answerIndex >= obj.choices.length)) {
        errors.push('"answerIndex" must reference an index in the choices array.');
    }

    if (obj.choiceRationales) {
        if (!Array.isArray(obj.choiceRationales) || obj.choiceRationales.some(item => typeof item !== 'string')) {
            errors.push('"choiceRationales" must be an array of strings when provided.');
        } else if (obj.choiceRationales.length !== obj.choices.length) {
            errors.push('"choiceRationales" length must match choices length.');
        }
    }

    const spec = obj.geometrySpec;
    if (!spec || typeof spec !== 'object' || Array.isArray(spec)) {
        errors.push('Missing or invalid "geometrySpec" object.');
    } else {
        if (typeof spec.shape !== 'string' || !SUPPORTED_SHAPES.includes(spec.shape)) {
            errors.push(spec.shape ? `Shape '${spec.shape}' is not supported.` : 'Missing "geometrySpec.shape".');
        }

        if (!spec.params || typeof spec.params !== 'object' || Array.isArray(spec.params)) {
            errors.push('"geometrySpec.params" must be an object.');
        } else {
            const params = spec.params;

            if (Array.isArray(params.points)) {
                validatePointArray(params.points, errors, 'geometrySpec.params.points');
            }

            const requireNumber = (target, key) => {
                if (!Object.prototype.hasOwnProperty.call(target, key) || typeof target[key] !== 'number' || Number.isNaN(target[key])) {
                    errors.push(`"geometrySpec.params.${key}" must be a number.`);
                }
            };

            if (spec.shape === 'triangle' || spec.shape === 'right_triangle' || spec.shape === 'polygon') {
                if (!Array.isArray(params.points) || params.points.length < 3) {
                    errors.push('Polygon-based shapes must include at least three labeled points.');
                }
            }

            if (spec.shape === 'rectangle') {
                requireNumber(params, 'width');
                requireNumber(params, 'height');
                if (params.origin && !validatePoint(params.origin)) {
                    errors.push('"geometrySpec.params.origin" must include numeric x and y.');
                }
            }

            if (spec.shape === 'circle') {
                if (!validatePoint(params.center)) {
                    errors.push('"geometrySpec.params.center" must include numeric x and y.');
                }
                requireNumber(params, 'radius');
            }

            if (spec.shape === 'regular_polygon') {
                if (!validatePoint(params.center)) {
                    errors.push('"geometrySpec.params.center" must include numeric x and y.');
                }
                requireNumber(params, 'radius');
                requireNumber(params, 'sides');
            }

            if (spec.shape === 'line_angle') {
                if (!validatePoint(params.vertex) || !validatePoint(params.ray1) || !validatePoint(params.ray2)) {
                    errors.push('Line angle specifications require vertex, ray1, and ray2 points.');
                }
            }

            if (spec.shape === 'cylinder_net') {
                requireNumber(params, 'radius');
                requireNumber(params, 'height');
            }

            if (spec.shape === 'rect_prism_net') {
                requireNumber(params, 'length');
                requireNumber(params, 'width');
                requireNumber(params, 'height');
            }

            if (params.center && !validatePoint(params.center)) {
                errors.push('"geometrySpec.params.center" must include numeric x and y.');
            }

            if (Object.prototype.hasOwnProperty.call(params, 'radius') && !ensureNumber(params.radius)) {
                errors.push('"geometrySpec.params.radius" must be a number.');
            }

            if (params.sideLabels) {
                if (!Array.isArray(params.sideLabels)) {
                    errors.push('"geometrySpec.params.sideLabels" must be an array when provided.');
                } else {
                    params.sideLabels.forEach((entry, index) => {
                        if (!entry || typeof entry !== 'object') {
                            errors.push(`sideLabels[${index}] must be an object.`);
                            return;
                        }
                        if (!Array.isArray(entry.between) || entry.between.length !== 2) {
                            errors.push(`sideLabels[${index}].between must be an array of two point labels.`);
                        }
                        if (typeof entry.text !== 'string') {
                            errors.push(`sideLabels[${index}].text must be a string.`);
                        }
                    });
                }
            }

            if (params.rightAngle) {
                if (!params.rightAngle.vertex || typeof params.rightAngle.vertex !== 'string') {
                    errors.push('"geometrySpec.params.rightAngle.vertex" must be a string label.');
                }
                if (Object.prototype.hasOwnProperty.call(params.rightAngle, 'size') && !ensureNumber(params.rightAngle.size)) {
                    errors.push('"geometrySpec.params.rightAngle.size" must be numeric when provided.');
                }
            }

            if (params.labels) {
                if (!Array.isArray(params.labels)) {
                    errors.push('"geometrySpec.params.labels" must be an array when provided.');
                } else {
                    params.labels.forEach((label, index) => {
                        if (!label || typeof label !== 'object' || typeof label.text !== 'string' || !validatePoint(label)) {
                            errors.push(`labels[${index}] must include text, x, and y values.`);
                        }
                    });
                }
            }

            if (params.segments) {
                if (!Array.isArray(params.segments)) {
                    errors.push('"geometrySpec.params.segments" must be an array when provided.');
                } else {
                    params.segments.forEach((segment, index) => {
                        if (!segment || typeof segment !== 'object') {
                            errors.push(`segments[${index}] must be an object.`);
                            return;
                        }
                        if (!Array.isArray(segment.from) || !Array.isArray(segment.to)) {
                            errors.push(`segments[${index}] must provide numeric coordinate arrays for from/to.`);
                        } else if (segment.from.length !== 2 || segment.to.length !== 2 ||
                            !segment.from.every(ensureNumber) || !segment.to.every(ensureNumber)) {
                            errors.push(`segments[${index}] from/to must be [x,y] numeric coordinates.`);
                        }
                    });
                }
            }
        }

        if (spec.view && typeof spec.view === 'object') {
            const view = spec.view;
            ['xMin', 'xMax', 'yMin', 'yMax', 'padding', 'width', 'height'].forEach(key => {
                if (Object.prototype.hasOwnProperty.call(view, key) && !ensureNumber(view[key])) {
                    errors.push(`"geometrySpec.view.${key}" must be numeric when provided.`);
                }
            });
        } else if (spec.view && typeof spec.view !== 'object') {
            errors.push('"geometrySpec.view" must be an object when provided.');
        }

        if (spec.style && typeof spec.style !== 'object') {
            errors.push('"geometrySpec.style" must be an object when provided.');
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
