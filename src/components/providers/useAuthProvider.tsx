"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import {
  getFirebaseAuth,
  isFirebaseConfigured,
} from "@/services/firebase/config";
import { syncAuthSession } from "@/services/firebase/session";

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const firebaseReady = isFirebaseConfigured();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(firebaseReady);

  useEffect(() => {
    if (!firebaseReady) return;

    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);

      try {
        if (nextUser) {
          const token = await nextUser.getIdToken();
          await syncAuthSession(token);
        } else {
          await syncAuthSession(null);
        }
      } finally {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, [firebaseReady]);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }

  return context;
};
