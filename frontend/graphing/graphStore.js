import { prepareGraphObject } from './graphMath.js';

let nextId = 1;

const clone = value => JSON.parse(JSON.stringify(value));

const state = {
  theme: 'light',
  mode: 'pan',
  objects: [],
  selectedId: null,
  aiHelpEnabled: false,
  viewport: {
    x: -12,
    y: -10,
    width: 24,
    height: 20,
  },
};

const listeners = new Set();

const notify = () => {
  const snapshot = clone(state);
  listeners.forEach(listener => {
    try {
      listener(snapshot);
    } catch (err) {
      console.error('graphStore listener error', err);
    }
  });
};

const subscribe = listener => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getState = () => clone(state);

const addObject = (object = {}) => {
  const id = object.id || `graph-object-${nextId++}`;
  if (!object.type) {
    throw new Error('graphStore.addObject requires a "type" property.');
  }
  const base = {
    id,
    type: object.type,
    definition: { ...object.definition },
  };
  const prepared = prepareGraphObject(base);
  prepared.id = id;
  state.objects = [...state.objects, prepared];
  state.selectedId = id;
  notify();
  return id;
};

const updateObject = (id, partial = {}) => {
  const index = state.objects.findIndex(item => item.id === id);
  if (index === -1) return;
  const existing = state.objects[index];
  const updatedDefinition = {
    ...existing.definition,
    ...(partial.definition || {}),
  };
  const prepared = prepareGraphObject({ id, type: existing.type, definition: updatedDefinition });
  state.objects = [
    ...state.objects.slice(0, index),
    prepared,
    ...state.objects.slice(index + 1),
  ];
  notify();
};

const setSelected = id => {
  state.selectedId = id;
  notify();
};

const setMode = mode => {
  state.mode = mode;
  notify();
};

const setTheme = theme => {
  state.theme = theme === 'dark' ? 'dark' : 'light';
  notify();
};

const setAIHelpEnabled = enabled => {
  state.aiHelpEnabled = !!enabled;
  notify();
};

const getAIHelpEnabled = () => state.aiHelpEnabled;

const getAllObjects = () => clone(state.objects);

const setViewport = nextViewport => {
  if (!nextViewport) return;
  state.viewport = {
    ...state.viewport,
    ...nextViewport,
  };
  notify();
};

const exportScene = () => ({
  theme: state.theme,
  mode: state.mode,
  selectedId: state.selectedId,
  aiHelpEnabled: state.aiHelpEnabled,
  viewport: clone(state.viewport),
  objects: clone(state.objects),
});

export {
  addObject,
  exportScene,
  getAIHelpEnabled,
  getAllObjects,
  getState,
  setAIHelpEnabled,
  setMode,
  setSelected,
  setTheme,
  setViewport,
  subscribe,
  updateObject,
};
