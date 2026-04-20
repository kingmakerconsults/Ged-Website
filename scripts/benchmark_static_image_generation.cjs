#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { fetch } = require('undici');

const {
	canonicalizeImageAssetPath,
	decodeImageAssetPath,
	loadMergedImageMetadata,
} = require('../backend/src/lib/imageMetadataRepository');

const ROOT = path.join(__dirname, '..');
const BACKEND_DIR = path.join(ROOT, 'backend');
const FRONTEND_PUBLIC_DIR = path.join(ROOT, 'frontend', 'public');
const REPORTS_DIR = path.join(ROOT, 'reports');
const REPORT_JSON_PATH = path.join(
	REPORTS_DIR,
	'static_image_generation_benchmark.json'
);
const REPORT_MD_PATH = path.join(
	REPORTS_DIR,
	'static_image_generation_benchmark.md'
);

dotenv.config({ path: path.join(ROOT, '.env') });

const STOPWORDS = new Set([
	'according',
	'after',
	'also',
	'answer',
	'because',
	'before',
	'chart',
	'compare',
	'correct',
	'data',
	'diagram',
	'graph',
	'image',
	'label',
	'labels',
	'legend',
	'map',
	'most',
	'question',
	'shown',
	'shows',
	'support',
	'table',
	'their',
	'there',
	'these',
	'they',
	'this',
	'those',
	'visual',
	'what',
	'when',
	'where',
	'which',
	'while',
	'with',
	'would',
]);

const IMAGE_TYPE_ORDER = [
	'chart',
	'map',
	'diagram',
	'table',
	'cartoon',
	'document',
	'photo',
	'illustration',
];

const GENERATED_QUESTION_SCHEMA = {
	type: 'OBJECT',
	properties: {
		questionText: { type: 'STRING' },
		answerOptions: {
			type: 'ARRAY',
			items: {
				type: 'OBJECT',
				properties: {
					text: { type: 'STRING' },
					isCorrect: { type: 'BOOLEAN' },
					rationale: { type: 'STRING' },
				},
				required: ['text', 'isCorrect', 'rationale'],
			},
		},
		evidenceUsed: {
			type: 'ARRAY',
			items: { type: 'STRING' },
		},
		followedSeed: { type: 'STRING' },
		stimulusImage: {
			type: 'OBJECT',
			properties: {
				src: { type: 'STRING' },
				alt: { type: 'STRING' },
			},
			required: ['src', 'alt'],
		},
	},
	required: [
		'questionText',
		'answerOptions',
		'evidenceUsed',
		'followedSeed',
		'stimulusImage',
	],
};

function parseArgs(argv) {
	const out = {
		limit: 6,
		noAi: argv.includes('--no-ai'),
		subjects: null,
		only: null,
	};

	const limitIdx = argv.indexOf('--limit');
	if (limitIdx >= 0) {
		const value = Number(argv[limitIdx + 1]);
		if (Number.isFinite(value) && value > 0) out.limit = Math.floor(value);
	}

	const subjectsIdx = argv.indexOf('--subjects');
	if (subjectsIdx >= 0) {
		const raw = String(argv[subjectsIdx + 1] || '').trim();
		if (raw) {
			out.subjects = new Set(
				raw
					.split(',')
					.map((value) => String(value || '').trim())
					.filter(Boolean)
			);
		}
	}

	const onlyIdx = argv.indexOf('--only');
	if (onlyIdx >= 0) {
		const raw = String(argv[onlyIdx + 1] || '').trim();
		if (raw) {
			out.only = new Set(
				raw
					.split(',')
					.map((value) => canonicalizeImageAssetPath(value))
					.filter(Boolean)
			);
		}
	}

	return out;
}

function normalizeText(value) {
	return String(value || '')
		.replace(/\s+/g, ' ')
		.trim();
}

function safeLower(value) {
	return normalizeText(value).toLowerCase();
}

function uniqueStrings(values = []) {
	const seen = new Set();
	const output = [];
	for (const value of values) {
		const normalized = normalizeText(value);
		if (!normalized) continue;
		const key = normalized.toLowerCase();
		if (seen.has(key)) continue;
		seen.add(key);
		output.push(normalized);
	}
	return output;
}

function tokenize(value) {
	return safeLower(value)
		.split(/[^a-z0-9.%]+/)
		.map((token) => token.trim())
		.filter((token) => token && (token.length >= 4 || /^\d/.test(token)))
		.filter((token) => !STOPWORDS.has(token));
}

function classifyImageType(entry) {
	const combined = [
		entry.category,
		entry.altText,
		entry.detailedDescription,
		...(Array.isArray(entry.keywords) ? entry.keywords : []),
		...(Array.isArray(entry.stimulusTypes) ? entry.stimulusTypes : []),
	]
		.map(safeLower)
		.join(' ');

	if (/cartoon|caricature|comic/.test(combined)) return 'cartoon';
	if (/map|atlas|route|territory/.test(combined)) return 'map';
	if (/chart|graph|plot|bar|line|pie|scatter/.test(combined)) return 'chart';
	if (/table|grid|matrix|spreadsheet/.test(combined)) return 'table';
	if (/diagram|cycle|process|cross-section|model/.test(combined)) {
		return 'diagram';
	}
	if (/document|poster|flyer|article|newspaper|letter|excerpt/.test(combined)) {
		return 'document';
	}
	if (/photo|photograph|portrait|microscope/.test(combined)) return 'photo';
	return 'illustration';
}

function publicAssetExists(filePath) {
	const canonical = canonicalizeImageAssetPath(filePath);
	if (!canonical) return false;
	const decoded = decodeImageAssetPath(canonical).replace(/^\/+/, '');
	return fs.existsSync(path.join(FRONTEND_PUBLIC_DIR, decoded));
}

function buildMetadataText(entry) {
	return [
		entry.subject,
		entry.category,
		entry.altText,
		entry.detailedDescription,
		entry.extractedText,
		...(Array.isArray(entry.visualElements) ? entry.visualElements : []),
		...(Array.isArray(entry.keywords) ? entry.keywords : []),
		...(Array.isArray(entry.questionSeeds) ? entry.questionSeeds : []),
		entry.usageDirectives,
		...(Array.isArray(entry.subjectAreas) ? entry.subjectAreas : []),
		...(Array.isArray(entry.topicTags) ? entry.topicTags : []),
		...(Array.isArray(entry.stimulusTypes) ? entry.stimulusTypes : []),
	]
		.map(normalizeText)
		.filter(Boolean)
		.join(' ');
}

function metadataTokens(entry) {
	return new Set(tokenize(buildMetadataText(entry)));
}

function findCorrectOption(question) {
	return Array.isArray(question?.answerOptions)
		? question.answerOptions.find((option) => option && option.isCorrect === true)
		: null;
}

function matchedTokens(text, tokenSet) {
	return uniqueStrings(tokenize(text).filter((token) => tokenSet.has(token)));
}

function extractLabelPhrases(questionText, correctOption) {
	const phrases = [];
	const answerText = normalizeText(correctOption?.text);
	const combined = `${normalizeText(questionText)} ${answerText} ${normalizeText(
		correctOption?.rationale
	)}`;

	if (answerText && answerText.length <= 80) phrases.push(answerText);

	const regexes = [/point\s+[a-z]/gi, /\d+(?:\.\d+)?%/g, /\b\d{4}\b/g];
	for (const regex of regexes) {
		const matches = combined.match(regex) || [];
		for (const match of matches) phrases.push(match);
	}

	return uniqueStrings(phrases);
}

function scoreSeedAlignment(question, entry) {
	const correct = findCorrectOption(question);
	const combined = `${normalizeText(question?.questionText)} ${normalizeText(
		correct?.text
	)} ${normalizeText(correct?.rationale)}`;

	let bestSeed = '';
	let bestOverlap = 0;
	for (const seed of Array.isArray(entry.questionSeeds) ? entry.questionSeeds : []) {
		const overlap = matchedTokens(combined, new Set(tokenize(seed))).length;
		if (overlap > bestOverlap) {
			bestOverlap = overlap;
			bestSeed = seed;
		}
	}

	return { bestSeed, bestOverlap };
}

function benchmarkStaticQuestion(question, entry) {
	const tokenSet = metadataTokens(entry);
	const metadataText = safeLower(buildMetadataText(entry));
	const correct = findCorrectOption(question);
	const questionText = normalizeText(question?.questionText);
	const correctText = normalizeText(correct?.text);
	const rationaleText = normalizeText(correct?.rationale);

	const stemOverlap = matchedTokens(questionText, tokenSet);
	const correctOverlap = matchedTokens(
		`${correctText} ${rationaleText}`,
		tokenSet
	);
	const combinedOverlap = uniqueStrings([...stemOverlap, ...correctOverlap]);
	const supportedPhrases = extractLabelPhrases(questionText, correct).filter(
		(phrase) => metadataText.includes(safeLower(phrase))
	);
	const seedAlignment = scoreSeedAlignment(question, entry);

	return {
		questionText,
		correctAnswer: correctText,
		stemOverlap,
		correctOverlap,
		combinedOverlap,
		supportedPhrases,
		bestSeed: seedAlignment.bestSeed,
		bestSeedOverlap: seedAlignment.bestOverlap,
		supported:
			supportedPhrases.length > 0 ||
			(stemOverlap.length >= 2 && correctOverlap.length >= 2) ||
			correctOverlap.length >= 3 ||
			seedAlignment.bestOverlap >= 2 ||
			(combinedOverlap.length >= 4 && seedAlignment.bestOverlap >= 1),
	};
}

function summarizeStaticCase(entry) {
	const questionResults = (Array.isArray(entry.questions) ? entry.questions : []).map(
		(question) => benchmarkStaticQuestion(question, entry)
	);
	const supportedQuestions = questionResults.filter(
		(result) => result.supported
	).length;

	return {
		filePath: entry.filePath,
		fileName: entry.fileName,
		subject: entry.subject,
		category: entry.category || '',
		imageType: classifyImageType(entry),
		questionCount: questionResults.length,
		supportedQuestions,
		supportRate: questionResults.length
			? Number(((supportedQuestions / questionResults.length) * 100).toFixed(1))
			: 0,
		qualityRank:
			Number.isFinite(Number(entry.qualityRank)) && Number(entry.qualityRank) > 0
				? Number(entry.qualityRank)
				: null,
		metadataSources: Array.isArray(entry.__metadataSources)
			? entry.__metadataSources
			: [],
		metadataPreview: {
			altText: normalizeText(entry.altText),
			description: normalizeText(entry.detailedDescription).slice(0, 260),
			extractedText: normalizeText(entry.extractedText).slice(0, 180),
			questionSeeds: (Array.isArray(entry.questionSeeds) ? entry.questionSeeds : []).slice(
				0,
				4
			),
			usageDirectives: normalizeText(entry.usageDirectives),
		},
		questionResults,
	};
}

function summarizeStaticCoverage(cases) {
	const summary = {
		totalImages: cases.length,
		totalQuestions: 0,
		supportedQuestions: 0,
		fullySupportedImages: 0,
		partiallySupportedImages: 0,
		unsupportedImages: 0,
		bySubject: {},
		byImageType: {},
	};

	for (const item of cases) {
		summary.totalQuestions += item.questionCount;
		summary.supportedQuestions += item.supportedQuestions;

		if (item.supportedQuestions === item.questionCount) {
			summary.fullySupportedImages += 1;
		} else if (item.supportedQuestions > 0) {
			summary.partiallySupportedImages += 1;
		} else {
			summary.unsupportedImages += 1;
		}

		if (!summary.bySubject[item.subject]) {
			summary.bySubject[item.subject] = {
				images: 0,
				questions: 0,
				supportedQuestions: 0,
			};
		}
		if (!summary.byImageType[item.imageType]) {
			summary.byImageType[item.imageType] = {
				images: 0,
				questions: 0,
				supportedQuestions: 0,
			};
		}

		summary.bySubject[item.subject].images += 1;
		summary.bySubject[item.subject].questions += item.questionCount;
		summary.bySubject[item.subject].supportedQuestions += item.supportedQuestions;

		summary.byImageType[item.imageType].images += 1;
		summary.byImageType[item.imageType].questions += item.questionCount;
		summary.byImageType[item.imageType].supportedQuestions += item.supportedQuestions;
	}

	summary.questionSupportRate = summary.totalQuestions
		? Number(((summary.supportedQuestions / summary.totalQuestions) * 100).toFixed(1))
		: 0;

	return summary;
}

function selectRepresentativeCases(cases, limit) {
	const sorted = cases
		.slice()
		.sort((left, right) => {
			if (right.supportRate !== left.supportRate) return right.supportRate - left.supportRate;
			if ((left.qualityRank || 99) !== (right.qualityRank || 99)) {
				return (left.qualityRank || 99) - (right.qualityRank || 99);
			}
			return `${left.subject}/${left.fileName}`.localeCompare(
				`${right.subject}/${right.fileName}`
			);
		});

	const selected = [];
	const seen = new Set();

	for (const imageType of IMAGE_TYPE_ORDER) {
		const match = sorted.find(
			(item) => item.imageType === imageType && item.supportRate === 100
		);
		if (!match) continue;
		const key = `${match.subject}|${match.filePath}`;
		if (seen.has(key)) continue;
		seen.add(key);
		selected.push(match);
		if (selected.length >= limit) return selected;
	}

	for (const item of sorted) {
		const key = `${item.subject}|${item.filePath}`;
		if (seen.has(key)) continue;
		seen.add(key);
		selected.push(item);
		if (selected.length >= limit) break;
	}

	return selected;
}

async function callAI(prompt, schema) {
	const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GOOGLE_API_KEY;
	if (!apiKey) {
		throw new Error('GOOGLE_AI_API_KEY or GOOGLE_API_KEY is not configured.');
	}

	const response = await fetch(
		`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
		{
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				contents: [{ parts: [{ text: prompt }] }],
				generationConfig: {
					responseMimeType: 'application/json',
					responseSchema: schema,
					temperature: 0.2,
				},
			}),
		}
	);

	if (!response.ok) {
		throw new Error(`AI request failed (${response.status}): ${await response.text()}`);
	}

	const payload = await response.json();
	const rawText = payload?.candidates?.[0]?.content?.parts?.[0]?.text;
	if (typeof rawText !== 'string') {
		throw new Error('AI response did not include JSON text.');
	}

	return JSON.parse(rawText.replace(/```json/g, '').replace(/```/g, '').trim());
}

function buildGenerationPrompt(entry) {
	const metadata = {
		subject: entry.subject,
		filePath: entry.filePath,
		altText: entry.altText || '',
		detailedDescription: normalizeText(entry.detailedDescription),
		extractedText: normalizeText(entry.extractedText),
		category: entry.category || '',
		keywords: Array.isArray(entry.keywords) ? entry.keywords.slice(0, 10) : [],
		questionSeeds: Array.isArray(entry.questionSeeds)
			? entry.questionSeeds.slice(0, 4)
			: [],
		usageDirectives: normalizeText(entry.usageDirectives),
		subjectAreas: Array.isArray(entry.subjectAreas)
			? entry.subjectAreas.slice(0, 4)
			: [],
		topicTags: Array.isArray(entry.topicTags) ? entry.topicTags.slice(0, 6) : [],
		stimulusTypes: Array.isArray(entry.stimulusTypes)
			? entry.stimulusTypes.slice(0, 4)
			: [],
		qualityRank: entry.qualityRank || null,
		groundingStrength: entry.__groundingStrength || 0,
	};

	return `You are benchmarking metadata-only image question generation for a GED platform.
Use ONLY the metadata record below.
Do not use outside knowledge.
Do not invent any label, value, date, region, scientific relationship, or symbolic meaning that is not explicitly supported by the metadata.

Return exactly one GED-level multiple-choice question in JSON.
The question must require the learner to use the image.
Stay inside the approved questionSeeds and usageDirectives when they are present.

Output shape:
{
	"questionText": "",
	"answerOptions": [
		{ "text": "", "isCorrect": true, "rationale": "" }
	],
	"evidenceUsed": ["exact short phrase copied from metadata"],
	"followedSeed": "",
	"stimulusImage": { "src": "", "alt": "" }
}

Rules:
- 4 answer options exactly.
- Exactly one correct option.
- 'evidenceUsed' must contain 2 to 4 exact short phrases copied verbatim from metadata.
- 'followedSeed' should exactly match one provided questionSeed when possible, otherwise return "".
- 'stimulusImage.src' must equal the metadata filePath.
- 'stimulusImage.alt' must equal the metadata altText.

Metadata:
${JSON.stringify(metadata, null, 2)}`;
}

function evaluateGeneratedQuestion(generated, entry) {
	const metadataText = safeLower(buildMetadataText(entry));
	const tokenSet = metadataTokens(entry);
	const answerOptions = Array.isArray(generated?.answerOptions)
		? generated.answerOptions
		: [];
	const correct = answerOptions.find((option) => option && option.isCorrect === true);
	const evidenceUsed = uniqueStrings(generated?.evidenceUsed || []);
	const evidenceVerified = evidenceUsed.filter((fact) =>
		metadataText.includes(safeLower(fact))
	);
	const followedSeed = normalizeText(generated?.followedSeed);
	const followedSeedMatched = Array.isArray(entry.questionSeeds)
		? entry.questionSeeds.some((seed) => normalizeText(seed) === followedSeed)
		: false;
	const correctCount = answerOptions.filter(
		(option) => option && option.isCorrect === true
	).length;
	const stemOverlap = matchedTokens(generated?.questionText, tokenSet);
	const rationaleOverlap = matchedTokens(
		`${normalizeText(correct?.text)} ${normalizeText(correct?.rationale)}`,
		tokenSet
	);
	const stimulusOk =
		normalizeText(generated?.stimulusImage?.src) === normalizeText(entry.filePath) &&
		normalizeText(generated?.stimulusImage?.alt) === normalizeText(entry.altText);

	return {
		pass:
			correctCount === 1 &&
			evidenceUsed.length >= 2 &&
			evidenceVerified.length === evidenceUsed.length &&
			stemOverlap.length >= 2 &&
			rationaleOverlap.length >= 2 &&
			stimulusOk,
		correctCount,
		evidenceUsed,
		evidenceVerified,
		followedSeed,
		followedSeedMatched,
		stemOverlap,
		rationaleOverlap,
		stimulusOk,
	};
}

async function runGenerationSample(item) {
	try {
		const generated = await callAI(
			buildGenerationPrompt(item.__rawEntry),
			GENERATED_QUESTION_SCHEMA
		);
		return {
			filePath: item.filePath,
			fileName: item.fileName,
			subject: item.subject,
			imageType: item.imageType,
			generated,
			evaluation: evaluateGeneratedQuestion(generated, item.__rawEntry),
			staticReference: item.questionResults[0] || null,
		};
	} catch (error) {
		return {
			filePath: item.filePath,
			fileName: item.fileName,
			subject: item.subject,
			imageType: item.imageType,
			error: String(error.message || error),
			staticReference: item.questionResults[0] || null,
		};
	}
}

function buildMarkdownReport(report) {
	const lines = [];
	lines.push('# Static Image Generation Benchmark');
	lines.push('');
	lines.push(`Generated: ${report.generatedAt}`);
	lines.push('');
	lines.push('## Static Coverage');
	lines.push('');
	lines.push(`- Images with static questions: ${report.staticCoverage.totalImages}`);
	lines.push(`- Static questions checked: ${report.staticCoverage.totalQuestions}`);
	lines.push(
		`- Supported static questions: ${report.staticCoverage.supportedQuestions} (${report.staticCoverage.questionSupportRate}%)`
	);
	lines.push(
		`- Fully supported images: ${report.staticCoverage.fullySupportedImages}`
	);
	lines.push(
		`- Partially supported images: ${report.staticCoverage.partiallySupportedImages}`
	);
	lines.push(`- Unsupported images: ${report.staticCoverage.unsupportedImages}`);
	lines.push('');
	lines.push('## Weakest Static Cases');
	lines.push('');
	for (const item of report.weakestStaticCases.slice(0, 12)) {
		lines.push(
			`- ${item.subject}/${item.fileName} | ${item.imageType} | ${item.supportedQuestions}/${item.questionCount} supported`
		);
	}
	lines.push('');
	lines.push('## Generation Samples');
	lines.push('');
	if (!report.generationSamples.length) {
		lines.push('- No live generation samples were run.');
	}
	for (const sample of report.generationSamples) {
		if (sample.error) {
			lines.push(
				`- ${sample.subject}/${sample.fileName} | error | ${sample.error}`
			);
			continue;
		}
		lines.push(
			`- ${sample.subject}/${sample.fileName} | ${sample.imageType} | pass=${sample.evaluation.pass} | evidence ${sample.evaluation.evidenceVerified.length}/${sample.evaluation.evidenceUsed.length} verified | followedSeed=${sample.evaluation.followedSeedMatched}`
		);
		lines.push(`  Generated question: ${sample.generated.questionText}`);
	}
	lines.push('');
	lines.push('## Conclusion');
	lines.push('');
	lines.push(
		`- Static metadata support rate: ${report.staticCoverage.questionSupportRate}%`
	);
	lines.push(
		`- Live metadata-only generation pass rate: ${report.generationSummary.passCount}/${report.generationSummary.totalRun}`
	);
	lines.push('');
	return `${lines.join('\n')}\n`;
}

async function main() {
	const args = parseArgs(process.argv.slice(2));
	const cases = loadMergedImageMetadata({
		backendDir: BACKEND_DIR,
		assetExists: publicAssetExists,
	})
		.filter(
			(entry) =>
				entry &&
				entry.__exists !== false &&
				Array.isArray(entry.questions) &&
				entry.questions.length > 0
		)
		.filter((entry) => {
			if (args.subjects && !args.subjects.has(String(entry.subject || ''))) {
				return false;
			}
			if (args.only && !args.only.has(canonicalizeImageAssetPath(entry.filePath))) {
				return false;
			}
			return true;
		})
		.map((entry) => ({
			...summarizeStaticCase(entry),
			__rawEntry: entry,
		}));

	const staticCoverage = summarizeStaticCoverage(cases);
	const weakestStaticCases = cases
		.slice()
		.sort((left, right) => {
			if (left.supportRate !== right.supportRate) return left.supportRate - right.supportRate;
			return `${left.subject}/${left.fileName}`.localeCompare(
				`${right.subject}/${right.fileName}`
			);
		})
		.slice(0, 20)
		.map(({ __rawEntry, ...rest }) => rest);

	const selectedCases = selectRepresentativeCases(cases, args.limit);
	const generationSamples = [];
	if (!args.noAi) {
		for (const item of selectedCases) {
			generationSamples.push(await runGenerationSample(item));
		}
	}

	const generationSummary = {
		totalSelected: selectedCases.length,
		totalRun: generationSamples.length,
		passCount: generationSamples.filter((item) => item.evaluation?.pass).length,
		errorCount: generationSamples.filter((item) => item.error).length,
	};

	const report = {
		generatedAt: new Date().toISOString(),
		staticCoverage,
		weakestStaticCases,
		selectedCases: selectedCases.map(({ __rawEntry, ...rest }) => rest),
		generationSummary,
		generationSamples,
	};

	fs.mkdirSync(REPORTS_DIR, { recursive: true });
	fs.writeFileSync(REPORT_JSON_PATH, JSON.stringify(report, null, 2));
	fs.writeFileSync(REPORT_MD_PATH, buildMarkdownReport(report));

	console.log(
		JSON.stringify(
			{
				staticCoverage: {
					totalImages: staticCoverage.totalImages,
					totalQuestions: staticCoverage.totalQuestions,
					supportedQuestions: staticCoverage.supportedQuestions,
					questionSupportRate: staticCoverage.questionSupportRate,
				},
				generationSummary,
				reports: {
					json: path.relative(ROOT, REPORT_JSON_PATH).replace(/\\/g, '/'),
					markdown: path.relative(ROOT, REPORT_MD_PATH).replace(/\\/g, '/'),
				},
			},
			null,
			2
		)
	);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
