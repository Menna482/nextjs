"use client";
import { createContext, useState, useContext, useEffect, ReactNode } from "react";

// نوع البيانات اللي هيخزنها الـ context
interface TokenContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

// إنشاء الـ context
export const TokenContext = createContext<TokenContextType | undefined>(undefined);

// الـ Provider
export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) setToken(storedToken);
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

// hook جاهز للاستخدام
export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) throw new Error("useToken must be used within TokenProvider");
  return context;
};
