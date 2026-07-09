import type { FolderType, SongType } from "@/data/types";
import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MusicCard } from "./MusicCard";
import { MusicListItem } from "./MusicListItem";

type MusicsSectionProps = {
  folders: FolderType[];
  songs: SongType[];
  sessionCounts: Record<string, number>;
  selectedFolderId?: string | null;
};

export const MusicsSection = ({
  folders,
  songs,
  sessionCounts,
  selectedFolderId,
}: MusicsSectionProps) => {
  const selectedFolder = folders.find(
    (folder) => folder.id === selectedFolderId,
  );

  return (
    <section className="space-y-3">
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center">
          <h2 className="text-sm font-medium">Músicas</h2>
          <span className="ml-1.5 font-normal text-muted-foreground">
            ({songs.length})
          </span>
        </div>

        {selectedFolder && (
          <Link
            href={`/musica/nova?folderId=${selectedFolder.id}`}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            <Plus data-icon="inline-start" />
            Nova música em {selectedFolder.name}
          </Link>
        )}
      </header>

      {songs.length > 0 ? (
        <>
          <div className="divide-y overflow-hidden rounded-xl border sm:hidden">
            {songs.map((song) => (
              <MusicListItem
                key={song.id}
                song={song}
                sessionCount={sessionCounts[song.id] ?? 0}
              />
            ))}
          </div>

          <div className="hidden gap-3 sm:grid sm:grid-cols-2 xl:grid-cols-3">
            {songs.map((song) => (
              <MusicCard
                key={song.id}
                folders={folders}
                song={song}
                sessionCount={sessionCounts[song.id] ?? 0}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-dashed py-12 text-center">
          <p className="text-sm text-muted-foreground">
            Nenhuma música encontrada
          </p>
        </div>
      )}
    </section>
  );
};
