import type { PracticeSessionType } from "@/data/types";
import { Calendar } from "lucide-react";
import { formatDateOnly } from "@/utils/dates";
import { Separator } from "@/components/ui/separator";
import { SessionActionsDropDown } from "./SessionActionsDropD";
import { SessionsActionsSheet } from "./SessionsActionsSheet";

type SessionProps = {
  session: PracticeSessionType;
  index: number;
  sessions: PracticeSessionType[];
  onDelete: (session: PracticeSessionType) => void;
  onEdit: (session: PracticeSessionType) => void;
};

export const Session = ({
  session,
  index,
  sessions,
  onDelete,
  onEdit,
}: SessionProps) => (
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
        <SessionActionsDropDown
          onEdit={() => onEdit(session)}
          onDelete={() => onDelete(session)}
        />
        <SessionsActionsSheet
          onEdit={() => onEdit(session)}
          onDelete={() => onDelete(session)}
        />
      </div>
    </div>
    {index < sessions.length - 1 && <Separator className="mt-4" />}
  </div>
);
