import Link from "next/link";
import { Music, Plus } from "lucide-react";
import { DesktopNav } from "@/components/DesktopNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FolderDialog } from "@/features/FolderForm/container/FolderDialog";

export const HomeHeader = () => (
  <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
    <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Music className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-none">Track Log</p>
            <p className="text-xs text-muted-foreground">
              Seu diário de estudos
            </p>
          </div>
        </Link>
        <DesktopNav />
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <ThemeToggle />
        <FolderDialog />
        <Link
          href="/musica/nova"
          className={cn(buttonVariants({ size: "sm" }))}
        >
          <Plus data-icon="inline-start" />
          Nova música
        </Link>
      </div>
    </div>
  </header>
);
