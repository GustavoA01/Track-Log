import type { PracticeSessionType, SongType } from "@/data/types";
import { Separator } from "@/components/ui/separator";
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
    <>
      <div className="divide-y overflow-hidden rounded-xl border sm:hidden">
        {displayed.map((session) => {
          const song = songs.find((item) => item.id === session.songId);

          return (
            <SessionHistoryItem
              key={session.id}
              session={session}
              song={song}
              compact
            />
          );
        })}
      </div>

      <div className="hidden space-y-4 sm:block">
        {displayed.map((session, index) => {
          const song = songs.find((item) => item.id === session.songId);

          return (
            <div key={session.id}>
              <SessionHistoryItem session={session} song={song} />
              {index < displayed.length - 1 && <Separator className="mt-4" />}
            </div>
          );
        })}
      </div>
    </>
  );
};
