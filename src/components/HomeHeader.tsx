import { FolderPlus, Music, Plus } from "lucide-react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

export function HomeHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Music className="size-4" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">Track Log</p>
            <p className="text-xs text-muted-foreground">
              Seu diário de estudos
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            <FolderPlus data-icon="inline-start" />
            Nova pasta
          </Button>
          <Button size="sm">
            <Plus data-icon="inline-start" />
            Nova música
          </Button>
        </div>
      </div>
    </header>
  );
}
