"use client";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/components/providers/useAuthProvider";
import { cn } from "@/lib/utils";
import { HeaderContent } from "@/features/Home/components/HeaderContent";

export const HomeHeaderActions = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  return (
    <div className="flex shrink-0 items-center gap-1">
      <ThemeToggle />
      {isLoading ? null : !isAuthenticated ? (
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
