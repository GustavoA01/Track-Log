import type { PracticeSessionType } from "@/data/types";
import { Calendar } from "lucide-react";
import { formatDateOnly } from "@/lib/dates";
import { Separator } from "@/components/ui/separator";
import { SessionActions } from "./SessionActions";

type SessionProps = {
  session: PracticeSessionType;
  index: number;
  sessions: PracticeSessionType[];
};

export const Session = ({ session, index, sessions }: SessionProps) => (
  <div>
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0 space-y-1">
        <div className="flex items-center gap-1.5 text-sm font-medium">
          <Calendar className="size-3.5 text-muted-foreground" />
          {formatDateOnly(session.date)}
        </div>
        {session.notes && (
          <p className="text-sm text-muted-foreground">{session.notes}</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <p className="text-sm font-medium">{session.minutes} min</p>
        <SessionActions />
      </div>
    </div>
    {index < sessions.length - 1 && <Separator className="mt-4" />}
  </div>
);
