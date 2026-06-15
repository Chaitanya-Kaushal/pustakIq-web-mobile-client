import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { currentUser, User } from '@pustakiq/shared';

/**
 * Stub authentication.
 *
 * The real app will call POST /auth/login, /auth/verify-otp and /auth/google
 * (prd.md §13H). For now every flow resolves to the mock `currentUser` and the
 * session is persisted in AsyncStorage so the app reopens signed-in.
 */

const STORAGE_KEYS = {
  session: 'pustakiq.session',
  onboarded: 'pustakiq.onboarded',
};

interface AuthState {
  user: User | null;
  /** True while restoring persisted session on cold start. */
  bootstrapping: boolean;
  hasOnboarded: boolean;
}

interface AuthContextValue extends AuthState {
  completeOnboarding: () => Promise<void>;
  /** Pretend to request an OTP for a mobile number. */
  requestOtp: (mobile: string) => Promise<void>;
  /** Verify the OTP — any 6-digit code succeeds in the stub. */
  verifyOtp: (mobile: string, code: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), ms));

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    bootstrapping: true,
    hasOnboarded: false,
  });

  useEffect(() => {
    (async () => {
      try {
        const [session, onboarded] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.session),
          AsyncStorage.getItem(STORAGE_KEYS.onboarded),
        ]);
        setState({
          user: session ? (JSON.parse(session) as User) : null,
          hasOnboarded: onboarded === 'true',
          bootstrapping: false,
        });
      } catch {
        setState((s) => ({ ...s, bootstrapping: false }));
      }
    })();
  }, []);

  const completeOnboarding = useCallback(async () => {
    await AsyncStorage.setItem(STORAGE_KEYS.onboarded, 'true');
    setState((s) => ({ ...s, hasOnboarded: true }));
  }, []);

  const signIn = useCallback(async () => {
    await AsyncStorage.setItem(STORAGE_KEYS.session, JSON.stringify(currentUser));
    setState((s) => ({ ...s, user: currentUser }));
  }, []);

  const requestOtp = useCallback(async (_mobile: string) => {
    await wait(600); // simulate network
  }, []);

  const verifyOtp = useCallback(
    async (_mobile: string, _code: string) => {
      await wait(600);
      await signIn();
    },
    [signIn],
  );

  const signInWithGoogle = useCallback(async () => {
    await wait(600);
    await signIn();
  }, [signIn]);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem(STORAGE_KEYS.session);
    setState((s) => ({ ...s, user: null }));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      completeOnboarding,
      requestOtp,
      verifyOtp,
      signInWithGoogle,
      signOut,
    }),
    [state, completeOnboarding, requestOtp, verifyOtp, signInWithGoogle, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
