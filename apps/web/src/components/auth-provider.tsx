"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { currentUser, type User } from "@pustakiq/shared";

/**
 * Stub web authentication (mirrors the mobile AuthContext): mobile-OTP and
 * Google both resolve to the mock `currentUser`, persisted in localStorage so
 * the session survives reloads. Swap for real /auth endpoints later.
 */

const KEY = "pustakiq.web.session";

interface AuthValue {
  user: User | null;
  ready: boolean;
  requestOtp: (mobile: string) => Promise<void>;
  verifyOtp: (mobile: string, code: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthValue | undefined>(undefined);
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw) as User);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: User | null) => {
    setUser(next);
    try {
      if (next) localStorage.setItem(KEY, JSON.stringify(next));
      else localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const requestOtp = useCallback(async () => {
    await wait(500);
  }, []);

  const verifyOtp = useCallback(async () => {
    await wait(500);
    persist(currentUser);
  }, [persist]);

  const signInWithGoogle = useCallback(async () => {
    await wait(500);
    persist(currentUser);
  }, [persist]);

  const signOut = useCallback(() => persist(null), [persist]);

  const value = useMemo<AuthValue>(
    () => ({ user, ready, requestOtp, verifyOtp, signInWithGoogle, signOut }),
    [user, ready, requestOtp, verifyOtp, signInWithGoogle, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
