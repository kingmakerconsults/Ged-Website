import React from 'react';

// Geometry configuration
const GEOMETRY_FIGURES_ENABLED = (() => {
  try {
    return (
      window.__APP_CONFIG__ &&
      window.__APP_CONFIG__.geometryFiguresEnabled === true
    );
  } catch {
    return false;
  }
})();

const DEFAULT_FIGURE_STYLE = {
  stroke: '#1e293b',
  strokeWidth: 2,
  fill: 'none',
};

// Geometry renderers (simplified - extend as needed)
const geometryRenderers = {
  circle: (params, style) => {
    const cx = params.cx || 50;
    const cy = params.cy || 50;
    const r = params.r || 30;
    return {
      elements: <circle cx={cx} cy={cy} r={r} {...style} />,
      pointsForBounds: [
        { x: cx - r, y: cy - r },
        { x: cx + r, y: cy + r },
      ],
    };
  },
  rectangle: (params, style) => {
    const x = params.x || 20;
    const y = params.y || 20;
    const width = params.width || 60;
    const height = params.height || 40;
    return {
      elements: <rect x={x} y={y} width={width} height={height} {...style} />,
      pointsForBounds: [
        { x, y },
        { x: x + width, y: y + height },
      ],
    };
  },
  line: (params, style) => {
    const x1 = params.x1 || 10;
    const y1 = params.y1 || 10;
    const x2 = params.x2 || 90;
    const y2 = params.y2 || 90;
    return {
      elements: <line x1={x1} y1={y1} x2={x2} y2={y2} {...style} />,
      pointsForBounds: [
        { x: x1, y: y1 },
        { x: x2, y: y2 },
      ],
    };
  },
  triangle: (params, style) => {
    const points = params.points || '50,10 90,90 10,90';
    const coords = points.split(' ').map((p) => {
      const [x, y] = p.split(',').map(Number);
      return { x, y };
    });
    return {
      elements: <polygon points={points} {...style} />,
      pointsForBounds: coords,
    };
  },
};

export function GeometryFigure({ spec, className }) {
  if (!GEOMETRY_FIGURES_ENABLED || !spec || typeof spec !== 'object') {
    return null;
  }

  const style = {
    ...DEFAULT_FIGURE_STYLE,
    ...(spec.style || {}),
  };

  const renderer = geometryRenderers[spec.shape];
  if (!renderer) {
    console.warn('Unsupported geometry shape:', spec.shape);
    return null;
  }

  const renderResult = renderer(spec.params || {}, style);
  if (!renderResult) {
    return null;
  }

  const points =
    renderResult.pointsForBounds && renderResult.pointsForBounds.length > 0
      ? renderResult.pointsForBounds
      : [
          { x: 0, y: 0 },
          { x: 100, y: 100 },
        ];

  let minX = Math.min(...points.map((pt) => pt.x));
  let maxX = Math.max(...points.map((pt) => pt.x));
  let minY = Math.min(...points.map((pt) => pt.y));
  let maxY = Math.max(...points.map((pt) => pt.y));

  if (spec.view) {
    const { xMin, xMax, yMin, yMax } = spec.view;
    if (typeof xMin === 'number') minX = Math.min(minX, xMin);
    if (typeof xMax === 'number') maxX = Math.max(maxX, xMax);
    if (typeof yMin === 'number') minY = Math.min(minY, yMin);
    if (typeof yMax === 'number') maxY = Math.max(maxY, yMax);
  }

  const padding =
    spec.view && typeof spec.view.padding === 'number' ? spec.view.padding : 8;
  const width = Math.max(maxX - minX, 20);
  const height = Math.max(maxY - minY, 20);

  const viewBox = `${minX - padding} ${minY - padding} ${width + padding * 2} ${
    height + padding * 2
  }`;

  return (
    <svg
      className={className}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Geometry figure"
      preserveAspectRatio="xMidYMid meet"
    >
      {renderResult.elements}
    </svg>
  );
}

export default GeometryFigure;
