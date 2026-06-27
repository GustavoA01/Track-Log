"use client";

import { useMemo, useState } from "react";
import type { FolderType, SongType } from "@/data/types";
import { SearchSection } from "../components/SearchSection";
import { FolderSection } from "./FolderSection";
import { MusicsSection } from "./MusicsSection";

type LibraryBrowserProps = {
  folders: FolderType[];
  songs: SongType[];
};

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const LibraryBrowser = ({ folders, songs }: LibraryBrowserProps) => {
  const [query, setQuery] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  const normalizedQuery = normalize(query.trim());

  const filteredSongs = useMemo(() => {
    let result = selectedFolderId
      ? songs.filter((song) => song.folderId === selectedFolderId)
      : songs;

    if (normalizedQuery) {
      result = result.filter(
        (song) =>
          normalize(song.title).includes(normalizedQuery) ||
          normalize(song.artist).includes(normalizedQuery),
      );
    }

    return result;
  }, [normalizedQuery, selectedFolderId, songs]);

  return (
    <div className="space-y-6">
      <SearchSection query={query} setQuery={setQuery} />
      <FolderSection
        folders={folders}
        songs={songs}
        selectedFolderId={selectedFolderId}
        setSelectedFolderId={setSelectedFolderId}
      />
      <MusicsSection folders={folders} songs={filteredSongs} />
    </div>
  );
};
