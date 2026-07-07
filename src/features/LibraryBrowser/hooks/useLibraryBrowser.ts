import { useState, useMemo } from "react";
import type { SongType } from "@/data/types";

type UseLibraryBrowserProps = {
  songs: SongType[];
};

export const useLibraryBrowser = ({ songs }: UseLibraryBrowserProps) => {
  const [query, setQuery] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  const normalize = (text: string) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

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

  return {
    query,
    setQuery,
    selectedFolderId,
    setSelectedFolderId,
    filteredSongs,
  };
};
