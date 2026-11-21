"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  getSession,
  loginUser,
  logoutUser,
  registerUser,
} from "@/services/auth";
// import type { LoginPayload, RegisterPayload, User } from "@/types";
import { LoginPayload, RegisterPayload, User } from "@/services/types";

type AuthContextValue = {
  user: User | null;
  ready: boolean;
  login: (p: LoginPayload) => Promise<User>;
  register: (p: RegisterPayload) => Promise<User>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(getSession());
    setReady(true);
  }, []);

  const value: AuthContextValue = {
    user,
    ready,
    login: async (p) => {
      const u = await loginUser(p);
      setUser(u);
      return u;
    },
    register: async (p) => {
      const u = await registerUser(p);
      setUser(u);
      return u;
    },
    logout: async () => {
      await logoutUser();
      setUser(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth faqat AuthProvider ichida ishlaydi");
  return ctx;
}