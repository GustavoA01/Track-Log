"use client";
import { Trash2 } from "lucide-react";
import { useState } from "react";
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

type SongSessionsProps = {
  initialSessions: PracticeSessionType[];
};

export const SongSessions = ({ initialSessions }: SongSessionsProps) => {
  const [sessions, setSessions] = useState(initialSessions);
  const sessionsTotalTime = sessions.reduce(
    (acc, session) => acc + session.minutes,
    0,
  );

  const handleClearSessions = () => {
    if (sessions.length === 0) return;

    const confirmed = window.confirm(
      "Tem certeza que deseja limpar todas as sessões desta música?",
    );

    if (confirmed) {
      setSessions([]);
    }
  };

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
              onClick={handleClearSessions}
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
