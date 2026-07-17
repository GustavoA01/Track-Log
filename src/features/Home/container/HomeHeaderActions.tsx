"use client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/components/providers/useAuthProvider";
import { cn } from "@/lib/utils";
import { HeaderContent } from "@/features/Home/components/HeaderContent";
import { HeaderActionsSkeleton } from "@/features/Home/components/HeaderActionsSkeleton";

export const HomeHeaderActions = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <HeaderActionsSkeleton />;

  return (
    <div className="flex shrink-0 items-center gap-1">
      {!isAuthenticated ? (
        <>
          <Link
            href="/login"
            className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}
          >
            Entrar
          </Link>
          <Link
            href="/cadastrar"
            className={cn(buttonVariants({ size: "sm" }))}
          >
            Criar conta
          </Link>
        </>
      ) : (
        <HeaderContent name={user?.displayName} />
      )}
    </div>
  );
};
