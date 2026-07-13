"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LogoutButton } from "@/components/LogoutButton";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/components/providers/useAuthProvider";
import { cn } from "@/lib/utils";
import { FolderDialog } from "@/features/FolderForm/container/FolderDialog";

export const HomeHeaderActions = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex shrink-0 items-center gap-1">
        <ThemeToggle />
        <div className="size-8" aria-hidden />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex shrink-0 items-center gap-1">
        <ThemeToggle />
        <Link
          href="/login"
          className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}
        >
          Entrar
        </Link>
        <Link href="/cadastrar" className={cn(buttonVariants({ size: "sm" }))}>
          Criar conta
        </Link>
      </div>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-1">
      <ThemeToggle />
      <FolderDialog />
      <Link href="/musica/nova" className={cn(buttonVariants({ size: "sm" }))}>
        <Plus data-icon="inline-start" />
        Nova música
      </Link>
      <LogoutButton />
    </div>
  );
};
