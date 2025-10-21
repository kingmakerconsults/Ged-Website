const test = require('node:test');
const assert = require('node:assert');

const {
    resolveImageRef,
    __setBank,
    __clearBank,
    PLACEHOLDER_URL
} = require('../resolveImageRef');

function createBank(records = []) {
    const byId = new Map();
    const byUrl = new Map();
    const byFile = new Map();

    const setKey = (map, key, value) => {
        if (!key) return;
        const str = String(key).trim();
        if (!str) return;
        map.set(str, value);
        map.set(str.toLowerCase(), value);
    };

    for (const record of records) {
        if (!record || typeof record !== 'object') continue;
        const id = record.id ? String(record.id) : null;
        const imageUrl = record.imageUrl || null;
        const file = record.file || record.fileName || null;
        if (id) {
            setKey(byId, id, record);
        }
        if (imageUrl) {
            setKey(byUrl, imageUrl, record);
        }
        if (file) {
            setKey(byFile, file, record);
        }
    }

    return { list: records, byId, byUrl, byFile };
}

test.afterEach(() => {
    __clearBank();
});

test('resolves direct URL input with sanitization', async () => {
    __clearBank();
    const result = await resolveImageRef({
        url: ' https://example.com/<strong>image.png</strong> ',
        alt: ' <b>Important</b> graph ',
        caption: '\n <i>Graph caption</i> ',
        tags: ['Graph', ' graph '],
        subject: 'Science'
    });

    assert.strictEqual(result.imageUrl, 'https://example.com/image.png');
    assert.strictEqual(result.alt, 'Important graph');
    assert.strictEqual(result.subject, 'science');
    assert.deepStrictEqual(result.tags, ['Graph']);
    assert.strictEqual(result.caption, 'Graph caption');
});

test('looks up entries by id and sanitizes metadata', async () => {
    const records = [
        {
            id: 'img-1',
            file: 'test image.png',
            alt: 'Test <i>Image</i>',
            caption: '  Caption  ',
            credit: ' Example Credit ',
            subject: 'Social Studies',
            tags: ['Primary']
        }
    ];
    __setBank(createBank(records));

    const result = await resolveImageRef('img-1');

    assert.strictEqual(result.imageUrl, '/img/test%20image.png');
    assert.strictEqual(result.alt, 'Test Image');
    assert.strictEqual(result.caption, 'Caption');
    assert.strictEqual(result.credit, 'Example Credit');
    assert.strictEqual(result.subject, 'social_studies');
    assert.deepStrictEqual(result.tags, ['Primary']);
    assert.strictEqual(result.recordId, 'img-1');
});

test('merges record tags with provided tags and normalizes subjects', async () => {
    const records = [
        {
            id: 'img-2',
            file: 'graph.png',
            alt: 'Graph',
            subject: 'General',
            tags: ['History'],
            keywords: ['analysis']
        }
    ];
    __setBank(createBank(records));

    const result = await resolveImageRef(
        { id: 'img-2', tags: ['Equation', ' equation '], subject: 'Math' },
        { tags: ['graphs'] }
    );

    assert.strictEqual(result.subject, 'math');
    assert.deepStrictEqual(result.tags, ['History', 'analysis', 'graphs', 'Equation']);
});

test('falls back to placeholder when lookup fails', async () => {
    __clearBank();
    const result = await resolveImageRef('missing-id', { subject: 'Science' });

    assert.strictEqual(result.imageUrl, PLACEHOLDER_URL);
    assert.strictEqual(result.alt, 'Social studies image');
    assert.strictEqual(result.subject, 'science');
    assert.deepStrictEqual(result.tags, undefined);
});

