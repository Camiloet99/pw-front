const STORAGE_KEY = "search_history";

export function getSearchHistory() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function clearSearchHistory() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Guarda una búsqueda al historial limitado.
 * @param {Object} filters - Filtros de búsqueda.
 * @param {number} limit - Límite máximo de entradas en historial.
 */
export function saveSearchToHistory(filters, limit = 10) {
  if (!filters) return;

  const history = getSearchHistory();

  const newEntry = {
    ...filters,
    timestamp: Date.now(),
  };

  const updatedHistory = [newEntry, ...history].slice(0, limit);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
}
