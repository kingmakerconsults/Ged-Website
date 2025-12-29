import React, { useState } from 'react';

/**
 * StepByStepSolver - Math problem solver with step-by-step explanations
 * (Currently a UI placeholder; returns example steps.)
 */
export default function StepByStepSolver({
  problemType = 'equation',
  onSolutionFound = null,
}) {
  const [input, setInput] = useState('');
  const [steps, setSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSolve = async () => {
    if (!input.trim()) return;

    setIsLoading(true);

    setTimeout(() => {
      const exampleSteps = [
        { step: 1, description: 'Parse the problem', equation: input },
        {
          step: 2,
          description: 'Identify problem type',
          equation: `Type: ${problemType}`,
        },
        {
          step: 3,
          description: 'Solution steps will appear here',
          equation: 'Implementation pending',
        },
      ];

      setSteps(exampleSteps);
      setIsLoading(false);

      if (onSolutionFound) {
        onSolutionFound(exampleSteps);
      }
    }, 1000);
  };

  const handleClear = () => {
    setInput('');
    setSteps([]);
  };

  return (
    <div className="step-by-step-solver w-full rounded-lg p-6 shadow-lg bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-400">
        📐 Step-by-Step Math Solver
      </h3>

      <div className="input-group mb-6">
        <label
          htmlFor="math-input"
          className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2"
        >
          Enter a problem
        </label>
        <input
          id="math-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSolve()}
          placeholder="e.g., 2x + 5 = 13"
          className="w-full px-4 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white text-slate-900 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Math problem input"
        />
      </div>

      <div className="button-group flex gap-2 mb-6">
        <button
          onClick={handleSolve}
          disabled={!input.trim() || isLoading}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded font-medium transition-colors"
        >
          {isLoading ? 'Solving...' : 'Solve'}
        </button>
        <button
          onClick={handleClear}
          disabled={!input && steps.length === 0}
          className="px-6 py-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500 text-slate-900 dark:text-slate-100 rounded font-medium transition-colors"
        >
          Clear
        </button>
      </div>

      {steps.length > 0 && (
        <div className="solution-steps space-y-3">
          <h4 className="font-semibold text-lg text-slate-900 dark:text-slate-100 mb-3">
            Solution Steps:
          </h4>
          {steps.map((step) => (
            <div
              key={step.step}
              className="step-card p-4 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
            >
              <div className="step-header flex items-center gap-2 mb-2">
                <span className="step-number inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold">
                  {step.step}
                </span>
                <span className="step-description font-medium text-slate-800 dark:text-slate-200">
                  {step.description}
                </span>
              </div>
              <div className="step-equation font-mono text-base text-slate-700 dark:text-slate-300 ml-10">
                {step.equation}
              </div>
            </div>
          ))}
        </div>
      )}

      {steps.length === 0 && !isLoading && (
        <div className="empty-state text-center py-8 text-slate-500 dark:text-slate-400">
          <p className="text-lg">
            Enter a math problem above to see step-by-step solutions
          </p>
          <p className="text-sm mt-2">
            Supports equations, inequalities, and more
          </p>
        </div>
      )}
    </div>
  );
}
