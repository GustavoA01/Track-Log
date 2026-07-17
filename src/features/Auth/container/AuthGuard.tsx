"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/useAuthProvider";
import { AuthLoading } from "@/features/Home/components/AuthLoading";

type AuthGuardProps = {
  children: React.ReactNode;
  mode: "protected" | "guest";
};

export const AuthGuard = ({ children, mode }: AuthGuardProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { replace } = useRouter();
  const pathname = usePathname();

  const authenticatedGuest = mode === "guest" && isAuthenticated;
  const notAuthenticatedGuest = mode === "protected" && !isAuthenticated;

  useEffect(() => {
    if (isLoading) return;

    if (notAuthenticatedGuest) {
      const nextRoute = encodeURIComponent(pathname);
      replace(`/login?next=${nextRoute}`);
      return;
    }

    if (authenticatedGuest) replace("/");
  }, [authenticatedGuest, notAuthenticatedGuest, isLoading, pathname, replace]);

  if (isLoading) return <AuthLoading />;
  if (notAuthenticatedGuest) return <AuthLoading />;
  if (authenticatedGuest) return null;

  return <>{children}</>;
};
