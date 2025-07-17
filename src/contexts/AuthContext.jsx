import { createContext, useContext, useState, useEffect } from "react";
import { getAllTiers } from "../services/tierService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tiers, setTiers] = useState([]); // fallback por si no usas el TierContext

  // Leer usuario de localStorage al montar el componente
  useEffect(() => {
    const storedUser = localStorage.getItem("lux_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        fetchTiers(); // también carga tiers al inicializar
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("lux_user");
      }
    }
    setLoading(false);
  }, []);

  const fetchTiers = async () => {
    try {
      const response = await getAllTiers();
      const activeTiers = response.filter((t) => t.active);
      setTiers(activeTiers);
    } catch (error) {
      console.error("Failed to fetch tiers:", error);
    }
  };

  const login = async (userData) => {
    setUser(userData);
    localStorage.setItem("lux_user", JSON.stringify(userData));
    await fetchTiers(); // carga tiers al hacer login
  };

  const upgradeToPremium = () => {
    if (!user) return;
    const updatedUser = { ...user, plan: "premium" };
    setUser(updatedUser);
    localStorage.setItem("lux_user", JSON.stringify(updatedUser));
  };

  const logout = () => {
    localStorage.removeItem("lux_user");
    setUser(null);
    setTiers([]);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        upgradeToPremium,
        isAuthenticated,
        loading,
        tiers, // Opcional: expón los tiers desde aquí también
        setTiers, // Opcional si necesitas modificarlos desde otros lugares
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
