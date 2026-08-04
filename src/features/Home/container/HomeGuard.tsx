"use client";

import { useAuth } from "@/components/providers/useAuthProvider";
import { HomeLoading } from "@/features/Home/components/HomeLoading";

type HomeGuardProps = {
  isServerAuthenticated: boolean;
  children: React.ReactNode;
};

export const HomeGuard = ({
  isServerAuthenticated,
  children,
}: HomeGuardProps) => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading || (isAuthenticated && !isServerAuthenticated)) {
    return <HomeLoading />;
  }

  return children;
};
