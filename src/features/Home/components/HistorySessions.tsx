"use client";

import { SearchInput } from "@/components/SearchInput";
import { SessionHistoryList } from "@/components/SessionHistoryList";
import { Button } from "@/components/ui/button";
import type { PracticeSessionType, SongType } from "@/data/types";
import type { SongDetailFrom } from "@/utils/navigation";
import { useSessionHistorySearch } from "../hooks/useSessionHistorySearch";

type HistorySessionsProps = {
  sessions: PracticeSessionType[];
  songs: SongType[];
  from?: SongDetailFrom;
};

export const HistorySessions = ({
  sessions,
  songs,
  from,
}: HistorySessionsProps) => {
  const { query, setQuery, filteredSessions, hasMore, loadMore } =
    useSessionHistorySearch({
      sessions,
      songs,
    });

  return (
    <div className="space-y-4">
      <SearchInput
        query={query}
        setQuery={setQuery}
        placeholder="Buscar por música, artista ou anotações..."
      />
      <SessionHistoryList
        sessions={filteredSessions}
        songs={songs}
        from={from}
        emptyMessage={
          query.trim()
            ? "Nenhuma sessão encontrada."
            : "Nenhuma sessão registrada ainda."
        }
      />
      {hasMore && (
        <div className="flex justify-center">
          <Button type="button" variant="outline" onClick={loadMore}>
            Carregar mais
          </Button>
        </div>
      )}
    </div>
  );
};
