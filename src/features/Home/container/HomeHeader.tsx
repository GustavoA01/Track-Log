import Link from "next/link";
import { Music } from "lucide-react";
import { DesktopNav } from "@/features/Home/container/DesktopNav";
import { HomeHeaderActions } from "@/features/Home/container/HomeHeaderActions";

export const HomeHeader = () => (
  <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
    <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            {/* LOGO */}
            <Music className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold font-montserrat leading-none">
              Track Log
            </p>
            <p className="text-xs text-muted-foreground">
              Seu diário de estudos
            </p>
          </div>
        </Link>
        <DesktopNav />
      </div>
      <HomeHeaderActions />
    </div>
  </header>
);
