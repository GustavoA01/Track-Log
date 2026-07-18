import type { PracticeSessionType, SongType } from "@/data/types";
import type { SongDetailFrom } from "@/utils/navigation";
import { SessionHistoryItem } from "./SessionHistoryItem";

type SessionHistoryListProps = {
  sessions: PracticeSessionType[];
  songs: SongType[];
  limit?: number;
  from?: SongDetailFrom;
  emptyMessage?: string;
};

export const SessionHistoryList = ({
  sessions,
  songs,
  limit,
  from,
  emptyMessage = "Nenhuma sessão registrada ainda.",
}: SessionHistoryListProps) => {
  const displayed = limit ? sessions.slice(0, limit) : sessions;

  if (displayed.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="divide-y overflow-hidden rounded-xl border">
      {displayed.map((session) => {
        const song = songs.find((item) => item.id === session.songId);

        return (
          <SessionHistoryItem
            key={session.id}
            session={session}
            song={song!}
            from={from}
          />
        );
      })}
    </div>
  );
};
