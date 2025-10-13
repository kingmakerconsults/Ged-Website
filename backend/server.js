// server.js (Updated Version)

// Only use dotenv for local development. Render will provide environment variables in production.
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
}
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const { buildGeometrySchema, SUPPORTED_SHAPES } = require('./schemas/geometrySchema');
const {
    GeometryJsonError,
    parseGeometryJson,
    SANITIZER_FEATURE_ENABLED,
    DEFAULT_MAX_DECIMALS
} = require('./utils/geometryJson');

const GEOMETRY_FIGURES_ENABLED = String(process.env.GEOMETRY_FIGURES_ENABLED || '').toLowerCase() === 'true';

if (!GEOMETRY_FIGURES_ENABLED) {
    console.info('Geometry figures disabled (GEOMETRY_FIGURES_ENABLED=false); using text-only diagram descriptions.');
}

const app = express();
// IMPROVEMENT: Use the port provided by Render's environment, falling back to 3001 for local use.
const port = process.env.PORT || 3001;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const allowedOrigins = [
    'https://ezged.netlify.app',
    'https://quiz.ez-ged.com',
    'http://localhost:8000' // For local testing
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// handle preflight requests
app.options('*', cors(corsOptions)); // Use '*' to handle preflights for all routes
app.use(express.json());

app.get('/client-config.js', (req, res) => {
    const payload = `window.__APP_CONFIG__ = window.__APP_CONFIG__ || {}; window.__APP_CONFIG__.geometryFiguresEnabled = ${GEOMETRY_FIGURES_ENABLED};`;
    res.type('application/javascript').send(payload);
});

let curatedImages = [];
// Load the new, structured image repository from the local file system.
const imageRepositoryPath = path.join(__dirname, 'image_metadata_final.json');

try {
    const imageData = fs.readFileSync(imageRepositoryPath, 'utf8');
    curatedImages = JSON.parse(imageData);
    console.log(`Successfully loaded and parsed ${curatedImages.length} images from the local repository.`);
} catch (error) {
    console.error('Failed to load or parse image_metadata.json:', error);
}

// Add this new prompt library to server.js

const promptLibrary = {
    "Social Studies": {
        topic: (topic) => `Generate a 15-question GED-style Social Studies quiz focused on "${topic}".
        STRICT CONTENT REQUIREMENTS: Adhere to these content percentages AS CLOSELY AS POSSIBLE: 50% Civics & Government, 20% U.S. History, 15% Economics, 15% Geography & the World.
        STRICT STIMULUS REQUIREMENTS: A variety of stimuli MUST be used. Include at least 2 questions based on a chart/graph, 2 questions based on a historical quote, and 2 questions based on an image from the provided descriptions. The rest should be text passages.`,
        comprehensive: `Generate a 35-question comprehensive GED Social Studies exam.
        STRICT CONTENT REQUIREMENTS: Adhere to these content percentages EXACTLY: 50% Civics & Government, 20% U.S. History, 15% Economics, and 15% Geography & the World.
        STRICT STIMULUS REQUIREMENTS: The quiz must include a diverse mix of stimuli, including text passages, historical quotes, charts, graphs, and images from the provided descriptions.`
    },
    "Science": {
        topic: (topic) => `Generate a 15-question GED-style Science quiz focused on "${topic}".
        STRICT CONTENT REQUIREMENTS: Adhere to these content percentages AS CLOSELY AS POSSIBLE: 40% Life Science, 40% Physical Science, 20% Earth and Space Science.
        STRICT STIMULUS REQUIREMENTS: Ensure a mix of stimuli, including text passages, data tables/graphs, and diagrams from the provided descriptions. Questions should test reading comprehension of scientific texts and scientific reasoning.`,
        comprehensive: `Generate a 38-question comprehensive GED Science exam.
        STRICT CONTENT REQUIREMENTS: Adhere to these content percentages EXACTLY: 40% Life Science, 40% Physical Science, 20% Earth and Space Science.
        STRICT STIMULUS REQUIREMENTS: The quiz must include a diverse mix of stimuli, including text passages, data tables formatted as HTML, charts, and scientific diagrams from the provided descriptions.`
    },
"Reasoning Through Language Arts (RLA)": {
    topic: (topic) => `Generate a 15-question GED-style RLA quiz focused on "${topic}".
        STRICT CONTENT REQUIREMENTS: The quiz must be 75% Informational Text (non-fiction, workplace documents) and 25% Literary Text. It must include a mix of reading comprehension questions and language/grammar questions. DO NOT generate Social Studies questions; generate RLA questions using passages ABOUT "${topic}".`,
    comprehensive: {
    part1: `Generate the Reading Comprehension section of a GED RLA exam. Create exactly 4 long passages, each 4-5 paragraphs long, and each passage MUST have a concise, engaging title wrapped in <strong> tags. The passages must be formatted with <p> tags for each paragraph. The passage breakdown must be 3 informational texts and 1 literary text. For EACH of the 4 passages, generate exactly 5 reading comprehension questions. The final output must be a total of 20 questions.`,
    part2: `Generate one GED-style Extended Response (essay) prompt. The prompt must be based on two short, opposing passages that you create. The passages should be 3-4 paragraphs each and formatted with <p> tags. Each of the two passages MUST have its own title. The output should be a JSON object with two keys: "passages" (an array of two objects, each with a "title" and "content") and "prompt" (the essay question).`,
    part3: `Generate the Language and Grammar section of a GED RLA exam. Create 7 short passages (1-2 paragraphs each) formatted with <p> tags. The passages should contain a mix of grammatical errors, awkward phrasing, and organizational issues. For EACH of the 7 passages, generate 3-4 questions focused on correcting sentences, improving word choice, and identifying errors. This should total 25 questions.`
}
},
    "Math": {
        topic: (topic) => `You are a GED Math exam creator. Your single most important task is to ensure all mathematical notation is perfectly formatted for KaTeX. This is a non-negotiable, critical requirement. Failure to format correctly will make the output unusable.
- All fractions MUST be in the format '$\\frac{numerator}{denominator}$'.
- All LaTeX expressions MUST be enclosed in single dollar signs '$'.
- For example, 'five eighths' must be '$'\\frac{5}{8}'$'. 'x squared' must be '$x^2$'. There are no exceptions.

With those rules in mind, generate a 15-question GED-style Math quiz focused on "${topic}".
STRICT CONTENT REQUIREMENTS: The questions must be approximately 45% Quantitative Problems and 55% Algebraic Problems.`,
        comprehensive: `Generate a 46-question comprehensive GED Mathematical Reasoning exam.
        STRICT CONTENT REQUIREMENTS: The quiz must be EXACTLY 45% Quantitative Problems and 55% Algebraic Problems. Include word problems and questions based on data charts.
        IMPORTANT: For all mathematical expressions, including fractions, exponents, and symbols, you MUST format them using KaTeX-compatible LaTeX syntax enclosed in single dollar signs. For example, a fraction like 'five eighths' must be written as '$\\frac{5}{8}$', an exponent like 'x squared' must be '$x^2$', and a division symbol should be '$\\div$' where appropriate. This is a non-negotiable requirement.`
    }
};

app.get('/', (req, res) => {
  res.send('Learning Canvas Backend is running!');
});

// NEW FEATURE: Endpoint to define a word, as used in your index.html
app.post('/define-word', async (req, res) => {
    const { word } = req.body;
    if (!word) {
        return res.status(400).json({ error: 'A word is required.' });
    }

    const apiKey = process.env.GOOGLE_AI_API_KEY;
     if (!apiKey) {
        console.error('API key not configured on the server.');
        return res.status(500).json({ error: 'Server configuration error.' });
    }

    const prompt = `Provide a concise, GED-level definition for the word: "${word}".`;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
    };

    try {
        const response = await axios.post(apiUrl, payload);
        const definition = response.data.candidates[0].content.parts[0].text;
        res.json({ definition });
    } catch (error) {
        console.error('Error calling Google AI API for definition:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to get definition from AI service.' });
    }
});


function cleanupQuizData(quiz) {
    if (!quiz || !Array.isArray(quiz.questions)) {
        console.warn("cleanupQuizData received invalid quiz object or no questions array.");
        return quiz;
    }

    quiz.questions.forEach(q => {
        // Sanitize questionText
        if (typeof q.questionText === 'string') {
            // Replaces invalid \` with '
            q.questionText = q.questionText.replace(/\\`/g, "'");
            // Removes unnecessary backslashes before dollar signs
            q.questionText = q.questionText.replace(/\\\$/g, "$");
        } else {
            // If questionText is not a string, log it and set to a default value
            console.warn("Invalid questionText found, setting to empty string:", q.questionText);
            q.questionText = '';
        }

        // Sanitize answerOptions
        if (Array.isArray(q.answerOptions)) {
            q.answerOptions.forEach(opt => {
                if (typeof opt.text === 'string') {
                    opt.text = opt.text.replace(/\\`/g, "'");
                    opt.text = opt.text.replace(/\\\$/g, "$");
                } else {
                    console.warn("Invalid answer option text found, setting to empty string:", opt.text);
                    opt.text = '';
                }
            });
        } else {
            // If answerOptions is not an array, log and set to empty array
            console.warn("Invalid answerOptions found, setting to empty array:", q.answerOptions);
            q.answerOptions = [];
        }
    });

    return quiz;
}

// Helper function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const singleQuestionSchema = {
    type: "OBJECT",
    properties: {
      type: { type: "STRING" },
      passage: { type: "STRING" },
      chartDescription: { type: "STRING" },
      questionText: { type: "STRING" },
      imageDescriptionForMatch: { type: "STRING" }, // For matching URLs
      answerOptions: { type: "ARRAY", items: { type: "OBJECT", properties: { text: { type: "STRING" }, isCorrect: { type: "BOOLEAN" }, rationale: { type: "STRING" } }, required: ["text", "isCorrect", "rationale"] } }
    },
    required: ["type", "questionText", "answerOptions"]
};

const finalQuestionSchema = {
    type: "OBJECT",
    properties: {
        questionNumber: { type: "NUMBER" },
        type: { type: "STRING" },
        passage: { type: "STRING" },
        imageUrl: { type: "STRING" },
        questionText: { type: "STRING" },
        answerOptions: {
            type: "ARRAY",
            items: {
                type: "OBJECT",
                properties: {
                    text: { type: "STRING" },
                    isCorrect: { type: "BOOLEAN" },
                    rationale: { type: "STRING" }
                },
                required: ["text", "isCorrect", "rationale"]
            }
        }
    },
    required: ["questionNumber", "type", "questionText", "answerOptions"]
};

const quizSchema = {
    type: "OBJECT",
    properties: {
        id: { type: "STRING" },
        title: { type: "STRING" },
        subject: { type: "STRING" },
        questions: {
            type: "ARRAY",
            items: finalQuestionSchema
        }
    },
    required: ["id", "title", "subject", "questions"]
};

const callAI = async (prompt, schema, options = {}) => {
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
        console.error('API key not configured on the server.');
        throw new Error('Server configuration error: GOOGLE_AI_API_KEY is not set.');
    }
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const { parser, onParserMetadata, generationOverrides } = options;
    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
            ...(generationOverrides || {})
        }
    };
    try {
        const response = await axios.post(apiUrl, payload);
        const rawText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (typeof rawText !== 'string') {
            throw new Error('AI response did not include text content.');
        }

        const cleanedText = rawText
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        if (typeof parser === 'function') {
            const parsedResult = parser(cleanedText);
            if (parsedResult && typeof parsedResult === 'object' && Object.prototype.hasOwnProperty.call(parsedResult, 'value')) {
                onParserMetadata?.(parsedResult);
                return parsedResult.value;
            }
            onParserMetadata?.({ stage: 'custom-parser' });
            return parsedResult;
        }

        try {
            return JSON.parse(cleanedText);
        } catch (initialParseError) {
            // Gemini occasionally returns LaTeX-style backslashes (e.g. \frac) without
            // escaping them for JSON, which causes parsing to fail. Try to repair those
            // strings by escaping any single backslashes that aren't part of a valid JSON
            // escape sequence (e.g. \", \\/, \b, \f, \n, \r, \t, or \uXXXX).
            const repairedText = cleanedText.replace(/(?<!\\)\\(?!["\\\/bfnrtu])/g, '\\\\');

            try {
                const parsed = JSON.parse(repairedText);
                console.warn('Successfully repaired AI JSON response after initial parse failure.');
                return parsed;
            } catch (reparseError) {
                const snippet = repairedText.slice(0, 5000);
                console.error('Failed to parse AI JSON response after repair attempt.', {
                    initialError: initialParseError.message,
                    repairError: reparseError.message,
                    snippet,
                });
                throw reparseError;
            }
        }
    } catch (error) {
        console.error('Error calling Google AI API in callAI:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Helper functions for generating different types of quiz content

const generatePassageSet = async (topic, subject, numQuestions) => {
    const prompt = `You are a GED exam creator. Generate a short, GED-style reading passage (150-250 words) on the topic of '${topic}'. The content MUST be strictly related to the subject of '${subject}'.
    Then, based ONLY on the passage, generate ${numQuestions} unique multiple-choice questions. VARY THE QUESTION TYPE: ask about main idea, details, vocabulary, or inferences. The question text MUST NOT repeat the passage.
    Output a single valid JSON object with keys "passage" and "questions".`;

    const questionSchema = {
        type: "OBJECT",
        properties: {
            questionText: { type: "STRING" },
            answerOptions: { type: "ARRAY", items: { type: "OBJECT", properties: { text: { type: "STRING" }, isCorrect: { type: "BOOLEAN" }, rationale: { type: "STRING" } }, required: ["text", "isCorrect", "rationale"] } }
        },
        required: ["questionText", "answerOptions"]
    };

    const schema = {
        type: "OBJECT",
        properties: {
            passage: { type: "STRING" },
            questions: { type: "ARRAY", items: questionSchema }
        },
        required: ["passage", "questions"]
    };

    const result = await callAI(prompt, schema);
    return result.questions.map(q => ({
        ...q,
        passage: result.passage,
        type: 'passage'
    }));
};


const generateImageQuestion = async (topic, subject, imagePool, numQuestions) => {
    // Filter by subject AND the specific topic (category)
    let relevantImages = imagePool.filter(img => img.subject === subject && img.category === topic);
    let selectedImage;

    if (relevantImages.length > 0) {
        selectedImage = relevantImages[Math.floor(Math.random() * relevantImages.length)];
    } else {
        // Fallback to just subject if no images match the specific topic
        const subjectImages = imagePool.filter(img => img.subject === subject);
        if (subjectImages.length === 0) return null; // No images for this subject at all
        selectedImage = subjectImages[Math.floor(Math.random() * subjectImages.length)];
    }

    if (!selectedImage) return null;

    const imagePrompt = `You are a GED exam creator. This stimulus is for an IMAGE from the topic '${topic}'.
Based on the following image context, generate a set of ${numQuestions} unique questions that require visual interpretation, asking about the main idea, symbolism, or specific details.

**Image Context:**
- **Description:** ${selectedImage.detailedDescription}
- **Usage Directives:** ${selectedImage.usageDirectives || 'N/A'}

Output a JSON array of the question objects, each including an 'imagePath' key with the value '${selectedImage.filePath}'.`;

    const imageQuestionSchema = {
        type: "ARRAY",
        items: {
            type: "OBJECT",
            properties: {
                questionText: { type: "STRING" },
                answerOptions: { type: "ARRAY", items: { type: "OBJECT", properties: { text: { type: "STRING" }, isCorrect: { type: "BOOLEAN" }, rationale: { type: "STRING" } }, required: ["text", "isCorrect", "rationale"] } },
                imagePath: { type: "STRING" }
            },
            required: ["questionText", "answerOptions", "imagePath"]
        }
    };

    try {
        const questions = await callAI(imagePrompt, imageQuestionSchema);
        // Map imagePath to imageUrl and add type
        return questions.map(q => ({
            ...q,
            imageUrl: q.imagePath.replace(/^\/frontend/, ''), // Keep this transformation
            type: 'image'
        }));
    } catch (error) {
        console.error(`Error generating image question for topic ${topic}:`, error);
        return null; // Return null or empty array on error to not break Promise.all
    }
};

const generateStandaloneQuestion = async (subject, topic) => {
    let prompt;
    // Conditional prompt based on the subject
    if (subject === 'Math') {
        prompt = `Generate a single, standalone, GED-style math word problem or calculation problem for the topic "${topic}".
        STRICT REQUIREMENT: The question MUST be a math problem that requires mathematical reasoning to solve.
        DO NOT generate a reading passage or a reading comprehension question (e.g., "What is the main idea...").
        IMPORTANT: For all mathematical expressions, including fractions, exponents, and symbols, you MUST format them using KaTeX-compatible LaTeX syntax enclosed in single dollar signs. For example, a fraction like 'five eighths' must be written as '$\\frac{5}{8}$', an exponent like 'x squared' must be '$x^2$', and a division symbol should be '$\\div$' where appropriate.
        Output a single valid JSON object for the question, including "questionText", and "answerOptions" (an array of objects with "text", "isCorrect", and "rationale").`;
    } else {
        prompt = `Generate a single, standalone, GED-style multiple-choice question for the subject "${subject}" on the topic of "${topic}".
        The question should not require any external passage, chart, or image.
        Output a single valid JSON object for the question, including "questionText", and "answerOptions" (an array of objects with "text", "isCorrect", and "rationale").`;
    }

    const schema = {
        type: "OBJECT",
        properties: {
            questionText: { type: "STRING" },
            answerOptions: { type: "ARRAY", items: { type: "OBJECT", properties: { text: { type: "STRING" }, isCorrect: { type: "BOOLEAN" }, rationale: { type: "STRING" } }, required: ["text", "isCorrect", "rationale"] } }
        },
        required: ["questionText", "answerOptions"]
    };

    const question = await callAI(prompt, schema);
    question.type = 'standalone';
    return question;
};

const buildGeometryPrompt = (topic, attempt) => {
    const decimalLimit = DEFAULT_MAX_DECIMALS;
    const sharedConstraints = `Return a single JSON object only.\nAll numeric values must be JSON numbers with at most ${decimalLimit} decimal places (no strings).\nDo not use scientific notation.\nValidate that your JSON is syntactically correct before returning it.`;

    if (!GEOMETRY_FIGURES_ENABLED) {
        const basePrompt = `You are a GED exam creator. Generate a single, unique, GED-style multiple-choice geometry word problem related to "${topic}".
    The problem should clearly rely on a diagram that would normally accompany the question.
    IMPORTANT: Do NOT return any images, SVG markup, or geometry specifications. Instead, append a concise, human-readable description of the required diagram (1–3 sentences) at the end of the question stem. Use plain text or simple Markdown only.
    ${sharedConstraints}

    Output JSON with the exact structure:
    {
      "question": string,
      "choices": [string, string, string, string],
      "answerIndex": number
    }

    • Set "answerIndex" to the zero-based index of the correct choice.
    • Ensure "choices" are unique and relevant to the problem context.
    • Keep all numeric entries as JSON numbers with at most ${decimalLimit} decimal places.
    • Keep the language consistent with GED Geometry expectations.
    • Focus on standard GED geometry figures such as ${SUPPORTED_SHAPES.join(', ')} when relevant to the problem.

    Respond with JSON only—no commentary before or after the object.`;

        if (attempt > 1) {
            return `${basePrompt}\nDouble-check that the diagram description is appended and that no SVG or geometry specification is returned.`;
        }

        return basePrompt;
    }

    const shapesList = SUPPORTED_SHAPES.join(', ');
    const basePrompt = `You are a GED exam creator. Generate a single, unique, GED-style multiple-choice geometry word problem related to "${topic}".
    The problem MUST require a visual diagram to be solved and should stay aligned with GED Geometry expectations.
    IMPORTANT: Format mathematical expressions for the question and choices using KaTeX-compatible LaTeX enclosed in single dollar signs when appropriate (fractions, exponents, radicals, etc.).
    ${sharedConstraints}\nKeep all coordinate values between 0 and 100.

    Output JSON with the exact structure:
    {
      "question": string,
      "choices": [string, string, string, string],
      "choiceRationales": [string, string, string, string],
      "answerIndex": number,
      "geometrySpec": {
        "shape": string,
        "params": object,
        "view": object (optional),
        "style": object (optional)
      }
    }

    • Set "answerIndex" to the zero-based index of the correct choice.
    • Ensure "choices" and "choiceRationales" have the same length and ordering.
    • Use one of the supported shapes: ${shapesList}.
    • Keep all numeric entries as JSON numbers with at most ${decimalLimit} decimal places.

    Geometry spec requirements:
    • For triangle / right_triangle / polygon: provide "points" as an array of objects {"label": "A", "x": 10, "y": 20}.  Include any side length labels with "sideLabels": [{"between": ["A","B"], "text": "12 cm"}].  For right triangles include "rightAngle": {"vertex": "B", "size": 12} referencing one of the labeled points.
    • For rectangle: provide "origin" (top-left point), "width", "height", and optional "labels" [{"text": "5 cm", "x": 50, "y": 10}].
    • For circle: include "center" {"x": 50, "y": 50}, "radius", and optional labeled points in "points".
    • For regular_polygon: specify "center", "radius", "sides", and optional starting angle "startAngle" (degrees).
    • For line_angle: include "vertex", "ray1", and "ray2" points plus optional "angleLabel" and "angleDegrees".
    • For cylinder_net: include numeric "radius" and "height" plus any labels needed for the net.
    • For rect_prism_net: include numeric "length", "width", and "height" and describe labels for key faces.
    • Optional helper data such as "segments", "labels", or "view" may be included for clarity.  Keep the structure deterministic.

    Respond with JSON only—no commentary before or after the object.`;

    if (attempt > 1) {
        return `${basePrompt}\nDouble-check every number for the decimal rule before returning the JSON.`;
    }

    return basePrompt;
};

async function generateGeometryQuestion(topic, subject, attempt = 1) {
    const MAX_ATTEMPTS = 2;
    const prompt = buildGeometryPrompt(topic, attempt);
    const schema = buildGeometrySchema(GEOMETRY_FIGURES_ENABLED);
    const parseMeta = { stage: null, hash: null };
    const recordStage = (stage, details = {}) => {
        parseMeta.stage = stage;
        if (details.hash) {
            parseMeta.hash = details.hash;
        }
    };

    try {
        const callOptions = GEOMETRY_FIGURES_ENABLED
            ? {
                  parser: raw => parseGeometryJson(raw, {
                      maxDecimals: DEFAULT_MAX_DECIMALS,
                      featureEnabled: SANITIZER_FEATURE_ENABLED,
                      onStage: recordStage
                  }),
                  onParserMetadata: meta => {
                      if (meta.stage) {
                          parseMeta.stage = meta.stage;
                      }
                      if (meta.hash) {
                          parseMeta.hash = meta.hash;
                      }
                  },
                  generationOverrides: attempt > 1 ? { temperature: 0.1 } : undefined
              }
            : attempt > 1
                ? { generationOverrides: { temperature: 0.1 } }
                : {};

        const aiResponse = await callAI(prompt, schema, callOptions);

        if (GEOMETRY_FIGURES_ENABLED && parseMeta.stage) {
            console.info(`Geometry JSON parsed via ${parseMeta.stage}. hash=${parseMeta.hash || 'n/a'}`);
        }

        const { question, choices, answerIndex } = aiResponse;
        const choiceRationales = Array.isArray(aiResponse.choiceRationales)
            ? aiResponse.choiceRationales
            : [];
        const geometrySpec = GEOMETRY_FIGURES_ENABLED ? aiResponse.geometrySpec : undefined;

        const answerOptions = (choices || []).map((text, index) => ({
            text,
            isCorrect: index === answerIndex,
            rationale: (choiceRationales && choiceRationales[index]) || ''
        }));

        const questionPayload = {
            type: 'geometry',
            questionText: question,
            answerOptions
        };

        if (GEOMETRY_FIGURES_ENABLED && geometrySpec) {
            questionPayload.geometrySpec = geometrySpec;
        }

        return questionPayload;
    } catch (error) {
        if (error instanceof GeometryJsonError && error.needRegen) {
            console.warn(`Geometry JSON parsing failed at stage ${error.stage}. hash=${error.hash || 'n/a'}`);
            if (attempt < MAX_ATTEMPTS) {
                console.log(`Retrying geometry question generation with strict prompt (attempt ${attempt + 1})...`);
                return generateGeometryQuestion(topic, subject, attempt + 1);
            }
        }

        console.error(`Error generating geometry question on attempt ${attempt}.`, error.message);
        if (error.response && error.response.data) {
            console.error('Geometry generation API error payload (redacted).');
        }

        if (attempt >= MAX_ATTEMPTS) {
            console.error('Max retries reached for geometry question generation. Returning null.');
        }

        return null;
    }
}

async function generateNonCalculatorQuestion() {
    const prompt = `You are a GED Math exam creator specializing in non-calculator questions.
    Generate a single, high-quality question from the "Number Sense & Operations" domain (GED Indicator Q.1 or Q.2).
    The question must be solvable without a calculator, focusing on concepts like number properties, estimation, or basic arithmetic with integers, fractions, and decimals.
    CRITICAL: Do NOT generate a question that requires complex calculations.
    IMPORTANT: For all mathematical expressions, including fractions and exponents, you MUST use KaTeX-compatible LaTeX syntax enclosed in single dollar signs (e.g., '$\\frac{5}{8}$', '$x^2$').
    Output a single valid JSON object for the question.`;
    const schema = {
        type: "OBJECT",
        properties: {
            questionText: { type: "STRING" },
            answerOptions: { type: "ARRAY", items: { type: "OBJECT", properties: { text: { type: "STRING" }, isCorrect: { type: "BOOLEAN" }, rationale: { type: "STRING" } }, required: ["text", "isCorrect", "rationale"] } }
        },
        required: ["questionText", "answerOptions"]
    };
    const question = await callAI(prompt, schema);
    question.type = 'standalone';
    question.calculator = false; // Explicitly mark as non-calculator
    return question;
}

async function generateDataQuestion() {
    const prompt = `You are a GED Math exam creator.
    Generate a single, high-quality, data-based question.
    FIRST, create a simple HTML table with a caption, 2-4 columns, and 3-5 rows of numerical data.
    SECOND, write a question that requires interpreting that table to find the mean, median, mode, or range.
    The question text MUST reference the HTML table.
    IMPORTANT: For all mathematical expressions, use KaTeX-compatible LaTeX syntax enclosed in single dollar signs.
    Output a single valid JSON object containing the 'questionText' (which INCLUDES the HTML table) and 'answerOptions'.`;

    const schema = {
        type: "OBJECT",
        properties: {
            questionText: { type: "STRING" },
            answerOptions: { type: "ARRAY", items: { type: "OBJECT", properties: { text: { type: "STRING" }, isCorrect: { type: "BOOLEAN" }, rationale: { type: "STRING" } }, required: ["text", "isCorrect", "rationale"] } }
        },
        required: ["questionText", "answerOptions"]
    };
    const question = await callAI(prompt, schema);
    question.type = 'standalone'; // The table is part of the question text
    question.calculator = true;
    return question;
}

async function generateGraphingQuestion() {
    const prompt = `You are a GED Math exam creator.
    Generate a single, high-quality, GED-style question about functions or interpreting graphs (GED Indicators A.5, A.6, A.7).
    The question should focus on one of these concepts:
    - Determining the slope of a line from a graph or equation.
    - Understanding and using function notation (e.g., f(x) = 2x + 1, find f(3)).
    - Interpreting a graph to identify relationships between variables, find specific points, or determine intercepts.
    You can optionally reference one of the curated graph images if the context fits.
    IMPORTANT: Use KaTeX-compatible LaTeX for all mathematical notation (e.g., '$f(x)$', '$x^2$').
    Output a single valid JSON object for the question.`;
    const schema = {
        type: "OBJECT",
        properties: {
            questionText: { type: "STRING" },
            answerOptions: { type: "ARRAY", items: { type: "OBJECT", properties: { text: { type: "STRING" }, isCorrect: { type: "BOOLEAN" }, rationale: { type: "STRING" } }, required: ["text", "isCorrect", "rationale"] } }
        },
        required: ["questionText", "answerOptions"]
    };
    const question = await callAI(prompt, schema);
    question.type = 'standalone';
    question.calculator = true;
    return question;
}

async function generateMath_FillInTheBlank() {
    const prompt = `You are a GED Math exam creator. Your single most important task is to ensure all mathematical notation is perfectly formatted for KaTeX.
- All fractions MUST be in the format '$\\frac{numerator}{denominator}$'.
- All LaTeX expressions MUST be enclosed in single dollar signs '$'.

With those rules in mind, generate a single, high-quality, GED-style math question (from any topic area) that requires a single numerical or simple fractional answer (e.g., 25, -10, 5/8).
CRITICAL: The question MUST NOT have multiple-choice options. The answer should be a number that the user would type into a box.
Output a single valid JSON object with three keys:
1. "type": a string with the value "fill-in-the-blank".
2. "questionText": a string containing the full question.
3. "correctAnswer": a NUMBER or STRING containing the exact correct answer.`;

    const schema = {
        type: "OBJECT",
        properties: {
            type: { type: "STRING", enum: ["fill-in-the-blank"] },
            questionText: { type: "STRING" },
            correctAnswer: { type: 'STRING' }
        },
        required: ["type", "questionText", "correctAnswer"]
    };
    const question = await callAI(prompt, schema);
    question.calculator = true; // Most fill-in-the-blank will be calculator-permitted
    return question;
}

async function generateRlaPart1() {
    const prompt = `Generate the Reading Comprehension section of a GED RLA exam. Create exactly 4 long passages, each 4-5 paragraphs long, with a concise, engaging title in <strong> tags. Format passages with <p> tags. The breakdown must be 3 informational texts and 1 literary text. For EACH passage, generate exactly 5 reading comprehension questions. The final output must be a total of 20 questions. Each question should be a JSON object. Return a single JSON array of these 20 question objects.`;
    const schema = { type: "ARRAY", items: singleQuestionSchema };
    const questions = await callAI(prompt, schema);
    // Group questions by passage
    const passages = {};
    let passageCounter = 0;
    let currentPassageTitle = '';
    questions.forEach(q => {
        if (q.passage && q.passage !== currentPassageTitle) {
            currentPassageTitle = q.passage;
            passageCounter++;
        }
        const passageKey = `Passage ${passageCounter}`;
        if (!passages[passageKey]) passages[passageKey] = { passage: q.passage, questions: [] };
        passages[passageKey].questions.push(q);
    });

    let groupedQuestions = [];
    Object.values(passages).forEach(p => {
        p.questions.forEach(q => groupedQuestions.push({ ...q, passage: p.passage, type: 'passage' }));
    });
    return groupedQuestions;
}

async function generateRlaPart2() {
    const prompt = `Generate one GED-style Extended Response (essay) prompt. The prompt must be based on two opposing passages that you create (exactly 3 substantial paragraphs each). Each passage MUST have its own title. Output a JSON object with keys "passages" (an array of two objects, each with "title" and "content") and "prompt" (the essay question).`;
    const schema = {
        type: "OBJECT",
        properties: {
            passages: { type: "ARRAY", items: { type: "OBJECT", properties: { title: { type: "STRING" }, content: { type: "STRING" } } } },
            prompt: { type: "STRING" }
        },
        required: ["passages", "prompt"]
    };
    return await callAI(prompt, schema);
}

async function generateRlaPart3() {
    const prompt = `Generate the Language and Grammar section of a GED RLA exam. Create 7 short passages (1-2 paragraphs each). The passages should contain a mix of grammatical errors and/or awkward phrasing. For EACH of the 7 passages, generate 3-4 questions focused on correcting sentences and improving word choice. This should total 25 questions. Each question should be a JSON object. Return a single JSON array of these 25 question objects.`;
    const schema = { type: "ARRAY", items: singleQuestionSchema };
    const questions = await callAI(prompt, schema);
    // Group questions by passage
    const passages = {};
    let passageCounter = 0;
    let currentPassageTitle = '';
    questions.forEach(q => {
        if (q.passage && q.passage !== currentPassageTitle) {
            currentPassageTitle = q.passage;
            passageCounter++;
        }
        const passageKey = `Passage ${passageCounter}`;
        if (!passages[passageKey]) passages[passageKey] = { passage: q.passage, questions: [] };
        passages[passageKey].questions.push(q);
    });
     let groupedQuestions = [];
    Object.values(passages).forEach(p => {
        p.questions.forEach(q => groupedQuestions.push({ ...q, passage: p.passage, type: 'passage' }));
    });
    return groupedQuestions;
}

async function reviewAndCorrectQuiz(draftQuiz) {
    const prompt = `You are a meticulous GED exam editor. Review the provided JSON for a ${draftQuiz.questions.length}-question ${draftQuiz.subject} exam. Your task is to review and improve it based on these rules:
    1.  **IMPROVE QUESTION VARIETY:** The top priority. If you see repetitive question phrasing, rewrite some questions to ask about specific details, inferences, or data points.
    2.  **ENSURE CLARITY:** Fix any grammatical errors or awkward phrasing.
    3.  **MAINTAIN JSON STRUCTURE:** The final output MUST be a perfectly valid JSON object that strictly adheres to the original schema. Do not change any field names.

    Here is the draft quiz JSON:
    ---
    ${JSON.stringify(draftQuiz, null, 2)}
    ---
    Return the corrected and improved quiz as a single, valid JSON object.`;
        const correctedQuiz = await callAI(prompt, quizSchema);
        return correctedQuiz;
    }

async function reviewAndCorrectMathQuestion(questionObject) {
    const prompt = `You are an expert GED math editor. Review the following JSON question object. Your ONLY job is to fix formatting. **Aggressively correct all KaTeX syntax errors.** For example, FIX \`\\rac{...}\` to \`\\frac{...}\`. Ensure all math expressions are properly enclosed in single dollar signs '$' with correct spacing around them. **Simplify any HTML tables** by removing ALL inline CSS (e.g., \`style="..."\`). Return only the corrected, valid JSON object.

    Faulty JSON:
    ${JSON.stringify(questionObject)}
    `;

    // CORRECTED SCHEMA
    const schema = {
        type: "OBJECT",
        properties: {
            questionText: { type: "STRING" },
            answerOptions: {
                type: "ARRAY",
                items: {
                    type: "OBJECT",
                    properties: {
                        text: { type: "STRING" },
                        isCorrect: { type: "BOOLEAN" },
                        rationale: { type: "STRING" }
                    },
                    required: ["text", "isCorrect", "rationale"]
                }
            },
            questionType: { type: "STRING" }, // Renamed from "type"
            calculator: { type: "BOOLEAN" },
            questionNumber: { type: "NUMBER" },
            imageUrl: { type: "STRING" },
            correctAnswer: { type: "STRING" } // Changed from list to single type
        },
        required: ["questionText"]
    };

    try {
        const correctedQuestion = await callAI(prompt, schema);
        // Preserve original properties that might not be in the schema
        return { ...questionObject, ...correctedQuestion };
    } catch (error) {
        console.error("Error correcting math question, returning original:", error);
        return questionObject; // Return original on failure
    }
}


app.post('/generate-quiz', async (req, res) => {
    const { subject, topic, comprehensive } = req.body;

    if (subject === undefined || comprehensive === undefined) {
        return res.status(400).json({ error: 'Subject and comprehensive flag are required.' });
    }

    if (comprehensive) {
        // --- COMPREHENSIVE EXAM LOGIC ---
        if (subject === 'Social Studies') {
            try {
                const blueprint = {
                    'Civics & Government':    { passages: 3, images: 2, standalone: 3 },
                    'U.S. History':           { passages: 3, images: 2, standalone: 1 },
                    'Economics':              { passages: 3, images: 1, standalone: 0 },
                    'Geography & the World':  { passages: 3, images: 1, standalone: 0 }
                };
                const TOTAL_QUESTIONS = 35;
                let promises = [];

                for (const [category, counts] of Object.entries(blueprint)) {
                    for (let i = 0; i < counts.passages; i++) promises.push(generatePassageSet(category, subject, Math.random() > 0.5 ? 2 : 1));
                    for (let i = 0; i < counts.images; i++) promises.push(generateImageQuestion(category, subject, curatedImages, Math.random() > 0.5 ? 2 : 1));
                    for (let i = 0; i < counts.standalone; i++) promises.push(generateStandaloneQuestion(subject, category));
                }

                const results = await Promise.all(promises);
                let allQuestions = results.flat().filter(q => q);
                // The user wants to remove the shuffle to keep question sets grouped.
                const draftQuestionSet = allQuestions.slice(0, TOTAL_QUESTIONS);
                draftQuestionSet.forEach((q, index) => { q.questionNumber = index + 1; });

                const draftQuiz = {
                    id: `ai_comp_ss_draft_${new Date().getTime()}`,
                    title: `Comprehensive Social Studies Exam`,
                    subject: subject,
                    questions: draftQuestionSet,
                };

                console.log("Social Studies draft complete. Sending for second pass review...");
                const finalQuiz = await reviewAndCorrectQuiz(draftQuiz);
                res.json(finalQuiz);

            } catch (error) {
                console.error('Error generating Social Studies exam:', error);
                res.status(500).json({ error: 'Failed to generate Social Studies exam.' });
            }
        } else if (subject === 'Science') {
            try {
                const blueprint = {
                    'Life Science': { passages: 3, images: 3, standalone: 6 },
                    'Physical Science': { passages: 3, images: 2, standalone: 6 },
                    'Earth & Space Science': { passages: 2, images: 1, standalone: 2 }
                };
                const TOTAL_QUESTIONS = 38;
                let promises = [];

                for (const [category, counts] of Object.entries(blueprint)) {
                    for (let i = 0; i < counts.passages; i++) promises.push(generatePassageSet(category, subject, Math.random() > 0.5 ? 2 : 1));
                    for (let i = 0; i < counts.images; i++) promises.push(generateImageQuestion(category, subject, curatedImages, Math.random() > 0.5 ? 2 : 1));
                    for (let i = 0; i < counts.standalone; i++) promises.push(generateStandaloneQuestion(subject, category));
                }

                const results = await Promise.all(promises);
                let allQuestions = results.flat().filter(q => q);
                const draftQuestionSet = allQuestions.slice(0, TOTAL_QUESTIONS);
                draftQuestionSet.forEach((q, index) => { q.questionNumber = index + 1; });

                const draftQuiz = {
                    id: `ai_comp_sci_draft_${new Date().getTime()}`,
                    title: `Comprehensive Science Exam`,
                    subject: subject,
                    questions: draftQuestionSet,
                };

                console.log("Science draft complete. Sending for second pass review...");
                const finalQuiz = await reviewAndCorrectQuiz(draftQuiz);
                res.json(finalQuiz);

            } catch (error) {
                console.error('Error generating Science exam:', error);
                res.status(500).json({ error: 'Failed to generate Science exam.' });
            }
        } else if (subject === 'Reasoning Through Language Arts (RLA)') {
    try {
        console.log("Generating comprehensive RLA exam...");

        const [part1Questions, part2Essay, part3Questions] = await Promise.all([
            generateRlaPart1(),
            generateRlaPart2(),
            generateRlaPart3()
        ]);

        const allQuestions = [...part1Questions, ...part3Questions];
        allQuestions.forEach((q, index) => {
            q.questionNumber = index + 1;
        });

        const finalQuiz = {
            id: `ai_comp_rla_${new Date().getTime()}`,
            title: `Comprehensive RLA Exam`,
            subject: subject,
            type: 'multi-part-rla', // Special type for the frontend
            totalTime: 150 * 60, // 150 minutes
            part1_reading: part1Questions,
            part2_essay: part2Essay,
            part3_language: part3Questions,
            questions: allQuestions // Keep this for compatibility with results screen
        };

        // RLA does not need a second review pass due to its complex, multi-part nature
        res.json(finalQuiz);

    } catch (error) {
        console.error('Error generating comprehensive RLA exam:', error);
        res.status(500).json({ error: 'Failed to generate RLA exam.' });
    }
} else if (subject === 'Math' && comprehensive) {
    try {
        console.log("Generating comprehensive Math exam with two-part structure...");
        console.log("Request received for comprehensive Math exam."); // Added for debugging

        // Part 1: Non-Calculator (5 questions)
        const part1Promises = Array(5).fill().map(() => generateNonCalculatorQuestion());
        const part1Questions = await Promise.all(part1Promises.map(p => p.catch(e => {
            console.error("A promise in the non-calculator math section failed:", e);
            return null;
        })));

        // Part 2: Calculator-Permitted (41 questions)
        const part2Promises = [];
        // Add 8 Geometry questions
        for (let i = 0; i < 8; i++) part2Promises.push(generateGeometryQuestion('Geometry', 'Math'));
        // Add 4 Fill-in-the-Blank questions
        for (let i = 0; i < 4; i++) part2Promises.push(generateMath_FillInTheBlank());
        // Add 10 Data/Graphing questions
        for (let i = 0; i < 5; i++) part2Promises.push(generateDataQuestion());
        for (let i = 0; i < 5; i++) part2Promises.push(generateGraphingQuestion());
        // Add 15 Standalone Algebra/Quantitative questions
        for (let i = 0; i < 10; i++) part2Promises.push(generateStandaloneQuestion('Math', 'Expressions, Equations, and Inequalities'));
        for (let i = 0; i < 5; i++) part2Promises.push(generateStandaloneQuestion('Math', 'Ratios, Proportions, and Percents'));
        for (let i = 0; i < 4; i++) part2Promises.push(generateMath_FillInTheBlank());

        const part2Results = await Promise.all(part2Promises.map(p => p.catch(e => {
            console.error("A promise in the calculator math section failed:", e);
            return null;
        })));

        let part2Questions = part2Results.flat().filter(q => q);
        // Ensure we have exactly 41 questions for Part 2, even if some promises failed
        while (part2Questions.length < 41) {
            console.log("A question generation failed, adding a fallback question.");
            part2Questions.push(await generateStandaloneQuestion('Math', 'General Problem Solving'));
        }
        part2Questions = part2Questions.slice(0, 41);


        const allQuestions = [...part1Questions, ...part2Questions].filter(q => q);
        allQuestions.forEach((q, index) => {
            q.questionNumber = index + 1;
        });

        // --- NEW: Second Pass Correction for Math ---
        console.log("Applying second-pass correction to all math questions...");
        const correctedPart1 = await Promise.all(part1Questions.filter(q => q).map(q => reviewAndCorrectMathQuestion(q)));
        const correctedPart2 = await Promise.all(part2Questions.map(q => reviewAndCorrectMathQuestion(q)));

        const correctedAllQuestions = [...correctedPart1, ...correctedPart2];

        // --- NEW: Final Server-Side Sanitization ---
        correctedAllQuestions.forEach(q => {
            if (q.questionText) {
                // Fix the most common LaTeX error
                q.questionText = q.questionText.replace(/\\rac/g, '\\frac');
                // Remove any inline CSS from tables to help the frontend
                q.questionText = q.questionText.replace(/style="[^"]*"/g, '');
            }
            if (q.answerOptions) {
                q.answerOptions.forEach(opt => {
                    if (opt.text) {
                        opt.text = opt.text.replace(/\\rac/g, '\\frac');
                    }
                });
            }
        });
        // --- End of Sanitization ---

        correctedAllQuestions.forEach((q, index) => {
            q.questionNumber = index + 1;
        });
        // --- End of Second Pass Correction ---

        const draftQuiz = {
            id: `ai_comp_math_${new Date().getTime()}`,
            title: `Comprehensive Mathematical Reasoning Exam`,
            subject: subject,
            type: 'multi-part-math',
            part1_non_calculator: correctedPart1,
            part2_calculator: correctedPart2,
            questions: correctedAllQuestions
        };

        // Apply cleanup function to the entire assembled quiz object
        const finalQuiz = cleanupQuizData(draftQuiz);

        res.json(finalQuiz);

    } catch (error) {
        console.error('Error generating comprehensive Math exam:', error);
        res.status(500).json({ error: 'Failed to generate Math exam.' });
    }
} else {
            // This handles comprehensive requests for subjects without that logic yet.
            res.status(400).json({ error: `Comprehensive exams for ${subject} are not yet available.` });
        }
} else {
        // --- CORRECTED TOPIC-SPECIFIC "SMITH A QUIZ" LOGIC ---
        try {
            const { subject, topic } = req.body;
            if (!topic) {
                return res.status(400).json({ error: 'Topic is required for non-comprehensive quizzes.' });
            }
            console.log(`Generating topic-specific quiz for Subject: ${subject}, Topic: ${topic}`);

            const TOTAL_QUESTIONS = 15;
            let promises = []; // Single promises array for all logic paths.

            if (subject === 'Math') {
                // --- MATH-SPECIFIC LOGIC ---
                console.log("Generating Math quiz without passages.");
                let visualQuestionCount = 0;
                if (topic.toLowerCase().includes('geometry')) {
                    console.log('Geometry topic detected. Generating 5 visual questions.');
                    visualQuestionCount = 5;
                }
                for (let i = 0; i < visualQuestionCount; i++) {
                    promises.push(generateGeometryQuestion(topic, subject));
                }
                const remainingQuestions = TOTAL_QUESTIONS - visualQuestionCount;
                for (let i = 0; i < remainingQuestions; i++) {
                    promises.push(generateStandaloneQuestion(subject, topic));
                }
            } else {
                // --- LOGIC FOR OTHER SUBJECTS (Social Studies, Science, RLA) ---
                console.log(`Generating ${subject} quiz with passages and other stimuli.`);
                const numPassageSets = 3; // e.g., 3 passages with 2 questions each = 6 questions
                const numImageSets = 2;   // e.g., 2 images with 2 questions each = 4 questions

                for (let i = 0; i < numPassageSets; i++) {
                    promises.push(generatePassageSet(topic, subject, 2));
                }
                for (let i = 0; i < numImageSets; i++) {
                    promises.push(generateImageQuestion(topic, subject, curatedImages, 2));
                }
                 // Fill the rest with standalone questions to ensure we reach the total.
                 const questionsSoFar = (numPassageSets * 2) + (numImageSets * 2);
                 const remainingQuestions = TOTAL_QUESTIONS - questionsSoFar;
                 for (let i = 0; i < remainingQuestions; i++) {
                     promises.push(generateStandaloneQuestion(subject, topic));
                 }
            }

            // --- Execute all promises, assemble, shuffle, and finalize the quiz ---
            const results = await Promise.all(promises);
            let allQuestions = results.flat().filter(q => q); // Filter out any nulls from failed generations

            // Shuffle the collected questions for variety
            const shuffledQuestions = shuffleArray(allQuestions);

            let finalQuestions = shuffledQuestions.slice(0, TOTAL_QUESTIONS);

            // Assign question numbers
            finalQuestions.forEach((q, index) => {
                q.questionNumber = index + 1;
            });

            let draftQuiz = {
                id: `ai_topic_${new Date().getTime()}`,
                title: `${subject}: ${topic}`,
                subject: subject,
                questions: finalQuestions,
            };

            // Apply cleanup function to the entire assembled quiz object
            const finalQuiz = cleanupQuizData(draftQuiz);

            console.log("Quiz generation and post-processing complete.");
            res.json(finalQuiz); // Send the cleaned quiz directly to the user

        } catch (error) {
            // Use topic and subject in the error log if they are available
            const errorMessage = req.body.topic ? `Error generating topic-specific quiz for ${req.body.subject}: ${req.body.topic}` : 'Error generating topic-specific quiz';
            console.error(errorMessage, error);
            res.status(500).json({ error: 'Failed to generate topic-specific quiz.' });
        }
    }
});

app.post('/score-essay', async (req, res) => {
    const { essayText, completion } = req.body; // Get completion data
    if (!essayText) {
        return res.status(400).json({ error: 'Essay text is required.' });
    }

    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
        console.error('API key not configured on the server.');
        return res.status(500).json({ error: 'Server configuration error.' });
    }

    const prompt = `Act as a GED RLA essay evaluator. The student was asked to write a 5-paragraph essay.

        IMPORTANT CONTEXT: The student's level of completion for this draft was ${completion} sections. Factor this completion level into your feedback and scores, especially for Trait 3. An incomplete essay cannot score a 2 on Trait 3.

        Here is the student's essay:
        ---
        ${essayText}
        ---

        Please provide your evaluation in a valid JSON object format with keys "trait1", "trait2", "trait3", "overallScore", and "overallFeedback". For each trait, provide a "score" from 0 to 2 and "feedback" explaining the score. The "overallScore" is the sum of the trait scores. "overallFeedback" should be a summary.`;

    const schema = {
        type: "OBJECT",
        properties: {
            trait1: {
                type: "OBJECT",
                properties: {
                    score: { type: "NUMBER" },
                    feedback: { type: "STRING" }
                }
            },
            trait2: {
                type: "OBJECT",
                properties: {
                    score: { type: "NUMBER" },
                    feedback: { type: "STRING" }
                }
            },
            trait3: {
                type: "OBJECT",
                properties: {
                    score: { type: "NUMBER" },
                    feedback: { type: "STRING" }
                }
            },
            overallScore: { type: "NUMBER" },
            overallFeedback: { type: "STRING" }
        },
        required: ["trait1", "trait2", "trait3", "overallScore", "overallFeedback"]
    };

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
        },
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    try {
        const response = await axios.post(apiUrl, payload);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Google AI API for essay scoring:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to score essay from AI service.' });
    }
});

app.post('/api/auth/google', async (req, res) => {
    try {
        const { credential } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { sub, name, email, picture } = payload;
        const userId = sub;

        // Log the login event
        const logEntry = `[${new Date().toISOString()}] - User Logged In: ${name} (${email})\n`;
        fs.appendFile(path.join(__dirname, 'logins.log'), logEntry, (err) => {
            if (err) {
                console.error('Failed to write to login log:', err);
            }
        });

        // Create a session token
        const token = jwt.sign({ sub: userId, name }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            user: {
                id: userId,
                name,
                email,
                picture,
            },
            token,
        });
    } catch (error) {
        console.error('Google Auth Error:', error);
        res.status(401).json({ error: 'Invalid Google credential.' });
    }
});


const { ALL_QUIZZES } = require('./premade-questions.js');

// Helper function to get random questions from the premade data
const getPremadeQuestions = (subject, count) => {
    const allQuestions = [];
    if (ALL_QUIZZES[subject] && ALL_QUIZZES[subject].categories) {
        Object.values(ALL_QUIZZES[subject].categories).forEach(category => {
            if (category.topics) {
                category.topics.forEach(topic => {
                    if (topic.questions) {
                        allQuestions.push(...topic.questions);
                    }
                });
            }
        });
    }
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

// Helper function to generate AI questions
const generateAIContent = async (prompt, schema) => {
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
        },
    };
    const response = await axios.post(apiUrl, payload);
    const jsonText = response.data.candidates[0].content.parts[0].text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonText);
};



// The '0.0.0.0' is important for containerized environments like Render.
app.listen(port, '0.0.0.0', () => {
  console.log(`Your service is live 🚀`);
  console.log(`Server listening on port ${port}`);
});