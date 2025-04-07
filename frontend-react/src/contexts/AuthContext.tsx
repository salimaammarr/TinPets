import React, { createContext, useContext, useState, useEffect } from "react";
import authService, { AuthResponse } from "../services/authService";

interface AuthContextType {
  user: AuthResponse | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setUser(user);
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setError(null);
      const user = await authService.login({ username, password });
      setUser(user);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Invalid username or password";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const register = async (username: string, password: string) => {
    try {
      setError(null);
      const user = await authService.register({ username, password });
      setUser(user);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Username already exists";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
