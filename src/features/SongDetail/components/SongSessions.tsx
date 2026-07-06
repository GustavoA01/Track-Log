"use client";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PracticeSessionType } from "@/data/types";
import { ClearSessionsDialog } from "../container/ClearSessionsDialog";
import { DeleteSessionDialog } from "../container/DeleteSessionDialog";
import { useDeleteSessionDialog } from "../hooks/useDeleteSessionDialog";
import { useSongSessions } from "../hooks/useSongSessions";
import { Session } from "./Session";
import { HistoricalDescription } from "./HistoricalDescription";

type SongSessionsProps = {
  songId: string;
  sessions: PracticeSessionType[];
};

export const SongSessions = ({ songId, sessions }: SongSessionsProps) => {
  const { sessionsTotalTime, clearDialogOpen, setClearDialogOpen } =
    useSongSessions({ sessions });
  const deleteSessionDialog = useDeleteSessionDialog(songId);

  return (
    <>
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="text-base">Histórico de sessões</CardTitle>

          <HistoricalDescription
            totalSessions={sessions.length}
            totalTime={sessionsTotalTime}
          />

          {sessions.length > 0 && (
            <CardAction>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setClearDialogOpen(true)}
              >
                <Trash2 data-icon="inline-start" />
                Limpar sessões
              </Button>
            </CardAction>
          )}
        </CardHeader>

        <CardContent>
          {sessions.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Inicie uma sessão de estudo para começar a acompanhar seu
              progresso.
            </p>
          ) : (
            <div className="space-y-4">
              {sessions.map((session, index) => (
                <Session
                  key={session.id}
                  session={session}
                  index={index}
                  sessions={sessions}
                  onDelete={deleteSessionDialog.openDialog}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ClearSessionsDialog
        open={clearDialogOpen}
        onOpenChange={setClearDialogOpen}
        songId={songId}
        sessionCount={sessions.length}
      />

      <DeleteSessionDialog
        open={deleteSessionDialog.open}
        session={deleteSessionDialog.session}
        isPending={deleteSessionDialog.isPending}
        onOpenChange={deleteSessionDialog.handleOpenChange}
        onConfirm={deleteSessionDialog.handleConfirm}
        onCancel={deleteSessionDialog.closeDialog}
      />
    </>
  );
};
