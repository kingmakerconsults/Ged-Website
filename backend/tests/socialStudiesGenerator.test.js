const test = require('node:test');
const assert = require('node:assert/strict');

const { planDifficulty } = require('../src/socialStudies/difficulty');
const {
    validateSocialStudiesItem
} = require('../src/socialStudies/validator');
const {
    fetchExternalBlurb
} = require('../src/socialStudies/blurbs');
const {
    selectVisualCombo,
    resetState
} = require('../src/socialStudies/imageBank');
const {
    normalizeItem
} = require('../src/socialStudies/generator');

const IMAGE_META_SAMPLE = {
    id: 'sample-image',
    filePath: '/frontend/Images/Social Studies/sample.png',
    altText: 'Map with a legend, compass rose, and colored regions',
    detailedDescription: 'A thematic map where darker shading indicates higher population density according to the legend in the lower left. A compass rose appears in the upper right.',
    usageDirectives: 'Focus on the legend shading and the compass orientation when framing the question.',
    dominantType: 'map',
    keywords: ['map', 'legend', 'compass', 'population', 'density'],
    width: 1024,
    height: 768,
    sourceTitle: 'Sample Atlas Entry'
};

function buildValidItem() {
    return {
        id: 'q1',
        questionType: 'map',
        difficulty: 'medium',
        questionText: 'According to the legend and the compass labels, which region shows the highest population density?',
        answerOptions: [
            { text: 'The eastern counties', isCorrect: true, rationale: 'The darkest shading in the legend matches the eastern side of the map.' },
            { text: 'The northern coast', isCorrect: false, rationale: 'The legend indicates the lighter blue used there represents lower density.' },
            { text: 'The southern plains', isCorrect: false, rationale: 'Those areas are marked with the lightest color on the key.' },
            { text: 'The central highlands', isCorrect: false, rationale: 'The legend shows that medium shading equals moderate density.' }
        ],
        solution: 'The legend pairs the darkest color with the highest density, and the compass shows that color concentrated in the east. The map labels confirm that the eastern counties fit that description.',
        passage: undefined
    };
}

function countWords(text) {
    return text.trim().split(/\s+/).filter(Boolean).length;
}

test('planDifficulty balances counts for social studies', () => {
    const result = planDifficulty(10, 'social_studies');
    assert.deepStrictEqual(result, { easy: 3, medium: 5, hard: 2 });
});

test('validator enforces visual anchors and choice structure', () => {
    const invalid = buildValidItem();
    invalid.questionText = 'What does the map show about regional trends?';
    invalid.solution = 'The map shows regional trends across the states.';

    const invalidResult = validateSocialStudiesItem(invalid, IMAGE_META_SAMPLE);
    assert.equal(invalidResult.valid, false);
    assert(invalidResult.errors.some((msg) => msg.includes('visual anchors')));

    const validResult = validateSocialStudiesItem(buildValidItem(), IMAGE_META_SAMPLE);
    assert.equal(validResult.valid, true, validResult.errors?.join('\n'));
});

test('fetchExternalBlurb returns cached Britannica-style entry', async () => {
    const blurb = await fetchExternalBlurb({ topic: "Freedmen's Bureau" });
    assert(blurb, 'Expected cached blurb');
    assert(blurb.citation && blurb.citation.startsWith('Source:'), 'Citation should mention Source');
    const words = countWords(blurb.text || '');
    assert(words >= 60 && words <= 200, `Blurb word count out of range: ${words}`);
});

test('image selection avoids immediate reuse of recent image ids', () => {
    resetState();
    let previousId = null;
    for (let i = 0; i < 12; i += 1) {
        const combo = selectVisualCombo({ desiredType: 'map' });
        assert(combo && combo.imageMeta && combo.imageMeta.id, 'Expected image metadata');
        assert.notEqual(combo.imageMeta.id, previousId, 'Selector should not reuse the same image consecutively');
        previousId = combo.imageMeta.id;
    }
});

test('normalizeItem adds social studies metadata fields', () => {
    const normalized = normalizeItem(buildValidItem(), {
        imageMeta: IMAGE_META_SAMPLE,
        questionType: 'map',
        difficulty: 'medium',
        blurb: {
            title: "Freedmen's Bureau",
            url: 'https://www.britannica.com/topic/Freedmens-Bureau',
            citation: 'Source: Freedmen\'s Bureau (Britannica).'
        }
    });

    assert.equal(normalized.domain, 'social_studies');
    assert.equal(normalized.questionType, 'map');
    assert(normalized.imageRef && normalized.imageRef.path === IMAGE_META_SAMPLE.filePath);
    assert.equal(normalized.imageRef.altText, IMAGE_META_SAMPLE.altText);
    assert.equal(normalized.imageRef.caption, "Freedmen's Bureau");
    assert(normalized.source && normalized.source.citation.includes('Source'));
    assert(normalized.imageMeta && normalized.imageMeta.id === IMAGE_META_SAMPLE.id);
});

test('selectVisualCombo rotates question types to avoid triple repeats', () => {
    resetState();
    const types = [];
    for (let i = 0; i < 6; i += 1) {
        const combo = selectVisualCombo({});
        types.push(combo.questionType);
    }
    for (let i = 2; i < types.length; i += 1) {
        const a = types[i];
        const b = types[i - 1];
        const c = types[i - 2];
        assert(!(a === b && b === c), `Found three consecutive ${a} types in history: ${types.join(', ')}`);
    }
});
