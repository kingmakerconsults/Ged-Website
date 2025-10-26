import { assignLabels } from './geometryMath.js';

let nextId = 1;

const createInitialOverlayState = () => ({
  ruler: {
    visible: false,
    x: -50,
    y: -20,
    rotation: 0,
    length: 100,
  },
  protractor: {
    visible: false,
    x: -40,
    y: -40,
    rotation: 0,
  },
  compass: {
    visible: false,
    x: 20,
    y: 20,
    rotation: 0,
    radius: 40,
  },
});

const state = {
  theme: 'light',
  tool: 'select',
  shapes: [],
  selectedId: null,
  aiHelpEnabled: false,
  overlays: createInitialOverlayState(),
  measurement: null,
};

const listeners = new Set();

const cloneState = src => JSON.parse(JSON.stringify(src));

const notify = () => {
  const snapshot = cloneState(state);
  listeners.forEach(listener => {
    try {
      listener(snapshot);
    } catch (err) {
      console.error('geometryStore listener error', err);
    }
  });
};

const subscribe = listener => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getState = () => cloneState(state);

const normalizePoints = points => {
  if (!Array.isArray(points)) return [];
  return assignLabels(points).map(pt => ({
    id: pt.id || `${pt.label}`,
    label: pt.label,
    x: pt.x,
    y: pt.y,
  }));
};

const ensureShapeLabel = shape => {
  if (shape.shape === 'circle') {
    if (!shape.params.label) {
      shape.params.label = `Circle ${nextId}`;
    }
    return shape;
  }
  const points = shape.params?.points || [];
  const names = points.map(pt => pt.label).join('');
  if (!shape.label) {
    const friendly = names ? `${shape.shape.charAt(0).toUpperCase()}${shape.shape.slice(1)} ${names}` : `${shape.shape}`;
    shape.label = friendly;
  }
  return shape;
};

const addShape = (shapeJson = {}) => {
  const id = shapeJson.id || `shape-${nextId++}`;
  const shape = {
    id,
    shape: shapeJson.shape || 'point',
    params: {
      ...shapeJson.params,
    },
    style: shapeJson.style || {},
  };

  if (Array.isArray(shape.params?.points)) {
    shape.params.points = normalizePoints(shape.params.points);
  }

  ensureShapeLabel(shape);

  state.shapes = [...state.shapes, shape];
  state.selectedId = id;
  notify();
  return id;
};

const updateShape = (id, partial = {}) => {
  const index = state.shapes.findIndex(item => item.id === id);
  if (index === -1) return;
  const existing = state.shapes[index];
  const next = {
    ...existing,
    ...partial,
    params: {
      ...existing.params,
      ...partial.params,
    },
    style: {
      ...existing.style,
      ...(partial.style || {}),
    },
  };
  if (Array.isArray(next.params.points)) {
    next.params.points = normalizePoints(next.params.points);
  }
  ensureShapeLabel(next);
  state.shapes = [
    ...state.shapes.slice(0, index),
    next,
    ...state.shapes.slice(index + 1),
  ];
  notify();
};

const setSelection = idOrNull => {
  state.selectedId = idOrNull;
  notify();
};

const setTool = toolName => {
  state.tool = toolName;
  state.measurement = null;
  notify();
};

const setTheme = themeName => {
  state.theme = themeName === 'dark' ? 'dark' : 'light';
  notify();
};

const setAIHelpEnabled = on => {
  state.aiHelpEnabled = !!on;
  notify();
};

const getAIHelpEnabled = () => state.aiHelpEnabled;

const reset = () => {
  state.shapes = [];
  state.selectedId = null;
  state.tool = 'select';
  state.overlays = createInitialOverlayState();
  state.measurement = null;
  notify();
};

const setOverlayVisibility = (name, visible) => {
  if (!state.overlays[name]) return;
  state.overlays[name].visible = visible;
  notify();
};

const updateOverlay = (name, partial) => {
  if (!state.overlays[name]) return;
  state.overlays[name] = {
    ...state.overlays[name],
    ...partial,
  };
  notify();
};

const setMeasurement = measurement => {
  state.measurement = measurement;
  notify();
};

const getSceneJson = () => {
  return {
    theme: state.theme,
    tool: state.tool,
    shapes: cloneState(state.shapes),
    overlays: cloneState(state.overlays),
  };
};

export {
  addShape,
  getAIHelpEnabled,
  getSceneJson,
  getState,
  reset,
  setAIHelpEnabled,
  setMeasurement,
  setOverlayVisibility,
  setSelection,
  setTheme,
  setTool,
  subscribe,
  updateOverlay,
  updateShape,
};
