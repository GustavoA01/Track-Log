import Link from "next/link";
import { Music, Plus } from "lucide-react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FolderDialog } from "@/features/FolderForm/container/FolderDialog";

export const HomeHeader = () => (
  <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
    <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Music className="size-4" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-none">Track Log</p>
          <p className="text-xs text-muted-foreground">Seu diário de estudos</p>
        </div>
      </div>

      <div className="flex items-center gap-1">
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
