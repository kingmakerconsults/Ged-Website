const fs = require('fs');
const path = require('path');

const metadata = require('./metadata.json');

function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
}

function loadQuestionModule(ref) {
    if (!ref) {
        return [];
    }
    const modulePath = path.join(__dirname, `${ref}.js`);
    if (!fs.existsSync(modulePath)) {
        throw new Error(`Missing quiz module: ${modulePath}`);
    }
    const data = require(modulePath);
    if (Array.isArray(data)) {
        return data;
    }
    if (data && Array.isArray(data.default)) {
        return data.default;
    }
    throw new Error(`Invalid quiz module export at ${modulePath}`);
}

function attachQuestions(node) {
    if (!node || typeof node !== 'object') {
        return node;
    }
    const clone = deepClone(node);
    if (Array.isArray(clone.topics)) {
        clone.topics = clone.topics.map((topic) => {
            const topicClone = deepClone(topic);
            if (topicClone.questionModuleRef) {
                topicClone.questions = loadQuestionModule(topicClone.questionModuleRef);
                delete topicClone.questionModuleRef;
            }
            if (Array.isArray(topicClone.quizzes)) {
                topicClone.quizzes = topicClone.quizzes.map((quiz) => {
                    const quizClone = deepClone(quiz);
                    if (quizClone.questionModuleRef) {
                        quizClone.questions = loadQuestionModule(quizClone.questionModuleRef);
                        delete quizClone.questionModuleRef;
                    }
                    return quizClone;
                });
            }
            return topicClone;
        });
    }
    return clone;
}

function buildDataset(metaRoot) {
    const output = {};
    for (const [subjectName, subjectMeta] of Object.entries(metaRoot || {})) {
        const subjectClone = deepClone(subjectMeta);
        if (subjectClone.categories) {
            const categories = {};
            for (const [categoryName, categoryMeta] of Object.entries(subjectClone.categories)) {
                categories[categoryName] = attachQuestions(categoryMeta);
            }
            subjectClone.categories = categories;
        }
        output[subjectName] = subjectClone;
    }
    return output;
}

function buildAppData() {
    return buildDataset(metadata.app);
}

function buildExpandedQuizData() {
    return buildDataset(metadata.expanded);
}

function getQuizModulePath(quizId) {
    const search = (metaRoot) => {
        for (const subjectMeta of Object.values(metaRoot || {})) {
            for (const categoryMeta of Object.values(subjectMeta.categories || {})) {
                for (const topicMeta of categoryMeta.topics || []) {
                    if (topicMeta.questionModuleRef && topicMeta.id === quizId) {
                        return topicMeta.questionModuleRef;
                    }
                    for (const quizMeta of topicMeta.quizzes || []) {
                        const currentId = quizMeta.quizId || quizMeta.id;
                        if (currentId === quizId) {
                            return quizMeta.questionModuleRef || topicMeta.questionModuleRef || null;
                        }
                    }
                }
            }
        }
        return null;
    };
    return search(metadata.app) || search(metadata.expanded);
}

function loadQuestionsByQuizId(quizId) {
    const ref = getQuizModulePath(quizId);
    return ref ? loadQuestionModule(ref) : [];
}

module.exports = {
    metadata,
    buildAppData,
    buildExpandedQuizData,
    loadQuestionsByQuizId,
    loadQuestionModule,
};
