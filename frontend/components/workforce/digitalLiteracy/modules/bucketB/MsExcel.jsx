/**
 * MsExcel.jsx â€” Northstar B2 flagship.
 * Custom mini spreadsheet with REAL formula evaluation.
 *
 * Tasks:
 *   1. Total weekly sales with =SUM
 *   2. Compute average with =AVERAGE
 *   3. Use =IF to label rows "Over" / "Under" budget
 *   4. Optional: change a sort or apply a basic filter (scripted)
 */
import React, { useMemo, useState } from 'react';
import { WindowFrame } from '../../_engine/Frame.jsx';
import { evaluateAll, indexToCol } from './formulaEngine.js';

const ROWS = 7;
const COLS = 4; // A..D

const HEADERS = ['Day', 'Sales', 'Goal', 'Status'];
const SEED = {
  A1: 'Day',
  B1: 'Sales',
  C1: 'Goal',
  D1: 'Status',
  A2: 'Mon',
  B2: '420',
  C2: '500',
  A3: 'Tue',
  B3: '530',
  C3: '500',
  A4: 'Wed',
  B4: '610',
  C4: '500',
  A5: 'Thu',
  B5: '480',
  C5: '500',
  A6: 'Fri',
  B6: '720',
  C6: '500',
  A7: 'Total', // user fills B7 with =SUM(B2:B6)
};

function Sim({ onComplete }) {
  const [cells, setCells] = useState(SEED);
  const [active, setActive] = useState('B7');
  const [tasksDone, setTasksDone] = useState({
    sum: false,
    avg: false,
    ifc: false,
  });

  const evaluated = useMemo(() => evaluateAll(cells), [cells]);

  // Auto-grade tasks each render
  React.useEffect(() => {
    const next = { ...tasksDone };
    if (
      typeof cells.B7 === 'string' &&
      /=SUM\(B2:B6\)/i.test(cells.B7) &&
      evaluated.B7 === 2760
    ) {
      next.sum = true;
    }
    // Average should land in any cell, accept C8 by convention
    const avgCell = Object.entries(cells).find(
      ([, v]) => typeof v === 'string' && /=AVERAGE\(B2:B6\)/i.test(v)
    );
    if (avgCell && evaluated[avgCell[0]] === 552) {
      next.avg = true;
    }
    // IF status: D2..D6 should reflect IF(B>=C,"Over","Under")
    const ifGood = ['D2', 'D3', 'D4', 'D5', 'D6'].every((k) => {
      const f = cells[k];
      if (typeof f !== 'string' || !/^=IF\(/i.test(f)) return false;
      const expected =
        parseFloat(cells['B' + k.slice(1)]) >=
        parseFloat(cells['C' + k.slice(1)])
          ? 'Over'
          : 'Under';
      return evaluated[k] === expected;
    });
    if (ifGood) next.ifc = true;
    if (
      next.sum !== tasksDone.sum ||
      next.avg !== tasksDone.avg ||
      next.ifc !== tasksDone.ifc
    ) {
      setTasksDone(next);
    }
    if (
      next.sum &&
      next.avg &&
      next.ifc &&
      !(tasksDone.sum && tasksDone.avg && tasksDone.ifc)
    ) {
      onComplete(100);
    }
  }, [cells, evaluated, tasksDone, onComplete]);

  function setCell(key, val) {
    setCells((c) => ({ ...c, [key]: val }));
  }

  function fillSampleIf() {
    setCells((c) => {
      const n = { ...c };
      ['D2', 'D3', 'D4', 'D5', 'D6'].forEach((k) => {
        const r = k.slice(1);
        n[k] = `=IF(B${r}>=C${r},"Over","Under")`;
      });
      return n;
    });
  }

  return (
    <div className="space-y-4">
      <WindowFrame title="Sales.xlsx â€” Excel">
        <div className="p-2 text-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">
              {active}
            </span>
            <input
              type="text"
              value={cells[active] ?? ''}
              onChange={(e) => setCell(active, e.target.value)}
              className="flex-1 font-mono px-2 py-1 rounded border border-slate-300 dark:border-slate-600"
              placeholder="Type a value or =FORMULA"
              spellCheck="false"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="border-collapse">
              <thead>
                <tr>
                  <th className="w-8" />
                  {Array.from({ length: COLS }).map((_, c) => (
                    <th
                      key={c}
                      className="border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px]"
                    >
                      {indexToCol(c)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: ROWS + 1 }).map((_, r) => (
                  <tr key={r}>
                    <td className="border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 px-1 text-[10px] text-center">
                      {r + 1}
                    </td>
                    {Array.from({ length: COLS }).map((_, c) => {
                      const key = `${indexToCol(c)}${r + 1}`;
                      const isActive = active === key;
                      return (
                        <td
                          key={c}
                          onClick={() => setActive(key)}
                          className={`border border-slate-300 dark:border-slate-600 px-2 py-0.5 min-w-[64px] cursor-cell ${
                            isActive
                              ? 'outline outline-teal-600 outline-offset-[-2px]'
                              : ''
                          }`}
                        >
                          {String(evaluated[key] ?? '')}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </WindowFrame>

      <div className="text-xs space-y-1 p-2 rounded bg-slate-50 dark:bg-slate-800">
        <div className="font-semibold mb-1">Tasks</div>
        <div className={tasksDone.sum ? 'text-green-600' : ''}>
          {tasksDone.sum ? 'âœ“' : 'â—‹'} <strong>B7:</strong> Total weekly sales â€”
          type
          <code className="bg-slate-200 dark:bg-slate-700 px-1 ml-1">
            =SUM(B2:B6)
          </code>
        </div>
        <div className={tasksDone.avg ? 'text-green-600' : ''}>
          {tasksDone.avg ? 'âœ“' : 'â—‹'} <strong>Any cell:</strong> Average daily
          sales â€”
          <code className="bg-slate-200 dark:bg-slate-700 px-1 ml-1">
            =AVERAGE(B2:B6)
          </code>
        </div>
        <div className={tasksDone.ifc ? 'text-green-600' : ''}>
          {tasksDone.ifc ? 'âœ“' : 'â—‹'} <strong>D2:D6:</strong> Show "Over" if
          Sales â‰¥ Goal, else "Under" â€” using
          <code className="bg-slate-200 dark:bg-slate-700 px-1 ml-1">
            =IF(B2&gt;=C2,"Over","Under")
          </code>{' '}
          <button
            type="button"
            onClick={fillSampleIf}
            className="ml-2 underline text-teal-700 dark:text-teal-300"
          >
            (auto-fill if stuck)
          </button>
        </div>
      </div>
    </div>
  );
}

export const MODULE = {
  id: 'b2_ms_excel',
  title: 'Microsoft Excel',
  standardId: 'NDL-B2',
  standardLabel: 'Northstar â€” Microsoft Excel',
  bucket: 'B',
  intro:
    'Excel is the worldâ€™s most-used spreadsheet. Practice navigating cells, writing real formulas (SUM, AVERAGE, IF), and using absolute and relative references â€” all live, in a working mini spreadsheet.',
  learningGoals: [
    'Enter values and basic formulas',
    'Use SUM, AVERAGE, and IF',
    'Understand relative vs absolute cell references',
  ],
  simComponent: Sim,
  quiz: [
    {
      q: 'Which formula totals A1 through A10?',
      choices: ['=A1+A10', '=TOTAL(A1:A10)', '=SUM(A1:A10)', '=ADD(A1,A10)'],
      correct: 2,
      rationale: 'SUM with a range adds every value.',
    },
    {
      q: 'You drag a formula =A1*2 down one row. It becomesâ€¦',
      choices: ['=A1*2', '=A2*2', '=$A$1*2', '#ERROR'],
      correct: 1,
      rationale: 'Relative references shift by the same number of rows.',
    },
    {
      q: 'To prevent A1 from changing when copied, useâ€¦',
      choices: ['A1', '$A1', 'A$1', '$A$1'],
      correct: 3,
      rationale: '$A$1 is fully absolute (column AND row locked).',
    },
    {
      q: 'IF function syntax is:',
      choices: [
        '=IF(condition, value_if_true, value_if_false)',
        '=IF(value_if_true, condition, value_if_false)',
        '=IF(condition; value)',
        '=WHEN(condition, value_if_true)',
      ],
      correct: 0,
      rationale: 'Excel IF has three arguments separated by commas.',
    },
    {
      q: 'AVERAGE of A1..A4 (which contain 10, 20, 30, 40) is:',
      choices: ['100', '25', '20', '10'],
      correct: 1,
      rationale: '(10+20+30+40)/4 = 25.',
    },
  ],
};

export default function MsExcel() {
  return null;
}
