function fixStr(value) {
    if (typeof value !== 'string') {
        return value;
    }

    return value
        .replace(/\\\$/g, '$')
        .replace(/\\`/g, '`')
        .replace(/\$\$(?=\d)/g, (match, offset, original) => {
            if (typeof original !== 'string') {
                return match;
            }

            const closingIndex = original.indexOf('$$', offset + 2);
            if (closingIndex === -1) {
                return '$';
            }

            return match;
        })
        .replace(/\\([A-Za-z]{2,})/g, '\\$1');
}

function cleanupQuizData(quiz) {
    if (!quiz || !Array.isArray(quiz.questions)) {
        console.warn('cleanupQuizData received invalid quiz object or no questions array.');
        return quiz;
    }

    quiz.questions.forEach(q => {
        if (typeof q.questionText === 'string') {
            q.questionText = fixStr(q.questionText);
        } else {
            console.warn('Invalid questionText encountered, substituting empty string.', {
                questionNumber: q.questionNumber
            });
            q.questionText = '';
        }

        if (typeof q.rationale === 'string') {
            q.rationale = fixStr(q.rationale);
        }

        if (Array.isArray(q.answerOptions)) {
            const originalOptions = q.answerOptions.map(opt => (
                opt && typeof opt === 'object' ? { ...opt } : opt
            ));
            const sanitizedOptions = [];
            let sanitizeFailed = false;

            q.answerOptions.forEach((opt, index) => {
                if (!opt || typeof opt !== 'object') {
                    sanitizeFailed = true;
                    return;
                }

                const sanitizedText = typeof opt.text === 'string' ? fixStr(opt.text) : opt.text;
                const sanitizedRationale = typeof opt.rationale === 'string' ? fixStr(opt.rationale) : opt.rationale;

                if (typeof sanitizedText !== 'string' || typeof sanitizedRationale !== 'string') {
                    sanitizeFailed = true;
                }

                sanitizedOptions.push({
                    ...opt,
                    text: typeof sanitizedText === 'string' ? sanitizedText : '',
                    rationale: typeof sanitizedRationale === 'string' ? sanitizedRationale : ''
                });
            });

            if (!sanitizeFailed && sanitizedOptions.length === q.answerOptions.length) {
                q.answerOptions = sanitizedOptions;
            } else {
                const preview = Array.isArray(originalOptions) && originalOptions.length
                    ? JSON.stringify(originalOptions[0]).slice(0, 200)
                    : undefined;
                console.warn('sanitizeOptionsFailed', {
                    questionNumber: q.questionNumber,
                    preview
                });
                q.answerOptions = Array.isArray(originalOptions) ? originalOptions : [];
            }
        } else {
            console.warn('Invalid answerOptions found, setting to empty array.', {
                questionNumber: q.questionNumber
            });
            q.answerOptions = [];
        }
    });

    return quiz;
}

module.exports = {
    fixStr,
    cleanupQuizData,
};
