const { ALL_QUIZZES } = require('./backend/data/quizzes/index.js');

function auditTopics() {
  console.log('Starting audit of ALL_QUIZZES for missing topics...');
  let missingTopicCount = 0;
  let totalQuestions = 0;

  Object.entries(ALL_QUIZZES).forEach(([subject, subjectData]) => {
    if (!subjectData.categories) return;

    Object.entries(subjectData.categories).forEach(
      ([categoryName, category]) => {
        if (!category || !Array.isArray(category.topics)) return;

        category.topics.forEach((topic) => {
          const topicTitle =
            topic?.title || topic?.topic || topic?.name || categoryName;

          // Check questions directly under topic
          if (Array.isArray(topic.questions)) {
            topic.questions.forEach((q, i) => {
              totalQuestions++;
              const qTopic = q.topic || topicTitle;
              const qQuizTitle = topicTitle || 'Premade Quiz';
              if (!qTopic) {
                console.log(
                  `[MISSING TOPIC] Subject: ${subject}, Category: ${categoryName}, Index: ${i}`
                );
                missingTopicCount++;
              }
              if (i < 1)
                console.log(`Sample: Topic=${qTopic}, Quiz=${qQuizTitle}`);
            });
          }

          // Check quizzes under topic
          const quizzes = Array.isArray(topic.quizzes) ? topic.quizzes : [];
          quizzes.forEach((quiz) => {
            if (!quiz) return;
            const setLabel = quiz.label || quiz.setLabel || null;
            const quizTitle =
              quiz.title ||
              quiz.name ||
              (topicTitle && setLabel
                ? `${topicTitle} (${setLabel})`
                : topicTitle) ||
              'Premade Quiz';

            if (Array.isArray(quiz.questions)) {
              quiz.questions.forEach((q, i) => {
                totalQuestions++;
                const qTopic = q.topic || topicTitle;
                if (!qTopic) {
                  console.log(
                    `[MISSING TOPIC] Subject: ${subject}, Category: ${categoryName}, Quiz: ${quizTitle}, Index: ${i}`
                  );
                  missingTopicCount++;
                }
                if (i < 1)
                  console.log(`Sample: Topic=${qTopic}, Quiz=${quizTitle}`);
              });
            }
          });
        });
      }
    );
  });

  console.log(
    `Audit complete. Total questions: ${totalQuestions}. Missing topics: ${missingTopicCount}`
  );
}

auditTopics();
