import { Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { PracticeSessionType, SongType } from "@/data/types";
import { formatDateOnly } from "@/lib/dates";
import { getSongDetailHref, type SongDetailFrom } from "@/lib/navigation";

type SessionHistoryItemProps = {
  session: PracticeSessionType;
  song: Pick<SongType, "id" | "title" | "artist">;
  from?: SongDetailFrom;
};

export const SessionHistoryItem = ({
  session,
  song,
  from,
}: SessionHistoryItemProps) => (
  <Link
    href={getSongDetailHref(song.id, from)}
    className="block transition-colors hover:bg-muted/50 active:bg-muted/50"
  >
    <div className="flex items-center justify-between gap-3 px-3 py-3 sm:items-start">
      <div className="min-w-0 flex-1 space-y-1">
        <p className="truncate font-medium">{song.title}</p>
        <p className="hidden truncate text-sm text-muted-foreground sm:block">
          {song.artist}
        </p>
        {session.notes && (
          <p className="line-clamp-1 text-xs text-muted-foreground sm:line-clamp-none">
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
        <ChevronRight className="size-4 text-muted-foreground sm:hidden" />
      </div>
    </div>
  </Link>
);
