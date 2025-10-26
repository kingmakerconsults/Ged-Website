const DEFAULT_MAX_DECIMALS = 3;

const clampDecimals = value => {
  if (!Number.isFinite(value)) return value;
  const threshold = 10 ** DEFAULT_MAX_DECIMALS;
  return Math.round((value + Number.EPSILON) * threshold) / threshold;
};

const roundValue = (value, decimals = DEFAULT_MAX_DECIMALS) => {
  if (value === null || value === undefined || Number.isNaN(value)) return null;
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
};

const formatNumber = (value, decimals = DEFAULT_MAX_DECIMALS) => {
  const rounded = roundValue(value, decimals);
  if (rounded === null) return '—';
  if (!Number.isFinite(rounded)) return rounded > 0 ? '∞' : rounded < 0 ? '-∞' : '∞';
  return Number(rounded).toFixed(Math.min(decimals, DEFAULT_MAX_DECIMALS)).replace(/\.0+$/, '');
};

const distance = (a, b) => {
  if (!a || !b) return null;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.hypot(dx, dy);
};

const slopeBetweenPoints = (a, b) => {
  if (!a || !b) return null;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  if (Math.abs(dx) < 1e-9) return Infinity;
  return dy / dx;
};

const slopeInterceptFromPoints = (a, b) => {
  if (!a || !b) return { slope: null, intercept: null };
  const slope = slopeBetweenPoints(a, b);
  if (!Number.isFinite(slope)) {
    return { slope: Infinity, intercept: null, verticalX: a.x };
  }
  const intercept = a.y - slope * a.x;
  return { slope, intercept, verticalX: null };
};

const xIntercept = ({ slope, intercept, verticalX }) => {
  if (verticalX !== null && verticalX !== undefined) return verticalX;
  if (!Number.isFinite(slope)) return null;
  if (Math.abs(slope) < 1e-9) return null;
  return -intercept / slope;
};

const yIntercept = ({ slope, intercept, verticalX }) => {
  if (verticalX !== null && verticalX !== undefined) return null;
  return intercept;
};

const evaluateLinear = (coeffs, x) => {
  if (coeffs.verticalX !== null && coeffs.verticalX !== undefined) {
    return null;
  }
  return coeffs.slope * x + coeffs.intercept;
};

const evaluateQuadratic = (coeffs, x) => {
  const { a = 1, b = 0, c = 0 } = coeffs;
  return a * x * x + b * x + c;
};

const evaluateAbsolute = (coeffs, x) => {
  const { a = 1, h = 0, k = 0 } = coeffs;
  return a * Math.abs(x - h) + k;
};

const evaluateFunctionAt = (definition, x) => {
  if (!definition) return null;
  switch (definition.subtype) {
    case 'linear':
      return evaluateLinear(definition.coefficients, x);
    case 'quadratic':
      return evaluateQuadratic(definition.coefficients, x);
    case 'absolute':
      return evaluateAbsolute(definition.coefficients, x);
    default:
      return null;
  }
};

const describeFunctionExpression = definition => {
  if (!definition) return 'y = ?';
  switch (definition.subtype) {
    case 'linear': {
      const { m = 1, b = 0 } = definition.coefficients;
      const slopeText = m === 1 ? 'x' : m === -1 ? '-x' : `${formatNumber(m)}x`;
      const interceptText = b === 0 ? '' : b > 0 ? ` + ${formatNumber(b)}` : ` - ${formatNumber(Math.abs(b))}`;
      return `y = ${slopeText}${interceptText}`;
    }
    case 'quadratic': {
      const { a = 1, b = 0, c = 0 } = definition.coefficients;
      const terms = [];
      if (a !== 0) {
        const aText = a === 1 ? '' : a === -1 ? '-' : `${formatNumber(a)}`;
        terms.push(`${aText}x²`);
      }
      if (b !== 0) {
        const sign = b > 0 ? ' + ' : ' - ';
        const bText = Math.abs(b) === 1 ? '' : formatNumber(Math.abs(b));
        terms.push(`${sign}${bText}x`);
      }
      if (c !== 0 || terms.length === 0) {
        const sign = c >= 0 ? (terms.length ? ' + ' : '') : ' - ';
        terms.push(`${sign}${formatNumber(Math.abs(c))}`);
      }
      return `y = ${terms.join('').replace(/^ \+ /, '')}`;
    }
    case 'absolute': {
      const { a = 1, h = 0, k = 0 } = definition.coefficients;
      const aText = a === 1 ? '' : a === -1 ? '-' : `${formatNumber(a)}`;
      const hText = h === 0 ? 'x' : h > 0 ? `(x - ${formatNumber(h)})` : `(x + ${formatNumber(Math.abs(h))})`;
      const kText = k === 0 ? '' : k > 0 ? ` + ${formatNumber(k)}` : ` - ${formatNumber(Math.abs(k))}`;
      return `y = ${aText}|${hText}|${kText}`;
    }
    default:
      return 'y = ?';
  }
};

const computeAbsoluteVertex = coefficients => {
  const { h = 0, k = 0 } = coefficients;
  return { x: h, y: k };
};

const computeQuadraticVertex = coefficients => {
  const { a = 1, b = 0, c = 0 } = coefficients;
  const x = -b / (2 * a);
  const y = evaluateQuadratic(coefficients, x);
  return { x, y };
};

const sampleFunction = (definition, range, samples = 160) => {
  if (!definition || !range) return [];
  const [minX, maxX] = range;
  const step = (maxX - minX) / (samples - 1);
  const points = [];
  for (let i = 0; i < samples; i += 1) {
    const x = minX + step * i;
    const y = evaluateFunctionAt(definition, x);
    if (Number.isFinite(y)) {
      points.push({ x, y });
    }
  }
  return points;
};

const determineTickStep = span => {
  if (!span || !Number.isFinite(span) || span <= 0) return 1;
  const raw = span / 8;
  const power = Math.pow(10, Math.floor(Math.log10(raw)));
  const multiples = [1, 2, 5, 10];
  for (const multiplier of multiples) {
    const candidate = power * multiplier;
    if (candidate >= raw) {
      return candidate;
    }
  }
  return power * 10;
};

const computeLineSummary = definition => {
  if (!definition) return null;
  if (definition.form === 'two-points') {
    const [a, b] = definition.points || [];
    return slopeInterceptFromPoints(a, b);
  }
  if (definition.form === 'standard') {
    const { a = 0, b = 0, c = 0 } = definition;
    if (Math.abs(b) < 1e-9) {
      return { slope: Infinity, intercept: null, verticalX: -c / a };
    }
    const slope = -a / b;
    const intercept = -c / b;
    return { slope, intercept, verticalX: null };
  }
  const { slope = 0, intercept = 0 } = definition;
  return { slope, intercept, verticalX: null };
};

const isAboveComparison = comparison => comparison === '>' || comparison === '>=';

const buildInequalityRegion = comparison => ({
  inclusive: comparison === '>=' || comparison === '<=',
  side: isAboveComparison(comparison) ? 'above' : 'below',
});

const createLineAriaLabel = (coeffs, extras = {}) => {
  if (!coeffs) return 'Line';
  if (Number.isFinite(coeffs.slope)) {
    const slopeText = formatNumber(coeffs.slope);
    const interceptText = formatNumber(coeffs.intercept);
    return `Line with slope ${slopeText} and y-intercept ${interceptText}`;
  }
  return `Vertical line x = ${formatNumber(extras.verticalX ?? coeffs.verticalX)}`;
};

const describeLineExpression = coeffs => {
  if (!coeffs) return 'Line';
  if (coeffs.verticalX !== null && coeffs.verticalX !== undefined) {
    return `x = ${formatNumber(coeffs.verticalX)}`;
  }
  if (Math.abs(coeffs.slope) < 1e-9) {
    return `y = ${formatNumber(coeffs.intercept)}`;
  }
  const slopeText = formatNumber(coeffs.slope);
  const intercept = coeffs.intercept || 0;
  let interceptText = '';
  if (intercept > 0) {
    interceptText = ` + ${formatNumber(intercept)}`;
  } else if (intercept < 0) {
    interceptText = ` - ${formatNumber(Math.abs(intercept))}`;
  }
  return `y = ${slopeText}x${interceptText}`;
};

const prepareGraphObject = (object = {}) => {
  const base = {
    id: object.id || null,
    type: object.type,
    definition: { ...object.definition },
    metadata: {},
    ariaLabel: '',
  };

  switch (object.type) {
    case 'point': {
      const { x = 0, y = 0, label = null } = object.definition || {};
      base.metadata = {
        x,
        y,
        label,
        formatted: `(${formatNumber(x)}, ${formatNumber(y)})`,
      };
      base.ariaLabel = `Point at (${formatNumber(x)}, ${formatNumber(y)})`;
      break;
    }
    case 'line': {
      const summary = computeLineSummary(object.definition);
      base.metadata = {
        ...summary,
        form: object.definition.form || 'slope-intercept',
        through: object.definition.points || null,
        expression: describeLineExpression(summary),
        xIntercept: xIntercept(summary),
        yIntercept: yIntercept(summary),
      };
      base.ariaLabel = createLineAriaLabel(summary, { verticalX: summary.verticalX });
      break;
    }
    case 'inequality': {
      const { comparison = '>', ...rest } = object.definition || {};
      const lineSummary = computeLineSummary(rest);
      const region = buildInequalityRegion(comparison);
      base.metadata = {
        ...lineSummary,
        comparison,
        ...region,
        expression:
          lineSummary.verticalX !== null && lineSummary.verticalX !== undefined
            ? (() => {
                const operatorMap = {
                  '>': '>',
                  '>=': '≥',
                  '<': '<',
                  '<=': '≤',
                };
                const operator = operatorMap[comparison] || comparison;
                return `x ${operator} ${formatNumber(lineSummary.verticalX)}`;
              })()
            : (() => {
                const boundary = describeLineExpression(lineSummary);
                const cleaned = boundary.startsWith('y = ')
                  ? boundary.slice(4)
                  : boundary;
                return `y ${comparison} ${cleaned}`;
              })(),
        xIntercept: xIntercept(lineSummary),
        yIntercept: yIntercept(lineSummary),
      };
      const directionText = region.side === 'above' ? 'above' : 'below';
      base.ariaLabel = `Shaded region ${directionText} the line ${createLineAriaLabel(lineSummary)}`;
      break;
    }
    case 'function': {
      const { subtype = 'linear', coefficients = {} } = object.definition || {};
      let vertex = null;
      if (subtype === 'quadratic') {
        vertex = computeQuadraticVertex(coefficients);
      } else if (subtype === 'absolute') {
        vertex = computeAbsoluteVertex(coefficients);
      }
      base.metadata = {
        subtype,
        coefficients,
        expression: describeFunctionExpression({ subtype, coefficients }),
        vertex,
        direction:
          subtype === 'quadratic'
            ? coefficients.a >= 0
              ? 'opens up'
              : 'opens down'
            : subtype === 'absolute'
            ? coefficients.a >= 0
              ? 'opens up'
              : 'opens down'
            : coefficients.m >= 0
            ? 'increasing'
            : 'decreasing',
      };
      base.ariaLabel = `${subtype.charAt(0).toUpperCase()}${subtype.slice(1)} function ${base.metadata.expression}`;
      break;
    }
    default:
      base.metadata = {};
      base.ariaLabel = 'Graph object';
  }

  return base;
};

const generateLinePoints = (coeffs, bounds) => {
  if (!coeffs || !bounds) return [];
  const { minX, maxX, minY, maxY } = bounds;
  const points = [];

  if (coeffs.verticalX !== null && coeffs.verticalX !== undefined) {
    points.push({ x: coeffs.verticalX, y: minY });
    points.push({ x: coeffs.verticalX, y: maxY });
    return points;
  }

  const candidates = [];
  const yAtMinX = evaluateLinear(coeffs, minX);
  const yAtMaxX = evaluateLinear(coeffs, maxX);
  if (yAtMinX !== null) candidates.push({ x: minX, y: yAtMinX });
  if (yAtMaxX !== null) candidates.push({ x: maxX, y: yAtMaxX });

  if (coeffs.slope !== 0) {
    const xi = xIntercept(coeffs);
    if (xi !== null && xi >= minX && xi <= maxX) {
      candidates.push({ x: xi, y: 0 });
    }
  }
  const yi = yIntercept(coeffs);
  if (yi !== null && yi >= minY && yi <= maxY) {
    candidates.push({ x: 0, y: yi });
  }

  if (candidates.length < 2) {
    const mid = (minX + maxX) / 2;
    const yMid = evaluateLinear(coeffs, mid);
    if (yMid !== null) {
      const delta = (maxX - minX) / 2;
      const y1 = evaluateLinear(coeffs, mid - delta);
      const y2 = evaluateLinear(coeffs, mid + delta);
      if (y1 !== null) candidates.push({ x: mid - delta, y: y1 });
      if (y2 !== null) candidates.push({ x: mid + delta, y: y2 });
    }
  }

  const unique = [];
  const keySet = new Set();
  candidates.forEach(pt => {
    const key = `${roundValue(pt.x, 6)}:${roundValue(pt.y, 6)}`;
    if (!keySet.has(key)) {
      keySet.add(key);
      unique.push(pt);
    }
  });

  if (unique.length < 2) return unique;

  unique.sort((a, b) => a.x - b.x);
  return [unique[0], unique[unique.length - 1]];
};

export {
  DEFAULT_MAX_DECIMALS,
  buildInequalityRegion,
  clampDecimals,
  computeLineSummary,
  computeQuadraticVertex,
  createLineAriaLabel,
  describeLineExpression,
  determineTickStep,
  describeFunctionExpression,
  distance,
  evaluateFunctionAt,
  formatNumber,
  generateLinePoints,
  prepareGraphObject,
  roundValue,
  sampleFunction,
  slopeBetweenPoints,
  slopeInterceptFromPoints,
};
