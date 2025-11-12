// sim/persistence.js
// Save/load to localStorage, with backend stubs

const STORAGE_KEY = 'lifeSimRuns';

export function saveRun(snapshot) {
  let runs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const id = 'run_' + Date.now();
  runs.push({ id, snapshot });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(runs));
  return id;
}

export function loadRun(id) {
  let runs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  return runs.find((r) => r.id === id)?.snapshot || null;
}

export function listRuns() {
  let runs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  return runs.map((r) => ({ id: r.id, date: r.snapshot?.date || null }));
}

export function deleteRun(id) {
  let runs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  runs = runs.filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(runs));
}

// Backend stubs
export async function saveRunBackend(snapshot) {
  // POST /api/game/save
  return { success: false, id: null };
}
export async function loadRunBackend(id) {
  // GET /api/game/load/:id
  return { success: false, snapshot: null };
}
export async function listRunsBackend() {
  // GET /api/game/list
  return { success: false, runs: [] };
}
