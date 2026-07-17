import { useState, useMemo } from "react";
import type { SongType, StatusItemType } from "@/data/types";

export const useLibraryBrowser = ({ songs }: { songs: SongType[] }) => {
  const [query, setQuery] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [statusQuery, setStatusQuery] =
    useState<StatusItemType["value"]>("all");

  const normalize = (text: string) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const normalizedQuery = normalize(query.trim());

  const filteredSongs = useMemo(() => {
    let result = selectedFolderId
      ? songs.filter((song) => song.folderIds.includes(selectedFolderId))
      : songs;

    if (normalizedQuery) {
      result = result.filter(
        (song) =>
          normalize(song.title).includes(normalizedQuery) ||
          normalize(song.artist).includes(normalizedQuery),
      );
    }

    if (statusQuery !== "all") {
      result = result.filter((song) => song.status === statusQuery);
    }

    return result;
  }, [normalizedQuery, selectedFolderId, songs, statusQuery]);

  return {
    query,
    setQuery,
    selectedFolderId,
    setSelectedFolderId,
    filteredSongs,
    statusQuery,
    setStatusQuery,
  };
};
