// PASTE THIS IN BROWSER CONSOLE TO DIAGNOSE QUIZ LOADING ISSUES
// =================================================================

console.log('\n=== QUIZ DATA DIAGNOSTIC ===\n');

// Check if quiz data loaded
const hasAppData = window.AppData && Object.keys(window.AppData).length > 0;
console.log('✓ window.AppData exists:', hasAppData);
if (hasAppData) {
  console.log('  Subjects:', Object.keys(window.AppData).join(', '));
}

// Check catalog
const hasCatalog =
  window.PREMADE_QUIZ_CATALOG &&
  Object.keys(window.PREMADE_QUIZ_CATALOG).length > 0;
console.log('✓ PREMADE_QUIZ_CATALOG exists:', hasCatalog);
if (hasCatalog) {
  Object.entries(window.PREMADE_QUIZ_CATALOG).forEach(([subj, quizzes]) => {
    console.log(
      `  ${subj}: ${Array.isArray(quizzes) ? quizzes.length : 0} quizzes`
    );
  });
}

// Check if hydration function exists
console.log(
  '✓ Hydration function:',
  typeof window.hydratePremadeCatalogFromWindow
);

// Try manual hydration
if (
  hasAppData &&
  typeof window.hydratePremadeCatalogFromWindow === 'function'
) {
  console.log('\n--- Running manual hydration ---');
  window.hydratePremadeCatalogFromWindow();

  // Check catalog after hydration
  if (window.PREMADE_QUIZ_CATALOG) {
    console.log('After hydration:');
    Object.entries(window.PREMADE_QUIZ_CATALOG).forEach(([subj, quizzes]) => {
      console.log(
        `  ${subj}: ${Array.isArray(quizzes) ? quizzes.length : 0} quizzes`
      );
    });
  }
}

// Check sample subject structure
if (hasAppData) {
  const math = window.AppData.Math || window.AppData.math;
  if (math) {
    console.log('\n--- Math structure ---');
    console.log('Categories:', Object.keys(math.categories || {}).join(', '));

    const firstCat = Object.values(math.categories || {})[0];
    if (firstCat) {
      console.log('First category topics:', (firstCat.topics || []).length);
      const firstTopic = (firstCat.topics || [])[0];
      if (firstTopic) {
        console.log(
          'First topic has quizzes:',
          Array.isArray(firstTopic.quizzes),
          firstTopic.quizzes?.length
        );
        console.log(
          'First topic has questions:',
          Array.isArray(firstTopic.questions),
          firstTopic.questions?.length
        );
      }
    }
  }
}

console.log('\n=== END DIAGNOSTIC ===\n');
