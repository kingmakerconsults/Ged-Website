import { prepareGraphObject } from './graphMath.js';

let nextId = 1;

const clone = (value) => JSON.parse(JSON.stringify(value));

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
  listeners.forEach((listener) => {
    try {
      listener(snapshot);
    } catch (err) {
      console.error('graphStore listener error', err);
    }
  });
};

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getState = () => clone(state);

/**
 * Add a graph object. Each object is tagged with an `origin`:
 *   - 'spec'    — pre-loaded from the question's graphSpec (read-only)
 *   - 'student' — added interactively by the student (editable/removable)
 * Callers may pass `origin` explicitly; default is 'student'.
 */
const addObject = (object = {}) => {
  const id = object.id || `graph-object-${nextId++}`;
  if (!object.type) {
    throw new Error('graphStore.addObject requires a "type" property.');
  }
  const origin = object.origin || 'student';
  const base = {
    id,
    type: object.type,
    definition: { ...object.definition },
  };
  const prepared = prepareGraphObject(base);
  prepared.id = id;
  prepared.origin = origin;
  state.objects = [...state.objects, prepared];
  state.selectedId = id;
  notify();
  return id;
};

const updateObject = (id, partial = {}) => {
  const index = state.objects.findIndex((item) => item.id === id);
  if (index === -1) return;
  const existing = state.objects[index];
  const updatedDefinition = {
    ...existing.definition,
    ...(partial.definition || {}),
  };
  const prepared = prepareGraphObject({
    id,
    type: existing.type,
    definition: updatedDefinition,
  });
  prepared.origin = existing.origin || 'student';
  state.objects = [
    ...state.objects.slice(0, index),
    prepared,
    ...state.objects.slice(index + 1),
  ];
  notify();
};

/**
 * Remove a single object by id.
 * If `studentOnly` is true (default), only student-origin objects can be removed.
 */
const removeObject = (id, studentOnly = true) => {
  const index = state.objects.findIndex((item) => item.id === id);
  if (index === -1) return;
  if (studentOnly && state.objects[index].origin === 'spec') return;
  state.objects = [
    ...state.objects.slice(0, index),
    ...state.objects.slice(index + 1),
  ];
  if (state.selectedId === id) state.selectedId = null;
  notify();
};

/**
 * Remove all student-origin objects, keeping spec objects intact.
 */
const clearStudentObjects = () => {
  state.objects = state.objects.filter((obj) => obj.origin === 'spec');
  state.selectedId = null;
  notify();
};

/**
 * Undo: remove the most recently added student object.
 */
const undoLastStudent = () => {
  for (let i = state.objects.length - 1; i >= 0; i--) {
    if (state.objects[i].origin === 'student') {
      state.objects = [
        ...state.objects.slice(0, i),
        ...state.objects.slice(i + 1),
      ];
      if (state.selectedId === state.objects[i]?.id) state.selectedId = null;
      notify();
      return;
    }
  }
};

/**
 * Clear everything and reload from a graphSpec.objects array.
 * All loaded objects get origin='spec'.
 */
const resetToSpec = (specObjects = []) => {
  state.objects = [];
  state.selectedId = null;
  nextId = 1;
  if (Array.isArray(specObjects)) {
    specObjects.forEach((obj) => {
      try {
        addObject({ ...obj, origin: 'spec' });
      } catch (e) {
        console.warn('[graphStore] resetToSpec: failed to add object', e);
      }
    });
  }
  state.mode = 'pan';
  notify();
};

/**
 * Return a serialized snapshot of only student-origin objects,
 * structured for answer grading: { points: [...], lines: [...] }
 */
const getStudentAnswer = () => {
  const answer = { points: [], lines: [] };
  state.objects.forEach((obj) => {
    if (obj.origin !== 'student') return;
    if (obj.type === 'point') {
      answer.points.push({
        x: obj.metadata.x,
        y: obj.metadata.y,
        label: obj.metadata.label || null,
      });
    } else if (obj.type === 'line') {
      answer.lines.push({
        slope: obj.metadata.slope,
        intercept: obj.metadata.intercept,
        verticalX: obj.metadata.verticalX ?? null,
      });
    }
  });
  return clone(answer);
};

const setSelected = (id) => {
  state.selectedId = id;
  notify();
};

const setMode = (mode) => {
  state.mode = mode;
  notify();
};

const setTheme = (theme) => {
  state.theme = theme === 'dark' ? 'dark' : 'light';
  notify();
};

const setAIHelpEnabled = (enabled) => {
  state.aiHelpEnabled = !!enabled;
  notify();
};

const getAIHelpEnabled = () => state.aiHelpEnabled;

const getAllObjects = () => clone(state.objects);

const setViewport = (nextViewport) => {
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
  clearStudentObjects,
  exportScene,
  getAIHelpEnabled,
  getAllObjects,
  getState,
  getStudentAnswer,
  removeObject,
  resetToSpec,
  setAIHelpEnabled,
  setMode,
  setSelected,
  setTheme,
  setViewport,
  subscribe,
  undoLastStudent,
  updateObject,
};
