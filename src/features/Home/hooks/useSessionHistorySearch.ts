import { useMemo, useState } from "react";
import type { PracticeSessionType, SongType } from "@/data/types";

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const useSessionHistorySearch = ({
  sessions,
  songs,
}: {
  sessions: PracticeSessionType[];
  songs: SongType[];
}) => {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalize(query.trim());

  const songsById = useMemo(
    () => new Map(songs.map((song) => [song.id, song])),
    [songs],
  );

  const filteredSessions = useMemo(() => {
    if (!normalizedQuery) return sessions;

    return sessions.filter((session) => {
      const song = songsById.get(session.songId);
      if (!song) return false;

      return (
        normalize(song.title).includes(normalizedQuery) ||
        normalize(song.artist).includes(normalizedQuery) ||
        normalize(session.notes).includes(normalizedQuery)
      );
    });
  }, [normalizedQuery, sessions, songsById]);

  return {
    query,
    setQuery,
    filteredSessions,
  };
};
