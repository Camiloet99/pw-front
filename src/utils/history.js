const HISTORY_KEY = "searchHistory";

export function saveSearchToHistory(queryObj) {
  let history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];

  // Función para eliminar el timestamp y comparar solo el contenido de búsqueda
  const stripTimestamp = (obj) => {
    const { timestamp, ...rest } = obj;
    return rest;
  };

  const newQuery = stripTimestamp(queryObj);

  // Buscar si ya existe una búsqueda igual (ignorando timestamp)
  const existingIndex = history.findIndex(
    (entry) =>
      JSON.stringify(stripTimestamp(entry)) === JSON.stringify(newQuery)
  );

  if (existingIndex !== -1) {
    // Eliminar la entrada duplicada para moverla al inicio
    history.splice(existingIndex, 1);
  }

  const newEntry = {
    ...newQuery,
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
