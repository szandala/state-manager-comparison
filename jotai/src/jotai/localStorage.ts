export const loadState = <T>(key: string, initialState: T): T => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState) as T;
  } catch (err) {
    console.error(`Could not load ${key} state`, err);
    return initialState;
  }
};

export const saveState = <T>(key: string, state: T) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error(`Could not save ${key} state`, err);
  }
};
