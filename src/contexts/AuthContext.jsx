import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Leer usuario de localStorage al montar el componente
  useEffect(() => {
    const storedUser = localStorage.getItem("lux_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("lux_user");
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("lux_user", JSON.stringify(userData));
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
