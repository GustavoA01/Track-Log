import { SongStatusBadge } from "@/components/SongStatusBadge";
import { SongCover } from "./SongCover";
import { SongType } from "@/data/types";
import { FolderType } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Timer } from "lucide-react";

type HeroSectionProps = {
  song: Pick<SongType, "title" | "imageUrl" | "status" | "artist">;
  accentColor: string;
  folder?: Pick<FolderType, "name" | "color">;
  sessionCount: number;
  totalMinutes: number;
};

export const HeroSection = ({
  song,
  accentColor,
  folder,
  sessionCount,
  totalMinutes,
}: HeroSectionProps) => (
  <section
    className="w-full"
    style={{
      background: `linear-gradient(180deg, color-mix(in srgb, ${accentColor} 40%, var(--background)) 0%, var(--background) 100%)`,
    }}
  >
    <div className="container mx-auto px-4 pb-8 pt-6 sm:px-6 sm:pb-10 sm:pt-8">
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-end lg:gap-12">
        <div className="w-full max-w-[280px] shrink-0 lg:max-w-[360px]">
          <SongCover
            title={song.title}
            imageUrl={song.imageUrl}
            accentColor={accentColor}
            fallbackColor={folder?.color}
          />
        </div>

        <div className="flex w-full flex-1 flex-col items-center gap-4 text-center lg:items-start lg:pb-2 lg:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            <SongStatusBadge status={song.status} />
            {folder && <Badge variant="outline">{folder.name}</Badge>}
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              {song.title}
            </h1>
            <p className="text-lg text-muted-foreground lg:text-xl">
              {song.artist}
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            {sessionCount} {sessionCount === 1 ? "sessão" : "sessões"} ·{" "}
            {totalMinutes} min praticados
          </p>

          <Button size="lg" className="w-full sm:w-auto">
            <Timer data-icon="inline-start" />
            Iniciar sessão de estudo
          </Button>
        </div>
      </div>
    </div>
  </section>
);
