// Geometry rendering utilities extracted from app.jsx

const GEOMETRY_FIGURES_ENABLED = Boolean(
  typeof window !== 'undefined' &&
    window.__APP_CONFIG__ &&
    window.__APP_CONFIG__.geometryFiguresEnabled
);

const DEFAULT_FIGURE_STYLE = {
  stroke: '#000000',
  fill: 'rgba(96, 165, 250, 0.12)',
  labelColor: '#000000',
  pointFill: '#ffffff',
};

const normalizeNumber = (value) => {
  if (typeof value === 'number') return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const normalizePoint = (point = {}) => {
  const x = normalizeNumber(point.x);
  const y = normalizeNumber(point.y);
  if (typeof x !== 'number' || typeof y !== 'number') {
    return undefined;
  }
  return {
    x,
    y,
    label: typeof point.label === 'string' ? point.label : undefined,
  };
};

const mapPoints = (list) => {
  if (!Array.isArray(list)) return [];
  return list.map(normalizePoint).filter(Boolean);
};

const midpoint = (a, b) => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
});

const findPointByLabel = (points, label) => {
  if (!label) return undefined;
  return points.find((pt) => pt.label === label);
};

const renderPointMarkers = (points, style) => {
  return points.map((pt, index) => (
    <g key={`pt-${index}`}>
      <circle
        cx={pt.x}
        cy={pt.y}
        r={1.8}
        fill={style.pointFill}
        stroke={style.stroke}
        strokeWidth={0.6}
      />
      {pt.label && (
        <text
          x={pt.x + 2.8}
          y={pt.y - 2.2}
          fontSize={6}
          fill={style.labelColor}
        >
          {pt.label}
        </text>
      )}
    </g>
  ));
};

const renderSideLabels = (points, sideLabels = [], style) => {
  if (!Array.isArray(sideLabels)) return [];
  return sideLabels
    .map((entry, index) => {
      if (
        !entry ||
        !Array.isArray(entry.between) ||
        entry.between.length !== 2 ||
        typeof entry.text !== 'string'
      ) {
        return null;
      }
      const a = findPointByLabel(points, entry.between[0]);
      const b = findPointByLabel(points, entry.between[1]);
      if (!a || !b) return null;
      const mid = midpoint(a, b);
      return (
        <text
          key={`side-label-${index}`}
          x={mid.x}
          y={mid.y - 1.5}
          fontSize={6}
          textAnchor="middle"
          fill={style.labelColor}
        >
          {entry.text}
        </text>
      );
    })
    .filter(Boolean);
};

const renderAdditionalLabels = (labels = [], style) => {
  if (!Array.isArray(labels)) return [];
  return labels
    .map((label, index) => {
      const normalized = normalizePoint(label);
      if (!normalized || typeof label.text !== 'string') {
        return null;
      }
      const dx = normalizeNumber(label.dx) || 0;
      const dy = normalizeNumber(label.dy) || 0;
      return (
        <text
          key={`label-${index}`}
          x={normalized.x + dx}
          y={normalized.y + dy}
          fontSize={6}
          textAnchor={label.textAnchor || 'middle'}
          fill={style.labelColor}
        >
          {label.text}
        </text>
      );
    })
    .filter(Boolean);
};

const renderSegments = (segments = [], style) => {
  if (!Array.isArray(segments)) return [];
  return segments
    .map((segment, index) => {
      if (
        !segment ||
        !Array.isArray(segment.from) ||
        !Array.isArray(segment.to)
      ) {
        return null;
      }
      const from = segment.from.map(normalizeNumber);
      const to = segment.to.map(normalizeNumber);
      if (
        from.length !== 2 ||
        to.length !== 2 ||
        from.some((v) => typeof v !== 'number') ||
        to.some((v) => typeof v !== 'number')
      ) {
        return null;
      }
      const dashArray = segment.dashed ? '4,3' : undefined;
      const labelText =
        typeof segment.label === 'string' ? segment.label : null;
      const labelOffset = Array.isArray(segment.labelOffset)
        ? segment.labelOffset.map(normalizeNumber)
        : [];
      const mid = { x: (from[0] + to[0]) / 2, y: (from[1] + to[1]) / 2 };

      return (
        <g key={`segment-${index}`}>
          <line
            x1={from[0]}
            y1={from[1]}
            x2={to[0]}
            y2={to[1]}
            stroke={style.stroke}
            strokeWidth={1}
            strokeDasharray={dashArray}
          />
          {labelText && (
            <text
              x={mid.x + (labelOffset[0] || 0)}
              y={mid.y + (labelOffset[1] || -2)}
              fontSize={6}
              textAnchor="middle"
              fill={style.labelColor}
            >
              {labelText}
            </text>
          )}
        </g>
      );
    })
    .filter(Boolean);
};

const polygonRenderer = (params = {}, style, { includeRightAngle } = {}) => {
  const points = mapPoints(params.points);
  if (points.length < 3) return null;

  const polygonPoints = points.map((pt) => `${pt.x},${pt.y}`).join(' ');
  const elements = [
    <polygon
      key="polygon"
      points={polygonPoints}
      fill={style.fill}
      stroke={style.stroke}
      strokeWidth={1.5}
    />,
    ...renderPointMarkers(points, style),
    ...renderSideLabels(points, params.sideLabels, style),
    ...renderAdditionalLabels(params.labels, style),
    ...renderSegments(params.segments, style),
  ];

  if (includeRightAngle && params.rightAngle) {
    const vertexLabel = params.rightAngle.vertex;
    const size = normalizeNumber(params.rightAngle.size) || 8;
    const vertex = findPointByLabel(points, vertexLabel) || points[0];
    const vertexIndex = points.findIndex((pt) => pt === vertex);
    const prev = points[(vertexIndex - 1 + points.length) % points.length];
    const next = points[(vertexIndex + 1) % points.length];
    if (prev && next) {
      const v1 = { x: prev.x - vertex.x, y: prev.y - vertex.y };
      const v2 = { x: next.x - vertex.x, y: next.y - vertex.y };
      const len1 = Math.hypot(v1.x, v1.y) || 1;
      const len2 = Math.hypot(v2.x, v2.y) || 1;
      const u1 = { x: (v1.x / len1) * size, y: (v1.y / len1) * size };
      const u2 = { x: (v2.x / len2) * size, y: (v2.y / len2) * size };
      const p1 = { x: vertex.x + u1.x, y: vertex.y + u1.y };
      const p2 = { x: p1.x + u2.x, y: p1.y + u2.y };
      const p3 = { x: vertex.x + u2.x, y: vertex.y + u2.y };
      elements.push(
        <polygon
          key="right-angle"
          points={`${vertex.x},${vertex.y} ${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`}
          fill="rgba(30, 64, 175, 0.12)"
          stroke={style.stroke}
          strokeWidth={0.8}
        />
      );
    }
  }

  return {
    elements,
    pointsForBounds: points,
  };
};

const rectangleRenderer = (params = {}, style) => {
  const origin = normalizePoint(params.origin) || { x: 15, y: 15 };
  const width = normalizeNumber(params.width);
  const height = normalizeNumber(params.height);
  if (typeof width !== 'number' || typeof height !== 'number') return null;
  const points = [
    origin,
    { x: origin.x + width, y: origin.y },
    { x: origin.x + width, y: origin.y + height },
    { x: origin.x, y: origin.y + height },
  ];

  const base = polygonRenderer(
    {
      points,
      labels: params.labels,
      sideLabels: params.sideLabels,
      segments: params.segments,
    },
    style
  );
  if (!base) return null;
  return base;
};

const circleRenderer = (params = {}, style) => {
  const center = normalizePoint(params.center) || { x: 50, y: 50 };
  const radius = normalizeNumber(params.radius);
  if (typeof radius !== 'number') return null;
  const points = mapPoints(params.points);
  const elements = [
    <circle
      key="circle"
      cx={center.x}
      cy={center.y}
      r={radius}
      fill={style.fill}
      stroke={style.stroke}
      strokeWidth={1.5}
    />,
    ...renderPointMarkers(points, style),
    ...renderAdditionalLabels(params.labels, style),
    ...renderSegments(params.segments, style),
  ];

  if (params.radiusLabel) {
    elements.push(
      <text
        key="radius-label"
        x={center.x + radius / 2}
        y={center.y - 2}
        fontSize={6}
        textAnchor="middle"
        fill={style.labelColor}
      >
        {params.radiusLabel}
      </text>
    );
  }

  if (params.showRadius !== false) {
    elements.push(
      <line
        key="radius-line"
        x1={center.x}
        y1={center.y}
        x2={center.x + radius}
        y2={center.y}
        stroke={style.stroke}
        strokeWidth={1}
        strokeDasharray="4,3"
      />
    );
  }

  return {
    elements,
    pointsForBounds: [
      ...points,
      { x: center.x + radius, y: center.y },
      { x: center.x - radius, y: center.y },
      { x: center.x, y: center.y + radius },
      { x: center.x, y: center.y - radius },
    ],
  };
};

const regularPolygonRenderer = (params = {}, style) => {
  const center = normalizePoint(params.center) || { x: 50, y: 50 };
  const radius = normalizeNumber(params.radius);
  const sides = Math.max(3, Math.floor(normalizeNumber(params.sides) || 0));
  if (typeof radius !== 'number' || !Number.isFinite(sides) || sides < 3)
    return null;
  const startAngle =
    (normalizeNumber(params.startAngle) || -90) * (Math.PI / 180);
  const points = Array.from({ length: sides }).map((_, index) => {
    const angle = startAngle + (index * 2 * Math.PI) / sides;
    return {
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
      label:
        params.pointLabels && params.pointLabels[index]
          ? params.pointLabels[index]
          : undefined,
    };
  });

  return polygonRenderer(
    {
      points,
      labels: params.labels,
      sideLabels: params.sideLabels,
      segments: params.segments,
    },
    style
  );
};

const angleRenderer = (params = {}, style) => {
  const vertex = normalizePoint(params.vertex);
  const ray1 = normalizePoint(params.ray1);
  const ray2 = normalizePoint(params.ray2);
  if (!vertex || !ray1 || !ray2) return null;

  const pointsForBounds = [vertex, ray1, ray2];
  const elements = [
    <line
      key="ray1"
      x1={vertex.x}
      y1={vertex.y}
      x2={ray1.x}
      y2={ray1.y}
      stroke={style.stroke}
      strokeWidth={1.2}
    />,
    <line
      key="ray2"
      x1={vertex.x}
      y1={vertex.y}
      x2={ray2.x}
      y2={ray2.y}
      stroke={style.stroke}
      strokeWidth={1.2}
    />,
    ...renderPointMarkers([vertex, ray1, ray2], style),
    ...renderAdditionalLabels(params.labels, style),
    ...renderSegments(params.segments, style),
  ];

  const angleLabel =
    typeof params.angleLabel === 'string' ? params.angleLabel : null;
  const radius = normalizeNumber(params.arcRadius) || 12;

  const drawAngleArc = () => {
    const startVec = { x: ray1.x - vertex.x, y: ray1.y - vertex.y };
    const endVec = { x: ray2.x - vertex.x, y: ray2.y - vertex.y };
    const startAngle = Math.atan2(startVec.y, startVec.x);
    let endAngle = Math.atan2(endVec.y, endVec.x);
    while (endAngle < startAngle) {
      endAngle += Math.PI * 2;
    }
    const arcSweep = endAngle - startAngle;
    const largeArcFlag = arcSweep > Math.PI ? 1 : 0;
    const arcEnd = {
      x: vertex.x + radius * Math.cos(endAngle),
      y: vertex.y + radius * Math.sin(endAngle),
    };
    const arcStart = {
      x: vertex.x + radius * Math.cos(startAngle),
      y: vertex.y + radius * Math.sin(startAngle),
    };

    elements.push(
      <path
        key="angle-arc"
        d={`M ${arcStart.x} ${arcStart.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${arcEnd.x} ${arcEnd.y}`}
        fill="none"
        stroke={style.stroke}
        strokeWidth={1}
      />
    );

    if (angleLabel) {
      const labelAngle = startAngle + arcSweep / 2;
      const labelPoint = {
        x: vertex.x + (radius + 6) * Math.cos(labelAngle),
        y: vertex.y + (radius + 6) * Math.sin(labelAngle),
      };
      elements.push(
        <text
          key="angle-label"
          x={labelPoint.x}
          y={labelPoint.y}
          fontSize={6}
          textAnchor="middle"
          fill={style.labelColor}
        >
          {angleLabel}
        </text>
      );
    }
  };

  drawAngleArc();

  return { elements, pointsForBounds };
};

const cylinderNetRenderer = (params = {}, style) => {
  const radius = Math.abs(normalizeNumber(params.radius));
  const height = Math.abs(normalizeNumber(params.height));
  if (!Number.isFinite(radius) || !Number.isFinite(height)) return null;
  const circumference = 2 * Math.PI * radius;
  const rectWidth = Math.max(circumference, radius * 4);
  const rectHeight = height;
  const padding = 10;
  const topCenter = { x: padding + rectWidth / 2, y: padding + radius }; // radius used as circle radius on diagram scale
  const bottomCenter = {
    x: padding + rectWidth / 2,
    y: padding + rectHeight + radius * 3,
  };

  const elements = [
    <rect
      key="lateral"
      x={padding}
      y={padding + radius * 2}
      width={rectWidth}
      height={rectHeight}
      fill={style.fill}
      stroke={style.stroke}
      strokeWidth={1.2}
    />,
    <circle
      key="top-circle"
      cx={topCenter.x}
      cy={topCenter.y}
      r={radius * 1.5}
      fill={style.fill}
      stroke={style.stroke}
      strokeWidth={1.2}
    />, // scaled for clarity
    <circle
      key="bottom-circle"
      cx={bottomCenter.x}
      cy={bottomCenter.y}
      r={radius * 1.5}
      fill={style.fill}
      stroke={style.stroke}
      strokeWidth={1.2}
    />,
    <text
      key="height-label"
      x={padding + rectWidth + 6}
      y={padding + radius * 2 + rectHeight / 2}
      fontSize={6}
      fill={style.labelColor}
    >
      h = {height}
    </text>,
    <text
      key="circumference-label"
      x={padding + rectWidth / 2}
      y={padding + radius * 2 + rectHeight + 8}
      fontSize={6}
      textAnchor="middle"
      fill={style.labelColor}
    >
      circumference = {circumference.toFixed(2)}
    </text>,
    <text
      key="radius-label-top"
      x={topCenter.x + radius * 1.5 + 6}
      y={topCenter.y}
      fontSize={6}
      fill={style.labelColor}
    >
      r = {radius}
    </text>,
    ...renderAdditionalLabels(params.labels, style),
  ];

  return {
    elements,
    pointsForBounds: [
      { x: padding, y: padding },
      { x: padding + rectWidth, y: padding + radius * 2 + rectHeight },
      { x: bottomCenter.x + radius * 1.5, y: bottomCenter.y + radius * 1.5 },
    ],
  };
};

const rectPrismNetRenderer = (params = {}, style) => {
  const length = Math.abs(normalizeNumber(params.length));
  const width = Math.abs(normalizeNumber(params.width));
  const height = Math.abs(normalizeNumber(params.height));
  if (
    !Number.isFinite(length) ||
    !Number.isFinite(width) ||
    !Number.isFinite(height)
  )
    return null;

  const padding = 10;
  const scale = 1;
  const L = length * scale;
  const W = width * scale;
  const H = height * scale;

  const elements = [];
  const pointsForBounds = [];

  const drawRect = (x, y, w, h, key, label) => {
    elements.push(
      <rect
        key={key}
        x={x}
        y={y}
        width={w}
        height={h}
        fill={style.fill}
        stroke={style.stroke}
        strokeWidth={1.2}
      />
    );
    if (label) {
      elements.push(
        <text
          key={`${key}-label`}
          x={x + w / 2}
          y={y + h / 2}
          fontSize={6}
          textAnchor="middle"
          fill={style.labelColor}
        >
          {label}
        </text>
      );
    }
    pointsForBounds.push({ x, y }, { x: x + w, y: y + h });
  };

  const startX = padding + W;
  const startY = padding + H;

  drawRect(startX, startY, L, H, 'front', `h = ${height}`);
  drawRect(startX + L, startY, W, H, 'right', `w = ${width}`);
  drawRect(startX - W, startY, W, H, 'left', `w = ${width}`);
  drawRect(startX + L + W, startY, W, H, 'extra', '');
  drawRect(startX, startY - H, L, H, 'top', `l = ${length}`);
  drawRect(startX, startY + H, L, H, 'bottom', `l = ${length}`);

  elements.push(...renderAdditionalLabels(params.labels, style));

  return { elements, pointsForBounds };
};

export const geometryRenderers = {
  triangle: (params, style) =>
    polygonRenderer(params, style || DEFAULT_FIGURE_STYLE, {}),
  right_triangle: (params, style) =>
    polygonRenderer(params, style || DEFAULT_FIGURE_STYLE, {
      includeRightAngle: true,
    }),
  rectangle: (params, style) =>
    rectangleRenderer(params, style || DEFAULT_FIGURE_STYLE),
  circle: (params, style) =>
    circleRenderer(params, style || DEFAULT_FIGURE_STYLE),
  polygon: (params, style) =>
    polygonRenderer(params, style || DEFAULT_FIGURE_STYLE, {}),
  regular_polygon: (params, style) =>
    regularPolygonRenderer(params, style || DEFAULT_FIGURE_STYLE),
  line_angle: (params, style) =>
    angleRenderer(params, style || DEFAULT_FIGURE_STYLE),
  cylinder_net: (params, style) =>
    cylinderNetRenderer(params, style || DEFAULT_FIGURE_STYLE),
  rect_prism_net: (params, style) =>
    rectPrismNetRenderer(params, style || DEFAULT_FIGURE_STYLE),
};

function GeometryFigure({ spec, className }) {
  const enabled =
    (typeof window !== 'undefined' &&
      window.location &&
      window.location.hostname === 'localhost') ||
    GEOMETRY_FIGURES_ENABLED;
  if (!enabled) {
    return (
      <div style={{ color: 'red' }}>Geometry tool is disabled by config.</div>
    );
  }
  if (!spec || typeof spec !== 'object') {
    return <div style={{ color: 'red' }}>Invalid geometry spec.</div>;
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

if (typeof window !== 'undefined') {
  window.Components = window.Components || {};
  window.Components.GeometryFigure = GeometryFigure;
  window.Components.geometryRenderers = geometryRenderers;
}
