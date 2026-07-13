"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/useAuthProvider";
import { AuthLoading } from "../components/AuthLoading";

type AuthGuardProps = {
  children: React.ReactNode;
  mode: "protected" | "guest";
};

export const AuthGuard = ({ children, mode }: AuthGuardProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const authenticatedGuest = mode === "guest" && isAuthenticated;
  const notAuthenticatedGuest = mode === "protected" && !isAuthenticated;

  useEffect(() => {
    if (isLoading) return;

    if (notAuthenticatedGuest) {
      const next = encodeURIComponent(pathname);
      router.replace(`/login?next=${next}`);
      return;
    }

    if (authenticatedGuest) router.replace("/");
  }, [authenticatedGuest, notAuthenticatedGuest, isLoading, pathname, router]);

  if (isLoading) return <AuthLoading />;
  if (notAuthenticatedGuest) return <AuthLoading />;
  if (authenticatedGuest) return <AuthLoading />;

  return <>{children}</>;
};
