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
    className="flex flex-col gap-2 rounded-xl border p-3 text-left transition-colors hover:bg-muted/50 hover:border-primary shadow-lg"
  >
    <CoverImage
      src={song.imageUrl}
      alt={song.title}
      fallbackColor={
        song.accentColor ??
        folders.find((folder) => song.folderIds.includes(folder.id))?.color
      }
      size="lg"
    />
    <SongStatusBadge status={song.status} className="shrink-0" />
    <p className="line-clamp-2 min-w-0 text-base font-medium">{song.title}</p>
    <p className="truncate text-sm text-muted-foreground">{song.artist}</p>
    <p className="text-xs text-muted-foreground mt-auto">
      {sessionCount} {sessionCount === 1 ? "sessão" : "sessões"}
    </p>
  </Link>
);
