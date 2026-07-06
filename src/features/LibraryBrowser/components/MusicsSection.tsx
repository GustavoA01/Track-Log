import type { FolderType, SongType } from "@/data/types";
import { MusicCard } from "./MusicCard";
import { MusicListItem } from "./MusicListItem";

type MusicsSectionProps = {
  folders: FolderType[];
  songs: SongType[];
  sessionCounts: Record<string, number>;
};

export const MusicsSection = ({
  folders,
  songs,
  sessionCounts,
}: MusicsSectionProps) => (
  <section className="space-y-3">
    <header className="flex items-center">
      <h2 className="text-sm font-medium">Músicas</h2>
      <span className="ml-1.5 font-normal text-muted-foreground">
        ({songs.length})
      </span>
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
