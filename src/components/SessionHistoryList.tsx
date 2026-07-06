import type { PracticeSessionType, SongType } from "@/data/types";
import { SessionHistoryItem } from "./SessionHistoryItem";

type SessionHistoryListProps = {
  sessions: PracticeSessionType[];
  songs: SongType[];
  limit?: number;
};

export const SessionHistoryList = ({
  sessions,
  songs,
  limit,
}: SessionHistoryListProps) => {
  const displayed = limit ? sessions.slice(0, limit) : sessions;

  if (displayed.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        Nenhuma sessão registrada ainda.
      </p>
    );
  }

  return (
    <div className="divide-y overflow-hidden rounded-xl border">
      {displayed.map((session) => {
        const song = songs.find((item) => item.id === session.songId);

        return (
          <SessionHistoryItem key={session.id} session={session} song={song!} />
        );
      })}
    </div>
  );
};
