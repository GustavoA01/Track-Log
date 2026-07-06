import { Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { PracticeSessionType, SongType } from "@/data/types";
import { formatDateOnly } from "@/lib/dates";
import { cn } from "@/lib/utils";

type SessionHistoryItemProps = {
  session: PracticeSessionType;
  song?: Pick<SongType, "id" | "title" | "artist">;
  compact?: boolean;
};

export const SessionHistoryItem = ({
  session,
  song,
  compact = false,
}: SessionHistoryItemProps) => {
  const content = (
    <div
      className={cn(
        "flex items-start justify-between gap-3",
        compact && "items-center px-3 py-3",
      )}
    >
      <div className="min-w-0 flex-1 space-y-1">
        <p className="truncate font-medium">
          {song?.title ?? "Música desconhecida"}
        </p>
        {song?.artist && (
          <p className="truncate text-sm text-muted-foreground">
            {song.artist}
          </p>
        )}
        {session.notes && (
          <p
            className={cn(
              "text-muted-foreground",
              compact ? "line-clamp-1 text-xs" : "text-xs",
            )}
          >
            {session.notes}
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <div className="space-y-1 text-right text-xs text-muted-foreground">
          <div className="flex items-center justify-end gap-1">
            <Calendar className="size-3" />
            {formatDateOnly(session.date)}
          </div>
          <p className="font-medium text-foreground">{session.minutes} min</p>
        </div>
        {compact && song && (
          <ChevronRight className="size-4 text-muted-foreground" />
        )}
      </div>
    </div>
  );

  if (compact && song) {
    return (
      <Link
        href={`/musica/${song.id}`}
        className="block transition-colors hover:bg-muted/50 active:bg-muted/50"
      >
        {content}
      </Link>
    );
  }

  return content;
};
