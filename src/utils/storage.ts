export function loadStateFromLocalStorage<T>(key: string): T | undefined {
  try {
    const serialized = localStorage.getItem(key);
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch (e) {
    console.error('Failed to load state from localStorage', e);
    return undefined;
  }
}

export function saveStateToLocalStorage<T>(key: string, state: T) {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(key, serialized);
  } catch (e) {
    console.error('Failed to save state to localStorage', e);
  }
}
