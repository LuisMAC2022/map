const KEY = 'pet-loop-state-v1';

export function loadState() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? { attempts: {}, collectedIds: [] };
  } catch {
    return { attempts: {}, collectedIds: [] };
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function resetState() {
  localStorage.removeItem(KEY);
}
