import { useState, useMemo } from "react";
import type { SongType, SortByType, StatusItemType } from "@/data/types";
import { toTimestamp } from "@/utils/dates";

export const useLibraryBrowser = ({ songs }: { songs: SongType[] }) => {
  const [query, setQuery] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortByType>("updatedAt");
  const [reverseSongs, setReverseSongs] = useState(false);
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
      : [...songs];

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

    const sortFunctions: Record<
      SortByType,
      (a: SongType, b: SongType) => number
    > = {
      difficulty: (a, b) => b.difficulty - a.difficulty,
      updatedAt: (a, b) => toTimestamp(b.updatedAt) - toTimestamp(a.updatedAt),
      createdAt: (a, b) => toTimestamp(b.createdAt) - toTimestamp(a.createdAt),
    };

    result = [...result].sort(sortFunctions[sortBy]);

    if (reverseSongs) result = result.reverse();

    return result;
  }, [
    normalizedQuery,
    selectedFolderId,
    songs,
    statusQuery,
    sortBy,
    reverseSongs,
  ]);

  return {
    query,
    setQuery,
    selectedFolderId,
    setSelectedFolderId,
    filteredSongs,
    statusQuery,
    setStatusQuery,
    reverseSongs,
    setReverseSongs,
    sortBy,
    setSortBy,
  };
};
