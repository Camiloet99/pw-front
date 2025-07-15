const HISTORY_KEY = "searchHistory";

export function saveSearchToHistory(queryObj) {
  let history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];

  // Verificamos si ya existe una búsqueda igual
  const existingIndex = history.findIndex(
    (entry) =>
      JSON.stringify({ ...entry, timestamp: undefined }) ===
      JSON.stringify({ ...queryObj, timestamp: undefined })
  );

  if (existingIndex !== -1) {
    // Si existe, actualizamos la hora y movemos al inicio
    history.splice(existingIndex, 1);
  }

  const newEntry = {
    ...queryObj,
    timestamp: new Date().toISOString(),
  };

  const updatedHistory = [newEntry, ...history].slice(0, 10);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
}

export function getSearchHistory() {
  return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
}

export function clearSearchHistory() {
  localStorage.removeItem(HISTORY_KEY);
}
