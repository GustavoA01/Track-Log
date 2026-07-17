"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { onIdTokenChanged, type User } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  getFirebaseAuth,
  isFirebaseConfigured,
} from "@/services/firebase/config";
import { syncAuthSession } from "@/services/firebase/session";

type AuthContextValueType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextValueType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const firebaseReady = isFirebaseConfigured();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(firebaseReady);
  const lastSyncedTokenRef = useRef<string | null>(null);
  const previousUidRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    if (!firebaseReady) return;

    const auth = getFirebaseAuth();

    const applySession = async (
      nextUser: User | null,
      options?: { refreshRouter?: boolean },
    ) => {
      setUser(nextUser);

      try {
        if (nextUser) {
          const token = await nextUser.getIdToken();
          if (token !== lastSyncedTokenRef.current) {
            await syncAuthSession(token);
            lastSyncedTokenRef.current = token;
          }
        } else if (lastSyncedTokenRef.current !== null) {
          await syncAuthSession(null);
          lastSyncedTokenRef.current = null;
        }

        if (options?.refreshRouter) router.refresh();
      } catch {
        // Mantém o estado do cliente; a próxima renovação tenta sincronizar de novo.
      } finally {
        setIsLoading(false);
      }
    };

    const unsubscribe = onIdTokenChanged(auth, (nextUser) => {
      const nextUid = nextUser?.uid ?? null;
      const uidChanged = previousUidRef.current !== nextUid;
      previousUidRef.current = nextUid;

      applySession(nextUser, { refreshRouter: uidChanged });
    });

    const onVisible = () => {
      if (document.visibilityState !== "visible") return;

      const currentUser = auth.currentUser;
      if (!currentUser) return;

      (async () => {
        try {
          const token = await currentUser.getIdToken();
          if (token === lastSyncedTokenRef.current) return;

          await syncAuthSession(token);
          lastSyncedTokenRef.current = token;
          router.refresh();
        } catch {
          // Ignora falha pontual ao voltar para a aba.
        }
      })();
    };

    document.addEventListener("visibilitychange", onVisible);

    return () => {
      unsubscribe();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [firebaseReady, router]);

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

  if (!context) throw new Error("useAuth deve ser usado dentro do provider");

  return context;
};
