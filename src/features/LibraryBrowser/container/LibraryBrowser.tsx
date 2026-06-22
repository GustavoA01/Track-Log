"use client";
import { useMemo, useState } from "react";
import {
  folders,
  getSessionCountBySongId,
  getSongsByFolder,
  songs,
} from "@/data/mock-data";
import { FolderCard } from "../components/FolderCard";
import { MusicCard } from "../components/MusicCard";
import { SearchSection } from "../components/SearchSection";
import { AllMusicCard } from "../components/AllMusicCard";
import { ClearFilterButton } from "../components/ClearFilterButton";

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export const LibraryBrowser = () => {
  const [query, setQuery] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  const normalizedQuery = normalize(query.trim());

  const filteredSongs = useMemo(() => {
    let result = selectedFolderId ? getSongsByFolder(selectedFolderId) : songs;

    if (normalizedQuery) {
      result = result.filter(
        (song) =>
          normalize(song.title).includes(normalizedQuery) ||
          normalize(song.artist).includes(normalizedQuery),
      );
    }

    return result;
  }, [normalizedQuery, selectedFolderId]);

  const filteredFolders = useMemo(() => {
    if (!normalizedQuery) return folders;

    return folders.filter((folder) => {
      const folderMatches = normalize(folder.name).includes(normalizedQuery);
      const hasMatchingSong = getSongsByFolder(folder.id).some(
        (song) =>
          normalize(song.title).includes(normalizedQuery) ||
          normalize(song.artist).includes(normalizedQuery),
      );
      return folderMatches || hasMatchingSong;
    });
  }, [normalizedQuery]);

  return (
    <div className="space-y-6">
      <SearchSection query={query} setQuery={setQuery} />

      <section className="space-y-3">
        <ClearFilterButton
          selectedFolderId={selectedFolderId}
          setSelectedFolderId={setSelectedFolderId}
        />

        <div className="flex gap-3 overflow-x-auto pb-1">
          <AllMusicCard
            songs={songs}
            selectedFolderId={selectedFolderId}
            setSelectedFolderId={setSelectedFolderId}
          />

          {filteredFolders.map((folder) => {
            const count = getSongsByFolder(folder.id).length;
            const isSelected = selectedFolderId === folder.id;

            return (
              <FolderCard
                key={folder.id}
                folder={folder}
                count={count}
                isSelected={isSelected}
                setSelectedFolderId={setSelectedFolderId}
              />
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <header className="flex items-center">
          <h2 className="text-sm font-medium">Músicas</h2>
          <span className="ml-1.5 font-normal text-muted-foreground">
            ({filteredSongs.length})
          </span>
        </header>

        {filteredSongs.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filteredSongs.map((song) => {
              const sessionCount = getSessionCountBySongId(song.id);

              return (
                <MusicCard
                  key={song.id}
                  folders={folders}
                  song={song}
                  sessionCount={sessionCount}
                />
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed py-12 text-center">
            <p className="text-sm text-muted-foreground">
              Nenhuma música encontrada
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
