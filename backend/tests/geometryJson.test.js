const assert = require('assert');
const { test, describe } = require('node:test');

const {
    parseGeometryJson,
    sanitizeJsonNumbers,
    GeometryJsonError,
    DEFAULT_MAX_DECIMALS
} = require('../utils/geometryJson');

describe('geometry JSON sanitization and parsing', () => {
    test('sanitizes long float tails into at most two decimals', () => {
        const raw = '{"shape":"cylinder","dimensions":{"radius":3,"width":6.0000000000000000000000000000001},"questionText":"Q","answerOptions":[],"answer":12}';

        const result = parseGeometryJson(raw, {
            onStage: () => {}
        });

        assert.strictEqual(result.value.dimensions.width, 6);
        assert.ok(['direct-parse', 'sanitized-parse'].includes(result.stage));
    });

    test('flags malformed exponent numbers for regeneration', () => {
        const raw = '{"shape":"rectangular_prism","dimensions":{"length":10,"width":5.5000000000000018E000000abc},"questionText":"Q","answerOptions":[],"answer":20}';

        assert.throws(() => {
            parseGeometryJson(raw, { onStage: () => {} });
        }, error => error instanceof GeometryJsonError && error.needRegen);
    });

    test('repairs wrapped JSON content', () => {
        const raw = `Here is the problem you asked for: {"shape":"triangle","dimensions":{"b":4,"h":3},"questionText":"Q","answerOptions":[],"answer":6}`;
        const result = parseGeometryJson(raw, {
            onStage: () => {}
        });

        assert.strictEqual(result.value.shape, 'triangle');
        assert.strictEqual(result.stage, 'repaired-parse');
    });

    test('rejects schema violations for dimension numbers as strings', () => {
        const raw = '{"shape":"rectangle","dimensions":{"w":"10","h":5},"questionText":"Q","answerOptions":[],"answer":50}';

        assert.throws(() => {
            parseGeometryJson(raw, { onStage: () => {} });
        }, error => error instanceof GeometryJsonError && error.needRegen);
    });

    test('sanitizeJsonNumbers clamps decimals to configured precision', () => {
        const source = '{"value":12.987654321}';
        const sanitized = sanitizeJsonNumbers(source, DEFAULT_MAX_DECIMALS);
        assert.ok(!/\d+\.\d{3,}/.test(sanitized));
    });
});
