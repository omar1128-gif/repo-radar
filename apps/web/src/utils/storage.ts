export function loadStateFromLocalStorage(key: string): unknown {
  try {
    const serialized = localStorage.getItem(key);
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch (e) {
    console.error('Failed to load state from localStorage', e);
    return undefined;
  }
}

export function saveStateToLocalStorage(key: string, value: unknown): void {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (e) {
    console.error('Failed to save state to localStorage', e);
  }
}
