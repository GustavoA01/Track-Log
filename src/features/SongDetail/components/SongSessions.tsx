"use client";

import { Calendar, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { PracticeSessionType } from "@/data/types";

type SongSessionsProps = {
  initialSessions: PracticeSessionType[];
};

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr));
}

export function SongSessions({ initialSessions }: SongSessionsProps) {
  const [sessions, setSessions] = useState(initialSessions);

  function handleClearSessions() {
    if (sessions.length === 0) return;

    const confirmed = window.confirm(
      "Tem certeza que deseja limpar todas as sessões desta música?",
    );

    if (confirmed) {
      setSessions([]);
    }
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-base">Histórico de sessões</CardTitle>
        <CardDescription>
          {sessions.length === 0
            ? "Nenhuma sessão registrada ainda"
            : `${sessions.length} ${sessions.length === 1 ? "sessão" : "sessões"}`}
        </CardDescription>
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
              <div key={session.id}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-1.5 text-sm font-medium">
                      <Calendar className="size-3.5 text-muted-foreground" />
                      {formatDate(session.date)}
                    </div>
                    {session.notes && (
                      <p className="text-sm text-muted-foreground">
                        {session.notes}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0 text-right text-sm">
                    <p className="font-medium">{session.minutes} min</p>
                  </div>
                </div>
                {index < sessions.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
