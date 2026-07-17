import type { FolderType, SortByType, SongType } from "@/data/types";
import { MusicCard } from "./MusicCard";
import { MusicListItem } from "./MusicListItem";
import { MusicSectionHeader } from "./MusicSectionHeader";

type MusicsSectionProps = {
  folders: FolderType[];
  songs: SongType[];
  sessionCounts: Record<string, number>;
  selectedFolderId?: string | null;
  reverseSongs: boolean;
  setReverseSongs: (reverse: boolean) => void;
  sortBy: SortByType;
  setSortBy: (sortBy: SortByType) => void;
};

export const MusicsSection = ({
  folders,
  songs,
  sessionCounts,
  selectedFolderId,
  reverseSongs,
  setReverseSongs,
  sortBy,
  setSortBy,
}: MusicsSectionProps) => {
  const selectedFolder = folders.find(
    (folder) => folder.id === selectedFolderId,
  );

  return (
    <section className="space-y-3">
      <MusicSectionHeader
        songsLength={songs.length}
        selectedFolderId={selectedFolderId || null}
        selectedFolderName={selectedFolder?.name ?? ""}
        sortBy={sortBy}
        setSortBy={setSortBy}
        reverseSongs={reverseSongs}
        setReverseSongs={setReverseSongs}
      />

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
