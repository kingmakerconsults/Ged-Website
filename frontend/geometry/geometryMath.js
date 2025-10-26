const DEFAULT_MAX_DECIMALS = 2;

const roundValue = (value, maxDecimals = DEFAULT_MAX_DECIMALS) => {
  if (!Number.isFinite(value)) return value;
  const factor = Math.pow(10, maxDecimals);
  return Math.round(value * factor) / factor;
};

const toRadians = degrees => (degrees * Math.PI) / 180;
const toDegrees = radians => (radians * 180) / Math.PI;

const distance = (a, b) => {
  return Math.hypot(b.x - a.x, b.y - a.y);
};

const midpoint = (a, b) => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
});

const polygonPerimeter = points => {
  if (!points || points.length < 2) return 0;
  let perim = 0;
  for (let i = 0; i < points.length; i++) {
    const current = points[i];
    const next = points[(i + 1) % points.length];
    perim += distance(current, next);
  }
  return perim;
};

const polygonArea = points => {
  if (!points || points.length < 3) return 0;
  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const current = points[i];
    const next = points[(i + 1) % points.length];
    area += current.x * next.y - next.x * current.y;
  }
  return Math.abs(area) / 2;
};

const triangleArea = points => {
  if (!points || points.length < 3) return 0;
  return polygonArea(points.slice(0, 3));
};

const circleArea = radius => Math.PI * radius * radius;
const circleCircumference = radius => 2 * Math.PI * radius;

const angle = (a, vertex, c) => {
  const v1x = a.x - vertex.x;
  const v1y = a.y - vertex.y;
  const v2x = c.x - vertex.x;
  const v2y = c.y - vertex.y;

  const dot = v1x * v2x + v1y * v2y;
  const mag1 = Math.hypot(v1x, v1y);
  const mag2 = Math.hypot(v2x, v2y);
  if (mag1 === 0 || mag2 === 0) return 0;
  const cos = Math.min(1, Math.max(-1, dot / (mag1 * mag2)));
  return toDegrees(Math.acos(cos));
};

const formatNumber = (value, decimals = DEFAULT_MAX_DECIMALS) => {
  if (!Number.isFinite(value)) return String(value);
  return roundValue(value, decimals).toFixed(decimals);
};

const labelForIndex = index => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const quotient = Math.floor(index / alphabet.length);
  const remainder = index % alphabet.length;
  return alphabet[remainder] + (quotient > 0 ? `${quotient}` : '');
};

const assignLabels = points => {
  return points.map((pt, index) => ({
    ...pt,
    label: pt.label || labelForIndex(index),
  }));
};

const computeTriangleMetrics = points => {
  const labelled = assignLabels(points);
  const [a, b, c] = labelled;
  const sideAB = distance(a, b);
  const sideBC = distance(b, c);
  const sideCA = distance(c, a);
  return {
    sides: {
      [`${a.label}${b.label}`]: roundValue(sideAB),
      [`${b.label}${c.label}`]: roundValue(sideBC),
      [`${c.label}${a.label}`]: roundValue(sideCA),
    },
    angles: {
      [`∠${a.label}${b.label}${c.label}`]: roundValue(angle(a, b, c)),
      [`∠${b.label}${c.label}${a.label}`]: roundValue(angle(b, c, a)),
      [`∠${c.label}${a.label}${b.label}`]: roundValue(angle(c, a, b)),
    },
    perimeter: roundValue(sideAB + sideBC + sideCA),
    area: roundValue(triangleArea(labelled)),
  };
};

const computePolygonMetrics = points => {
  const labelled = assignLabels(points);
  const sides = {};
  for (let i = 0; i < labelled.length; i++) {
    const current = labelled[i];
    const next = labelled[(i + 1) % labelled.length];
    sides[`${current.label}${next.label}`] = roundValue(distance(current, next));
  }
  return {
    sides,
    perimeter: roundValue(polygonPerimeter(labelled)),
    area: roundValue(polygonArea(labelled)),
  };
};

const computeCircleMetrics = ({ center, radius }) => {
  return {
    center,
    radius: roundValue(radius),
    diameter: roundValue(radius * 2),
    circumference: roundValue(circleCircumference(radius)),
    area: roundValue(circleArea(radius)),
  };
};

const buildAriaLabel = (shape, metrics) => {
  switch (shape.shape) {
    case 'point': {
      const [pt] = shape.params.points;
      return `Point ${pt.label || ''} at (${formatNumber(pt.x)}, ${formatNumber(pt.y)})`;
    }
    case 'segment':
    case 'line_segment': {
      const [a, b] = assignLabels(shape.params.points);
      const length = metrics.length || metrics.distance;
      return `Segment ${a.label}${b.label} with length ${formatNumber(length || distance(a, b))} units`;
    }
    case 'triangle': {
      const labelled = assignLabels(shape.params.points);
      const [a, b, c] = labelled;
      return `Triangle ${a.label}${b.label}${c.label} with sides ${a.label}${b.label} = ${formatNumber(metrics.sides?.[`${a.label}${b.label}`] ?? distance(a, b))} units, ${b.label}${c.label} = ${formatNumber(metrics.sides?.[`${b.label}${c.label}`] ?? distance(b, c))} units, ${c.label}${a.label} = ${formatNumber(metrics.sides?.[`${c.label}${a.label}`] ?? distance(c, a))} units`;
    }
    case 'polygon': {
      const labelled = assignLabels(shape.params.points);
      const names = labelled.map(pt => pt.label).join('');
      return `Polygon ${names} with perimeter ${formatNumber(metrics.perimeter)} units and area ${formatNumber(metrics.area)} square units`;
    }
    case 'circle': {
      const label = shape.params.label || 'Circle';
      return `${label} with radius ${formatNumber(metrics.radius)} units`;
    }
    default:
      return `${shape.shape} element`;
  }
};

const computeShapeMetrics = shape => {
  if (!shape) return null;
  switch (shape.shape) {
    case 'point': {
      const [pt] = assignLabels(shape.params.points);
      return { point: pt };
    }
    case 'segment':
    case 'line_segment': {
      const [a, b] = assignLabels(shape.params.points);
      return {
        length: roundValue(distance(a, b)),
        points: [a, b],
      };
    }
    case 'triangle':
      return computeTriangleMetrics(shape.params.points);
    case 'polygon':
      return computePolygonMetrics(shape.params.points);
    case 'circle':
      return computeCircleMetrics(shape.params);
    default:
      return null;
  }
};

export {
  DEFAULT_MAX_DECIMALS,
  angle,
  assignLabels,
  buildAriaLabel,
  circleArea,
  circleCircumference,
  computeCircleMetrics,
  computePolygonMetrics,
  computeShapeMetrics,
  computeTriangleMetrics,
  distance,
  formatNumber,
  midpoint,
  polygonArea,
  polygonPerimeter,
  roundValue,
  toDegrees,
  toRadians,
};
