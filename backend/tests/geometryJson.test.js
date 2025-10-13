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
        const raw = JSON.stringify({
            question: 'Q',
            choices: ['A', 'B', 'C', 'D'],
            choiceRationales: ['r1', 'r2', 'r3', 'r4'],
            answerIndex: 0,
            geometrySpec: {
                shape: 'circle',
                params: {
                    center: { x: 50.123456, y: 50.654321 },
                    radius: 20.99999999
                }
            }
        });

        const result = parseGeometryJson(raw, {
            onStage: () => {}
        });

        assert.strictEqual(result.value.geometrySpec.params.radius, 21);
        assert.ok(['direct-parse', 'sanitized-parse'].includes(result.stage));
    });

    test('flags malformed exponent numbers for regeneration', () => {
        const raw = JSON.stringify({
            question: 'Q',
            choices: ['A', 'B', 'C', 'D'],
            answerIndex: 0,
            geometrySpec: {
                shape: 'rectangle',
                params: {
                    origin: { x: 10, y: 10 },
                    width: '5.0000000000000001E003oops',
                    height: 4
                }
            }
        });

        assert.throws(() => {
            parseGeometryJson(raw, { onStage: () => {} });
        }, error => error instanceof GeometryJsonError && error.needRegen);
    });

    test('repairs wrapped JSON content', () => {
        const wrapped = `Here is the problem you asked for: ${JSON.stringify({
            question: 'Q',
            choices: ['A', 'B', 'C', 'D'],
            answerIndex: 1,
            geometrySpec: {
                shape: 'triangle',
                params: {
                    points: [
                        { label: 'A', x: 10, y: 80 },
                        { label: 'B', x: 80, y: 80 },
                        { label: 'C', x: 45, y: 20 }
                    ]
                }
            }
        })}`;

        const result = parseGeometryJson(wrapped, {
            onStage: () => {}
        });

        assert.strictEqual(result.value.geometrySpec.shape, 'triangle');
        assert.strictEqual(result.stage, 'repaired-parse');
    });

    test('rejects schema violations for non-numeric geometry parameters', () => {
        const raw = JSON.stringify({
            question: 'Q',
            choices: ['A', 'B', 'C', 'D'],
            answerIndex: 0,
            geometrySpec: {
                shape: 'circle',
                params: {
                    center: { x: '10', y: 20 },
                    radius: 5
                }
            }
        });

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
