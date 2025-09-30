"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  );

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        { email, password }
      );
      const token = data.token;
      setToken(token);
      localStorage.setItem("token", token);
      setUser(data.user);
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const register = async (name: string, email: string, password: string, phone: string) => {
    try {
      await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", {
        name,
        email,
        password,
        rePassword: password,
        phone,
      });
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Register failed");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) return;
      try {
        const { data } = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
          { headers: { token } }
        );
        setUser(data.user);
      } catch (err) {
        logout();
      }
    };
    verifyToken();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
