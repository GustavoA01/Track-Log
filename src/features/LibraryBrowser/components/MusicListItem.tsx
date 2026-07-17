import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { SongType } from "@/data/types";
import { SongStatusBadge } from "@/components/SongStatusBadge";

type MusicListItemProps = {
  song: SongType;
  sessionCount: number;
};

export const MusicListItem = ({ song, sessionCount }: MusicListItemProps) => (
  <Link
    href={`/musica/${song.id}`}
    className="flex items-center gap-3 px-3 py-3 transition-colors hover:bg-muted/50 active:bg-muted/50"
  >
    <div className="min-w-0 flex-1 space-y-0.5">
      <div className="flex items-start justify-between gap-2">
        <p className="font-medium line-clamp-2 min-w-0">{song.title}</p>
        <SongStatusBadge status={song.status} className="shrink-0" />
      </div>
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-sm text-muted-foreground">{song.artist}</p>
        <p className="shrink-0 text-xs text-muted-foreground">
          {sessionCount} {sessionCount === 1 ? "sessão" : "sessões"}
        </p>
      </div>
    </div>
    <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
  </Link>
);
