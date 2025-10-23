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
const {
    deriveVisualFeatures,
    buildFeatureSignature
} = require('../src/utils/visualFeatures');
const { validateSS } = require('../src/socialStudies/validators');
const { isImageEligible: isCuratedImageEligible } = require('../imageResolver');
const { filterEligibleImages, selectCuratedImages } = require('../server');

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

function enrichScreenshotMeta(meta) {
    const features = deriveVisualFeatures(meta);
    return {
        ...meta,
        features,
        featureSignature: buildFeatureSignature(features),
        isScreenshot: true
    };
}

const REGION_SCREENSHOT_META = enrichScreenshotMeta({
    id: 'types-of-regions',
    filePath: 'Screenshot 2024-02-10 Types of Regions.png',
    fileName: 'Screenshot 2024-02-10 Types of Regions.png',
    title: 'Types of Regions',
    altText: 'Types of Regions table listing Formal, Functional, and Perceptual examples such as Latin America in the Example column.',
    detailedDescription: 'Types of Regions table with columns Type, Definition, and Example. The Perceptual row lists Latin America while Formal lists Rocky Mountains.',
    keywords: ['formal', 'functional', 'perceptual'],
    dominantType: 'table'
});

const ENERGY_SCREENSHOT_META = enrichScreenshotMeta({
    id: 'energy-consumption',
    filePath: 'Screenshot 2023-11-21 Energy Consumption.png',
    fileName: 'Screenshot 2023-11-21 Energy Consumption.png',
    title: 'U.S. Energy Consumption',
    altText: 'Line chart with legend showing Nuclear, Coal, Natural Gas, and Petroleum consumption in Btus from 2000 to 2020.',
    detailedDescription: 'Consumption (Btus) appears on the y-axis while the x-axis lists years 2000, 2005, 2010, 2015, and 2020. A legend identifies lines for Nuclear, Coal, Natural Gas, and Petroleum with coal declining the most.',
    keywords: ['nuclear', 'coal', 'natural', 'gas', 'petroleum'],
    dominantType: 'chart'
});

const BRANCHES_SCREENSHOT_META = enrichScreenshotMeta({
    id: 'branches-table',
    filePath: 'Screenshot 2023-12-02 Branches of Government.png',
    fileName: 'Screenshot 2023-12-02 Branches of Government.png',
    title: 'Branches of Government',
    altText: 'Table with Branch, Consists Of, and Powers columns highlighting the Judicial branch evaluates laws.',
    detailedDescription: 'Branches of Government table. Executive branch row notes the President and Vice President enforce laws, Judicial row explains Supreme Court evaluates laws, Legislative row describes Congress proposing bills.',
    keywords: ['executive', 'judicial', 'legislative'],
    dominantType: 'table'
});

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

test('screenshot validator blocks strategy language and missing anchors', () => {
    const strategyItem = {
        questionText: 'According to the on-screen directions, what is the first step the student should take?',
        answerOptions: [
            { text: 'Read the practice set instructions', isCorrect: true, rationale: 'The instructions appear at the top.' },
            { text: 'Study the Perceptual region row', isCorrect: false, rationale: 'Not mentioned.' },
            { text: 'Check the legend for shading', isCorrect: false, rationale: 'No legend on the table.' },
            { text: 'Skip to the last column', isCorrect: false, rationale: 'No support provided.' }
        ],
        solution: 'The stem should focus on the table columns such as the Example column rather than directions. The image itself lists Formal, Functional, and Perceptual types with examples like Latin America.',
        imageRef: {
            imageMeta: {
                caption: 'Types of Regions table with Formal, Functional, and Perceptual examples',
                alt: 'Table of region types'
            }
        },
        isScreenshot: true
    };

    const invalid = validateSocialStudiesItem(strategyItem, REGION_SCREENSHOT_META);
    assert.equal(invalid.valid, false);
    assert(invalid.errors.some((msg) => msg.includes('strateg')));

    const validItem = {
        questionText: 'According to the table\'s Type and Example columns, which Type lists Latin America in the Example column?',
        answerOptions: [
            { text: 'Formal', isCorrect: false, rationale: 'The Formal row lists Rocky Mountains in the Example column.' },
            { text: 'Functional', isCorrect: false, rationale: 'The Functional row references a TV station coverage area.' },
            { text: 'Perceptual', isCorrect: true, rationale: 'The Perceptual row of the table shows Latin America under Example.' },
            { text: 'Nodal', isCorrect: false, rationale: 'Nodal does not appear in the table columns.' }
        ],
        solution: 'The table row labeled Perceptual includes Latin America in the Example column. That evidence confirms Perceptual is the correct type listed in the image.',
        imageRef: {
            imageMeta: {
                caption: 'Types of Regions table with Formal, Functional, and Perceptual examples',
                alt: 'Table of region types'
            }
        },
        isScreenshot: true
    };

    const valid = validateSocialStudiesItem(validItem, REGION_SCREENSHOT_META);
    assert.equal(valid.valid, true, valid.errors.join('\n'));
});

test('screenshot validator enforces chart anchors and keyword overlap', () => {
    const weakChartItem = {
        questionText: 'Which source drops the most over time?',
        answerOptions: [
            { text: 'Coal', isCorrect: true, rationale: 'Coal declines visibly.' },
            { text: 'Natural Gas', isCorrect: false, rationale: 'The line trends upward.' },
            { text: 'Petroleum', isCorrect: false, rationale: 'Petroleum fluctuates.' },
            { text: 'Nuclear', isCorrect: false, rationale: 'Nuclear stays steady.' }
        ],
        solution: 'Coal decreases more than the other sources. The coal series drops across the years shown on the x-axis.',
        imageRef: {
            imageMeta: {
                caption: 'Line chart of U.S. energy consumption sources with legend and axes labels',
                alt: 'Energy consumption line chart'
            }
        },
        isScreenshot: true
    };

    const weakResult = validateSocialStudiesItem(weakChartItem, ENERGY_SCREENSHOT_META);
    assert.equal(weakResult.valid, false);
    assert(weakResult.errors.some((msg) => msg.includes('axes')));

    const strongChartItem = {
        questionText: 'According to the Consumption (Btus) y-axis and the legend, which energy source falls the furthest between 2000 and 2020?',
        answerOptions: [
            { text: 'Coal', isCorrect: true, rationale: 'The chart shows the coal line dropping sharply below the others.' },
            { text: 'Natural Gas', isCorrect: false, rationale: 'The natural gas line trends upward on the graph.' },
            { text: 'Petroleum', isCorrect: false, rationale: 'The petroleum series remains high without a steep decline.' },
            { text: 'Nuclear', isCorrect: false, rationale: 'The nuclear line stays nearly flat in the legend color.' }
        ],
        solution: 'The legend and Consumption (Btus) y-axis show the coal line dropping from roughly 20 to about 10 quadrillion Btus. That steep decline is greater than the changes on the other series across the years labeled on the x-axis.',
        imageRef: {
            imageMeta: {
                caption: 'Line chart of U.S. energy consumption sources with legend and axes labels',
                alt: 'Energy consumption line chart'
            }
        },
        isScreenshot: true
    };

    const strongResult = validateSocialStudiesItem(strongChartItem, ENERGY_SCREENSHOT_META);
    assert.equal(strongResult.valid, true, strongResult.errors.join('\n'));
});

test('screenshot validator ensures captions and signature metadata propagate', () => {
    const item = {
        id: 'screenshot-1',
        questionType: 'table',
        difficulty: 'easy',
        questionText: 'In the Branches of Government table, which branch is paired with evaluating laws?',
        answerOptions: [
            { text: 'Executive', isCorrect: false, rationale: 'The Executive row lists enforcing laws.' },
            { text: 'Judicial', isCorrect: true, rationale: 'The Judicial row notes that this branch evaluates laws.' },
            { text: 'Legislative', isCorrect: false, rationale: 'The Legislative row focuses on proposing bills.' },
            { text: 'Cabinet', isCorrect: false, rationale: 'Cabinet is not a column heading in the table.' }
        ],
        solution: 'The Powers column in the table shows the Judicial branch evaluates laws, so that is the correct choice.',
        imageRef: {
            imageMeta: {
                caption: 'Branches of Government table describing each branch and its powers',
                alt: 'Branches of Government table'
            }
        },
        isScreenshot: true
    };

    const normalized = normalizeItem(item, {
        imageMeta: BRANCHES_SCREENSHOT_META,
        questionType: 'table',
        difficulty: 'medium',
        blurb: null
    });

    assert(normalized.isScreenshot, 'Screenshot flag should be true');
    assert(normalized.imageRef.imageUrl && normalized.imageRef.imageUrl.startsWith('/img/'), 'Expected resolved image URL');
    const normalizedCaption = normalized.imageRef.caption || '';
    assert(normalizedCaption.length > 0, 'Caption should be populated');
    assert(!/screenshot/i.test(normalizedCaption), 'Caption should not mention screenshot');
    assert(!/\.(png|jpe?g|gif|webp|svg)/i.test(normalizedCaption), 'Caption should not include filenames');
    assert(Array.isArray(normalized.featureSignature) && normalized.featureSignature.includes('federalBranches'));
    assert.equal(Object.prototype.hasOwnProperty.call(normalized, 'imageFileName'), false);
});

test('validateSS enforces screenshot stem anchors and captions', () => {
    const features = deriveVisualFeatures(REGION_SCREENSHOT_META);

    const valid = {
        stem: "According to the table's Type and Example columns, which region type centers on a nodal focus?",
        choices: ['Formal', 'Functional', 'Perceptual', 'Political'],
        correctIndex: 1,
        imageRef: {
            imageMeta: {
                caption: 'Types of Regions table with Formal, Functional, and Perceptual examples'
            }
        }
    };

    assert.equal(validateSS(valid, REGION_SCREENSHOT_META, features, true), true);

    const invalid = {
        stem: 'Which region focuses on a center?',
        choices: ['Formal', 'Functional', 'Perceptual', 'Political'],
        correctIndex: 1,
        imageRef: {
            imageMeta: {
                caption: 'Types of Regions'
            }
        }
    };

    assert.equal(validateSS(invalid, REGION_SCREENSHOT_META, features, true), false);
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
    assert(normalized.imageRef && typeof normalized.imageRef.imageUrl === 'string');
    assert(normalized.imageRef.imageUrl.startsWith('/img/'));
    assert.equal(normalized.imageRef.alt, IMAGE_META_SAMPLE.altText);
    assert(!/screenshot/i.test((normalized.imageRef.caption || '')));
    assert(!/\.(png|jpe?g|gif|webp|svg)/i.test((normalized.imageRef.caption || '')));
    assert(normalized.source && normalized.source.citation.includes('Source'));
    assert(normalized.imageMeta && normalized.imageMeta.id === IMAGE_META_SAMPLE.id);
    assert.equal(Object.prototype.hasOwnProperty.call(normalized.imageMeta, 'fileName'), false);
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

test('relaxed image eligibility keeps image-first pool usable', () => {
    const sampleImages = [
        {
            id: 'map-1',
            type: 'map',
            visualType: 'map',
            tags: ['social-studies', 'geography'],
            file: 'map-1.png',
            title: 'Regional map overview',
            caption: 'Map showing regional boundaries.',
            subject: 'social-studies'
        },
        {
            id: 'photo-1',
            type: 'photo',
            visualType: 'photo',
            tags: ['history'],
            file: 'photo-1.png',
            caption: 'Historic photo without alt text.',
            subject: 'social-studies'
        },
        {
            id: 'invalid',
            type: '',
            visualType: 'photo',
            tags: [],
            file: 'invalid.png'
        }
    ];

    assert.equal(isCuratedImageEligible(sampleImages[0]), true);
    assert.equal(isCuratedImageEligible(sampleImages[1]), true);
    assert.equal(isCuratedImageEligible(sampleImages[2]), false);

    const filtered = filterEligibleImages(sampleImages);
    assert.equal(filtered.length, 2);

    const previousPool = global.curatedImages;
    global.curatedImages = sampleImages;
    try {
        const selected = selectCuratedImages({ subject: 'Social Studies', count: 1 });
        assert.ok(Array.isArray(selected));
        assert.ok(selected.length >= 1);
        assert.ok(selected.every((img) => img && img.id !== 'invalid'));
    } finally {
        global.curatedImages = previousPool;
    }
});
