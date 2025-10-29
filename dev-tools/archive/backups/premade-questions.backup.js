// Archived copy of backend/data/quizzes/premade-questions.js
// Purpose: Avoid confusion with the legacy source at backend/data/premade-questions.js.
// Note: The server and dynamic loader do NOT import this file. Keep for reference only.

const SCIENTIFIC_NUMERACY_QUESTIONS = [
    {
        questionNumber: 1,
        qaProfileKey: "numeracy",
        type: "knowledge",
        passage: "<p>A botanist measures the height (in cm) of five plants: 15, 18, 15, 22, and 20.</p>",
        question: "What is the <strong>mean (average)</strong> height of the plants?",
        answerOptions: [
            { text: "15 cm", rationale: "15 is the mode (most common), not the mean.", isCorrect: false },
            { text: "18 cm", rationale: "Correct. (15+18+15+22+20)=90; 90÷5=18.", isCorrect: true },
            { text: "18.5 cm", rationale: "Close, but not the exact average.", isCorrect: false },
            { text: "22 cm", rationale: "22 is just the tallest plant.", isCorrect: false }
        ]
    },
    // ... content truncated; identical to original for archival purposes ...
];

const ALL_QUIZZES = {
    "Science": {
        icon: "BeakerIcon",
        categories: {
            "Life Science": {
                description: "Explore the fundamental principles of living organisms, from the cellular level to entire ecosystems.",
                topics: [
                    {
                        id: "sci_life_science_basics",
                        title: "Life Science Basics",
                        description: "Cell structure, function, photosynthesis, and cellular respiration.",
                        config: {
                            totalTime: 25 * 60,
                            calculator: true,
                            formulaSheet: false,
                            parts: [{ name: "Quiz", questionCount: 12 }]
                        },
                        questions: []
                    }
                ]
            }
        }
    }
    // ... rest of archive omitted ...
};

module.exports = { ALL_QUIZZES };
