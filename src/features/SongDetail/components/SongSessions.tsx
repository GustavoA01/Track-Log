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
import { Session } from "./Session";
import { HistoricalDescription } from "./HistoricalDescription";
import { useSongSessions } from "../hooks/useSongSessions";

type SongSessionsProps = {
  songId: string;
  sessions: PracticeSessionType[];
};

export const SongSessions = ({ songId, sessions }: SongSessionsProps) => {
  const { sessionsTotalTime, handleClearSessions, isPending } = useSongSessions(
    { songId, sessions },
  );

  return (
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
              disabled={isPending}
              onClick={handleClearSessions}
            >
              <Trash2 data-icon="inline-start" />
              {isPending ? "Limpando..." : "Limpar sessões"}
            </Button>
          </CardAction>
        )}
      </CardHeader>

      <CardContent>
        {sessions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Inicie uma sessão de estudo para começar a acompanhar seu progresso.
          </p>
        ) : (
          <div className="space-y-4">
            {sessions.map((session, index) => (
              <Session
                key={session.id}
                session={session}
                index={index}
                sessions={sessions}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
