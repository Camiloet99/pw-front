import api from "./api"; // este es tu wrapper de axios con headers y baseURL configurados

// === 1. GET: Get full watch details by reference ===
export const getWatchByReference = async (reference) => {
  try {
    const res = await api.get(`/watches/${reference}`);
    return res.data?.result;
  } catch (err) {
    console.error("Error getting watch by reference:", err);
    throw err.response || err;
  }
};

// === 2. POST: Search watches with filters ===
export const searchWatches = async (filters) => {
  try {
    const res = await api.post("/watches/search", filters);
    return res.data?.result;
  } catch (err) {
    console.error("Error searching watches:", err);
    throw err.response || err;
  }
};

// === 3. POST: Get multiple watches by reference codes ===
export const getWatchesByReferences = async (references) => {
  try {
    const res = await api.post("/watches/by-references", {
      references,
    });
    return res.data?.result;
  } catch (err) {
    console.error("Error fetching watches by references:", err);
    throw err.response || err;
  }
};

// === 4. GET: Get watches within a price range ===
export const getWatchesByPriceRange = async (min, max) => {
  try {
    const res = await api.get("/watches/price-range", {
      params: { min, max },
    });
    return res.data?.result;
  } catch (err) {
    console.error("Error getting watches by price range:", err);
    throw err.response || err;
  }
};

// === 5. GET: Get price history for a reference ===
export const getPriceHistory = async (reference) => {
  try {
    const res = await api.get("/watches/price-history", {
      params: { reference },
    });
    return res.data?.result;
  } catch (err) {
    console.error("Error getting price history:", err);
    throw err.response || err;
  }
};

// === 6. GET: Autocomplete reference search ===
export const autocompleteReference = async (prefix) => {
  try {
    const res = await api.get("/watches/autocomplete", {
      params: { prefix },
    });
    return res.data?.result || [];
  } catch (err) {
    console.error("Error with autocomplete:", err);
    throw err.response || err;
  }
};
