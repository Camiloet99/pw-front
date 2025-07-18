import api from "./api";
import { getWatchByReference, getWatchesByReferences } from "./watchService";

// === GET: Get favorite references and map to full data if needed ===
export const getUserFavorites = async (userId) => {
  try {
    const res = await api.get(`/favorites/${userId}`);
    const references = res.data?.result || [];

    if (!references || references.length === 0) {
      return [];
    }
    const fullWatches = await getWatchesByReferences(references);
    return fullWatches;
  } catch (err) {
    console.error("Error fetching favorites:", err);
    return [];
  }
};

// === PUT: Add reference as favorite ===
export const addFavorite = async (userId, reference) => {
  try {
    await api.put(`/favorites/${userId}/add`, { reference: reference },);
    return getUserFavorites(userId); // refresca lista
  } catch (err) {
    console.error("Error adding favorite:", err);
    return [];
  }
};

// === PUT: Remove reference from favorites ===
export const removeFavoriteCall = async (userId, reference) => {
  try {
    await api.put(`/favorites/${userId}/remove`, { reference });
    return getUserFavorites(userId); // refresca lista
  } catch (err) {
    console.error("Error removing favorite:", err);
    return [];
  }
};
