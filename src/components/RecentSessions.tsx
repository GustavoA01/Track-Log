import { Calendar, Gauge } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getSongById, practiceSessions } from "@/data/mock-data";

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  }).format(new Date(dateStr));
}

export const RecentSessions = () => {
  const recent = [...practiceSessions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico recente</CardTitle>
        <CardDescription>Suas últimas sessões de estudo</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            Ver histórico
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        {recent.map((session, index) => {
          const song = getSongById(session.songId);

          return (
            <div key={session.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <p className="truncate font-medium">
                    {song?.title ?? "Música desconhecida"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {song?.artist}
                  </p>
                  {session.notes && (
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {session.notes}
                    </p>
                  )}
                </div>
                <div className="shrink-0 space-y-1 text-right text-xs text-muted-foreground">
                  <div className="flex items-center justify-end gap-1">
                    <Calendar className="size-3" />
                    {formatDate(session.date)}
                  </div>
                  <p className="font-medium text-foreground">
                    {session.minutes} min
                  </p>
                  <div className="flex items-center justify-end gap-1">
                    <Gauge className="size-3" />
                    {session.bpm} BPM
                  </div>
                </div>
              </div>
              {index < recent.length - 1 && <Separator className="mt-4" />}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
