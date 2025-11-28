import React from 'react';

const MATH_FORMULAS = [
  {
    name: 'Pythagorean Theorem',
    formula: 'a^2 + b^2 = c^2',
    description: 'In a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides',
  },
  {
    name: 'Slope',
    formula: 'm = (y_2 - y_1) / (x_2 - x_1)',
    description: 'The slope of a line through two points',
  },
  {
    name: 'Distance Formula',
    formula: 'd = √[(x_2-x_1)² + (y_2-y_1)²]',
    description: 'Distance between two points in a coordinate plane',
  },
  {
    name: 'Quadratic Formula',
    formula: 'x = [-b ± √(b²-4ac)] / 2a',
    description: 'Solutions to ax² + bx + c = 0',
  },
  {
    name: 'Area of Rectangle',
    formula: 'A = l × w',
    description: 'Length times width',
  },
  {
    name: 'Area of Circle',
    formula: 'A = πr²',
    description: 'Pi times radius squared',
  },
  {
    name: 'Volume of Cylinder',
    formula: 'V = πr²h',
    description: 'Pi times radius squared times height',
  },
  {
    name: 'Mean (Average)',
    formula: 'x̄ = Σx / n',
    description: 'Sum of all values divided by count',
  },
];

export function FormulaSheetModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-blue-600 dark:bg-blue-700 text-white px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h2 className="text-2xl font-bold">📐 Math Formula Sheet</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl font-bold"
            aria-label="Close formula sheet"
          >
            ×
          </button>
        </div>
        <div className="p-6 space-y-4">
          {MATH_FORMULAS.map((item, idx) => (
            <div
              key={idx}
              className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg"
            >
              <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2">
                {item.name}
              </h3>
              <div className="text-xl font-mono text-slate-900 dark:text-slate-100 mb-2">
                {item.formula}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FormulaSheetModal;
