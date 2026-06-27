import type { FolderType, SongType } from "@/data/types";
import { CoverImage } from "@/features/LibraryBrowser/components/CoverImage";
import { SongStatusBadge } from "@/components/SongStatusBadge";
import Link from "next/link";

type MusicCardProps = {
  folders: FolderType[];
  song: SongType;
  sessionCount: number;
};

export const MusicCard = ({ folders, song, sessionCount }: MusicCardProps) => (
  <Link
    href={`/musica/${song.id}`}
    className="flex flex-col gap-3 rounded-xl border p-3 text-left transition-colors hover:bg-muted/50 hover:border-primary"
  >
    <CoverImage
      src={song.imageUrl}
      alt={song.title}
      fallbackColor={
        song.accentColor ??
        folders.find((f: FolderType) => f.id === song.folderId)?.color
      }
      size="lg"
    />
    <div className="min-w-0 space-y-1">
      <div className="flex items-start justify-between gap-2">
        <p className="truncate font-medium">{song.title}</p>
        <SongStatusBadge status={song.status} className="shrink-0" />
      </div>
      <p className="truncate text-sm text-muted-foreground">{song.artist}</p>
      <p className="text-xs text-muted-foreground">
        {sessionCount} {sessionCount === 1 ? "sessão" : "sessões"}
      </p>
    </div>
  </Link>
);
