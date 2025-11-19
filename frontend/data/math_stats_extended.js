// frontend/data/math_stats_extended.js
// Programmatically generate extensive Central Tendency (Mean, Median, Mode, Range) problems.
(function generateExtendedStatsProblems() {
  if (typeof window === 'undefined') return;
  const extended = [];

  function gcd(a, b) {
    while (b) {
      [a, b] = [b, a % b];
    }
    return a;
  }

  // Mean problems: generate sets of various lengths with integer or decimal means.
  let meanId = 7000;
  for (let count = 3; count <= 8; count++) {
    for (let targetMean = 10; targetMean <= 50; targetMean += 5) {
      const dataSet = [];
      const total = targetMean * count;
      // Distribute total across count values with some variance.
      let remaining = total;
      for (let i = 0; i < count - 1; i++) {
        const val = Math.max(
          1,
          Math.floor(targetMean * (0.7 + Math.random() * 0.6))
        );
        dataSet.push(val);
        remaining -= val;
      }
      dataSet.push(Math.max(1, remaining));
      dataSet.sort((a, b) => a - b);
      const actualMean = dataSet.reduce((s, v) => s + v, 0) / dataSet.length;
      const id = 'mean_ext_' + meanId++;
      extended.push({
        id,
        type: 'mean',
        prompt: 'Find the mean (average) of the data set.',
        dataSet,
        questionText: `What is the mean of ${dataSet.join(', ')}?`,
        correctAnswer: parseFloat(actualMean.toFixed(2)),
        tolerance: 0.01,
        steps: [
          `Add the numbers: ${dataSet.join(' + ')} = ${dataSet.reduce(
            (s, v) => s + v,
            0
          )}.`,
          `Count how many numbers: ${dataSet.length}.`,
          `Divide: ${dataSet.reduce((s, v) => s + v, 0)} ÷ ${
            dataSet.length
          } = ${actualMean.toFixed(2)}.`,
        ],
      });
    }
  }

  // Median problems: odd and even length datasets.
  let medianId = 8000;
  for (let count = 5; count <= 15; count++) {
    const dataSet = [];
    for (let i = 0; i < count; i++) {
      dataSet.push(Math.floor(Math.random() * 40) + 5);
    }
    dataSet.sort((a, b) => a - b);
    let medianVal;
    if (count % 2 === 1) {
      medianVal = dataSet[Math.floor(count / 2)];
    } else {
      const mid1 = dataSet[count / 2 - 1];
      const mid2 = dataSet[count / 2];
      medianVal = (mid1 + mid2) / 2;
    }
    const id = 'median_ext_' + medianId++;
    const steps =
      count % 2 === 1
        ? [
            `Order data (already sorted).`,
            `Odd count (${count} numbers), middle is position ${
              Math.floor(count / 2) + 1
            }.`,
            `Median = ${medianVal}.`,
          ]
        : [
            `Order data (already sorted).`,
            `Even count (${count} numbers), average middle two.`,
            `Middle: ${dataSet[count / 2 - 1]} and ${dataSet[count / 2]}.`,
            `Median = (${dataSet[count / 2 - 1]} + ${
              dataSet[count / 2]
            }) ÷ 2 = ${medianVal}.`,
          ];
    extended.push({
      id,
      type: 'median',
      prompt: 'Find the median of the data set.',
      dataSet,
      questionText: `What is the median of ${dataSet.join(', ')}?`,
      correctAnswer: parseFloat(medianVal.toFixed(2)),
      tolerance: 0.01,
      steps,
    });
  }

  // Mode problems: datasets with clear modes, bimodal, or no mode.
  let modeId = 9000;
  for (let trial = 0; trial < 30; trial++) {
    const dataSet = [];
    const modeVal = Math.floor(Math.random() * 20) + 10;
    const modeCount = 3 + Math.floor(Math.random() * 2); // 3 or 4 times
    for (let i = 0; i < modeCount; i++) dataSet.push(modeVal);
    for (let i = 0; i < 5; i++) {
      let val;
      do {
        val = Math.floor(Math.random() * 30) + 5;
      } while (val === modeVal);
      dataSet.push(val);
    }
    dataSet.sort((a, b) => a - b);
    const id = 'mode_ext_' + modeId++;
    extended.push({
      id,
      type: 'mode',
      prompt: 'Find the mode of the data set.',
      dataSet,
      questionText: `What is the mode of ${dataSet.join(', ')}?`,
      correctAnswer: modeVal,
      tolerance: 0.01,
      steps: [
        `Count frequency of each number.`,
        `${modeVal} appears ${modeCount} times (most frequent).`,
        `Mode = ${modeVal}.`,
      ],
    });
  }

  // Range problems: varied spreads.
  let rangeId = 10000;
  for (let minVal = 5; minVal <= 20; minVal += 3) {
    for (let spread = 10; spread <= 40; spread += 10) {
      const maxVal = minVal + spread;
      const dataSet = [minVal];
      for (let i = 0; i < 4; i++) {
        dataSet.push(minVal + Math.floor(Math.random() * spread));
      }
      dataSet.push(maxVal);
      dataSet.sort((a, b) => a - b);
      const rangeVal = maxVal - minVal;
      const id = 'range_ext_' + rangeId++;
      extended.push({
        id,
        type: 'range',
        prompt: 'Find the range of the data set.',
        dataSet,
        questionText: `What is the range of ${dataSet.join(', ')}?`,
        correctAnswer: rangeVal,
        tolerance: 0.01,
        steps: [
          `Identify smallest (${minVal}) and largest (${maxVal}).`,
          `Subtract: ${maxVal} − ${minVal} = ${rangeVal}.`,
          `Range = ${rangeVal}.`,
        ],
      });
    }
  }

  // Merge into global
  if (!Array.isArray(window.MATH_STATS_PROBLEMS))
    window.MATH_STATS_PROBLEMS = [];
  window.MATH_STATS_PROBLEMS = window.MATH_STATS_PROBLEMS.concat(extended);
  console.info('[stats] Extended problems added:', extended.length);
})();
